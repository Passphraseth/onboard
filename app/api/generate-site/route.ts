import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

interface BusinessData {
  businessName: string
  businessType: string
  suburb: string
  state: string
  phone?: string
  email?: string
  address?: string
  services: string[]
  uniqueSellingPoints?: string
  additionalNotes?: string
}

// Industry-specific design configurations based on competitor research patterns
const industryDesigns: Record<string, {
  colors: { primary: string; accent: string; dark: string; light: string }
  heroStyle: 'full-image' | 'split' | 'minimal' | 'gradient'
  typography: { heading: string; body: string }
  tone: 'elegant' | 'professional' | 'warm' | 'bold'
  trustSignals: string[]
  ctaText: string
}> = {
  photographer: {
    colors: { primary: '#1a1a1a', accent: '#c9a86c', dark: '#0a0a0a', light: '#fafafa' },
    heroStyle: 'full-image',
    typography: { heading: 'Playfair Display', body: 'Inter' },
    tone: 'elegant',
    trustSignals: ['Award Winning', 'Published Work', '500+ Sessions', 'Premium Quality'],
    ctaText: 'Book Your Session'
  },
  construction: {
    colors: { primary: '#1e3a5f', accent: '#c5a572', dark: '#0f172a', light: '#f8fafc' },
    heroStyle: 'full-image',
    typography: { heading: 'Montserrat', body: 'Open Sans' },
    tone: 'professional',
    trustSignals: ['Fully Licensed', 'Quality Guaranteed', '20+ Years Experience', 'Free Quotes'],
    ctaText: 'Get a Free Quote'
  },
  plumber: {
    colors: { primary: '#1e40af', accent: '#f59e0b', dark: '#1e293b', light: '#f8fafc' },
    heroStyle: 'gradient',
    typography: { heading: 'Poppins', body: 'Open Sans' },
    tone: 'professional',
    trustSignals: ['24/7 Emergency', 'Licensed & Insured', 'Upfront Pricing', 'Same Day Service'],
    ctaText: 'Call Now'
  },
  electrician: {
    colors: { primary: '#0f766e', accent: '#fbbf24', dark: '#134e4a', light: '#f0fdfa' },
    heroStyle: 'split',
    typography: { heading: 'Poppins', body: 'Inter' },
    tone: 'professional',
    trustSignals: ['Licensed & Insured', 'Safety Certified', 'Free Quotes', '24/7 Available'],
    ctaText: 'Get a Quote'
  },
  hairdresser: {
    colors: { primary: '#be185d', accent: '#f9a8d4', dark: '#831843', light: '#fdf2f8' },
    heroStyle: 'split',
    typography: { heading: 'Cormorant Garamond', body: 'Lato' },
    tone: 'elegant',
    trustSignals: ['Award Winning Stylists', 'Premium Products', 'Relaxing Atmosphere', 'Expert Colourists'],
    ctaText: 'Book Appointment'
  },
  beautician: {
    colors: { primary: '#7c3aed', accent: '#c4b5fd', dark: '#4c1d95', light: '#faf5ff' },
    heroStyle: 'minimal',
    typography: { heading: 'Cormorant Garamond', body: 'Lato' },
    tone: 'elegant',
    trustSignals: ['Certified Therapists', 'Premium Products', 'Relaxing Environment', 'Personalised Care'],
    ctaText: 'Book Treatment'
  },
  cleaner: {
    colors: { primary: '#059669', accent: '#6ee7b7', dark: '#064e3b', light: '#ecfdf5' },
    heroStyle: 'gradient',
    typography: { heading: 'Poppins', body: 'Open Sans' },
    tone: 'warm',
    trustSignals: ['Eco-Friendly Products', 'Fully Insured', 'Satisfaction Guaranteed', 'Background Checked'],
    ctaText: 'Get a Quote'
  },
  landscaper: {
    colors: { primary: '#15803d', accent: '#86efac', dark: '#14532d', light: '#f0fdf4' },
    heroStyle: 'full-image',
    typography: { heading: 'Montserrat', body: 'Open Sans' },
    tone: 'professional',
    trustSignals: ['Licensed & Insured', 'Free Design Consultation', 'Quality Workmanship', 'Local Experts'],
    ctaText: 'Free Consultation'
  },
  mechanic: {
    colors: { primary: '#dc2626', accent: '#fca5a5', dark: '#1f2937', light: '#f9fafb' },
    heroStyle: 'split',
    typography: { heading: 'Oswald', body: 'Open Sans' },
    tone: 'bold',
    trustSignals: ['Factory Trained', 'Genuine Parts', 'Competitive Prices', 'All Makes & Models'],
    ctaText: 'Book Service'
  },
  cafe: {
    colors: { primary: '#78350f', accent: '#fbbf24', dark: '#451a03', light: '#fffbeb' },
    heroStyle: 'full-image',
    typography: { heading: 'Playfair Display', body: 'Lato' },
    tone: 'warm',
    trustSignals: ['Locally Roasted', 'Fresh Daily', 'Free WiFi', 'Dog Friendly'],
    ctaText: 'View Menu'
  },
  fitness: {
    colors: { primary: '#ea580c', accent: '#fdba74', dark: '#0c0a09', light: '#fff7ed' },
    heroStyle: 'full-image',
    typography: { heading: 'Oswald', body: 'Inter' },
    tone: 'bold',
    trustSignals: ['Certified Trainers', 'Modern Equipment', 'Flexible Hours', 'First Session Free'],
    ctaText: 'Start Free Trial'
  }
}

// Generate complete, production-ready HTML
function generateSiteHTML(data: BusinessData): string {
  const businessType = data.businessType.toLowerCase()
  const design = industryDesigns[businessType] || industryDesigns.construction

  const { colors, heroStyle, typography, tone, trustSignals, ctaText } = design

  // Generate service cards HTML
  const servicesHTML = data.services.slice(0, 6).map(service => `
            <div class="service-card">
              <h3>${service}</h3>
              <p>Professional ${service.toLowerCase()} services delivered with expertise and attention to detail.</p>
            </div>`).join('')

  // Generate trust signals HTML
  const trustHTML = trustSignals.map(signal => `
              <div class="trust-item">
                <i class="fas fa-check-circle"></i>
                <span>${signal}</span>
              </div>`).join('')

  // Tone-based content
  const toneContent = {
    elegant: {
      heroTitle: data.businessName,
      heroSubtitle: `Exceptional ${data.businessType} in ${data.suburb}`,
      aboutTitle: 'Our Story',
      aboutText: `${data.businessName} brings refined ${data.businessType.toLowerCase()} services to discerning clients in ${data.suburb}. We combine expertise with exceptional attention to detail for results that exceed expectations.`
    },
    professional: {
      heroTitle: data.businessName,
      heroSubtitle: `Trusted ${data.businessType} Services in ${data.suburb}`,
      aboutTitle: 'About Us',
      aboutText: `${data.businessName} delivers high-quality ${data.businessType.toLowerCase()} services throughout ${data.suburb} and surrounding areas. With attention to detail and commitment to excellence, we ensure every project meets the highest standards.`
    },
    warm: {
      heroTitle: `Welcome to ${data.businessName}`,
      heroSubtitle: `Your Local ${data.businessType} in ${data.suburb}`,
      aboutTitle: 'Who We Are',
      aboutText: `At ${data.businessName}, we take pride in serving the ${data.suburb} community with genuine care and expertise. Our friendly team delivers quality ${data.businessType.toLowerCase()} services with a personal touch.`
    },
    bold: {
      heroTitle: data.businessName.toUpperCase(),
      heroSubtitle: `${data.suburb}'s Premier ${data.businessType}`,
      aboutTitle: 'Why Choose Us',
      aboutText: `${data.businessName} is ${data.suburb}'s go-to destination for professional ${data.businessType.toLowerCase()} services. We deliver results that speak for themselves.`
    }
  }[tone]

  // Add USPs to about text if provided
  const aboutText = data.uniqueSellingPoints
    ? `${toneContent.aboutText} ${data.uniqueSellingPoints}`
    : toneContent.aboutText

  // Hero section variations
  const heroSections: Record<string, string> = {
    'full-image': `
    <section class="hero hero-full">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>${toneContent.heroTitle}</h1>
        <p class="hero-subtitle">${toneContent.heroSubtitle}</p>
        <div class="hero-cta">
          <a href="#contact" class="btn btn-primary">${ctaText}</a>
          ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-secondary"><i class="fas fa-phone"></i> ${data.phone}</a>` : ''}
        </div>
      </div>
    </section>`,
    'split': `
    <section class="hero hero-split">
      <div class="hero-content">
        <h1>${toneContent.heroTitle}</h1>
        <p class="hero-subtitle">${toneContent.heroSubtitle}</p>
        <div class="hero-cta">
          <a href="#contact" class="btn btn-primary">${ctaText}</a>
          ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline"><i class="fas fa-phone"></i> Call Now</a>` : ''}
        </div>
      </div>
      <div class="hero-image"></div>
    </section>`,
    'minimal': `
    <section class="hero hero-minimal">
      <div class="hero-content">
        <h1>${toneContent.heroTitle}</h1>
        <div class="hero-divider"></div>
        <p class="hero-subtitle">${toneContent.heroSubtitle}</p>
        <div class="hero-cta">
          <a href="#contact" class="btn btn-primary">${ctaText}</a>
        </div>
      </div>
    </section>`,
    'gradient': `
    <section class="hero hero-gradient">
      <div class="hero-content">
        <h1>${toneContent.heroTitle}</h1>
        <p class="hero-subtitle">${toneContent.heroSubtitle}</p>
        <div class="trust-bar">${trustHTML}</div>
        <div class="hero-cta">
          <a href="#contact" class="btn btn-primary">${ctaText}</a>
          ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-secondary"><i class="fas fa-phone"></i> ${data.phone}</a>` : ''}
        </div>
      </div>
    </section>`
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.businessName} | ${data.businessType} in ${data.suburb}</title>
  <meta name="description" content="${toneContent.aboutText.slice(0, 160)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${typography.heading.replace(' ', '+')}:wght@400;500;600;700&family=${typography.body.replace(' ', '+')}:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --primary: ${colors.primary};
      --accent: ${colors.accent};
      --dark: ${colors.dark};
      --light: ${colors.light};
      --font-heading: '${typography.heading}', serif;
      --font-body: '${typography.body}', sans-serif;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: var(--font-body);
      color: var(--dark);
      line-height: 1.6;
    }

    /* Navigation */
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .nav-logo {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
      text-decoration: none;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav-links a {
      color: var(--dark);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
    }

    .nav-links a:hover { color: var(--primary); }

    .nav-cta {
      background: var(--primary);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: opacity 0.3s;
    }

    .nav-cta:hover { opacity: 0.9; }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }

    .btn-primary {
      background: var(--primary);
      color: white;
    }

    .btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }

    .btn-secondary {
      background: white;
      color: var(--dark);
    }

    .btn-outline {
      background: transparent;
      color: var(--primary);
      border: 2px solid var(--primary);
    }

    /* Hero Sections */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6rem 2rem;
    }

    .hero-full {
      position: relative;
      background: linear-gradient(135deg, var(--dark), var(--primary));
      color: white;
      text-align: center;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920') center/cover;
      opacity: 0.3;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
    }

    .hero h1 {
      font-family: var(--font-heading);
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 700;
      margin-bottom: 1rem;
      line-height: 1.1;
    }

    .hero-subtitle {
      font-size: clamp(1.1rem, 2vw, 1.5rem);
      opacity: 0.9;
      margin-bottom: 2rem;
    }

    .hero-cta {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .hero-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      padding: 0;
    }

    .hero-split .hero-content {
      padding: 4rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: var(--light);
    }

    .hero-split .hero-content h1 { color: var(--dark); }
    .hero-split .hero-cta { justify-content: flex-start; }

    .hero-split .hero-image {
      background: linear-gradient(135deg, var(--primary), var(--dark));
      min-height: 100vh;
    }

    .hero-minimal {
      background: var(--light);
      text-align: center;
    }

    .hero-minimal h1 { color: var(--dark); }

    .hero-divider {
      width: 60px;
      height: 2px;
      background: var(--accent);
      margin: 1.5rem auto;
    }

    .hero-gradient {
      background: linear-gradient(135deg, var(--primary), var(--dark));
      color: white;
      text-align: center;
    }

    .trust-bar {
      display: flex;
      gap: 2rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 2rem;
      padding: 1rem 0;
    }

    .trust-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
    }

    .trust-item i { color: var(--accent); }

    /* Sections */
    section { padding: 5rem 2rem; }

    .section-header {
      text-align: center;
      max-width: 600px;
      margin: 0 auto 3rem;
    }

    .section-header h2 {
      font-family: var(--font-heading);
      font-size: 2.5rem;
      color: var(--dark);
      margin-bottom: 1rem;
    }

    .section-header p {
      color: #666;
      font-size: 1.1rem;
    }

    /* Services */
    .services {
      background: var(--light);
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .service-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      transition: all 0.3s;
    }

    .service-card:hover {
      border-color: var(--primary);
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      transform: translateY(-4px);
    }

    .service-card h3 {
      font-family: var(--font-heading);
      font-size: 1.25rem;
      color: var(--dark);
      margin-bottom: 0.75rem;
    }

    .service-card p {
      color: #666;
      font-size: 0.95rem;
    }

    /* About */
    .about {
      background: white;
    }

    .about-content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    .about-content p {
      font-size: 1.2rem;
      color: #444;
      line-height: 1.8;
    }

    .about-features {
      display: flex;
      gap: 3rem;
      justify-content: center;
      margin-top: 3rem;
      flex-wrap: wrap;
    }

    .about-feature {
      text-align: center;
    }

    .about-feature i {
      font-size: 2rem;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }

    .about-feature span {
      display: block;
      font-weight: 600;
      color: var(--dark);
    }

    /* Contact */
    .contact {
      background: var(--dark);
      color: white;
    }

    .contact .section-header h2 { color: white; }
    .contact .section-header p { color: rgba(255,255,255,0.7); }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .contact-item i {
      width: 50px;
      height: 50px;
      background: var(--primary);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .contact-item-text span {
      display: block;
      font-size: 0.9rem;
      opacity: 0.7;
    }

    .contact-item-text strong {
      font-size: 1.1rem;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .contact-form input,
    .contact-form textarea {
      padding: 1rem;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      background: rgba(255,255,255,0.1);
      color: white;
      font-family: var(--font-body);
      font-size: 1rem;
    }

    .contact-form input::placeholder,
    .contact-form textarea::placeholder {
      color: rgba(255,255,255,0.5);
    }

    .contact-form textarea { min-height: 120px; resize: vertical; }

    .contact-form button {
      background: var(--accent);
      color: var(--dark);
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.3s;
    }

    .contact-form button:hover { opacity: 0.9; }

    /* Footer */
    footer {
      background: #0a0a0a;
      color: white;
      padding: 2rem;
      text-align: center;
    }

    footer p {
      opacity: 0.7;
      font-size: 0.9rem;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .hero-split { grid-template-columns: 1fr; }
      .hero-split .hero-image { min-height: 300px; order: -1; }
      .contact-grid { grid-template-columns: 1fr; }
      .hero-cta { flex-direction: column; align-items: center; }
      .trust-bar { gap: 1rem; }
    }
  </style>
</head>
<body>
  <!-- Navigation -->
  <nav class="nav">
    <a href="#" class="nav-logo">${data.businessName}</a>
    <ul class="nav-links">
      <li><a href="#services">Services</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <a href="#contact" class="nav-cta">${ctaText}</a>
  </nav>

  ${heroSections[heroStyle]}

  <!-- Services Section -->
  <section id="services" class="services">
    <div class="section-header">
      <h2>Our Services</h2>
      <p>Professional ${data.businessType.toLowerCase()} services tailored to your needs</p>
    </div>
    <div class="services-grid">
      ${servicesHTML}
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="about">
    <div class="section-header">
      <h2>${toneContent.aboutTitle}</h2>
    </div>
    <div class="about-content">
      <p>${aboutText}</p>
      <div class="about-features">
        ${trustSignals.slice(0, 4).map(signal => `
        <div class="about-feature">
          <i class="fas fa-check-circle"></i>
          <span>${signal}</span>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="contact">
    <div class="section-header">
      <h2>Get in Touch</h2>
      <p>Ready to get started? Contact us today.</p>
    </div>
    <div class="contact-grid">
      <div class="contact-info">
        ${data.phone ? `
        <a href="tel:${data.phone}" class="contact-item">
          <i class="fas fa-phone"></i>
          <div class="contact-item-text">
            <span>Phone</span>
            <strong>${data.phone}</strong>
          </div>
        </a>` : ''}
        ${data.email ? `
        <a href="mailto:${data.email}" class="contact-item" style="color: white; text-decoration: none;">
          <i class="fas fa-envelope"></i>
          <div class="contact-item-text">
            <span>Email</span>
            <strong>${data.email}</strong>
          </div>
        </a>` : ''}
        ${data.address ? `
        <div class="contact-item">
          <i class="fas fa-map-marker-alt"></i>
          <div class="contact-item-text">
            <span>Location</span>
            <strong>${data.address}, ${data.suburb} ${data.state}</strong>
          </div>
        </div>` : ''}
      </div>
      <form class="contact-form">
        <input type="text" placeholder="Your Name" required>
        <input type="email" placeholder="Your Email" required>
        <input type="tel" placeholder="Your Phone">
        <textarea placeholder="How can we help?"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <p>&copy; ${new Date().getFullYear()} ${data.businessName}. All rights reserved.</p>
  </footer>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  try {
    const data: BusinessData = await request.json()

    if (!data.businessName) {
      return NextResponse.json(
        { error: 'Business name is required' },
        { status: 400 }
      )
    }

    // Generate complete HTML
    const html = generateSiteHTML(data)
    const slug = slugify(data.businessName)

    // Store in database
    const supabase = createAdminClient()

    // Check for existing lead
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

    if (existingLead) {
      // Update existing
      await supabase
        .from('client_sites')
        .update({
          generated_html: html,
          template: 'generated-v1'
        })
        .eq('slug', slug)
    } else {
      // Create new lead
      const { data: lead } = await supabase
        .from('leads')
        .insert({
          business_name: data.businessName,
          slug,
          suburb: data.suburb,
          state: data.state,
          phone: data.phone,
          email: data.email,
          category: data.businessType,
          source: 'generated',
          status: 'new'
        })
        .select()
        .single()

      if (lead) {
        await supabase
          .from('client_sites')
          .insert({
            slug,
            status: 'preview',
            template: 'generated-v1',
            generated_html: html
          })
      }
    }

    return NextResponse.json({
      success: true,
      slug,
      html,
      message: 'Site generated successfully'
    })

  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate site' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve generated HTML by slug
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Slug required' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('client_sites')
    .select('generated_html')
    .eq('slug', slug)
    .maybeSingle()

  if (!data?.generated_html) {
    return NextResponse.json({ error: 'Site not found' }, { status: 404 })
  }

  return new NextResponse(data.generated_html, {
    headers: { 'Content-Type': 'text/html' }
  })
}
