'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { trackSignupStep, trackEvent } from '@/components/GoogleAnalytics'

type Step = 'start' | 'basics' | 'details' | 'extras' | 'generating'

const BRAND_TONES = [
  { id: 'professional', name: 'Professional', description: 'Clean, trustworthy' },
  { id: 'casual', name: 'Casual', description: 'Friendly, approachable' },
  { id: 'luxurious', name: 'Luxurious', description: 'Premium, elegant' },
  { id: 'minimal', name: 'Minimal', description: 'Simple, modern' },
  { id: 'warm', name: 'Warm', description: 'Welcoming, personal' },
  { id: 'bold', name: 'Bold', description: 'Strong, confident' },
]

const COLOR_PALETTES = [
  { id: 'navy-gold', name: 'Navy & Gold', colors: ['#1e3a5f', '#d4af37', '#f8fafc'], description: 'Professional' },
  { id: 'charcoal-copper', name: 'Charcoal & Copper', colors: ['#2d2d2d', '#c5a572', '#ffffff'], description: 'Sophisticated' },
  { id: 'forest-cream', name: 'Forest & Cream', colors: ['#2d5a3d', '#d4a574', '#faf8f5'], description: 'Natural' },
  { id: 'slate-coral', name: 'Slate & Coral', colors: ['#3d4f5f', '#e8735f', '#ffffff'], description: 'Contemporary' },
  { id: 'black-white', name: 'Black & White', colors: ['#1a1a1a', '#ffffff', '#f5f5f5'], description: 'Classic' },
  { id: 'ocean-sand', name: 'Ocean & Sand', colors: ['#1e6091', '#e8dcc4', '#ffffff'], description: 'Coastal' },
  { id: 'custom', name: 'Custom', colors: ['#6366f1', '#8b5cf6', '#ffffff'], description: 'My own colors' },
]

interface OnboardingData {
  businessName: string
  businessType: string
  customType: string
  address: string
  suburb: string
  state: string
  postcode: string
  operatingHours: Record<string, { open: string; close: string; closed: boolean }>
  phone: string
  email: string
  instagram: string
  facebook: string
  website: string
  services: string[]
  customServices: string
  targetCustomers: string
  uniqueSellingPoints: string
  additionalNotes: string
  preferredTone: string
  selectedPalette: string
  customColors: string[]
  logoUrl: string
}

const BUSINESS_TYPES = [
  { id: 'plumber', name: 'Plumber' },
  { id: 'electrician', name: 'Electrician' },
  { id: 'hairdresser', name: 'Hairdresser / Barber' },
  { id: 'beautician', name: 'Beauty / Nails' },
  { id: 'cleaner', name: 'Cleaner' },
  { id: 'landscaper', name: 'Landscaper' },
  { id: 'mechanic', name: 'Mechanic' },
  { id: 'cafe', name: 'Cafe / Restaurant' },
  { id: 'fitness', name: 'Personal Trainer' },
  { id: 'photographer', name: 'Photographer' },
  { id: 'construction', name: 'Builder' },
  { id: 'hvac', name: 'HVAC / Air Con' },
  { id: 'other', name: 'Other' },
]

const DEFAULT_HOURS = {
  monday: { open: '09:00', close: '17:00', closed: false },
  tuesday: { open: '09:00', close: '17:00', closed: false },
  wednesday: { open: '09:00', close: '17:00', closed: false },
  thursday: { open: '09:00', close: '17:00', closed: false },
  friday: { open: '09:00', close: '17:00', closed: false },
  saturday: { open: '10:00', close: '14:00', closed: false },
  sunday: { open: '', close: '', closed: true },
}

interface CheckUserResponse {
  status: 'new' | 'lead' | 'customer'
  redirect: string | null
  businessName?: string
  slug?: string
  leadId?: string
  leadStatus?: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('start')
  const [checkingUser, setCheckingUser] = useState(false)
  const [welcomeBack, setWelcomeBack] = useState<CheckUserResponse | null>(null)
  const [data, setData] = useState<OnboardingData>({
    businessName: '',
    businessType: '',
    customType: '',
    address: '',
    suburb: '',
    state: 'VIC',
    postcode: '',
    operatingHours: DEFAULT_HOURS,
    phone: '',
    email: '',
    instagram: '',
    facebook: '',
    website: '',
    services: [],
    customServices: '',
    targetCustomers: '',
    uniqueSellingPoints: '',
    additionalNotes: '',
    preferredTone: '',
    selectedPalette: '',
    customColors: [],
    logoUrl: '',
  })
  const [loading, setLoading] = useState(false)
  const [generationStatus, setGenerationStatus] = useState('')

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  useEffect(() => {
    trackEvent('page_view', { page: 'onboarding' })
  }, [])

  const steps: Step[] = ['start', 'basics', 'details', 'extras', 'generating']

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      const next = steps[currentIndex + 1]
      setCurrentStep(next)
      if (next === 'generating') {
        handleSubmit()
      }
    }
  }

  const prevStep = () => {
    const navigable: Step[] = ['start', 'basics', 'details', 'extras']
    const currentIndex = navigable.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(navigable[currentIndex - 1])
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setGenerationStatus('Submitting your details...')

    try {
      const requestData = {
        ...data,
        preferredColors: data.selectedPalette === 'custom'
          ? data.customColors.filter(c => c)
          : data.selectedPalette
            ? COLOR_PALETTES.find(p => p.id === data.selectedPalette)?.colors
            : undefined,
      }

      const res = await fetch('/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      })

      const result = await res.json()

      if (result.slug && result.leadId) {
        trackSignupStep('COMPLETE_SIGNUP', data.businessType)
        await new Promise(resolve => setTimeout(resolve, 800))
        router.push(`/checkout?slug=${result.slug}&leadId=${result.leadId}`)
      } else {
        throw new Error('Failed to save your details')
      }
    } catch (error) {
      console.error('Error:', error)
      setGenerationStatus('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const toggleService = (service: string) => {
    setData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }))
  }

  const getServicesForType = (type: string): string[] => {
    const servicesByType: Record<string, string[]> = {
      plumber: ['Emergency Repairs', 'Blocked Drains', 'Hot Water Systems', 'Leak Detection', 'Bathroom Renovations', 'Gas Fitting', 'Pipe Relining', 'Water Filtration'],
      electrician: ['Emergency Electrical', 'Power Points', 'Lighting', 'Safety Switches', 'Solar Installation', 'Rewiring', 'Smoke Alarms', 'EV Chargers'],
      hairdresser: ['Haircuts', 'Colour', 'Balayage', 'Extensions', 'Treatments', 'Styling', 'Mens Cuts', 'Kids Cuts'],
      beautician: ['Facials', 'Waxing', 'Nails', 'Lash Extensions', 'Brow Shaping', 'Massage', 'Spray Tan', 'Makeup'],
      cleaner: ['House Cleaning', 'Office Cleaning', 'End of Lease', 'Deep Clean', 'Window Cleaning', 'Carpet Cleaning', 'Regular Cleaning', 'Spring Clean'],
      landscaper: ['Garden Design', 'Lawn Care', 'Tree Trimming', 'Planting', 'Irrigation', 'Paving', 'Retaining Walls', 'Maintenance'],
      mechanic: ['Servicing', 'Repairs', 'Brakes', 'Tyres', 'Roadworthy', 'Diagnostics', 'Air Con', 'Pre-Purchase Inspection'],
      cafe: ['Coffee', 'Breakfast', 'Lunch', 'Takeaway', 'Catering', 'Events', 'Delivery', 'Dine-in'],
      fitness: ['Personal Training', 'Group Classes', 'Online Coaching', 'Nutrition Plans', 'Weight Loss', 'Strength Training', 'HIIT', 'Yoga'],
      photographer: ['Weddings', 'Portraits', 'Events', 'Product', 'Real Estate', 'Corporate', 'Family', 'Headshots'],
      construction: ['Renovations', 'Extensions', 'New Builds', 'Decks', 'Bathrooms', 'Kitchens', 'Roofing', 'Structural'],
      hvac: ['Installation', 'Repairs', 'Servicing', 'Split Systems', 'Ducted', 'Commercial', 'Emergency', 'Heating'],
    }
    return servicesByType[type] || []
  }

  const progress: Record<Step, number> = {
    start: 0,
    basics: 33,
    details: 66,
    extras: 100,
    generating: 100,
  }

  const stepLabels: Record<Step, string> = {
    start: '',
    basics: 'Step 1 of 3',
    details: 'Step 2 of 3',
    extras: 'Step 3 of 3',
    generating: '',
  }

  const handleCheckUser = async () => {
    if (!data.email.trim()) return

    setCheckingUser(true)
    try {
      const res = await fetch('/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, phone: data.phone }),
      })

      const result: CheckUserResponse = await res.json()

      if (result.status === 'customer') {
        setWelcomeBack(result)
      } else if (result.status === 'lead') {
        setWelcomeBack(result)
      } else {
        setCurrentStep('basics')
        trackSignupStep('START_ONBOARDING')
      }
    } catch (error) {
      console.error('Error checking user:', error)
      setCurrentStep('basics')
      trackSignupStep('START_ONBOARDING')
    } finally {
      setCheckingUser(false)
    }
  }

  const handleContinueToExisting = () => {
    if (welcomeBack?.redirect) {
      router.push(welcomeBack.redirect)
    }
  }

  const handleStartFresh = () => {
    setWelcomeBack(null)
    setCurrentStep('basics')
    trackSignupStep('START_ONBOARDING')
  }

  const canProceedBasics = data.businessName.trim() && data.businessType && (data.businessType !== 'other' || data.customType.trim())
  const canProceedDetails = data.suburb.trim()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          onboard
        </Link>
        <div className="text-sm text-neutral-500">
          {stepLabels[currentStep]}
        </div>
      </header>

      {/* Progress Bar */}
      {currentStep !== 'generating' && currentStep !== 'start' && (
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${progress[currentStep]}%` }}
            />
          </div>
        </div>
      )}

      <main className="max-w-xl mx-auto px-6 pb-12">
        {/* Step: Start — Email/Phone Collection */}
        {currentStep === 'start' && !welcomeBack && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">Tell us about your business</h1>
              <p className="text-neutral-400">3 quick steps and we'll build your website within a week.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Email</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateData({ email: e.target.value })}
                  placeholder="hello@yourbusiness.com"
                  className="input text-lg py-4"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Phone (optional)</label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => updateData({ phone: e.target.value })}
                  placeholder="0412 345 678"
                  className="input text-lg py-4"
                />
              </div>
              <button
                onClick={handleCheckUser}
                disabled={!data.email.trim() || checkingUser}
                className="btn btn-primary w-full py-4 disabled:opacity-30"
              >
                {checkingUser ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Checking...
                  </span>
                ) : (
                  'Continue'
                )}
              </button>
              <p className="text-xs text-neutral-500 text-center">
                We'll use this to save your progress and send your preview link.
              </p>
            </div>
          </div>
        )}

        {/* Welcome Back */}
        {currentStep === 'start' && welcomeBack && (
          <div className="animate-fade-in">
            <div className="mb-8 text-center">
              <div className="text-5xl mb-4">&#x1F44B;</div>
              <h1 className="text-3xl font-semibold tracking-tight mb-3">Welcome back!</h1>
              <p className="text-neutral-400">
                {welcomeBack.status === 'customer' ? (
                  <>Looks like you already have a site with us for <strong className="text-white">{welcomeBack.businessName}</strong>.</>
                ) : (
                  <>We found your preview for <strong className="text-white">{welcomeBack.businessName}</strong>.</>
                )}
              </p>
            </div>
            <div className="space-y-4">
              <button onClick={handleContinueToExisting} className="btn btn-primary w-full py-4">
                {welcomeBack.status === 'customer' ? 'Go to My Dashboard' : 'Continue Where I Left Off'}
              </button>
              <button onClick={handleStartFresh} className="btn btn-secondary w-full py-4">
                Start a New Site Instead
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Basics — Name, Type, Location */}
        {currentStep === 'basics' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">The basics</h1>
              <p className="text-neutral-400">Your business name, type, and location.</p>
            </div>
            <div className="space-y-6">
              {/* Business Name */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Business name</label>
                <input
                  type="text"
                  value={data.businessName}
                  onChange={(e) => updateData({ businessName: e.target.value })}
                  placeholder="e.g. Smith's Plumbing"
                  className="input text-lg py-4"
                  autoFocus
                />
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">What type of business?</label>
                <div className="grid grid-cols-3 gap-2">
                  {BUSINESS_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => updateData({ businessType: type.id })}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        data.businessType === type.id
                          ? 'bg-white text-black'
                          : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800'
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
                {data.businessType === 'other' && (
                  <input
                    type="text"
                    value={data.customType}
                    onChange={(e) => updateData({ customType: e.target.value })}
                    placeholder="Tell us what you do..."
                    className="input mt-3"
                  />
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Where are you located?</label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={data.suburb}
                    onChange={(e) => updateData({ suburb: e.target.value })}
                    placeholder="Suburb"
                    className="input"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={data.state}
                      onChange={(e) => updateData({ state: e.target.value })}
                      className="input"
                    >
                      <option value="VIC">VIC</option>
                      <option value="NSW">NSW</option>
                      <option value="QLD">QLD</option>
                      <option value="SA">SA</option>
                      <option value="WA">WA</option>
                      <option value="TAS">TAS</option>
                      <option value="NT">NT</option>
                      <option value="ACT">ACT</option>
                    </select>
                    <input
                      type="text"
                      value={data.postcode}
                      onChange={(e) => updateData({ postcode: e.target.value })}
                      placeholder="Postcode"
                      className="input"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={nextStep}
                disabled={!canProceedBasics}
                className="btn btn-primary w-full py-4 disabled:opacity-30"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Details — Services & what makes you different */}
        {currentStep === 'details' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">Your services</h1>
              <p className="text-neutral-400">What do you offer? We'll feature these on your site.</p>
            </div>
            <div className="space-y-6">
              {/* Service Selection */}
              {data.businessType && data.businessType !== 'other' && (
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Select your services</label>
                  <div className="flex flex-wrap gap-2">
                    {getServicesForType(data.businessType).map((service) => (
                      <button
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`px-3 py-2 rounded-full text-sm transition-all ${
                          data.services.includes(service)
                            ? 'bg-white text-black'
                            : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800'
                        }`}
                      >
                        {data.services.includes(service) && '· '}{service}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm text-neutral-400 mb-2">
                  {data.businessType === 'other' ? 'List your services' : 'Any other services? (optional)'}
                </label>
                <textarea
                  value={data.customServices}
                  onChange={(e) => updateData({ customServices: e.target.value })}
                  placeholder="One per line..."
                  rows={3}
                  className="input resize-none"
                />
              </div>

              {/* What makes you different */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">What makes you different? (optional)</label>
                <textarea
                  value={data.uniqueSellingPoints}
                  onChange={(e) => updateData({ uniqueSellingPoints: e.target.value })}
                  placeholder="e.g. 20 years experience, same-day service, family-owned..."
                  rows={3}
                  className="input resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={prevStep} className="btn btn-secondary flex-1 py-4">
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={data.services.length === 0 && !data.customServices.trim()}
                  className="btn btn-primary flex-1 py-4 disabled:opacity-30"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Extras — Style, socials, any extras */}
        {currentStep === 'extras' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">Final touches</h1>
              <p className="text-neutral-400">Style preferences and social links. Everything here is optional.</p>
            </div>
            <div className="space-y-6">
              {/* Brand Tone */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">How should your site feel?</label>
                <div className="grid grid-cols-3 gap-2">
                  {BRAND_TONES.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => updateData({ preferredTone: tone.id })}
                      className={`p-3 rounded-lg text-left transition-all ${
                        data.preferredTone === tone.id
                          ? 'bg-white text-black'
                          : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800'
                      }`}
                    >
                      <div className="font-medium text-sm">{tone.name}</div>
                      <div className={`text-xs ${data.preferredTone === tone.id ? 'text-neutral-600' : 'text-neutral-500'}`}>
                        {tone.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Colour Palette */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Colour preference (optional)</label>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_PALETTES.map((palette) => (
                    <button
                      key={palette.id}
                      onClick={() => updateData({ selectedPalette: palette.id, customColors: palette.colors })}
                      className={`p-3 rounded-lg text-left transition-all ${
                        data.selectedPalette === palette.id
                          ? 'ring-2 ring-white'
                          : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800'
                      }`}
                    >
                      <div className="flex gap-1 mb-2">
                        {palette.colors.map((color, i) => (
                          <div key={i} className="w-6 h-6 rounded border border-neutral-700" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <div className="font-medium text-xs">{palette.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Social media (optional)</label>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="px-4 py-3 bg-neutral-800 rounded-l-lg border border-r-0 border-neutral-700 text-neutral-500 text-sm">@</span>
                    <input
                      type="text"
                      value={data.instagram}
                      onChange={(e) => updateData({ instagram: e.target.value.replace('@', '') })}
                      placeholder="Instagram handle"
                      className="input rounded-l-none"
                    />
                  </div>
                  <input
                    type="text"
                    value={data.facebook}
                    onChange={(e) => updateData({ facebook: e.target.value })}
                    placeholder="Facebook page URL (optional)"
                    className="input"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Anything else we should know? (optional)</label>
                <textarea
                  value={data.additionalNotes}
                  onChange={(e) => updateData({ additionalNotes: e.target.value })}
                  placeholder="Any specific preferences, existing website URL, logo link..."
                  rows={3}
                  className="input resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={prevStep} className="btn btn-secondary flex-1 py-4">
                  Back
                </button>
                <button onClick={nextStep} className="btn btn-primary flex-1 py-4 text-base">
                  Submit &amp; Continue to Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Generating */}
        {currentStep === 'generating' && (
          <div className="animate-fade-in text-center py-20">
            <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-8" />
            <h1 className="text-2xl font-semibold tracking-tight mb-4">Submitting your details</h1>
            <p className="text-neutral-400">{generationStatus}</p>
          </div>
        )}
      </main>
    </div>
  )
}
