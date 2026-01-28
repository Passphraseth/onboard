import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createAdminClient()

    // Fetch lead by slug
    const { data: lead, error } = await supabase
      .from('leads')
      .select('*, client_sites(*)')
      .eq('slug', params.slug)
      .single()

    if (error || !lead) {
      return NextResponse.json(
        { error: 'Preview not found' },
        { status: 404 }
      )
    }

    // Get site content
    const site = lead.client_sites?.[0] || lead.preview_site_id
      ? await supabase
          .from('client_sites')
          .select('*')
          .eq('id', lead.preview_site_id)
          .single()
          .then(r => r.data)
      : null

    return NextResponse.json({
      leadId: lead.id,
      businessName: lead.business_name,
      slug: lead.slug,
      content: site?.content || {
        businessName: lead.business_name,
        tagline: `Professional services in ${lead.suburb || 'Melbourne'}`,
      },
      status: lead.status,
    })
  } catch (error) {
    console.error('Error fetching preview:', error)
    return NextResponse.json(
      { error: 'Failed to fetch preview' },
      { status: 500 }
    )
  }
}
