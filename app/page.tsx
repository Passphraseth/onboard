import type { Metadata } from 'next'
import Link from 'next/link'
import AcquisitionForm from '@/components/AcquisitionForm'

export const metadata: Metadata = {
  title: 'Acquire Onboard Australia | Premium Australian Domain Portfolio',
  description:
    'Acquire onboard.com.au, onboard.au and onboard.net.au — a category-defining Australian domain portfolio for onboarding products and services.',
  alternates: { canonical: 'https://onboard.com.au' },
  openGraph: {
    title: 'Acquire Onboard Australia',
    description:
      'A category-defining Australian domain portfolio for employee, contractor, customer or business onboarding.',
    url: 'https://onboard.com.au',
    siteName: 'Onboard Australia',
    locale: 'en_AU',
    type: 'website',
  },
}

const USES = [
  ['01', 'Employee onboarding'],
  ['02', 'Contractor and workforce compliance'],
  ['03', 'Customer onboarding'],
  ['04', 'Client intake'],
  ['05', 'SaaS implementation'],
  ['06', 'Financial services and KYC'],
  ['07', 'Construction inductions'],
]

const ASSETS = [
  { domain: 'onboard.com.au', role: 'Primary exact-match domain' },
  { domain: 'onboard.au', role: 'Matching direct .au' },
  { domain: 'onboard.net.au', role: 'Defensive Australian asset' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f2efe8] text-[#151713]">
      <header className="relative z-10 border-b border-black/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="text-lg font-semibold tracking-[-0.04em]" aria-label="Onboard Australia home">
            onboard<span className="text-[#9a6b3f]">.</span>
          </Link>
          <a
            href="#enquiry"
            className="group inline-flex items-center gap-3 text-sm font-medium"
          >
            Confidential enquiry
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 transition-colors group-hover:bg-black group-hover:text-white">
              ↘
            </span>
          </a>
        </div>
      </header>

      <section className="relative border-b border-black/10">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-end gap-16 px-6 py-16 lg:grid-cols-[1fr_0.72fr] lg:px-10 lg:py-24">
          <div className="max-w-4xl self-center">
            <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-black/50">
              <span className="h-px w-10 bg-[#9a6b3f]" />
              A rare digital asset
            </p>
            <h1 className="max-w-4xl text-[clamp(4rem,9vw,8.5rem)] font-medium leading-[0.84] tracking-[-0.075em]">
              Acquire
              <br />
              Onboard
              <br />
              <span className="text-[#9a6b3f]">Australia.</span>
            </h1>
            <p className="mt-10 max-w-2xl text-lg leading-8 text-black/60 md:text-xl">
              A category-defining Australian domain portfolio for employee, contractor, customer or business onboarding.
            </p>
          </div>

          <div className="border-t border-black/20 lg:border-l lg:border-t-0 lg:pl-12">
            <p className="mb-6 pt-8 text-xs font-semibold uppercase tracking-[0.2em] text-black/45 lg:pt-0">
              Included in the portfolio
            </p>
            <div className="divide-y divide-black/10 border-y border-black/10">
              {ASSETS.map((asset, index) => (
                <div key={asset.domain} className="group py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-2xl font-medium tracking-[-0.04em] md:text-3xl">{asset.domain}</p>
                    <span className="font-mono text-xs text-black/30">0{index + 1}</span>
                  </div>
                  <p className="mt-2 text-sm text-black/45">{asset.role}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <div className="flex items-end justify-between gap-4 border-b border-black/15 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">Acquire complete portfolio</p>
                  <p className="mt-2 text-3xl font-medium tracking-[-0.045em]">A$29,500</p>
                </div>
                <p className="pb-1 text-xs text-black/40">+ GST if applicable</p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a href="#acquire-now" className="inline-flex min-h-14 items-center justify-between bg-[#171914] px-5 text-sm font-medium text-white transition-colors hover:bg-[#9a6b3f]">
                  Acquire now <span aria-hidden="true">↘</span>
                </a>
                <a href="#make-offer" className="inline-flex min-h-14 items-center justify-between border border-black/20 px-5 text-sm font-medium transition-colors hover:border-black">
                  Submit an offer <span aria-hidden="true">↘</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#d8d1c3]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7b522f]">Buy the complete portfolio</p>
            <h2 className="mt-5 text-5xl font-medium leading-none tracking-[-0.055em] md:text-7xl">A$29,500</h2>
            <p className="mt-4 text-sm text-black/45">Plus GST if applicable</p>
          </div>
          <div>
            <h3 className="text-3xl font-medium tracking-[-0.04em]">Secure the complete Australian domain portfolio for the Onboard brand.</h3>
            <div className="mt-8 grid gap-x-10 gap-y-4 border-y border-black/15 py-6 sm:grid-cols-2">
              {[
                'onboard.com.au',
                'onboard.au',
                'onboard.net.au',
                'Transfer assistance',
                'Existing website assets by agreement',
              ].map((item) => (
                <p key={item} className="flex items-center gap-3 text-sm">
                  <span className="text-[#7b522f]">✓</span>{item}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#acquire-now" className="inline-flex min-h-14 flex-1 items-center justify-between bg-[#171914] px-6 text-sm font-medium text-white transition-colors hover:bg-[#7b522f]">
                Acquire now — A$29,500 <span aria-hidden="true">↘</span>
              </a>
              <a href="#make-offer" className="inline-flex min-h-14 flex-1 items-center justify-between border border-black/25 px-6 text-sm font-medium transition-colors hover:border-black">
                Make an offer <span aria-hidden="true">↘</span>
              </a>
            </div>
            <p className="mt-4 text-xs leading-5 text-black/40">Acquire Now begins a secure transaction enquiry. No card payment is taken on this website.</p>
          </div>
        </div>
      </section>

      <section id="portfolio" className="border-b border-black/10 bg-[#171914] text-[#f2efe8]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#bb8a5d]">Commercial breadth</p>
              <h2 className="mt-6 max-w-md text-4xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">
                One word.<br />Many markets.
              </h2>
              <p className="mt-8 max-w-sm leading-7 text-white/50">
                “Onboard” is an immediate, positive call to action with broad relevance across software, services and regulated industries.
              </p>
            </div>
            <div className="border-t border-white/15">
              {USES.map(([number, label]) => (
                <div
                  key={number}
                  className="grid grid-cols-[3rem_1fr] items-center gap-4 border-b border-white/15 py-5 md:grid-cols-[5rem_1fr] md:py-6"
                >
                  <span className="font-mono text-xs text-white/30">{number}</span>
                  <h3 className="text-xl font-normal tracking-[-0.025em] md:text-2xl">{label}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-3 lg:px-10 lg:py-28">
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a6b3f]">Established presence</p>
          </div>
          <div className="lg:col-span-2">
            <p className="max-w-4xl text-3xl font-medium leading-[1.25] tracking-[-0.04em] md:text-5xl">
              An established Australian domain portfolio with an existing indexed website and demonstrated search visibility for “onboard.”
            </p>
            <div className="mt-14 grid gap-8 border-t border-black/15 pt-8 sm:grid-cols-3">
              <div>
                <p className="text-sm text-black/45">Search exposure</p>
                <p className="mt-2 text-3xl font-medium tracking-[-0.04em]">≈23,700</p>
                <p className="mt-1 text-xs text-black/40">Google impressions / recent 3 months</p>
              </div>
              <div>
                <p className="text-sm text-black/45">Portfolio</p>
                <p className="mt-2 text-3xl font-medium tracking-[-0.04em]">3 domains</p>
                <p className="mt-1 text-xs text-black/40">Sold together</p>
              </div>
              <div>
                <p className="text-sm text-black/45">Market</p>
                <p className="mt-2 text-3xl font-medium tracking-[-0.04em]">Australia</p>
                <p className="mt-1 text-xs text-black/40">One-word exact match</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="enquiry" className="bg-[#d8d1c3]">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-32">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7b522f]">Two acquisition pathways</p>
            <h2 className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.055em] md:text-7xl">
              Acquire now.<br />Or make<br />an offer.
            </h2>
            <p className="mt-8 max-w-md leading-7 text-black/55">
              Qualified principals, strategic buyers and authorised representatives are invited to proceed at the asking price or submit a confidential offer.
            </p>
          </div>
          <AcquisitionForm />
        </div>
      </section>

      <footer className="bg-[#171914] text-white/45">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-xs sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Onboard Australia</p>
          <p>The portfolio is offered as a bundled acquisition.</p>
        </div>
      </footer>
    </main>
  )
}
