'use client'

import Link from 'next/link'
import { PLANS } from '@/lib/stripe/plans'
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-brand-blue">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-black">
          Onboard 🛫
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#how-it-works" className="hover:underline">How It Works</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <Link href="/" className="btn btn-lime">
            Get Started →
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-6 py-12 md:py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 tracking-tight">
          Simple pricing 💰
          <br />
          <span className="text-brand-lime">No surprises.</span>
        </h1>
        <p className="text-xl opacity-90">
          No setup fees. No contracts. No hidden costs. Cancel anytime.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="bg-brand-lime py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <PricingCard
              plan="starter"
              name={PLANS.starter.name}
              price={PLANS.starter.price}
              features={PLANS.starter.features}
            />

            {/* Growth */}
            <PricingCard
              plan="growth"
              name={PLANS.growth.name}
              price={PLANS.growth.price}
              features={PLANS.growth.features}
              popular
            />

            {/* Pro */}
            <PricingCard
              plan="pro"
              name={PLANS.pro.name}
              price={PLANS.pro.price}
              features={PLANS.pro.features}
            />
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="bg-brand-black py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-6">Questions? 🤔</h2>
          <div className="space-y-4 text-left">
            <details className="bg-white/5 rounded-xl p-4 cursor-pointer">
              <summary className="font-bold">What if I need more updates?</summary>
              <p className="mt-3 opacity-70">Upgrade anytime, or we can do one-off updates for $10 each. No drama.</p>
            </details>
            <details className="bg-white/5 rounded-xl p-4 cursor-pointer">
              <summary className="font-bold">Can I cancel anytime?</summary>
              <p className="mt-3 opacity-70">Yep. No contracts, no cancellation fees. Cancel whenever you want.</p>
            </details>
            <details className="bg-white/5 rounded-xl p-4 cursor-pointer">
              <summary className="font-bold">Do I own my website?</summary>
              <p className="mt-3 opacity-70">You own your content. If you leave, we'll export everything for you.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-black py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-8">
          <div>
            <div className="text-xl font-black mb-2">Onboard 🛫</div>
            <p className="opacity-60 text-sm">Get results, no bullsh*t.</p>
          </div>
          <div className="flex gap-8 text-sm opacity-60">
            <Link href="/" className="hover:opacity-100">Home</Link>
            <Link href="/pricing" className="hover:opacity-100">Pricing</Link>
            <a href="mailto:hello@onboard.com.au" className="hover:opacity-100">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function PricingCard({
  plan,
  name,
  price,
  features,
  popular = false,
}: {
  plan: string
  name: string
  price: number
  features: string[]
  popular?: boolean
}) {
  return (
    <div
      className={`rounded-2xl p-6 relative ${
        popular
          ? 'bg-brand-black text-white scale-105'
          : 'bg-black/15 text-brand-black'
      }`}
    >
      {popular && (
        <div className="absolute -top-3 right-4 bg-brand-pink text-white px-3 py-1 rounded-full text-xs font-bold">
          🔥 Most Popular
        </div>
      )}

      <div className="font-bold text-lg mb-1">{name}</div>
      <div className="text-5xl font-black mb-1">
        ${price}
        <span className="text-base font-medium opacity-60">/mo</span>
      </div>
      <div className="text-sm opacity-70 mb-6">
        {plan === 'starter' && 'Get online fast'}
        {plan === 'growth' && 'Best for growing businesses'}
        {plan === 'pro' && 'For serious businesses'}
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature) => (
          <li key={feature} className="text-sm border-b border-gray-500/20 pb-2">
            ✅ {feature}
          </li>
        ))}
      </ul>

      <Link
        href={`/checkout?plan=${plan}`}
        className={`btn w-full justify-center ${
          popular ? 'btn-lime' : 'btn-black'
        }`}
      >
        Get Started
      </Link>
    </div>
  )
}
