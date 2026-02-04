import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('onboard_session')?.value

  if (!sessionToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const supabase = createAdminClient()

  // Find lead with this session token
  const { data: lead } = await supabase
    .from('leads')
    .select('id, email, business_name, slug, plan, status, session_expires')
    .eq('session_token', sessionToken)
    .single()

  if (!lead) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  // Check if session expired
  if (lead.session_expires && new Date(lead.session_expires) < new Date()) {
    return NextResponse.json({ authenticated: false, reason: 'expired' }, { status: 401 })
  }

  // Get site info
  const { data: site } = await supabase
    .from('client_sites')
    .select('id, status, generated_html')
    .eq('slug', lead.slug)
    .single()

  // Get update requests count
  const { count: updateCount } = await supabase
    .from('update_requests')
    .select('*', { count: 'exact', head: true })
    .eq('lead_id', lead.id)

  return NextResponse.json({
    authenticated: true,
    user: {
      id: lead.id,
      email: lead.email,
      businessName: lead.business_name,
      slug: lead.slug,
      plan: lead.plan || 'starter',
      status: lead.status
    },
    site: site ? {
      id: site.id,
      status: site.status,
      hasContent: !!site.generated_html
    } : null,
    updateRequests: updateCount || 0
  })
}

// Logout endpoint
export async function DELETE() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('onboard_session')?.value

  if (sessionToken) {
    const supabase = createAdminClient()

    // Clear session in database
    await supabase
      .from('leads')
      .update({ session_token: null, session_expires: null })
      .eq('session_token', sessionToken)
  }

  const response = NextResponse.json({ success: true })

  // Clear cookies
  response.cookies.delete('onboard_session')
  response.cookies.delete('onboard_user')

  return response
}
