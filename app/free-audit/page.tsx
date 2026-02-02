'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BreadcrumbSchema } from '@/components/StructuredData'

interface FormData {
  name: string
  email: string
  businessName: string
  businessType: string
  website: string
  phone: string
  mainConcern: string
}

export default function FreeAuditPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    businessName: '',
    businessType: '',
    website: '',
    phone: '',
    mainConcern: '',
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
          type: 'free-audit',
          ...formData,
          source: 'free-audit-page',
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        // Track conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'lead_conversion', {
            content_type: 'free_audit',
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
          { name: 'Free Website Audit', url: 'https://onboard.com.au/free-audit' },
        ]}
      />
      
      <div className="min-h-screen">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {!submitted ? (
            <>
              {/* Hero Section */}
              <section className="section">
                <div className="container max-w-4xl">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-neutral-900 rounded-full px-4 py-2 mb-6">
                      <span className="text-green-500">●</span>
                      <span className="text-sm text-neutral-400">FREE WEBSITE AUDIT</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                      Get a Free Professional<br />
                      Website Audit
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                      I'll personally review your website and send you a detailed report within 24 hours. 
                      No cost, no obligations — just honest feedback.
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Benefits */}
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">What You'll Get:</h2>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium text-lg mb-1">Visibility Analysis</h3>
                            <p className="text-neutral-400 text-sm">How you rank vs competitors for key search terms</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium text-lg mb-1">Speed & Performance</h3>
                            <p className="text-neutral-400 text-sm">Load times, mobile experience, technical issues</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium text-lg mb-1">Conversion Review</h3>
                            <p className="text-neutral-400 text-sm">How easy it is for customers to contact you</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium text-lg mb-1">Action Plan</h3>
                            <p className="text-neutral-400 text-sm">Specific fixes you can implement this week</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-neutral-900/50 rounded-lg p-6 border border-neutral-800">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-500 font-bold">B</span>
                          </div>
                          <div>
                            <p className="text-sm text-neutral-300 italic">
                              "I personally review every audit request. You'll get honest, actionable feedback — 
                              not a generic report. I've audited 200+ Australian service businesses and I know what works."
                            </p>
                            <p className="text-xs text-neutral-500 mt-2">— Bobby, Onboard Founder</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-neutral-900 rounded-xl p-8 border border-neutral-800">
                      <h2 className="text-xl font-semibold mb-6">Request Your Free Audit</h2>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-neutral-400 mb-2">Name</label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                              placeholder="Your name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm text-neutral-400 mb-2">Phone</label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                              placeholder="0412 345 678"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">Email</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">Business Name</label>
                          <input
                            type="text"
                            required
                            value={formData.businessName}
                            onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                            placeholder="Your Business Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">Type of Business</label>
                          <select
                            required
                            value={formData.businessType}
                            onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                          >
                            <option value="">Select your industry...</option>
                            <option value="electrician">Electrician</option>
                            <option value="plumber">Plumber</option>
                            <option value="builder">Builder/Carpenter</option>
                            <option value="landscaper">Landscaper</option>
                            <option value="painter">Painter</option>
                            <option value="roofer">Roofer</option>
                            <option value="hvac">HVAC/Air Con</option>
                            <option value="mechanic">Mechanic</option>
                            <option value="cleaner">Cleaner</option>
                            <option value="cafe">Cafe/Restaurant</option>
                            <option value="photographer">Photographer</option>
                            <option value="hairdresser">Hair/Beauty</option>
                            <option value="fitness">Fitness/Personal Trainer</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">Current Website</label>
                          <input
                            type="url"
                            value={formData.website}
                            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                            placeholder="https://yourwebsite.com (or leave blank if none)"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">Main Concern (optional)</label>
                          <textarea
                            rows={3}
                            value={formData.mainConcern}
                            onChange={(e) => setFormData(prev => ({ ...prev, mainConcern: e.target.value }))}
                            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none resize-none"
                            placeholder="What's your biggest concern about your online presence? e.g. 'Not getting enough phone calls' or 'Website looks dated'"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full btn btn-primary py-4 text-lg disabled:opacity-50"
                        >
                          {submitting ? 'Requesting...' : 'Get My Free Audit →'}
                        </button>
                        
                        <p className="text-xs text-neutral-500 text-center">
                          I'll personally review your site and send you the audit within 24-48 hours. 
                          No spam, no sales calls unless you request them.
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sample Report Preview */}
              <section className="section bg-neutral-950">
                <div className="container max-w-4xl">
                  <h2 className="text-2xl font-semibold text-center mb-8">Sample Audit Report</h2>
                  
                  <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 max-w-2xl mx-auto">
                    <div className="text-sm space-y-4">
                      <div className="border-b border-neutral-700 pb-4">
                        <h3 className="font-semibold text-blue-400 mb-2">🔍 VISIBILITY ANALYSIS</h3>
                        <p className="text-neutral-300 mb-2">
                          <span className="text-red-400">❌ Page 3 for "electrician melbourne"</span><br />
                          <span className="text-yellow-400">⚠️ Google Business Profile incomplete</span><br />
                          <span className="text-green-400">✅ Found in local directories</span>
                        </p>
                        <p className="text-xs text-neutral-400 italic">
                          Your top competitor ranks #1 because they have 47 customer reviews vs your 3.
                        </p>
                      </div>
                      
                      <div className="border-b border-neutral-700 pb-4">
                        <h3 className="font-semibold text-blue-400 mb-2">⚡ SPEED & PERFORMANCE</h3>
                        <p className="text-neutral-300 mb-2">
                          <span className="text-red-400">❌ 8.2 second load time (should be <3)</span><br />
                          <span className="text-red-400">❌ Mobile site breaks on iPhone</span><br />
                          <span className="text-yellow-400">⚠️ No SSL certificate</span>
                        </p>
                        <p className="text-xs text-neutral-400 italic">
                          Customers abandon sites that take longer than 3 seconds to load.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-blue-400 mb-2">🎯 QUICK WINS</h3>
                        <p className="text-neutral-300 text-sm">
                          1. Add 20+ customer photos to Google Business<br />
                          2. Fix mobile header (phone number not clickable)<br />
                          3. Add "Emergency Electrical" to homepage headline
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-center text-neutral-400 text-sm mt-6">
                    This is the level of detail you'll get in your personalized audit report.
                  </p>
                </div>
              </section>
            </>
          ) : (
            /* Success State */
            <section className="section">
              <div className="container max-w-2xl text-center">
                <div className="text-6xl mb-6">📧</div>
                <h1 className="text-3xl font-semibold mb-4">Audit Request Received!</h1>
                <p className="text-xl text-neutral-400 mb-8">
                  I'll personally review <strong>{formData.businessName}</strong> and send your detailed audit to <strong>{formData.email}</strong> within 24-48 hours.
                </p>
                
                <div className="bg-neutral-900 rounded-xl p-6 mb-8">
                  <h2 className="font-semibold mb-4">What Happens Next:</h2>
                  <div className="text-left space-y-3 text-neutral-300 text-sm">
                    <div className="flex gap-3">
                      <span className="text-blue-400">1.</span>
                      <span>I'll check your current online presence (or lack thereof)</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-400">2.</span>
                      <span>Compare you against your top 3 local competitors</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-400">3.</span>
                      <span>Send you a detailed report with specific fixes</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-400">4.</span>
                      <span>Follow up to see if you need help implementing anything</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl p-6 border border-neutral-700">
                  <h3 className="font-semibold mb-4">Want to See the Solution Too?</h3>
                  <p className="text-neutral-400 mb-6 text-sm">
                    While you wait for your audit, see what a professional website could look like for {formData.businessName} in under 2 minutes.
                  </p>
                  <Link href="/onboard" className="btn btn-primary">
                    Preview My Professional Website →
                  </Link>
                </div>

                <div className="text-sm text-neutral-500 mt-8">
                  <p>Questions? Email me directly: bobby@onboard.com.au</p>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  )
}