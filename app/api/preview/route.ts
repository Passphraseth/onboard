import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessName, email, phone, suburb } = body

    if (!businessName) {
      return NextResponse.json(
        { error: 'Business name is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const slug = slugify(businessName)

    // Check if lead already exists
    const { data: existingLead } = await supabase
      .from('leads')
      .select('*')
      .eq('slug', slug)
      .single()

    if (existingLead) {
      return NextResponse.json({
        slug: existingLead.slug,
        leadId: existingLead.id,
        message: 'Preview already exists',
      })
    }

    // Create new lead
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        business_name: businessName,
        slug,
        email: email || null,
        phone: phone || null,
        suburb: suburb || null,
        source: 'organic',
        status: 'new',
        state: 'VIC',
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating lead:', error)
      return NextResponse.json(
        { error: 'Failed to create preview' },
        { status: 500 }
      )
    }

    // Create preview site
    const { data: site, error: siteError } = await supabase
      .from('client_sites')
      .insert({
        slug,
        status: 'preview',
        template: 'service-v1',
        content: generatePreviewContent(businessName, suburb),
        settings: {},
      })
      .select()
      .single()

    if (siteError) {
      console.error('Error creating preview site:', siteError)
    } else {
      // Update lead with preview site ID
      await supabase
        .from('leads')
        .update({ preview_site_id: site.id })
        .eq('id', lead.id)
    }

    return NextResponse.json({
      slug: lead.slug,
      leadId: lead.id,
      siteId: site?.id,
      message: 'Preview created successfully',
    })
  } catch (error) {
    console.error('Preview error:', error)
    return NextResponse.json(
      { error: 'Failed to create preview' },
      { status: 500 }
    )
  }
}

function generatePreviewContent(businessName: string, suburb?: string) {
  // Generate placeholder content based on business name
  // In production, this would pull from Google Business API

  const location = suburb || 'Melbourne'

  return {
    businessName,
    tagline: `Professional services in ${location}`,
    description: `${businessName} provides quality services to customers in ${location} and surrounding areas. Contact us today for a free quote.`,
    phone: '0400 000 000',
    email: 'hello@example.com',
    address: `${location}, VIC`,
    hours: [
      { day: 'Monday', open: '8:00 AM', close: '5:00 PM' },
      { day: 'Tuesday', open: '8:00 AM', close: '5:00 PM' },
      { day: 'Wednesday', open: '8:00 AM', close: '5:00 PM' },
      { day: 'Thursday', open: '8:00 AM', close: '5:00 PM' },
      { day: 'Friday', open: '8:00 AM', close: '5:00 PM' },
      { day: 'Saturday', closed: true },
      { day: 'Sunday', closed: true },
    ],
    services: [
      {
        name: 'Service 1',
        description: 'Description of your first service',
        icon: '⚡',
      },
      {
        name: 'Service 2',
        description: 'Description of your second service',
        icon: '🔧',
      },
      {
        name: 'Service 3',
        description: 'Description of your third service',
        icon: '✨',
      },
    ],
    testimonials: [
      {
        name: 'Happy Customer',
        text: 'Great service, highly recommended!',
        rating: 5,
      },
    ],
    colors: {
      primary: '#2563eb',
      secondary: '#0a0a0a',
      accent: '#d4ff00',
    },
  }
}
