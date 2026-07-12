import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AcquisitionCTA from './AcquisitionCTA'
import AcquisitionSchemas from './AcquisitionSchemas'
import { MarketPageView } from './PageViewTracker'
import { MARKET_LINKS, MARKET_PAGES, type MarketPageConfig } from '@/lib/acquisition-content'

function relatedPage(slug: string) {
  if (slug === 'australian-onboarding-software-market') return { name: 'Australian market overview', href: `/${slug}` }
  return MARKET_LINKS.find((item) => item.href === `/${slug}`)
    || { name: MARKET_PAGES[slug]?.title || slug, href: `/${slug}` }
}

export default function MarketEditorialPage({ page }: { page: MarketPageConfig }) {
  return (
    <div className="min-h-screen bg-[#151714] text-[#f2f0e9]">
      <AcquisitionSchemas
        title={page.title}
        description={page.description}
        path={`/${page.slug}`}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: page.title, path: `/${page.slug}` }]}
      />
      <MarketPageView market={page.slug} />
      <Navbar />
      <main>
        <section className="border-b border-white/10 px-6 pb-20 pt-36 lg:px-10 lg:pb-28">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-12 text-xs text-white/60" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link><span className="mx-3">/</span><span>{page.eyebrow}</span>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">{page.eyebrow}</p>
            <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.96] tracking-[-0.055em] md:text-7xl lg:text-8xl">{page.title}</h1>
            <p className="mt-10 max-w-3xl text-lg leading-8 text-white/55 md:text-xl">{page.intro}</p>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            {page.sections.map((section, index) => (
              <article key={section.title} className="grid gap-8 border-t border-white/15 py-12 lg:grid-cols-[0.55fr_1.45fr]">
                <div>
                  <span className="font-mono text-xs text-white/65">0{index + 1}</span>
                  <h2 className="mt-4 text-2xl font-medium tracking-[-0.035em] md:text-3xl">{section.title}</h2>
                </div>
                <div className="max-w-3xl space-y-5 text-base leading-8 text-white/60">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && (
                    <ul className="grid gap-3 pt-2 sm:grid-cols-2">
                      {section.bullets.map((bullet) => <li key={bullet} className="border-l border-[#c98c45]/60 pl-4 text-sm text-white/70">{bullet}</li>)}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#1c1e1a] px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Brand fit</p>
            <div>
              <h2 className="text-4xl font-medium tracking-[-0.045em] md:text-5xl">{page.fitTitle}</h2>
              <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-white/55">
                {page.fitParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {page.disclaimer && <p className="mt-8 border-l border-[#c98c45] pl-5 text-sm leading-6 text-white/65">{page.disclaimer}</p>}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Related market guides</p>
              <div className="mt-6 flex flex-col items-start gap-3">
                {page.related.map((slug) => {
                  const related = relatedPage(slug)
                  return <Link key={slug} href={related.href} className="text-sm text-white/55 underline decoration-white/15 underline-offset-4 hover:text-white">{related.name}</Link>
                })}
                <Link href="/acquisition-process" className="text-sm text-white/55 underline decoration-white/15 underline-offset-4 hover:text-white">Acquisition process</Link>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-medium tracking-[-0.045em] md:text-5xl">Acquire the Onboard Australian domain portfolio.</h2>
              <p className="mt-5 max-w-2xl leading-7 text-white/65">onboard.com.au, onboard.au and onboard.net.au are offered together for A$49,500 plus GST.</p>
              <AcquisitionCTA source={page.slug} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
