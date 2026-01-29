'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Chat from '@/components/Chat'
import SiteEditorTools from '@/components/SiteEditorTools'

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
    colors: { primary: string; secondary: string; accent: string; background?: string; text?: string }
    ctaText: string
    suburb: string
    state?: string
    phone?: string
    email?: string
    address?: string
    operatingHours?: string
    instagram?: string
    facebook?: string
    // Style metadata from design system
    heroStyle?: 'gradient' | 'image-overlay' | 'split' | 'minimal' | 'video'
    typography?: {
      headingStyle: 'serif' | 'sans-serif' | 'display'
      bodyStyle: 'serif' | 'sans-serif'
      headingWeight: 'normal' | 'bold' | 'black'
    }
    styleName?: string
    styleVibe?: string
    // Layout variation (0, 1, or 2)
    layoutVariation?: number
  }
}

export default function ClaimPage() {
  const params = useParams()
  const slug = params.slug as string
  const [preview, setPreview] = useState<PreviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'preview' | 'pricing'>('preview')
  const [mobilePreview, setMobilePreview] = useState(false)

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [useIframePreview, setUseIframePreview] = useState(true)
  const [iframeKey, setIframeKey] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const refreshPreview = () => {
    setIframeKey(prev => prev + 1)
  }

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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, ...formData }),
      })

      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

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

  const content = preview?.content
  const businessName = content?.businessName || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const colors = content?.colors || { primary: '#2563eb', secondary: '#0f172a', accent: '#d4ff00', background: '#ffffff', text: '#1a1a1a' }
  const heroStyle = content?.heroStyle || 'gradient'
  const typography = content?.typography || { headingStyle: 'sans-serif', bodyStyle: 'sans-serif', headingWeight: 'bold' }
  const layoutVariation = content?.layoutVariation || 0

  // Typography classes based on style
  const headingFont = typography.headingStyle === 'serif' ? 'font-serif' : typography.headingStyle === 'display' ? 'font-black tracking-tight' : 'font-sans'
  const headingWeight = typography.headingWeight === 'black' ? 'font-black' : typography.headingWeight === 'bold' ? 'font-bold' : 'font-normal'

  // Determine layout based on variation
  const heroLayout = heroStyle === 'minimal' ? 'minimal' : heroStyle === 'split' ? 'split' : layoutVariation === 0 ? 'centered' : layoutVariation === 1 ? 'left-aligned' : 'bold'
  const servicesLayout = layoutVariation === 0 ? 'grid' : layoutVariation === 1 ? 'list' : 'cards'

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
          <div className="flex justify-center mb-4 gap-2 flex-wrap">
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
            <span className="w-px h-8 bg-white/20 mx-2 hidden sm:block" />
            <button
              onClick={() => setUseIframePreview(!useIframePreview)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                useIframePreview ? 'bg-purple-600 text-white' : 'bg-white/10 text-white'
              }`}
            >
              {useIframePreview ? '✨ Live Site' : '📋 Component View'}
            </button>
          </div>

          {/* Preview Mode Info */}
          {useIframePreview && (
            <div className="text-center mb-4 text-sm text-brand-lime">
              ✏️ Use the edit buttons below to customize your site
            </div>
          )}

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
              {useIframePreview && (
                <button
                  onClick={refreshPreview}
                  className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 transition-colors"
                >
                  🔄 Refresh
                </button>
              )}
            </div>

            {/* Site Preview - Iframe or Component */}
            {useIframePreview ? (
              <iframe
                ref={iframeRef}
                key={iframeKey}
                src={`/site/${slug}`}
                className={`w-full border-0 ${mobilePreview ? 'h-[600px]' : 'h-[800px]'}`}
                title={`Preview of ${businessName}`}
              />
            ) : (
            <div className="text-gray-900">
              {/* HERO SECTION - Multiple Layouts */}
              {heroLayout === 'minimal' ? (
                // Minimal/Luxury Layout
                <div
                  className="p-8 md:p-16 text-center"
                  style={{ background: colors.background, color: colors.text }}
                >
                  <h1 className={`text-4xl ${mobilePreview ? 'text-3xl' : 'md:text-6xl'} ${headingFont} ${headingWeight} mb-4 tracking-tight`}>
                    {businessName}
                  </h1>
                  <div className="w-16 h-px mx-auto mb-4" style={{ backgroundColor: colors.accent }}></div>
                  <p className={`${mobilePreview ? 'text-base' : 'text-lg md:text-xl'} opacity-80 mb-8 max-w-xl mx-auto`}>
                    {content?.tagline || 'Professional services in Melbourne'}
                  </p>
                  <div className={`flex flex-wrap gap-4 justify-center ${mobilePreview ? 'flex-col' : ''}`}>
                    <button
                      className="px-8 py-3 text-sm tracking-widest uppercase font-medium border-2 transition-all hover:opacity-80"
                      style={{ borderColor: colors.primary, color: colors.primary }}
                    >
                      {content?.ctaText || 'Get Started'}
                    </button>
                    <button
                      className="px-8 py-3 text-sm tracking-widest uppercase font-medium transition-all hover:opacity-80"
                      style={{ backgroundColor: colors.primary, color: colors.background }}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              ) : heroLayout === 'split' ? (
                // Split Layout
                <div
                  className={`${mobilePreview ? 'flex flex-col' : 'grid md:grid-cols-2'}`}
                  style={{ background: colors.background, color: colors.text }}
                >
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-4xl mb-4">{content?.icon || '🏢'}</div>
                    <h1 className={`text-3xl ${mobilePreview ? '' : 'md:text-4xl'} ${headingFont} ${headingWeight} mb-3`}>
                      {businessName}
                    </h1>
                    <p className="text-lg opacity-80 mb-6">{content?.tagline}</p>
                    <button
                      className="px-6 py-3 rounded-lg font-bold w-fit"
                      style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                    >
                      {content?.ctaText || 'Get Started'} →
                    </button>
                  </div>
                  <div
                    className={`${mobilePreview ? 'h-48' : 'min-h-[300px]'}`}
                    style={{ backgroundColor: colors.secondary }}
                  />
                </div>
              ) : heroLayout === 'left-aligned' ? (
                // Left-Aligned Hero
                <div
                  className="p-8 md:p-16 text-white"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                >
                  <div className="max-w-2xl">
                    <div className="text-5xl mb-4">{content?.icon || '🏢'}</div>
                    <h1 className={`text-3xl ${mobilePreview ? '' : 'md:text-5xl'} ${headingFont} ${headingWeight} mb-4`}>
                      {businessName}
                    </h1>
                    <p className="text-xl opacity-90 mb-6">{content?.tagline}</p>
                    <div className={`flex gap-4 ${mobilePreview ? 'flex-col' : ''}`}>
                      <button
                        className="px-6 py-3 rounded-lg font-bold text-lg"
                        style={{ backgroundColor: colors.accent, color: colors.secondary }}
                      >
                        {content?.ctaText || 'Get Started'} →
                      </button>
                      {content?.phone && (
                        <a
                          href={`tel:${content.phone}`}
                          className="px-6 py-3 rounded-lg font-bold text-lg bg-white/20 backdrop-blur"
                        >
                          📞 {content.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ) : heroLayout === 'bold' ? (
                // Bold/Full-width Hero
                <div
                  className="p-8 md:p-20 text-white text-center relative overflow-hidden"
                  style={{ background: colors.secondary }}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(circle at 30% 50%, ${colors.primary}, transparent 50%)`,
                    }}
                  />
                  <div className="relative z-10">
                    <div className="text-7xl mb-6">{content?.icon || '🏢'}</div>
                    <h1 className={`text-4xl ${mobilePreview ? '' : 'md:text-6xl'} ${headingFont} font-black mb-4`}>
                      {businessName}
                    </h1>
                    <p className="text-xl md:text-2xl opacity-80 mb-8 max-w-2xl mx-auto">{content?.tagline}</p>
                    <button
                      className="px-8 py-4 rounded-full font-bold text-lg"
                      style={{ backgroundColor: colors.accent, color: colors.secondary }}
                    >
                      {content?.ctaText || 'Get Started'} →
                    </button>
                  </div>
                </div>
              ) : (
                // Default Centered Gradient
                <div
                  className="p-8 md:p-16 text-center text-white"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                >
                  <div className="text-6xl mb-4">{content?.icon || '🏢'}</div>
                  <h1 className={`text-3xl ${mobilePreview ? '' : 'md:text-5xl'} ${headingFont} ${headingWeight} mb-3`}>
                    {businessName}
                  </h1>
                  <p className="text-xl opacity-90 mb-6">{content?.tagline}</p>
                  <div className={`flex flex-wrap gap-4 justify-center ${mobilePreview ? 'flex-col' : ''}`}>
                    <button
                      className="px-6 py-3 rounded-lg font-bold text-lg"
                      style={{ backgroundColor: colors.accent, color: colors.secondary }}
                    >
                      {content?.ctaText || 'Get Started'} →
                    </button>
                    <button className="bg-white/20 px-6 py-3 rounded-lg font-bold text-lg backdrop-blur">
                      📞 Call Now
                    </button>
                  </div>
                </div>
              )}

              {/* Features Bar */}
              {content?.features && heroStyle !== 'minimal' && (
                <div className="bg-gray-50 py-4 px-6">
                  <div className={`flex flex-wrap justify-center gap-4 ${mobilePreview ? 'gap-2' : 'gap-6'} text-sm`}>
                    {content.features.map((feature, i) => (
                      <span key={i} className="flex items-center gap-2">
                        <span className="text-green-600">✓</span> {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SERVICES SECTION - Multiple Layouts */}
              {content?.services && content.services.length > 0 && (
                <div
                  className="p-8 md:p-12"
                  style={{ backgroundColor: heroStyle === 'minimal' ? colors.background : undefined }}
                >
                  <h2
                    className={`text-2xl ${headingFont} ${headingWeight} text-center mb-8`}
                    style={{ color: heroStyle === 'minimal' ? colors.text : undefined }}
                  >
                    {heroStyle === 'minimal' ? 'Services' : 'Our Services'}
                  </h2>

                  {servicesLayout === 'grid' ? (
                    // Grid Layout
                    <div className={`grid ${mobilePreview ? 'grid-cols-1' : 'md:grid-cols-3'} gap-6`}>
                      {content.services.slice(0, 6).map((service, i) => (
                        <div
                          key={i}
                          className={`rounded-xl p-6 transition-shadow ${
                            heroStyle === 'minimal'
                              ? 'border hover:shadow-md'
                              : 'bg-gray-50 hover:shadow-lg'
                          }`}
                          style={{ borderColor: heroStyle === 'minimal' ? colors.text + '20' : undefined }}
                        >
                          {heroStyle !== 'minimal' && <div className="text-3xl mb-3">{service.icon}</div>}
                          <h3
                            className={`${headingWeight} mb-2`}
                            style={{ color: heroStyle === 'minimal' ? colors.text : undefined }}
                          >
                            {service.name}
                          </h3>
                          <p
                            className="text-sm"
                            style={{ color: heroStyle === 'minimal' ? colors.text + 'cc' : '#4b5563' }}
                          >
                            {service.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : servicesLayout === 'list' ? (
                    // List Layout
                    <div className="max-w-2xl mx-auto space-y-4">
                      {content.services.slice(0, 6).map((service, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 p-4 rounded-lg bg-gray-50"
                        >
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                            style={{ backgroundColor: colors.primary + '20' }}
                          >
                            {service.icon}
                          </div>
                          <div>
                            <h3 className="font-bold mb-1">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Cards Layout (horizontal scroll on mobile)
                    <div className={`${mobilePreview ? 'flex overflow-x-auto gap-4 pb-4 -mx-4 px-4' : 'grid md:grid-cols-3 gap-6'}`}>
                      {content.services.slice(0, 6).map((service, i) => (
                        <div
                          key={i}
                          className={`${mobilePreview ? 'flex-shrink-0 w-64' : ''} rounded-xl p-6 text-white`}
                          style={{ backgroundColor: colors.primary }}
                        >
                          <div className="text-4xl mb-3">{service.icon}</div>
                          <h3 className="font-bold mb-2">{service.name}</h3>
                          <p className="text-sm opacity-80">{service.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Testimonials */}
              {content?.testimonials && content.testimonials.length > 0 && (
                <div
                  className="p-8 md:p-12"
                  style={{ backgroundColor: heroStyle === 'minimal' ? colors.text + '08' : '#f9fafb' }}
                >
                  <h2
                    className={`text-2xl ${headingFont} ${headingWeight} text-center mb-8`}
                    style={{ color: heroStyle === 'minimal' ? colors.text : undefined }}
                  >
                    {heroStyle === 'minimal' ? 'Testimonials' : 'What Our Customers Say'}
                  </h2>
                  <div className={`grid ${mobilePreview ? 'grid-cols-1' : 'md:grid-cols-3'} gap-6`}>
                    {content.testimonials.map((testimonial, i) => (
                      <div
                        key={i}
                        className={`rounded-xl p-6 ${heroStyle === 'minimal' ? 'border' : 'bg-white shadow-sm'}`}
                        style={{
                          backgroundColor: heroStyle === 'minimal' ? colors.background : undefined,
                          borderColor: heroStyle === 'minimal' ? colors.text + '15' : undefined
                        }}
                      >
                        {heroStyle !== 'minimal' && (
                          <div className="text-yellow-400 mb-3">{'★'.repeat(testimonial.rating)}</div>
                        )}
                        <p
                          className="mb-4"
                          style={{ color: heroStyle === 'minimal' ? colors.text + 'dd' : '#374151' }}
                        >
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                            style={{
                              backgroundColor: heroStyle === 'minimal' ? colors.text + '10' : '#e5e7eb',
                              color: heroStyle === 'minimal' ? colors.text : '#4b5563'
                            }}
                          >
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <div
                              className="font-bold text-sm"
                              style={{ color: heroStyle === 'minimal' ? colors.text : undefined }}
                            >
                              {testimonial.name}
                            </div>
                            <div
                              className="text-xs"
                              style={{ color: heroStyle === 'minimal' ? colors.text + '99' : '#6b7280' }}
                            >
                              {testimonial.suburb}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CONTACT SECTION */}
              <div
                className="p-8 md:p-12"
                style={{ backgroundColor: heroStyle === 'minimal' ? colors.background : '#f9fafb' }}
              >
                <h2
                  className={`text-2xl ${headingFont} ${headingWeight} text-center mb-8`}
                  style={{ color: heroStyle === 'minimal' ? colors.text : undefined }}
                >
                  {heroStyle === 'minimal' ? 'Contact' : 'Get in Touch'}
                </h2>

                <div className={`grid ${mobilePreview ? 'grid-cols-1' : 'md:grid-cols-2'} gap-8 max-w-4xl mx-auto`}>
                  {/* Contact Info */}
                  <div className="space-y-4">
                    {content?.phone && (
                      <a
                        href={`tel:${content.phone}`}
                        className="flex items-center gap-4 p-4 rounded-lg transition-all hover:shadow-md"
                        style={{
                          backgroundColor: heroStyle === 'minimal' ? colors.text + '08' : 'white',
                          color: heroStyle === 'minimal' ? colors.text : '#1f2937'
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                          style={{ backgroundColor: colors.primary + '20', color: colors.primary }}
                        >
                          📞
                        </div>
                        <div>
                          <div className="text-sm opacity-60">Phone</div>
                          <div className="font-semibold">{content.phone}</div>
                        </div>
                      </a>
                    )}

                    {content?.email && (
                      <a
                        href={`mailto:${content.email}`}
                        className="flex items-center gap-4 p-4 rounded-lg transition-all hover:shadow-md"
                        style={{
                          backgroundColor: heroStyle === 'minimal' ? colors.text + '08' : 'white',
                          color: heroStyle === 'minimal' ? colors.text : '#1f2937'
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                          style={{ backgroundColor: colors.primary + '20', color: colors.primary }}
                        >
                          ✉️
                        </div>
                        <div>
                          <div className="text-sm opacity-60">Email</div>
                          <div className="font-semibold">{content.email}</div>
                        </div>
                      </a>
                    )}

                    {content?.address && (
                      <div
                        className="flex items-center gap-4 p-4 rounded-lg"
                        style={{
                          backgroundColor: heroStyle === 'minimal' ? colors.text + '08' : 'white',
                          color: heroStyle === 'minimal' ? colors.text : '#1f2937'
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                          style={{ backgroundColor: colors.primary + '20', color: colors.primary }}
                        >
                          📍
                        </div>
                        <div>
                          <div className="text-sm opacity-60">Location</div>
                          <div className="font-semibold">{content.address}</div>
                          <div className="text-sm">{content.suburb}, {content.state}</div>
                        </div>
                      </div>
                    )}

                    {content?.operatingHours && (
                      <div
                        className="flex items-center gap-4 p-4 rounded-lg"
                        style={{
                          backgroundColor: heroStyle === 'minimal' ? colors.text + '08' : 'white',
                          color: heroStyle === 'minimal' ? colors.text : '#1f2937'
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                          style={{ backgroundColor: colors.primary + '20', color: colors.primary }}
                        >
                          🕐
                        </div>
                        <div>
                          <div className="text-sm opacity-60">Hours</div>
                          <div className="font-semibold text-sm">{content.operatingHours}</div>
                        </div>
                      </div>
                    )}

                    {(content?.instagram || content?.facebook) && (
                      <div className="flex gap-4 pt-2">
                        {content?.instagram && (
                          <a
                            href={`https://instagram.com/${content.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                            style={{ backgroundColor: colors.primary, color: 'white' }}
                          >
                            📷
                          </a>
                        )}
                        {content?.facebook && (
                          <a
                            href={content.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                            style={{ backgroundColor: colors.primary, color: 'white' }}
                          >
                            👍
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Contact Form */}
                  <div
                    className="p-6 rounded-xl"
                    style={{
                      backgroundColor: 'white',
                      border: heroStyle === 'minimal' ? `1px solid ${colors.text}15` : undefined,
                      boxShadow: heroStyle === 'minimal' ? undefined : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <h3
                      className={`text-lg ${headingWeight} mb-4`}
                      style={{ color: heroStyle === 'minimal' ? colors.text : '#1f2937' }}
                    >
                      Send a Message
                    </h3>

                    {formStatus === 'success' ? (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">✅</div>
                        <p className="font-semibold text-green-600">Message sent successfully!</p>
                        <p className="text-sm text-gray-500 mt-2">We'll get back to you soon.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ borderColor: '#e5e7eb' }}
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Your Email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ borderColor: '#e5e7eb' }}
                          />
                        </div>
                        <div>
                          <input
                            type="tel"
                            placeholder="Your Phone (optional)"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ borderColor: '#e5e7eb' }}
                          />
                        </div>
                        <div>
                          <textarea
                            placeholder="How can we help?"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            style={{ borderColor: '#e5e7eb' }}
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={formStatus === 'sending'}
                          className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                          style={{ backgroundColor: colors.primary, color: 'white' }}
                        >
                          {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                        {formStatus === 'error' && (
                          <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                        )}
                      </form>
                    )}
                  </div>
                </div>

                {/* Map */}
                {content?.address && content?.suburb && (
                  <div className="mt-8 rounded-xl overflow-hidden h-64 bg-gray-200">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(content.address + ', ' + content.suburb + ', ' + (content.state || 'VIC'))}`}
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
            )}
          </div>

          {/* Editor Tools - only show when using iframe preview */}
          {useIframePreview && (
            <SiteEditorTools slug={slug} onRefresh={refreshPreview} />
          )}

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
                <li className="flex items-center gap-2">✅ Google Maps</li>
                <li className="flex items-center gap-2">✅ 2 updates/month</li>
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
                <li className="flex items-center gap-2">✅ 5 updates/month</li>
                <li className="flex items-center gap-2">✅ Google Business sync</li>
                <li className="flex items-center gap-2">✅ Booking widget</li>
                <li className="flex items-center gap-2">✅ 24hr response time</li>
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

      {/* Chat Widget */}
      <Chat slug={slug} businessName={businessName} primaryColor={colors.primary} />
    </div>
  )
}
