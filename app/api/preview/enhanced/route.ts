import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'
import {
  detectStyleFromPreferences,
  categoryDefaults,
  getLayoutVariation,
  StylePreset
} from '@/lib/design-system'
import { extractBrandProfile, BrandProfile } from '@/lib/extraction/brand-orchestrator'
import { analyzeInstagram, InstagramAnalysis } from '@/lib/extraction/instagram-analyzer'
import { generateAndSaveSite, GenerationInput } from '@/lib/generation/generate-site'

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
  // NEW: Additional fields for more unique outputs
  preferredColors?: string[]
  preferredTone?: string
  logoUrl?: string
}

interface InstagramData {
  bio: string
  posts: Array<{ caption: string; imageUrl: string }>
  profilePic: string
  followerCount: number
}

// Research-driven insights from competitor analysis
interface ResearchInsights {
  commonServices: string[]
  commonTrustSignals: string[]
  suggestedColors: {
    primary: string
    accent: string
    background: string
  }
  suggestedTone: string
  layoutRecommendation: string
}

// Fetch competitor research for this business type and location
async function getCompetitorResearch(businessType: string, location: string, services: string[]): Promise<ResearchInsights | null> {
  try {
    // Call our research API internally
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/research`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessType, location, services }),
    })

    if (!response.ok) {
      console.log('Research API returned error, using defaults')
      return null
    }

    const data = await response.json()
    return data.insights
  } catch (error) {
    console.log('Could not fetch research data:', error)
    return null
  }
}

// Generate rich preview content from detailed onboarding data
// Now uses RESEARCH DATA from competitor analysis for colors, services, and tone
function generateEnhancedPreview(
  data: OnboardingData,
  instagramData?: InstagramData,
  researchInsights?: ResearchInsights | null
) {
  const businessType = data.businessType === 'other' ? data.customType : data.businessType

  // Get category defaults for icons and CTAs (fallback)
  const category = categoryDefaults[data.businessType] || categoryDefaults.construction

  // Get layout variation based on business name (for variety)
  const layoutVariation = getLayoutVariation(data.businessName)

  // Combine selected services with custom services
  const allServices = [
    ...data.services,
    ...(data.customServices ? data.customServices.split('\n').filter(s => s.trim()) : [])
  ]

  // If user provided no services, use common services from competitor research
  const effectiveServices = allServices.length > 0
    ? allServices
    : (researchInsights?.commonServices || ['Service 1', 'Service 2', 'Service 3'])

  // RESEARCH-DRIVEN COLORS: Use competitor-informed colors, not hardcoded industry presets
  // Fall back to style detection only if research unavailable
  const detectedStyle = detectStyleFromPreferences(data.additionalNotes, data.businessType)

  const colors = researchInsights?.suggestedColors
    ? {
        primary: researchInsights.suggestedColors.primary,
        secondary: darkenColor(researchInsights.suggestedColors.primary, 0.2),
        accent: researchInsights.suggestedColors.accent,
        background: researchInsights.suggestedColors.background,
        text: isLightColor(researchInsights.suggestedColors.background) ? '#1a1a1a' : '#ffffff'
      }
    : {
        primary: detectedStyle.colors.primary,
        secondary: detectedStyle.colors.secondary,
        accent: detectedStyle.colors.accent,
        background: detectedStyle.colors.background,
        text: detectedStyle.colors.text
      }

  const icon = category.icon

  // RESEARCH-DRIVEN TONE: Adjust tagline based on competitor analysis
  const tone = researchInsights?.suggestedTone || detectedStyle.vibe

  // Generate tagline based on business info and research-informed tone
  let tagline = generateTagline(data.businessName, businessType, data.suburb, tone)
  if (data.uniqueSellingPoints) {
    const usp = data.uniqueSellingPoints.split(',')[0].trim()
    if (usp.length < 50) {
      tagline = usp
    }
  }

  // Generate description - incorporate research-driven tone
  let description = generateDescription(data.businessName, businessType, data.targetCustomers, data.suburb, tone)
  if (data.uniqueSellingPoints) {
    description += ` ${data.uniqueSellingPoints}`
  }

  // Add Instagram context if available
  if (instagramData?.bio) {
    description = instagramData.bio + ' ' + description
  }

  // Use Font Awesome icons (no emojis - professional B2B sites)
  const faIcons = getFontAwesomeIcons(businessType)
  const services = effectiveServices.slice(0, 6).map((name, i) => ({
    name,
    description: generateServiceDescription(name, businessType, tone),
    icon: faIcons[i % faIcons.length],
  }))

  // RESEARCH-DRIVEN TRUST SIGNALS: Use competitor-informed features
  const defaultFeatures = researchInsights?.commonTrustSignals ||
    ['Locally Owned', 'Quality Guaranteed', 'Free Quotes', 'Fully Insured']
  const customFeatures = data.uniqueSellingPoints
    ? data.uniqueSellingPoints.split(',').map(f => f.trim()).filter(f => f.length < 30).slice(0, 4)
    : []
  const features = customFeatures.length >= 3 ? customFeatures : defaultFeatures.slice(0, 4)

  // Generate testimonials with variety
  const firstNames = ['Sarah', 'Michael', 'Emma', 'James', 'Sophie', 'David', 'Lisa', 'Chris']
  const nearbySuburbs = getNearbySuburbs(data.suburb)

  // Use seeded random for consistent but varied testimonials
  const nameIndex = (data.businessName.length * 7) % firstNames.length

  const testimonials = [
    {
      name: firstNames[(nameIndex + 0) % firstNames.length],
      text: `Absolutely fantastic service from ${data.businessName}! Professional, punctual, and did an amazing job. Highly recommend!`,
      rating: 5,
      suburb: nearbySuburbs[0] || data.suburb,
    },
    {
      name: firstNames[(nameIndex + 3) % firstNames.length],
      text: `Best ${businessType} I've used in years. Fair pricing and excellent quality work. Will definitely use again.`,
      rating: 5,
      suburb: nearbySuburbs[1] || data.suburb,
    },
    {
      name: firstNames[(nameIndex + 5) % firstNames.length],
      text: `Great communication and reliable service. They went above and beyond to help us. Thank you!`,
      rating: 5,
      suburb: nearbySuburbs[2] || data.suburb,
    },
  ]

  // Format operating hours for display
  const formattedHours = formatOperatingHours(data.operatingHours)

  // Get images from Instagram if available
  const images = instagramData?.posts?.slice(0, 6).map(p => p.imageUrl) || []

  // Pick CTA based on category and variation
  const ctaText = category.ctaOptions[layoutVariation] || 'Get a Free Quote'

  return {
    businessName: data.businessName,
    category: businessType,
    icon,
    tagline,
    description,
    services,
    features,
    testimonials,
    colors,
    ctaText,
    suburb: data.suburb,
    state: data.state,
    phone: data.phone,
    email: data.email,
    address: data.address,
    operatingHours: formattedHours,
    instagram: data.instagram,
    facebook: data.facebook,
    images,
    // RESEARCH-DRIVEN: Layout from competitor analysis
    heroStyle: researchInsights?.layoutRecommendation === 'full-hero'
      ? 'image-overlay'
      : researchInsights?.layoutRecommendation === 'split-hero'
        ? 'split'
        : researchInsights?.layoutRecommendation === 'minimal-hero'
          ? 'minimal'
          : detectedStyle.layout.heroStyle,
    typography: detectedStyle.typography,
    layout: detectedStyle.layout,
    styleName: detectedStyle.name,
    styleVibe: researchInsights?.suggestedTone || detectedStyle.vibe,
    // Store user's original preferences for reference
    userPreferences: data.additionalNotes,
    // Include research data for transparency
    researchBased: !!researchInsights,
  }
}

// Helper: Generate professional taglines based on tone
function generateTagline(businessName: string, businessType: string, suburb: string, tone: string): string {
  const taglines: Record<string, string[]> = {
    professional: [
      `Quality ${businessType} services you can trust`,
      `${suburb}'s trusted ${businessType} specialists`,
      `Professional ${businessType} solutions`,
    ],
    reliable: [
      `Dependable ${businessType} services in ${suburb}`,
      `Your local ${businessType} experts`,
      `${businessType} services done right`,
    ],
    elegant: [
      `${businessType} excellence in ${suburb}`,
      `Where quality meets craftsmanship`,
      `Exceptional ${businessType} services`,
    ],
    warm: [
      `${suburb}'s favourite ${businessType}`,
      `Quality ${businessType} with a personal touch`,
      `Serving ${suburb} with care`,
    ],
    corporate: [
      `Strategic ${businessType} solutions`,
      `Professional ${businessType} services`,
      `${businessType} expertise you can rely on`,
    ],
    trustworthy: [
      `Trusted ${businessType} in ${suburb}`,
      `Reliable ${businessType} services`,
      `Your dependable ${businessType} partner`,
    ],
  }

  const toneTaglines = taglines[tone] || taglines.professional
  // Use business name length as seed for variety
  const index = businessName.length % toneTaglines.length
  return toneTaglines[index]
}

// Helper: Generate professional descriptions based on tone
function generateDescription(
  businessName: string,
  businessType: string,
  targetCustomers: string,
  suburb: string,
  tone: string
): string {
  const target = targetCustomers || 'clients'

  const templates: Record<string, string> = {
    professional: `${businessName} delivers high-quality ${businessType} services to ${target} throughout ${suburb} and surrounding areas. With attention to detail and commitment to excellence, we ensure every project meets the highest standards.`,
    reliable: `${businessName} provides dependable ${businessType} services to ${target} in ${suburb}. Our experienced team is committed to delivering consistent, quality results you can count on.`,
    elegant: `${businessName} brings refined ${businessType} services to discerning ${target} in ${suburb}. We combine expertise with exceptional attention to detail for results that exceed expectations.`,
    warm: `At ${businessName}, we take pride in serving ${target} across ${suburb} with genuine care and expertise. Our friendly team delivers quality ${businessType} services with a personal touch.`,
    corporate: `${businessName} offers comprehensive ${businessType} solutions for ${target} in ${suburb}. Our professional approach ensures efficient delivery and measurable results.`,
    trustworthy: `${businessName} has built a reputation for reliable ${businessType} services among ${target} in ${suburb}. We stand behind our work with transparent pricing and honest communication.`,
  }

  return templates[tone] || templates.professional
}

// Helper: Generate service descriptions based on tone
function generateServiceDescription(serviceName: string, businessType: string, tone: string): string {
  const templates: Record<string, string> = {
    professional: `Professional ${serviceName.toLowerCase()} delivered with precision and expertise.`,
    reliable: `Dependable ${serviceName.toLowerCase()} services you can count on.`,
    elegant: `Exceptional ${serviceName.toLowerCase()} with meticulous attention to detail.`,
    warm: `Quality ${serviceName.toLowerCase()} with friendly, personalised service.`,
    corporate: `Comprehensive ${serviceName.toLowerCase()} solutions for your business needs.`,
    trustworthy: `Reliable ${serviceName.toLowerCase()} backed by our quality guarantee.`,
  }

  return templates[tone] || templates.professional
}

// Helper: Get Font Awesome icons for business type (no emojis)
function getFontAwesomeIcons(businessType: string): string[] {
  const iconSets: Record<string, string[]> = {
    plumber: ['fa-wrench', 'fa-shower', 'fa-faucet', 'fa-water', 'fa-tools', 'fa-house-damage'],
    electrician: ['fa-bolt', 'fa-lightbulb', 'fa-plug', 'fa-charging-station', 'fa-solar-panel', 'fa-fan'],
    hairdresser: ['fa-cut', 'fa-spray-can', 'fa-magic', 'fa-star', 'fa-heart', 'fa-gem'],
    beautician: ['fa-spa', 'fa-star', 'fa-heart', 'fa-gem', 'fa-magic', 'fa-feather-alt'],
    cleaner: ['fa-broom', 'fa-spray-can', 'fa-home', 'fa-check-circle', 'fa-leaf', 'fa-sparkles'],
    landscaper: ['fa-tree', 'fa-leaf', 'fa-seedling', 'fa-cut', 'fa-home', 'fa-tint'],
    mechanic: ['fa-car', 'fa-wrench', 'fa-cog', 'fa-tools', 'fa-oil-can', 'fa-tachometer-alt'],
    cafe: ['fa-coffee', 'fa-utensils', 'fa-birthday-cake', 'fa-mug-hot', 'fa-cookie', 'fa-ice-cream'],
    fitness: ['fa-dumbbell', 'fa-running', 'fa-heart', 'fa-fire', 'fa-medal', 'fa-stopwatch'],
    photographer: ['fa-camera', 'fa-image', 'fa-film', 'fa-video', 'fa-heart', 'fa-star'],
    construction: ['fa-hard-hat', 'fa-hammer', 'fa-building', 'fa-ruler-combined', 'fa-drafting-compass', 'fa-tools'],
  }

  return iconSets[businessType] || ['fa-check-circle', 'fa-star', 'fa-award', 'fa-shield-alt', 'fa-thumbs-up', 'fa-heart']
}

// Helper: Darken a hex color
function darkenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, (num >> 16) - Math.round(255 * amount))
  const g = Math.max(0, ((num >> 8) & 0x00ff) - Math.round(255 * amount))
  const b = Math.max(0, (num & 0x0000ff) - Math.round(255 * amount))
  return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1)}`
}

// Helper: Check if a color is light
function isLightColor(hex: string): boolean {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = num >> 16
  const g = (num >> 8) & 0x00ff
  const b = num & 0x0000ff
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 155
}

function getNearbySuburbs(suburb: string): string[] {
  const melbourneSuburbs: Record<string, string[]> = {
    'Richmond': ['Cremorne', 'South Yarra', 'Abbotsford'],
    'Fitzroy': ['Collingwood', 'Carlton', 'Clifton Hill'],
    'Brunswick': ['Coburg', 'Northcote', 'Parkville'],
    'St Kilda': ['Elwood', 'Balaclava', 'Windsor'],
    'South Yarra': ['Prahran', 'Toorak', 'Richmond'],
    'Carlton': ['Parkville', 'Fitzroy', 'North Melbourne'],
    'Footscray': ['Yarraville', 'Seddon', 'West Melbourne'],
    'Preston': ['Reservoir', 'Thornbury', 'Northcote'],
    'Hawthorn': ['Camberwell', 'Kew', 'Richmond'],
    'Malvern': ['Armadale', 'Toorak', 'Glen Iris'],
  }
  return melbourneSuburbs[suburb] || ['Melbourne', suburb, 'Surrounding Areas']
}

function formatOperatingHours(hours: Record<string, { open: string; close: string; closed: boolean }>): string {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const formatted: string[] = []

  // Group similar hours
  let currentGroup = { days: [] as string[], hours: '' }

  days.forEach(day => {
    const dayHours = hours[day]
    const hoursString = dayHours.closed ? 'Closed' : `${dayHours.open} - ${dayHours.close}`

    if (hoursString === currentGroup.hours) {
      currentGroup.days.push(day)
    } else {
      if (currentGroup.days.length > 0) {
        formatted.push(formatDayGroup(currentGroup.days, currentGroup.hours))
      }
      currentGroup = { days: [day], hours: hoursString }
    }
  })

  if (currentGroup.days.length > 0) {
    formatted.push(formatDayGroup(currentGroup.days, currentGroup.hours))
  }

  return formatted.join(' | ')
}

function formatDayGroup(days: string[], hours: string): string {
  const shortDays: Record<string, string> = {
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
  }

  if (days.length === 1) {
    return `${shortDays[days[0]]}: ${hours}`
  } else if (days.length === 7) {
    return `Every day: ${hours}`
  } else {
    return `${shortDays[days[0]]}-${shortDays[days[days.length - 1]]}: ${hours}`
  }
}

// Fetch Instagram data using RapidAPI
async function fetchInstagramData(username: string): Promise<InstagramData | null> {
  if (!username) return null

  try {
    // Use the real Instagram analyzer
    const analysis = await analyzeInstagram(username)

    if (!analysis) {
      console.log(`No Instagram data found for @${username}`)
      return null
    }

    // Convert to the expected format
    return {
      bio: analysis.profile.bio,
      posts: analysis.images.recentPosts.map(p => ({
        caption: p.caption,
        imageUrl: p.url,
      })),
      profilePic: analysis.profile.profilePicUrl,
      followerCount: analysis.profile.followerCount,
    }
  } catch (error) {
    console.error(`Error fetching Instagram data for @${username}:`, error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: OnboardingData = await request.json()

    if (!data.businessName) {
      return NextResponse.json(
        { error: 'Business name is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const slug = slugify(data.businessName)

    // Check if lead already exists
    const { data: existingLead } = await supabase
      .from('leads')
      .select('*, client_sites(*)')
      .eq('slug', slug)
      .maybeSingle()

    // Fetch Instagram data if provided
    const instagramData = data.instagram ? await fetchInstagramData(data.instagram) : null

    // RESEARCH-DRIVEN: Fetch competitor insights for this business type and location
    const businessType = data.businessType === 'other' ? data.customType : data.businessType
    const researchInsights = await getCompetitorResearch(businessType, data.suburb, data.services)

    if (researchInsights) {
      console.log(`Research complete: Using competitor-informed colors and tone for ${data.businessName}`)
    }

    // Generate enhanced preview content using research data
    const previewContent = generateEnhancedPreview(data, instagramData || undefined, researchInsights)

    // If lead exists, UPDATE it with new content (so returning users get fresh results)
    if (existingLead) {
      // Update lead metadata
      await supabase
        .from('leads')
        .update({
          email: data.email || existingLead.email,
          phone: data.phone || existingLead.phone,
          suburb: data.suburb,
          state: data.state,
          category: previewContent.category,
          metadata: {
            address: data.address,
            postcode: data.postcode,
            operatingHours: data.operatingHours,
            instagram: data.instagram,
            facebook: data.facebook,
            website: data.website,
            services: data.services,
            customServices: data.customServices,
            targetCustomers: data.targetCustomers,
            uniqueSellingPoints: data.uniqueSellingPoints,
            additionalNotes: data.additionalNotes,
          },
        })
        .eq('id', existingLead.id)

      // Update or create client_site with new content
      const existingSite = existingLead.client_sites?.[0]
      if (existingSite) {
        await supabase
          .from('client_sites')
          .update({
            content: previewContent,
            settings: {
              colors: previewContent.colors,
              heroStyle: previewContent.heroStyle,
            },
          })
          .eq('id', existingSite.id)

        // Regenerate HTML using the data-driven v3 generator (direct call, no HTTP)
        try {
          const genInput: GenerationInput = {
            businessName: data.businessName,
            businessType: data.businessType === 'other' ? data.customType : data.businessType,
            location: data.suburb,
            website: data.website,
            instagram: data.instagram,
            facebook: data.facebook,
            services: data.services,
            uniqueSellingPoints: data.uniqueSellingPoints ? data.uniqueSellingPoints.split(',').map(s => s.trim()) : [],
            targetCustomers: data.targetCustomers ? data.targetCustomers.split(',').map(s => s.trim()) : [],
            additionalNotes: data.additionalNotes,
            phone: data.phone,
            email: data.email,
            address: data.address,
            hours: formatOperatingHours(data.operatingHours),
            preferredColors: data.preferredColors,
            preferredTone: data.preferredTone,
            logoUrl: data.logoUrl,
          }

          const genResult = await generateAndSaveSite(genInput)
          console.log(`Generated HTML (v3 data-driven) for ${existingLead.slug} in ${genResult.generationTime}ms - Saved: ${genResult.saved}`)
        } catch (genError) {
          console.error('Error regenerating HTML:', genError)
        }
      }

      return NextResponse.json({
        slug: existingLead.slug,
        leadId: existingLead.id,
        siteId: existingSite?.id,
        preview: previewContent,
        message: 'Preview updated successfully',
      })
    }

    // Create new lead with all collected data
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        business_name: data.businessName,
        slug,
        email: data.email || null,
        phone: data.phone || null,
        suburb: data.suburb,
        state: data.state,
        category: previewContent.category,
        source: 'enhanced_onboarding',
        status: 'new',
        metadata: {
          address: data.address,
          postcode: data.postcode,
          operatingHours: data.operatingHours,
          instagram: data.instagram,
          facebook: data.facebook,
          website: data.website,
          services: data.services,
          customServices: data.customServices,
          targetCustomers: data.targetCustomers,
          uniqueSellingPoints: data.uniqueSellingPoints,
          additionalNotes: data.additionalNotes,
        },
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating lead:', error)
      return NextResponse.json(
        { error: 'Failed to create preview' },
        { status: 500 }
      )
    }

    // Create preview site with enhanced content
    const { data: site, error: siteError } = await supabase
      .from('client_sites')
      .insert({
        slug,
        status: 'preview',
        template: 'service-v2',
        content: previewContent,
        settings: {
          colors: previewContent.colors,
          heroStyle: previewContent.heroStyle,
        },
      })
      .select()
      .single()

    if (siteError) {
      console.error('Error creating preview site:', siteError)
    } else {
      // Update lead with preview site ID
      await supabase
        .from('leads')
        .update({ preview_site_id: site.id })
        .eq('id', lead.id)

      // Generate actual HTML using the data-driven v3 generator (direct call, no HTTP)
      try {
        const genInput: GenerationInput = {
          businessName: data.businessName,
          businessType: data.businessType === 'other' ? data.customType : data.businessType,
          location: data.suburb,
          website: data.website,
          instagram: data.instagram,
          facebook: data.facebook,
          services: data.services,
          uniqueSellingPoints: data.uniqueSellingPoints ? data.uniqueSellingPoints.split(',').map(s => s.trim()) : [],
          targetCustomers: data.targetCustomers ? data.targetCustomers.split(',').map(s => s.trim()) : [],
          additionalNotes: data.additionalNotes,
          phone: data.phone,
          email: data.email,
          address: data.address,
          hours: formatOperatingHours(data.operatingHours),
          preferredColors: data.preferredColors,
          preferredTone: data.preferredTone,
          logoUrl: data.logoUrl,
        }

        const genResult = await generateAndSaveSite(genInput)
        console.log(`Generated HTML (v3 data-driven) for ${slug} in ${genResult.generationTime}ms - Saved: ${genResult.saved}`)
      } catch (genError) {
        console.error('Error generating HTML:', genError)
      }
    }

    return NextResponse.json({
      slug: lead.slug,
      leadId: lead.id,
      siteId: site?.id,
      preview: previewContent,
      message: 'Preview created successfully',
    })
  } catch (error) {
    console.error('Preview error:', error)
    return NextResponse.json(
      { error: 'Failed to create preview' },
      { status: 500 }
    )
  }
}
