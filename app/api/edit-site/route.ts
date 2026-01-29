import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'

export const dynamic = 'force-dynamic'

interface EditRequest {
  slug: string
  editType: 'text' | 'image' | 'color' | 'layout' | 'general'
  instruction?: string
  oldText?: string
  newText?: string
  imageUrl?: string
  imageSection?: string
  colorType?: 'primary' | 'accent' | 'background'
  colorValue?: string
}

function applyTextEdit(html: string, oldText: string, newText: string): string {
  return html.replace(new RegExp(escapeRegex(oldText), 'g'), newText)
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function applyColorEdit(html: string, colorType: string, colorValue: string): string {
  // Replace CSS variable or inline styles
  const colorMap: Record<string, string[]> = {
    primary: ['--primary', 'primary-color', '#2563eb'],
    accent: ['--accent', 'accent-color', '#d4ff00'],
    background: ['--background', 'background-color', '#ffffff']
  }

  let result = html
  const targets = colorMap[colorType] || []

  targets.forEach(target => {
    if (target.startsWith('--')) {
      result = result.replace(new RegExp(`${target}:\\s*[^;]+`, 'g'), `${target}: ${colorValue}`)
    } else if (target.startsWith('#')) {
      result = result.replace(new RegExp(target, 'gi'), colorValue)
    }
  })

  return result
}

function applyImageEdit(html: string, section: string, imageUrl: string): string {
  // Find image in the specified section and replace
  const sectionPatterns: Record<string, RegExp> = {
    hero: /<section[^>]*class="[^"]*hero[^"]*"[^>]*>[\s\S]*?<\/section>/i,
    about: /<section[^>]*class="[^"]*about[^"]*"[^>]*>[\s\S]*?<\/section>/i,
    portfolio: /<section[^>]*class="[^"]*portfolio[^"]*"[^>]*>[\s\S]*?<\/section>/i,
  }

  const pattern = sectionPatterns[section]
  if (pattern) {
    const match = html.match(pattern)
    if (match) {
      const sectionHtml = match[0]
      const updatedSection = sectionHtml.replace(
        /<img[^>]*src="[^"]*"[^>]*>/i,
        `<img src="${imageUrl}" alt="${section}" style="width: 100%; height: auto;">`
      )
      return html.replace(sectionHtml, updatedSection)
    }
  }

  // Fallback: replace first image
  return html.replace(
    /<img[^>]*src="[^"]*"/i,
    `<img src="${imageUrl}"`
  )
}

async function applyWithClaude(html: string, instruction: string): Promise<string> {
  const client = new Anthropic()

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    messages: [{
      role: 'user',
      content: `Modify this HTML according to the instruction. Return ONLY the modified HTML, no explanations.

INSTRUCTION: ${instruction}

HTML:
${html}

Return the complete modified HTML:`
    }]
  })

  const content = response.content[0]
  if (content.type === 'text') {
    let result = content.text
    result = result.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '')
    return result
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

    return NextResponse.json({
      success: true,
      message: 'Edit applied successfully'
    })
  } catch (error) {
    console.error('Edit error:', error)
    return NextResponse.json(
      { error: 'Failed to apply edit' },
      { status: 500 }
    )
  }
}
