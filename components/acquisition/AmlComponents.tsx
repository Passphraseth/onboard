import Link from 'next/link'
import type { AmlContentPage, AmlSource } from '@/lib/aml-ctf-content'
import { AML_LAST_REVIEWED, getAmlPageLabel } from '@/lib/aml-ctf-content'
import AcquisitionCTA from './AcquisitionCTA'
import { AmlTrackedLink } from './AmlAnalytics'

export function LastReviewed() {
  return <p className="font-mono text-xs text-white/55">Last reviewed: <time dateTime="2026-07-12">{AML_LAST_REVIEWED}</time> · Editorial owner: Onboard Australia</p>
}

export function RegulatoryDisclaimer() {
  return (
    <aside className="border border-[#c98c45]/45 bg-[#c98c45]/[0.07] p-6 md:p-8" aria-label="Regulatory disclaimer">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#dba867]">Important information</h2>
      <p className="mt-4 text-sm leading-7 text-white/70">This content is general information only and does not constitute legal, regulatory or compliance advice. AML/CTF obligations depend on the services provided and the circumstances of each business. Refer to current AUSTRAC guidance and obtain professional advice appropriate to your circumstances.</p>
      <p className="mt-3 text-xs leading-6 text-white/55">AUSTRAC and third-party names and trademarks belong to their respective owners. Their inclusion does not imply affiliation, endorsement or partnership.</p>
    </aside>
  )
}

export function PrimarySources({ sources, pageSlug }: { sources: AmlSource[]; pageSlug: string }) {
  return (
    <section aria-labelledby="primary-sources-heading">
      <h2 id="primary-sources-heading" className="text-3xl font-medium tracking-[-0.04em]">Primary sources</h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">Regulatory statements are linked to current AUSTRAC guidance. Provider facts on the market page link to each provider’s official website.</p>
      <ul className="mt-7 divide-y divide-white/10 border-y border-white/10">
        {sources.map((source) => (
          <li key={source.url} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <AmlTrackedLink href={source.url} eventName="aml_source_link_click" pageSlug={pageSlug} className="text-sm text-white/70 underline decoration-white/20 underline-offset-4 hover:text-[#c98c45]">{source.title} ↗</AmlTrackedLink>
            <span className="text-xs text-white/55">{source.publisher} · checked {source.lastChecked}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function AcquisitionBanner({ pageSlug, location }: { pageSlug: string; location: 'top' | 'bottom' }) {
  return (
    <aside className="border border-white/15 bg-[#1c1e1a] p-6 md:p-8" aria-label="Domain acquisition opportunity">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c98c45]">Available for acquisition</p>
      <h2 className="mt-4 text-2xl font-medium tracking-[-0.035em] md:text-3xl">The Onboard Australian domain portfolio is available.</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60">Secure onboard.com.au, onboard.au and onboard.net.au for an AML/CTF, KYC, client-onboarding or compliance-technology brand.</p>
      <AcquisitionCTA source={pageSlug} cluster="aml_ctf" ctaLocation={location} />
    </aside>
  )
}

export function WorkflowSteps({ steps }: { steps: NonNullable<AmlContentPage['workflowSteps']> }) {
  return (
    <div className="mt-10 grid gap-px border border-white/10 bg-white/10 md:grid-cols-5">
      {steps.map((step, index) => (
        <div key={step.title} className="bg-[#151714] p-5">
          <span className="font-mono text-xs text-[#c98c45]">0{index + 1}</span>
          <h3 className="mt-5 text-lg font-medium">{step.title}</h3>
          <p className="mt-3 text-sm leading-6 text-white/55">{step.description}</p>
        </div>
      ))}
    </div>
  )
}

export function SectorCardGrid({ cards }: { cards: NonNullable<AmlContentPage['sectorCards']> }) {
  return (
    <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
      {cards.map((card) => (
        <Link key={card.href} href={card.href} className="group bg-[#151714] p-6 transition-colors hover:bg-[#20231e]">
          <h3 className="text-xl font-medium">{card.title}<span aria-hidden="true" className="ml-2 text-[#c98c45]">↗</span></h3>
          <p className="mt-4 text-sm leading-6 text-white/55">{card.description}</p>
        </Link>
      ))}
    </div>
  )
}

export function DefinitionCards({ definitions }: { definitions: NonNullable<AmlContentPage['definitions']> }) {
  return (
    <dl className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
      {definitions.map((item) => <div key={item.term} className="bg-[#151714] p-6"><dt className="text-2xl font-medium text-[#c98c45]">{item.term}</dt><dd className="mt-4 text-sm leading-7 text-white/60">{item.description}</dd></div>)}
    </dl>
  )
}

export function ComparisonTable({ comparison }: { comparison: NonNullable<AmlContentPage['comparison']> }) {
  return (
    <div className="overflow-x-auto border border-white/15" tabIndex={0} aria-label="KYC and KYB workflow comparison">
      <table className="min-w-[720px] w-full border-collapse text-left text-sm">
        <thead className="bg-[#1c1e1a] text-white"><tr>{comparison.headings.map((heading) => <th key={heading} scope="col" className="border-b border-white/15 p-4 font-medium">{heading}</th>)}</tr></thead>
        <tbody>{comparison.rows.map((row) => <tr key={row[0]} className="border-b border-white/10 last:border-0">{row.map((cell, index) => <td key={cell} className={`p-4 align-top leading-6 ${index === 0 ? 'font-medium text-white' : 'text-white/60'}`}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

export function MarketVendorCards({ vendors, pageSlug }: { vendors: NonNullable<AmlContentPage['vendors']>; pageSlug: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {vendors.map((vendor) => (
        <article key={vendor.name} className="border border-white/15 bg-[#1c1e1a] p-6">
          <div className="flex items-start justify-between gap-5"><h3 className="text-2xl font-medium">{vendor.name}</h3><AmlTrackedLink href={vendor.url} eventName="aml_market_vendor_click" pageSlug={pageSlug} className="text-sm text-[#c98c45] underline underline-offset-4">Official site ↗</AmlTrackedLink></div>
          <dl className="mt-6 space-y-4 text-sm leading-6">
            {[['Australian availability', vendor.availability], ['Target sectors', vendor.sectors], ['Public capabilities', vendor.capabilities], ['Integration information', vendor.integrations], ['Pricing availability', vendor.pricing]].map(([term, detail]) => <div key={term}><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">{term}</dt><dd className="mt-1 text-white/65">{detail}</dd></div>)}
          </dl>
          <p className="mt-5 font-mono text-[11px] text-white/55">Last verified: {AML_LAST_REVIEWED}</p>
        </article>
      ))}
    </div>
  )
}

export function RelatedResources({ slugs, pageSlug }: { slugs: string[]; pageSlug: string }) {
  return (
    <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
      {slugs.map((slug) => <AmlTrackedLink key={slug} href={`/${slug}`} eventName="aml_related_article_click" pageSlug={pageSlug} className="flex min-h-24 items-center justify-between gap-5 bg-[#151714] p-5 text-sm text-white/70 transition-colors hover:bg-[#20231e] hover:text-white"><span>{getAmlPageLabel(slug)}</span><span aria-hidden="true" className="text-[#c98c45]">↗</span></AmlTrackedLink>)}
    </div>
  )
}

export function LegalReviewFlag({ visible }: { visible: boolean }) {
  if (!visible || process.env.NODE_ENV === 'production') return null
  return <p className="border border-red-400/50 bg-red-400/10 p-3 font-mono text-xs text-red-200">TODO: LEGAL/COMPLIANCE REVIEW</p>
}
