'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { trackEvent } from '@/components/GoogleAnalytics'

type FormState = 'idle' | 'submitting' | 'success' | 'error'
type Intent = 'acquire' | 'offer'

const ASKING_PRICE = 49_500
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdaqnwer'

function formatAud(value: number) {
  return `A$${value.toLocaleString('en-AU')}`
}

const inputClass = 'mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black'

export default function AcquisitionForm() {
  const [state, setState] = useState<FormState>('idle')
  const [intent, setIntent] = useState<Intent>('acquire')
  const [message, setMessage] = useState('')
  const [startedAt, setStartedAt] = useState('')
  const hasTrackedStart = useRef(false)
  const [attribution, setAttribution] = useState({ sourcePage: '', sourceCluster: '', utmSource: '', utmMedium: '', utmCampaign: '' })

  useEffect(() => {
    setStartedAt(String(Date.now()))
    function syncIntentFromHash() {
      if (window.location.hash === '#make-offer') setIntent('offer')
      if (window.location.hash === '#acquire-now') setIntent('acquire')
    }

    syncIntentFromHash()
    const params = new URLSearchParams(window.location.search)
    setAttribution({
      sourcePage: params.get('source_page') || document.referrer || '',
      sourceCluster: params.get('source_cluster') || '',
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
    })
    window.addEventListener('hashchange', syncIntentFromHash)
    return () => window.removeEventListener('hashchange', syncIntentFromHash)
  }, [])

  function chooseIntent(nextIntent: Intent) {
    setIntent(nextIntent)
    setState('idle')
    setMessage('')
    setStartedAt(String(Date.now()))
    hasTrackedStart.current = false
    window.history.replaceState(null, '', nextIntent === 'acquire' ? '#acquire-now' : '#make-offer')
  }

  function trackFormStart() {
    if (hasTrackedStart.current) return
    hasTrackedStart.current = true
    const baseEvent = intent === 'acquire' ? 'acquisition_form_start' : 'offer_form_start'
    trackEvent(baseEvent, attribution.sourceCluster === 'aml_ctf' ? { source_cluster: 'aml_ctf', source_page: attribution.sourcePage } : undefined)
    if (attribution.sourceCluster === 'aml_ctf') {
      trackEvent(intent === 'acquire' ? 'aml_acquisition_form_start' : 'aml_offer_form_start', { page_slug: attribution.sourcePage })
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('submitting')
    setMessage('')

    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    data._subject = intent === 'acquire'
      ? `Acquire now request at A$49,500 — ${String(data.company || 'Qualified buyer')}`
      : `Confidential Onboard portfolio offer — ${String(data.company || 'Qualified buyer')}`

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json().catch(() => ({}))
      if (!response.ok) {
        const formspreeError = Array.isArray(result.errors) ? result.errors[0]?.message : result.error
        throw new Error(formspreeError || 'Unable to send your enquiry.')
      }

      setState('success')
      trackEvent(intent === 'acquire' ? 'acquisition_form_submit' : 'offer_form_submit', attribution.sourceCluster === 'aml_ctf' ? { source_cluster: 'aml_ctf', source_page: attribution.sourcePage } : undefined)
      if (attribution.sourceCluster === 'aml_ctf') {
        trackEvent(intent === 'acquire' ? 'aml_acquisition_form_submit' : 'aml_offer_form_submit', { page_slug: attribution.sourcePage })
      }
      setMessage(
        intent === 'acquire'
          ? 'Your acquisition request has been received. The seller will contact you to begin buyer verification and secure settlement.'
          : 'Your confidential offer has been received and will be reviewed privately.'
      )
      form.reset()
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error ? error.message : 'Unable to send your enquiry.')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex min-h-[36rem] items-center border border-black/15 bg-[#e8e3d9] p-8 md:p-12" role="status">
        <div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#171914] text-white">✓</span>
          <h2 className="mt-8 text-3xl font-medium tracking-[-0.04em]">
            {intent === 'acquire' ? 'Acquisition request received.' : 'Offer received.'}
          </h2>
          <p className="mt-4 max-w-md leading-7 text-black/55">{message}</p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={(event) => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement).tagName)) trackFormStart()
      }}
      className="relative border border-black/15 bg-[#e8e3d9] p-6 text-[#151714] md:p-10"
    >
      <span id="acquire-now" className="absolute -top-24" aria-hidden="true" />
      <span id="make-offer" className="absolute -top-24" aria-hidden="true" />

      <div className="grid grid-cols-2 border border-black/15 bg-black/5 p-1">
        <button type="button" onClick={() => chooseIntent('acquire')} className={`min-h-12 px-3 text-sm font-medium transition-colors ${intent === 'acquire' ? 'bg-[#171914] text-white' : 'text-black/55 hover:text-black'}`} aria-pressed={intent === 'acquire'}>
          Acquire now
        </button>
        <button type="button" onClick={() => chooseIntent('offer')} className={`min-h-12 px-3 text-sm font-medium transition-colors ${intent === 'offer' ? 'bg-[#171914] text-white' : 'text-black/55 hover:text-black'}`} aria-pressed={intent === 'offer'}>
          Submit an offer
        </button>
      </div>

      <div className="my-8 border-b border-black/15 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/60">{intent === 'acquire' ? 'Fixed acquisition price' : 'Confidential offer'}</p>
        <p className="mt-3 text-4xl font-medium tracking-[-0.05em]">{intent === 'acquire' ? formatAud(ASKING_PRICE) : 'Propose your terms'}</p>
        <p className="mt-2 text-sm leading-6 text-black/60">
          {intent === 'acquire'
            ? 'Plus GST. Settlement proceeds by agreement, tax invoice and cleared EFT—no card payment is taken.'
            : 'Qualified offers are reviewed privately. The seller’s minimum acceptable amount is not published.'}
        </p>
      </div>

      <input type="hidden" name="intent" value={intent} />
      <input type="hidden" name="startedAt" value={startedAt} />
      <input type="hidden" name="source_page" value={attribution.sourcePage} />
      <input type="hidden" name="source_cluster" value={attribution.sourceCluster} />
      <input type="hidden" name="utm_source" value={attribution.utmSource} />
      <input type="hidden" name="utm_medium" value={attribution.utmMedium} />
      <input type="hidden" name="utm_campaign" value={attribution.utmCampaign} />
      <input type="hidden" name="portfolio" value="onboard.com.au, onboard.au, onboard.net.au" />
      {intent === 'acquire' && <input type="hidden" name="offerAmount" value={ASKING_PRICE} />}

      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">Full name</span>
          <input name="name" required autoComplete="name" className={inputClass} placeholder="Your full name" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">Buyer interest</span>
          <select name="buyerInterest" defaultValue="" className={inputClass}>
            <option value="">Select interest (optional)</option>
            <option value="AML/CTF software">AML/CTF software</option>
            <option value="KYC/KYB">KYC/KYB</option>
            <option value="Digital identity">Digital identity</option>
            <option value="Client onboarding">Client onboarding</option>
            <option value="Professional-services technology">Professional-services technology</option>
            <option value="Workforce compliance">Workforce compliance</option>
            <option value="Other">Other</option>
          </select>
        </label>
        {intent === 'acquire' && (
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">Position</span>
            <input name="position" required autoComplete="organization-title" className={inputClass} placeholder="Your position" />
          </label>
        )}
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">{intent === 'acquire' ? 'Legal entity name' : 'Company'}</span>
          <input name="company" required autoComplete="organization" className={inputClass} placeholder={intent === 'acquire' ? 'Registered entity' : 'Company name'} />
        </label>
        {intent === 'acquire' && (
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">Trading name</span>
            <input name="tradingName" required className={inputClass} placeholder="Trading name or same as entity" />
          </label>
        )}
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">ABN or ACN</span>
          <input name="businessNumber" required inputMode="numeric" pattern="[0-9 ]{9,14}" title="Enter a 9-digit ACN or 11-digit ABN" className={inputClass} placeholder="ABN or ACN" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">Business email</span>
          <input type="email" name="email" required autoComplete="email" className={inputClass} placeholder="name@company.com" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">Phone</span>
          <input type="tel" name="phone" required autoComplete="tel" className={inputClass} placeholder="Business contact number" />
        </label>
        {intent === 'offer' && (
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">Offer amount (AUD)</span>
            <input type="number" name="offerAmount" required min="1" step="1" inputMode="numeric" className={inputClass} placeholder="Your offer" />
          </label>
        )}
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">Settlement timeframe</span>
          <select name="timeframe" required defaultValue="" className={inputClass}>
            <option value="" disabled>Select timeframe</option>
            <option value="Within 7 days">Within 7 days</option>
            <option value="Within 14 days">Within 14 days</option>
            <option value="Within 30 days">Within 30 days</option>
            <option value="Flexible">Flexible</option>
          </select>
        </label>
      </div>

      {intent === 'acquire' && (
        <label className="mt-7 block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">Registered business address</span>
          <textarea name="businessAddress" required rows={3} autoComplete="street-address" className="mt-3 w-full resize-none border border-black/20 bg-transparent p-4 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="Registered address" />
        </label>
      )}

      <label className="mt-7 block">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">Intended use</span>
        <textarea name="intendedUse" required rows={4} className="mt-3 w-full resize-none border border-black/20 bg-transparent p-4 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="How does your organisation intend to use the Onboard brand and domains?" />
      </label>

      {intent === 'offer' && (
        <label className="mt-6 block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">Message</span>
          <textarea name="message" required rows={3} className="mt-3 w-full resize-none border border-black/20 bg-transparent p-4 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="Provide any proposed terms or relevant transaction details." />
        </label>
      )}

      {intent === 'acquire' && (
        <fieldset className="mt-8 space-y-4 border-t border-black/15 pt-7">
          <legend className="text-xs font-semibold uppercase tracking-[0.15em] text-black/60">Buyer confirmations</legend>
          {[
            ['authorityConfirmed', 'I confirm that I am authorised to act for the proposed buyer.'],
            ['eligibilityConfirmed', 'I confirm the buyer is likely eligible to hold the .au domain licences, subject to verification.'],
            ['priceAccepted', 'I accept the A$49,500 acquisition price.'],
            ['gstAccepted', 'I understand that GST applies in addition to the acquisition price.'],
            ['contactConsent', 'I consent to being contacted about this acquisition request.'],
          ].map(([name, label]) => (
            <label key={name} className="flex items-start gap-3 text-sm leading-6 text-black/60">
              <input type="checkbox" name={name} value="yes" required className="mt-1 h-4 w-4 accent-[#151714]" />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
      )}

      <label className="hidden" aria-hidden="true">Website<input name="_gotcha" tabIndex={-1} autoComplete="off" /></label>

      <button type="submit" disabled={state === 'submitting' || !startedAt} className="mt-8 inline-flex min-h-14 w-full items-center justify-between bg-[#171914] px-6 text-sm font-medium text-white transition-colors hover:bg-[#7b522f] disabled:cursor-wait disabled:opacity-60">
        {state === 'submitting' ? 'Sending securely…' : intent === 'acquire' ? 'Request Acquisition Documents' : 'Submit Confidential Offer'}
        <span aria-hidden="true">↘</span>
      </button>

      <p className="mt-4 text-xs leading-5 text-black/60">Buyer details are sent privately to the seller through Formspree. The seller will reply to the business email supplied. No payment is collected on this website.</p>
      {state === 'error' && <p className="mt-4 text-sm text-red-800" role="alert">{message}</p>}
    </form>
  )
}
