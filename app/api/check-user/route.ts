import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, phone } = await request.json()

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Email or phone required' },
        { status: 400 }
      )
    }

    // First check if they're a paying customer
    const { data: customer } = await supabase
      .from('customers')
      .select('id, email, status, business_name, lead_id')
      .eq('email', email.toLowerCase())
      .eq('status', 'active')
      .single()

    if (customer) {
      // They're a paying customer - redirect to dashboard
      return NextResponse.json({
        status: 'customer',
        redirect: `/dashboard?email=${encodeURIComponent(email)}`,
        businessName: customer.business_name,
      })
    }

    // Check if they're an existing lead
    const { data: lead } = await supabase
      .from('leads')
      .select('id, slug, email, status, business_name')
      .eq('email', email.toLowerCase())
      .single()

    if (lead) {
      // They're an existing lead - redirect to claim page
      return NextResponse.json({
        status: 'lead',
        redirect: `/claim/${lead.slug}`,
        leadId: lead.id,
        slug: lead.slug,
        businessName: lead.business_name,
        leadStatus: lead.status,
      })
    }

    // Also check by phone if provided
    if (phone) {
      const normalizedPhone = phone.replace(/\D/g, '')

      const { data: customerByPhone } = await supabase
        .from('customers')
        .select('id, email, status, business_name')
        .ilike('phone', `%${normalizedPhone.slice(-9)}%`)
        .eq('status', 'active')
        .single()

      if (customerByPhone) {
        return NextResponse.json({
          status: 'customer',
          redirect: `/dashboard?email=${encodeURIComponent(customerByPhone.email)}`,
          businessName: customerByPhone.business_name,
        })
      }

      const { data: leadByPhone } = await supabase
        .from('leads')
        .select('id, slug, email, status, business_name')
        .ilike('phone', `%${normalizedPhone.slice(-9)}%`)
        .single()

      if (leadByPhone) {
        return NextResponse.json({
          status: 'lead',
          redirect: `/claim/${leadByPhone.slug}`,
          leadId: leadByPhone.id,
          slug: leadByPhone.slug,
          businessName: leadByPhone.business_name,
          leadStatus: leadByPhone.status,
        })
      }
    }

    // New user - continue with onboarding
    return NextResponse.json({
      status: 'new',
      redirect: null,
    })
  } catch (error) {
    console.error('Error checking user:', error)
    return NextResponse.json(
      { error: 'Failed to check user status' },
      { status: 500 }
    )
  }
}
