import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { SETUP_FEE } from '@/lib/stripe/plans'
import { createAdminClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, businessName, phone, leadId, slug: existingSlug } = body

    // Get the app URL from environment or derive from request
    const origin = request.headers.get('origin') || request.headers.get('referer')?.split('/').slice(0, 3).join('/') || ''
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || origin || 'https://www.onboard.com.au'

    // Validate required fields
    if (!email || !businessName) {
      return NextResponse.json(
        { error: 'Email and business name are required' },
        { status: 400 }
      )
    }

    const slug = existingSlug || slugify(businessName)
    const supabase = createAdminClient()

    // Create or update lead in database
    let lead = null
    if (leadId) {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single()
      lead = data
    }

    if (!lead) {
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

    const metadata = {
      lead_id: lead?.id || '',
      business_name: businessName,
      slug,
      phone: phone || '',
      plan: 'standard',
    }

    // Create Stripe Checkout Session
    // Charge setup fee now ($495). Monthly subscription ($79/mo) starts when site goes live.
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'aud',
            unit_amount: SETUP_FEE * 100,
            product_data: {
              name: 'Website Setup — Done For You',
              description: 'Custom design, professional copywriting, image sourcing, SEO foundation, mobile optimised. Ready in 7 business days.',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/welcome?session_id={CHECKOUT_SESSION_ID}&slug=${slug}`,
      cancel_url: `${appUrl}/checkout?slug=${slug}`,
      metadata,
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
