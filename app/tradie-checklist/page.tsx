'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BreadcrumbSchema } from '@/components/StructuredData'

interface FormData {
  name: string
  email: string
  businessType: string
  currentWebsite: string
}

export default function TradieChecklistPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    businessType: '',
    currentWebsite: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/lead-magnets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tradie-checklist',
          ...formData,
          source: 'tradie-checklist-page',
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        // Track conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'lead_magnet_download', {
            content_type: 'tradie_checklist',
            business_type: formData.businessType,
          })
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://onboard.com.au' },
          { name: 'Free Tradie Website Checklist', url: 'https://onboard.com.au/tradie-checklist' },
        ]}
      />
      
      <div className="min-h-screen">
        <Navbar />
        
        {!submitted ? (
          <main className="pt-24 pb-16">
            {/* Hero Section */}
            <section className="section">
              <div className="container max-w-4xl">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 bg-neutral-900 rounded-full px-4 py-2 mb-6">
                    <span className="text-green-500">●</span>
                    <span className="text-sm text-neutral-400">FREE DOWNLOAD</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                    The 15-Point Website Checklist<br />
                    Every Australian Tradie Needs
                  </h1>
                  <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                    Download the exact checklist we use to audit $50M+ worth of trade businesses online. 
                    See where your website stands and what's costing you customers.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                  {/* Left: Benefits */}
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">What's Inside:</h2>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-1">5-Point Visibility Check</h3>
                          <p className="text-neutral-400 text-sm">Are customers finding you when they search for your trade?</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-1">5-Point Credibility Audit</h3>
                          <p className="text-neutral-400 text-sm">Do you look trustworthy enough for customers to call?</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-1">5-Point Conversion Review</h3>
                          <p className="text-neutral-400 text-sm">Is your site turning visitors into paying customers?</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-1">Trust-Killing Red Flags</h3>
                          <p className="text-neutral-400 text-sm">Common mistakes that make customers choose your competition</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-neutral-900/50 rounded-lg p-6 border border-neutral-800">
                      <h3 className="font-semibold mb-3">Why This Matters:</h3>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        <strong className="text-white">87% of Australians search online before hiring a tradie.</strong> 
                        If your website fails this checklist, you're losing jobs to competitors who pass it. 
                        Five minutes with this checklist could save you thousands in lost revenue.
                      </p>
                    </div>
                  </div>

                  {/* Right: Form */}
                  <div className="bg-neutral-900 rounded-xl p-8 border border-neutral-800">
                    <h2 className="text-xl font-semibold mb-6 text-center">Get Your Free Checklist</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm text-neutral-400 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm text-neutral-400 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="businessType" className="block text-sm text-neutral-400 mb-2">
                          Type of trade
                        </label>
                        <select
                          id="businessType"
                          required
                          value={formData.businessType}
                          onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                        >
                          <option value="">Select your trade...</option>
                          <option value="electrician">Electrician</option>
                          <option value="plumber">Plumber</option>
                          <option value="builder">Builder/Carpenter</option>
                          <option value="landscaper">Landscaper</option>
                          <option value="painter">Painter</option>
                          <option value="roofer">Roofer</option>
                          <option value="hvac">HVAC/Air Con</option>
                          <option value="mechanic">Mechanic</option>
                          <option value="cleaner">Cleaner</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="currentWebsite" className="block text-sm text-neutral-400 mb-2">
                          Current website (optional)
                        </label>
                        <input
                          type="url"
                          id="currentWebsite"
                          value={formData.currentWebsite}
                          onChange={(e) => setFormData(prev => ({ ...prev, currentWebsite: e.target.value }))}
                          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                          placeholder="https://yoursite.com"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full btn btn-primary py-4 text-lg disabled:opacity-50"
                      >
                        {submitting ? 'Sending...' : 'Download Free Checklist →'}
                      </button>
                      
                      <p className="text-xs text-neutral-500 text-center">
                        We'll also send you weekly tips for tradies who want to win more work online. 
                        Unsubscribe anytime.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </section>

            {/* Social Proof */}
            <section className="section bg-neutral-950">
              <div className="container max-w-4xl text-center">
                <h2 className="text-2xl font-semibold mb-8">Join 500+ Aussie Tradies Getting More Work Online</h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-6">
                    <div className="text-3xl mb-4">⚡</div>
                    <h3 className="font-semibold mb-2">Quick Audit</h3>
                    <p className="text-neutral-400 text-sm">Takes 5 minutes to complete. Instant insights into what's costing you customers.</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="text-3xl mb-4">🎯</div>
                    <h3 className="font-semibold mb-2">Actionable</h3>
                    <p className="text-neutral-400 text-sm">Every point comes with specific fixes you can implement this week.</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="text-3xl mb-4">💰</div>
                    <h3 className="font-semibold mb-2">ROI Focused</h3>
                    <p className="text-neutral-400 text-sm">Based on audits of $50M+ in Australian trade businesses. Proven to work.</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        ) : (
          /* Success State */
          <main className="pt-24 pb-16">
            <section className="section">
              <div className="container max-w-2xl text-center">
                <div className="text-6xl mb-6">📧</div>
                <h1 className="text-3xl font-semibold mb-4">Check Your Email!</h1>
                <p className="text-xl text-neutral-400 mb-8">
                  Your free tradie website checklist is on its way to <strong>{formData.email}</strong>
                </p>
                
                <div className="bg-neutral-900 rounded-xl p-6 mb-8">
                  <h2 className="font-semibold mb-4">While You're Here...</h2>
                  <p className="text-neutral-400 mb-6">
                    Want to see what a professional tradie website could look like for your business? 
                    We can show you in 2 minutes.
                  </p>
                  <Link href="/onboard" className="btn btn-primary">
                    See My Website Preview →
                  </Link>
                </div>

                <div className="text-sm text-neutral-500">
                  <p>Don't see the email? Check your spam folder.</p>
                  <p className="mt-2">Need help? Email us at bobby@onboard.com.au</p>
                </div>
              </div>
            </section>
          </main>
        )}

        <Footer />
      </div>
    </>
  )
}