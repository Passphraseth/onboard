import { SITE_URL } from '@/lib/acquisition-content'

interface SchemaProps {
  title: string
  description: string
  path: string
  breadcrumbs?: { name: string; path: string }[]
  faqs?: { question: string; answer: string }[]
  article?: boolean
  dateModified?: string
  authorName?: string
}

export default function AcquisitionSchemas({ title, description, path, breadcrumbs = [], faqs, article = false, dateModified, authorName }: SchemaProps) {
  const url = `${SITE_URL}${path}`
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Onboard Australia',
      url: SITE_URL,
      description: 'An Australian domain portfolio available for acquisition.',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Onboard Australia',
      url: SITE_URL,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      ...(dateModified ? { dateModified } : {}),
    },
  ]

  if (article) {
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: title,
      description,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      author: { '@type': 'Organization', name: authorName || 'Onboard Australia' },
      ...(dateModified ? { datePublished: dateModified, dateModified } : {}),
    })
  }

  if (breadcrumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    })
  }

  if (faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    })
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }} />
}
