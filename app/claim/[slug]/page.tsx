'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Chat from '@/components/Chat'

export default function ClaimPage() {
  const params = useParams()
  const slug = params.slug as string
  const [loading, setLoading] = useState(true)
  const [businessName, setBusinessName] = useState('')
  const [activeTab, setActiveTab] = useState<'preview' | 'pricing'>('preview')
  const [mobilePreview, setMobilePreview] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)

  useEffect(() => {
    async function fetchPreview() {
      try {
        const res = await fetch(`/api/preview/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setBusinessName(data.businessName || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
        }
      } catch (error) {
        console.error('Error fetching preview:', error)
        setBusinessName(slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
      } finally {
        setLoading(false)
      }
    }
    fetchPreview()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-blue to-brand-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-7xl mb-6 animate-bounce">✨</div>
          <div className="text-2xl font-bold mb-2">Loading your preview...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-black text-white">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-white/10">
        <Link href="/" className="text-xl font-black">
          Onboard 🛫
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm opacity-70 hidden sm:block">Preview for</span>
          <span className="font-bold">{businessName}</span>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('preview')}
              className={`py-4 px-2 font-bold border-b-2 transition-colors ${
                activeTab === 'preview'
                  ? 'border-brand-lime text-brand-lime'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              👀 Preview Your Site
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`py-4 px-2 font-bold border-b-2 transition-colors ${
                activeTab === 'pricing'
                  ? 'border-brand-lime text-brand-lime'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              💳 Choose a Plan
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'preview' ? (
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Device Toggle */}
          <div className="flex justify-center mb-4 gap-2">
            <button
              onClick={() => setMobilePreview(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !mobilePreview ? 'bg-white text-black' : 'bg-white/10 text-white'
              }`}
            >
              🖥️ Desktop
            </button>
            <button
              onClick={() => setMobilePreview(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mobilePreview ? 'bg-white text-black' : 'bg-white/10 text-white'
              }`}
            >
              📱 Mobile
            </button>
            <button
              onClick={() => setIframeKey(k => k + 1)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              🔄 Refresh
            </button>
          </div>

          {/* Browser Preview Window */}
          <div
            className={`bg-white rounded-2xl overflow-hidden shadow-2xl mb-8 mx-auto transition-all duration-300 ${
              mobilePreview ? 'max-w-[375px]' : 'w-full'
            }`}
          >
            {/* Browser Bar */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 bg-white rounded-lg px-4 py-1.5 text-sm text-gray-600 flex items-center gap-2">
                <span className="text-green-600">🔒</span>
                {slug}.onboard.site
              </div>
            </div>

            {/* AI-Generated Site Preview */}
            <iframe
              key={iframeKey}
              src={`/site/${slug}`}
              className={`w-full border-0 ${mobilePreview ? 'h-[600px]' : 'h-[700px]'}`}
              title={`Preview of ${businessName}`}
            />
          </div>

          {/* CTA to pricing */}
          <div className="text-center">
            <p className="text-lg opacity-80 mb-4">Like what you see? Let&apos;s make it live! 🚀</p>
            <button
              onClick={() => setActiveTab('pricing')}
              className="btn btn-lime text-lg px-8 py-4"
            >
              Choose a Plan →
            </button>
          </div>
        </div>
      ) : (
        /* Pricing Tab */
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Your site for <span className="text-brand-lime">{businessName}</span> is ready!
            </h2>
            <p className="text-lg opacity-80">Pick a plan and we&apos;ll publish it within 24 hours.</p>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Starter */}
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-colors">
              <div className="font-bold text-lg mb-1">Starter 🌱</div>
              <div className="text-4xl font-black mb-1">
                $29<span className="text-base font-normal opacity-70">/mo</span>
              </div>
              <div className="text-sm opacity-60 mb-6">Perfect to get started</div>
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-center gap-2">✅ Single page website</li>
                <li className="flex items-center gap-2">✅ Mobile responsive</li>
                <li className="flex items-center gap-2">✅ Contact form</li>
                <li className="flex items-center gap-2">✅ Google Maps</li>
                <li className="flex items-center gap-2">✅ 2 updates/month</li>
              </ul>
              <Link
                href={`/checkout?plan=starter&slug=${slug}`}
                className="btn btn-outline border-white/30 w-full justify-center"
              >
                Get Started
              </Link>
            </div>

            {/* Growth - Popular */}
            <div className="bg-white text-brand-black rounded-2xl p-6 relative scale-105 shadow-xl">
              <div className="absolute -top-3 right-4 bg-brand-pink text-white text-xs font-bold px-3 py-1 rounded-full">
                ⭐ Most Popular
              </div>
              <div className="font-bold text-lg mb-1">Growth 🚀</div>
              <div className="text-4xl font-black mb-1">
                $49<span className="text-base font-normal opacity-70">/mo</span>
              </div>
              <div className="text-sm opacity-60 mb-6">Best for growing businesses</div>
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-center gap-2">✅ Up to 5 pages</li>
                <li className="flex items-center gap-2">✅ Custom domain included</li>
                <li className="flex items-center gap-2">✅ 5 updates/month</li>
                <li className="flex items-center gap-2">✅ Google Business sync</li>
                <li className="flex items-center gap-2">✅ Booking widget</li>
                <li className="flex items-center gap-2">✅ 24hr response time</li>
              </ul>
              <Link
                href={`/checkout?plan=growth&slug=${slug}`}
                className="btn btn-lime w-full justify-center"
              >
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-colors">
              <div className="font-bold text-lg mb-1">Pro 👑</div>
              <div className="text-4xl font-black mb-1">
                $79<span className="text-base font-normal opacity-70">/mo</span>
              </div>
              <div className="text-sm opacity-60 mb-6">For serious businesses</div>
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-center gap-2">✅ Unlimited pages</li>
                <li className="flex items-center gap-2">✅ Unlimited updates</li>
                <li className="flex items-center gap-2">✅ Same-day response</li>
                <li className="flex items-center gap-2">✅ Advanced booking</li>
                <li className="flex items-center gap-2">✅ Payment integration</li>
                <li className="flex items-center gap-2">✅ Priority support</li>
              </ul>
              <Link
                href={`/checkout?plan=pro&slug=${slug}`}
                className="btn btn-outline border-white/30 w-full justify-center"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Request changes */}
          <div className="text-center border-t border-white/10 pt-8">
            <p className="opacity-70 mb-4">Want changes to your preview first?</p>
            <a
              href={`mailto:hello@onboard.com.au?subject=Changes for ${businessName}&body=Hi! I'd like to request some changes to my preview at ${slug}.onboard.site`}
              className="btn btn-outline border-white/30"
            >
              Request Changes First ✏️
            </a>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-sm opacity-60">
        <p>Questions? Email <a href="mailto:hello@onboard.com.au" className="underline">hello@onboard.com.au</a></p>
      </footer>

      {/* Chat Widget */}
      <Chat slug={slug} businessName={businessName} primaryColor="#2563eb" />
    </div>
  )
}
