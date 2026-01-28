import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'
import {
  detectStyleFromPreferences,
  categoryDefaults,
  getLayoutVariation,
  StylePreset
} from '@/lib/design-system'

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
}

interface InstagramData {
  bio: string
  posts: Array<{ caption: string; imageUrl: string }>
  profilePic: string
  followerCount: number
}

// Generate rich preview content from detailed onboarding data
// Now uses design-system.ts for variety and preference detection
function generateEnhancedPreview(data: OnboardingData, instagramData?: InstagramData) {
  const businessType = data.businessType === 'other' ? data.customType : data.businessType

  // DETECT STYLE FROM USER PREFERENCES (additionalNotes)
  // This is the key change - now "black and white minimalist Chanel" will work!
  const detectedStyle = detectStyleFromPreferences(data.additionalNotes, data.businessType)

  // Get category defaults for icons and CTAs
  const category = categoryDefaults[data.businessType] || categoryDefaults.construction

  // Get layout variation based on business name (for variety)
  const layoutVariation = getLayoutVariation(data.businessName)

  // Combine selected services with custom services
  const allServices = [
    ...data.services,
    ...(data.customServices ? data.customServices.split('\n').filter(s => s.trim()) : [])
  ]

  // Use detected style colors instead of hardcoded per-category
  const colors = {
    primary: detectedStyle.colors.primary,
    secondary: detectedStyle.colors.secondary,
    accent: detectedStyle.colors.accent,
    background: detectedStyle.colors.background,
    text: detectedStyle.colors.text
  }

  const icon = category.icon

  // Generate tagline based on business info and style
  let tagline = `Professional ${businessType} services in ${data.suburb}`
  if (data.uniqueSellingPoints) {
    const usp = data.uniqueSellingPoints.split(',')[0].trim()
    if (usp.length < 50) {
      tagline = usp
    }
  }

  // Generate description - incorporate style vibe
  let description = `${data.businessName} provides quality ${businessType} services to ${data.targetCustomers || 'customers'} in ${data.suburb} and surrounding areas.`
  if (data.uniqueSellingPoints) {
    description += ` ${data.uniqueSellingPoints}`
  }

  // Add Instagram context if available
  if (instagramData?.bio) {
    description = instagramData.bio + ' ' + description
  }

  // Use category-specific service icons for variety
  const serviceIcons = category.serviceIcons
  const services = allServices.slice(0, 6).map((name, i) => ({
    name,
    description: `Professional ${name.toLowerCase()} services with attention to detail and customer satisfaction.`,
    icon: serviceIcons[i % serviceIcons.length],
  }))

  // Generate features based on USPs
  const defaultFeatures = ['Locally Owned', 'Quality Guaranteed', 'Free Quotes', 'Fully Insured']
  const customFeatures = data.uniqueSellingPoints
    ? data.uniqueSellingPoints.split(',').map(f => f.trim()).filter(f => f.length < 30).slice(0, 4)
    : []
  const features = customFeatures.length >= 3 ? customFeatures : defaultFeatures

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
    // NEW: Include style metadata for frontend to use
    heroStyle: detectedStyle.layout.heroStyle,
    typography: detectedStyle.typography,
    layout: detectedStyle.layout,
    styleName: detectedStyle.name,
    styleVibe: detectedStyle.vibe,
    // Store user's original preferences for reference
    userPreferences: data.additionalNotes,
  }
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

// Fetch Instagram data (placeholder - would need actual Instagram API)
async function fetchInstagramData(username: string): Promise<InstagramData | null> {
  if (!username) return null

  // In production, this would use Instagram's API or a service like RapidAPI
  // For now, return mock data to demonstrate the concept
  console.log(`Would fetch Instagram data for @${username}`)

  // Return null for now - this would be implemented with actual Instagram API
  return null
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

    // Generate enhanced preview content (always regenerate for fresh results)
    const previewContent = generateEnhancedPreview(data, instagramData || undefined)

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
