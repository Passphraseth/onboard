'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SETUP_FEE, MONTHLY_FEE, ADDONS, type AddonKey } from '@/lib/stripe/plans'

function CheckoutForm() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchingLead, setFetchingLead] = useState(true)
  const [selectedAddons, setSelectedAddons] = useState<AddonKey[]>([])

  const leadId = searchParams.get('leadId') || searchParams.get('lead')
  const slug = searchParams.get('slug')

  const [formData, setFormData] = useState({
    email: '',
    businessName: '',
    phone: '',
  })

  // Fetch lead data to pre-fill form
  useEffect(() => {
    async function fetchLeadData() {
      if (!slug) {
        setFetchingLead(false)
        return
      }

      try {
        const res = await fetch(`/api/preview/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setFormData({
            email: data.email || '',
            businessName: data.businessName || '',
            phone: data.phone || '',
          })
        }
      } catch (err) {
        console.error('Failed to fetch lead data:', err)
      } finally {
        setFetchingLead(false)
      }
    }

    fetchLeadData()
  }, [slug])

  const toggleAddon = (key: AddonKey) => {
    setSelectedAddons(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  const monthlyTotal = MONTHLY_FEE + selectedAddons.reduce((sum, key) => sum + ADDONS[key].price, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: 'standard',
          email: formData.email,
          businessName: formData.businessName,
          phone: formData.phone,
          leadId,
          slug,
          addons: selectedAddons,
        }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch {
      setError('Failed to create checkout session')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Form */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Let's get you started</h1>
        <p className="text-neutral-400 text-sm mb-8">Confirm your details and we'll begin building your website.</p>

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
            <label className="block text-sm text-neutral-400 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input"
              placeholder="0400 123 456"
            />
          </div>

          {/* Add-ons */}
          <div className="pt-4">
            <label className="block text-sm text-neutral-400 mb-3">Optional add-ons</label>
            <div className="space-y-2">
              {(Object.entries(ADDONS) as [AddonKey, typeof ADDONS[AddonKey]][]).map(([key, addon]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleAddon(key)}
                  className={`w-full p-3 rounded-lg text-left transition-all flex justify-between items-center ${
                    selectedAddons.includes(key)
                      ? 'bg-white/10 border border-white/20'
                      : 'bg-neutral-900 border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium">{addon.name}</div>
                    <div className="text-xs text-neutral-500">{addon.description}</div>
                  </div>
                  <div className="text-sm font-medium shrink-0 ml-4">
                    +${addon.price}/mo
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || fetchingLead}
            className="btn btn-primary w-full py-4 disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Continue to payment — $${SETUP_FEE} today`}
          </button>

          <p className="text-center text-xs text-neutral-500">
            Secure payment via Stripe. Cancel monthly anytime.
          </p>
        </form>
      </div>

      {/* Order Summary */}
      <div>
        <div className="card p-6 sticky top-6">
          <h2 className="font-medium mb-6">Order summary</h2>

          {/* Setup Fee */}
          <div className="flex justify-between items-center pb-4 border-b border-neutral-800">
            <div>
              <div className="font-medium">Website Setup</div>
              <div className="text-sm text-neutral-500">One-time investment</div>
            </div>
            <div className="text-2xl font-semibold">${SETUP_FEE}</div>
          </div>

          {/* Monthly */}
          <div className="flex justify-between items-center py-4 border-b border-neutral-800">
            <div>
              <div className="font-medium">Monthly Management</div>
              <div className="text-sm text-neutral-500">Starts after site launch</div>
            </div>
            <div className="text-lg font-semibold">${MONTHLY_FEE}/mo</div>
          </div>

          {/* Add-ons if selected */}
          {selectedAddons.length > 0 && (
            <div className="py-4 border-b border-neutral-800 space-y-2">
              {selectedAddons.map(key => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-neutral-400">{ADDONS[key].name}</span>
                  <span>+${ADDONS[key].price}/mo</span>
                </div>
              ))}
            </div>
          )}

          {/* Totals */}
          <div className="pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <div className="font-medium">Due today</div>
              <div className="text-2xl font-semibold">${SETUP_FEE}</div>
            </div>
            <div className="flex justify-between items-center text-sm text-neutral-400">
              <div>Then monthly</div>
              <div>${monthlyTotal}/mo</div>
            </div>
          </div>

          {/* What's included */}
          <div className="mt-6 p-4 bg-neutral-900 rounded-lg border border-neutral-800">
            <div className="font-medium text-sm mb-2">What's included</div>
            <ul className="text-sm text-neutral-400 space-y-1">
              <li>· Custom design & professional copywriting</li>
              <li>· Image sourcing & optimisation</li>
              <li>· Mobile responsive, SEO ready</li>
              <li>· Hosting, security & backups</li>
              <li>· Unlimited content updates</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-neutral-900 rounded-lg border border-neutral-800">
            <div className="font-medium text-sm mb-1">Timeline</div>
            <div className="text-sm text-neutral-400">
              Your website will be designed and live within 7 business days.
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
            View pricing
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
