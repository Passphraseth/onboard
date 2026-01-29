import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// Force regenerate a site's content using the latest research-driven approach
// Usage: POST /api/regenerate/spacez
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const supabase = createAdminClient()

    // Fetch existing lead data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*, client_sites(*)')
      .eq('slug', slug)
      .maybeSingle()

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead not found', slug },
        { status: 404 }
      )
    }

    // Extract metadata to rebuild onboarding data
    const metadata = lead.metadata || {}

    const onboardingData = {
      businessName: lead.business_name,
      businessType: lead.category || 'construction',
      customType: '',
      address: metadata.address || '',
      suburb: lead.suburb || 'Melbourne',
      state: lead.state || 'VIC',
      postcode: metadata.postcode || '',
      operatingHours: metadata.operatingHours || {},
      phone: lead.phone || '',
      email: lead.email || '',
      instagram: metadata.instagram || '',
      facebook: metadata.facebook || '',
      website: metadata.website || '',
      services: metadata.services || [],
      customServices: metadata.customServices || '',
      targetCustomers: metadata.targetCustomers || '',
      uniqueSellingPoints: metadata.uniqueSellingPoints || '',
      additionalNotes: metadata.additionalNotes || '',
    }

    // Call the enhanced preview API to regenerate with research
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/preview/enhanced`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(onboardingData),
    })

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json(
        { error: 'Failed to regenerate', details: error },
        { status: 500 }
      )
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      slug,
      message: `Regenerated ${lead.business_name} with research-driven content`,
      researchBased: result.preview?.researchBased || false,
      colors: result.preview?.colors,
      heroStyle: result.preview?.heroStyle,
    })
  } catch (error) {
    console.error('Regenerate error:', error)
    return NextResponse.json(
      { error: 'Failed to regenerate site' },
      { status: 500 }
    )
  }
}
