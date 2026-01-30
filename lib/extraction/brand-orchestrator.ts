/**
 * Brand Extraction Orchestrator
 *
 * This is the core engine that "connects all the dots" - gathering data from:
 * - User's existing website (colors, fonts, layout, content)
 * - User's Instagram (branding, photos, tone, aesthetic)
 * - Competitor websites (industry patterns, common layouts, trust signals)
 * - User's direct inputs (preferences, USPs, target audience)
 *
 * The output is a comprehensive BrandProfile that drives unique site generation.
 */

import { analyzeWebsite, analyzeCompetitors, WebsiteAnalysis, CompetitorPatterns } from './website-analyzer'
import { analyzeInstagram, InstagramAnalysis } from './instagram-analyzer'

export interface BrandProfile {
  // Identity
  businessName: string
  businessType: string
  location: string

  // Visual Identity (extracted + user preferences)
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    source: 'instagram' | 'website' | 'competitors' | 'user' | 'default'
  }

  fonts: {
    heading: string
    body: string
    accent?: string
    source: 'website' | 'competitors' | 'user' | 'default'
  }

  // Layout preferences
  layout: {
    heroStyle: 'full-bleed' | 'split' | 'minimal' | 'centered' | 'asymmetric'
    navigationStyle: 'fixed' | 'hidden' | 'transparent' | 'simple'
    sectionDensity: 'spacious' | 'moderate' | 'compact'
    imageStyle: 'large' | 'grid' | 'masonry' | 'minimal'
    source: 'website' | 'competitors' | 'user' | 'default'
  }

  // Tone & Voice
  tone: {
    overall: 'professional' | 'casual' | 'luxurious' | 'fun' | 'minimal' | 'warm' | 'bold' | 'elegant'
    copyStyle: 'formal' | 'conversational' | 'direct' | 'storytelling'
    source: 'instagram' | 'website' | 'user' | 'default'
  }

  // Content
  content: {
    headline?: string
    tagline?: string
    aboutSnippet?: string
    services: string[]
    uniqueSellingPoints: string[]
    trustSignals: string[]
    callToAction: string
  }

  // Images
  images: {
    logo?: string
    hero?: string
    gallery: string[]
    source: 'instagram' | 'website' | 'stock' | 'user'
  }

  // Contact
  contact: {
    phone?: string
    email?: string
    address?: string
    hours?: string
    socialLinks: {
      instagram?: string
      facebook?: string
      linkedin?: string
      twitter?: string
    }
  }

  // Industry context (from competitor analysis)
  industryContext: {
    commonPatterns: string[]
    differentiators: string[]
    mustHaveElements: string[]
    competitorInsights: string[]
  }

  // Raw data sources (for AI context)
  rawData: {
    websiteAnalysis?: WebsiteAnalysis | null
    instagramAnalysis?: InstagramAnalysis | null
    competitorPatterns?: CompetitorPatterns | null
  }
}

export interface ExtractionInput {
  // Required
  businessName: string
  businessType: string
  location: string

  // Optional URLs to analyze
  existingWebsite?: string
  instagramUsername?: string
  facebookUrl?: string
  competitorUrls?: string[]

  // User-provided preferences
  services?: string[]
  uniqueSellingPoints?: string[]
  targetCustomers?: string[]
  preferredColors?: string[]
  preferredTone?: string
  additionalNotes?: string

  // Contact info
  phone?: string
  email?: string
  address?: string
  hours?: string

  // Direct uploads
  logoUrl?: string
}

/**
 * Main orchestration function - extracts and aggregates all brand data
 */
export async function extractBrandProfile(input: ExtractionInput): Promise<BrandProfile> {
  console.log(`\n========================================`)
  console.log(`BRAND EXTRACTION: ${input.businessName}`)
  console.log(`========================================\n`)

  // Run all extractions in parallel for speed
  const [websiteAnalysis, instagramAnalysis, competitorPatterns] = await Promise.all([
    // Analyze existing website if provided
    input.existingWebsite ? analyzeWebsite(input.existingWebsite) : Promise.resolve(null),

    // Analyze Instagram if provided
    input.instagramUsername ? analyzeInstagram(input.instagramUsername) : Promise.resolve(null),

    // Analyze competitors (from search results or provided URLs)
    extractCompetitorPatterns(input.businessType, input.location, input.competitorUrls),
  ])

  // Log what we found
  console.log(`\nExtraction Results:`)
  console.log(`- Website: ${websiteAnalysis ? 'Analyzed' : 'Not provided'}`)
  console.log(`- Instagram: ${instagramAnalysis ? 'Analyzed' : 'Not provided'}`)
  console.log(`- Competitors: ${competitorPatterns ? `${competitorPatterns.analyzedCount} analyzed` : 'None found'}`)

  // Build the comprehensive brand profile
  const profile = buildBrandProfile(input, websiteAnalysis, instagramAnalysis, competitorPatterns)

  console.log(`\n========================================`)
  console.log(`BRAND PROFILE COMPLETE`)
  console.log(`- Colors: ${profile.colors.source} (${profile.colors.primary})`)
  console.log(`- Fonts: ${profile.fonts.source} (${profile.fonts.heading})`)
  console.log(`- Layout: ${profile.layout.source} (${profile.layout.heroStyle})`)
  console.log(`- Tone: ${profile.tone.source} (${profile.tone.overall})`)
  console.log(`========================================\n`)

  return profile
}

/**
 * Extract patterns from competitor websites
 */
async function extractCompetitorPatterns(
  businessType: string,
  location: string,
  providedUrls?: string[]
): Promise<CompetitorPatterns | null> {
  // If URLs provided directly, use those
  if (providedUrls && providedUrls.length > 0) {
    console.log(`Analyzing ${providedUrls.length} provided competitor URLs...`)
    return analyzeCompetitors(providedUrls)
  }

  // Otherwise, search for competitors and analyze top results
  const serpApiKey = process.env.SERP_API_KEY
  if (!serpApiKey) {
    console.log('No SERP_API_KEY configured, skipping competitor search')
    return null
  }

  try {
    const searchQuery = `${businessType} ${location} Australia`
    console.log(`Searching for competitors: "${searchQuery}"`)

    const serpResponse = await fetch(
      `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(searchQuery)}&location=Australia&api_key=${serpApiKey}&num=5`,
      { signal: AbortSignal.timeout(10000) }
    )

    if (!serpResponse.ok) {
      console.error(`SERP API error: ${serpResponse.status}`)
      return null
    }

    const serpData = await serpResponse.json()
    const organicResults = serpData.organic_results || []

    if (organicResults.length === 0) {
      console.log('No competitor results found')
      return null
    }

    // Extract URLs from search results
    const competitorUrls = organicResults
      .slice(0, 5)
      .map((result: any) => result.link)
      .filter((url: string) => url && !url.includes('facebook.com') && !url.includes('instagram.com'))

    console.log(`Found ${competitorUrls.length} competitor URLs to analyze`)

    if (competitorUrls.length === 0) {
      return null
    }

    return analyzeCompetitors(competitorUrls)
  } catch (error) {
    console.error('Error searching for competitors:', error)
    return null
  }
}

/**
 * Build the final brand profile from all sources
 * Priority: User input > Instagram > Website > Competitors > Defaults
 */
function buildBrandProfile(
  input: ExtractionInput,
  website: WebsiteAnalysis | null,
  instagram: InstagramAnalysis | null,
  competitors: CompetitorPatterns | null
): BrandProfile {

  return {
    // Identity
    businessName: input.businessName,
    businessType: input.businessType,
    location: input.location,

    // Colors - prioritize existing branding
    colors: extractColors(input, website, instagram, competitors),

    // Fonts - from website or competitors
    fonts: extractFonts(input, website, competitors),

    // Layout - from website analysis or competitor patterns
    layout: extractLayout(input, website, competitors),

    // Tone - from Instagram or website content
    tone: extractTone(input, website, instagram),

    // Content - merge all sources
    content: extractContent(input, website, instagram, competitors),

    // Images - prioritize Instagram then website
    images: extractImages(input, website, instagram),

    // Contact info
    contact: {
      phone: input.phone,
      email: input.email,
      address: input.address,
      hours: input.hours,
      socialLinks: {
        instagram: input.instagramUsername ? `https://instagram.com/${input.instagramUsername}` : undefined,
        facebook: input.facebookUrl,
      }
    },

    // Industry context
    industryContext: extractIndustryContext(input, competitors),

    // Raw data for AI
    rawData: {
      websiteAnalysis: website,
      instagramAnalysis: instagram,
      competitorPatterns: competitors,
    }
  }
}

/**
 * Extract color palette with priority
 */
function extractColors(
  input: ExtractionInput,
  website: WebsiteAnalysis | null,
  instagram: InstagramAnalysis | null,
  competitors: CompetitorPatterns | null
): BrandProfile['colors'] {

  // User-specified colors take priority
  if (input.preferredColors && input.preferredColors.length >= 2) {
    return {
      primary: input.preferredColors[0],
      secondary: input.preferredColors[1] || input.preferredColors[0],
      accent: input.preferredColors[2] || adjustColor(input.preferredColors[0], 20),
      background: '#ffffff',
      text: '#1a1a1a',
      source: 'user'
    }
  }

  // Instagram brand colors
  if (instagram?.brand.colors && instagram.brand.colors.length >= 2) {
    return {
      primary: instagram.brand.colors[0],
      secondary: instagram.brand.colors[1] || instagram.brand.colors[0],
      accent: instagram.brand.colors[2] || adjustColor(instagram.brand.colors[0], 20),
      background: '#ffffff',
      text: '#1a1a1a',
      source: 'instagram'
    }
  }

  // Existing website colors
  if (website?.colors?.primary) {
    return {
      primary: website.colors.primary,
      secondary: website.colors.secondary || website.colors.primary,
      accent: website.colors.accent || adjustColor(website.colors.primary, 20),
      background: website.colors.background || '#ffffff',
      text: website.colors.text || '#1a1a1a',
      source: 'website'
    }
  }

  // Competitor patterns
  if (competitors?.commonColors && competitors.commonColors.length >= 2) {
    return {
      primary: competitors.commonColors[0],
      secondary: competitors.commonColors[1],
      accent: competitors.commonColors[2] || adjustColor(competitors.commonColors[0], 20),
      background: '#ffffff',
      text: '#1a1a1a',
      source: 'competitors'
    }
  }

  // Industry defaults
  const industryColors = getIndustryColorDefaults(input.businessType)
  return {
    ...industryColors,
    source: 'default'
  }
}

/**
 * Extract font choices
 */
function extractFonts(
  input: ExtractionInput,
  website: WebsiteAnalysis | null,
  competitors: CompetitorPatterns | null
): BrandProfile['fonts'] {

  // From existing website
  if (website?.fonts?.headings) {
    return {
      heading: website.fonts.headings,
      body: website.fonts.body || 'Inter',
      source: 'website'
    }
  }

  // From competitor analysis
  if (competitors?.commonFonts && competitors.commonFonts.length > 0) {
    return {
      heading: competitors.commonFonts[0],
      body: competitors.commonFonts[1] || 'Inter',
      source: 'competitors'
    }
  }

  // Industry defaults
  const industryFonts = getIndustryFontDefaults(input.businessType)
  return {
    ...industryFonts,
    source: 'default'
  }
}

/**
 * Extract layout preferences
 */
function extractLayout(
  input: ExtractionInput,
  website: WebsiteAnalysis | null,
  competitors: CompetitorPatterns | null
): BrandProfile['layout'] {

  // From existing website
  if (website?.layout) {
    return {
      heroStyle: mapHeroStyle(website.layout.heroStyle),
      navigationStyle: mapNavStyle(website.layout.navigationStyle),
      sectionDensity: 'moderate',
      imageStyle: website.layout.hasHeroImage ? 'large' : 'grid',
      source: 'website'
    }
  }

  // From competitor patterns
  if (competitors?.commonLayout) {
    return {
      heroStyle: mapHeroStyle(competitors.commonLayout.heroStyle),
      navigationStyle: mapNavStyle(competitors.commonLayout.navStyle),
      sectionDensity: 'moderate',
      imageStyle: 'large',
      source: 'competitors'
    }
  }

  // Industry defaults
  const industryLayout = getIndustryLayoutDefaults(input.businessType)
  return {
    ...industryLayout,
    source: 'default'
  }
}

/**
 * Extract tone and voice
 */
function extractTone(
  input: ExtractionInput,
  website: WebsiteAnalysis | null,
  instagram: InstagramAnalysis | null
): BrandProfile['tone'] {

  // User-specified tone
  if (input.preferredTone) {
    return {
      overall: mapTone(input.preferredTone),
      copyStyle: getCopyStyleForTone(input.preferredTone),
      source: 'user'
    }
  }

  // From Instagram
  if (instagram?.brand.tone) {
    return {
      overall: instagram.brand.tone,
      copyStyle: getCopyStyleForTone(instagram.brand.tone),
      source: 'instagram'
    }
  }

  // From website content analysis
  if (website?.meta?.description) {
    const tone = analyzeToneFromText(website.meta.description)
    return {
      overall: tone,
      copyStyle: getCopyStyleForTone(tone),
      source: 'website'
    }
  }

  // Industry default
  const industryTone = getIndustryToneDefault(input.businessType)
  return {
    ...industryTone,
    source: 'default'
  }
}

/**
 * Extract and merge content from all sources
 */
function extractContent(
  input: ExtractionInput,
  website: WebsiteAnalysis | null,
  instagram: InstagramAnalysis | null,
  competitors: CompetitorPatterns | null
): BrandProfile['content'] {

  // Services - user input first, then website
  const services = input.services && input.services.length > 0
    ? input.services
    : website?.content?.services || getDefaultServices(input.businessType)

  // USPs - user input first
  const usps = input.uniqueSellingPoints && input.uniqueSellingPoints.length > 0
    ? input.uniqueSellingPoints
    : extractUSPsFromContent(website, instagram)

  // Trust signals from competitors
  const trustSignals = competitors?.trustSignals || getDefaultTrustSignals(input.businessType)

  // Headline and tagline from website or generate
  const headline = website?.meta?.title || generateHeadline(input)
  const tagline = website?.meta?.description?.split('.')[0] || generateTagline(input)

  return {
    headline,
    tagline,
    aboutSnippet: website?.content?.description,
    services,
    uniqueSellingPoints: usps,
    trustSignals,
    callToAction: getCTAForBusiness(input.businessType)
  }
}

/**
 * Extract images with priority: Instagram > Website > Stock
 */
function extractImages(
  input: ExtractionInput,
  website: WebsiteAnalysis | null,
  instagram: InstagramAnalysis | null
): BrandProfile['images'] {

  // Logo from user upload
  const logo = input.logoUrl

  // Gallery images - prefer Instagram for real business photos
  const galleryImages: string[] = []

  if (instagram?.images.recentPosts) {
    // Add top Instagram posts (filter for high engagement)
    const topPosts = instagram.images.recentPosts
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6)
      .map(p => p.url)
      .filter(url => url && url.length > 0)
    galleryImages.push(...topPosts)
  }

  if (website?.images?.gallery && galleryImages.length < 6) {
    // Supplement with website images
    const webImages = website.images.gallery.slice(0, 6 - galleryImages.length)
    galleryImages.push(...webImages)
  }

  // Hero image - prefer high-quality Instagram or website image
  const hero = instagram?.images.profilePic ||
               website?.images?.hero ||
               undefined

  return {
    logo: logo || website?.images?.logo,
    hero,
    gallery: galleryImages,
    source: instagram?.images.recentPosts?.length ? 'instagram' :
            website?.images?.gallery?.length ? 'website' : 'stock'
  }
}

/**
 * Extract industry context and differentiators
 */
function extractIndustryContext(
  input: ExtractionInput,
  competitors: CompetitorPatterns | null
): BrandProfile['industryContext'] {

  const mustHaves = getMustHaveElements(input.businessType)

  return {
    commonPatterns: competitors?.commonLayout ? [
      `Hero style: ${competitors.commonLayout.heroStyle}`,
      `Navigation: ${competitors.commonLayout.navStyle}`,
    ] : [],
    differentiators: input.uniqueSellingPoints || [],
    mustHaveElements: mustHaves,
    competitorInsights: competitors?.insights || []
  }
}

// ============================================
// Helper Functions
// ============================================

function adjustColor(hex: string, percent: number): string {
  // Simple color adjustment - could be enhanced
  return hex
}

function isLightColor(hex: string): boolean {
  if (!hex || hex.length < 7) return false
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.7
}

function isDarkColor(hex: string): boolean {
  if (!hex || hex.length < 7) return false
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.3
}

function mapHeroStyle(style?: string): BrandProfile['layout']['heroStyle'] {
  const mapping: Record<string, BrandProfile['layout']['heroStyle']> = {
    'full-width': 'full-bleed',
    'full-bleed': 'full-bleed',
    'split': 'split',
    'centered': 'centered',
    'minimal': 'minimal',
    'asymmetric': 'asymmetric',
  }
  return mapping[style?.toLowerCase() || ''] || 'full-bleed'
}

function mapNavStyle(style?: string): BrandProfile['layout']['navigationStyle'] {
  const mapping: Record<string, BrandProfile['layout']['navigationStyle']> = {
    'fixed': 'fixed',
    'sticky': 'fixed',
    'transparent': 'transparent',
    'hidden': 'hidden',
    'hamburger': 'hidden',
    'simple': 'simple',
  }
  return mapping[style?.toLowerCase() || ''] || 'fixed'
}

function mapTone(tone: string): BrandProfile['tone']['overall'] {
  const mapping: Record<string, BrandProfile['tone']['overall']> = {
    'professional': 'professional',
    'casual': 'casual',
    'luxury': 'luxurious',
    'luxurious': 'luxurious',
    'fun': 'fun',
    'playful': 'fun',
    'minimal': 'minimal',
    'minimalist': 'minimal',
    'warm': 'warm',
    'friendly': 'warm',
    'bold': 'bold',
    'elegant': 'elegant',
    'sophisticated': 'elegant',
  }
  return mapping[tone.toLowerCase()] || 'professional'
}

function getCopyStyleForTone(tone: string): BrandProfile['tone']['copyStyle'] {
  const mapping: Record<string, BrandProfile['tone']['copyStyle']> = {
    'professional': 'formal',
    'casual': 'conversational',
    'luxurious': 'storytelling',
    'fun': 'conversational',
    'minimal': 'direct',
    'warm': 'conversational',
    'bold': 'direct',
    'elegant': 'storytelling',
  }
  return mapping[tone.toLowerCase()] || 'formal'
}

function analyzeToneFromText(text: string): BrandProfile['tone']['overall'] {
  const lower = text.toLowerCase()
  if (lower.match(/luxury|premium|exclusive|elegant/)) return 'luxurious'
  if (lower.match(/fun|enjoy|love|happy|excited/)) return 'fun'
  if (lower.match(/minimal|simple|clean|modern/)) return 'minimal'
  if (lower.match(/warm|friendly|family|community/)) return 'warm'
  if (lower.match(/bold|strong|powerful|dynamic/)) return 'bold'
  return 'professional'
}

function extractUSPsFromContent(
  website: WebsiteAnalysis | null,
  instagram: InstagramAnalysis | null
): string[] {
  const usps: string[] = []

  // From Instagram themes
  if (instagram?.content.topicThemes) {
    instagram.content.topicThemes.forEach(theme => {
      usps.push(`Specializing in ${theme}`)
    })
  }

  // From website content
  if (website?.content?.services) {
    usps.push(`Expert ${website.content.services[0]}`)
  }

  return usps.length > 0 ? usps : ['Quality service', 'Experienced team', 'Customer focused']
}

function generateHeadline(input: ExtractionInput): string {
  return `${input.businessName} - ${input.businessType} in ${input.location}`
}

function generateTagline(input: ExtractionInput): string {
  const taglines: Record<string, string> = {
    'cafe': 'Great coffee, great vibes',
    'restaurant': 'Unforgettable dining experiences',
    'fitness': 'Transform your life',
    'beauty': 'Where beauty meets expertise',
    'legal': 'Legal solutions you can trust',
    'construction': 'Building excellence',
    'plumber': 'Reliable plumbing, guaranteed',
    'cleaning': 'Spotless results, every time',
  }
  return taglines[input.businessType.toLowerCase()] || 'Excellence in every detail'
}

function getCTAForBusiness(businessType: string): string {
  const ctas: Record<string, string> = {
    'cafe': 'View Our Menu',
    'restaurant': 'Book a Table',
    'fitness': 'Start Your Journey',
    'beauty': 'Book Now',
    'legal': 'Get a Consultation',
    'construction': 'Get a Free Quote',
    'plumber': 'Call Now',
    'cleaning': 'Get a Quote',
  }
  return ctas[businessType.toLowerCase()] || 'Get Started'
}

// Industry defaults

function getIndustryColorDefaults(businessType: string): Omit<BrandProfile['colors'], 'source'> {
  const defaults: Record<string, Omit<BrandProfile['colors'], 'source'>> = {
    'cafe': { primary: '#3d2c1f', secondary: '#c4784a', accent: '#d4a574', background: '#fffbf5', text: '#2d2d2d' },
    'restaurant': { primary: '#2d2d2d', secondary: '#8b0000', accent: '#d4af37', background: '#faf8f5', text: '#1a1a1a' },
    'fitness': { primary: '#1a1a1a', secondary: '#ef4444', accent: '#22c55e', background: '#ffffff', text: '#1a1a1a' },
    'beauty': { primary: '#2d2d2d', secondary: '#d4a574', accent: '#f5e6d3', background: '#faf8f5', text: '#1a1a1a' },
    'legal': { primary: '#1e3a5f', secondary: '#94a3b8', accent: '#d4af37', background: '#f8fafc', text: '#1a1a1a' },
    'construction': { primary: '#1a1a1a', secondary: '#c5a572', accent: '#f59e0b', background: '#ffffff', text: '#1a1a1a' },
    'plumber': { primary: '#1e3a5f', secondary: '#f59e0b', accent: '#3b82f6', background: '#ffffff', text: '#1a1a1a' },
    'cleaning': { primary: '#1565c0', secondary: '#4caf50', accent: '#81d4fa', background: '#ffffff', text: '#1a1a1a' },
  }
  return defaults[businessType.toLowerCase()] || { primary: '#1a1a1a', secondary: '#6366f1', accent: '#818cf8', background: '#ffffff', text: '#1a1a1a' }
}

function getIndustryFontDefaults(businessType: string): Omit<BrandProfile['fonts'], 'source'> {
  const defaults: Record<string, Omit<BrandProfile['fonts'], 'source'>> = {
    'cafe': { heading: 'Playfair Display', body: 'Lato' },
    'restaurant': { heading: 'Cormorant Garamond', body: 'Open Sans' },
    'fitness': { heading: 'Oswald', body: 'Roboto' },
    'beauty': { heading: 'Playfair Display', body: 'Montserrat' },
    'legal': { heading: 'Libre Baskerville', body: 'Source Sans Pro' },
    'construction': { heading: 'Bebas Neue', body: 'Open Sans' },
    'plumber': { heading: 'Montserrat', body: 'Open Sans' },
    'cleaning': { heading: 'Poppins', body: 'Open Sans' },
  }
  return defaults[businessType.toLowerCase()] || { heading: 'Inter', body: 'Inter' }
}

function getIndustryLayoutDefaults(businessType: string): Omit<BrandProfile['layout'], 'source'> {
  const defaults: Record<string, Omit<BrandProfile['layout'], 'source'>> = {
    'cafe': { heroStyle: 'full-bleed', navigationStyle: 'transparent', sectionDensity: 'spacious', imageStyle: 'large' },
    'restaurant': { heroStyle: 'full-bleed', navigationStyle: 'transparent', sectionDensity: 'spacious', imageStyle: 'large' },
    'fitness': { heroStyle: 'split', navigationStyle: 'fixed', sectionDensity: 'moderate', imageStyle: 'grid' },
    'beauty': { heroStyle: 'minimal', navigationStyle: 'simple', sectionDensity: 'spacious', imageStyle: 'masonry' },
    'legal': { heroStyle: 'minimal', navigationStyle: 'fixed', sectionDensity: 'moderate', imageStyle: 'minimal' },
    'construction': { heroStyle: 'full-bleed', navigationStyle: 'fixed', sectionDensity: 'moderate', imageStyle: 'grid' },
    'plumber': { heroStyle: 'split', navigationStyle: 'fixed', sectionDensity: 'compact', imageStyle: 'minimal' },
    'cleaning': { heroStyle: 'split', navigationStyle: 'fixed', sectionDensity: 'moderate', imageStyle: 'minimal' },
  }
  return defaults[businessType.toLowerCase()] || { heroStyle: 'split', navigationStyle: 'fixed', sectionDensity: 'moderate', imageStyle: 'large' }
}

function getIndustryToneDefault(businessType: string): Omit<BrandProfile['tone'], 'source'> {
  const defaults: Record<string, Omit<BrandProfile['tone'], 'source'>> = {
    'cafe': { overall: 'warm', copyStyle: 'conversational' },
    'restaurant': { overall: 'elegant', copyStyle: 'storytelling' },
    'fitness': { overall: 'bold', copyStyle: 'direct' },
    'beauty': { overall: 'elegant', copyStyle: 'conversational' },
    'legal': { overall: 'professional', copyStyle: 'formal' },
    'construction': { overall: 'professional', copyStyle: 'direct' },
    'plumber': { overall: 'professional', copyStyle: 'direct' },
    'cleaning': { overall: 'professional', copyStyle: 'conversational' },
  }
  return defaults[businessType.toLowerCase()] || { overall: 'professional', copyStyle: 'formal' }
}

function getDefaultServices(businessType: string): string[] {
  const services: Record<string, string[]> = {
    'cafe': ['Coffee', 'Breakfast', 'Lunch', 'Takeaway', 'Catering'],
    'restaurant': ['Dine In', 'Takeaway', 'Catering', 'Private Events'],
    'fitness': ['Personal Training', 'Group Classes', 'Gym Access', 'Nutrition'],
    'beauty': ['Hair', 'Nails', 'Facials', 'Waxing', 'Makeup'],
    'legal': ['Consultations', 'Contracts', 'Disputes', 'Compliance'],
    'construction': ['Fitouts', 'Renovations', 'Project Management', 'Design'],
    'plumber': ['Emergency Repairs', 'Hot Water', 'Blocked Drains', 'Maintenance'],
    'cleaning': ['Residential', 'Commercial', 'End of Lease', 'Deep Cleaning'],
  }
  return services[businessType.toLowerCase()] || ['Service 1', 'Service 2', 'Service 3']
}

function getDefaultTrustSignals(businessType: string): string[] {
  const signals: Record<string, string[]> = {
    'cafe': ['Locally Roasted', 'Fresh Daily', 'Community Focused'],
    'restaurant': ['Fresh Produce', 'Award Winning', 'Experienced Chef'],
    'fitness': ['Certified Trainers', 'Modern Equipment', 'Flexible Hours'],
    'beauty': ['Qualified Stylists', 'Premium Products', 'Hygienic Standards'],
    'legal': ['Licensed', 'Confidential', 'Fixed Fee Options'],
    'construction': ['Licensed Builder', 'Fully Insured', 'Fixed Price Quotes'],
    'plumber': ['Licensed', '24/7 Emergency', 'Same Day Service'],
    'cleaning': ['Insured', 'Police Checked', 'Satisfaction Guaranteed'],
  }
  return signals[businessType.toLowerCase()] || ['Quality Service', 'Experienced Team', 'Customer Focused']
}

function getMustHaveElements(businessType: string): string[] {
  const elements: Record<string, string[]> = {
    'cafe': ['Menu display', 'Opening hours', 'Location map', 'Contact info', 'Social links'],
    'restaurant': ['Menu/Menu link', 'Booking widget', 'Opening hours', 'Location', 'Gallery'],
    'fitness': ['Class schedule', 'Pricing', 'Location', 'Trainer profiles', 'Contact form'],
    'beauty': ['Services list', 'Booking button', 'Gallery', 'Team profiles', 'Contact'],
    'legal': ['Services', 'Team credentials', 'Contact form', 'Location', 'Testimonials'],
    'construction': ['Services', 'Portfolio', 'Contact form', 'About/credentials', 'Testimonials'],
    'plumber': ['Services', 'Emergency contact', 'Service areas', 'Testimonials', 'Pricing info'],
    'cleaning': ['Services', 'Quote form', 'Service areas', 'Testimonials', 'Pricing'],
  }
  return elements[businessType.toLowerCase()] || ['Services', 'Contact', 'About', 'Location']
}
