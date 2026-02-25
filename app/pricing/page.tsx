'use client'

import Link from 'next/link'
import { PLANS, ADDONS, SETUP_FEE, MONTHLY_FEE } from '@/lib/stripe/plans'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PricingPage() {
  const totalAddonPrice = Object.values(ADDONS).reduce((sum, addon) => sum + addon.price, 0)

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Transparent pricing
          </h1>
          <p className="text-neutral-400 text-lg">
            Premium middle ground between DIY tools and expensive agencies.
          </p>
        </div>
      </section>

      {/* Main Pricing Card */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="card p-10 border-white/30">
            <p className="text-neutral-500 text-sm mb-6">
              {PLANS.standard.name}
            </p>

            {/* Price breakdown */}
            <div className="mb-10">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-semibold">${SETUP_FEE}</span>
                <span className="text-neutral-400 text-lg">setup</span>
              </div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-semibold">${MONTHLY_FEE}</span>
                <span className="text-neutral-400 text-lg">/month</span>
              </div>
              <p className="text-neutral-400 text-sm">
                No contracts. Cancel anytime. One-time setup includes design, content, and launch.
              </p>
            </div>

            {/* Features */}
            <div className="mb-10">
              <h3 className="font-semibold mb-4 text-sm">What's included:</h3>
              <ul className="space-y-3">
                {PLANS.standard.features.map((feature) => (
                  <li key={feature} className="text-sm text-neutral-300 flex items-start gap-3">
                    <span className="text-white/70 mt-0.5 flex-shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Link
              href="/onboard"
              className="btn btn-primary w-full justify-center"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-12">How we compare</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* DIY */}
            <div className="card p-8">
              <h3 className="font-semibold text-lg mb-4">DIY Tools</h3>
              <div className="mb-6">
                <p className="text-sm text-neutral-400 mb-1">Starting cost</p>
                <p className="text-2xl font-semibold">$15–40/mo</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>You do everything</span>
                </li>
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>No professional copywriting</span>
                </li>
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>Time-consuming setup</span>
                </li>
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>Limited support</span>
                </li>
              </ul>

              <p className="text-xs text-neutral-500">Best for: Technical founders</p>
            </div>

            {/* Onboard - Featured */}
            <div className="card p-8 border-white/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 rounded-full text-xs font-medium">
                Best value
              </div>
              <h3 className="font-semibold text-lg mb-4">Onboard</h3>
              <div className="mb-6">
                <p className="text-sm text-neutral-400 mb-1">Total investment</p>
                <p className="text-2xl font-semibold">${SETUP_FEE + MONTHLY_FEE}/first month</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="text-sm text-neutral-300 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Done-for-you design & content</span>
                </li>
                <li className="text-sm text-neutral-300 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Professional copywriting</span>
                </li>
                <li className="text-sm text-neutral-300 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Launch in 24 hours</span>
                </li>
                <li className="text-sm text-neutral-300 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Expert support</span>
                </li>
              </ul>

              <p className="text-xs text-neutral-500">Best for: Busy business owners</p>
            </div>

            {/* Agencies */}
            <div className="card p-8">
              <h3 className="font-semibold text-lg mb-4">Agencies</h3>
              <div className="mb-6">
                <p className="text-sm text-neutral-400 mb-1">Starting cost</p>
                <p className="text-2xl font-semibold">$5K–15K</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">⚠</span>
                  <span>Long implementation timeline</span>
                </li>
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">⚠</span>
                  <span>High upfront cost</span>
                </li>
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Professional quality</span>
                </li>
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>Full service support</span>
                </li>
              </ul>

              <p className="text-xs text-neutral-500">Best for: Enterprise clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="pb-24 px-6 bg-neutral-950/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-12">Powerful add-ons</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(ADDONS).map(([key, addon]) => (
              <div key={key} className="card p-6">
                <h3 className="font-semibold mb-1">{addon.name}</h3>
                <p className="text-2xl font-bold text-white mb-4">
                  ${addon.price}
                  <span className="text-sm text-neutral-400 font-normal">/mo</span>
                </p>
                <p className="text-sm text-neutral-400 mb-6">{addon.description}</p>
                <button className="btn btn-secondary w-full justify-center text-sm">
                  Add to plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One-time Services Section */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-12">One-time services</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-8">
              <h3 className="font-semibold text-lg mb-2">Professional Photography</h3>
              <p className="text-2xl font-bold text-white mb-4">
                $200
              </p>
              <p className="text-sm text-neutral-400 mb-6">
                Product photography, team photos, or location shoots for your website. Includes basic editing and optimization.
              </p>
              <button className="btn btn-secondary w-full justify-center text-sm">
                Add service
              </button>
            </div>

            <div className="card p-8">
              <h3 className="font-semibold text-lg mb-2">Logo & Branding</h3>
              <p className="text-2xl font-bold text-white mb-4">
                $150
              </p>
              <p className="text-sm text-neutral-400 mb-6">
                Custom logo design, brand color palette, typography guidelines, and brand assets for use across your site and marketing.
              </p>
              <button className="btn btn-secondary w-full justify-center text-sm">
                Add service
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-neutral-950">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-12 text-center">Questions</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-medium mb-2">What's included in the setup fee?</h3>
                <p className="text-neutral-400 text-sm">
                  Your $495 setup covers website design, professional copywriting, image sourcing, optimization, mobile responsiveness, SEO foundation, form setup, and launching your site live.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Can I add or remove add-ons anytime?</h3>
                <p className="text-neutral-400 text-sm">
                  Yes. You can add or remove add-ons at any time. Changes take effect the next billing cycle.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">What if I need changes after launch?</h3>
                <p className="text-neutral-400 text-sm">
                  Unlimited content updates are included in your monthly fee. Need design changes? Contact our support team for options.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Can I cancel anytime?</h3>
                <p className="text-neutral-400 text-sm">
                  Yes. No contracts, no cancellation fees. Cancel whenever you want. The setup fee is non-refundable, but your site remains live.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Do I own my website?</h3>
                <p className="text-neutral-400 text-sm">
                  You own your content and data. If you leave, we'll export everything for you. Your custom domain remains yours.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">How fast is the setup?</h3>
                <p className="text-neutral-400 text-sm">
                  Your website launches within 24 hours of signing up. We handle everything—design, copywriting, images, optimization, and going live.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">What if I want to upgrade later?</h3>
                <p className="text-neutral-400 text-sm">
                  Your base plan includes all the essentials. Add-ons like E-commerce, Booking, or SEO Booster can be added anytime as your business grows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Ready to get started?
          </h2>
          <p className="text-neutral-400 mb-8">
            Launch your professional website in 24 hours. No setup headaches.
          </p>
          <Link href="/onboard" className="btn btn-primary h-12 px-8 text-base">
            Get started
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
