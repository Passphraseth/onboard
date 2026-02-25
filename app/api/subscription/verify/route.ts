import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { createAdminClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID required' },
      { status: 400 }
    )
  }

  try {
    // Retrieve the Stripe checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer']
    })

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Get metadata from the session
    const metadata = session.metadata || {}
    const leadId = metadata.lead_id
    const businessName = metadata.business_name || ''
    const plan = metadata.plan || 'standard'
    const metadataSlug = metadata.slug || ''

    // Extract Stripe IDs
    const stripeCustomerId = typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id || null
    // Payment mode may not have a subscription
    const stripeSubscriptionId = session.subscription
      ? (typeof session.subscription === 'string'
        ? session.subscription
        : (session.subscription as { id?: string })?.id || null)
      : null

    const supabase = createAdminClient()

    // Get the lead and site info
    let slug = metadataSlug
    let sessionToken: string | null = null
    let sessionExpires: Date | null = null
    let finalLeadId = leadId

    // If no lead_id in metadata, try to find by email
    if (!finalLeadId && session.customer_email) {
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id, slug')
        .eq('email', session.customer_email.toLowerCase())
        .single()

      if (existingLead) {
        finalLeadId = existingLead.id
        slug = existingLead.slug || slug
      }
    }

    if (finalLeadId) {
      // Get the lead slug if we don't have it yet
      if (!slug) {
        const { data: existingLead } = await supabase
          .from('leads')
          .select('slug')
          .eq('id', finalLeadId)
          .single()

        slug = existingLead?.slug || ''
      }

      // Create a session token for auto-login (valid for 30 days)
      sessionToken = crypto.randomBytes(32).toString('hex')
      sessionExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

      // Update lead with subscription info AND session AND email from Stripe
      const updateData: Record<string, unknown> = {
        status: 'paid',
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId,
        plan,
        session_token: sessionToken,
        session_expires: sessionExpires.toISOString()
      }

      // Also update email from Stripe if provided (ensures email is synced)
      if (session.customer_email) {
        updateData.email = session.customer_email.toLowerCase()
      }

      const { error: leadError } = await supabase
        .from('leads')
        .update(updateData)
        .eq('id', finalLeadId)

      if (leadError) {
        console.error('Could not update lead:', leadError)
      }

      // Also update client_sites if it exists
      if (slug) {
        const { error: siteError } = await supabase
          .from('client_sites')
          .update({
            status: 'active',
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId
          })
          .eq('slug', slug)

        if (siteError) {
          console.error('Could not update client_sites:', siteError)
        }
      }
    }

    // If we don't have a slug from the lead, try to derive it from business name
    if (!slug && businessName) {
      slug = businessName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    // Create response with subscription data
    const response = NextResponse.json({
      businessName,
      slug,
      plan,
      email: session.customer_email || ''
    })

    // Set session cookie if we created a session
    if (sessionToken && sessionExpires) {
      response.cookies.set('onboard_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: sessionExpires,
        path: '/'
      })

      // Also set a non-httpOnly cookie for client-side awareness
      response.cookies.set('onboard_user', JSON.stringify({
        email: session.customer_email,
        businessName,
        slug
      }), {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: sessionExpires,
        path: '/'
      })
    }

    return response
  } catch (error) {
    console.error('Verify session error:', error)
    return NextResponse.json(
      { error: 'Failed to verify session' },
      { status: 500 }
    )
  }
}
