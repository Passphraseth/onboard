import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Admin key for secure access
const ADMIN_KEY = process.env.ADMIN_API_KEY

export const dynamic = 'force-dynamic'

// Get pending updates (admin view)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${ADMIN_KEY}` && ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') || 'pending'

  const { data: updates, error } = await supabase
    .from('update_requests')
    .select(`
      *,
      leads:lead_id (
        id,
        business_name,
        email,
        slug
      )
    `)
    .eq('status', status)
    .order('created_at', { ascending: true })
    .limit(50)

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch updates' }, { status: 500 })
  }

  return NextResponse.json({ updates })
}

// Process an update request
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${ADMIN_KEY}` && ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { updateId, action, manualChanges } = await request.json()

    if (!updateId || !action) {
      return NextResponse.json(
        { error: 'updateId and action are required' },
        { status: 400 }
      )
    }

    // Get the update request
    const { data: updateRequest, error: fetchError } = await supabase
      .from('update_requests')
      .select(`
        *,
        leads:lead_id (
          id,
          business_name,
          slug
        )
      `)
      .eq('id', updateId)
      .single()

    if (fetchError || !updateRequest) {
      return NextResponse.json({ error: 'Update request not found' }, { status: 404 })
    }

    const lead = updateRequest.leads as { id: string; business_name: string; slug: string } | null

    if (action === 'reject') {
      // Mark as rejected
      await supabase
        .from('update_requests')
        .update({
          status: 'rejected',
          completed_at: new Date().toISOString(),
        })
        .eq('id', updateId)

      return NextResponse.json({ success: true, status: 'rejected' })
    }

    if (action === 'process') {
      // Update status to processing
      await supabase
        .from('update_requests')
        .update({ status: 'processing' })
        .eq('id', updateId)

      // Get current site HTML
      const { data: site } = await supabase
        .from('client_sites')
        .select('id, generated_html, content')
        .eq('slug', lead?.slug)
        .single()

      if (!site?.generated_html) {
        return NextResponse.json({ error: 'Site not found or no HTML' }, { status: 404 })
      }

      let newHtml = site.generated_html

      // If manual changes provided, apply them directly
      if (manualChanges) {
        newHtml = manualChanges
      } else {
        // Try AI-powered update
        newHtml = await applyAIUpdate(site.generated_html, updateRequest.message)
      }

      // Update the site HTML
      await supabase
        .from('client_sites')
        .update({
          generated_html: newHtml,
          updated_at: new Date().toISOString(),
        })
        .eq('id', site.id)

      // Mark update as completed
      await supabase
        .from('update_requests')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          processed_by: manualChanges ? 'manual' : 'ai',
        })
        .eq('id', updateId)

      return NextResponse.json({
        success: true,
        status: 'completed',
        processedBy: manualChanges ? 'manual' : 'ai',
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error processing update:', error)
    return NextResponse.json(
      { error: 'Failed to process update' },
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
        content: `You are a website updater. You will receive an HTML website and an update request. Apply the requested changes to the HTML and return the complete updated HTML.

IMPORTANT RULES:
1. Return ONLY the complete HTML document, nothing else
2. Maintain the existing design and styling
3. Only change what is specifically requested
4. Keep all existing functionality intact
5. Do not add comments or explanations

CURRENT WEBSITE HTML:
${currentHtml}

UPDATE REQUEST:
${updateRequest}

Return the complete updated HTML:`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type === 'text') {
    // Extract HTML from the response (in case it's wrapped in markdown)
    let html = content.text
    if (html.includes('```html')) {
      html = html.replace(/```html\n?/g, '').replace(/```\n?/g, '')
    }
    return html.trim()
  }

  throw new Error('Failed to get AI response')
}
