/**
 * Shared Site Generation Logic
 *
 * This module contains the core site generation functionality that can be called
 * directly from any server-side code, avoiding the need for HTTP self-fetch.
 */

import Anthropic from '@anthropic-ai/sdk'
import { extractBrandProfile, ExtractionInput, BrandProfile } from '@/lib/extraction/brand-orchestrator'
import { createAdminClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

const anthropic = new Anthropic()

export interface GenerationInput {
  businessName: string
  businessType: string
  location: string
  website?: string
  instagram?: string
  facebook?: string
  competitorUrls?: string[]
  services?: string[]
  uniqueSellingPoints?: string[]
  targetCustomers?: string[]
  preferredColors?: string[]
  preferredTone?: string
  additionalNotes?: string
  phone?: string
  email?: string
  address?: string
  hours?: string
  logoUrl?: string
}

export interface GenerationResult {
  success: boolean
  html: string
  slug: string
  brandProfile: {
    colors: BrandProfile['colors']
    fonts: BrandProfile['fonts']
    layout: BrandProfile['layout']
    tone: BrandProfile['tone']
    sources: {
      colors: string
      fonts: string
      layout: string
      tone: string
    }
  }
  generationTime: number
  saved: boolean
}

/**
 * Generate a unique website and save it to the database
 * This is the core function that can be called directly from server code
 */
export async function generateAndSaveSite(input: GenerationInput): Promise<GenerationResult> {
  const startTime = Date.now()

  console.log('\n================================================')
  console.log('🚀 SITE GENERATION V3 - DATA DRIVEN')
  console.log(`Business: ${input.businessName}`)
  console.log(`Type: ${input.businessType}`)
  console.log(`USER PREFERENCES:`)
  console.log(`- Preferred Colors: ${JSON.stringify(input.preferredColors)}`)
  console.log(`- Preferred Tone: ${input.preferredTone}`)
  console.log('================================================\n')

  // STEP 1: Extract comprehensive brand profile
  console.log('📊 Step 1: Extracting brand profile...')
  const extractionInput: ExtractionInput = {
    businessName: input.businessName,
    businessType: input.businessType,
    location: input.location,
    existingWebsite: input.website,
    instagramUsername: input.instagram?.replace('@', ''),
    facebookUrl: input.facebook,
    competitorUrls: input.competitorUrls,
    services: input.services,
    uniqueSellingPoints: input.uniqueSellingPoints,
    targetCustomers: input.targetCustomers,
    preferredColors: input.preferredColors,
    preferredTone: input.preferredTone,
    additionalNotes: input.additionalNotes,
    phone: input.phone,
    email: input.email,
    address: input.address,
    hours: input.hours,
    logoUrl: input.logoUrl,
  }

  const brandProfile = await extractBrandProfile(extractionInput)
  console.log(`✅ Brand profile extracted (${Date.now() - startTime}ms)`)

  // STEP 2: Generate HTML using data-driven prompt
  console.log('🎨 Step 2: Generating unique website...')
  const html = await generateDataDrivenSite(brandProfile)
  console.log(`✅ Site generated (${Date.now() - startTime}ms)`)

  // STEP 3: Save HTML to database
  console.log('💾 Step 3: Saving to database...')
  const slug = slugify(input.businessName)
  const supabase = createAdminClient()

  const { error: updateError } = await supabase
    .from('client_sites')
    .update({ generated_html: html })
    .eq('slug', slug)

  let saved = false
  if (updateError) {
    console.error('Error saving HTML to database:', updateError)
  } else {
    console.log(`✅ Saved HTML to client_sites for slug: ${slug}`)
    saved = true
  }

  return {
    success: true,
    html,
    slug,
    brandProfile: {
      colors: brandProfile.colors,
      fonts: brandProfile.fonts,
      layout: brandProfile.layout,
      tone: brandProfile.tone,
      sources: {
        colors: brandProfile.colors.source,
        fonts: brandProfile.fonts.source,
        layout: brandProfile.layout.source,
        tone: brandProfile.tone.source,
      }
    },
    generationTime: Date.now() - startTime,
    saved,
  }
}

/**
 * Generate site using comprehensive brand profile
 */
async function generateDataDrivenSite(profile: BrandProfile): Promise<string> {
  const prompt = buildDataDrivenPrompt(profile)

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 16000,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  })

  const textContent = response.content.find(c => c.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in response')
  }

  // Extract HTML from response
  const html = extractHTML(textContent.text)
  return html
}

/**
 * Build the data-driven prompt - this is the key to unique sites
 */
function buildDataDrivenPrompt(profile: BrandProfile): string {
  // Build comprehensive context from all data sources
  const colorContext = buildColorContext(profile)
  const fontContext = buildFontContext(profile)
  const layoutContext = buildLayoutContext(profile)
  const toneContext = buildToneContext(profile)
  const contentContext = buildContentContext(profile)
  const imageContext = buildImageContext(profile)

  return `You are an expert web designer creating a unique, high-quality website.

## CRITICAL INSTRUCTIONS

You MUST create a website that is UNIQUE to this business based on the detailed brand profile below.
DO NOT use generic templates. Every design decision should reflect the specific data provided.

The design should look like it was custom-built by a professional agency, not a template.

## BRAND PROFILE

### Business Identity
- Name: ${profile.businessName}
- Type: ${profile.businessType}
- Location: ${profile.location}

### Color Palette (Source: ${profile.colors.source})
${colorContext}

### Typography (Source: ${profile.fonts.source})
${fontContext}

### Layout Style (Source: ${profile.layout.source})
${layoutContext}

### Brand Tone (Source: ${profile.tone.source})
${toneContext}

### Content
${contentContext}

### Images
${imageContext}

### Contact Information
- Phone: ${profile.contact.phone || 'Not provided'}
- Email: ${profile.contact.email || 'Not provided'}
- Address: ${profile.contact.address || 'Not provided'}
- Hours: ${profile.contact.hours || 'Not provided'}
${profile.contact.socialLinks.instagram ? `- Instagram: ${profile.contact.socialLinks.instagram}` : ''}
${profile.contact.socialLinks.facebook ? `- Facebook: ${profile.contact.socialLinks.facebook}` : ''}

### Industry Context
${profile.industryContext.mustHaveElements.length > 0 ? `Must-have elements: ${profile.industryContext.mustHaveElements.join(', ')}` : ''}
${profile.industryContext.commonPatterns.length > 0 ? `Industry patterns: ${profile.industryContext.commonPatterns.join(', ')}` : ''}
${profile.industryContext.differentiators.length > 0 ? `Differentiators to highlight: ${profile.industryContext.differentiators.join(', ')}` : ''}

## DESIGN REQUIREMENTS

1. **Unique Visual Identity**: Use the EXACT colors, fonts, and layout style from the brand profile
2. **Responsive Design**: Must work on all devices
3. **Professional Quality**: Clean, modern, polished appearance
4. **Brand-Aligned Content**: All copy should match the tone (${profile.tone.overall}, ${profile.tone.copyStyle})
5. **Performance**: Keep file size reasonable, optimize images
6. **CRITICAL - NO EMOJIS**: Do NOT use any emoji characters anywhere in the design. Use Font Awesome icons (via CDN) or simple SVG icons instead. This is a B2B professional website - emojis are not appropriate.

## SECTIONS TO INCLUDE

Based on the business type (${profile.businessType}), include these sections:
${getSectionsForBusinessType(profile.businessType, profile)}

## OUTPUT FORMAT

Return ONLY the complete HTML document. No explanations, no markdown code blocks.
The HTML should be self-contained with all CSS inline in a <style> tag.
Include the exact colors, fonts, and layout specified above.

Start with <!DOCTYPE html> and end with </html>.`
}

function buildColorContext(profile: BrandProfile): string {
  return `Use these EXACT colors throughout the design:
- Primary: ${profile.colors.primary} (headings, buttons, key elements)
- Secondary: ${profile.colors.secondary} (accents, hover states)
- Accent: ${profile.colors.accent} (highlights, CTAs)
- Background: ${profile.colors.background} (page background)
- Text: ${profile.colors.text} (body text)

These colors were ${profile.colors.source === 'instagram' ? 'extracted from their Instagram branding' :
    profile.colors.source === 'website' ? 'extracted from their existing website' :
    profile.colors.source === 'competitors' ? 'identified as industry-appropriate from competitor analysis' :
    profile.colors.source === 'user' ? 'specifically requested by the client' :
    'selected as industry-appropriate defaults'}.`
}

function buildFontContext(profile: BrandProfile): string {
  return `Use these fonts:
- Headings: "${profile.fonts.heading}" (import from Google Fonts)
- Body text: "${profile.fonts.body}" (import from Google Fonts)
${profile.fonts.accent ? `- Accent text: "${profile.fonts.accent}"` : ''}

These fonts were ${profile.fonts.source === 'website' ? 'extracted from their existing website to maintain brand consistency' :
    profile.fonts.source === 'competitors' ? 'identified as effective in this industry' :
    'selected as industry-appropriate defaults'}.`
}

function buildLayoutContext(profile: BrandProfile): string {
  const heroDescriptions: Record<string, string> = {
    'full-bleed': 'Full-screen hero image that covers the entire viewport with overlaid text',
    'split': 'Hero section split 50/50 with content on one side and image on the other',
    'minimal': 'Clean, text-focused hero with minimal imagery and lots of whitespace',
    'centered': 'Centered content hero with image below or as subtle background',
    'asymmetric': 'Creative asymmetric layout with offset elements and dynamic composition',
  }

  const navDescriptions: Record<string, string> = {
    'fixed': 'Fixed navigation bar that stays at top when scrolling',
    'hidden': 'Hidden hamburger menu navigation for clean look',
    'transparent': 'Transparent navigation that becomes solid on scroll',
    'simple': 'Simple, minimal navigation with essential links only',
  }

  return `Create a ${profile.layout.heroStyle} hero layout:
${heroDescriptions[profile.layout.heroStyle]}

Navigation style: ${navDescriptions[profile.layout.navigationStyle]}
Section density: ${profile.layout.sectionDensity} (${profile.layout.sectionDensity === 'spacious' ? 'lots of whitespace between sections' : profile.layout.sectionDensity === 'compact' ? 'tighter spacing, more content visible' : 'balanced spacing'})
Image style: ${profile.layout.imageStyle}

This layout was ${profile.layout.source === 'website' ? 'inspired by their existing website structure' :
    profile.layout.source === 'competitors' ? 'identified as effective in this industry' :
    'selected as appropriate for this business type'}.`
}

function buildToneContext(profile: BrandProfile): string {
  const toneDescriptions: Record<string, string> = {
    'professional': 'Confident, trustworthy, expert language',
    'casual': 'Friendly, approachable, relaxed language',
    'luxurious': 'Sophisticated, exclusive, refined language',
    'fun': 'Playful, energetic, exciting language',
    'minimal': 'Simple, direct, clean language',
    'warm': 'Welcoming, caring, personal language',
    'bold': 'Strong, confident, impactful language',
    'elegant': 'Graceful, refined, tasteful language',
  }

  const copyDescriptions: Record<string, string> = {
    'formal': 'Professional, structured sentences',
    'conversational': 'Natural, friendly dialogue style',
    'direct': 'Short, punchy, action-oriented',
    'storytelling': 'Narrative, emotional, engaging',
  }

  return `Overall tone: ${profile.tone.overall} - ${toneDescriptions[profile.tone.overall]}
Copy style: ${profile.tone.copyStyle} - ${copyDescriptions[profile.tone.copyStyle]}

Write all website copy in this voice. The tone should feel authentic to the brand.`
}

function buildContentContext(profile: BrandProfile): string {
  return `
### Headline & Tagline
${profile.content.headline ? `Suggested headline: "${profile.content.headline}"` : 'Create a compelling headline that captures the business essence'}
${profile.content.tagline ? `Suggested tagline: "${profile.content.tagline}"` : 'Create a memorable tagline'}

### Services (feature these prominently)
${profile.content.services.map(s => `- ${s}`).join('\n')}

### Unique Selling Points (highlight these)
${profile.content.uniqueSellingPoints.map(u => `- ${u}`).join('\n')}

### Trust Signals (include these for credibility)
${profile.content.trustSignals.map(t => `- ${t}`).join('\n')}

### Primary Call-to-Action
"${profile.content.callToAction}"

${profile.content.aboutSnippet ? `### About Text (use or adapt this)\n${profile.content.aboutSnippet}` : ''}`
}

function buildImageContext(profile: BrandProfile): string {
  const imageUrls: string[] = []

  // Add hero image if available
  if (profile.images.hero) {
    imageUrls.push(`Hero image: ${profile.images.hero}`)
  }

  // Add logo if available
  if (profile.images.logo) {
    imageUrls.push(`Logo: ${profile.images.logo}`)
  }

  // Add gallery images
  if (profile.images.gallery.length > 0) {
    imageUrls.push(`\nGallery images (use for portfolio/about/gallery sections):`)
    profile.images.gallery.slice(0, 6).forEach((url, i) => {
      imageUrls.push(`${i + 1}. ${url}`)
    })
  }

  // If no images from data, provide stock image guidance
  if (profile.images.source === 'stock' || imageUrls.length === 0) {
    return `No brand images available. Use these high-quality Unsplash images:
${getStockImagesForBusiness(profile.businessType)}

IMPORTANT: Use real Unsplash image URLs, not placeholders.`
  }

  return `Images from ${profile.images.source}:
${imageUrls.join('\n')}

Use these actual images in the design where appropriate.`
}

function getSectionsForBusinessType(businessType: string, profile: BrandProfile): string {
  const baseSections = `
1. **Hero Section** - First impression with headline, tagline, and primary CTA
2. **About Section** - Brief introduction to the business
3. **Services Section** - Showcase key services with icons/images
4. **Trust/Social Proof Section** - Trust signals, testimonials, or credentials
5. **Contact Section** - Contact form, details, and social links
6. **Footer** - Navigation, contact info, social links`

  const typeSpecific: Record<string, string> = {
    'cafe': `
Also include:
- **Menu Preview** - Highlight popular items or categories
- **Opening Hours** - Prominently displayed
- **Gallery** - Food/atmosphere photos from Instagram if available`,

    'restaurant': `
Also include:
- **Menu Section** - Menu preview or link to full menu
- **Reservation CTA** - Booking button prominently placed
- **Gallery** - Food/ambiance images
- **Chef/Story Section** - If they have a unique story`,

    'fitness': `
Also include:
- **Classes/Programs** - Class schedule or program overview
- **Trainers Section** - Team profiles if available
- **Membership Options** - Pricing tiers or membership info
- **Transformation Gallery** - Before/after or action shots`,

    'beauty': `
Also include:
- **Services Menu** - Detailed service list with descriptions
- **Booking CTA** - Prominent "Book Now" throughout
- **Team Section** - Stylist/therapist profiles
- **Gallery** - Portfolio of work from Instagram`,

    'legal': `
Also include:
- **Practice Areas** - Detailed service explanations
- **Team Section** - Lawyer profiles with credentials
- **Case Studies/Results** - If available
- **FAQ Section** - Common questions`,

    'construction': `
Also include:
- **Portfolio Section** - Project gallery
- **Process Section** - How they work
- **Credentials** - Licenses, insurance, certifications
- **Quote CTA** - Free quote form prominently placed`,

    'plumber': `
Also include:
- **Emergency Banner** - 24/7 service prominently displayed
- **Service Areas** - Where they operate
- **Pricing Info** - Transparent pricing or quote option
- **Emergency CTA** - Call now button always visible`,

    'cleaning': `
Also include:
- **Service Types** - Detailed service breakdown
- **Quote Form** - Get a quote CTA prominent
- **Service Areas** - Coverage map or list
- **Checklist/Standards** - What's included`,

    'photographer': `
Also include:
- **Portfolio Gallery** - Showcase best work prominently
- **Services/Packages** - Photography packages offered
- **About/Story** - Photographer's background and style
- **Booking CTA** - Easy contact for inquiries`,
  }

  const additional = typeSpecific[businessType.toLowerCase()] || ''

  return baseSections + additional
}

function getStockImagesForBusiness(businessType: string): string {
  const stockImages: Record<string, string> = {
    'cafe': `- Hero: https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80
- About: https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80
- Gallery 1: https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80
- Gallery 2: https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&q=80`,

    'restaurant': `- Hero: https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80
- About: https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80
- Gallery 1: https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80
- Gallery 2: https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80`,

    'fitness': `- Hero: https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80
- About: https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80
- Gallery 1: https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80
- Gallery 2: https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80`,

    'beauty': `- Hero: https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80
- About: https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80
- Gallery 1: https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80
- Gallery 2: https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80`,

    'legal': `- Hero: https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80
- About: https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&q=80
- Team: https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80`,

    'construction': `- Hero: https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80
- About: https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80
- Portfolio 1: https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80
- Portfolio 2: https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80`,

    'plumber': `- Hero: https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80
- About: https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80
- Service: https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80`,

    'cleaning': `- Hero: https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80
- About: https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&q=80
- Service: https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80`,

    'photographer': `- Hero: https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=80
- About: https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80
- Portfolio 1: https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80
- Portfolio 2: https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80`,
  }

  return stockImages[businessType.toLowerCase()] || `- Hero: https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80
- About: https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80`
}

function extractHTML(text: string): string {
  // Try to extract HTML from response
  let html = text

  // Remove markdown code blocks if present
  const codeBlockMatch = html.match(/```(?:html)?\s*([\s\S]*?)```/)
  if (codeBlockMatch) {
    html = codeBlockMatch[1]
  }

  // Ensure it starts with DOCTYPE
  if (!html.trim().toLowerCase().startsWith('<!doctype')) {
    const doctypeIndex = html.toLowerCase().indexOf('<!doctype')
    if (doctypeIndex !== -1) {
      html = html.substring(doctypeIndex)
    }
  }

  // Ensure it ends with </html>
  const htmlEndIndex = html.toLowerCase().lastIndexOf('</html>')
  if (htmlEndIndex !== -1) {
    html = html.substring(0, htmlEndIndex + 7)
  }

  return html.trim()
}
