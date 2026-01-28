'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PLANS, type PlanKey } from '@/lib/stripe/plans'
function CheckoutForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
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
      {/* Left: Form */}
      <div>
        <h1 className="text-3xl font-black mb-2">Get started with {plan.name}</h1>
        <p className="opacity-70 mb-8">Enter your details and we'll get you set up in no time.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Business name</label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-brand-lime"
              placeholder="Smith's Plumbing"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-brand-lime"
              placeholder="john@smithsplumbing.com.au"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone number (for text updates)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-brand-lime"
              placeholder="0400 123 456"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-lime w-full text-lg py-4 disabled:opacity-50"
          >
            {loading ? 'Creating checkout...' : `Continue to payment →`}
          </button>

          <p className="text-center text-sm opacity-60">
            You'll be redirected to Stripe to complete payment securely.
          </p>
        </form>
      </div>

      {/* Right: Order Summary */}
      <div>
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 sticky top-6">
          <h2 className="font-bold text-lg mb-4">Order summary</h2>

          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div>
              <div className="font-bold">{plan.name}</div>
              <div className="text-sm opacity-70">Monthly subscription</div>
            </div>
            <div className="text-2xl font-black">${plan.price}</div>
          </div>

          <ul className="py-4 space-y-2 text-sm border-b border-white/10">
            {plan.features.slice(0, 5).map((feature) => (
              <li key={feature} className="flex items-center gap-2 opacity-80">
                <span className="text-brand-lime">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-4 flex justify-between items-center">
            <div>
              <div className="font-bold">Total today</div>
              <div className="text-xs opacity-60">Billed monthly, cancel anytime</div>
            </div>
            <div className="text-3xl font-black text-brand-lime">${plan.price}</div>
          </div>

          <div className="mt-6 p-4 bg-brand-lime/10 rounded-xl border border-brand-lime/30">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎉</span>
              <div>
                <div className="font-bold text-brand-lime">What happens next?</div>
                <div className="text-sm opacity-80 mt-1">
                  After payment, we'll build your site within 24 hours and text you when it's ready.
                </div>
              </div>
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
        <div className="animate-spin h-8 w-8 border-4 border-brand-lime border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="opacity-70">Loading checkout...</p>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-black">
            Onboard 🛫
          </Link>
          <Link href="/pricing" className="text-sm opacity-70 hover:opacity-100">
            ← Back to pricing
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
