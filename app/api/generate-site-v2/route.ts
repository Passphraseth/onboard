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

  if (category.includes('fashion') || customServices.includes('fashion') || target.includes('fashion')) {
    return 'fashion'
  }
  if (category.includes('wedding') || customServices.includes('wedding')) {
    return 'wedding'
  }
  if (category.includes('beauty') || category.includes('salon')) {
    return 'beauty'
  }
  if (category.includes('plumb') || category.includes('electric') || category.includes('trade')) {
    return 'trades'
  }
  if (category.includes('photo')) {
    return 'photography'
  }
  return 'business'
}

async function generateWithClaude(data: BusinessData): Promise<string> {
  const client = new Anthropic()

  const services = getAllServices(data)
  const businessType = getBusinessType(data)
  const hours = formatHours(data.operatingHours)

  const prompt = `Create a minimal, architectural-style landing page. Think luxury real estate or high-end design studio aesthetic.

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
- Use this image: https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80

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
- Hero: https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80
- About: https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80

**TECHNICAL:**
- Single HTML file with embedded CSS
- Mobile responsive with clean breakpoints
- Smooth scroll: html { scroll-behavior: smooth }
- Transitions: all 0.3s ease

CRITICAL: Return ONLY valid HTML. No markdown, no explanations. The design must feel expensive through restraint and typography, not through effects or colors.`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 16000,
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
      background: ${isFashion ? '#000' : `linear-gradient(135deg, ${primaryColor}, #0f172a)`};
      color: white;
      padding: 120px 24px;
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

    // Try Claude first, fall back to template
    try {
      if (process.env.ANTHROPIC_API_KEY) {
        generatedHtml = await generateWithClaude(businessData)
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
