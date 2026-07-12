'use client'

import { FormEvent, useState } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function AcquisitionForm() {
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')

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
      setMessage('Thank you. Your confidential enquiry has been received.')
      form.reset()
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error ? error.message : 'Unable to send your enquiry.')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex min-h-[30rem] items-center border border-black/15 bg-[#e8e3d9] p-8 md:p-12" role="status">
        <div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#171914] text-white">✓</span>
          <h3 className="mt-8 text-3xl font-medium tracking-[-0.04em]">Enquiry received.</h3>
          <p className="mt-4 max-w-md leading-7 text-black/55">{message}</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="border border-black/15 bg-[#e8e3d9] p-6 md:p-10">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">Name</span>
          <input name="name" required autoComplete="name" className="mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">Company</span>
          <input name="company" autoComplete="organization" className="mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="Company name" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">Work email</span>
          <input type="email" name="email" required autoComplete="email" className="mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="name@company.com" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">Phone</span>
          <input type="tel" name="phone" autoComplete="tel" className="mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="Optional" />
        </label>
      </div>

      <label className="mt-8 block">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">Enquiry</span>
        <textarea name="message" required rows={5} className="mt-3 w-full resize-none border border-black/20 bg-transparent p-4 text-base outline-none transition-colors placeholder:text-black/25 focus:border-black" placeholder="Tell us briefly about your interest in the portfolio." />
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
        {state === 'submitting' ? 'Sending securely…' : 'Submit a confidential enquiry'}
        <span aria-hidden="true">↘</span>
      </button>

      <p className="mt-4 text-xs leading-5 text-black/40">Your information will only be used to respond to this acquisition enquiry.</p>
      {state === 'error' && <p className="mt-4 text-sm text-red-800" role="alert">{message}</p>}
    </form>
  )
}
