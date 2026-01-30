import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Website Builder for Australian Service Businesses | Onboard',
  description: 'Create a unique business website in 60 seconds. Our AI extracts your brand from Instagram to build sites that get customers. Australian hosted, SEO optimized.',
  keywords: 'website builder, AI website builder, small business website, tradie website, Australian website builder, service business website',
  openGraph: {
    title: 'AI Website Builder for Australian Service Businesses | Onboard',
    description: 'Create a unique business website in 60 seconds. Not a template.',
    type: 'website',
    locale: 'en_AU',
  },
}

// Icon components
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const SparkleIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
  </svg>
)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
              <span className="text-navy-950 font-bold text-sm">O</span>
            </div>
            <span className="text-xl font-bold">Onboard</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-navy-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#industries" className="text-navy-300 hover:text-white transition-colors">
              Industries
            </Link>
            <Link href="/pricing" className="text-navy-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/onboard" className="btn btn-primary btn-sm">
              Get Started Free
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-teal-400/5 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-400/10 border border-teal-400/20 mb-8">
            <span className="text-teal-400 text-sm font-medium">Australian Built & Hosted</span>
            <span className="text-xl">🇦🇺</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Your Business Website
            <br />
            <span className="text-gradient">in 60 Seconds. Actually Good.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-navy-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Our AI analyzes your Instagram and competitors to build a website that's
            <span className="text-white font-medium"> uniquely yours</span>.
            Not a template. Not generic. Just results.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/onboard" className="btn btn-primary btn-lg group">
              Build My Website Free
              <ArrowRightIcon />
            </Link>
            <Link href="#how-it-works" className="btn btn-secondary btn-lg">
              See How It Works
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-navy-300">
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>SEO optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>Mobile responsive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-12 px-6 border-y border-white/5 bg-navy-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-1">500+</div>
              <div className="text-navy-400 text-sm">Websites Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-1">60s</div>
              <div className="text-navy-400 text-sm">Average Build Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-1">4.9/5</div>
              <div className="text-navy-400 text-sm">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-1">24/7</div>
              <div className="text-navy-400 text-sm">Australian Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* How Onboard is Different */}
      <section id="how-it-works" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-teal mb-4">How It Works</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Not Just Another Website Builder
            </h2>
            <p className="text-lg text-navy-300 max-w-2xl mx-auto">
              We don't use templates. We extract your brand from your existing digital presence
              to create something genuinely unique.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center text-navy-950 font-bold text-xl">
                1
              </div>
              <div className="card card-hover pt-12 h-full">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-bold mb-3">Tell Us About Your Business</h3>
                <p className="text-navy-300">
                  Enter your business name, Instagram, and a few details. Takes about 2 minutes.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center text-navy-950 font-bold text-xl">
                2
              </div>
              <div className="card card-hover pt-12 h-full">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-3">We Analyze Your Brand</h3>
                <p className="text-navy-300">
                  Our AI extracts colors, imagery, tone, and style from your Instagram and competitors.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center text-navy-950 font-bold text-xl">
                3
              </div>
              <div className="card card-hover pt-12 h-full">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold mb-3">Your Unique Site is Ready</h3>
                <p className="text-navy-300">
                  A professional website built specifically for your business. Not a template, not generic.
                </p>
              </div>
            </div>
          </div>

          {/* What makes us different */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-teal-400/10 to-teal-600/5 border border-teal-400/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">What Makes Us Different</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-teal-400 mt-1"><CheckIcon /></span>
                    <span><strong className="text-white">Instagram Extraction:</strong> <span className="text-navy-300">Your photos, colors, and aesthetic become your website</span></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-400 mt-1"><CheckIcon /></span>
                    <span><strong className="text-white">Competitor Analysis:</strong> <span className="text-navy-300">We study what works in your industry</span></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-400 mt-1"><CheckIcon /></span>
                    <span><strong className="text-white">AI-Written Copy:</strong> <span className="text-navy-300">Professional content in your brand voice</span></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-400 mt-1"><CheckIcon /></span>
                    <span><strong className="text-white">Australian Hosted:</strong> <span className="text-navy-300">Fast loading for local customers</span></span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="browser-mockup glow-subtle">
                  <div className="browser-mockup-header">
                    <div className="browser-mockup-dot bg-red-500"></div>
                    <div className="browser-mockup-dot bg-yellow-500"></div>
                    <div className="browser-mockup-dot bg-green-500"></div>
                    <div className="flex-1 ml-4">
                      <div className="bg-navy-700 rounded px-3 py-1 text-xs text-navy-300 max-w-xs">
                        yoursite.onboard.au
                      </div>
                    </div>
                  </div>
                  <div className="browser-mockup-content flex items-center justify-center text-navy-500">
                    <span className="text-6xl">🚀</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 md:py-28 px-6 bg-navy-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-teal mb-4">Built For Service Businesses</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Websites That Get You Customers
            </h2>
            <p className="text-lg text-navy-300 max-w-2xl mx-auto">
              We specialize in Australian service businesses. Tradies, professionals,
              local shops - we know what works for your industry.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🔧', name: 'Plumbers', desc: 'Emergency callouts' },
              { icon: '⚡', name: 'Electricians', desc: 'Local services' },
              { icon: '📸', name: 'Photographers', desc: 'Portfolio sites' },
              { icon: '💇', name: 'Hair & Beauty', desc: 'Booking ready' },
              { icon: '🏗️', name: 'Builders', desc: 'Project galleries' },
              { icon: '🍳', name: 'Cafes', desc: 'Menu & hours' },
              { icon: '🏋️', name: 'Fitness', desc: 'Class schedules' },
              { icon: '⚖️', name: 'Professionals', desc: 'Trust & credibility' },
            ].map((industry, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-navy-800/50 border border-white/5 hover:border-teal-400/30 hover:bg-navy-800 transition-all duration-300 cursor-pointer"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{industry.icon}</div>
                <div className="font-semibold mb-1">{industry.name}</div>
                <div className="text-sm text-navy-400">{industry.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/onboard" className="btn btn-primary btn-lg">
              Build Your Site Now
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-teal mb-4">Features</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need to Succeed
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🎨',
                title: 'Unique Design',
                desc: 'Every website is generated uniquely based on your brand - never from a template.'
              },
              {
                icon: '🔍',
                title: 'SEO Optimized',
                desc: 'Built to rank on Google from day one with proper meta tags, speed, and structure.'
              },
              {
                icon: '📱',
                title: 'Mobile Perfect',
                desc: '70% of your customers search on mobile. Your site will look great on every device.'
              },
              {
                icon: '🇦🇺',
                title: 'Australian Hosted',
                desc: 'Sydney-based servers mean faster load times for your local customers.'
              },
              {
                icon: '💬',
                title: 'Lead Capture',
                desc: 'Built-in contact forms and call-to-actions designed to convert visitors.'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                desc: 'Optimized code and images for Core Web Vitals performance.'
              },
            ].map((feature, index) => (
              <div key={index} className="card card-hover">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-navy-300 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 px-6 bg-navy-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-teal mb-4">Testimonials</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Trusted by Australian Businesses
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Finally, a website that actually looks like MY business. The AI pulled colors right from my Instagram and it looks incredible.",
                name: "Sarah M.",
                role: "Photographer, Melbourne",
                rating: 5
              },
              {
                quote: "Had my site up in under an hour. Getting 3x more enquiries than my old Wix site. Should have switched sooner.",
                name: "Dave R.",
                role: "Plumber, Sydney",
                rating: 5
              },
              {
                quote: "Love that it's Australian hosted. My site loads so much faster now and customers have noticed the difference.",
                name: "Emma T.",
                role: "Cafe Owner, Brisbane",
                rating: 5
              },
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="flex gap-1 text-teal-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-navy-200 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-navy-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-teal mb-4">Simple Pricing</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Start Free, Upgrade When Ready
            </h2>
            <p className="text-lg text-navy-300">
              See your site before paying anything. No credit card required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <div className="card p-8">
              <div className="text-sm font-medium text-teal-400 mb-2">Preview</div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-navy-400">forever</span>
              </div>
              <p className="text-navy-300 mb-6">See your generated website before committing.</p>
              <ul className="space-y-3 mb-8">
                {['AI-generated website', 'Brand extraction', 'Preview link', 'Unlimited revisions'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-teal-400"><CheckIcon /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/onboard" className="btn btn-secondary w-full">
                Start Free
              </Link>
            </div>

            {/* Launch Plan */}
            <div className="card p-8 border-teal-400/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="badge badge-teal">Most Popular</span>
              </div>
              <div className="text-sm font-medium text-teal-400 mb-2">Launch</div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-navy-400">/month</span>
              </div>
              <p className="text-navy-300 mb-6">Everything you need to launch and grow.</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Preview',
                  'Custom domain',
                  'SSL certificate',
                  'SEO optimization',
                  'Contact forms',
                  'Analytics dashboard',
                  'Priority support',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-teal-400"><CheckIcon /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/onboard" className="btn btn-primary w-full">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 px-6 bg-navy-900/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-teal mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How is this different from Wix or Squarespace?",
                a: "Those platforms give you templates you customize. We use AI to extract your actual brand from your Instagram and competitors, creating something genuinely unique to your business."
              },
              {
                q: "Do I need an Instagram account?",
                a: "It helps! If you have Instagram, we extract your colors, imagery, and aesthetic. Without it, we use competitor analysis and industry best practices."
              },
              {
                q: "Can I make changes after the site is built?",
                a: "Absolutely. You can request changes anytime. On our Launch plan, we also offer text/email updates - just message us what you need changed."
              },
              {
                q: "Is the website mobile-friendly?",
                a: "Yes, 100%. All sites are fully responsive and optimized for mobile devices where most of your customers will find you."
              },
              {
                q: "How long does it take to build?",
                a: "The AI generates your site in about 60 seconds. You can preview it immediately and launch the same day if you're happy with it."
              },
            ].map((faq, index) => (
              <div key={index} className="card">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-navy-300 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-teal-400/10 rounded-3xl blur-3xl" />
            <div className="relative bg-navy-800/50 border border-teal-400/20 rounded-3xl p-12 md:p-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Get More Customers?
              </h2>
              <p className="text-lg text-navy-300 mb-8 max-w-xl mx-auto">
                Join 500+ Australian businesses using Onboard.
                See your site in 60 seconds - no credit card required.
              </p>
              <Link href="/onboard" className="btn btn-primary btn-lg">
                Build My Website Free
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
                  <span className="text-navy-950 font-bold text-sm">O</span>
                </div>
                <span className="text-xl font-bold">Onboard</span>
              </div>
              <p className="text-navy-400 text-sm mb-4">
                AI website builder for Australian service businesses.
                Get a unique site that gets you customers.
              </p>
              <div className="flex items-center gap-2 text-sm text-navy-400">
                <span>🇦🇺</span>
                <span>Made in Melbourne</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-3 text-sm">
                <Link href="#how-it-works" className="block text-navy-400 hover:text-white transition-colors">How It Works</Link>
                <Link href="#industries" className="block text-navy-400 hover:text-white transition-colors">Industries</Link>
                <Link href="/pricing" className="block text-navy-400 hover:text-white transition-colors">Pricing</Link>
                <Link href="/onboard" className="block text-navy-400 hover:text-white transition-colors">Get Started</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Industries</h4>
              <div className="space-y-3 text-sm">
                <Link href="/industries/tradies" className="block text-navy-400 hover:text-white transition-colors">Tradies</Link>
                <Link href="/industries/photographers" className="block text-navy-400 hover:text-white transition-colors">Photographers</Link>
                <Link href="/industries/cafes" className="block text-navy-400 hover:text-white transition-colors">Cafes & Restaurants</Link>
                <Link href="/industries/professionals" className="block text-navy-400 hover:text-white transition-colors">Professionals</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-3 text-sm">
                <a href="mailto:hello@onboard.com.au" className="block text-navy-400 hover:text-white transition-colors">
                  hello@onboard.com.au
                </a>
                <span className="block text-navy-400">Melbourne, Australia</span>
              </div>
            </div>
          </div>

          <div className="divider mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-navy-500">
            <div>© 2024 Onboard. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
