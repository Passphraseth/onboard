import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'
import Anthropic from '@anthropic-ai/sdk'

interface BusinessData {
  businessName: string
  businessType: string
  customType?: string
  suburb: string
  state: string
  phone?: string
  email?: string
  address?: string
  website?: string
  facebook?: string
  instagram?: string
  services: string[]
  customServices?: string
  targetCustomers?: string
  uniqueSellingPoints?: string
  additionalNotes?: string
  operatingHours?: Record<string, { open: string; close: string; closed: boolean }>
}

// Format operating hours for display
function formatHours(hours?: Record<string, { open: string; close: string; closed: boolean }>): string {
  if (!hours) return 'Contact for hours'

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const parts: string[] = []

  // Group consecutive days with same hours
  let currentGroup = { start: '', end: '', hours: '' }

  days.forEach((day, i) => {
    const dayHours = hours[day]
    const hoursStr = dayHours?.closed ? 'Closed' : dayHours ? `${dayHours.open}-${dayHours.close}` : ''

    if (hoursStr === currentGroup.hours) {
      currentGroup.end = day
    } else {
      if (currentGroup.start) {
        const dayNames: Record<string, string> = { monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun' }
        const range = currentGroup.start === currentGroup.end
          ? dayNames[currentGroup.start]
          : `${dayNames[currentGroup.start]}-${dayNames[currentGroup.end]}`
        parts.push(`${range} ${currentGroup.hours}`)
      }
      currentGroup = { start: day, end: day, hours: hoursStr }
    }
  })

  // Don't forget the last group
  if (currentGroup.start) {
    const dayNames: Record<string, string> = { monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun' }
    const range = currentGroup.start === currentGroup.end
      ? dayNames[currentGroup.start]
      : `${dayNames[currentGroup.start]}-${dayNames[currentGroup.end]}`
    parts.push(`${range} ${currentGroup.hours}`)
  }

  return parts.join(', ')
}

// Combine services from selected + custom
function getAllServices(data: BusinessData): string[] {
  const services = [...(data.services || [])]
  if (data.customServices) {
    const custom = data.customServices.split(/[,\n]/).map(s => s.trim()).filter(Boolean)
    services.push(...custom)
  }
  return services
}

// Get the actual business type from category or customType
function getBusinessType(data: BusinessData): string {
  if (data.businessType === 'other' && data.customType) {
    return data.customType
  }
  return data.businessType || data.customType || 'business'
}

// Generate site using Claude API
async function generateWithClaude(data: BusinessData): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    console.log('No Anthropic API key, using fallback')
    return generateFallbackHTML(data)
  }

  const client = new Anthropic({ apiKey })

  const businessType = getBusinessType(data)
  const services = getAllServices(data)
  const hours = formatHours(data.operatingHours)

  const prompt = `You are an expert web designer. Create a complete, production-ready HTML website.

BUSINESS INFORMATION (use this EXACTLY - do not make assumptions):
- Business Name: ${data.businessName}
- Type: ${businessType}
- Location: ${data.suburb}, ${data.state}
- Phone: ${data.phone || 'Not provided'}
- Email: ${data.email || 'Not provided'}
- Website: ${data.website || 'Not provided'}
- Facebook: ${data.facebook || 'Not provided'}
- Instagram: ${data.instagram || 'Not provided'}
- Services: ${services.length > 0 ? services.join(', ') : 'Not specified'}
- Target Customers: ${data.targetCustomers || 'Not specified'}
- Unique Selling Points: ${data.uniqueSellingPoints || 'Not specified'}
- Operating Hours: ${hours}
- Additional Notes: ${data.additionalNotes || 'None'}

CREATE A WEBSITE THAT:
1. Matches the industry aesthetic (fashion = bold/editorial, trades = professional/trustworthy, beauty = elegant, etc.)
2. Uses the ACTUAL services they listed, not generic ones
3. Has unique, compelling copy written specifically for this business
4. Includes: Nav, Hero, Services/Work, About, Contact sections
5. Is fully responsive with modern CSS
6. Uses Google Fonts and Font Awesome (NO emojis anywhere)
7. Has smooth hover effects and transitions

CRITICAL RULES:
- Use ONLY the information provided above
- Do NOT assume wedding photography for photographers, or any other defaults
- Write copy that sounds human and specific, not template-like
- Match the design to the industry (${businessType})

Return ONLY the complete HTML code, starting with <!DOCTYPE html>.`

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }]
    })

    const content = response.content[0]
    if (content.type === 'text') {
      let html = content.text
      // Clean up markdown code blocks if present
      if (html.startsWith('```')) {
        html = html.replace(/^```html?\n?/, '').replace(/\n?```$/, '')
      }
      return html.trim()
    }
  } catch (error) {
    console.error('Claude API error:', error)
  }

  return generateFallbackHTML(data)
}

// Fallback when no API key - uses actual data
function generateFallbackHTML(data: BusinessData): string {
  const businessType = getBusinessType(data)
  const services = getAllServices(data)
  const hours = formatHours(data.operatingHours)

  // Determine design based on business type keywords
  const typeLC = businessType.toLowerCase()

  let design = {
    primary: '#1a1a1a',
    accent: '#c9a86c',
    bg: '#0a0a0a',
    headingFont: 'Bebas Neue',
    style: 'bold' // bold, elegant, professional, warm
  }

  if (typeLC.includes('fashion') || typeLC.includes('model')) {
    design = { primary: '#0a0a0a', accent: '#ffffff', bg: '#0a0a0a', headingFont: 'Bebas Neue', style: 'bold' }
  } else if (typeLC.includes('beauty') || typeLC.includes('salon') || typeLC.includes('hair')) {
    design = { primary: '#1a1a1a', accent: '#c9a86c', bg: '#faf8f5', headingFont: 'Cormorant Garamond', style: 'elegant' }
  } else if (typeLC.includes('photo')) {
    design = { primary: '#0a0a0a', accent: '#888888', bg: '#0a0a0a', headingFont: 'Bebas Neue', style: 'bold' }
  } else if (typeLC.includes('plumb') || typeLC.includes('electric') || typeLC.includes('build') || typeLC.includes('construct')) {
    design = { primary: '#1e3a5f', accent: '#f59e0b', bg: '#0f172a', headingFont: 'Montserrat', style: 'professional' }
  } else if (typeLC.includes('clean') || typeLC.includes('garden') || typeLC.includes('landscape')) {
    design = { primary: '#166534', accent: '#86efac', bg: '#14532d', headingFont: 'Poppins', style: 'professional' }
  }

  const servicesHTML = services.slice(0, 6).map((service, i) => `
      <div class="service-item">
        <span class="service-num">0${i + 1}</span>
        <h3>${service}</h3>
      </div>`).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.businessName} | ${businessType} in ${data.suburb}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=${design.headingFont.replace(' ', '+')}:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root { --primary: ${design.primary}; --accent: ${design.accent}; --bg: ${design.bg}; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: #fff; }
    a { color: inherit; text-decoration: none; }

    .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 2rem 4rem; display: flex; justify-content: space-between; align-items: center; mix-blend-mode: difference; }
    .nav-logo { font-family: '${design.headingFont}', sans-serif; font-size: 1.5rem; letter-spacing: 0.1em; }
    .nav-links { display: flex; gap: 2.5rem; list-style: none; }
    .nav-links a { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; }

    .hero { min-height: 100vh; display: flex; align-items: flex-end; padding: 4rem; background: linear-gradient(135deg, var(--bg), var(--primary)); }
    .hero-content { max-width: 800px; }
    .hero h1 { font-family: '${design.headingFont}', sans-serif; font-size: clamp(3rem, 10vw, 7rem); line-height: 0.95; margin-bottom: 1.5rem; }
    .hero p { font-size: 1.1rem; opacity: 0.7; max-width: 500px; line-height: 1.7; }

    section { padding: 6rem 4rem; }
    .section-title { font-family: '${design.headingFont}', sans-serif; font-size: 3rem; margin-bottom: 3rem; }

    .services { background: #fff; color: #1a1a1a; }
    .services-grid { display: grid; gap: 1px; background: #e5e5e5; }
    .service-item { background: #fff; padding: 2.5rem; display: flex; align-items: flex-start; gap: 2rem; transition: background 0.3s; }
    .service-item:hover { background: #fafafa; }
    .service-num { font-family: '${design.headingFont}', sans-serif; font-size: 2rem; opacity: 0.2; }
    .service-item h3 { font-size: 1.25rem; font-weight: 500; }

    .about { background: var(--primary); }
    .about-content { max-width: 700px; }
    .about-content p { font-size: 1.15rem; line-height: 1.9; opacity: 0.8; margin-bottom: 1.5rem; }

    .contact { background: #0a0a0a; }
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
    .contact-info { display: flex; flex-direction: column; gap: 1.5rem; }
    .contact-item { display: flex; align-items: center; gap: 1rem; font-size: 1rem; opacity: 0.8; }
    .contact-item i { width: 20px; }
    .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
    .contact-form input, .contact-form textarea { padding: 1rem; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; font-family: inherit; font-size: 1rem; }
    .contact-form input:focus, .contact-form textarea:focus { outline: none; border-color: var(--accent); }
    .contact-form textarea { min-height: 120px; resize: vertical; }
    .contact-form button { padding: 1rem 2.5rem; background: var(--accent); color: #1a1a1a; border: none; font-family: '${design.headingFont}', sans-serif; font-size: 1rem; letter-spacing: 0.1em; cursor: pointer; transition: opacity 0.3s; }
    .contact-form button:hover { opacity: 0.8; }

    footer { padding: 2rem 4rem; background: #050505; text-align: center; opacity: 0.5; font-size: 0.85rem; }

    @media (max-width: 768px) {
      .nav, section { padding: 2rem; }
      .nav-links { display: none; }
      .contact-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <nav class="nav">
    <a href="#" class="nav-logo">${data.businessName}</a>
    <ul class="nav-links">
      <li><a href="#services">Services</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <section class="hero">
    <div class="hero-content">
      <h1>${data.businessName}</h1>
      <p>${data.targetCustomers ? `Serving ${data.targetCustomers} in ${data.suburb}` : `${businessType} based in ${data.suburb}, ${data.state}`}</p>
    </div>
  </section>

  <section id="services" class="services">
    <h2 class="section-title">Services</h2>
    <div class="services-grid">
      ${servicesHTML || '<div class="service-item"><span class="service-num">01</span><h3>Contact for services</h3></div>'}
    </div>
  </section>

  <section id="about" class="about">
    <h2 class="section-title">About</h2>
    <div class="about-content">
      <p>${data.uniqueSellingPoints || `${data.businessName} provides ${businessType.toLowerCase()} services in ${data.suburb} and surrounding areas.`}</p>
      ${data.targetCustomers ? `<p>We work with ${data.targetCustomers.toLowerCase()}, delivering quality results every time.</p>` : ''}
    </div>
  </section>

  <section id="contact" class="contact">
    <h2 class="section-title">Contact</h2>
    <div class="contact-grid">
      <div class="contact-info">
        ${data.phone ? `<a href="tel:${data.phone}" class="contact-item"><i class="fas fa-phone"></i><span>${data.phone}</span></a>` : ''}
        ${data.email ? `<a href="mailto:${data.email}" class="contact-item"><i class="fas fa-envelope"></i><span>${data.email}</span></a>` : ''}
        ${data.address ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i><span>${data.address}, ${data.suburb} ${data.state}</span></div>` : `<div class="contact-item"><i class="fas fa-map-marker-alt"></i><span>${data.suburb}, ${data.state}</span></div>`}
        <div class="contact-item"><i class="fas fa-clock"></i><span>${hours}</span></div>
        ${data.facebook ? `<a href="https://facebook.com/${data.facebook}" class="contact-item"><i class="fab fa-facebook"></i><span>${data.facebook}</span></a>` : ''}
        ${data.instagram ? `<a href="https://instagram.com/${data.instagram}" class="contact-item"><i class="fab fa-instagram"></i><span>@${data.instagram}</span></a>` : ''}
        ${data.website ? `<a href="${data.website}" class="contact-item"><i class="fas fa-globe"></i><span>Website</span></a>` : ''}
      </div>
      <form class="contact-form">
        <input type="text" placeholder="Name" required>
        <input type="email" placeholder="Email" required>
        <textarea placeholder="Message"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  </section>

  <footer>
    <p>&copy; ${new Date().getFullYear()} ${data.businessName}. ${data.suburb}, ${data.state}.</p>
  </footer>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Accept either direct data or a slug to fetch from DB
    let data: BusinessData

    if (body.slug && !body.businessName) {
      // Fetch from database
      const supabase = createAdminClient()
      const { data: lead, error } = await supabase
        .from('leads')
        .select('*')
        .eq('slug', body.slug)
        .single()

      if (error || !lead) {
        return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
      }

      const metadata = typeof lead.metadata === 'string' ? JSON.parse(lead.metadata) : (lead.metadata || {})

      data = {
        businessName: lead.business_name,
        businessType: lead.category || '',
        suburb: lead.suburb || 'Melbourne',
        state: lead.state || 'VIC',
        phone: lead.phone,
        email: lead.email,
        address: metadata.address,
        website: metadata.website,
        facebook: metadata.facebook,
        instagram: metadata.instagram,
        services: metadata.services || [],
        customServices: metadata.customServices,
        targetCustomers: metadata.targetCustomers,
        uniqueSellingPoints: metadata.uniqueSellingPoints,
        additionalNotes: metadata.additionalNotes,
        operatingHours: metadata.operatingHours
      }
    } else {
      data = body
    }

    if (!data.businessName) {
      return NextResponse.json({ error: 'Business name required' }, { status: 400 })
    }

    const slug = slugify(data.businessName)

    // Generate HTML
    console.log(`Generating site for ${data.businessName} (${getBusinessType(data)})...`)
    const html = await generateWithClaude(data)

    // Store in database
    const supabase = createAdminClient()

    await supabase
      .from('client_sites')
      .upsert({
        slug,
        generated_html: html,
        template: 'ai-generated-v2',
        status: 'preview'
      }, { onConflict: 'slug' })

    return NextResponse.json({
      success: true,
      slug,
      html,
      businessType: getBusinessType(data),
      services: getAllServices(data)
    })

  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json({ error: 'Failed to generate site' }, { status: 500 })
  }
}

// GET - Generate from existing lead by slug
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Slug required' }, { status: 400 })
  }

  // Trigger generation via POST
  const response = await fetch(request.url.replace('/api/generate-site-v2', '/api/generate-site-v2'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug })
  })

  return response
}
