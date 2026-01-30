import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Onboard — AI websites for service businesses',
  description: 'Professional websites generated from your Instagram in 60 seconds. Built for Australian tradies, photographers, and local businesses.',
  keywords: 'website builder, AI website, small business, tradie website, Australian',
  openGraph: {
    title: 'Onboard — AI websites for service businesses',
    description: 'Professional websites generated from your Instagram in 60 seconds.',
    type: 'website',
    locale: 'en_AU',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Onboard
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
              Pricing
            </Link>
            <Link href="/onboard" className="btn btn-primary text-sm py-2 px-4">
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-8">
            Your website,
            <br />
            <span className="text-gray-400">built from your brand.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mb-10 leading-relaxed">
            We extract your colors, style, and content from Instagram to create
            a website that's actually yours. Ready in 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/onboard" className="btn btn-primary btn-lg">
              Start free
            </Link>
            <Link href="#work" className="btn btn-secondary btn-lg">
              See examples
            </Link>
          </div>
        </div>
      </section>

      {/* Example Sites */}
      <section id="work" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-sm text-gray-400 mb-3">Recent work</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Every site is unique
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Example 1 */}
            <a
              href="https://onboard-amber.vercel.app/site/matthew-krueger-photography-"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <span className="text-white/20 text-6xl font-light">MK</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>
              <h3 className="font-medium mb-1 group-hover:text-gray-600 transition-colors">
                Matthew Krueger Photography
              </h3>
              <p className="text-sm text-gray-400">Fashion & Beauty Photographer, Melbourne</p>
            </a>

            {/* Example 2 */}
            <a
              href="https://onboard-amber.vercel.app/site/spacez"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center">
                  <span className="text-white/20 text-6xl font-light">SZ</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>
              <h3 className="font-medium mb-1 group-hover:text-gray-600 transition-colors">
                Spacez
              </h3>
              <p className="text-sm text-gray-400">Commercial Fitouts, Melbourne</p>
            </a>
          </div>

          <div className="mt-12 text-center">
            <Link href="/onboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Create yours →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="text-sm text-gray-400 mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Three steps. One minute.
            </h2>
          </div>

          <div className="space-y-12">
            <div className="flex gap-8">
              <div className="text-4xl font-light text-gray-200 w-12 shrink-0">01</div>
              <div>
                <h3 className="text-xl font-medium mb-2">Enter your details</h3>
                <p className="text-gray-500">Business name, Instagram handle, and what you do. That's it.</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="text-4xl font-light text-gray-200 w-12 shrink-0">02</div>
              <div>
                <h3 className="text-xl font-medium mb-2">We analyze your brand</h3>
                <p className="text-gray-500">Our AI extracts your colors, aesthetic, and tone from your Instagram and competitors.</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="text-4xl font-light text-gray-200 w-12 shrink-0">03</div>
              <div>
                <h3 className="text-xl font-medium mb-2">Your site is ready</h3>
                <p className="text-gray-500">A professional website built specifically for your business. Preview it instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For service businesses */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="text-sm text-gray-400 mb-3">Built for</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Australian service businesses
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              'Photographers',
              'Tradies',
              'Cafes',
              'Hair & Beauty',
              'Fitness',
              'Builders',
              'Consultants',
              'Creatives',
            ].map((industry) => (
              <div key={industry} className="text-gray-600">
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="text-sm text-gray-400 mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Simple and transparent
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-gray-100">
              <p className="text-sm text-gray-400 mb-2">Preview</p>
              <p className="text-4xl font-semibold mb-4">Free</p>
              <p className="text-gray-500 mb-8">See your generated site before committing.</p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>AI-generated website</li>
                <li>Brand extraction</li>
                <li>Shareable preview link</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl border border-gray-900 bg-gray-900 text-white">
              <p className="text-sm text-gray-400 mb-2">Launch</p>
              <p className="text-4xl font-semibold mb-4">$49<span className="text-lg font-normal text-gray-400">/mo</span></p>
              <p className="text-gray-400 mb-8">Everything you need to go live.</p>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>Custom domain</li>
                <li>SSL included</li>
                <li>SEO optimized</li>
                <li>Contact forms</li>
                <li>Analytics</li>
                <li>Australian hosted</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Ready to get started?
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            See your website in 60 seconds. Free to preview.
          </p>
          <Link href="/onboard" className="btn bg-white text-gray-900 hover:bg-gray-100 btn-lg">
            Start free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="font-semibold mb-1">Onboard</p>
              <p className="text-sm text-gray-400">AI websites for service businesses</p>
            </div>
            <div className="flex gap-8 text-sm text-gray-500">
              <Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
              <a href="mailto:hello@onboard.com.au" className="hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-sm text-gray-400">
            © 2024 Onboard. Melbourne, Australia.
          </div>
        </div>
      </footer>
    </div>
  )
}
