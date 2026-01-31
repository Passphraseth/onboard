import Link from 'next/link'
import { Metadata } from 'next'
import Footer from '@/components/Footer'
import { OrganizationSchema, SoftwareApplicationSchema } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Onboard — Professional websites for service businesses',
  description: 'Get a stunning, conversion-focused website for your business in minutes. Built for tradies, cafes, photographers, and service businesses across Australia.',
  keywords: 'website builder, service business website, Australian website builder, tradie website, small business website',
  openGraph: {
    title: 'Onboard — Professional websites for service businesses',
    description: 'Get a stunning, conversion-focused website in minutes.',
    type: 'website',
    locale: 'en_AU',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Structured Data for SEO */}
      <OrganizationSchema />
      <SoftwareApplicationSchema />

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

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.1]">
            A website that<br />
            actually looks like<br />
            <span className="text-neutral-500">your business</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Professional websites for service businesses. Ready in minutes, not weeks. No templates, no cookie-cutter designs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboard" className="btn btn-primary h-12 px-8 text-base">
              Create your site
            </Link>
            <Link href="#work" className="btn btn-secondary h-12 px-8 text-base">
              See examples
            </Link>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="section bg-neutral-950">
        <div className="container">
          <div className="mb-16">
            <p className="text-neutral-500 text-sm mb-3 tracking-wide">Recent work</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Every site is different
            </h2>
          </div>

          <div className="showcase-grid">
            {[
              {
                name: 'Matthew Krueger',
                type: 'Photography',
                image: '/screenshots/photography.svg',
              },
              {
                name: 'Spacez',
                type: 'Commercial Fitouts',
                image: '/screenshots/construction.svg',
              },
              {
                name: 'Sunrise Coffee',
                type: 'Cafe',
                image: '/screenshots/cafe.svg',
              },
            ].map((site, index) => (
              <div
                key={index}
                className="showcase-item group cursor-default"
              >
                <img
                  src={site.image}
                  alt={`${site.name} website example`}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="showcase-overlay">
                  <p className="font-medium">{site.name}</p>
                  <p className="text-neutral-400 text-sm">{site.type}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/onboard" className="btn btn-primary">
              Create your site
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-16 md:gap-12">
            <div>
              <p className="text-neutral-600 text-4xl font-light mb-4">01</p>
              <h3 className="text-xl font-semibold mb-3">Ready in minutes</h3>
              <p className="text-neutral-400 leading-relaxed">
                Your website is generated and ready to preview immediately. No waiting days for a designer.
              </p>
            </div>
            <div>
              <p className="text-neutral-600 text-4xl font-light mb-4">02</p>
              <h3 className="text-xl font-semibold mb-3">Built to convert</h3>
              <p className="text-neutral-400 leading-relaxed">
                Every site is optimised for leads. Clear calls to action, contact forms, and mobile-first design.
              </p>
            </div>
            <div>
              <p className="text-neutral-600 text-4xl font-light mb-4">03</p>
              <h3 className="text-xl font-semibold mb-3">Looks premium</h3>
              <p className="text-neutral-400 leading-relaxed">
                Professional design that matches your brand. Not a template that looks like everyone else.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-neutral-950">
        <div className="container">
          <div className="mb-16">
            <p className="text-neutral-500 text-sm mb-3 tracking-wide">What you get</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Everything included
            </h2>
          </div>

          <div className="feature-grid">
            {[
              { title: 'Custom design', desc: 'Unique to your business, not a template' },
              { title: 'Mobile optimised', desc: 'Looks perfect on every device' },
              { title: 'SEO ready', desc: 'Built to rank on Google' },
              { title: 'Fast hosting', desc: 'Australian servers, instant load times' },
              { title: 'Contact forms', desc: 'Capture leads directly to your inbox' },
              { title: 'SSL included', desc: 'Secure site with https' },
            ].map((feature, index) => (
              <div key={index} className="feature-item">
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-neutral-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section">
        <div className="container">
          <div className="mb-16">
            <p className="text-neutral-500 text-sm mb-3 tracking-wide">Built for</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Service businesses
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'Tradies',
              'Photographers',
              'Cafes',
              'Hair & Beauty',
              'Fitness',
              'Construction',
              'Restaurants',
              'Creative Studios',
            ].map((industry, index) => (
              <p key={index} className="text-neutral-400">{industry}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section bg-neutral-950">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-16 text-center">
              <p className="text-neutral-500 text-sm mb-3 tracking-wide">Pricing</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Simple, transparent
              </h2>
              <p className="text-neutral-400">
                Preview your site for free. Only pay when you're ready to launch.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-8">
                <p className="text-neutral-500 text-sm mb-1">Preview</p>
                <p className="text-4xl font-semibold mb-4">Free</p>
                <p className="text-neutral-400 text-sm mb-6">See your site before you commit</p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  <li>Generated website</li>
                  <li>Shareable preview link</li>
                  <li>Unlimited regenerations</li>
                </ul>
              </div>

              <div className="card p-8 border-white/20">
                <p className="text-neutral-500 text-sm mb-1">Launch</p>
                <p className="text-4xl font-semibold mb-4">$49<span className="text-lg text-neutral-500">/mo</span></p>
                <p className="text-neutral-400 text-sm mb-6">Everything to go live</p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  <li>Custom domain</li>
                  <li>SSL certificate</li>
                  <li>Contact forms</li>
                  <li>Analytics</li>
                  <li>Priority support</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/pricing" className="text-sm text-neutral-400 hover:text-white transition-colors">
                View full pricing details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Ready?
          </h2>
          <p className="text-neutral-400 text-lg mb-10 max-w-md mx-auto">
            See your website in under a minute.
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
