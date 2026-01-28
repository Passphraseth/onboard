import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'
import { generatePreviewContent } from '@/lib/preview/generator'

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

    // Generate smart preview content based on business type
    const previewContent = generatePreviewContent(businessName, suburb)

    // Create new lead
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        business_name: businessName,
        slug,
        email: email || null,
        phone: phone || null,
        suburb: suburb || previewContent.suburb,
        category: previewContent.category,
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

    // Create preview site with smart content
    const { data: site, error: siteError } = await supabase
      .from('client_sites')
      .insert({
        slug,
        status: 'preview',
        template: 'service-v1',
        content: previewContent,
        settings: {
          colors: previewContent.colors,
          heroStyle: previewContent.heroStyle,
        },
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
      preview: previewContent,
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
