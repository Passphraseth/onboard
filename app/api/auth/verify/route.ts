import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  const email = request.nextUrl.searchParams.get('email')

  const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'https://www.onboard.com.au'

  if (!token || !email) {
    return NextResponse.redirect(`${origin}/login?error=invalid`)
  }

  const supabase = createAdminClient()

  // Find the lead with this token
  const { data: lead } = await supabase
    .from('leads')
    .select('id, slug, business_name, email, auth_token, auth_token_expires')
    .eq('email', email.toLowerCase())
    .single()

  if (!lead) {
    return NextResponse.redirect(`${origin}/login?error=not_found`)
  }

  // Verify token matches and hasn't expired
  if (lead.auth_token !== token) {
    return NextResponse.redirect(`${origin}/login?error=invalid_token`)
  }

  if (lead.auth_token_expires && new Date(lead.auth_token_expires) < new Date()) {
    return NextResponse.redirect(`${origin}/login?error=expired`)
  }

  // Clear the token (single use)
  await supabase
    .from('leads')
    .update({
      auth_token: null,
      auth_token_expires: null
    })
    .eq('id', lead.id)

  // Create a session token (valid for 30 days)
  const sessionToken = crypto.randomBytes(32).toString('hex')
  const sessionExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

  // Store session in database
  await supabase
    .from('leads')
    .update({
      session_token: sessionToken,
      session_expires: sessionExpires.toISOString()
    })
    .eq('id', lead.id)

  // Create response with redirect to dashboard
  const response = NextResponse.redirect(`${origin}/dashboard`)

  // Set session cookie
  response.cookies.set('onboard_session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: sessionExpires,
    path: '/'
  })

  // Also set a non-httpOnly cookie for client-side awareness
  response.cookies.set('onboard_user', JSON.stringify({
    email: lead.email,
    businessName: lead.business_name,
    slug: lead.slug
  }), {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: sessionExpires,
    path: '/'
  })

  return response
}
