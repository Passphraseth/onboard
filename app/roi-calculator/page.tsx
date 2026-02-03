'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BreadcrumbSchema } from '@/components/StructuredData'

interface CalculatorData {
  monthlyRevenue: number
  averageJobValue: number
  referralPercentage: number
  hasWebsite: boolean
  name: string
  email: string
  businessType: string
}

interface Results {
  currentJobs: number
  onlineOpportunity: number
  annualValue: number
  websiteROI: number
}

export default function ROICalculatorPage() {
  const [data, setData] = useState<CalculatorData>({
    monthlyRevenue: 15000,
    averageJobValue: 500,
    referralPercentage: 80,
    hasWebsite: false,
    name: '',
    email: '',
    businessType: '',
  })

  const [results, setResults] = useState<Results | null>(null)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const currentJobs = data.monthlyRevenue / data.averageJobValue
    const onlineOpportunity = currentJobs * 0.87 * 0.3
    const annualValue = onlineOpportunity * data.averageJobValue * 12
    const websiteROI = (annualValue / (49 * 12)) * 100

    setResults({
      currentJobs: Math.round(currentJobs * 10) / 10,
      onlineOpportunity: Math.round(onlineOpportunity * 10) / 10,
      annualValue: Math.round(annualValue),
      websiteROI: Math.round(websiteROI),
    })
  }, [data.monthlyRevenue, data.averageJobValue, data.referralPercentage])

  const handleGetResults = () => {
    setShowEmailForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/lead-magnets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'roi-calculator',
          ...data,
          results,
          source: 'roi-calculator-page',
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://onboard.com.au' },
          { name: 'Website ROI Calculator', url: 'https://onboard.com.au/roi-calculator' },
        ]}
      />

      <Navbar />

      <main className="pt-24 pb-16">
        <section className="section">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-neutral-900 rounded-full px-4 py-2 mb-6">
                <span className="text-green-500">●</span>
                <span className="text-sm text-neutral-400">FREE CALCULATOR</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                How Much Revenue Are You<br />
                Missing Without a Website?
              </h1>
              <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                Calculate the exact dollar amount your business could be earning with a professional online presence.
              </p>
            </div>

            {!submitted ? (
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-neutral-900 rounded-xl p-8 border border-neutral-800">
                  <h2 className="text-xl font-semibold mb-6">Business Calculator</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-neutral-400 mb-2">Monthly Revenue</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                        <input
                          type="number"
                          value={data.monthlyRevenue}
                          onChange={(e) => setData(prev => ({ ...prev, monthlyRevenue: Number(e.target.value) }))}
                          className="w-full pl-8 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                          min="0"
                          step="1000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-neutral-400 mb-2">Average Job Value</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                        <input
                          type="number"
                          value={data.averageJobValue}
                          onChange={(e) => setData(prev => ({ ...prev, averageJobValue: Number(e.target.value) }))}
                          className="w-full pl-8 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                          min="0"
                          step="50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-neutral-400 mb-2">Work from referrals vs online</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="number"
                            value={data.referralPercentage}
                            onChange={(e) => setData(prev => ({ ...prev, referralPercentage: Number(e.target.value) }))}
                            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none text-center"
                            min="0"
                            max="100"
                          />
                          <p className="text-xs text-neutral-500 mt-1 text-center">% Referrals</p>
                        </div>
                        <div>
                          <input
                            type="number"
                            value={100 - data.referralPercentage}
                            disabled
                            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-center opacity-50"
                          />
                          <p className="text-xs text-neutral-500 mt-1 text-center">% Online</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-neutral-400 mb-3">Do you currently have a professional website?</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setData(prev => ({ ...prev, hasWebsite: false }))}
                          className={`p-3 rounded-lg border transition-colors ${!data.hasWebsite ? 'bg-white text-black border-white' : 'bg-neutral-800 border-neutral-700 hover:border-neutral-600'}`}
                        >
                          No
                        </button>
                        <button
                          type="button"
                          onClick={() => setData(prev => ({ ...prev, hasWebsite: true }))}
                          className={`p-3 rounded-lg border transition-colors ${data.hasWebsite ? 'bg-white text-black border-white' : 'bg-neutral-800 border-neutral-700 hover:border-neutral-600'}`}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl p-8 border border-neutral-700 mb-6">
                    <h2 className="text-xl font-semibold mb-6">Your Business Potential</h2>

                    {results && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                          <span className="text-neutral-400">Monthly jobs:</span>
                          <span className="font-semibold">{results.currentJobs}</span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                          <span className="text-neutral-400">Online opportunity:</span>
                          <span className="font-semibold text-yellow-400">{results.onlineOpportunity} jobs/month</span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                          <span className="text-neutral-400">Annual potential:</span>
                          <span className="font-semibold text-green-400">${results.annualValue.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-center py-3">
                          <span className="text-neutral-400">Website ROI:</span>
                          <span className="font-bold text-xl text-green-400">{results.websiteROI.toLocaleString()}%</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {!showEmailForm ? (
                    <button onClick={handleGetResults} className="w-full btn btn-primary py-4 text-lg">
                      Get My Detailed Report →
                    </button>
                  ) : (
                    <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
                      <h3 className="font-semibold mb-4">Get Your Custom Report</h3>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Your name"
                            required
                            value={data.name}
                            onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="your@email.com"
                            required
                            value={data.email}
                            onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <select
                            required
                            value={data.businessType}
                            onChange={(e) => setData(prev => ({ ...prev, businessType: e.target.value }))}
                            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-white focus:outline-none"
                          >
                            <option value="">Type of business...</option>
                            <option value="electrician">Electrician</option>
                            <option value="plumber">Plumber</option>
                            <option value="builder">Builder</option>
                            <option value="landscaper">Landscaper</option>
                            <option value="cafe">Cafe/Restaurant</option>
                            <option value="photographer">Photographer</option>
                            <option value="hairdresser">Hair/Beauty</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <button type="submit" disabled={submitting} className="w-full btn btn-primary py-3 disabled:opacity-50">
                          {submitting ? 'Sending...' : 'Send My Report →'}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center max-w-2xl mx-auto">
                <div className="text-6xl mb-6">📊</div>
                <h2 className="text-3xl font-semibold mb-4">Your Report is Ready!</h2>
                <p className="text-xl text-neutral-400 mb-8">
                  We&apos;ve sent your custom ROI report to <strong>{data.email}</strong>
                </p>

                {results && (
                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-8 mb-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold mb-2">Your Annual Opportunity</h3>
                    <p className="text-4xl font-bold text-green-400 mb-4">${results.annualValue.toLocaleString()}</p>
                    <p className="text-neutral-300">
                      That&apos;s {results.onlineOpportunity} additional jobs per month you could be winning online
                    </p>
                  </div>
                )}

                <div className="bg-neutral-900 rounded-xl p-6 mb-8">
                  <h3 className="font-semibold mb-4">Ready to Capture This Revenue?</h3>
                  <p className="text-neutral-400 mb-6">
                    See exactly what a professional website could look like for your business in under 2 minutes.
                  </p>
                  <Link href="/onboard" className="btn btn-primary">
                    Show Me My Website →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
