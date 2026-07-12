import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { AmlContentPage } from '@/lib/aml-ctf-content'
import { AML_LAST_REVIEWED_ISO } from '@/lib/aml-ctf-content'
import AcquisitionSchemas from './AcquisitionSchemas'
import { AmlPageView } from './AmlAnalytics'
import AmlFAQAccordion from './AmlFAQAccordion'
import {
  AcquisitionBanner,
  ComparisonTable,
  DefinitionCards,
  LastReviewed,
  LegalReviewFlag,
  MarketVendorCards,
  PrimarySources,
  RegulatoryDisclaimer,
  RelatedResources,
  SectorCardGrid,
  WorkflowSteps,
} from './AmlComponents'

export default function AmlEditorialPage({ page }: { page: AmlContentPage }) {
  return (
    <div className="min-h-screen bg-[#151714] text-[#f2f0e9]">
      <AcquisitionSchemas
        title={page.h1}
        description={page.metaDescription}
        path={`/${page.slug}`}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'AML/CTF resources', path: '/aml-ctf' }, { name: page.h1, path: `/${page.slug}` }]}
        faqs={page.faq}
        article
        dateModified={AML_LAST_REVIEWED_ISO}
        authorName="Onboard Australia editorial"
      />
      <AmlPageView pageSlug={page.slug} sector={page.sector} workflowTopic={page.workflowTopic} />
      <Navbar />
      <main>
        <header className="border-b border-white/10 px-6 pb-16 pt-36 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-10 text-xs text-white/60" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link><span className="mx-3">/</span>
              {page.slug !== 'aml-ctf' && <><Link href="/aml-ctf" className="hover:text-white">AML/CTF resources</Link><span className="mx-3">/</span></>}
              <span aria-current="page">{page.eyebrow}</span>
            </nav>
            <div className="grid gap-12 lg:grid-cols-[1fr_0.55fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">{page.eyebrow}</p>
                <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.96] tracking-[-0.055em] md:text-7xl lg:text-8xl">{page.h1}</h1>
                <p className="mt-8 max-w-3xl text-lg leading-8 text-white/60 md:text-xl">{page.summary}</p>
              </div>
              <div className="border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <LastReviewed />
                <p className="mt-4 text-xs leading-6 text-white/55">General editorial information. Onboard is a domain portfolio and does not provide AML/CTF software or advice.</p>
              </div>
            </div>
          </div>
        </header>

        <section className="px-6 py-10 lg:px-10">
          <div className="mx-auto max-w-7xl"><AcquisitionBanner pageSlug={page.slug} location="top" /></div>
        </section>

        <section className="px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            {page.sections.map((section, index) => (
              <article key={section.title} className="grid gap-7 border-t border-white/15 py-11 lg:grid-cols-[0.58fr_1.42fr]">
                <div><span className="font-mono text-xs text-white/55">0{index + 1}</span><h2 className="mt-4 text-2xl font-medium tracking-[-0.035em] md:text-3xl">{section.title}</h2></div>
                <div className="max-w-3xl space-y-5 text-base leading-8 text-white/60">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul className="grid gap-3 pt-2 sm:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="border-l border-[#c98c45]/60 pl-4 text-sm text-white/70">{bullet}</li>)}</ul>}
                  {section.note && <p className="border border-white/15 bg-white/[0.035] p-5 text-sm leading-7 text-white/70"><strong className="text-[#c98c45]">Regulatory note:</strong> {section.note}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        {page.workflowSteps && <section className="border-y border-white/10 bg-[#1c1e1a] px-6 py-16 lg:px-10 lg:py-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c98c45]">Illustrative workflow</p><h2 className="mt-5 text-3xl font-medium tracking-[-0.04em] md:text-5xl">A controlled path, not a compliance template.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">Illustrative workflow only — not a compliance template. The required process depends on the reporting entity, designated service, customer and risk.</p><WorkflowSteps steps={page.workflowSteps} /></div></section>}

        {page.sectorCards && <section className="px-6 py-16 lg:px-10 lg:py-24"><div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c98c45]">Sector guides</p><h2 className="mb-10 mt-5 text-3xl font-medium tracking-[-0.04em] md:text-5xl">Workflows vary by service and customer.</h2><SectorCardGrid cards={page.sectorCards} /></div></section>}

        {page.definitions && <section className="border-y border-white/10 bg-[#1c1e1a] px-6 py-16 lg:px-10 lg:py-24"><div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c98c45]">Plain-language definitions</p><h2 className="mb-10 mt-5 text-3xl font-medium tracking-[-0.04em] md:text-5xl">Three related ideas.</h2><DefinitionCards definitions={page.definitions} /></div></section>}

        {page.comparison && <section className="px-6 py-16 lg:px-10 lg:py-24"><div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c98c45]">Workflow comparison</p><h2 className="mb-10 mt-5 text-3xl font-medium tracking-[-0.04em] md:text-5xl">Individual and entity onboarding.</h2><ComparisonTable comparison={page.comparison} /></div></section>}

        {page.vendors && <section className="border-y border-white/10 bg-[#10120f] px-6 py-16 lg:px-10 lg:py-24"><div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c98c45]">Selected provider directory</p><h2 className="mt-5 text-3xl font-medium tracking-[-0.04em] md:text-5xl">Verified from official provider pages.</h2><p className="mb-10 mt-5 max-w-3xl text-sm leading-7 text-white/55">Listings are informational and do not constitute endorsement. Product capabilities and pricing may change. Verify all information directly with the provider.</p><MarketVendorCards vendors={page.vendors} pageSlug={page.slug} /></div></section>}

        <section className="px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.66fr_1.34fr]">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c98c45]">Related resources</p><h2 className="mt-5 text-3xl font-medium tracking-[-0.04em]">Continue through the cluster.</h2></div>
            <RelatedResources slugs={page.relatedPages} pageSlug={page.slug} />
          </div>
        </section>

        {page.faq && <section className="border-y border-white/10 bg-[#1c1e1a] px-6 py-16 lg:px-10 lg:py-24"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.66fr_1.34fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c98c45]">Questions</p><h2 className="mt-5 text-3xl font-medium tracking-[-0.04em]">Important distinctions.</h2></div><AmlFAQAccordion items={page.faq} pageSlug={page.slug} /></div></section>}

        <section className="px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div><PrimarySources sources={page.primarySources} pageSlug={page.slug} /></div>
            <div className="space-y-5"><RegulatoryDisclaimer /><LegalReviewFlag visible={page.legalReviewRequired} /></div>
          </div>
        </section>

        <section className="px-6 pb-24 lg:px-10"><div className="mx-auto max-w-7xl"><AcquisitionBanner pageSlug={page.slug} location="bottom" /></div></section>
      </main>
      <Footer />
    </div>
  )
}
