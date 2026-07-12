import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AcquisitionCTA from '@/components/acquisition/AcquisitionCTA'
import AcquisitionFAQ from '@/components/acquisition/AcquisitionFAQ'
import AcquisitionSchemas from '@/components/acquisition/AcquisitionSchemas'
import { HOME_FAQS, MARKET_LINKS, PROCESS_STEPS } from '@/lib/acquisition-content'

export const metadata: Metadata = {
  title: 'Acquire Onboard Australia | Premium Australian Domain Portfolio',
  description: 'Acquire onboard.com.au, onboard.au and onboard.net.au — a premium Australian domain portfolio for employee, contractor, customer and client onboarding.',
  alternates: { canonical: 'https://onboard.com.au' },
  openGraph: { title: 'Acquire Onboard Australia', description: 'A premium Australian domain portfolio for businesses operating in employee, contractor, customer and client onboarding.', url: 'https://onboard.com.au', siteName: 'Onboard Australia', locale: 'en_AU', type: 'website' },
  twitter: { card: 'summary', title: 'Acquire Onboard Australia', description: 'A premium Australian domain portfolio available for acquisition.' },
}

const DOMAINS = [
  { domain: 'onboard.com.au', role: 'Primary exact-match domain' },
  { domain: 'onboard.au', role: 'Matching direct .au' },
  { domain: 'onboard.net.au', role: 'Defensive Australian asset' },
]

const VALUE_POINTS = [
  ['Recognised term', '“Onboard” is already used commercially for bringing employees, contractors, customers and clients into a new relationship.'],
  ['Easy to remember', 'One familiar word, straightforward spelling and a clear Australian market signal.'],
  ['Positive action', 'The name works as both a brand and an invitation to begin.'],
  ['Commercially versatile', 'Suitable for software, services, regulated workflows and implementation businesses.'],
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#151714] text-[#f2f0e9]">
      <AcquisitionSchemas title="Acquire Onboard Australia" description="A premium Australian domain portfolio available for acquisition." path="/" faqs={HOME_FAQS} />
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-white/10 px-6 pb-20 pt-36 lg:px-10 lg:pb-28">
          <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#c98c45]"><span className="h-px w-10 bg-[#c98c45]" />Available for acquisition</p>
              <h1 className="mt-9 max-w-4xl text-[clamp(4rem,9vw,8.5rem)] font-medium leading-[0.84] tracking-[-0.075em]">Acquire<br />Onboard<br /><span className="text-[#c98c45]">Australia.</span></h1>
              <p className="mt-10 max-w-2xl text-lg leading-8 text-white/55 md:text-xl">A premium Australian domain portfolio for businesses operating in employee, contractor, customer and client onboarding.</p>
            </div>
            <div className="border-t border-white/15 pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Complete portfolio</p>
              <div className="divide-y divide-white/10 border-y border-white/10">
                {DOMAINS.map((asset, index) => <div key={asset.domain} className="py-5"><div className="flex items-baseline justify-between"><p className="text-2xl font-medium tracking-[-0.04em]">{asset.domain}</p><span className="font-mono text-xs text-white/20">0{index + 1}</span></div><p className="mt-2 text-sm text-white/55">{asset.role}</p></div>)}
              </div>
              <div className="mt-7 flex items-end justify-between border-b border-white/15 pb-5"><div><p className="text-xs uppercase tracking-[0.15em] text-white/55">Acquisition price</p><p className="mt-2 text-4xl font-medium tracking-[-0.05em]">A$49,500</p></div><p className="pb-1 text-xs text-white/55">+ GST</p></div>
              <AcquisitionCTA source="homepage_hero" />
              <p className="mt-4 text-xs leading-5 text-white/55">Settlement by agreement, tax invoice and cleared electronic funds transfer.</p>
            </div>
          </div>
        </section>

        <section id="portfolio" className="border-b border-white/10 px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.65fr_1.35fr]">
            <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Why Onboard</p><h2 className="mt-6 text-4xl font-medium tracking-[-0.045em] md:text-5xl">A word with commercial momentum.</h2></div>
            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {VALUE_POINTS.map(([title, text]) => <article key={title} className="bg-[#151714] p-7"><h3 className="text-xl font-medium">{title}</h3><p className="mt-4 text-sm leading-6 text-white/65">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#1c1e1a] px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Commercial breadth</p><div><h2 className="text-4xl font-medium tracking-[-0.045em] md:text-6xl">One word. Seven onboarding markets.</h2><p className="mt-5 max-w-3xl leading-7 text-white/65">Each guide is informational. The site does not represent that Onboard currently provides onboarding software.</p></div></div>
            <div className="mt-14 border-t border-white/15">
              {MARKET_LINKS.map((market, index) => <Link key={market.href} href={market.href} className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-white/15 py-5 transition-colors hover:text-[#c98c45] md:grid-cols-[5rem_1fr_auto]"><span className="font-mono text-xs text-white/65">0{index + 1}</span><h3 className="text-xl font-normal tracking-[-0.025em] md:text-2xl">{market.name}</h3><span aria-hidden="true">↗</span></Link>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm"><Link href="/australian-onboarding-software-market" className="text-white/55 underline decoration-white/20 underline-offset-4 hover:text-white">Australian market overview</Link><Link href="/melbourne-onboarding-software" className="text-white/55 underline decoration-white/20 underline-offset-4 hover:text-white">Melbourne perspective</Link><Link href="/sydney-customer-onboarding" className="text-white/55 underline decoration-white/20 underline-offset-4 hover:text-white">Sydney perspective</Link></div>
          </div>
        </section>

        <section className="border-b border-white/10 px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Acquisition process</p><h2 className="text-4xl font-medium tracking-[-0.045em] md:text-6xl">Documented. Verified. Secure.</h2></div>
            <div className="mt-14 border-t border-white/15">
              {PROCESS_STEPS.map((step) => <div key={step.number} className="grid gap-4 border-b border-white/15 py-7 md:grid-cols-[5rem_0.7fr_1.3fr]"><span className="font-mono text-xs text-white/65">{step.number}</span><h3 className="text-xl font-medium">{step.title}</h3><p className="max-w-2xl text-sm leading-6 text-white/65">{step.description}</p></div>)}
            </div>
            <Link href="/acquisition-process" className="mt-8 inline-flex items-center gap-3 text-sm text-[#c98c45]">Read the complete acquisition process ↗</Link>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#10120f] px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.65fr_1.35fr]">
            <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Australian AML/CTF market</p><h2 className="mt-6 text-4xl font-medium tracking-[-0.045em] md:text-5xl">A sourced resource for a changing onboarding category.</h2></div>
            <div>
              <p className="max-w-3xl text-lg leading-8 text-white/60">Explore Tranche 2, KYC, KYB and customer-due-diligence workflows using current AUSTRAC sources. The guides are general information and do not represent that Onboard provides compliance software or advice.</p>
              <div className="mt-9 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
                {[
                  ['AML/CTF resource hub', '/aml-ctf'],
                  ['Tranche 2 client onboarding', '/tranche-2-client-onboarding'],
                  ['KYC vs KYB', '/kyc-vs-kyb'],
                  ['Australian software market', '/australian-aml-ctf-software-market'],
                ].map(([label, href]) => <Link key={href} href={href} className="flex min-h-20 items-center justify-between bg-[#151714] p-5 text-sm text-white/70 hover:text-[#c98c45]">{label}<span aria-hidden="true">↗</span></Link>)}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#f2f0e9] px-6 py-20 text-[#151714] lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.65fr_1.35fr]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7b522f]">Established search presence</p>
            <div><h2 className="max-w-4xl text-4xl font-medium leading-[1.08] tracking-[-0.045em] md:text-6xl">An existing indexed website with demonstrated Australian search visibility.</h2><p className="mt-6 max-w-2xl leading-7 text-black/65">Historical data is context, not a performance promise. No traffic, ranking, revenue or conversion guarantee is provided.</p><div className="mt-12 grid gap-8 border-t border-black/15 pt-7 sm:grid-cols-3"><div><p className="text-sm text-black/60">Search impressions</p><p className="mt-2 text-3xl font-medium">≈23,700</p><p className="text-xs text-black/60">Most recent three months</p></div><div><p className="text-sm text-black/60">Portfolio</p><p className="mt-2 text-3xl font-medium">3 domains</p><p className="text-xs text-black/60">Initially sold together</p></div><div><p className="text-sm text-black/60">Indexed content</p><p className="mt-2 text-3xl font-medium">Established</p><p className="text-xs text-black/60">Useful URLs retained</p></div></div></div>
          </div>
        </section>

        <section className="border-b border-white/10 px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.65fr_1.35fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Frequently asked questions</p><h2 className="mt-6 text-4xl font-medium tracking-[-0.045em]">Transaction essentials.</h2></div><AcquisitionFAQ items={HOME_FAQS} /></div>
        </section>

        <section className="px-6 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-5xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Complete Australian portfolio</p><h2 className="mt-6 text-5xl font-medium tracking-[-0.055em] md:text-7xl">Acquire the complete portfolio — A$49,500 + GST.</h2><p className="mx-auto mt-6 max-w-2xl leading-7 text-white/65">onboard.com.au, onboard.au and onboard.net.au.</p><AcquisitionCTA source="homepage_final" /></div></section>
      </main>
      <Footer />
    </div>
  )
}
