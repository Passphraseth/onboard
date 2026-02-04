import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic' // Disable caching

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createAdminClient()
    const slug = params.slug

    // Fetch lead by slug
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('slug', slug)
      .single()

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Preview not found' },
        { status: 404 }
      )
    }

    // Fetch site content directly by slug (more reliable than joins)
    const { data: site } = await supabase
      .from('client_sites')
      .select('*')
      .eq('slug', slug)
      .single()

    return NextResponse.json({
      leadId: lead.id,
      businessName: lead.business_name,
      slug: lead.slug,
      email: lead.email,
      phone: lead.phone,
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
