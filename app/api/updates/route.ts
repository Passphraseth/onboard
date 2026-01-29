import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// Submit an update request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { leadId, email, message, type = 'general' } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!leadId && !email) {
      return NextResponse.json(
        { error: 'leadId or email is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Get lead
    let lead = null
    if (leadId) {
      const { data } = await supabase
        .from('leads')
        .select('id, business_name, email')
        .eq('id', leadId)
        .maybeSingle()
      lead = data
    } else if (email) {
      const { data } = await supabase
        .from('leads')
        .select('id, business_name, email')
        .eq('email', email)
        .maybeSingle()
      lead = data
    }

    if (!lead) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    // Create update request
    const { data: updateRequest, error } = await supabase
      .from('update_requests')
      .insert({
        lead_id: lead.id,
        type,
        message,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating update request:', error)
      return NextResponse.json(
        { error: 'Failed to create update request' },
        { status: 500 }
      )
    }

    // Send notification email (optional - requires Resend to be installed)
    // Email notification will be sent when Resend is configured
    console.log(`Update request created for ${lead.business_name}: ${message}`)

    return NextResponse.json({
      success: true,
      updateRequest,
    })
  } catch (error) {
    console.error('Update request error:', error)
    return NextResponse.json(
      { error: 'Failed to submit update request' },
      { status: 500 }
    )
  }
}

// Get update history for a customer
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const leadId = searchParams.get('leadId')
    const email = searchParams.get('email')

    if (!leadId && !email) {
      return NextResponse.json(
        { error: 'leadId or email is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Get lead
    let lead = null
    if (leadId) {
      const { data } = await supabase
        .from('leads')
        .select('id')
        .eq('id', leadId)
        .maybeSingle()
      lead = data
    } else if (email) {
      const { data } = await supabase
        .from('leads')
        .select('id')
        .eq('email', email)
        .maybeSingle()
      lead = data
    }

    if (!lead) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    // Get all updates
    const { data: updates, error } = await supabase
      .from('update_requests')
      .select('*')
      .eq('lead_id', lead.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching updates:', error)
      return NextResponse.json({ updates: [] })
    }

    return NextResponse.json({ updates: updates || [] })
  } catch (error) {
    console.error('Updates GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch updates' },
      { status: 500 }
    )
  }
}
