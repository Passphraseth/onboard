'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { trackSignupStep, trackEvent } from '@/components/GoogleAnalytics'

type Step = 'name' | 'type' | 'location' | 'hours' | 'contact' | 'socials' | 'branding' | 'services' | 'usp' | 'generating'

const BRAND_TONES = [
  { id: 'professional', name: 'Professional', description: 'Clean, trustworthy' },
  { id: 'casual', name: 'Casual', description: 'Friendly, approachable' },
  { id: 'luxurious', name: 'Luxurious', description: 'Premium, elegant' },
  { id: 'fun', name: 'Fun', description: 'Playful, energetic' },
  { id: 'minimal', name: 'Minimal', description: 'Simple, modern' },
  { id: 'warm', name: 'Warm', description: 'Welcoming, personal' },
  { id: 'bold', name: 'Bold', description: 'Strong, confident' },
  { id: 'elegant', name: 'Elegant', description: 'Graceful, refined' },
]

const COLOR_PALETTES = [
  { id: 'navy-gold', name: 'Navy & Gold', colors: ['#1e3a5f', '#d4af37', '#f8fafc'], description: 'Professional' },
  { id: 'charcoal-copper', name: 'Charcoal & Copper', colors: ['#2d2d2d', '#c5a572', '#ffffff'], description: 'Sophisticated' },
  { id: 'forest-cream', name: 'Forest & Cream', colors: ['#2d5a3d', '#d4a574', '#faf8f5'], description: 'Natural' },
  { id: 'slate-coral', name: 'Slate & Coral', colors: ['#3d4f5f', '#e8735f', '#ffffff'], description: 'Contemporary' },
  { id: 'black-white', name: 'Black & White', colors: ['#1a1a1a', '#ffffff', '#f5f5f5'], description: 'Classic' },
  { id: 'plum-blush', name: 'Plum & Blush', colors: ['#4a2c4a', '#e8b4b8', '#fdf6f6'], description: 'Elegant' },
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
  operatingHours: {
    monday: { open: string; close: string; closed: boolean }
    tuesday: { open: string; close: string; closed: boolean }
    wednesday: { open: string; close: string; closed: boolean }
    thursday: { open: string; close: string; closed: boolean }
    friday: { open: string; close: string; closed: boolean }
    saturday: { open: string; close: string; closed: boolean }
    sunday: { open: string; close: string; closed: boolean }
  }
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

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('name')
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

  const updateHours = (day: string, field: string, value: string | boolean) => {
    setData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day as keyof typeof prev.operatingHours],
          [field]: value,
        },
      },
    }))
  }

  // Track when user starts onboarding
  useEffect(() => {
    trackSignupStep('START_ONBOARDING')
  }, [])

  const nextStep = () => {
    const steps: Step[] = ['name', 'type', 'location', 'hours', 'contact', 'socials', 'branding', 'services', 'usp', 'generating']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      const next = steps[currentIndex + 1]

      // Track step completion
      const stepTrackingMap: Record<Step, keyof typeof import('@/components/GoogleAnalytics').SignupFunnelEvents> = {
        'name': 'COMPLETE_BUSINESS_NAME',
        'type': 'COMPLETE_BUSINESS_TYPE',
        'location': 'COMPLETE_LOCATION',
        'hours': 'COMPLETE_HOURS',
        'contact': 'COMPLETE_CONTACT',
        'socials': 'COMPLETE_SOCIALS',
        'branding': 'COMPLETE_BRANDING',
        'services': 'COMPLETE_SERVICES',
        'usp': 'COMPLETE_USP',
        'generating': 'GENERATE_WEBSITE',
      }

      if (stepTrackingMap[currentStep]) {
        trackSignupStep(stepTrackingMap[currentStep], data.businessType)
      }

      setCurrentStep(next)
      if (next === 'generating') {
        handleGenerate()
      }
    }
  }

  const prevStep = () => {
    const steps: Step[] = ['name', 'type', 'location', 'hours', 'contact', 'socials', 'branding', 'services', 'usp']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handleGenerate = async () => {
    setLoading(true)
    setGenerationStatus('Creating your business profile...')

    try {
      if (data.instagram) {
        setGenerationStatus('Analyzing your brand...')
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      setGenerationStatus('Designing your website...')
      await new Promise(resolve => setTimeout(resolve, 1000))

      setGenerationStatus('Generating content...')
      await new Promise(resolve => setTimeout(resolve, 500))

      setGenerationStatus('Almost there...')

      const requestData = {
        ...data,
        preferredColors: data.selectedPalette === 'custom'
          ? data.customColors.filter(c => c)
          : data.selectedPalette
            ? COLOR_PALETTES.find(p => p.id === data.selectedPalette)?.colors
            : undefined,
      }

      const res = await fetch('/api/preview/enhanced', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      })

      const result = await res.json()

      if (result.slug) {
        setGenerationStatus('Your preview is ready!')
        trackSignupStep('VIEW_PREVIEW', data.businessType)
        await new Promise(resolve => setTimeout(resolve, 800))
        router.push(`/claim/${result.slug}`)
      } else {
        throw new Error('Failed to generate preview')
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

  const progress = {
    name: 11,
    type: 22,
    location: 33,
    hours: 44,
    contact: 55,
    socials: 66,
    branding: 77,
    services: 88,
    usp: 100,
    generating: 100,
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          onboard
        </Link>
        <div className="text-sm text-neutral-500">
          {currentStep !== 'generating' && `Step ${Object.keys(progress).indexOf(currentStep) + 1} of 9`}
        </div>
      </header>

      {/* Progress Bar */}
      {currentStep !== 'generating' && (
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
        {/* Step: Business Name */}
        {currentStep === 'name' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">What's your business called?</h1>
              <p className="text-neutral-400">This will be the name on your website.</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={data.businessName}
                onChange={(e) => updateData({ businessName: e.target.value })}
                placeholder="e.g. Smith's Plumbing"
                className="input text-lg py-4"
                autoFocus
              />
              <button
                onClick={nextStep}
                disabled={!data.businessName.trim()}
                className="btn btn-primary w-full py-4 disabled:opacity-30"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step: Business Type */}
        {currentStep === 'type' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">What type of business?</h1>
              <p className="text-neutral-400">We'll customise your site for your industry.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {BUSINESS_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateData({ businessType: type.id })}
                  className={`p-4 rounded-lg text-left transition-all ${
                    data.businessType === type.id
                      ? 'bg-white text-black'
                      : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  <div className="font-medium text-sm">{type.name}</div>
                </button>
              ))}
            </div>
            {data.businessType === 'other' && (
              <input
                type="text"
                value={data.customType}
                onChange={(e) => updateData({ customType: e.target.value })}
                placeholder="Tell us what you do..."
                className="input mb-4"
              />
            )}
            <div className="flex gap-3">
              <button onClick={prevStep} className="btn btn-secondary flex-1 py-4">
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={!data.businessType || (data.businessType === 'other' && !data.customType.trim())}
                className="btn btn-primary flex-1 py-4 disabled:opacity-30"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step: Location */}
        {currentStep === 'location' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">Where are you located?</h1>
              <p className="text-neutral-400">Customers will find you by location.</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={data.suburb}
                onChange={(e) => updateData({ suburb: e.target.value })}
                placeholder="Suburb"
                className="input"
              />
              <div className="grid grid-cols-2 gap-4">
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
              <input
                type="text"
                value={data.address}
                onChange={(e) => updateData({ address: e.target.value })}
                placeholder="Street address (optional)"
                className="input"
              />
              <div className="flex gap-3">
                <button onClick={prevStep} className="btn btn-secondary flex-1 py-4">
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!data.suburb.trim()}
                  className="btn btn-primary flex-1 py-4 disabled:opacity-30"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Operating Hours */}
        {currentStep === 'hours' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">When are you open?</h1>
              <p className="text-neutral-400">Let customers know your availability.</p>
            </div>
            <div className="space-y-2">
              {Object.entries(data.operatingHours).map(([day, hours]) => (
                <div key={day} className="bg-neutral-900 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-20 font-medium text-sm capitalize">{day}</div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hours.closed}
                      onChange={(e) => updateHours(day, 'closed', e.target.checked)}
                      className="w-4 h-4 rounded bg-neutral-800 border-neutral-700"
                    />
                    <span className="text-xs text-neutral-400">Closed</span>
                  </label>
                  {!hours.closed && (
                    <>
                      <input
                        type="time"
                        value={hours.open}
                        onChange={(e) => updateHours(day, 'open', e.target.value)}
                        className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white text-sm"
                      />
                      <span className="text-neutral-500 text-sm">to</span>
                      <input
                        type="time"
                        value={hours.close}
                        onChange={(e) => updateHours(day, 'close', e.target.value)}
                        className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white text-sm"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={prevStep} className="btn btn-secondary flex-1 py-4">
                Back
              </button>
              <button onClick={nextStep} className="btn btn-primary flex-1 py-4">
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step: Contact Details */}
        {currentStep === 'contact' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">Contact details</h1>
              <p className="text-neutral-400">How can customers reach you?</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Phone</label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => updateData({ phone: e.target.value })}
                  placeholder="0412 345 678"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Email</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateData({ email: e.target.value })}
                  placeholder="hello@yourbusiness.com"
                  className="input"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={prevStep} className="btn btn-secondary flex-1 py-4">
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!data.phone.trim() || !data.email.trim()}
                  className="btn btn-primary flex-1 py-4 disabled:opacity-30"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Social Media */}
        {currentStep === 'socials' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">Social media</h1>
              <p className="text-neutral-400">We'll use your photos to personalise your site.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Instagram (recommended)</label>
                <div className="flex">
                  <span className="px-4 py-3 bg-neutral-800 rounded-l-lg border border-r-0 border-neutral-700 text-neutral-500">@</span>
                  <input
                    type="text"
                    value={data.instagram}
                    onChange={(e) => updateData({ instagram: e.target.value.replace('@', '') })}
                    placeholder="yourbusiness"
                    className="input rounded-l-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Facebook (optional)</label>
                <input
                  type="text"
                  value={data.facebook}
                  onChange={(e) => updateData({ facebook: e.target.value })}
                  placeholder="facebook.com/yourbusiness"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Existing website (optional)</label>
                <input
                  type="text"
                  value={data.website}
                  onChange={(e) => updateData({ website: e.target.value })}
                  placeholder="www.yourbusiness.com"
                  className="input"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={prevStep} className="btn btn-secondary flex-1 py-4">
                  Back
                </button>
                <button onClick={nextStep} className="btn btn-primary flex-1 py-4">
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Branding */}
        {currentStep === 'branding' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">Brand style</h1>
              <p className="text-neutral-400">How should your website feel?</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Logo URL (optional)</label>
                <input
                  type="text"
                  value={data.logoUrl}
                  onChange={(e) => updateData({ logoUrl: e.target.value })}
                  placeholder="Paste your logo URL"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-3">Brand tone</label>
                <div className="grid grid-cols-2 gap-2">
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

              <div>
                <label className="block text-sm text-neutral-400 mb-3">Colour palette</label>
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
                          <div
                            key={i}
                            className="w-6 h-6 rounded border border-neutral-700"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="font-medium text-xs">{palette.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {data.selectedPalette === 'custom' && (
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Custom colours (hex)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Primary', 'Accent', 'Background'].map((label, i) => (
                      <div key={label}>
                        <label className="text-xs text-neutral-500">{label}</label>
                        <input
                          type="text"
                          value={data.customColors[i] || ''}
                          onChange={(e) => {
                            const newColors = [...data.customColors]
                            newColors[i] = e.target.value
                            updateData({ customColors: newColors })
                          }}
                          placeholder={i === 0 ? '#1a1a1a' : i === 1 ? '#ffffff' : '#f5f5f5'}
                          className="input text-sm mt-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={prevStep} className="btn btn-secondary flex-1 py-4">
                  Back
                </button>
                <button onClick={nextStep} className="btn btn-primary flex-1 py-4">
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Services */}
        {currentStep === 'services' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">What services do you offer?</h1>
              <p className="text-neutral-400">Select all that apply.</p>
            </div>
            <div className="space-y-4">
              {data.businessType && data.businessType !== 'other' && (
                <div className="flex flex-wrap gap-2 mb-4">
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
              )}
              <textarea
                value={data.customServices}
                onChange={(e) => updateData({ customServices: e.target.value })}
                placeholder="Add any other services (one per line)..."
                rows={4}
                className="input resize-none"
              />
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

        {/* Step: Unique Selling Points */}
        {currentStep === 'usp' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">What makes you different?</h1>
              <p className="text-neutral-400">Help us highlight what sets you apart.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Ideal customers</label>
                <input
                  type="text"
                  value={data.targetCustomers}
                  onChange={(e) => updateData({ targetCustomers: e.target.value })}
                  placeholder="e.g. Homeowners, young professionals..."
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">What makes you special? (optional)</label>
                <textarea
                  value={data.uniqueSellingPoints}
                  onChange={(e) => updateData({ uniqueSellingPoints: e.target.value })}
                  placeholder="e.g. 20 years experience, same-day service..."
                  rows={3}
                  className="input resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Anything else? (optional)</label>
                <textarea
                  value={data.additionalNotes}
                  onChange={(e) => updateData({ additionalNotes: e.target.value })}
                  placeholder="Any specific preferences..."
                  rows={3}
                  className="input resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={prevStep} className="btn btn-secondary flex-1 py-4">
                  Back
                </button>
                <button onClick={nextStep} className="btn btn-primary flex-1 py-4 text-base">
                  Generate my website
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Generating */}
        {currentStep === 'generating' && (
          <div className="animate-fade-in text-center py-20">
            <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-8" />
            <h1 className="text-2xl font-semibold tracking-tight mb-4">Creating your website</h1>
            <p className="text-neutral-400">{generationStatus}</p>
          </div>
        )}
      </main>
    </div>
  )
}
