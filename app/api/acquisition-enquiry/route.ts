import { NextRequest, NextResponse } from 'next/server'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }
    return entities[character]
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (clean(body.website, 200)) {
      return NextResponse.json({ success: true })
    }

    const name = clean(body.name, 120)
    const company = clean(body.company, 160)
    const email = clean(body.email, 254).toLowerCase()
    const phone = clean(body.phone, 80)
    const message = clean(body.message, 4000)

    if (!name || !EMAIL_PATTERN.test(email) || !message) {
      return NextResponse.json({ error: 'Please provide your name, a valid email and a short message.' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured for acquisition enquiries')
      return NextResponse.json({ error: 'Enquiries are temporarily unavailable. Please email hello@onboard.com.au.' }, { status: 503 })
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Onboard Acquisition <notifications@onboard.com.au>',
        to: process.env.ACQUISITION_ENQUIRY_EMAIL || 'hello@onboard.com.au',
        reply_to: email,
        subject: `Confidential acquisition enquiry from ${name}${company ? ` — ${company}` : ''}`,
        html: `
          <h2>New Onboard portfolio enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company || 'Not provided')}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        `,
      }),
    })

    if (!response.ok) {
      console.error('Resend acquisition enquiry failed', response.status, await response.text())
      return NextResponse.json({ error: 'Unable to send your enquiry. Please email hello@onboard.com.au.' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Acquisition enquiry error', error)
    return NextResponse.json({ error: 'Unable to send your enquiry. Please try again.' }, { status: 500 })
  }
}
