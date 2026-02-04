import { NextRequest, NextResponse } from 'next/server'
import { stripe, PLANS, type PlanKey } from '@/lib/stripe/client'
import { createAdminClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan, email, businessName, phone, leadId } = body

    // Get the app URL from environment or derive from request
    const origin = request.headers.get('origin') || request.headers.get('referer')?.split('/').slice(0, 3).join('/') || ''
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || origin || 'https://www.onboard.com.au'

    // Validate plan
    if (!plan || !PLANS[plan as PlanKey]) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!email || !businessName) {
      return NextResponse.json(
        { error: 'Email and business name are required' },
        { status: 400 }
      )
    }

    const selectedPlan = PLANS[plan as PlanKey]
    const slug = slugify(businessName)
    const supabase = createAdminClient()

    // Create or update lead in database
    let lead = null
    if (leadId) {
      // Fetch existing lead
      const { data } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single()
      lead = data
    }

    if (!lead) {
      // Create new lead
      const { data, error } = await supabase
        .from('leads')
        .insert({
          business_name: businessName,
          slug,
          email,
          phone,
          source: 'organic',
          status: 'new',
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating lead:', error)
      } else {
        lead = data
      }
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/welcome?session_id={CHECKOUT_SESSION_ID}&slug=${slug}`,
      cancel_url: `${appUrl}/checkout?plan=${plan}&slug=${slug}`,
      subscription_data: {
        metadata: {
          lead_id: lead?.id || '',
          business_name: businessName,
          slug,
          phone: phone || '',
          plan,
        },
      },
      metadata: {
        lead_id: lead?.id || '',
        business_name: businessName,
        slug,
        phone: phone || '',
        plan,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
