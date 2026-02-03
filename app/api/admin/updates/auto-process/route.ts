import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Cron job secret for Vercel
const CRON_SECRET = process.env.CRON_SECRET

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // 60 seconds max for processing

// Auto-process pending updates (called by cron job)
export async function POST(request: NextRequest) {
  // Verify cron secret if configured
  const authHeader = request.headers.get('authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get pending updates (limit to 5 per run to avoid timeout)
    const { data: updates, error } = await supabase
      .from('update_requests')
      .select(`
        *,
        leads:lead_id (
          id,
          business_name,
          slug
        )
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(5)

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch updates' }, { status: 500 })
    }

    if (!updates || updates.length === 0) {
      return NextResponse.json({ message: 'No pending updates', processed: 0 })
    }

    const results: Array<{ id: string; status: string; error?: string }> = []

    for (const update of updates) {
      try {
        const lead = update.leads as { id: string; business_name: string; slug: string } | null

        if (!lead?.slug) {
          results.push({ id: update.id, status: 'skipped', error: 'No associated site' })
          continue
        }

        // Mark as processing
        await supabase
          .from('update_requests')
          .update({ status: 'processing' })
          .eq('id', update.id)

        // Get site HTML
        const { data: site } = await supabase
          .from('client_sites')
          .select('id, generated_html')
          .eq('slug', lead.slug)
          .single()

        if (!site?.generated_html) {
          await supabase
            .from('update_requests')
            .update({ status: 'pending' })
            .eq('id', update.id)
          results.push({ id: update.id, status: 'skipped', error: 'No site HTML found' })
          continue
        }

        // Apply AI update
        const newHtml = await applyAIUpdate(site.generated_html, update.message)

        // Update site
        await supabase
          .from('client_sites')
          .update({
            generated_html: newHtml,
            updated_at: new Date().toISOString(),
          })
          .eq('id', site.id)

        // Mark as completed
        await supabase
          .from('update_requests')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            processed_by: 'ai',
          })
          .eq('id', update.id)

        results.push({ id: update.id, status: 'completed' })

      } catch (updateError) {
        console.error(`Error processing update ${update.id}:`, updateError)

        // Revert to pending if failed
        await supabase
          .from('update_requests')
          .update({ status: 'pending' })
          .eq('id', update.id)

        results.push({
          id: update.id,
          status: 'failed',
          error: updateError instanceof Error ? updateError.message : 'Unknown error',
        })
      }
    }

    const completed = results.filter(r => r.status === 'completed').length
    const failed = results.filter(r => r.status === 'failed').length

    return NextResponse.json({
      message: `Processed ${completed} updates, ${failed} failed`,
      processed: completed,
      failed,
      results,
    })

  } catch (error) {
    console.error('Auto-process error:', error)
    return NextResponse.json(
      { error: 'Failed to auto-process updates' },
      { status: 500 }
    )
  }
}

async function applyAIUpdate(currentHtml: string, updateRequest: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('Anthropic API key not configured')
  }

  const anthropic = new Anthropic({ apiKey })

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 16000,
    messages: [
      {
        role: 'user',
        content: `You are a website updater for small businesses. Apply the requested change to this HTML website. Return ONLY the complete updated HTML - no markdown, no explanations.

RULES:
1. Only change what is specifically requested
2. Maintain all existing design and styling
3. Keep the structure intact
4. If the request is unclear or impossible, make your best interpretation

WEBSITE HTML:
${currentHtml}

CHANGE REQUEST:
${updateRequest}

UPDATED HTML:`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type === 'text') {
    let html = content.text
    // Remove any markdown code blocks if present
    if (html.includes('```')) {
      html = html.replace(/```html\n?/g, '').replace(/```\n?/g, '')
    }
    return html.trim()
  }

  throw new Error('No response from AI')
}

// Also support GET for Vercel Cron (which uses GET by default)
export async function GET(request: NextRequest) {
  return POST(request)
}
