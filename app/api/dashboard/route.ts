import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

// Generate a secure random token
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Get dashboard data for a customer
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const leadId = searchParams.get('leadId')

    if (!email && !leadId) {
      return NextResponse.json(
        { error: 'Email or leadId is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Get lead/customer data
    let lead = null
    if (leadId) {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .maybeSingle()
      lead = data
    } else if (email) {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .eq('email', email)
        .maybeSingle()
      lead = data
    }

    if (!lead) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    // Auto-generate access token if missing
    if (!lead.access_token) {
      const newToken = generateToken()
      try {
        await supabase
          .from('leads')
          .update({ access_token: newToken })
          .eq('id', lead.id)
        lead.access_token = newToken
      } catch (tokenError) {
        // Column might not exist yet - continue without token
        console.log('Could not set access_token - column may not exist yet')
      }
    }

    // Get site content
    const { data: site } = await supabase
      .from('client_sites')
      .select('*')
      .eq('lead_id', lead.id)
      .maybeSingle()

    // Get update requests
    const { data: updates } = await supabase
      .from('update_requests')
      .select('*')
      .eq('lead_id', lead.id)
      .order('created_at', { ascending: false })
      .limit(10)

    // Calculate updates used this month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count: updatesThisMonth } = await supabase
      .from('update_requests')
      .select('*', { count: 'exact', head: true })
      .eq('lead_id', lead.id)
      .eq('status', 'completed')
      .gte('created_at', startOfMonth.toISOString())

    // Plan limits
    const planLimits: Record<string, number> = {
      starter: 2,
      growth: 5,
      pro: 999, // Unlimited
    }

    const plan = lead.plan || 'starter'
    const updatesLimit = planLimits[plan] || 2

    return NextResponse.json({
      customer: {
        id: lead.id,
        firstName: lead.contact_name?.split(' ')[0] || lead.business_name?.split(' ')[0] || 'there',
        businessName: lead.business_name,
        email: lead.email,
        phone: lead.phone,
        plan: plan,
        status: lead.status || 'active',
        siteUrl: `${lead.slug}.onboard.site`,
        slug: lead.slug,
        accessToken: lead.access_token, // For secure claim page access
      },
      site: site?.content || null,
      updates: updates || [],
      stats: {
        updatesUsed: updatesThisMonth || 0,
        updatesLimit,
        status: lead.status === 'active' ? 'live' : lead.status,
      },
    })
  } catch (error) {
    console.error('Dashboard GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
