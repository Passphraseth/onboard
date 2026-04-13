import Link from 'next/link'
import { Metadata } from 'next'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { OrganizationSchema, SoftwareApplicationSchema } from '@/components/StructuredData'
import { PhotographyMockup, ConstructionMockup, CafeMockup } from '@/components/WebsiteMockups'

export const metadata: Metadata = {
  title: 'onboard — Done-for-you websites for Australian service businesses',
  description: 'Professional websites built for you, not by you. Ready in 1 week. From $495 setup + $79/month. No DIY stress, no templates. For tradies, cafes, beauty, and service businesses across Australia.',
  keywords: 'done-for-you website, service business website, Australian website, tradie website, professional website, website management, website for tradies',
  openGraph: {
    title: 'onboard — Done-for-you websites for Australian service businesses',
    description: 'Professional websites built for you. Ready in 1 week. From $495 setup + $79/month.',
    type: 'website',
    locale: 'en_AU',
  },
}

const INDUSTRIES = [
  { name: 'Tradies', href: '/websites-for-tradies' },
  { name: 'Plumbers', href: '/websites-for-plumbers' },
  { name: 'Electricians', href: '/websites-for-electricians' },
  { name: 'Builders', href: '/websites-for-builders' },
  { name: 'Cafes', href: '/websites-for-cafes' },
  { name: 'Hair & Beauty', href: '/websites-for-hairdressers' },
  { name: 'Photographers', href: '/websites-for-photographers' },
  { name: 'Fitness', href: '/websites-for-personal-trainers' },
]

const FAQS = [
  {
    q: 'How long does it take to get my website?',
    a: 'Your professional website is designed, written, and launched within 7 business days. Most sites are ready even sooner.',
  },
  {
    q: 'Do I need to provide content or images?',
    a: 'No. We handle everything — copywriting, image sourcing, design. Just tell us about your business and we do the rest.',
  },
  {
    q: 'Can I make changes after launch?',
    a: 'Unlimited content updates are included in every plan. Just email us what you need changed and we handle it within 24 hours.',
  },
  {
    q: 'What if I want to cancel?',
    a: 'No contracts, no lock-ins. Cancel anytime. Your domain stays yours. We can export all your content if you leave.',
  },
  {
    q: 'Do I own my website?',
    a: 'You own all your content and data. Your domain is registered in your name. If you leave, everything comes with you.',
  },
  {
    q: 'How is this different from Wix or Squarespace?',
    a: 'Those are DIY tools — you still have to build it yourself. We do everything for you. No learning curve, no wasted weekends. Just a professional site, done.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <OrganizationSchema />
      <SoftwareApplicationSchema />
      <Navbar />

      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col justify-center px-6 pt-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-1.5 text-sm text-neutral-400 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Accepting new clients for April
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.1]">
            We build your<br />
            website. You run<br />
            <span className="text-neutral-500">your business.</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional done-for-you websites for Australian service businesses. Ready in 1 week, managed forever. From $495.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/onboard" className="btn btn-primary h-12 px-8 text-base">
              Get your website &rarr;
            </Link>
            <Link href="/free-audit" className="btn btn-secondary h-12 px-8 text-base">
              Free website audit
            </Link>
          </div>
          <p className="text-neutral-600 text-sm">
            No contracts. Cancel anytime. 100% money-back guarantee.
          </p>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-12 border-y border-neutral-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-semibold mb-1">100+</p>
              <p className="text-neutral-500 text-sm">Sites launched</p>
            </div>
            <div>
              <p className="text-3xl font-semibold mb-1">4.9/5</p>
              <p className="text-neutral-500 text-sm">Client rating</p>
            </div>
            <div>
              <p className="text-3xl font-semibold mb-1">7 days</p>
              <p className="text-neutral-500 text-sm">Average delivery</p>
            </div>
            <div>
              <p className="text-3xl font-semibold mb-1">$0</p>
              <p className="text-neutral-500 text-sm">Hidden fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <div className="mb-16 text-center">
            <p className="text-neutral-500 text-sm mb-3 tracking-wide">How it works</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Three steps. One week. Done.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-lg font-semibold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-3">Tell us about your business</h3>
              <p className="text-neutral-400 leading-relaxed">
                Fill out a quick 2-minute questionnaire. Your business name, services, location — that's all we need.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-lg font-semibold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-3">We design & build it</h3>
              <p className="text-neutral-400 leading-relaxed">
                Our team writes your content, sources images, designs your site, and optimises it for Google. You review and approve.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-lg font-semibold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-3">Go live & grow</h3>
              <p className="text-neutral-400 leading-relaxed">
                Your site launches. We manage hosting, updates, and security forever. You focus on running your business.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/onboard" className="btn btn-primary">
              Start now — takes 2 minutes &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Work Showcase */}
      <section id="work" className="section bg-neutral-950">
        <div className="container">
          <div className="mb-16">
            <p className="text-neutral-500 text-sm mb-3 tracking-wide">Recent work</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Every site is custom built
            </h2>
            <p className="text-neutral-400 mt-3 max-w-xl">
              No templates, no cookie-cutter designs. Each website is unique to the business.
            </p>
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
              Get a site like these &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="section">
        <div className="container">
          <div className="mb-16 text-center">
            <p className="text-neutral-500 text-sm mb-3 tracking-wide">Why onboard</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              The anti-Squarespace
            </h2>
            <p className="text-neutral-400 mt-3 max-w-xl mx-auto">
              Squarespace and Wix expect you to build it yourself. We believe you shouldn't have to.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-12">
            <div>
              <p className="text-neutral-600 text-4xl font-light mb-4">01</p>
              <h3 className="text-xl font-semibold mb-3">100% done for you</h3>
              <p className="text-neutral-400 leading-relaxed">
                No DIY, no drag-and-drop, no stress. We handle design, copywriting, images, and launch. You just answer a few questions.
              </p>
            </div>
            <div>
              <p className="text-neutral-600 text-4xl font-light mb-4">02</p>
              <h3 className="text-xl font-semibold mb-3">Ready in 1 week</h3>
              <p className="text-neutral-400 leading-relaxed">
                Not months. Your site is designed, written, and live within 7 business days. Most agencies take 6-12 weeks.
              </p>
            </div>
            <div>
              <p className="text-neutral-600 text-4xl font-light mb-4">03</p>
              <h3 className="text-xl font-semibold mb-3">Managed forever</h3>
              <p className="text-neutral-400 leading-relaxed">
                Unlimited updates, hosting, security, and backups — all included. Need a change? Just email us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section bg-neutral-950">
        <div className="container">
          <div className="mb-16">
            <p className="text-neutral-500 text-sm mb-3 tracking-wide">What you get</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Everything included. No extras.
            </h2>
          </div>

          <div className="feature-grid">
            {[
              { title: 'Professional copywriting', desc: 'We write persuasive content that converts visitors into customers.' },
              { title: 'Image sourcing', desc: 'Premium images selected and optimised for your industry.' },
              { title: 'Custom design', desc: 'Unique to your brand. No templates or cookie-cutter layouts.' },
              { title: 'Mobile optimised', desc: 'Perfect on phones, tablets, and desktops. 60%+ of traffic is mobile.' },
              { title: 'SEO foundation', desc: 'Built to rank on Google from day one. Local SEO included.' },
              { title: 'Contact forms & leads', desc: 'Leads captured and sent straight to your inbox or phone.' },
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
          <div className="mb-16 text-center">
            <p className="text-neutral-500 text-sm mb-3 tracking-wide">Built for</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Service businesses across Australia
            </h2>
            <p className="text-neutral-400 mt-3 max-w-xl mx-auto">
              Whether you're a plumber in Sydney or a salon in Melbourne — we've built sites for businesses like yours.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry.href}
                href={industry.href}
                className="card p-6 text-center card-hover"
              >
                <p className="font-medium">{industry.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-neutral-950">
        <div className="container">
          <div className="mb-16 text-center">
            <p className="text-neutral-500 text-sm mb-3 tracking-wide">What clients say</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Don't take our word for it
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I'd been putting off getting a website for 2 years. Onboard had mine live in 4 days. Wish I'd done it sooner.",
                name: 'Jake M.',
                role: 'Electrician, Sydney',
              },
              {
                quote: "The whole process was dead simple. I filled out a form, they did everything else. Already getting leads from Google.",
                name: 'Sarah T.',
                role: 'Beauty Salon, Melbourne',
              },
              {
                quote: "I was paying $200/month on Hipages for rubbish leads. Now I get free enquiries through my own site. No brainer.",
                name: 'Matt R.',
                role: 'Plumber, Brisbane',
              },
            ].map((testimonial, index) => (
              <div key={index} className="card p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-neutral-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center">
              <p className="text-neutral-500 text-sm mb-3 tracking-wide">Pricing</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-neutral-400">
                One setup fee. One monthly fee. Everything included.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Starter */}
              <div className="card p-8">
                <p className="text-neutral-500 text-sm mb-1">Starter</p>
                <div className="mb-1">
                  <span className="text-3xl font-semibold">$495</span>
                  <span className="text-neutral-500 text-sm"> setup</span>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-semibold">$79</span>
                  <span className="text-neutral-500 text-sm">/mo</span>
                </div>
                <p className="text-neutral-400 text-sm mb-6">Everything you need to get online.</p>
                <ul className="space-y-2 text-sm text-neutral-400 mb-8">
                  <li className="flex items-start gap-2"><span className="text-white/70 mt-0.5">&#10003;</span> 5-page custom website</li>
                  <li className="flex items-start gap-2"><span className="text-white/70 mt-0.5">&#10003;</span> Professional copywriting</li>
                  <li className="flex items-start gap-2"><span className="text-white/70 mt-0.5">&#10003;</span> Mobile responsive</li>
                  <li className="flex items-start gap-2"><span className="text-white/70 mt-0.5">&#10003;</span> Basic SEO</li>
                  <li className="flex items-start gap-2"><span className="text-white/70 mt-0.5">&#10003;</span> Hosting & SSL</li>
                  <li className="flex items-start gap-2"><span className="text-white/70 mt-0.5">&#10003;</span> 1 revision/month</li>
                </ul>
                <Link href="/onboard" className="btn btn-secondary w-full justify-center text-sm">
                  Get started
                </Link>
              </div>

              {/* Growth — Featured */}
              <div className="card p-8 border-white/30 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 rounded-full text-xs font-medium">
                  Most popular
                </div>
                <p className="text-neutral-500 text-sm mb-1">Growth</p>
                <div className="mb-1">
                  <span className="text-3xl font-semibold">$795</span>
                  <span className="text-neutral-500 text-sm"> setup</span>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-semibold">$149</span>
                  <span className="text-neutral-500 text-sm">/mo</span>
                </div>
                <p className="text-neutral-400 text-sm mb-6">Grow with bookings, reviews & SEO.</p>
                <ul className="space-y-2 text-sm text-neutral-300 mb-8">
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span> Everything in Starter</li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span> Online bookings</li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span> Google review automation</li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span> Basic CRM</li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span> Monthly SEO report</li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span> 3 revisions/month</li>
                </ul>
                <Link href="/onboard" className="btn btn-primary w-full justify-center text-sm">
                  Get started &rarr;
                </Link>
              </div>

              {/* Pro */}
              <div className="card p-8">
                <p className="text-neutral-500 text-sm mb-1">Pro</p>
                <div className="mb-1">
                  <span className="text-3xl font-semibold">$1,295</span>
                  <span className="text-neutral-500 text-sm"> setup</span>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-semibold">$299</span>
                  <span className="text-neutral-500 text-sm">/mo</span>
                </div>
                <p className="text-neutral-400 text-sm mb-6">Full marketing engine for your business.</p>
                <ul className="space-y-2 text-sm text-neutral-400 mb-8">
                  <li className="flex items-start gap-2"><span className="text-white/70 mt-0.5">&#10003;</span> Everything in Growth</li>
                  <li className="flex items-start gap-2"><span className="text-white/70 mt-0.5">&#10003;</span> Google Ads management</li>
                  <li className="flex items-start gap-2"><span className="text-white/70 mt-0.5">&#10003;</span> Email/SMS marketing</li>
                  <li className="flex items-start gap-2"><span className="text-white/70 mt-0.5">&#10003;</span> Payment processing</li>
                  <li className="flex items-start gap-2"><span className="text-white/70 mt-0.5">&#10003;</span> Advanced analytics</li>
                  <li className="flex items-start gap-2"><span className="text-white/70 mt-0.5">&#10003;</span> Unlimited revisions</li>
                </ul>
                <Link href="/onboard" className="btn btn-secondary w-full justify-center text-sm">
                  Get started
                </Link>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/pricing" className="text-neutral-400 text-sm hover:text-white transition-colors">
                View full pricing details &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section bg-neutral-950">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Stop renting leads. Own them.
              </h2>
              <p className="text-neutral-400">
                Hipages, Airtasker, and OneFlare charge you per lead. Your own website generates free enquiries forever.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="text-left py-4 pr-4 text-neutral-500 font-medium"></th>
                    <th className="text-center py-4 px-4 text-neutral-500 font-medium">Hipages</th>
                    <th className="text-center py-4 px-4 text-neutral-500 font-medium">DIY (Wix)</th>
                    <th className="text-center py-4 px-4 font-medium">Onboard</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Cost per lead', hipages: '$30-80', wix: 'Free (if you get any)', onboard: 'Free' },
                    { label: 'Your own brand', hipages: 'No', wix: 'Yes', onboard: 'Yes' },
                    { label: 'You build it', hipages: 'N/A', wix: 'Yes (hours)', onboard: 'No, we do it' },
                    { label: 'Professional design', hipages: 'N/A', wix: 'Template', onboard: 'Custom' },
                    { label: 'SEO included', hipages: 'No', wix: 'Basic', onboard: 'Yes' },
                    { label: 'Ongoing support', hipages: 'No', wix: 'Self-serve', onboard: 'Unlimited' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-neutral-800/50">
                      <td className="py-3 pr-4 text-neutral-300">{row.label}</td>
                      <td className="py-3 px-4 text-center text-neutral-500">{row.hipages}</td>
                      <td className="py-3 px-4 text-center text-neutral-500">{row.wix}</td>
                      <td className="py-3 px-4 text-center text-white font-medium">{row.onboard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Questions? Answered.
              </h2>
            </div>

            <div className="space-y-8">
              {FAQS.map((faq, index) => (
                <div key={index} className="border-b border-neutral-800 pb-8">
                  <h3 className="font-medium mb-2">{faq.q}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-neutral-950">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Your website is one form away
          </h2>
          <p className="text-neutral-400 text-lg mb-4 max-w-2xl mx-auto">
            Fill out a 2-minute questionnaire. We'll build your professional website and have it live within a week.
          </p>
          <p className="text-neutral-600 text-sm mb-10">
            No contracts. Cancel anytime. 100% money-back guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboard" className="btn btn-primary h-14 px-10 text-base">
              Get your website now &rarr;
            </Link>
            <Link href="/roi-calculator" className="btn btn-secondary h-14 px-10 text-base">
              Calculate your ROI
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
