'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PLANS, type PlanKey } from '@/lib/stripe/plans'

function CheckoutForm() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const planKey = (searchParams.get('plan') || 'growth') as PlanKey
  const leadId = searchParams.get('lead')
  const plan = PLANS[planKey] || PLANS.growth

  const [formData, setFormData] = useState({
    email: '',
    businessName: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planKey,
          email: formData.email,
          businessName: formData.businessName,
          phone: formData.phone,
          leadId,
        }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Failed to create checkout session')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Form */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Get started with {plan.name}</h1>
        <p className="text-neutral-400 text-sm mb-8">Enter your details to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Business name</label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="input"
              placeholder="Smith's Plumbing"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
              placeholder="john@smithsplumbing.com.au"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-2">Phone (for updates)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input"
              placeholder="0400 123 456"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-4 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Continue to payment'}
          </button>

          <p className="text-center text-xs text-neutral-500">
            Secure payment via Stripe
          </p>
        </form>
      </div>

      {/* Order Summary */}
      <div>
        <div className="card p-6 sticky top-6">
          <h2 className="font-medium mb-6">Order summary</h2>

          <div className="flex justify-between items-center pb-4 border-b border-neutral-800">
            <div>
              <div className="font-medium">{plan.name}</div>
              <div className="text-sm text-neutral-500">Monthly subscription</div>
            </div>
            <div className="text-2xl font-semibold">${plan.price}</div>
          </div>

          <ul className="py-4 space-y-2 border-b border-neutral-800">
            {plan.features.slice(0, 5).map((feature) => (
              <li key={feature} className="text-sm text-neutral-400 flex items-center gap-2">
                <span className="text-neutral-600">·</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-4 flex justify-between items-center">
            <div>
              <div className="font-medium">Total today</div>
              <div className="text-xs text-neutral-500">Cancel anytime</div>
            </div>
            <div className="text-2xl font-semibold">${plan.price}</div>
          </div>

          <div className="mt-6 p-4 bg-neutral-900 rounded-lg border border-neutral-800">
            <div className="font-medium text-sm mb-1">What happens next</div>
            <div className="text-sm text-neutral-400">
              After payment, we'll build your site within 24 hours and notify you when it's ready.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neutral-400">Loading...</p>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-6 py-4 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            onboard
          </Link>
          <Link href="/pricing" className="text-sm text-neutral-400 hover:text-white transition-colors">
            Back to pricing
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Suspense fallback={<LoadingFallback />}>
          <CheckoutForm />
        </Suspense>
      </div>
    </div>
  )
}
