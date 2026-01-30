/**
 * Website Analyzer - Extract design patterns from any URL
 * Extracts: colors, fonts, layout style, images, content patterns
 */

export interface WebsiteAnalysis {
  url: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    palette: string[] // All detected colors
  }
  fonts: {
    headings: string
    body: string
    detected: string[]
  }
  layout: {
    style: 'minimal' | 'bold' | 'corporate' | 'creative' | 'warm' | 'modern'
    hasHeroImage: boolean
    heroStyle: 'full-bleed' | 'split' | 'minimal' | 'video' | 'slider'
    navigationStyle: 'fixed' | 'static' | 'hamburger'
    sectionCount: number
  }
  content: {
    tagline?: string
    description?: string
    services: string[]
    trustSignals: string[]
    ctaText: string[]
  }
  images: {
    logo?: string
    hero?: string
    gallery: string[]
  }
  meta: {
    title: string
    description: string
  }
}

export interface CompetitorPatterns {
  commonColors: string[]
  commonFonts: string[]
  commonLayout: {
    heroStyle?: string
    navStyle?: string
    style?: WebsiteAnalysis['layout']['style']
  }
  trustSignals: string[]
  insights: string[]
  analyzedCount: number
}

/**
 * Analyze a website URL and extract design/content patterns
 */
export async function analyzeWebsite(url: string): Promise<WebsiteAnalysis | null> {
  try {
    // Normalize URL
    if (!url.startsWith('http')) {
      url = 'https://' + url.replace(/^www\./, '')
    }

    console.log(`Analyzing website: ${url}`)

    // Fetch the page HTML
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OnboardBot/1.0; +https://onboard.site)',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`)
      return null
    }

    const html = await response.text()

    // Extract all the design elements
    const colors = extractColors(html)
    const fonts = extractFonts(html)
    const layout = analyzeLayout(html)
    const content = extractContent(html)
    const images = extractImages(html, url)
    const meta = extractMeta(html)

    return {
      url,
      colors,
      fonts,
      layout,
      content,
      images,
      meta,
    }
  } catch (error) {
    console.error(`Error analyzing ${url}:`, error)
    return null
  }
}

/**
 * Extract color palette from CSS and inline styles
 */
function extractColors(html: string): WebsiteAnalysis['colors'] {
  const colorRegex = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g
  const rgbRegex = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/g
  const rgbaRegex = /rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*[\d.]+\)/g

  const colors: string[] = []

  // Extract hex colors
  let match
  while ((match = colorRegex.exec(html)) !== null) {
    const hex = match[0].toLowerCase()
    if (!colors.includes(hex)) {
      colors.push(hex)
    }
  }

  // Extract RGB colors and convert to hex
  while ((match = rgbRegex.exec(html)) !== null) {
    const hex = rgbToHex(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]))
    if (!colors.includes(hex)) {
      colors.push(hex)
    }
  }

  while ((match = rgbaRegex.exec(html)) !== null) {
    const hex = rgbToHex(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]))
    if (!colors.includes(hex)) {
      colors.push(hex)
    }
  }

  // Filter out common non-brand colors (pure black, white, grays)
  const brandColors = colors.filter(c => {
    const lower = c.toLowerCase()
    return !['#000000', '#ffffff', '#000', '#fff', '#333333', '#666666', '#999999', '#cccccc', '#f5f5f5', '#fafafa'].includes(lower)
  })

  // Analyze and categorize colors
  return categorizeColors(brandColors.length > 0 ? brandColors : colors)
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}

function categorizeColors(colors: string[]): WebsiteAnalysis['colors'] {
  // Sort colors by saturation/vibrancy to find primary/accent
  const analyzed = colors.map(hex => {
    const rgb = hexToRgb(hex)
    if (!rgb) return { hex, saturation: 0, lightness: 0 }
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    return { hex, saturation: hsl.s, lightness: hsl.l }
  })

  // Sort by saturation (more saturated = more likely to be brand color)
  analyzed.sort((a, b) => b.saturation - a.saturation)

  // Find darkest for text, lightest for background
  const byLightness = [...analyzed].sort((a, b) => a.lightness - b.lightness)
  const darkest = byLightness[0]?.hex || '#1a1a1a'
  const lightest = byLightness[byLightness.length - 1]?.hex || '#ffffff'

  return {
    primary: analyzed[0]?.hex || '#1a1a1a',
    secondary: analyzed[1]?.hex || analyzed[0]?.hex || '#666666',
    accent: analyzed.find(c => c.saturation > 0.5)?.hex || analyzed[0]?.hex || '#3b82f6',
    background: lightest,
    text: darkest,
    palette: colors.slice(0, 10),
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h, s, l }
}

/**
 * Extract font families from CSS
 */
function extractFonts(html: string): WebsiteAnalysis['fonts'] {
  const fontFamilyRegex = /font-family:\s*([^;}"']+)/gi
  const googleFontsRegex = /fonts\.googleapis\.com\/css2?\?family=([^"&]+)/gi

  const fonts: string[] = []

  // Extract from font-family declarations
  let match
  while ((match = fontFamilyRegex.exec(html)) !== null) {
    const fontList = match[1].split(',').map(f => f.trim().replace(/['"]/g, ''))
    fonts.push(...fontList)
  }

  // Extract from Google Fonts links
  while ((match = googleFontsRegex.exec(html)) !== null) {
    const fontNames = decodeURIComponent(match[1]).split('|').map(f => f.split(':')[0].replace(/\+/g, ' '))
    fonts.push(...fontNames)
  }

  // Dedupe and filter generic families
  const uniqueFonts = Array.from(new Set(fonts)).filter(
    f => !['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'inherit'].includes(f.toLowerCase())
  )

  // Guess headings vs body based on common patterns
  const headingKeywords = ['bold', 'display', 'heading', 'title']
  const headingFont = uniqueFonts.find(f => headingKeywords.some(k => f.toLowerCase().includes(k))) || uniqueFonts[0]
  const bodyFont = uniqueFonts.find(f => !headingKeywords.some(k => f.toLowerCase().includes(k))) || uniqueFonts[1] || uniqueFonts[0]

  return {
    headings: headingFont || 'Inter',
    body: bodyFont || 'Inter',
    detected: uniqueFonts.slice(0, 5),
  }
}

/**
 * Analyze layout patterns
 */
function analyzeLayout(html: string): WebsiteAnalysis['layout'] {
  const lowerHtml = html.toLowerCase()

  // Detect hero style
  let heroStyle: WebsiteAnalysis['layout']['heroStyle'] = 'minimal'
  if (lowerHtml.includes('hero') && lowerHtml.includes('video')) heroStyle = 'video'
  else if (lowerHtml.includes('slider') || lowerHtml.includes('carousel')) heroStyle = 'slider'
  else if (lowerHtml.includes('100vh') || lowerHtml.includes('full-height')) heroStyle = 'full-bleed'
  else if (lowerHtml.includes('split') || lowerHtml.includes('two-column')) heroStyle = 'split'

  // Detect navigation style
  let navigationStyle: WebsiteAnalysis['layout']['navigationStyle'] = 'static'
  if (lowerHtml.includes('fixed') && lowerHtml.includes('nav')) navigationStyle = 'fixed'
  if (lowerHtml.includes('hamburger') || lowerHtml.includes('mobile-menu')) navigationStyle = 'hamburger'

  // Count sections
  const sectionMatches = html.match(/<section/gi) || []
  const sectionCount = sectionMatches.length

  // Detect overall style
  let style: WebsiteAnalysis['layout']['style'] = 'modern'
  if (lowerHtml.includes('minimal') || sectionCount < 5) style = 'minimal'
  else if (lowerHtml.includes('bold') || lowerHtml.includes('vibrant')) style = 'bold'
  else if (lowerHtml.includes('corporate') || lowerHtml.includes('professional')) style = 'corporate'
  else if (lowerHtml.includes('creative') || lowerHtml.includes('portfolio')) style = 'creative'
  else if (lowerHtml.includes('warm') || lowerHtml.includes('friendly')) style = 'warm'

  return {
    style,
    hasHeroImage: lowerHtml.includes('hero') || lowerHtml.includes('banner'),
    heroStyle,
    navigationStyle,
    sectionCount,
  }
}

/**
 * Extract content patterns
 */
function extractContent(html: string): WebsiteAnalysis['content'] {
  // Extract tagline (usually in hero or h1/h2)
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
  const tagline = h1Match ? h1Match[1].trim() : undefined

  // Extract meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
  const description = descMatch ? descMatch[1].trim() : undefined

  // Extract services (look for list items, cards, etc.)
  const services: string[] = []
  const servicePatterns = [
    /<h3[^>]*>([^<]{3,50})<\/h3>/gi,
    /<strong[^>]*>([^<]{3,50})<\/strong>/gi,
  ]
  servicePatterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(html)) !== null && services.length < 10) {
      const text = match[1].trim()
      if (text.length > 3 && text.length < 50 && !services.includes(text)) {
        services.push(text)
      }
    }
  })

  // Extract trust signals
  const trustSignals: string[] = []
  const trustKeywords = ['years experience', 'licensed', 'insured', 'guarantee', 'award', 'certified', 'trusted', 'local']
  trustKeywords.forEach(keyword => {
    if (html.toLowerCase().includes(keyword)) {
      trustSignals.push(keyword.charAt(0).toUpperCase() + keyword.slice(1))
    }
  })

  // Extract CTAs
  const ctaText: string[] = []
  const ctaRegex = /<(?:button|a)[^>]*class[^>]*(?:btn|button|cta)[^>]*>([^<]+)</gi
  let match
  while ((match = ctaRegex.exec(html)) !== null && ctaText.length < 5) {
    const text = match[1].trim()
    if (text.length > 2 && text.length < 30) {
      ctaText.push(text)
    }
  }

  return {
    tagline,
    description,
    services: services.slice(0, 8),
    trustSignals,
    ctaText,
  }
}

/**
 * Extract images
 */
function extractImages(html: string, baseUrl: string): WebsiteAnalysis['images'] {
  const images: string[] = []

  // Extract image URLs
  const imgRegex = /<img[^>]*src=["']([^"']+)["']/gi
  let match
  while ((match = imgRegex.exec(html)) !== null && images.length < 20) {
    let src = match[1]
    // Make absolute URL
    if (src.startsWith('//')) src = 'https:' + src
    else if (src.startsWith('/')) {
      const urlObj = new URL(baseUrl)
      src = urlObj.origin + src
    } else if (!src.startsWith('http')) {
      continue // Skip data URIs and relative paths
    }
    if (!images.includes(src)) {
      images.push(src)
    }
  }

  // Try to identify logo
  const logoRegex = /<img[^>]*(?:class|id|alt)[^>]*logo[^>]*src=["']([^"']+)["']/i
  const logoMatch = logoRegex.exec(html)
  const logo = logoMatch ? logoMatch[1] : undefined

  // Try to identify hero image
  const heroRegex = /<img[^>]*(?:class|id)[^>]*hero[^>]*src=["']([^"']+)["']/i
  const heroMatch = heroRegex.exec(html)
  const hero = heroMatch ? heroMatch[1] : images[0]

  return {
    logo,
    hero,
    gallery: images.slice(0, 10),
  }
}

/**
 * Extract meta information
 */
function extractMeta(html: string): WebsiteAnalysis['meta'] {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i)
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)

  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    description: descMatch ? descMatch[1].trim() : '',
  }
}

/**
 * Analyze multiple competitor websites and find patterns
 */
export async function analyzeCompetitors(urls: string[]): Promise<CompetitorPatterns | null> {
  const analyses: WebsiteAnalysis[] = []

  // Analyze each URL (with concurrency limit)
  for (const url of urls.slice(0, 5)) {
    const analysis = await analyzeWebsite(url)
    if (analysis) {
      analyses.push(analysis)
    }
  }

  if (analyses.length === 0) {
    return null
  }

  // Find common patterns
  const allColors = analyses.flatMap(a => a.colors.palette)
  const allFonts = analyses.flatMap(a => a.fonts.detected)
  const allTrustSignals = analyses.flatMap(a => a.content.trustSignals)

  // Count frequencies
  const colorCounts = countFrequency(allColors)
  const fontCounts = countFrequency(allFonts)
  const trustCounts = countFrequency(allTrustSignals)

  // Find most common layout style
  const layoutCounts = countFrequency(analyses.map(a => a.layout.style))
  const heroCounts = countFrequency(analyses.map(a => a.layout.heroStyle))
  const navCounts = countFrequency(analyses.map(a => a.layout.navigationStyle))

  // Generate insights
  const insights: string[] = []
  if (analyses.length > 2) {
    insights.push(`Analyzed ${analyses.length} competitor websites`)
  }

  return {
    commonColors: Object.entries(colorCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([c]) => c),
    commonFonts: Object.entries(fontCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([f]) => f),
    commonLayout: {
      heroStyle: Object.entries(heroCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'full-bleed',
      navStyle: Object.entries(navCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'fixed',
      style: Object.entries(layoutCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as WebsiteAnalysis['layout']['style'] || 'modern',
    },
    trustSignals: Object.entries(trustCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([t]) => t),
    insights,
    analyzedCount: analyses.length,
  }
}

function countFrequency(arr: string[]): Record<string, number> {
  return arr.reduce((acc, item) => {
    const key = item.toLowerCase()
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}
