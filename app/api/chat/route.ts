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
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

    if (!lead) {
      return NextResponse.json({ messages: [] })
    }

    // Get messages for this lead
    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('lead_id', lead.id)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching messages:', error)
      return NextResponse.json({ messages: [] })
    }

    return NextResponse.json({ messages: messages || [] })
  } catch (error) {
    console.error('Chat GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

// Send a new chat message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, message, sender = 'user' } = body

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
    const { data: userMessage, error: saveError } = await supabase
      .from('chat_messages')
      .insert({
        lead_id: lead.id,
        sender,
        message,
      })
      .select()
      .single()

    if (saveError) {
      console.error('Error saving message:', saveError)
      // Continue anyway - we can still respond
    }

    // Generate a helpful response based on the message content
    const response = generateResponse(message, lead.business_name)

    // Save the assistant's response
    const { data: assistantMessage } = await supabase
      .from('chat_messages')
      .insert({
        lead_id: lead.id,
        sender: 'assistant',
        message: response,
      })
      .select()
      .single()

    return NextResponse.json({
      userMessage,
      assistantMessage,
    })
  } catch (error) {
    console.error('Chat POST error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

function generateResponse(message: string, businessName: string): string {
  const lowerMessage = message.toLowerCase()

  // Color/style changes
  if (lowerMessage.includes('color') || lowerMessage.includes('colour')) {
    return `I can definitely update the colors for ${businessName}! Just let me know what colors you'd like - you can describe them (like "navy blue" or "forest green") or give me hex codes if you have them. Which section would you like to change? 🎨`
  }

  // Font changes
  if (lowerMessage.includes('font') || lowerMessage.includes('text') || lowerMessage.includes('typography')) {
    return `Great eye for detail! I can adjust the fonts to better match your brand. Would you prefer something more modern and clean, classic and elegant, or bold and impactful? 📝`
  }

  // Layout changes
  if (lowerMessage.includes('layout') || lowerMessage.includes('design') || lowerMessage.includes('look')) {
    return `I'd love to refine the layout for you! What specifically would you like to change? For example: the hero section style, how services are displayed, or the overall structure? 🏗️`
  }

  // Content/text changes
  if (lowerMessage.includes('text') || lowerMessage.includes('wording') || lowerMessage.includes('description') || lowerMessage.includes('tagline')) {
    return `Happy to update the text! Just share the exact wording you'd like, and let me know which section (tagline, description, services, etc.) needs the change. ✍️`
  }

  // Logo/branding
  if (lowerMessage.includes('logo') || lowerMessage.includes('brand')) {
    return `Your branding is important! Once you subscribe, you can send us your logo and brand guidelines and we'll integrate them into your site. Want me to note any specific branding preferences? 🎯`
  }

  // Photos/images
  if (lowerMessage.includes('photo') || lowerMessage.includes('image') || lowerMessage.includes('picture')) {
    return `Great thinking! After you subscribe, you can send us your photos and we'll add them to make the site uniquely yours. Instagram integration is also available on our Growth and Pro plans! 📸`
  }

  // Services
  if (lowerMessage.includes('service') || lowerMessage.includes('offering')) {
    return `I can adjust the services section! Would you like to add, remove, or modify any services? Just tell me what you offer and I'll update it. 💼`
  }

  // Contact info
  if (lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('address') || lowerMessage.includes('contact') || lowerMessage.includes('hours')) {
    return `I can update your contact details right away! Just share the correct information (phone, email, address, or hours) and I'll make the change. 📞`
  }

  // Pricing questions
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('plan')) {
    return `Great question! We have three plans:\n\n🌱 **Starter ($29/mo)** - Single page, contact form, 2 updates/month\n🚀 **Growth ($49/mo)** - Up to 5 pages, custom domain, booking widget\n👑 **Pro ($79/mo)** - Unlimited pages & updates, payment integration\n\nWhich sounds right for ${businessName}?`
  }

  // Ready to buy
  if (lowerMessage.includes('ready') || lowerMessage.includes('buy') || lowerMessage.includes('subscribe') || lowerMessage.includes('purchase')) {
    return `Awesome! 🎉 Just head to the "Choose a Plan" tab above and pick the plan that works best for ${businessName}. We'll have your site live within 24 hours of subscribing!`
  }

  // Thanks
  if (lowerMessage.includes('thank') || lowerMessage.includes('perfect') || lowerMessage.includes('great')) {
    return `You're welcome! Is there anything else you'd like to tweak before going live? I'm here to help make ${businessName}'s website perfect! 😊`
  }

  // Default helpful response
  return `Thanks for your feedback! I'm here to help make ${businessName}'s website exactly what you're looking for. You can ask me to change colors, fonts, layout, text, or anything else you see in the preview. What would you like to adjust? 💡`
}
