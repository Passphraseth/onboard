import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AcquisitionCTA from '@/components/acquisition/AcquisitionCTA'
import AcquisitionSchemas from '@/components/acquisition/AcquisitionSchemas'
import { TrackedOutboundLink } from '@/components/acquisition/PageViewTracker'
import { PROCESS_STEPS } from '@/lib/acquisition-content'

const title = 'How to Acquire the Onboard Domain Portfolio'
const description = 'The price, buyer verification, agreement, invoice, EFT settlement, eligibility and transfer process for the Onboard Australian domain portfolio.'
export const metadata: Metadata = {
  title: `${title} | Onboard Australia`, description,
  alternates: { canonical: 'https://onboard.com.au/acquisition-process' },
  openGraph: { title, description, url: 'https://onboard.com.au/acquisition-process', type: 'website', locale: 'en_AU' },
  twitter: { card: 'summary', title, description },
}

const DETAILS = [
  { title: 'What is included', text: 'The initial package comprises onboard.com.au, onboard.au and onboard.net.au. Existing website content and other digital assets are not automatically included and may be discussed separately.' },
  { title: 'Purchase price and offers', text: 'The fixed acquisition price is A$49,500 plus GST. A buyer may instead submit a confidential offer for private consideration.' },
  { title: 'Buyer verification and .au eligibility', text: 'Before agreement, the seller will verify the buyer entity, representative authority and likely eligibility under the current auDA Licensing Rules. Buyers remain responsible for obtaining their own advice.' },
  { title: 'Agreement and tax invoice', text: 'A domain sale agreement records the parties, assets, price, settlement method, transfer obligations, warranties and any separately agreed website assets. A tax invoice is issued before payment.' },
  { title: 'EFT, cleared funds and optional escrow', text: 'The preferred method is electronic funds transfer. Domains are transferred after cleared funds. An established escrow provider may be considered by agreement, including allocation of fees.' },
  { title: 'Transfer timing', text: 'Timing depends on verification, agreement execution, cleared funds, registrar requirements and buyer eligibility. No automatic or guaranteed same-day delivery is promised.' },
  { title: 'No performance guarantee', text: 'Search metrics and indexing history are contextual only. No guarantee is given regarding future traffic, rankings, revenue, conversion, brand adoption or domain value.' },
]

export default function AcquisitionProcessPage() {
  return (
    <div className="min-h-screen bg-[#151714] text-[#f2f0e9]">
      <AcquisitionSchemas title={title} description={description} path="/acquisition-process" breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Acquisition process', path: '/acquisition-process' }]} />
      <Navbar />
      <main>
        <section className="border-b border-white/10 px-6 pb-20 pt-36 lg:px-10 lg:pb-28">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-10 text-xs text-white/60"><Link href="/" className="hover:text-white">Home</Link><span className="mx-3">/</span><span>Acquisition process</span></nav>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Secure settlement</p>
            <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] md:text-8xl">A clear path from request to transfer.</h1>
            <p className="mt-9 max-w-3xl text-lg leading-8 text-white/65">The transaction uses buyer verification, documented terms, a tax invoice and cleared electronic funds. The website does not process the purchase price by card.</p>
          </div>
        </section>
        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl border-t border-white/15">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="grid gap-5 border-b border-white/15 py-8 md:grid-cols-[5rem_0.65fr_1.35fr] md:items-start">
                <span className="font-mono text-xs text-white/65">{step.number}</span>
                <h2 className="text-2xl font-medium tracking-[-0.035em]">{step.title}</h2>
                <p className="max-w-2xl leading-7 text-white/65">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="border-y border-white/10 bg-[#1c1e1a] px-6 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-x-14 gap-y-12 md:grid-cols-2">
            {DETAILS.map((item) => <article key={item.title} className="border-t border-white/15 pt-6"><h2 className="text-2xl font-medium">{item.title}</h2><p className="mt-4 leading-7 text-white/65">{item.text}</p></article>)}
          </div>
          <p className="mx-auto mt-12 max-w-7xl text-sm text-white/60">Eligibility reference: <TrackedOutboundLink href="https://www.auda.org.au/au-domain-names/the-different-au-domain-names/com-au-domain-names/">auDA com.au eligibility guidance</TrackedOutboundLink> and the <TrackedOutboundLink href="https://www.auda.org.au/au-domain-names/au-rules-and-policies/au-domain-administration-rules-licensing-2/">current auDA Licensing Rules</TrackedOutboundLink>.</p>
        </section>
        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-4xl text-center"><h2 className="text-4xl font-medium tracking-[-0.045em] md:text-6xl">Begin the acquisition conversation.</h2><AcquisitionCTA source="acquisition_process" /></div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
