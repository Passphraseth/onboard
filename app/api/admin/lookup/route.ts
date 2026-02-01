import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// Admin lookup endpoint - find leads by business name, slug, or email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const listAll = searchParams.get('all') === 'true'

    const supabase = createAdminClient()

    if (listAll) {
      // List all leads (for admin purposes)
      const { data: leads, error } = await supabase
        .from('leads')
        .select('id, business_name, slug, email, plan, status, created_at')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error

      return NextResponse.json({
        leads: leads?.map(lead => ({
          id: lead.id,
          businessName: lead.business_name,
          slug: lead.slug,
          email: lead.email,
          plan: lead.plan || 'starter',
          status: lead.status || 'pending',
          dashboardUrl: `/dashboard?id=${lead.id}`,
          siteUrl: `https://${lead.slug}.onboard.site`,
          createdAt: lead.created_at,
        })) || [],
      })
    }

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required (or use all=true)' },
        { status: 400 }
      )
    }

    // Search by business name (case insensitive), slug, or email
    const { data: leads, error } = await supabase
      .from('leads')
      .select('id, business_name, slug, email, plan, status, contact_name')
      .or(`business_name.ilike.%${query}%,slug.ilike.%${query}%,email.ilike.%${query}%`)
      .limit(10)

    if (error) throw error

    return NextResponse.json({
      query,
      results: leads?.map(lead => ({
        id: lead.id,
        businessName: lead.business_name,
        contactName: lead.contact_name,
        slug: lead.slug,
        email: lead.email,
        plan: lead.plan || 'starter',
        status: lead.status || 'pending',
        dashboardUrl: `/dashboard?id=${lead.id}`,
        siteUrl: `https://${lead.slug}.onboard.site`,
      })) || [],
    })
  } catch (error) {
    console.error('Admin lookup error:', error)
    return NextResponse.json(
      { error: 'Failed to lookup leads' },
      { status: 500 }
    )
  }
}
