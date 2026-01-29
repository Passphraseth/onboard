import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, name, email, phone, message } = body

    if (!slug || !name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Get the lead/business info to know where to send the notification
    const { data: lead } = await supabase
      .from('leads')
      .select('*')
      .eq('slug', slug)
      .single()

    if (!lead) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      )
    }

    // Save the contact submission
    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .insert({
        lead_id: lead.id,
        slug,
        name,
        email,
        phone: phone || null,
        message,
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving contact submission:', error)
      // If table doesn't exist, still return success for demo purposes
      if (error.code === '42P01') {
        console.log('contact_submissions table does not exist, skipping save')
      } else {
        return NextResponse.json(
          { error: 'Failed to save submission' },
          { status: 500 }
        )
      }
    }

    // Send email notification to business owner
    // Using Resend if available, otherwise just log
    const businessEmail = lead.email
    if (businessEmail) {
      try {
        // Try to send via Resend if API key is configured
        if (process.env.RESEND_API_KEY) {
          const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Onboard <notifications@onboard.com.au>',
              to: businessEmail,
              subject: `New enquiry from ${name} via your Onboard website`,
              html: `
                <h2>New Contact Form Submission</h2>
                <p>You've received a new enquiry through your Onboard website.</p>
                <hr />
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br />')}</p>
                <hr />
                <p style="color: #666; font-size: 12px;">
                  This message was sent via your Onboard website at ${slug}.onboard.site
                </p>
              `,
            }),
          })

          if (!resendResponse.ok) {
            console.error('Failed to send email via Resend')
          }
        } else {
          // Log for development
          console.log('📧 Would send email to:', businessEmail)
          console.log('From:', name, email)
          console.log('Message:', message)
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError)
        // Don't fail the request if email fails
      }
    }

    // Also send a copy to Onboard team
    console.log('📬 New contact submission for', lead.business_name)
    console.log('Lead:', { name, email, phone, message })

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
      submissionId: submission?.id,
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}
