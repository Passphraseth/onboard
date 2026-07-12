'use client'

import { FormEvent, useEffect, useState } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'
type Intent = 'acquire' | 'offer'

const ASKING_PRICE = 29_500
const MINIMUM_OFFER = 18_000

function formatAud(value: number) {
  return `A$${value.toLocaleString('en-AU')}`
}

export default function AcquisitionForm() {
  const [state, setState] = useState<FormState>('idle')
  const [intent, setIntent] = useState<Intent>('acquire')
  const [message, setMessage] = useState('')

  useEffect(() => {
    function syncIntentFromHash() {
      if (window.location.hash === '#make-offer') setIntent('offer')
      if (window.location.hash === '#acquire-now') setIntent('acquire')
    }

    syncIntentFromHash()
    window.addEventListener('hashchange', syncIntentFromHash)
    return () => window.removeEventListener('hashchange', syncIntentFromHash)
  }, [])

  function chooseIntent(nextIntent: Intent) {
    setIntent(nextIntent)
    setState('idle')
    setMessage('')
    window.history.replaceState(null, '', nextIntent === 'acquire' ? '#acquire-now' : '#make-offer')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('submitting')
    setMessage('')

    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch('/api/acquisition-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to send your enquiry.')

      setState('success')
      setMessage(
        intent === 'acquire'
          ? 'Your acquisition request has been received. Dallas will contact you to arrange secure settlement.'
          : 'Your confidential offer has been received. Dallas will be in touch after reviewing it.'
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
          <h3 className="mt-8 text-3xl font-medium tracking-[-0.04em]">
            {intent === 'acquire' ? 'Acquisition request received.' : 'Offer received.'}
          </h3>
          <p className="mt-4 max-w-md leading-7 text-black/55">{message}</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative border border-black/15 bg-[#e8e3d9] p-6 md:p-10">
      <span id="acquire-now" className="absolute -top-24" aria-hidden="true" />
      <span id="make-offer" className="absolute -top-24" aria-hidden="true" />

      <div className="grid grid-cols-2 border border-black/15 bg-black/5 p-1">
        <button
          type="button"
          onClick={() => chooseIntent('acquire')}
          className={`min-h-12 px-3 text-sm font-medium transition-colors ${intent === 'acquire' ? 'bg-[#171914] text-white' : 'text-black/55 hover:text-black'}`}
          aria-pressed={intent === 'acquire'}
        >
          Acquire now
        </button>
        <button
          type="button"
          onClick={() => chooseIntent('offer')}
          className={`min-h-12 px-3 text-sm font-medium transition-colors ${intent === 'offer' ? 'bg-[#171914] text-white' : 'text-black/55 hover:text-black'}`}
          aria-pressed={intent === 'offer'}
        >
          Make an offer
        </button>
      </div>

      <div className="my-8 border-b border-black/15 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
          {intent === 'acquire' ? 'Fixed acquisition price' : 'Confidential offer'}
        </p>
        <p className="mt-3 text-4xl font-medium tracking-[-0.05em]">
          {intent === 'acquire' ? formatAud(ASKING_PRICE) : `From ${formatAud(MINIMUM_OFFER)}`}
        </p>
        <p className="mt-2 text-sm text-black/45">
          {intent === 'acquire'
            ? 'Plus GST if applicable. This request begins a secure transaction—it does not charge your card.'
            : 'Offers below A$18,000 cannot be submitted.'}
        </p>
      </div>

      <input type="hidden" name="intent" value={intent} />
      {intent === 'acquire' && <input type="hidden" name="offerAmount" value={ASKING_PRICE} />}

      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">Name</span>
          <input name="name" required autoComplete="name" className="mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="Your full name" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">Business</span>
          <input name="company" required autoComplete="organization" className="mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="Business name" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">Business email</span>
          <input type="email" name="email" required autoComplete="email" className="mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="name@company.com" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">Phone</span>
          <input type="tel" name="phone" required autoComplete="tel" className="mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="Business contact number" />
        </label>
        {intent === 'offer' && (
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">Offer amount (AUD)</span>
            <input type="number" name="offerAmount" required min={MINIMUM_OFFER} step="1" inputMode="numeric" className="mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="18000" />
          </label>
        )}
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">Settlement timeframe</span>
          <select name="timeframe" required defaultValue="" className="mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-base outline-none focus:border-black">
            <option value="" disabled>Select timeframe</option>
            <option value="Within 7 days">Within 7 days</option>
            <option value="Within 14 days">Within 14 days</option>
            <option value="Within 30 days">Within 30 days</option>
            <option value="Flexible">Flexible</option>
          </select>
        </label>
      </div>

      <label className="mt-8 block">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">Intended use</span>
        <textarea name="intendedUse" required rows={4} className="mt-3 w-full resize-none border border-black/20 bg-transparent p-4 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="Briefly describe how your organisation intends to use the Onboard brand and domains." />
      </label>

      <label className="mt-6 block">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">Additional details</span>
        <textarea name="message" rows={3} className="mt-3 w-full resize-none border border-black/20 bg-transparent p-4 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="Optional transaction details or questions." />
      </label>

      <label className="hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="mt-6 inline-flex min-h-14 w-full items-center justify-between bg-[#171914] px-6 text-sm font-medium text-white transition-colors hover:bg-[#7b522f] disabled:cursor-wait disabled:opacity-60"
      >
        {state === 'submitting'
          ? 'Sending securely…'
          : intent === 'acquire'
            ? `Request acquisition at ${formatAud(ASKING_PRICE)}`
            : 'Submit confidential offer'}
        <span aria-hidden="true">↘</span>
      </button>

      <p className="mt-4 text-xs leading-5 text-black/40">Qualified enquiries are sent privately to Dallas. No payment is collected on this website.</p>
      {state === 'error' && <p className="mt-4 text-sm text-red-800" role="alert">{message}</p>}
    </form>
  )
}
