import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe/client'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  const supabase = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(supabase, session)
        break
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaid(supabase, invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(supabase, invoice)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(supabase, subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(supabase, subscription)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(
  supabase: ReturnType<typeof createAdminClient>,
  session: Stripe.Checkout.Session
) {
  const metadata = session.metadata || {}
  const subscriptionId = session.subscription as string
  const customerId = session.customer as string

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  // Create customer record
  const { data: customer, error: customerError } = await supabase
    .from('customers')
    .insert({
      lead_id: metadata.lead_id || null,
      stripe_customer_id: customerId,
      email: session.customer_email!,
      phone: metadata.phone || null,
      business_name: metadata.business_name || 'Unknown Business',
      plan: metadata.plan as 'starter' | 'growth' | 'pro',
      status: 'active',
      updates_this_month: 0,
      billing_cycle_start: new Date().toISOString(),
    })
    .select()
    .single()

  if (customerError) {
    console.error('Error creating customer:', customerError)
    return
  }

  // Create subscription record
  await supabase.from('subscriptions').insert({
    customer_id: customer.id,
    stripe_subscription_id: subscriptionId,
    stripe_price_id: subscription.items.data[0].price.id,
    plan: metadata.plan as 'starter' | 'growth' | 'pro',
    status: 'active',
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    cancel_at_period_end: false,
  })

  // Create client site (placeholder for now)
  const slug = metadata.business_name
    ? metadata.business_name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    : `site-${customer.id.slice(0, 8)}`

  await supabase.from('client_sites').insert({
    customer_id: customer.id,
    slug,
    status: 'preview',
    template: 'service-v1',
    content: {
      businessName: metadata.business_name,
      phone: metadata.phone,
    },
    settings: {},
  })

  // Update lead status if exists
  if (metadata.lead_id) {
    await supabase
      .from('leads')
      .update({ status: 'converted' })
      .eq('id', metadata.lead_id)
  }

  // TODO: Send welcome email/SMS
  console.log(`✅ New customer created: ${customer.email} (${metadata.plan} plan)`)
}

async function handleInvoicePaid(
  supabase: ReturnType<typeof createAdminClient>,
  invoice: Stripe.Invoice
) {
  const customerId = invoice.customer as string

  // Reset monthly update counter
  await supabase
    .from('customers')
    .update({
      updates_this_month: 0,
      billing_cycle_start: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId)

  console.log(`💰 Invoice paid for customer: ${customerId}`)
}

async function handlePaymentFailed(
  supabase: ReturnType<typeof createAdminClient>,
  invoice: Stripe.Invoice
) {
  const customerId = invoice.customer as string

  // Update subscription status
  await supabase
    .from('subscriptions')
    .update({ status: 'past_due' })
    .eq('stripe_subscription_id', invoice.subscription as string)

  // TODO: Send payment failed email/SMS
  console.log(`⚠️ Payment failed for customer: ${customerId}`)
}

async function handleSubscriptionUpdated(
  supabase: ReturnType<typeof createAdminClient>,
  subscription: Stripe.Subscription
) {
  const priceId = subscription.items.data[0].price.id

  // Determine plan from price ID
  let plan: 'starter' | 'growth' | 'pro' = 'growth'
  if (priceId === process.env.STRIPE_PRICE_STARTER) plan = 'starter'
  if (priceId === process.env.STRIPE_PRICE_PRO) plan = 'pro'

  await supabase
    .from('subscriptions')
    .update({
      status: subscription.status === 'active' ? 'active' : 'past_due',
      plan,
      stripe_price_id: priceId,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    })
    .eq('stripe_subscription_id', subscription.id)

  // Update customer plan
  await supabase
    .from('customers')
    .update({ plan })
    .eq('stripe_customer_id', subscription.customer as string)

  console.log(`🔄 Subscription updated: ${subscription.id}`)
}

async function handleSubscriptionDeleted(
  supabase: ReturnType<typeof createAdminClient>,
  subscription: Stripe.Subscription
) {
  // Update subscription status
  await supabase
    .from('subscriptions')
    .update({ status: 'cancelled' })
    .eq('stripe_subscription_id', subscription.id)

  // Update customer status
  await supabase
    .from('customers')
    .update({ status: 'cancelled' })
    .eq('stripe_customer_id', subscription.customer as string)

  // Pause the site
  const { data: customer } = await supabase
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', subscription.customer as string)
    .single()

  if (customer) {
    await supabase
      .from('client_sites')
      .update({ status: 'paused' })
      .eq('customer_id', customer.id)
  }

  console.log(`❌ Subscription cancelled: ${subscription.id}`)
}
