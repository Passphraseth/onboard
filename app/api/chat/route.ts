import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

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

    // Try to get messages - handle if table doesn't exist
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

    // Try to save the user's message (don't fail if table doesn't exist)
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

    // Generate intelligent response
    const response = generateResponse(message, lead.business_name)

    // Try to save the assistant's response
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
    })
  } catch (error) {
    console.error('Chat POST error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}

function generateResponse(userMessage: string, businessName: string): string {
  const msg = userMessage.toLowerCase()

  // Image/photo requests
  if (msg.match(/image|photo|picture|logo|banner|hero image/i)) {
    return `I can add imagery to your site. Here are your options:\n\n1. Send us your photos after subscribing and we'll add them\n2. If you have an Instagram, we can pull images from there (Growth plan)\n3. We can source professional stock photos that match your industry\n\nWhich would work best for ${businessName}?`
  }

  // Color changes
  if (msg.match(/colou?r|palette|theme|brand colou?r/i)) {
    return `I can update the color scheme. Could you share:\n\n• Your preferred primary color (main brand color)\n• An accent color (for buttons and highlights)\n\nYou can describe them (like "navy blue" or "forest green") or share hex codes if you have them.`
  }

  // Font/typography
  if (msg.match(/font|typeface|text style|typography|heading/i)) {
    return `I can adjust the typography. What style fits ${businessName} best?\n\n• Modern & Clean (current style)\n• Traditional & Professional (serif fonts)\n• Bold & Impactful (heavy weights)\n• Elegant & Refined (thin, sophisticated)\n\nLet me know and I'll update it.`
  }

  // Layout changes
  if (msg.match(/layout|design|structure|section|move|rearrange|order/i)) {
    return `I can restructure the layout. What would you like to change?\n\n• Hero section style (full-width image, split layout, minimal)\n• Section order (move testimonials higher, services first, etc.)\n• Add or remove sections\n\nJust describe what you're thinking.`
  }

  // Content/copy changes
  if (msg.match(/text|wording|copy|tagline|headline|description|about|bio/i)) {
    return `Happy to update the copy. Which section needs work?\n\n• Hero tagline/headline\n• About section\n• Service descriptions\n• Testimonials\n\nShare the new text you'd like, or describe what you want to say and I'll draft options.`
  }

  // Service changes
  if (msg.match(/service|offering|add service|remove service|what we do/i)) {
    return `I can update your services. Would you like to:\n\n• Add a new service\n• Remove a service\n• Edit an existing service description\n• Reorder services\n\nTell me the details and I'll make the changes.`
  }

  // Contact/hours/location
  if (msg.match(/contact|phone|email|address|location|hours|opening/i)) {
    return `I can update your contact details. What needs to change?\n\n• Phone number\n• Email address\n• Business address\n• Opening hours\n• Service areas\n\nJust share the correct information.`
  }

  // Pricing questions
  if (msg.match(/price|cost|plan|subscription|how much|payment/i)) {
    return `Here are the plans:\n\nStarter - $29/mo\nSingle page, contact form, 2 updates/month\n\nGrowth - $49/mo (Most Popular)\nUp to 5 pages, custom domain, booking widget, 5 updates/month\n\nPro - $79/mo\nUnlimited pages & updates, payment integration, priority support\n\nAll plans include hosting and SSL. Which interests you?`
  }

  // Ready to proceed
  if (msg.match(/ready|buy|purchase|subscribe|sign up|get started|proceed/i)) {
    return `Click the "Choose a Plan" tab above to select your plan and complete checkout. Your site will be live within 24 hours.\n\nAny final tweaks you want before we publish?`
  }

  // Looks good / approval
  if (msg.match(/looks good|perfect|love it|happy|great|awesome|nice/i)) {
    return `Glad you like it. When you're ready, head to the "Choose a Plan" tab to go live.\n\nIs there anything you'd like to adjust first?`
  }

  // Questions about process
  if (msg.match(/how long|timeline|when|process|what happens|next step/i)) {
    return `Here's how it works:\n\n1. Choose a plan and checkout\n2. We finalize your site within 24 hours\n3. You review and approve\n4. We publish to your domain\n\nAfter that, just text or email us anytime you need updates.`
  }

  // Competitor mention
  if (msg.match(/competitor|other site|like their|similar to|website i saw/i)) {
    return `If you've seen a site you like, share the URL and I'll note the elements you want to incorporate:\n\n• Layout style\n• Color scheme\n• Section structure\n• Specific features\n\nWe can match the quality while making it unique to ${businessName}.`
  }

  // Domain questions
  if (msg.match(/domain|url|web address|\.com|\.au/i)) {
    const cleanName = businessName.toLowerCase().replace(/[^a-z0-9]/g, '')
    return `Good question about domains:\n\nStarter Plan: Your site lives at ${cleanName}.onboard.site\n\nGrowth & Pro Plans: We set up your own domain (like ${cleanName}.com.au) - included free\n\nAlready own a domain? We can connect it on any plan.`
  }

  // Greeting
  if (msg.match(/^(hi|hello|hey|g'day|good morning|good afternoon)/i)) {
    return `Hello. How can I help you customize ${businessName}'s website? I can update colors, layout, content, contact details - just let me know what you'd like to change.`
  }

  // Thank you
  if (msg.match(/thank|thanks|cheers|appreciate/i)) {
    return `You're welcome. Let me know if there's anything else you'd like to adjust. Otherwise, the "Choose a Plan" tab is ready when you are.`
  }

  // Default - helpful and specific
  return `I can help with that. To make sure I understand correctly, could you be more specific about what you'd like to change?\n\nFor example:\n• "Change the main color to dark blue"\n• "Update the tagline to [your text]"\n• "Add a new service called [name]"\n• "Move testimonials above services"\n\nWhat would you like to do?`
}
