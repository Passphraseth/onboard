import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AcquisitionCTA from '@/components/acquisition/AcquisitionCTA'
import AcquisitionSchemas from '@/components/acquisition/AcquisitionSchemas'
import { MarketPageView, TrackedOutboundLink } from '@/components/acquisition/PageViewTracker'

const title = 'Australian Onboarding Software Companies and Market Overview'
const description = 'An editorial overview of Australian employee, contractor, construction, customer, client and KYC onboarding technology categories.'

export const metadata: Metadata = {
  title: `${title} | Onboard Australia`, description,
  alternates: { canonical: 'https://onboard.com.au/australian-onboarding-software-market' },
  openGraph: { title, description, url: 'https://onboard.com.au/australian-onboarding-software-market', type: 'article', locale: 'en_AU' },
  twitter: { card: 'summary', title, description },
}

const CATEGORIES = [
  { name: 'Employee onboarding', description: 'Offers, contracts, employee data, pre-start tasks, payroll readiness and early-employment workflows.', href: '/employee-onboarding' },
  { name: 'Contractor onboarding', description: 'Company prequalification, insurance, worker credentials, inductions, mobilisation and ongoing compliance.', href: '/contractor-onboarding' },
  { name: 'Construction inductions', description: 'Worker registration, site learning, licences, competency checks, access and project readiness.', href: '/construction-inductions' },
  { name: 'Customer onboarding', description: 'Account activation, setup, education, implementation milestones and adoption.', href: '/customer-onboarding' },
  { name: 'Client intake', description: 'Engagement letters, entity data, document collection, payment setup and professional-services compliance.', href: '/client-onboarding' },
  { name: 'Digital identity and KYC', description: 'Identity, business verification, risk checks, account opening and onboarding orchestration.', href: '/kyc-onboarding' },
  { name: 'SaaS implementation', description: 'Discovery, configuration, data migration, integration, training and customer-success handover.', href: '/saas-onboarding' },
]

const PARTICIPANTS = [
  { name: 'ELMO Software', category: 'Employee onboarding and HR', href: 'https://elmosoftware.com.au/products/onboarding', description: 'ELMO presents onboarding workflows covering new-hire forms, tasks, documents, notifications and compliance records.' },
  { name: 'Employment Hero', category: 'Employment and HR platform', href: 'https://employmenthero.com/', description: 'Employment Hero provides employment, HR and payroll technology with employee onboarding workflows for Australian businesses.' },
  { name: 'PageUp', category: 'Talent acquisition and onboarding', href: 'https://www.pageuppeople.com/products/onboarding/', description: 'PageUp offers recruitment and onboarding technology including offers, e-signatures, task allocation, workflows and learning.' },
  { name: 'Humanforce', category: 'Frontline workforce management', href: 'https://humanforce.com/', description: 'Humanforce operates in workforce management and provides onboarding functionality for employee records and Australian payroll details.' },
  { name: 'Rapid Global', category: 'Contractor and workforce compliance', href: 'https://rapidglobal.com/products/rapid-contractor-management-software/', description: 'Rapid Global describes contractor prequalification, insurance and SWMS management, inductions, verification and site-readiness workflows.' },
  { name: 'HammerTech', category: 'Construction worker induction', href: 'https://www.hammertech.com/en-gb/platform/induction-worker-info', description: 'HammerTech provides worker registration, site induction, training and credential tracking for construction projects.' },
  { name: 'BuildPass', category: 'Construction operations and inductions', href: 'https://www.buildpass.ai/us/features/health-and-safety/orientations', description: 'BuildPass offers mobile construction orientation and document workflows for workers and contractors.' },
  { name: 'FrankieOne', category: 'KYC, KYB and onboarding orchestration', href: 'https://frankieone.com/', description: 'FrankieOne connects KYC, KYB, AML, fraud and identity tools for financial-services customer onboarding.' },
]

export default function AustralianMarketPage() {
  return (
    <div className="min-h-screen bg-[#151714] text-[#f2f0e9]">
      <AcquisitionSchemas title={title} description={description} path="/australian-onboarding-software-market" article breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Australian market', path: '/australian-onboarding-software-market' }]} />
      <MarketPageView market="australian_onboarding_software_market" />
      <Navbar />
      <main>
        <section className="border-b border-white/10 px-6 pb-20 pt-36 lg:px-10 lg:pb-28">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-10 text-xs text-white/60"><Link href="/" className="hover:text-white">Home</Link><span className="mx-3">/</span><span>Australian market</span></nav>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Market overview · Updated July 2026</p>
            <h1 className="mt-6 max-w-6xl text-5xl font-medium leading-[0.96] tracking-[-0.055em] md:text-7xl lg:text-8xl">Australia’s onboarding technology market.</h1>
            <p className="mt-10 max-w-3xl text-lg leading-8 text-white/55">Onboarding is not one product category. Australian vendors and buyers use the term across employment, workforce compliance, construction, customer activation, professional services and regulated account opening.</p>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.6fr_1.4fr]"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Category map</p><h2 className="text-4xl font-medium tracking-[-0.045em] md:text-5xl">Seven commercial interpretations of “onboard.”</h2></div>
            <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
              {CATEGORIES.map((category) => (
                <Link key={category.href} href={category.href} className="bg-[#151714] p-7 transition-colors hover:bg-[#1c1e1a]">
                  <h3 className="text-xl font-medium">{category.name}</h3><p className="mt-3 text-sm leading-6 text-white/65">{category.description}</p><span className="mt-6 inline-block text-xs text-[#c98c45]">Explore category ↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#1c1e1a] px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr]"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Selected market participants</p><div><h2 className="text-4xl font-medium tracking-[-0.045em] md:text-5xl">An illustrative, non-exhaustive market view.</h2><p className="mt-5 max-w-3xl leading-7 text-white/65">The companies below are mentioned factually from their official public product information. Inclusion does not imply affiliation, endorsement or partnership.</p></div></div>
            <div className="mt-14 border-t border-white/15">
              {PARTICIPANTS.map((company) => (
                <article key={company.name} className="grid gap-4 border-b border-white/15 py-7 md:grid-cols-[0.7fr_0.8fr_1.5fr]">
                  <h3 className="text-xl font-medium"><TrackedOutboundLink href={company.href}>{company.name}</TrackedOutboundLink></h3>
                  <p className="text-sm text-[#c98c45]">{company.category}</p>
                  <p className="text-sm leading-6 text-white/65">{company.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-7 text-xs leading-5 text-white/55">Company names and trademarks belong to their respective owners. Product descriptions should be checked with each provider because offerings change.</p>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Brand opportunity</p><p className="mt-6 text-sm leading-6 text-white/60">The Onboard portfolio is independent of every company listed above.</p></div>
            <div><h2 className="text-4xl font-medium tracking-[-0.045em] md:text-6xl">A name that crosses the category map.</h2><p className="mt-6 max-w-3xl leading-7 text-white/65">The commercial breadth of “Onboard” allows a buyer to enter one onboarding category without choosing a name that prevents later expansion.</p><AcquisitionCTA source="australian_market_overview" /></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
