import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

interface BusinessData {
  businessName: string
  category: string
  suburb: string
  state: string
  phone: string
  email: string
  address?: string
  postcode?: string
  operatingHours?: Record<string, { open: string; close: string; closed: boolean }>
  instagram?: string
  facebook?: string
  website?: string
  services?: string[]
  customServices?: string
  targetCustomers?: string
  uniqueSellingPoints?: string
  additionalNotes?: string
}

function formatHours(hours?: Record<string, { open: string; close: string; closed: boolean }>): string {
  if (!hours) return 'Contact us for hours'

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const formatted: string[] = []

  days.forEach(day => {
    const h = hours[day]
    if (h) {
      if (h.closed) {
        formatted.push(`${day.charAt(0).toUpperCase() + day.slice(1)}: Closed`)
      } else {
        formatted.push(`${day.charAt(0).toUpperCase() + day.slice(1)}: ${h.open} - ${h.close}`)
      }
    }
  })

  return formatted.join(' | ')
}

function getAllServices(data: BusinessData): string[] {
  const services: string[] = [...(data.services || [])]
  if (data.customServices) {
    services.push(...data.customServices.split('\n').filter(s => s.trim()))
  }
  return services.length > 0 ? services : ['General Services']
}

function getBusinessType(data: BusinessData): string {
  const category = data.category?.toLowerCase() || ''
  const customServices = data.customServices?.toLowerCase() || ''
  const target = data.targetCustomers?.toLowerCase() || ''
  const name = data.businessName?.toLowerCase() || ''

  // Food & Beverage
  if (category.includes('cafe') || category.includes('coffee') || category.includes('restaurant') ||
      category.includes('food') || category.includes('bakery') || category.includes('bar') ||
      name.includes('cafe') || name.includes('coffee') || name.includes('bean')) {
    return 'cafe'
  }
  // Legal & Professional Services
  if (category.includes('law') || category.includes('legal') || category.includes('attorney') ||
      category.includes('solicitor') || category.includes('accountant') || category.includes('consulting')) {
    return 'legal'
  }
  // Fitness & Health
  if (category.includes('gym') || category.includes('fitness') || category.includes('yoga') ||
      category.includes('pilates') || category.includes('personal train') || category.includes('health')) {
    return 'fitness'
  }
  // Fashion & Retail
  if (category.includes('fashion') || customServices.includes('fashion') || target.includes('fashion') ||
      category.includes('clothing') || category.includes('boutique') || category.includes('retail')) {
    return 'fashion'
  }
  // Wedding & Events
  if (category.includes('wedding') || customServices.includes('wedding') || category.includes('event')) {
    return 'wedding'
  }
  // Beauty & Wellness
  if (category.includes('beauty') || category.includes('salon') || category.includes('spa') ||
      category.includes('hair') || category.includes('nail') || category.includes('massage')) {
    return 'beauty'
  }
  // Trades & Construction
  if (category.includes('plumb') || category.includes('electric') || category.includes('trade') ||
      category.includes('construction') || category.includes('builder') || category.includes('roofing')) {
    return 'trades'
  }
  // Photography & Creative
  if (category.includes('photo') || category.includes('video') || category.includes('creative') ||
      category.includes('design') || category.includes('art')) {
    return 'photography'
  }
  // Real Estate
  if (category.includes('real estate') || category.includes('property') || category.includes('realty')) {
    return 'realestate'
  }
  // Medical & Healthcare
  if (category.includes('medical') || category.includes('dental') || category.includes('clinic') ||
      category.includes('doctor') || category.includes('physio') || category.includes('chiro')) {
    return 'medical'
  }
  // Automotive
  if (category.includes('auto') || category.includes('car') || category.includes('mechanic') ||
      category.includes('detailing') || category.includes('motor')) {
    return 'automotive'
  }
  return 'business'
}

// Industry-specific image mapping for high-quality, relevant visuals
function getIndustryImages(businessType: string): { hero: string; about: string; gallery?: string[] } {
  const imageMap: Record<string, { hero: string; about: string; gallery?: string[] }> = {
    cafe: {
      hero: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80', // Warm cafe interior
      about: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80', // Coffee being made
      gallery: [
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80', // Coffee cup
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80', // Cafe atmosphere
      ]
    },
    legal: {
      hero: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80', // Law books/scales
      about: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', // Professional meeting
      gallery: [
        'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&q=80', // Courthouse
      ]
    },
    fitness: {
      hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80', // Modern gym
      about: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80', // Training session
      gallery: [
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80', // Weights
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', // Group fitness
      ]
    },
    fashion: {
      hero: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80', // Fashion store
      about: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', // Clothing rack
    },
    wedding: {
      hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80', // Wedding venue
      about: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', // Wedding details
    },
    beauty: {
      hero: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80', // Salon interior
      about: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', // Beauty treatment
    },
    trades: {
      hero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80', // Construction/trade work
      about: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80', // Tradesperson working
    },
    photography: {
      hero: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&q=80', // Camera/photography
      about: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80', // Photo studio
    },
    realestate: {
      hero: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80', // Luxury home
      about: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80', // Property interior
    },
    medical: {
      hero: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80', // Medical facility
      about: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80', // Doctor consultation
    },
    automotive: {
      hero: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80', // Car/automotive
      about: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80', // Mechanic working
    },
    business: {
      hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80', // Modern office
      about: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80', // Team meeting
    }
  }

  return imageMap[businessType] || imageMap.business
}

// Research insights type
interface ResearchInsights {
  commonServices: string[]
  commonTrustSignals: string[]
  suggestedColors: { primary: string; accent: string; background: string }
  suggestedTone: string
  layoutRecommendation: string
  competitors?: Array<{ name: string; url: string; description?: string }>
}

// Fetch competitor research for informed site generation
async function fetchResearchInsights(
  businessType: string,
  location: string,
  services: string[]
): Promise<ResearchInsights | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/research`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessType, location, services }),
    })

    if (response.ok) {
      const data = await response.json()
      console.log(`Research completed for ${businessType} in ${location}`)
      return data.insights
    }
  } catch (error) {
    console.error('Research fetch failed:', error)
  }
  return null
}

async function generateWithClaude(data: BusinessData, research?: ResearchInsights | null): Promise<string> {
  const client = new Anthropic()

  const services = getAllServices(data)
  const businessType = getBusinessType(data)
  const hours = formatHours(data.operatingHours)
  const images = getIndustryImages(businessType)

  // Build research context if available
  const researchContext = research ? `
=== COMPETITOR RESEARCH INSIGHTS ===
Based on analysis of competitors in ${data.suburb}:

**WHAT COMPETITORS EMPHASIZE:**
- Common services: ${research.commonServices.slice(0, 6).join(', ')}
- Trust signals that work: ${research.commonTrustSignals.slice(0, 5).join(', ')}

**RECOMMENDED APPROACH:**
- Tone: ${research.suggestedTone} (based on what resonates in this market)
- Layout: ${research.layoutRecommendation}
- Make sure to differentiate from competitors while matching professional standards

USE THESE INSIGHTS to create a site that will compete effectively in this market.
` : ''

  const prompt = `Create a minimal, architectural-style landing page for a ${businessType.toUpperCase()} business. The design should feel authentic to the ${data.category} industry while maintaining a luxury aesthetic.
${researchContext}

BUSINESS:
- Name: ${data.businessName}
- Industry: ${data.category}
- Location: ${data.suburb}, ${data.state}
- Phone: ${data.phone}
- Email: ${data.email}
${data.address ? `- Address: ${data.address}` : ''}
- Hours: ${hours}
${data.instagram ? `- Instagram: @${data.instagram}` : ''}
${data.facebook ? `- Facebook: ${data.facebook}` : ''}

SERVICES: ${services.join(', ')}

=== DESIGN SYSTEM (FOLLOW EXACTLY) ===

**TYPOGRAPHY - CRITICAL:**
- Google Font: Inter only
- Logo/Brand: font-weight: 200, letter-spacing: 0.3em, text-transform: uppercase
- Section labels: font-weight: 400, font-size: 0.75rem, letter-spacing: 0.2em, text-transform: uppercase, color: #888
- Headings: font-weight: 300, font-size: 2.5rem (desktop), normal case
- Body: font-weight: 300, font-size: 1rem, line-height: 1.8, color: #555
- Buttons: font-weight: 400, font-size: 0.8rem, letter-spacing: 0.15em, text-transform: uppercase

**COLORS - STRICT PALETTE:**
- Background: #ffffff
- Text primary: #1a1a1a
- Text secondary: #666666
- Text muted: #999999
- Borders: #e5e5e5
- Dark sections: #1a1a1a (background), #ffffff (text)
- NO other colors. NO gradients. NO colored accents.

**COMPONENTS:**
- Buttons: border: 1px solid currentColor, background: transparent, padding: 16px 32px
- Cards: border: 1px solid #e5e5e5, NO shadows, NO border-radius
- Icons: Use simple SVG line icons, stroke-width: 1.5, color: #999

**NAVIGATION:**
- Fixed top, background: white, border-bottom: 1px solid #e5e5e5
- Logo left (letter-spaced uppercase), links right
- Links: font-weight: 400, no underline, subtle hover
- CTA button: outline style with border

**HERO SECTION:**
- Full viewport height (100vh)
- Full-bleed background image with subtle dark overlay (rgba(0,0,0,0.3))
- Centered content: Logo large, tagline below, location below that
- Two buttons: "EXPLORE SERVICES" (outline white) and "GET A QUOTE" (filled white, dark text)
- Use this image: ${images.hero}

**SERVICES SECTION:**
- White background, generous padding (120px vertical)
- Label above: "WHAT WE DO"
- Heading: "Our Services"
- 4-column grid of cards (3 on tablet, 1 on mobile)
- Each card: thin border, SVG icon at top, title, short description, "LEARN MORE →" link
- NO hover effects, NO shadows

**STATS SECTION:**
- Dark background (#1a1a1a), white text
- 4 stats in a row: numbers large (font-weight: 200, font-size: 3rem), labels small below
- Example: "15+" / "Years Experience"

**ABOUT SECTION:**
- Two columns: text left, image right
- Label: "ABOUT ${data.businessName.toUpperCase()}"
- Clean heading, 2 paragraphs of text
- "DISCOVER MORE →" link
- Image with small overlapping stat badge

**CONTACT SECTION:**
- Dark background
- Label: "GET IN TOUCH"
- Two columns: contact info left, simple form right
- Form: minimal inputs with bottom-border only, white submit button

**FOOTER:**
- Dark background, minimal
- Logo, nav links, copyright in one row

**IMAGES:**
- Hero: ${images.hero}
- About: ${images.about}
- IMPORTANT: These images are specifically selected for a ${businessType} business. Use them as provided.

**TECHNICAL:**
- Single HTML file with embedded CSS
- Mobile responsive with clean breakpoints
- Smooth scroll: html { scroll-behavior: smooth }
- Transitions: all 0.3s ease

CRITICAL: Return ONLY valid HTML. No markdown, no explanations. The design must feel expensive through restraint and typography, not through effects or colors.`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 32000,
    messages: [{ role: 'user', content: prompt }]
  })

  const content = response.content[0]
  if (content.type === 'text') {
    let html = content.text
    // Clean up if wrapped in code blocks
    html = html.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '')
    return html
  }

  throw new Error('No text response from Claude')
}

function generateFallbackHTML(data: BusinessData): string {
  const services = getAllServices(data)
  const businessType = getBusinessType(data)
  const hours = formatHours(data.operatingHours)
  const images = getIndustryImages(businessType)

  // Style based on business type
  const isFashion = businessType === 'fashion'
  const primaryColor = isFashion ? '#000000' : '#2563eb'
  const accentColor = isFashion ? '#ffffff' : '#d4ff00'
  const fontFamily = isFashion ? "'Bebas Neue', sans-serif" : "'Inter', sans-serif"

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.businessName} | ${data.suburb}</title>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: ${fontFamily}; line-height: 1.6; color: #1a1a1a; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

    /* Hero */
    .hero {
      background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${images.hero}');
      background-size: cover;
      background-position: center;
      color: white;
      padding: 120px 24px;
      min-height: 80vh;
      display: flex;
      align-items: center;
      text-align: ${isFashion ? 'left' : 'center'};
    }
    .hero h1 {
      font-size: ${isFashion ? '5rem' : '3rem'};
      font-weight: 900;
      margin-bottom: 16px;
      ${isFashion ? 'text-transform: uppercase; letter-spacing: 0.1em;' : ''}
    }
    .hero p { font-size: 1.25rem; opacity: 0.9; max-width: 600px; ${isFashion ? '' : 'margin: 0 auto;'} }
    .hero-cta {
      margin-top: 32px;
      display: inline-block;
      background: ${accentColor};
      color: ${isFashion ? '#000' : '#0f172a'};
      padding: 16px 32px;
      font-weight: 700;
      text-decoration: none;
      ${isFashion ? 'text-transform: uppercase; letter-spacing: 0.1em;' : 'border-radius: 8px;'}
    }

    /* Services */
    .services { padding: 80px 24px; background: ${isFashion ? '#fff' : '#f9fafb'}; }
    .services h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 48px;
      ${isFashion ? 'text-transform: uppercase; letter-spacing: 0.1em;' : ''}
    }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      max-width: 1000px;
      margin: 0 auto;
    }
    .service-card {
      background: white;
      padding: 32px;
      ${isFashion ? 'border: 1px solid #000;' : 'border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);'}
    }
    .service-card h3 { margin-bottom: 12px; }
    .service-card p { color: #666; font-size: 0.95rem; }

    /* Contact */
    .contact { padding: 80px 24px; background: ${isFashion ? '#000' : primaryColor}; color: white; }
    .contact h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 48px;
      ${isFashion ? 'text-transform: uppercase; letter-spacing: 0.1em;' : ''}
    }
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
      max-width: 800px;
      margin: 0 auto;
    }
    .contact-item { display: flex; align-items: center; gap: 16px; }
    .contact-icon { font-size: 1.5rem; }
    .contact-item a { color: white; text-decoration: none; }
    .contact-item a:hover { text-decoration: underline; }

    /* Footer */
    footer { background: #0f172a; color: white; padding: 32px 24px; text-align: center; }
    footer p { opacity: 0.7; font-size: 0.9rem; }

    @media (max-width: 768px) {
      .hero h1 { font-size: ${isFashion ? '3rem' : '2rem'}; }
      .hero { padding: 80px 24px; }
    }
  </style>
</head>
<body>
  <section class="hero">
    <div class="container">
      <h1>${data.businessName}</h1>
      <p>${data.targetCustomers ? `Serving ${data.targetCustomers} in ${data.suburb}` : `Professional ${data.category} services in ${data.suburb}`}</p>
      <a href="tel:${data.phone}" class="hero-cta">Call ${data.phone}</a>
    </div>
  </section>

  <section class="services">
    <div class="container">
      <h2>Services</h2>
      <div class="services-grid">
        ${services.slice(0, 6).map(service => `
        <div class="service-card">
          <h3>${service}</h3>
          <p>Professional ${service.toLowerCase()} services tailored to your needs.</p>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section class="contact">
    <div class="container">
      <h2>Get in Touch</h2>
      <div class="contact-grid">
        <div class="contact-item">
          <span class="contact-icon">📞</span>
          <div>
            <strong>Phone</strong><br>
            <a href="tel:${data.phone}">${data.phone}</a>
          </div>
        </div>
        <div class="contact-item">
          <span class="contact-icon">✉️</span>
          <div>
            <strong>Email</strong><br>
            <a href="mailto:${data.email}">${data.email}</a>
          </div>
        </div>
        ${data.address ? `
        <div class="contact-item">
          <span class="contact-icon">📍</span>
          <div>
            <strong>Location</strong><br>
            ${data.address}, ${data.suburb} ${data.state}
          </div>
        </div>
        ` : ''}
        <div class="contact-item">
          <span class="contact-icon">🕐</span>
          <div>
            <strong>Hours</strong><br>
            ${hours}
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <p>&copy; ${new Date().getFullYear()} ${data.businessName}. All rights reserved.</p>
  </footer>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug } = body

    if (!slug) {
      return NextResponse.json({ error: 'Slug required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Fetch lead data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('slug', slug)
      .single()

    if (leadError || !lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Build business data from lead
    const metadata = lead.metadata || {}
    const businessData: BusinessData = {
      businessName: lead.business_name,
      category: metadata.customType || lead.category || 'Business',
      suburb: lead.suburb,
      state: lead.state || 'VIC',
      phone: lead.phone || '',
      email: lead.email || '',
      address: metadata.address,
      postcode: metadata.postcode,
      operatingHours: metadata.operatingHours,
      instagram: metadata.instagram,
      facebook: metadata.facebook,
      website: metadata.website,
      services: metadata.services,
      customServices: metadata.customServices,
      targetCustomers: metadata.targetCustomers,
      uniqueSellingPoints: metadata.uniqueSellingPoints,
      additionalNotes: metadata.additionalNotes,
    }

    let generatedHtml: string

    // Fetch competitor research to inform the site generation
    const research = await fetchResearchInsights(
      businessData.category,
      businessData.suburb,
      businessData.services || []
    )

    if (research) {
      console.log(`Using research insights for ${slug}: tone=${research.suggestedTone}, layout=${research.layoutRecommendation}`)
    }

    // Try Claude first, fall back to template
    try {
      if (process.env.ANTHROPIC_API_KEY) {
        generatedHtml = await generateWithClaude(businessData, research)
      } else {
        console.log('No ANTHROPIC_API_KEY, using fallback')
        generatedHtml = generateFallbackHTML(businessData)
      }
    } catch (claudeError) {
      console.error('Claude error, using fallback:', claudeError)
      generatedHtml = generateFallbackHTML(businessData)
    }

    // Save to client_sites
    const { error: updateError } = await supabase
      .from('client_sites')
      .update({ generated_html: generatedHtml })
      .eq('slug', slug)

    if (updateError) {
      // If update fails, try upsert
      const { error: upsertError } = await supabase
        .from('client_sites')
        .upsert({
          slug,
          generated_html: generatedHtml,
          status: 'preview',
          template: 'ai-generated'
        })

      if (upsertError) {
        console.error('Error saving HTML:', upsertError)
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      slug,
      message: 'Site generated successfully'
    })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { error: 'Failed to generate site' },
      { status: 500 }
    )
  }
}
