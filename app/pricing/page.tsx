'use client'

import Link from 'next/link'
import { TIERS, ADDONS } from '@/lib/stripe/plans'
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
            Transparent pricing
          </h1>
          <p className="text-neutral-400 text-lg">
            Premium middle ground between DIY tools and expensive agencies. No hidden fees, no contracts.
          </p>
        </div>
      </section>

      {/* 3-Tier Pricing */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="card p-8">
              <p className="text-neutral-500 text-sm mb-4">{TIERS.starter.name}</p>
              <div className="mb-1">
                <span className="text-4xl font-semibold">${TIERS.starter.setupFee}</span>
                <span className="text-neutral-400 text-lg"> setup</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-semibold">${TIERS.starter.monthlyFee}</span>
                <span className="text-neutral-400 text-lg">/month</span>
              </div>
              <p className="text-neutral-400 text-sm mb-8">{TIERS.starter.description}</p>

              <ul className="space-y-3 mb-8">
                {TIERS.starter.features.map((feature) => (
                  <li key={feature} className="text-sm text-neutral-300 flex items-start gap-3">
                    <span className="text-white/70 mt-0.5 flex-shrink-0">&#10003;</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/onboard" className="btn btn-secondary w-full justify-center">
                Get started
              </Link>
            </div>

            {/* Growth — Featured */}
            <div className="card p-8 border-white/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 rounded-full text-xs font-medium">
                Most popular
              </div>
              <p className="text-neutral-500 text-sm mb-4">{TIERS.growth.name}</p>
              <div className="mb-1">
                <span className="text-4xl font-semibold">${TIERS.growth.setupFee}</span>
                <span className="text-neutral-400 text-lg"> setup</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-semibold">${TIERS.growth.monthlyFee}</span>
                <span className="text-neutral-400 text-lg">/month</span>
              </div>
              <p className="text-neutral-400 text-sm mb-8">{TIERS.growth.description}</p>

              <ul className="space-y-3 mb-8">
                {TIERS.growth.features.map((feature) => (
                  <li key={feature} className="text-sm text-neutral-300 flex items-start gap-3">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">&#10003;</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/onboard" className="btn btn-primary w-full justify-center">
                Get started &rarr;
              </Link>
            </div>

            {/* Pro */}
            <div className="card p-8">
              <p className="text-neutral-500 text-sm mb-4">{TIERS.pro.name}</p>
              <div className="mb-1">
                <span className="text-4xl font-semibold">${TIERS.pro.setupFee.toLocaleString()}</span>
                <span className="text-neutral-400 text-lg"> setup</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-semibold">${TIERS.pro.monthlyFee}</span>
                <span className="text-neutral-400 text-lg">/month</span>
              </div>
              <p className="text-neutral-400 text-sm mb-8">{TIERS.pro.description}</p>

              <ul className="space-y-3 mb-8">
                {TIERS.pro.features.map((feature) => (
                  <li key={feature} className="text-sm text-neutral-300 flex items-start gap-3">
                    <span className="text-white/70 mt-0.5 flex-shrink-0">&#10003;</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/onboard" className="btn btn-secondary w-full justify-center">
                Get started
              </Link>
            </div>
          </div>

          <p className="text-center text-neutral-500 text-sm mt-8">
            No contracts. Cancel anytime. 100% money-back guarantee on setup.
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-12">How we compare</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-8">
              <h3 className="font-semibold text-lg mb-4">DIY Tools</h3>
              <div className="mb-6">
                <p className="text-sm text-neutral-400 mb-1">Starting cost</p>
                <p className="text-2xl font-semibold">$15-40/mo</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#10007;</span>
                  <span>You do everything</span>
                </li>
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#10007;</span>
                  <span>No professional copywriting</span>
                </li>
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#10007;</span>
                  <span>Time-consuming setup</span>
                </li>
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#10007;</span>
                  <span>Limited support</span>
                </li>
              </ul>
              <p className="text-xs text-neutral-500">Best for: Technical founders</p>
            </div>

            <div className="card p-8 border-white/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 rounded-full text-xs font-medium">
                Best value
              </div>
              <h3 className="font-semibold text-lg mb-4">Onboard</h3>
              <div className="mb-6">
                <p className="text-sm text-neutral-400 mb-1">Starting from</p>
                <p className="text-2xl font-semibold">$495 + $79/mo</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-sm text-neutral-300 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&#10003;</span>
                  <span>Done-for-you design & content</span>
                </li>
                <li className="text-sm text-neutral-300 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&#10003;</span>
                  <span>Professional copywriting</span>
                </li>
                <li className="text-sm text-neutral-300 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&#10003;</span>
                  <span>Ready in 1 week</span>
                </li>
                <li className="text-sm text-neutral-300 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&#10003;</span>
                  <span>Unlimited support</span>
                </li>
              </ul>
              <p className="text-xs text-neutral-500">Best for: Busy business owners</p>
            </div>

            <div className="card p-8">
              <h3 className="font-semibold text-lg mb-4">Agencies</h3>
              <div className="mb-6">
                <p className="text-sm text-neutral-400 mb-1">Starting cost</p>
                <p className="text-2xl font-semibold">$5K-15K</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">!</span>
                  <span>6-12 week timeline</span>
                </li>
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">!</span>
                  <span>High upfront cost</span>
                </li>
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&#10003;</span>
                  <span>Professional quality</span>
                </li>
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&#10003;</span>
                  <span>Full service support</span>
                </li>
              </ul>
              <p className="text-xs text-neutral-500">Best for: Enterprise clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="pb-24 px-6 bg-neutral-950/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-4">Powerful add-ons</h2>
          <p className="text-neutral-400 text-center mb-12">Available on any plan. Add or remove anytime.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(ADDONS).map(([key, addon]) => (
              <div key={key} className="card p-6">
                <h3 className="font-semibold mb-1">{addon.name}</h3>
                <p className="text-2xl font-bold text-white mb-4">
                  ${addon.price}
                  <span className="text-sm text-neutral-400 font-normal">/mo</span>
                </p>
                <p className="text-sm text-neutral-400">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-neutral-950">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-12 text-center">Questions</h2>

            <div className="space-y-8">
              {[
                { q: "What's included in the setup fee?", a: 'Website design, professional copywriting, image sourcing, optimization, mobile responsiveness, SEO foundation, form setup, and launching your site live.' },
                { q: 'Can I upgrade my plan later?', a: 'Yes. Start with Starter and upgrade to Growth or Pro anytime. We handle the migration — no downtime, no extra setup fee.' },
                { q: 'What if I need changes after launch?', a: 'Starter includes 1 revision/month, Growth includes 3, and Pro includes unlimited. Need more? Just upgrade.' },
                { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no cancellation fees. Cancel whenever you want. Your domain stays yours.' },
                { q: 'Do I own my website?', a: 'You own your content and data. If you leave, we export everything for you. Your custom domain remains yours.' },
                { q: 'How fast is the setup?', a: 'Your website launches within 7 business days of completing the questionnaire. Most sites are ready even sooner.' },
              ].map((faq, i) => (
                <div key={i}>
                  <h3 className="font-medium mb-2">{faq.q}</h3>
                  <p className="text-neutral-400 text-sm">{faq.a}</p>
                </div>
              ))}
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
            Your professional website, live within a week. No setup headaches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboard" className="btn btn-primary h-12 px-8 text-base">
              Get your website &rarr;
            </Link>
            <Link href="/roi-calculator" className="btn btn-secondary h-12 px-8 text-base">
              Calculate your ROI
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
