import { NextRequest, NextResponse } from 'next/server'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ASKING_PRICE = 29_500

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }
    return entities[character]
  })
}

async function sendEmail(payload: Record<string, unknown>) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`Resend request failed: ${response.status} ${await response.text()}`)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (clean(body.website, 200)) return NextResponse.json({ success: true })

    const startedAt = Number(clean(body.startedAt, 30))
    const elapsed = Date.now() - startedAt
    if (!startedAt || elapsed < 1500 || elapsed > 86_400_000) {
      return NextResponse.json({ error: 'Please reload the page and try again.' }, { status: 400 })
    }

    const intent = clean(body.intent, 20) === 'offer' ? 'offer' : 'acquire'
    const name = clean(body.name, 120)
    const position = clean(body.position, 120)
    const company = clean(body.company, 180)
    const tradingName = clean(body.tradingName, 180)
    const businessNumber = clean(body.businessNumber, 30)
    const email = clean(body.email, 254).toLowerCase()
    const phone = clean(body.phone, 80)
    const businessAddress = clean(body.businessAddress, 500)
    const intendedUse = clean(body.intendedUse, 2000)
    const timeframe = clean(body.timeframe, 120)
    const message = clean(body.message, 4000)
    const offerAmount = intent === 'acquire' ? ASKING_PRICE : Number(clean(body.offerAmount, 30).replace(/[^0-9.]/g, ''))

    if (!name || !company || !businessNumber || !EMAIL_PATTERN.test(email) || !phone || !intendedUse || !timeframe) {
      return NextResponse.json({ error: 'Please complete all required buyer details.' }, { status: 400 })
    }
    const normalisedBusinessNumber = businessNumber.replace(/\D/g, '')
    if (![9, 11].includes(normalisedBusinessNumber.length)) {
      return NextResponse.json({ error: 'Please provide a valid 9-digit ACN or 11-digit ABN.' }, { status: 400 })
    }
    if (intent === 'offer' && (!Number.isFinite(offerAmount) || offerAmount <= 0 || !message)) {
      return NextResponse.json({ error: 'Please provide a valid offer amount and message.' }, { status: 400 })
    }
    if (intent === 'acquire') {
      const confirmations = ['authorityConfirmed', 'eligibilityConfirmed', 'priceAccepted', 'gstAccepted', 'contactConsent']
      if (!position || !tradingName || !businessAddress || confirmations.some((field) => clean(body[field], 10) !== 'yes')) {
        return NextResponse.json({ error: 'Please complete the entity details and buyer confirmations.' }, { status: 400 })
      }
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured for acquisition enquiries')
      return NextResponse.json({ error: 'Enquiries are temporarily unavailable. Please try again shortly.' }, { status: 503 })
    }

    const formattedAmount = `A$${offerAmount.toLocaleString('en-AU')}`
    await sendEmail({
      from: 'Onboard Acquisition <notifications@onboard.com.au>',
      to: 'dallas@onboard.com.au',
      reply_to: email,
      subject: intent === 'acquire' ? `Acquire now request at A$29,500 — ${company}` : `Confidential offer of ${formattedAmount} — ${company}`,
      html: `
        <h2>${intent === 'acquire' ? 'Fixed-price acquisition request' : 'Confidential portfolio offer'}</h2>
        <p><strong>Amount:</strong> ${formattedAmount}${intent === 'acquire' ? ' + GST if applicable' : ''}</p>
        <p><strong>Full name:</strong> ${escapeHtml(name)}</p>
        ${position ? `<p><strong>Position:</strong> ${escapeHtml(position)}</p>` : ''}
        <p><strong>Legal entity / company:</strong> ${escapeHtml(company)}</p>
        ${tradingName ? `<p><strong>Trading name:</strong> ${escapeHtml(tradingName)}</p>` : ''}
        <p><strong>ABN or ACN:</strong> ${escapeHtml(businessNumber)}</p>
        <p><strong>Business email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        ${businessAddress ? `<p><strong>Registered address:</strong><br>${escapeHtml(businessAddress).replace(/\n/g, '<br>')}</p>` : ''}
        <p><strong>Preferred settlement:</strong> ${escapeHtml(timeframe)}</p>
        <p><strong>Intended use:</strong><br>${escapeHtml(intendedUse).replace(/\n/g, '<br>')}</p>
        ${message ? `<p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
      `,
    })

    try {
      await sendEmail({
        from: 'Onboard Acquisition <notifications@onboard.com.au>',
        to: email,
        subject: intent === 'acquire' ? 'We received your Onboard acquisition request' : 'We received your confidential Onboard offer',
        html: `
          <h2>Thank you, ${escapeHtml(name)}.</h2>
          <p>We have received your ${intent === 'acquire' ? 'request to acquire the Onboard Australian domain portfolio at A$29,500 plus GST if applicable' : `confidential offer of ${formattedAmount}`}.</p>
          <p>The seller will review the buyer information supplied and contact you regarding verification, transaction documents and next steps.</p>
          <p>No payment has been taken. Settlement only proceeds under an agreed sale process.</p>
        `,
      })
    } catch (acknowledgementError) {
      console.error('Buyer acknowledgement email failed', acknowledgementError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Acquisition enquiry error', error)
    return NextResponse.json({ error: 'Unable to send your enquiry. Please try again.' }, { status: 500 })
  }
}
