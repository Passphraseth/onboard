import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

interface EditAction {
  type: 'text' | 'image' | 'color' | 'layout' | 'general' | 'none'
  instruction?: string
  oldText?: string
  newText?: string
  colorType?: 'primary' | 'accent' | 'background'
  colorValue?: string
  imageUrl?: string
  imageSection?: string
}

// Parse user message to detect edit intent
function parseEditIntent(message: string): EditAction {
  const msg = message.toLowerCase()

  // Direct text replacement: "change X to Y"
  const changeMatch = message.match(/change\s+["']?(.+?)["']?\s+to\s+["']?(.+?)["']?$/i)
  if (changeMatch) {
    return {
      type: 'text',
      oldText: changeMatch[1].trim(),
      newText: changeMatch[2].trim()
    }
  }

  // "Replace X with Y"
  const replaceMatch = message.match(/replace\s+["']?(.+?)["']?\s+with\s+["']?(.+?)["']?$/i)
  if (replaceMatch) {
    return {
      type: 'text',
      oldText: replaceMatch[1].trim(),
      newText: replaceMatch[2].trim()
    }
  }

  // Color changes
  const colorMatch = msg.match(/(primary|accent|background|main)\s*(colou?r)?\s*(?:to|=|:)?\s*([#\w]+)/i)
  if (colorMatch) {
    const colorType = colorMatch[1] === 'main' ? 'primary' : colorMatch[1] as 'primary' | 'accent' | 'background'
    return {
      type: 'color',
      colorType,
      colorValue: colorMatch[3]
    }
  }

  // Simple color mentions with hex
  const hexMatch = message.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/i)
  if (hexMatch && msg.includes('color')) {
    return {
      type: 'color',
      colorType: 'primary',
      colorValue: `#${hexMatch[1]}`
    }
  }

  // Color name changes
  if (msg.match(/colou?r.*(blue|green|red|black|white|purple|orange|pink|navy|gold)/i)) {
    const colorNames: Record<string, string> = {
      blue: '#2563eb',
      navy: '#1e3a8a',
      green: '#16a34a',
      red: '#dc2626',
      black: '#18181b',
      white: '#ffffff',
      purple: '#9333ea',
      orange: '#ea580c',
      pink: '#ec4899',
      gold: '#ca8a04'
    }
    const colorName = msg.match(/blue|green|red|black|white|purple|orange|pink|navy|gold/i)?.[0].toLowerCase()
    if (colorName && colorNames[colorName]) {
      return {
        type: 'color',
        colorType: 'primary',
        colorValue: colorNames[colorName]
      }
    }
  }

  // Image URL provided
  const urlMatch = message.match(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i)
  if (urlMatch) {
    const section = msg.includes('hero') ? 'hero' :
                   msg.includes('about') ? 'about' :
                   msg.includes('portfolio') ? 'portfolio' : 'hero'
    return {
      type: 'image',
      imageUrl: urlMatch[1],
      imageSection: section
    }
  }

  // Layout-related requests
  if (msg.match(/move|rearrange|swap|reorder|layout|section|position/i)) {
    return {
      type: 'layout',
      instruction: message
    }
  }

  // General edit requests that need AI
  if (msg.match(/add|remove|delete|update|change|modify|make|set/i)) {
    return {
      type: 'general',
      instruction: message
    }
  }

  return { type: 'none' }
}

// Apply edit via the edit-site API
async function applyEdit(slug: string, action: EditAction): Promise<{ success: boolean; message: string }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const response = await fetch(`${baseUrl}/api/edit-site`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug,
        editType: action.type,
        instruction: action.instruction,
        oldText: action.oldText,
        newText: action.newText,
        colorType: action.colorType,
        colorValue: action.colorValue,
        imageUrl: action.imageUrl,
        imageSection: action.imageSection
      })
    })

    if (response.ok) {
      return { success: true, message: 'Changes applied successfully!' }
    } else {
      const error = await response.json()
      return { success: false, message: error.error || 'Failed to apply changes' }
    }
  } catch (error) {
    console.error('Edit API error:', error)
    return { success: false, message: 'Failed to connect to edit service' }
  }
}

// Get chat messages for a lead
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Get lead by slug
    const { data: lead } = await supabase
      .from('leads')
      .select('id, business_name')
      .eq('slug', slug)
      .maybeSingle()

    if (!lead) {
      return NextResponse.json({ messages: [] })
    }

    // Try to get messages
    try {
      const { data: messages, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('lead_id', lead.id)
        .order('created_at', { ascending: true })

      if (error) {
        console.log('Chat messages table may not exist:', error.code)
        return NextResponse.json({ messages: [] })
      }

      return NextResponse.json({ messages: messages || [] })
    } catch {
      return NextResponse.json({ messages: [] })
    }
  } catch (error) {
    console.error('Chat GET error:', error)
    return NextResponse.json({ messages: [] })
  }
}

// Send a new chat message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, message } = body

    if (!slug || !message) {
      return NextResponse.json(
        { error: 'Slug and message are required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Get lead by slug
    const { data: lead } = await supabase
      .from('leads')
      .select('id, business_name')
      .eq('slug', slug)
      .maybeSingle()

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Save the user's message
    try {
      await supabase
        .from('chat_messages')
        .insert({
          lead_id: lead.id,
          sender: 'user',
          message,
        })
    } catch (e) {
      console.log('Could not save user message:', e)
    }

    // Parse edit intent
    const editAction = parseEditIntent(message)
    let response: string
    let editApplied = false

    // If this is an actionable edit, apply it
    if (editAction.type !== 'none') {
      const result = await applyEdit(slug, editAction)
      editApplied = result.success

      if (result.success) {
        response = generateSuccessResponse(editAction, lead.business_name)
      } else {
        response = generateHelpResponse(message, lead.business_name, result.message)
      }
    } else {
      // Not an edit request - provide helpful guidance
      response = generateHelpResponse(message, lead.business_name)
    }

    // Save the assistant's response
    try {
      await supabase
        .from('chat_messages')
        .insert({
          lead_id: lead.id,
          sender: 'assistant',
          message: response,
        })
    } catch (e) {
      console.log('Could not save assistant message:', e)
    }

    return NextResponse.json({
      assistantMessage: {
        sender: 'assistant',
        message: response,
      },
      editApplied,
      editType: editAction.type
    })
  } catch (error) {
    console.error('Chat POST error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}

function generateSuccessResponse(action: EditAction, businessName: string): string {
  switch (action.type) {
    case 'text':
      return `Done! I've updated "${action.oldText}" to "${action.newText}". Refresh the preview to see the change.`
    case 'color':
      return `I've updated the ${action.colorType} color to ${action.colorValue}. Refresh to see the new look!`
    case 'image':
      return `Image updated in the ${action.imageSection} section. Refresh to see it!`
    case 'layout':
      return `Layout changes applied! Refresh the preview to see the new arrangement.`
    case 'general':
      return `Done! I've made the changes you requested. Refresh the preview to see them.`
    default:
      return `Changes applied successfully! Refresh to see the updates.`
  }
}

function generateHelpResponse(userMessage: string, businessName: string, errorMessage?: string): string {
  const msg = userMessage.toLowerCase()

  if (errorMessage) {
    return `I couldn't apply that change: ${errorMessage}\n\nTry being more specific, like:\n• "Change [old text] to [new text]"\n• "Make the primary color blue"\n• "Add a section about our team"`
  }

  // Image/photo requests
  if (msg.match(/image|photo|picture|logo|banner|hero image/i)) {
    return `To update images, you can:\n\n1. Paste an image URL directly\n2. Use the Image Editor (click the edit icon on images)\n3. Email photos to hello@onboard.com.au\n\nFor example: "Add this image to the hero: https://example.com/photo.jpg"`
  }

  // Color changes
  if (msg.match(/colou?r|palette|theme|brand colou?r/i)) {
    return `To change colors, try:\n\n• "Make the primary color navy"\n• "Change accent color to #ff6b35"\n• "Set background to black"\n\nSupported colors: blue, navy, green, red, black, purple, orange, pink, gold - or use hex codes.`
  }

  // Text/content changes
  if (msg.match(/text|wording|copy|tagline|headline|description|about|bio/i)) {
    return `To update text, use this format:\n\n• "Change [old text] to [new text]"\n• "Replace 'Quality Service' with 'Premium Service'"\n\nOr use the Text Editor - click directly on any text in the preview to edit it.`
  }

  // Layout changes
  if (msg.match(/layout|design|structure|section|move|rearrange|order/i)) {
    return `Tell me what you'd like to rearrange:\n\n• "Move the testimonials section above services"\n• "Add a new section for our team"\n• "Remove the portfolio section"\n\nI'll restructure the layout for you.`
  }

  // Pricing questions
  if (msg.match(/price|cost|plan|subscription|how much|payment/i)) {
    return `Plans:\n\nStarter - $29/mo: Single page, contact form, 2 updates/month\n\nGrowth - $49/mo: Up to 5 pages, custom domain, 5 updates/month\n\nPro - $79/mo: Unlimited pages & updates, priority support\n\nClick "Choose a Plan" when ready!`
  }

  // Ready to proceed
  if (msg.match(/ready|buy|purchase|subscribe|sign up|get started|proceed/i)) {
    return `Click the "Choose a Plan" tab to select your plan and complete checkout. Your site will be live within 24 hours!`
  }

  // Looks good / approval
  if (msg.match(/looks good|perfect|love it|happy|great|awesome|nice/i)) {
    return `Glad you like it! When you're ready, head to "Choose a Plan" to go live. Any final tweaks first?`
  }

  // Greeting
  if (msg.match(/^(hi|hello|hey|g'day|good morning|good afternoon)/i)) {
    return `Hello! I can help you customize ${businessName}'s website. What would you like to change?\n\nTry things like:\n• "Change the tagline to..."\n• "Make the colors darker"\n• "Add my photo to the hero"`
  }

  // Default
  return `I can help you edit the site! Try:\n\n• Text: "Change [old text] to [new text]"\n• Colors: "Make the primary color blue"\n• Images: "Add this image: [URL]"\n• Layout: "Move testimonials above services"\n\nOr use the visual editors - click directly on text or images to edit them.`
}
