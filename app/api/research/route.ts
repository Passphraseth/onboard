import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Allow up to 60 seconds for research

interface CompetitorData {
  name: string
  url: string
  description?: string
  colors?: string[]
  services?: string[]
  trustSignals?: string[]
  tone?: string
}

interface ResearchResult {
  query: string
  competitors: CompetitorData[]
  insights: {
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
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessType, location, services } = body

    if (!businessType || !location) {
      return NextResponse.json(
        { error: 'Business type and location are required' },
        { status: 400 }
      )
    }

    // Build search query
    const searchQuery = `${businessType} ${location}`

    console.log(`Researching: ${searchQuery}`)

    // Search for competitors using Google Custom Search or scraping
    // For now, we'll use a simulated research process that would be replaced
    // with actual web scraping in production

    const competitors = await searchCompetitors(searchQuery, businessType, location)
    const insights = analyzeCompetitors(competitors, businessType)

    const result: ResearchResult = {
      query: searchQuery,
      competitors,
      insights,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Research error:', error)
    return NextResponse.json(
      { error: 'Failed to complete research' },
      { status: 500 }
    )
  }
}

async function searchCompetitors(
  query: string,
  businessType: string,
  location: string
): Promise<CompetitorData[]> {
  // Try to get real competitor data from Google
  const serpApiKey = process.env.SERP_API_KEY

  if (serpApiKey) {
    try {
      // Search Google for competitors in the area
      const searchQuery = `${businessType} ${location} Australia`
      const serpResponse = await fetch(
        `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(searchQuery)}&location=Australia&api_key=${serpApiKey}&num=5`
      )

      if (serpResponse.ok) {
        const serpData = await serpResponse.json()
        const organicResults = serpData.organic_results || []

        if (organicResults.length > 0) {
          console.log(`Found ${organicResults.length} competitors for "${searchQuery}"`)

          // Extract competitor data from search results
          const competitors: CompetitorData[] = organicResults.slice(0, 5).map((result: any) => ({
            name: result.title?.split('|')[0]?.split('-')[0]?.trim() || 'Competitor',
            url: result.link,
            description: result.snippet,
            // We'll enrich these with defaults since we can't scrape full sites easily
            services: extractServicesFromSnippet(result.snippet, businessType),
            trustSignals: extractTrustSignalsFromSnippet(result.snippet),
          }))

          // Merge with industry defaults for missing data
          const industryData = getIndustryDefaults(businessType.toLowerCase())
          return competitors.map(comp => ({
            ...comp,
            colors: industryData.commonColors,
            trustSignals: comp.trustSignals?.length ? comp.trustSignals : industryData.trustSignals,
            tone: industryData.tone,
            services: comp.services?.length ? comp.services : industryData.competitors[0]?.services,
          }))
        }
      }
    } catch (error) {
      console.error('SerpAPI search failed:', error)
    }
  }

  // Fallback to industry defaults if no API key or search failed
  console.log('Using industry defaults (no SERP_API_KEY or search failed)')
  const industryData = getIndustryDefaults(businessType.toLowerCase())

  return industryData.competitors.map(comp => ({
    ...comp,
    colors: industryData.commonColors,
    trustSignals: industryData.trustSignals,
    tone: industryData.tone,
  }))
}

// Extract services mentioned in search snippets
function extractServicesFromSnippet(snippet: string, businessType: string): string[] {
  if (!snippet) return []

  const services: string[] = []
  const lowerSnippet = snippet.toLowerCase()

  // Common service patterns by industry
  const servicePatterns: Record<string, string[]> = {
    cafe: ['coffee', 'breakfast', 'lunch', 'brunch', 'catering', 'takeaway', 'dine in', 'pastries', 'cakes'],
    legal: ['conveyancing', 'family law', 'wills', 'estates', 'property', 'commercial', 'litigation', 'immigration'],
    fitness: ['personal training', 'group classes', 'yoga', 'pilates', 'weights', 'cardio', 'crossfit', 'boxing'],
    plumber: ['emergency', 'blocked drains', 'hot water', 'gas fitting', 'leak detection', 'renovations', 'maintenance'],
    beauty: ['facials', 'waxing', 'nails', 'lashes', 'brows', 'massage', 'skin', 'treatments'],
    construction: ['fitouts', 'renovations', 'commercial', 'residential', 'project management', 'design'],
  }

  const patterns = servicePatterns[businessType.toLowerCase()] || []
  patterns.forEach(pattern => {
    if (lowerSnippet.includes(pattern)) {
      services.push(pattern.charAt(0).toUpperCase() + pattern.slice(1))
    }
  })

  return services
}

// Extract trust signals from search snippets
function extractTrustSignalsFromSnippet(snippet: string): string[] {
  if (!snippet) return []

  const signals: string[] = []
  const lowerSnippet = snippet.toLowerCase()

  const trustPatterns = [
    { pattern: /(\d+)\+?\s*years?/i, signal: 'Years Experience' },
    { pattern: /licensed/i, signal: 'Licensed' },
    { pattern: /insured/i, signal: 'Fully Insured' },
    { pattern: /free quote/i, signal: 'Free Quotes' },
    { pattern: /24.?7|emergency/i, signal: '24/7 Available' },
    { pattern: /award/i, signal: 'Award Winning' },
    { pattern: /family.?owned|local/i, signal: 'Locally Owned' },
    { pattern: /satisfaction|guarantee/i, signal: 'Satisfaction Guaranteed' },
  ]

  trustPatterns.forEach(({ pattern, signal }) => {
    if (pattern.test(lowerSnippet)) {
      signals.push(signal)
    }
  })

  return signals
}

function analyzeCompetitors(
  competitors: CompetitorData[],
  businessType: string
): ResearchResult['insights'] {
  const industryData = getIndustryDefaults(businessType.toLowerCase())

  // Aggregate common patterns from competitors
  const allServices = competitors.flatMap(c => c.services || [])
  const allTrustSignals = competitors.flatMap(c => c.trustSignals || [])

  // Count frequency and get top items
  const serviceFreq = countFrequency(allServices)
  const trustFreq = countFrequency(allTrustSignals)

  return {
    commonServices: Object.keys(serviceFreq).slice(0, 8),
    commonTrustSignals: Object.keys(trustFreq).slice(0, 6),
    suggestedColors: industryData.suggestedColors,
    suggestedTone: industryData.tone,
    layoutRecommendation: industryData.layoutRecommendation,
  }
}

function countFrequency(arr: string[]): Record<string, number> {
  return arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

interface IndustryDefaults {
  competitors: CompetitorData[]
  commonColors: string[]
  suggestedColors: { primary: string; accent: string; background: string }
  trustSignals: string[]
  tone: string
  layoutRecommendation: string
}

function getIndustryDefaults(businessType: string): IndustryDefaults {
  // Construction / Fitouts / Building
  if (businessType.match(/fitout|construction|build|renovation|carpenter|joinery/i)) {
    return {
      competitors: [
        { name: 'Competitor A', url: '#', services: ['Office Fitouts', 'Retail Fitouts', 'Make Goods', 'Project Management', 'Design & Planning', 'Custom Joinery'] },
        { name: 'Competitor B', url: '#', services: ['Commercial Fitouts', 'Industrial Fitouts', 'Refurbishment', 'Workspace Design'] },
        { name: 'Competitor C', url: '#', services: ['Office Design', 'Shop Fitouts', 'Restaurant Fitouts', 'Medical Fitouts'] },
      ],
      commonColors: ['#1a1a1a', '#c5a572', '#2d2d2d'],
      suggestedColors: { primary: '#1a1a1a', accent: '#c5a572', background: '#ffffff' },
      trustSignals: ['Licensed Builder', 'Fully Insured', 'Fixed Price Quotes', 'Free Consultation', 'Project Managed', '15+ Years Experience'],
      tone: 'professional',
      layoutRecommendation: 'full-hero',
    }
  }

  // Plumbing / Electrical / Trades
  if (businessType.match(/plumb|electric|hvac|air condition|trade/i)) {
    return {
      competitors: [
        { name: 'Competitor A', url: '#', services: ['Emergency Repairs', 'Hot Water Systems', 'Blocked Drains', 'Gas Fitting', 'Bathroom Renovations'] },
        { name: 'Competitor B', url: '#', services: ['24/7 Emergency', 'Leak Detection', 'Pipe Relining', 'Commercial Plumbing'] },
        { name: 'Competitor C', url: '#', services: ['Residential Plumbing', 'Maintenance', 'New Installations', 'Repairs'] },
      ],
      commonColors: ['#1e3a5f', '#f59e0b', '#1a1a1a'],
      suggestedColors: { primary: '#1e3a5f', accent: '#f59e0b', background: '#ffffff' },
      trustSignals: ['Licensed & Insured', '24/7 Emergency', 'Same Day Service', 'Upfront Pricing', 'Satisfaction Guaranteed', 'Local Business'],
      tone: 'reliable',
      layoutRecommendation: 'split-hero',
    }
  }

  // Beauty / Wellness / Salon
  if (businessType.match(/beauty|salon|hair|spa|wellness|massage|skin|cosmetic/i)) {
    return {
      competitors: [
        { name: 'Competitor A', url: '#', services: ['Hair Styling', 'Colour', 'Balayage', 'Extensions', 'Treatments'] },
        { name: 'Competitor B', url: '#', services: ['Facials', 'Waxing', 'Nails', 'Lashes', 'Brows'] },
        { name: 'Competitor C', url: '#', services: ['Massage', 'Body Treatments', 'Packages', 'Bridal'] },
      ],
      commonColors: ['#2d2d2d', '#d4a574', '#f5f0eb'],
      suggestedColors: { primary: '#2d2d2d', accent: '#d4a574', background: '#faf8f5' },
      trustSignals: ['Award Winning', 'Experienced Stylists', 'Premium Products', 'Online Booking', 'Gift Vouchers Available'],
      tone: 'elegant',
      layoutRecommendation: 'minimal-hero',
    }
  }

  // Food / Hospitality / Restaurant / Cafe
  if (businessType.match(/restaurant|cafe|food|catering|hospitality|bar|bistro/i)) {
    return {
      competitors: [
        { name: 'Competitor A', url: '#', services: ['Dine In', 'Takeaway', 'Catering', 'Private Events', 'Functions'] },
        { name: 'Competitor B', url: '#', services: ['Breakfast', 'Lunch', 'Dinner', 'Coffee', 'Desserts'] },
        { name: 'Competitor C', url: '#', services: ['A La Carte', 'Set Menu', 'Wine List', 'Cocktails'] },
      ],
      commonColors: ['#3d3d3d', '#c4784a', '#f5f0eb'],
      suggestedColors: { primary: '#3d3d3d', accent: '#c4784a', background: '#fffbf5' },
      trustSignals: ['Fresh Local Produce', 'Award Winning Chef', 'BYO Available', 'Vegetarian Options', 'Gluten Free Options'],
      tone: 'warm',
      layoutRecommendation: 'full-hero',
    }
  }

  // Cleaning
  if (businessType.match(/clean|maid|domestic|commercial clean/i)) {
    return {
      competitors: [
        { name: 'Competitor A', url: '#', services: ['Residential Cleaning', 'Commercial Cleaning', 'End of Lease', 'Deep Cleaning', 'Regular Cleaning'] },
        { name: 'Competitor B', url: '#', services: ['Office Cleaning', 'Window Cleaning', 'Carpet Cleaning', 'Spring Cleaning'] },
        { name: 'Competitor C', url: '#', services: ['House Cleaning', 'Apartment Cleaning', 'Move Out Cleaning', 'One-Off Cleaning'] },
      ],
      commonColors: ['#1e88e5', '#4caf50', '#ffffff'],
      suggestedColors: { primary: '#1565c0', accent: '#4caf50', background: '#ffffff' },
      trustSignals: ['Insured & Bonded', 'Police Checked Staff', 'Eco-Friendly Products', 'Satisfaction Guaranteed', 'Free Quotes'],
      tone: 'trustworthy',
      layoutRecommendation: 'split-hero',
    }
  }

  // Legal / Accounting / Professional Services
  if (businessType.match(/lawyer|legal|law|accountant|accounting|financial|consult/i)) {
    return {
      competitors: [
        { name: 'Competitor A', url: '#', services: ['Tax Returns', 'Business Accounting', 'Bookkeeping', 'Financial Planning', 'SMSF'] },
        { name: 'Competitor B', url: '#', services: ['Family Law', 'Property Law', 'Wills & Estates', 'Commercial Law'] },
        { name: 'Competitor C', url: '#', services: ['Business Advisory', 'Tax Planning', 'Audit', 'Compliance'] },
      ],
      commonColors: ['#1e3a5f', '#94a3b8', '#f8fafc'],
      suggestedColors: { primary: '#1e3a5f', accent: '#94a3b8', background: '#f8fafc' },
      trustSignals: ['CPA Qualified', 'Registered Tax Agent', 'Confidential', 'Fixed Fee Options', '20+ Years Experience'],
      tone: 'corporate',
      layoutRecommendation: 'minimal-hero',
    }
  }

  // Default fallback
  return {
    competitors: [
      { name: 'Competitor A', url: '#', services: ['Service 1', 'Service 2', 'Service 3'] },
      { name: 'Competitor B', url: '#', services: ['Service 1', 'Service 2', 'Service 3'] },
    ],
    commonColors: ['#1a1a1a', '#6366f1', '#f5f5f5'],
    suggestedColors: { primary: '#1a1a1a', accent: '#6366f1', background: '#ffffff' },
    trustSignals: ['Fully Insured', 'Free Quotes', 'Local Business', 'Quality Guaranteed'],
    tone: 'professional',
    layoutRecommendation: 'split-hero',
  }
}
