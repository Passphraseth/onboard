import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { createAdminClient } from '@/lib/supabase/server'

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
      expand: ['subscription', 'customer']
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
    const plan = metadata.plan || 'starter'
    const metadataSlug = metadata.slug || ''

    // Extract Stripe IDs
    const stripeCustomerId = typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id || null
    const stripeSubscriptionId = typeof session.subscription === 'string'
      ? session.subscription
      : (session.subscription as { id?: string })?.id || null

    const supabase = createAdminClient()

    // Get the lead and site info
    let slug = metadataSlug
    if (leadId) {
      // First get the lead to get the slug
      const { data: existingLead } = await supabase
        .from('leads')
        .select('slug')
        .eq('id', leadId)
        .single()

      slug = existingLead?.slug || ''

      // Update lead with subscription info
      const { error: leadError } = await supabase
        .from('leads')
        .update({
          status: 'subscribed',
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: stripeSubscriptionId,
          plan
        })
        .eq('id', leadId)

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

    return NextResponse.json({
      businessName,
      slug,
      plan,
      email: session.customer_email || ''
    })
  } catch (error) {
    console.error('Verify session error:', error)
    return NextResponse.json(
      { error: 'Failed to verify session' },
      { status: 500 }
    )
  }
}
