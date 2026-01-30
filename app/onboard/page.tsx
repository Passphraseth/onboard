'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Step = 'name' | 'type' | 'location' | 'hours' | 'contact' | 'socials' | 'branding' | 'services' | 'usp' | 'generating'

// Brand tone options
const BRAND_TONES = [
  { id: 'professional', name: 'Professional', icon: '💼', description: 'Clean, trustworthy, corporate' },
  { id: 'casual', name: 'Casual', icon: '😊', description: 'Friendly, approachable, relaxed' },
  { id: 'luxurious', name: 'Luxurious', icon: '✨', description: 'Premium, elegant, sophisticated' },
  { id: 'fun', name: 'Fun', icon: '🎉', description: 'Playful, energetic, vibrant' },
  { id: 'minimal', name: 'Minimal', icon: '◻️', description: 'Simple, clean, modern' },
  { id: 'warm', name: 'Warm', icon: '🤝', description: 'Welcoming, caring, personal' },
  { id: 'bold', name: 'Bold', icon: '💪', description: 'Strong, confident, impactful' },
  { id: 'elegant', name: 'Elegant', icon: '🌸', description: 'Graceful, refined, tasteful' },
]

// Preset color palettes
const COLOR_PALETTES = [
  { id: 'navy-gold', name: 'Navy & Gold', colors: ['#1e3a5f', '#d4af37', '#f8fafc'], description: 'Professional & Premium' },
  { id: 'charcoal-copper', name: 'Charcoal & Copper', colors: ['#2d2d2d', '#c5a572', '#ffffff'], description: 'Modern & Sophisticated' },
  { id: 'forest-cream', name: 'Forest & Cream', colors: ['#2d5a3d', '#d4a574', '#faf8f5'], description: 'Natural & Organic' },
  { id: 'slate-coral', name: 'Slate & Coral', colors: ['#3d4f5f', '#e8735f', '#ffffff'], description: 'Contemporary & Warm' },
  { id: 'black-lime', name: 'Black & Lime', colors: ['#1a1a1a', '#c5f82a', '#ffffff'], description: 'Bold & Modern' },
  { id: 'plum-blush', name: 'Plum & Blush', colors: ['#4a2c4a', '#e8b4b8', '#fdf6f6'], description: 'Elegant & Feminine' },
  { id: 'ocean-sand', name: 'Ocean & Sand', colors: ['#1e6091', '#e8dcc4', '#ffffff'], description: 'Coastal & Relaxed' },
  { id: 'custom', name: 'Custom', colors: ['#6366f1', '#8b5cf6', '#ffffff'], description: 'I have my own colors' },
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
  // NEW: Branding preferences
  preferredTone: string
  selectedPalette: string
  customColors: string[]
  logoUrl: string
}

const BUSINESS_TYPES = [
  { id: 'plumber', name: 'Plumber', icon: '🔧' },
  { id: 'electrician', name: 'Electrician', icon: '⚡' },
  { id: 'hairdresser', name: 'Hairdresser / Barber', icon: '💇' },
  { id: 'beautician', name: 'Beauty / Nails', icon: '💅' },
  { id: 'cleaner', name: 'Cleaner', icon: '🧹' },
  { id: 'landscaper', name: 'Landscaper / Gardener', icon: '🌳' },
  { id: 'mechanic', name: 'Mechanic', icon: '🔩' },
  { id: 'cafe', name: 'Cafe / Restaurant', icon: '☕' },
  { id: 'fitness', name: 'Personal Trainer / Gym', icon: '💪' },
  { id: 'photographer', name: 'Photographer', icon: '📸' },
  { id: 'construction', name: 'Builder / Construction', icon: '🏗️' },
  { id: 'hvac', name: 'HVAC / Air Conditioning', icon: '❄️' },
  { id: 'other', name: 'Other', icon: '✨' },
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
    // NEW: Branding preferences
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

  const nextStep = () => {
    const steps: Step[] = ['name', 'type', 'location', 'hours', 'contact', 'socials', 'branding', 'services', 'usp', 'generating']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      const next = steps[currentIndex + 1]
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
      // Update status based on what data we have
      if (data.instagram) {
        setGenerationStatus('Analyzing your Instagram for branding and photos...')
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      if (data.website) {
        setGenerationStatus('Extracting colors and style from your existing website...')
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      setGenerationStatus('Researching competitors in your area...')
      await new Promise(resolve => setTimeout(resolve, 1000))

      setGenerationStatus('Building your unique brand profile...')
      await new Promise(resolve => setTimeout(resolve, 500))

      setGenerationStatus('Generating your personalized website...')

      // Include branding preferences in the API call
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
        setGenerationStatus('Your preview is ready! Redirecting...')
        await new Promise(resolve => setTimeout(resolve, 1000))
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
    <div className="min-h-screen bg-brand-blue">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/" className="text-xl font-black">
          Onboard 🛫
        </Link>
        <div className="text-sm opacity-70">
          {currentStep !== 'generating' && `Step ${Object.keys(progress).indexOf(currentStep) + 1} of 9`}
        </div>
      </header>

      {/* Progress Bar */}
      {currentStep !== 'generating' && (
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-lime transition-all duration-500"
              style={{ width: `${progress[currentStep]}%` }}
            />
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-6 pb-12">
        {/* Step: Business Name */}
        {currentStep === 'name' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🏢</div>
              <h1 className="text-3xl md:text-4xl font-black mb-3">What's your business called?</h1>
              <p className="opacity-80">This will be the name that appears on your website.</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={data.businessName}
                onChange={(e) => updateData({ businessName: e.target.value })}
                placeholder="e.g. Smith's Plumbing"
                className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 text-lg focus:border-brand-lime outline-none"
                autoFocus
              />
              <button
                onClick={nextStep}
                disabled={!data.businessName.trim()}
                className="btn btn-lime w-full text-lg py-4 disabled:opacity-50"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step: Business Type */}
        {currentStep === 'type' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📋</div>
              <h1 className="text-3xl md:text-4xl font-black mb-3">What type of business is it?</h1>
              <p className="opacity-80">We'll customize your website based on your industry.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {BUSINESS_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateData({ businessType: type.id })}
                  className={`p-4 rounded-xl text-left transition-all ${
                    data.businessType === type.id
                      ? 'bg-brand-lime text-brand-black scale-105'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="text-2xl mb-1">{type.icon}</div>
                  <div className="font-bold text-sm">{type.name}</div>
                </button>
              ))}
            </div>
            {data.businessType === 'other' && (
              <input
                type="text"
                value={data.customType}
                onChange={(e) => updateData({ customType: e.target.value })}
                placeholder="Tell us what you do..."
                className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 mb-4 focus:border-brand-lime outline-none"
              />
            )}
            <div className="flex gap-3">
              <button onClick={prevStep} className="btn btn-outline border-white/30 flex-1 py-4">
                ← Back
              </button>
              <button
                onClick={nextStep}
                disabled={!data.businessType || (data.businessType === 'other' && !data.customType.trim())}
                className="btn btn-lime flex-1 py-4 disabled:opacity-50"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step: Location */}
        {currentStep === 'location' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📍</div>
              <h1 className="text-3xl md:text-4xl font-black mb-3">Where are you located?</h1>
              <p className="opacity-80">Customers will find you based on your service area.</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={data.suburb}
                onChange={(e) => updateData({ suburb: e.target.value })}
                placeholder="Suburb (e.g. Richmond)"
                className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={data.state}
                  onChange={(e) => updateData({ state: e.target.value })}
                  className="px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white focus:border-brand-lime outline-none"
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
                  className="px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none"
                />
              </div>
              <input
                type="text"
                value={data.address}
                onChange={(e) => updateData({ address: e.target.value })}
                placeholder="Street address (optional - for map)"
                className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none"
              />
              <div className="flex gap-3">
                <button onClick={prevStep} className="btn btn-outline border-white/30 flex-1 py-4">
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!data.suburb.trim()}
                  className="btn btn-lime flex-1 py-4 disabled:opacity-50"
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Operating Hours */}
        {currentStep === 'hours' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🕐</div>
              <h1 className="text-3xl md:text-4xl font-black mb-3">When are you open?</h1>
              <p className="opacity-80">Let customers know your availability.</p>
            </div>
            <div className="space-y-3">
              {Object.entries(data.operatingHours).map(([day, hours]) => (
                <div key={day} className="bg-white/10 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-24 font-bold capitalize">{day}</div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hours.closed}
                      onChange={(e) => updateHours(day, 'closed', e.target.checked)}
                      className="w-5 h-5 rounded"
                    />
                    <span className="text-sm opacity-80">Closed</span>
                  </label>
                  {!hours.closed && (
                    <>
                      <input
                        type="time"
                        value={hours.open}
                        onChange={(e) => updateHours(day, 'open', e.target.value)}
                        className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
                      />
                      <span className="opacity-60">to</span>
                      <input
                        type="time"
                        value={hours.close}
                        onChange={(e) => updateHours(day, 'close', e.target.value)}
                        className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={prevStep} className="btn btn-outline border-white/30 flex-1 py-4">
                ← Back
              </button>
              <button onClick={nextStep} className="btn btn-lime flex-1 py-4">
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step: Contact Details */}
        {currentStep === 'contact' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📞</div>
              <h1 className="text-3xl md:text-4xl font-black mb-3">How can customers reach you?</h1>
              <p className="opacity-80">These will be displayed prominently on your site.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm opacity-70 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => updateData({ phone: e.target.value })}
                  placeholder="0412 345 678"
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none"
                />
              </div>
              <div>
                <label className="block text-sm opacity-70 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateData({ email: e.target.value })}
                  placeholder="hello@yourbusiness.com"
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={prevStep} className="btn btn-outline border-white/30 flex-1 py-4">
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!data.phone.trim() || !data.email.trim()}
                  className="btn btn-lime flex-1 py-4 disabled:opacity-50"
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Social Media */}
        {currentStep === 'socials' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📱</div>
              <h1 className="text-3xl md:text-4xl font-black mb-3">Got social media?</h1>
              <p className="opacity-80">We'll pull in your photos and style from Instagram to personalize your site!</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm opacity-70 mb-2">
                  <span className="text-pink-400">Instagram</span> (Recommended - we'll use your photos!)
                </label>
                <div className="flex">
                  <span className="px-4 py-4 bg-white/5 rounded-l-xl border-2 border-r-0 border-white/20 text-white/50">@</span>
                  <input
                    type="text"
                    value={data.instagram}
                    onChange={(e) => updateData({ instagram: e.target.value.replace('@', '') })}
                    placeholder="yourbusiness"
                    className="w-full px-5 py-4 rounded-r-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm opacity-70 mb-2">Facebook (optional)</label>
                <input
                  type="text"
                  value={data.facebook}
                  onChange={(e) => updateData({ facebook: e.target.value })}
                  placeholder="facebook.com/yourbusiness"
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none"
                />
              </div>
              <div>
                <label className="block text-sm opacity-70 mb-2">Existing Website (optional)</label>
                <input
                  type="text"
                  value={data.website}
                  onChange={(e) => updateData({ website: e.target.value })}
                  placeholder="www.yourbusiness.com"
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={prevStep} className="btn btn-outline border-white/30 flex-1 py-4">
                  ← Back
                </button>
                <button onClick={nextStep} className="btn btn-lime flex-1 py-4">
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Branding - Logo, Tone, Colors */}
        {currentStep === 'branding' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎨</div>
              <h1 className="text-3xl md:text-4xl font-black mb-3">Let's style your brand</h1>
              <p className="opacity-80">These choices will make your website uniquely yours.</p>
            </div>
            <div className="space-y-6">
              {/* Logo URL (optional) */}
              <div>
                <label className="block text-sm opacity-70 mb-2">Got a logo? (Optional)</label>
                <input
                  type="text"
                  value={data.logoUrl}
                  onChange={(e) => updateData({ logoUrl: e.target.value })}
                  placeholder="Paste your logo URL (e.g., from Google Drive or Dropbox)"
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none"
                />
                <p className="text-xs opacity-50 mt-1">We'll use this instead of generating a text logo</p>
              </div>

              {/* Brand Tone Selection */}
              <div>
                <label className="block text-sm opacity-70 mb-3">How should your brand feel?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {BRAND_TONES.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => updateData({ preferredTone: tone.id })}
                      className={`p-3 rounded-xl text-left transition-all ${
                        data.preferredTone === tone.id
                          ? 'bg-brand-lime text-brand-black scale-105'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <div className="text-xl mb-1">{tone.icon}</div>
                      <div className="font-bold text-sm">{tone.name}</div>
                      <div className="text-xs opacity-70">{tone.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palette Selection */}
              <div>
                <label className="block text-sm opacity-70 mb-3">Pick a color palette</label>
                <div className="grid grid-cols-2 gap-3">
                  {COLOR_PALETTES.map((palette) => (
                    <button
                      key={palette.id}
                      onClick={() => updateData({ selectedPalette: palette.id, customColors: palette.colors })}
                      className={`p-4 rounded-xl text-left transition-all ${
                        data.selectedPalette === palette.id
                          ? 'ring-2 ring-brand-lime scale-105'
                          : 'hover:bg-white/10'
                      }`}
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    >
                      <div className="flex gap-1 mb-2">
                        {palette.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-lg border border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="font-bold text-sm">{palette.name}</div>
                      <div className="text-xs opacity-70">{palette.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Colors (if selected) */}
              {data.selectedPalette === 'custom' && (
                <div>
                  <label className="block text-sm opacity-70 mb-2">Enter your brand colors (hex codes)</label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs opacity-50">Primary</label>
                      <input
                        type="text"
                        value={data.customColors[0] || ''}
                        onChange={(e) => {
                          const newColors = [...data.customColors]
                          newColors[0] = e.target.value
                          updateData({ customColors: newColors })
                        }}
                        placeholder="#1a1a1a"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs opacity-50">Accent</label>
                      <input
                        type="text"
                        value={data.customColors[1] || ''}
                        onChange={(e) => {
                          const newColors = [...data.customColors]
                          newColors[1] = e.target.value
                          updateData({ customColors: newColors })
                        }}
                        placeholder="#c5f82a"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs opacity-50">Background</label>
                      <input
                        type="text"
                        value={data.customColors[2] || ''}
                        onChange={(e) => {
                          const newColors = [...data.customColors]
                          newColors[2] = e.target.value
                          updateData({ customColors: newColors })
                        }}
                        placeholder="#ffffff"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={prevStep} className="btn btn-outline border-white/30 flex-1 py-4">
                  ← Back
                </button>
                <button onClick={nextStep} className="btn btn-lime flex-1 py-4">
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Services */}
        {currentStep === 'services' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🛠️</div>
              <h1 className="text-3xl md:text-4xl font-black mb-3">What services do you offer?</h1>
              <p className="opacity-80">Select all that apply, or add your own.</p>
            </div>
            <div className="space-y-4">
              {data.businessType && data.businessType !== 'other' && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {getServicesForType(data.businessType).map((service) => (
                    <button
                      key={service}
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        data.services.includes(service)
                          ? 'bg-brand-lime text-brand-black'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {data.services.includes(service) ? '✓ ' : ''}{service}
                    </button>
                  ))}
                </div>
              )}
              <textarea
                value={data.customServices}
                onChange={(e) => updateData({ customServices: e.target.value })}
                placeholder="Add any other services (one per line)..."
                rows={4}
                className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none resize-none"
              />
              <div className="flex gap-3">
                <button onClick={prevStep} className="btn btn-outline border-white/30 flex-1 py-4">
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={data.services.length === 0 && !data.customServices.trim()}
                  className="btn btn-lime flex-1 py-4 disabled:opacity-50"
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Unique Selling Points */}
        {currentStep === 'usp' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">⭐</div>
              <h1 className="text-3xl md:text-4xl font-black mb-3">What makes you special?</h1>
              <p className="opacity-80">Help us highlight what sets you apart from the competition.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm opacity-70 mb-2">Who are your ideal customers?</label>
                <input
                  type="text"
                  value={data.targetCustomers}
                  onChange={(e) => updateData({ targetCustomers: e.target.value })}
                  placeholder="e.g. Homeowners, young professionals, families..."
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none"
                />
              </div>
              <div>
                <label className="block text-sm opacity-70 mb-2">What makes you different? (Optional)</label>
                <textarea
                  value={data.uniqueSellingPoints}
                  onChange={(e) => updateData({ uniqueSellingPoints: e.target.value })}
                  placeholder="e.g. 20 years experience, same-day service, locally owned, eco-friendly products..."
                  rows={3}
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm opacity-70 mb-2">Anything else we should know? (Optional)</label>
                <textarea
                  value={data.additionalNotes}
                  onChange={(e) => updateData({ additionalNotes: e.target.value })}
                  placeholder="Any specific style preferences, colors, or information you want included..."
                  rows={3}
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-brand-lime outline-none resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={prevStep} className="btn btn-outline border-white/30 flex-1 py-4">
                  ← Back
                </button>
                <button onClick={nextStep} className="btn btn-lime flex-1 py-4 text-lg">
                  Generate My Website! 🚀
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Generating */}
        {currentStep === 'generating' && (
          <div className="animate-fadeIn text-center py-12">
            <div className="text-7xl mb-6 animate-bounce">✨</div>
            <h1 className="text-3xl md:text-4xl font-black mb-4">Creating Your Website...</h1>
            <p className="text-lg opacity-80 mb-8">{generationStatus}</p>
            <div className="w-full max-w-md mx-auto h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-brand-lime animate-pulse" style={{ width: '60%' }} />
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
