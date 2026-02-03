'use client'

import Link from 'next/link'
import { PLANS } from '@/lib/stripe/plans'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Simple pricing
          </h1>
          <p className="text-neutral-400 text-lg">
            Preview free. Pay only when you're ready to launch.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="card p-8">
              <p className="text-neutral-500 text-sm mb-1">{PLANS.starter.name}</p>
              <p className="text-4xl font-semibold mb-2">
                ${PLANS.starter.price}
                <span className="text-lg text-neutral-500">/mo</span>
              </p>
              <p className="text-neutral-400 text-sm mb-8">Get online quickly</p>

              <ul className="space-y-3 mb-8">
                {PLANS.starter.features.map((feature) => (
                  <li key={feature} className="text-sm text-neutral-400 flex items-start gap-2">
                    <span className="text-white mt-0.5">·</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={`/checkout?plan=starter`}
                className="btn btn-secondary w-full justify-center"
              >
                Get started
              </Link>
            </div>

            {/* Growth - Featured */}
            <div className="card p-8 border-white/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 rounded-full text-xs font-medium">
                Most popular
              </div>
              <p className="text-neutral-500 text-sm mb-1">{PLANS.growth.name}</p>
              <p className="text-4xl font-semibold mb-2">
                ${PLANS.growth.price}
                <span className="text-lg text-neutral-500">/mo</span>
              </p>
              <p className="text-neutral-400 text-sm mb-8">Best for growing businesses</p>

              <ul className="space-y-3 mb-8">
                {PLANS.growth.features.map((feature) => (
                  <li key={feature} className="text-sm text-neutral-400 flex items-start gap-2">
                    <span className="text-white mt-0.5">·</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={`/checkout?plan=growth`}
                className="btn btn-primary w-full justify-center"
              >
                Get started
              </Link>
            </div>

            {/* Pro */}
            <div className="card p-8">
              <p className="text-neutral-500 text-sm mb-1">{PLANS.pro.name}</p>
              <p className="text-4xl font-semibold mb-2">
                ${PLANS.pro.price}
                <span className="text-lg text-neutral-500">/mo</span>
              </p>
              <p className="text-neutral-400 text-sm mb-8">For established businesses</p>

              <ul className="space-y-3 mb-8">
                {PLANS.pro.features.map((feature) => (
                  <li key={feature} className="text-sm text-neutral-400 flex items-start gap-2">
                    <span className="text-white mt-0.5">·</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={`/checkout?plan=pro`}
                className="btn btn-secondary w-full justify-center"
              >
                Get started
              </Link>
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
                <h3 className="font-medium mb-2">Can I cancel anytime?</h3>
                <p className="text-neutral-400 text-sm">
                  Yes. No contracts, no cancellation fees. Cancel whenever you want.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">What if I need changes to my site?</h3>
                <p className="text-neutral-400 text-sm">
                  Request changes anytime. Updates included in your plan, or $10 each for one-offs.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Do I own my website?</h3>
                <p className="text-neutral-400 text-sm">
                  You own your content. If you leave, we'll export everything for you.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">How long does it take?</h3>
                <p className="text-neutral-400 text-sm">
                  Your preview is ready in minutes. Once you subscribe, your site goes live within 24 hours.
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
            Preview your site for free. No credit card required.
          </p>
          <Link href="/onboard" className="btn btn-primary h-12 px-8 text-base">
            Create your site
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
