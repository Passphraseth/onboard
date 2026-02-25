import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

// Lightweight onboard endpoint — just saves form data to Supabase
// No AI generation, no research, no Instagram scraping
// Site is built manually by the team (done-for-you model)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.businessName) {
      return NextResponse.json(
        { error: 'Business name is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const slug = slugify(data.businessName)
    const businessType = data.businessType === 'other' ? data.customType : data.businessType

    // Check if lead already exists
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id, slug')
      .eq('slug', slug)
      .maybeSingle()

    const metadata = {
      address: data.address,
      postcode: data.postcode,
      operatingHours: data.operatingHours,
      instagram: data.instagram,
      facebook: data.facebook,
      website: data.website,
      services: data.services,
      customServices: data.customServices,
      targetCustomers: data.targetCustomers,
      uniqueSellingPoints: data.uniqueSellingPoints,
      additionalNotes: data.additionalNotes,
      preferredColors: data.preferredColors,
      preferredTone: data.preferredTone,
      logoUrl: data.logoUrl,
    }

    if (existingLead) {
      // Update existing lead
      await supabase
        .from('leads')
        .update({
          email: data.email || undefined,
          phone: data.phone || undefined,
          suburb: data.suburb,
          state: data.state,
          category: businessType,
          metadata,
        })
        .eq('id', existingLead.id)

      return NextResponse.json({
        slug: existingLead.slug,
        leadId: existingLead.id,
      })
    }

    // Create new lead
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        business_name: data.businessName,
        slug,
        email: data.email || null,
        phone: data.phone || null,
        suburb: data.suburb,
        state: data.state,
        category: businessType,
        source: 'onboard_questionnaire',
        status: 'new',
        metadata,
      })
      .select('id, slug')
      .single()

    if (error) {
      console.error('Error creating lead:', error)
      return NextResponse.json(
        { error: 'Failed to save your details' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      slug: lead.slug,
      leadId: lead.id,
    })
  } catch (error) {
    console.error('Onboard error:', error)
    return NextResponse.json(
      { error: 'Failed to save your details' },
      { status: 500 }
    )
  }
}
