import Link from 'next/link'
import { Metadata } from 'next'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { OrganizationSchema, SoftwareApplicationSchema } from '@/components/StructuredData'
import { PhotographyMockup, ConstructionMockup, CafeMockup } from '@/components/WebsiteMockups'

export const metadata: Metadata = {
  title: 'onboard — Done-for-you websites for Australian service businesses',
  description: 'Professional websites built for you, not by you. Ready in 1 week. From $495 setup + $79/month. No DIY stress, no templates. For tradies, cafes, beauty, and service businesses.',
  keywords: 'done-for-you website, service business website, Australian website, tradie website, professional website, website management',
  openGraph: {
    title: 'onboard — Done-for-you websites for Australian service businesses',
    description: 'Professional websites built for you. Ready in 1 week. From $495 setup + $79/month.',
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
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.1]">
            We build your<br />
            website. You run<br />
            <span className="text-neutral-500">your business.</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional done-for-you websites for service businesses. Ready in 1 week, managed forever. From $495.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboard" className="btn btn-primary h-12 px-8 text-base">
              Get Started
            </Link>
            <Link href="#work" className="btn btn-secondary h-12 px-8 text-base">
              See our work
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
            <div className="showcase-item">
              <PhotographyMockup />
            </div>
            <div className="showcase-item">
              <ConstructionMockup />
            </div>
            <div className="showcase-item">
              <CafeMockup />
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/onboard" className="btn btn-primary">
              Get Started
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
              <h3 className="text-xl font-semibold mb-3">Done for you</h3>
              <p className="text-neutral-400 leading-relaxed">
                No DIY, no templates, no stress. We handle everything from design to launch. You just tell us about your business.
              </p>
            </div>
            <div>
              <p className="text-neutral-600 text-4xl font-light mb-4">02</p>
              <h3 className="text-xl font-semibold mb-3">Ready in 1 week</h3>
              <p className="text-neutral-400 leading-relaxed">
                Not months. Your site is designed, written, and live within 7 business days. Professional website in 1 week, not 1 month.
              </p>
            </div>
            <div>
              <p className="text-neutral-600 text-4xl font-light mb-4">03</p>
              <h3 className="text-xl font-semibold mb-3">Managed forever</h3>
              <p className="text-neutral-400 leading-relaxed">
                Unlimited updates, hosting, and security included. Just tell us what you need and we'll handle it. Forever.
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
              { title: 'Professional copywriting', desc: 'We write your content. No staring at blank pages.' },
              { title: 'Image sourcing', desc: 'We find or create the images your site needs.' },
              { title: 'Custom design', desc: 'Unique to your business. No templates.' },
              { title: 'Mobile optimised', desc: 'Perfect on every device, every time.' },
              { title: 'SEO foundation', desc: 'Built to be found on Google from day one.' },
              { title: 'Contact forms & lead capture', desc: 'Leads go straight to your inbox automatically.' },
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
              'Cafes',
              'Hair & Beauty',
              'Photographers',
              'Fitness',
              'Restaurants',
              'Construction',
              'Creative Studios',
            ].map((industry, index) => (
              <p key={index} className="text-neutral-400">{industry}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-neutral-950">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-16 text-center">
              <p className="text-neutral-500 text-sm mb-3 tracking-wide">Pricing</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-neutral-400">
                One investment upfront, then ongoing support every month.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-8">
                <p className="text-neutral-500 text-sm mb-1">Setup Investment</p>
                <p className="text-4xl font-semibold mb-4">$495<span className="text-lg text-neutral-500"></span></p>
                <p className="text-neutral-400 text-sm mb-6">One-time investment to build your site</p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  <li>Custom design & copywriting</li>
                  <li>Professional setup & launch</li>
                  <li>All images sourced</li>
                  <li>SEO foundation</li>
                  <li>Mobile optimised</li>
                  <li>Contact forms included</li>
                </ul>
              </div>

              <div className="card p-8 border-white/20">
                <p className="text-neutral-500 text-sm mb-1">Monthly Management</p>
                <p className="text-4xl font-semibold mb-4">$79<span className="text-lg text-neutral-500">/mo</span></p>
                <p className="text-neutral-400 text-sm mb-6">Ongoing support and management</p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  <li>Unlimited updates & changes</li>
                  <li>Hosting & security</li>
                  <li>SSL certificate</li>
                  <li>Backups & maintenance</li>
                  <li>Priority support</li>
                  <li>Performance monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Let's build your website
          </h2>
          <p className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto">
            Fill out a quick questionnaire and we'll take it from there. Your professional website will be ready in 1 week.
          </p>
          <Link href="/onboard" className="btn btn-primary h-12 px-8 text-base">
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
