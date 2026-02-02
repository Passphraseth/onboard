import Link from 'next/link'
import Footer from './Footer'
import Navbar from './Navbar'
import { LocalBusinessSchema, BreadcrumbSchema } from './StructuredData'

interface LocationLandingPageProps {
  city: string
  state: string
  heroTitle: string
  heroDescription: string
  suburbs: string[]
  industries: {
    name: string
    slug: string
  }[]
}

export default function LocationLandingPage({
  city,
  state,
  heroTitle,
  heroDescription,
  suburbs,
  industries,
}: LocationLandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Structured Data for Local SEO */}
      <LocalBusinessSchema
        name="Onboard"
        description={`Professional website builder for ${city} small businesses`}
        areaServed={city}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://onboard.com.au' },
          { name: `${city} Website Design`, url: `https://onboard.com.au/${city.toLowerCase()}-website-design` },
        ]}
      />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-neutral-500 text-sm mb-4 tracking-wide uppercase">
            Website Design in {city}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 leading-[1.1]">
            {heroTitle}
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboard" className="btn btn-primary h-12 px-8 text-base">
              Create your website free
            </Link>
          </div>

          {/* Local trust signals */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Australian-owned
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Fast local hosting
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ready in minutes
            </div>
          </div>
        </div>
      </section>

      {/* Why Local Matters */}
      <section className="section bg-neutral-950">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
              Why {city} businesses choose Onboard
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Australian Servers</h3>
              <p className="text-neutral-400 text-sm">Your site loads fast for {city} customers. No overseas lag.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Local SEO Ready</h3>
              <p className="text-neutral-400 text-sm">Built to rank in {city} searches. Pair with Google Business Profile.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No Agency Prices</h3>
              <p className="text-neutral-400 text-sm">{city} agencies charge $5k+. Get the same quality for $49/month.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries in this city */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
              {city} businesses we serve
            </h2>
            <p className="text-neutral-400">
              Professional websites for every industry across {city} and {state}.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/websites-for-${industry.slug}`}
                className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors text-center"
              >
                <span className="text-sm font-medium">{industry.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Suburbs */}
      <section className="section bg-neutral-950">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold tracking-tight mb-8 text-center">
              Serving all of {city}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {suburbs.map((suburb) => (
                <span
                  key={suburb}
                  className="px-3 py-1 text-sm bg-neutral-900 rounded-full text-neutral-400"
                >
                  {suburb}
                </span>
              ))}
              <span className="px-3 py-1 text-sm bg-neutral-800 rounded-full text-neutral-300">
                + all suburbs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Ready to grow your {city} business?
          </h2>
          <p className="text-neutral-400 text-lg mb-10 max-w-md mx-auto">
            See your professional website in under a minute.
          </p>
          <Link href="/onboard" className="btn btn-primary h-12 px-8 text-base">
            Get started free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
