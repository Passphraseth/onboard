import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'

interface EditRequest {
  slug: string
  editType: 'text' | 'image' | 'color' | 'layout' | 'general'
  instruction: string
  // For text edits
  oldText?: string
  newText?: string
  // For image edits
  imageUrl?: string
  imageSection?: string // 'hero', 'portfolio', 'about', etc.
  // For color edits
  colorType?: 'primary' | 'accent' | 'background'
  colorValue?: string
}

// Apply a text replacement to HTML
function applyTextEdit(html: string, oldText: string, newText: string): string {
  // Escape regex special characters in oldText
  const escaped = oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(escaped, 'g')
  return html.replace(regex, newText)
}

// Apply color change to HTML
function applyColorEdit(html: string, colorType: string, colorValue: string): string {
  // Update CSS variable
  const varName = colorType === 'primary' ? '--primary'
    : colorType === 'accent' ? '--accent'
    : colorType === 'background' ? '--bg'
    : '--primary'

  // Replace in :root CSS
  const regex = new RegExp(`(${varName}:\\s*)#[0-9a-fA-F]{3,6}`, 'g')
  return html.replace(regex, `$1${colorValue}`)
}

// Apply image URL change
function applyImageEdit(html: string, section: string, imageUrl: string): string {
  // Find image in the specified section and replace src
  // This is a simplified version - production would need smarter matching

  if (section === 'hero') {
    // Replace hero background image
    return html.replace(
      /background:\s*url\(['"]?([^'")\s]+)['"]?\)([^;]*);?\s*(\/\*\s*hero\s*\*\/)?/gi,
      `background: url('${imageUrl}')$2;`
    ).replace(
      /\.hero-bg\s*\{[^}]*background:\s*url\(['"]?([^'")\s]+)['"]?\)/gi,
      `.hero-bg { background: url('${imageUrl}')`
    )
  }

  // For other sections, try to find and replace first image
  const imgRegex = new RegExp(`(<img[^>]*src=["'])([^"']+)(["'][^>]*>)`, 'i')
  return html.replace(imgRegex, `$1${imageUrl}$3`)
}

// Use Claude to apply complex edits
async function applyWithClaude(html: string, instruction: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    throw new Error('Claude API key required for complex edits')
  }

  const client = new Anthropic({ apiKey })

  const prompt = `You are editing an HTML website. Apply this change:

INSTRUCTION: ${instruction}

CURRENT HTML:
${html}

Apply the requested change and return the COMPLETE modified HTML.
- Keep all existing structure intact
- Only modify what's specifically requested
- Return ONLY the HTML, no explanations

Return the complete modified HTML starting with <!DOCTYPE html>`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 12000,
    messages: [{ role: 'user', content: prompt }]
  })

  const content = response.content[0]
  if (content.type === 'text') {
    let result = content.text
    if (result.startsWith('```')) {
      result = result.replace(/^```html?\n?/, '').replace(/\n?```$/, '')
    }
    return result.trim()
  }

  throw new Error('Failed to apply edit')
}

export async function POST(request: NextRequest) {
  try {
    const edit: EditRequest = await request.json()

    if (!edit.slug) {
      return NextResponse.json({ error: 'Slug required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Fetch current HTML
    const { data: site, error: fetchError } = await supabase
      .from('client_sites')
      .select('generated_html')
      .eq('slug', edit.slug)
      .single()

    if (fetchError || !site?.generated_html) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    let updatedHtml = site.generated_html

    // Apply edit based on type
    switch (edit.editType) {
      case 'text':
        if (edit.oldText && edit.newText) {
          updatedHtml = applyTextEdit(updatedHtml, edit.oldText, edit.newText)
        } else if (edit.instruction) {
          updatedHtml = await applyWithClaude(updatedHtml, edit.instruction)
        }
        break

      case 'image':
        if (edit.imageUrl) {
          updatedHtml = applyImageEdit(updatedHtml, edit.imageSection || 'hero', edit.imageUrl)
        } else if (edit.instruction) {
          updatedHtml = await applyWithClaude(updatedHtml, edit.instruction)
        }
        break

      case 'color':
        if (edit.colorType && edit.colorValue) {
          updatedHtml = applyColorEdit(updatedHtml, edit.colorType, edit.colorValue)
        } else if (edit.instruction) {
          updatedHtml = await applyWithClaude(updatedHtml, edit.instruction)
        }
        break

      case 'layout':
      case 'general':
        // Complex edits require Claude
        if (edit.instruction) {
          updatedHtml = await applyWithClaude(updatedHtml, edit.instruction)
        }
        break
    }

    // Save updated HTML
    const { error: updateError } = await supabase
      .from('client_sites')
      .update({
        generated_html: updatedHtml,
        updated_at: new Date().toISOString()
      })
      .eq('slug', edit.slug)

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json({ error: 'Failed to save changes' }, { status: 500 })
    }

    // Log the edit for history
    await supabase
      .from('update_requests')
      .insert({
        lead_id: null, // Will be set by trigger or manually
        channel: 'chat',
        raw_message: edit.instruction || `${edit.editType} edit`,
        parsed_intent: edit,
        status: 'published',
        processed_by: edit.instruction ? 'ai' : 'manual'
      })

    return NextResponse.json({
      success: true,
      slug: edit.slug,
      editType: edit.editType,
      message: 'Changes applied successfully'
    })

  } catch (error) {
    console.error('Edit error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to apply edit' },
      { status: 500 }
    )
  }
}

// GET - Fetch edit history for a site
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Slug required' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // Get lead ID for this slug
  const { data: lead } = await supabase
    .from('leads')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!lead) {
    return NextResponse.json({ edits: [] })
  }

  // Get edit history
  const { data: edits } = await supabase
    .from('update_requests')
    .select('*')
    .eq('lead_id', lead.id)
    .order('created_at', { ascending: false })
    .limit(20)

  return NextResponse.json({ edits: edits || [] })
}
