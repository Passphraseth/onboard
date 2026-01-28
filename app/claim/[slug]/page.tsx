'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { PLANS } from '@/lib/stripe/client'

interface PreviewData {
  businessName: string
  content: {
    businessName: string
    tagline: string
    description: string
    services: Array<{ name: string; description: string; icon: string }>
  }
  leadId: string
}

export default function ClaimPage() {
  const params = useParams()
  const slug = params.slug as string
  const [preview, setPreview] = useState<PreviewData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch preview data
    async function fetchPreview() {
      try {
        const res = await fetch(`/api/preview/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setPreview(data)
        }
      } catch (error) {
        console.error('Error fetching preview:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPreview()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4 animate-pulse">🔍</div>
          <div className="text-xl font-bold">Loading your preview...</div>
        </div>
      </div>
    )
  }

  // Use slug as business name if no preview data
  const businessName = preview?.content?.businessName || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-emerald-500 text-white">
      {/* Header */}
      <header className="px-6 py-4">
        <Link href="/" className="text-xl font-black">
          Onboard 🛫
        </Link>
      </header>

      {/* Hero */}
      <section className="text-center py-8 px-6">
        <p className="text-sm opacity-90 mb-2">🎉 Preview ready for</p>
        <h1 className="text-3xl md:text-5xl font-black">{businessName}</h1>
      </section>

      {/* Preview Window */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Browser bar */}
          <div className="bg-gray-200 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600 ml-4">
              {slug}.onboard.site
            </div>
          </div>

          {/* Preview content */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 text-white p-12 text-center min-h-[350px] flex flex-col items-center justify-center">
            <div className="text-5xl mb-4">🔧</div>
            <h2 className="text-3xl font-black mb-2">{businessName}</h2>
            <p className="opacity-80 mb-4">
              {preview?.content?.tagline || 'Professional services in Melbourne'}
            </p>
            <div className="flex gap-4 mt-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg text-sm">📞 Call Now</div>
              <div className="bg-brand-lime text-brand-black px-4 py-2 rounded-lg text-sm font-bold">Get Quote</div>
            </div>
            <p className="text-xs opacity-50 mt-8">[Full interactive preview loads here]</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Ready banner */}
          <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center mb-6">
            <h3 className="font-bold text-lg">✨ Your site is ready to go live!</h3>
            <p className="opacity-85 text-sm">Pick a plan below. Need changes first? Just ask.</p>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Starter */}
            <div className="bg-white/15 backdrop-blur rounded-xl p-5">
              <div className="font-bold mb-1">Starter 🌱</div>
              <div className="text-4xl font-black mb-1">$29<span className="text-base font-normal opacity-70">/mo</span></div>
              <ul className="text-sm space-y-2 my-4 opacity-90">
                <li>✅ Single page</li>
                <li>✅ 2 updates/month</li>
                <li>✅ Contact form</li>
              </ul>
              <Link
                href={`/checkout?plan=starter&lead=${preview?.leadId || ''}`}
                className="btn btn-outline border-white w-full justify-center text-sm"
              >
                Choose
              </Link>
            </div>

            {/* Growth */}
            <div className="bg-white text-brand-black rounded-xl p-5 relative">
              <div className="absolute -top-2 right-4 bg-brand-pink text-white text-xs font-bold px-2 py-1 rounded-full">
                ⭐ Recommended
              </div>
              <div className="font-bold mb-1">Growth 🚀</div>
              <div className="text-4xl font-black mb-1">$49<span className="text-base font-normal opacity-70">/mo</span></div>
              <ul className="text-sm space-y-2 my-4">
                <li>✅ 5 pages + domain</li>
                <li>✅ 5 updates/month</li>
                <li>✅ Booking widget</li>
              </ul>
              <Link
                href={`/checkout?plan=growth&lead=${preview?.leadId || ''}`}
                className="btn btn-lime w-full justify-center text-sm"
              >
                Choose
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-white/15 backdrop-blur rounded-xl p-5">
              <div className="font-bold mb-1">Pro 👑</div>
              <div className="text-4xl font-black mb-1">$79<span className="text-base font-normal opacity-70">/mo</span></div>
              <ul className="text-sm space-y-2 my-4 opacity-90">
                <li>✅ Unlimited everything</li>
                <li>✅ Payments</li>
                <li>✅ Priority support</li>
              </ul>
              <Link
                href={`/checkout?plan=pro&lead=${preview?.leadId || ''}`}
                className="btn btn-outline border-white w-full justify-center text-sm"
              >
                Choose
              </Link>
            </div>
          </div>

          {/* Request changes */}
          <div className="text-center mt-6">
            <a href="mailto:hello@onboard.com.au?subject=Changes for ${businessName}" className="btn btn-outline border-white/50">
              Request Changes First ✏️
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
