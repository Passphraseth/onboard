import Link from 'next/link'
import Image from 'next/image'
import Footer from './Footer'
import { ServiceSchema, BreadcrumbSchema } from './StructuredData'

interface Feature {
  title: string
  description: string
}

interface Testimonial {
  quote: string
  author: string
  business: string
  location: string
}

interface CategoryLandingPageProps {
  // SEO
  industry: string
  industryPlural: string

  // Hero
  heroTitle: string
  heroSubtitle: string
  heroDescription: string

  // Benefits
  benefits: string[]

  // Features specific to this industry
  features: Feature[]

  // Common pain points this solves
  painPoints: string[]

  // Keywords for SEO
  keywords: string[]

  // Example sites (optional)
  exampleSites?: {
    name: string
    slug: string
    type: string
  }[]

  // Testimonial (optional)
  testimonial?: Testimonial

  // CTA text
  ctaText?: string
}

export default function CategoryLandingPage({
  industry,
  industryPlural,
  heroTitle,
  heroSubtitle,
  heroDescription,
  benefits,
  features,
  painPoints,
  keywords,
  exampleSites,
  testimonial,
  ctaText = 'Create your website free',
}: CategoryLandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Structured Data for SEO */}
      <ServiceSchema
        serviceName={`Website Builder for ${industryPlural}`}
        serviceType="Website Design"
        description={heroDescription}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://onboard.com.au' },
          { name: `Websites for ${industryPlural}`, url: `https://onboard.com.au/websites-for-${industry.toLowerCase().replace(/\s+/g, '-')}` },
        ]}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            onboard
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/pricing" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/onboard" className="btn btn-primary text-sm">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-neutral-500 text-sm mb-4 tracking-wide uppercase">
            Websites for {industryPlural}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 leading-[1.1]">
            {heroTitle}
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboard" className="btn btn-primary h-12 px-8 text-base">
              {ctaText}
            </Link>
            <Link href="#features" className="btn btn-secondary h-12 px-8 text-base">
              See features
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free to preview
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Ready in minutes
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No design skills needed
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section bg-neutral-950">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-neutral-500 text-sm mb-3 tracking-wide">The problem</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
              Most {industryPlural.toLowerCase()} struggle with their website
            </h2>
            <p className="text-neutral-400 text-lg">
              Sound familiar? These are the challenges we solve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {painPoints.map((point, index) => (
              <div key={index} className="flex gap-4 p-6 rounded-lg bg-neutral-900/50 border border-neutral-800">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-900/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-neutral-300">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-neutral-500 text-sm mb-3 tracking-wide">The solution</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
              A {industry.toLowerCase()} website that works as hard as you do
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section bg-neutral-950">
        <div className="container">
          <div className="mb-16">
            <p className="text-neutral-500 text-sm mb-3 tracking-wide">Built for {industryPlural.toLowerCase()}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Everything you need
            </h2>
          </div>

          <div className="feature-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-neutral-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-neutral-500 text-sm mb-3 tracking-wide">How it works</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Your new website in 3 steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-12 max-w-4xl mx-auto">
            <div>
              <p className="text-neutral-600 text-4xl font-light mb-4">01</p>
              <h3 className="text-xl font-semibold mb-3">Tell us about your business</h3>
              <p className="text-neutral-400 leading-relaxed">
                Answer a few quick questions about your {industry.toLowerCase()} business and what makes you different.
              </p>
            </div>
            <div>
              <p className="text-neutral-600 text-4xl font-light mb-4">02</p>
              <h3 className="text-xl font-semibold mb-3">We create your site</h3>
              <p className="text-neutral-400 leading-relaxed">
                Our AI creates a unique, professional website tailored to your brand and services.
              </p>
            </div>
            <div>
              <p className="text-neutral-600 text-4xl font-light mb-4">03</p>
              <h3 className="text-xl font-semibold mb-3">Go live</h3>
              <p className="text-neutral-400 leading-relaxed">
                Preview for free, then launch when you're ready. Start getting more customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="section bg-neutral-950">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <svg className="w-10 h-10 text-neutral-700 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <blockquote className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-neutral-500">{testimonial.business}, {testimonial.location}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Example Sites */}
      {exampleSites && exampleSites.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="mb-16">
              <p className="text-neutral-500 text-sm mb-3 tracking-wide">Examples</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                See what's possible
              </h2>
            </div>

            <div className="showcase-grid">
              {exampleSites.map((site, index) => (
                <a
                  key={index}
                  href={`/site/${site.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="showcase-item group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/30 to-neutral-900/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/5 text-5xl font-semibold tracking-tight">
                      {site.name.split(' ')[0]}
                    </span>
                  </div>
                  <div className="showcase-overlay">
                    <p className="font-medium">{site.name}</p>
                    <p className="text-neutral-400 text-sm">{site.type}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Preview */}
      <section className="section bg-neutral-950">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-16 text-center">
              <p className="text-neutral-500 text-sm mb-3 tracking-wide">Pricing</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Simple, fair pricing
              </h2>
              <p className="text-neutral-400">
                Preview your {industry.toLowerCase()} website for free. Only pay when you're ready to launch.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-8">
                <p className="text-neutral-500 text-sm mb-1">Preview</p>
                <p className="text-4xl font-semibold mb-4">Free</p>
                <p className="text-neutral-400 text-sm mb-6">See your website before you commit</p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Generated website
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Shareable preview link
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited regenerations
                  </li>
                </ul>
              </div>

              <div className="card p-8 border-white/20">
                <p className="text-neutral-500 text-sm mb-1">Launch</p>
                <p className="text-4xl font-semibold mb-4">$49<span className="text-lg text-neutral-500">/mo</span></p>
                <p className="text-neutral-400 text-sm mb-6">Everything to go live</p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom domain
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    SSL certificate
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Contact forms
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Ready to stand out?
          </h2>
          <p className="text-neutral-400 text-lg mb-10 max-w-md mx-auto">
            Join other {industryPlural.toLowerCase()} who've upgraded their online presence.
          </p>
          <Link href="/onboard" className="btn btn-primary h-12 px-8 text-base">
            {ctaText}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
