import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Onboard — The website builder that learns your brand',
  description: 'Generate a professional website in seconds. Our AI analyzes your Instagram and industry to create something uniquely yours. Trusted by Australian service businesses.',
  keywords: 'AI website builder, service business website, Australian website builder, tradie website, professional websites',
  openGraph: {
    title: 'Onboard — The website builder that learns your brand',
    description: 'Generate a professional website in seconds. Our AI analyzes your Instagram and industry.',
    type: 'website',
    locale: 'en_AU',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-base font-semibold tracking-tight">
            onboard
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm text-[#888] hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/onboard" className="btn btn-primary text-sm h-9 px-4">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#666] text-sm mb-6 tracking-wide uppercase">
            AI-Powered Website Generation
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-8">
            Build sites that<br />
            <span className="text-gradient">look like you</span>
          </h1>
          <p className="text-[#888] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Onboard analyzes your Instagram, studies your competitors, and generates a
            website that captures your brand. Not a template. Something actually yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboard" className="btn btn-primary h-12 px-8 text-base">
              Start for free
            </Link>
            <Link href="#showcase" className="btn btn-secondary h-12 px-8 text-base">
              View examples
            </Link>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="section bg-[#0a0a0a]">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[#666] text-sm mb-2">Recent projects</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Every site is unique
              </h2>
            </div>
            <Link href="/onboard" className="text-sm text-[#888] hover:text-white transition-colors">
              Create yours →
            </Link>
          </div>

          <div className="showcase-grid">
            {[
              {
                name: 'Matthew Krueger Photography',
                type: 'Fashion & Beauty',
                url: 'https://onboard-amber.vercel.app/site/matthew-krueger-photography-',
                gradient: 'from-amber-900/40 to-stone-900/60',
              },
              {
                name: 'Spacez',
                type: 'Commercial Fitouts',
                url: 'https://onboard-amber.vercel.app/site/spacez',
                gradient: 'from-blue-900/40 to-slate-900/60',
              },
              {
                name: 'Sunrise Coffee Co',
                type: 'Cafe & Restaurant',
                url: 'https://onboard-amber.vercel.app/site/sunrise-coffee-co',
                gradient: 'from-orange-900/40 to-stone-900/60',
              },
            ].map((site, index) => (
              <a
                key={index}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="showcase-item group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${site.gradient}`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/10 text-6xl font-light">
                    {site.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div className="showcase-overlay opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-medium text-sm">{site.name}</p>
                  <p className="text-[#888] text-xs">{site.type}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-[#666] text-sm mb-2">How it works</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-16">
              From zero to published<br />in under a minute
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                step: '01',
                title: 'Connect your brand',
                description: 'Enter your business name and Instagram. Our AI immediately begins analyzing your visual identity, color palette, and aesthetic.',
              },
              {
                step: '02',
                title: 'AI does the work',
                description: 'We study your competitors, extract your brand elements, and generate professional copy. No templates, no generic designs.',
              },
              {
                step: '03',
                title: 'Launch instantly',
                description: 'Preview your site immediately. Make adjustments if needed, connect your domain, and go live. All in one session.',
              },
            ].map((item, index) => (
              <div key={index}>
                <p className="text-[#333] text-5xl font-light mb-4">{item.step}</p>
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-[#888] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-[#0a0a0a]">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <p className="text-[#666] text-sm mb-2">Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Built for performance,<br />designed for conversion
            </h2>
          </div>

          <div className="feature-grid">
            {[
              { title: 'Brand Extraction', description: 'AI analyzes your Instagram to capture colors, style, and visual identity' },
              { title: 'Competitor Analysis', description: 'Studies top performers in your industry for proven layouts and messaging' },
              { title: 'SEO Optimized', description: 'Built-in meta tags, semantic HTML, and performance optimization' },
              { title: 'Mobile-First', description: 'Responsive design that looks exceptional on every device' },
              { title: 'Fast Hosting', description: 'Australian servers with global CDN for instant load times' },
              { title: 'Lead Capture', description: 'Integrated contact forms designed to convert visitors' },
            ].map((feature, index) => (
              <div key={index} className="feature-item">
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <p className="text-[#666] text-sm mb-2">Industries</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Purpose-built for<br />service businesses
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-12">
            {[
              'Photographers',
              'Tradies',
              'Cafes & Restaurants',
              'Hair & Beauty',
              'Fitness Studios',
              'Construction',
              'Professional Services',
              'Creative Agencies',
            ].map((industry, index) => (
              <p key={index} className="text-[#888]">{industry}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-[#0a0a0a]">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <p className="text-[#666] text-sm mb-2">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Transparent pricing.<br />No surprises.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            <div className="card p-8">
              <p className="text-[#666] text-sm mb-1">Preview</p>
              <p className="text-4xl font-semibold mb-4">Free</p>
              <p className="text-[#888] text-sm mb-8">See your site before you commit. No credit card required.</p>
              <div className="space-y-3 text-sm text-[#888]">
                <p>AI-generated website</p>
                <p>Brand extraction</p>
                <p>Shareable preview link</p>
                <p>Unlimited regenerations</p>
              </div>
            </div>

            <div className="card p-8 border-white/20">
              <p className="text-[#666] text-sm mb-1">Launch</p>
              <p className="text-4xl font-semibold mb-4">$49<span className="text-lg text-[#666]">/mo</span></p>
              <p className="text-[#888] text-sm mb-8">Everything you need to go live and grow.</p>
              <div className="space-y-3 text-sm text-[#888]">
                <p>Custom domain</p>
                <p>SSL certificate</p>
                <p>SEO optimization</p>
                <p>Contact forms</p>
                <p>Analytics dashboard</p>
                <p>Priority support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            Ready to build?
          </h2>
          <p className="text-[#888] text-lg mb-10 max-w-md mx-auto">
            See your website in under a minute. Free to preview, no credit card required.
          </p>
          <Link href="/onboard" className="btn btn-primary h-12 px-8 text-base">
            Get started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#222] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <p className="font-semibold mb-2">onboard</p>
              <p className="text-[#666] text-sm">AI websites for service businesses</p>
            </div>
            <div className="flex gap-8 text-sm text-[#666]">
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <a href="mailto:hello@onboard.com.au" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#222] text-sm text-[#444]">
            © 2024 Onboard. Melbourne, Australia.
          </div>
        </div>
      </footer>
    </div>
  )
}
