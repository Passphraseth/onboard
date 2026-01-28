'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface PreviewData {
  businessName: string
  leadId: string
  content: {
    businessName: string
    category: string
    icon: string
    tagline: string
    description: string
    services: Array<{ name: string; description: string; icon: string }>
    features: string[]
    testimonials: Array<{ name: string; text: string; rating: number; suburb: string }>
    colors: { primary: string; secondary: string; accent: string }
    ctaText: string
    suburb: string
    phone?: string
    email?: string
    operatingHours?: string
  }
}

export default function ClaimPage() {
  const params = useParams()
  const slug = params.slug as string
  const [preview, setPreview] = useState<PreviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'preview' | 'pricing'>('preview')

  useEffect(() => {
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
      <div className="min-h-screen bg-gradient-to-br from-brand-blue to-brand-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-7xl mb-6 animate-bounce">{preview?.content?.icon || '✨'}</div>
          <div className="text-2xl font-bold mb-2">Building your preview...</div>
          <div className="opacity-70">This usually takes just a moment</div>
        </div>
      </div>
    )
  }

  const [liveContent, setLiveContent] = useState<PreviewData['content'] | null>(null)

  useEffect(() => {
    if (preview?.content) {
      setLiveContent(preview.content)
    }
  }, [preview])

  const handleContentUpdate = useCallback((updates: Partial<PreviewData['content']>) => {
    setLiveContent(prev => prev ? { ...prev, ...updates } : prev)
  }, [])

  const content = liveContent || preview?.content
  const businessName = content?.businessName || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const colors = content?.colors || { primary: '#2563eb', secondary: '#0f172a', accent: '#d4ff00' }

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
          {/* Browser Preview Window */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl mb-8">
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

            {/* Site Preview */}
            <div className="text-gray-900">
              {/* Hero Section */}
              <div
                className="text-white p-8 md:p-16 text-center"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
              >
                <div className="text-6xl mb-4">{content?.icon || '🏢'}</div>
                <h1 className="text-3xl md:text-5xl font-black mb-3">{businessName}</h1>
                <p className="text-xl opacity-90 mb-6">{content?.tagline || 'Professional services in Melbourne'}</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    className="px-6 py-3 rounded-lg font-bold text-lg"
                    style={{ backgroundColor: colors.accent, color: colors.secondary }}
                  >
                    {content?.ctaText || 'Get Started'} →
                  </button>
                  <button className="bg-white/20 text-white px-6 py-3 rounded-lg font-bold text-lg backdrop-blur">
                    📞 Call Now
                  </button>
                </div>
              </div>

              {/* Features Bar */}
              {content?.features && (
                <div className="bg-gray-50 py-4 px-6">
                  <div className="flex flex-wrap justify-center gap-6 text-sm">
                    {content.features.map((feature, i) => (
                      <span key={i} className="flex items-center gap-2">
                        <span className="text-green-600">✓</span> {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Section */}
              {content?.services && content.services.length > 0 && (
                <div className="p-8 md:p-12">
                  <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {content.services.slice(0, 6).map((service, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="text-3xl mb-3">{service.icon}</div>
                        <h3 className="font-bold mb-2">{service.name}</h3>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials */}
              {content?.testimonials && content.testimonials.length > 0 && (
                <div className="bg-gray-50 p-8 md:p-12">
                  <h2 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {content.testimonials.map((testimonial, i) => (
                      <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="text-yellow-400 mb-3">{'★'.repeat(testimonial.rating)}</div>
                        <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-sm">{testimonial.name}</div>
                            <div className="text-gray-500 text-xs">{testimonial.suburb}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Section Preview */}
              <div className="p-8 md:p-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-gray-600 mb-6">Contact us today for a free quote</p>
                <button
                  className="px-8 py-4 rounded-lg font-bold text-lg"
                  style={{ backgroundColor: colors.primary, color: 'white' }}
                >
                  Contact Us →
                </button>
              </div>
            </div>
          </div>

          {/* CTA to pricing */}
          <div className="text-center">
            <p className="text-lg opacity-80 mb-4">Like what you see? Let's make it live! 🚀</p>
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
            <div className="text-5xl mb-4">{content?.icon || '🎉'}</div>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Your site for <span className="text-brand-lime">{businessName}</span> is ready!
            </h2>
            <p className="text-lg opacity-80">Pick a plan and we'll publish it within 24 hours.</p>
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
                <li className="flex items-center gap-2">✅ 2 text updates/month</li>
                <li className="flex items-center gap-2">✅ 48hr response time</li>
              </ul>
              <Link
                href={`/checkout?plan=starter&lead=${preview?.leadId || ''}`}
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
                <li className="flex items-center gap-2">✅ 5 text updates/month</li>
                <li className="flex items-center gap-2">✅ 24hr response time</li>
                <li className="flex items-center gap-2">✅ Google Business sync</li>
                <li className="flex items-center gap-2">✅ Booking widget</li>
              </ul>
              <Link
                href={`/checkout?plan=growth&lead=${preview?.leadId || ''}`}
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
                href={`/checkout?plan=pro&lead=${preview?.leadId || ''}`}
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

      {/* Chat Editor */}
      {preview && (
        <ChatEditor
          previewData={{
            businessName: businessName,
            leadId: preview.leadId,
            content: content,
          }}
          onContentUpdate={handleContentUpdate}
        />
      )}
    </div>
  )
}
