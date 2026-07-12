import { NextRequest, NextResponse } from 'next/server'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ASKING_PRICE = 29_500
const MINIMUM_OFFER = 18_000

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
    const intent = clean(body.intent, 20) === 'offer' ? 'offer' : 'acquire'
    const intendedUse = clean(body.intendedUse, 2000)
    const timeframe = clean(body.timeframe, 120)
    const message = clean(body.message, 4000)
    const offerAmount = intent === 'acquire'
      ? ASKING_PRICE
      : Number(clean(body.offerAmount, 30).replace(/[^0-9.]/g, ''))

    if (!name || !company || !EMAIL_PATTERN.test(email) || !phone || !intendedUse || !timeframe) {
      return NextResponse.json({ error: 'Please complete all required buyer details.' }, { status: 400 })
    }

    if (!Number.isFinite(offerAmount) || offerAmount < MINIMUM_OFFER) {
      return NextResponse.json({ error: 'Offers must be at least A$18,000.' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured for acquisition enquiries')
      return NextResponse.json({ error: 'Enquiries are temporarily unavailable. Please email dallas@onboard.com.au.' }, { status: 503 })
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Onboard Acquisition <notifications@onboard.com.au>',
        to: 'dallas@onboard.com.au',
        reply_to: email,
        subject: intent === 'acquire'
          ? `Acquire now request at A$29,500 — ${company}`
          : `Confidential offer of A$${offerAmount.toLocaleString('en-AU')} — ${company}`,
        html: `
          <h2>${intent === 'acquire' ? 'Acquire now request' : 'Confidential portfolio offer'}</h2>
          <p><strong>Pathway:</strong> ${intent === 'acquire' ? 'Acquire at the public A$29,500 price' : 'Make an offer'}</p>
          <p><strong>Amount:</strong> A$${offerAmount.toLocaleString('en-AU')}</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Business:</strong> ${escapeHtml(company)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Preferred settlement:</strong> ${escapeHtml(timeframe)}</p>
          <p><strong>Intended use:</strong></p>
          <p>${escapeHtml(intendedUse).replace(/\n/g, '<br>')}</p>
          ${message ? `<p><strong>Additional details:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
        `,
      }),
    })

    if (!response.ok) {
      console.error('Resend acquisition enquiry failed', response.status, await response.text())
      return NextResponse.json({ error: 'Unable to send your enquiry. Please email dallas@onboard.com.au.' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Acquisition enquiry error', error)
    return NextResponse.json({ error: 'Unable to send your enquiry. Please try again.' }, { status: 500 })
  }
}
