export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Onboard Australia',
    url: 'https://onboard.com.au',
    description: 'An Australian domain portfolio available for acquisition.',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function SoftwareApplicationSchema() {
  return null
}

interface ServiceSchemaProps {
  serviceName: string
  serviceType: string
  description: string
  areaServed?: string
}

export function ServiceSchema({ serviceName, serviceType, description, areaServed = 'Australia' }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: serviceName,
    description,
    about: `${serviceType} information for ${areaServed}`,
    isPartOf: { '@type': 'WebSite', name: 'Onboard Australia', url: 'https://onboard.com.au' },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQSchemaProps {
  faqs: { question: string; answer: string }[]
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbSchemaProps {
  items?: { name: string; url: string }[]
  faqs?: { name: string; url: string }[]
}

export function BreadcrumbSchema({ items, faqs }: BreadcrumbSchemaProps) {
  const breadcrumbs = items || faqs || []
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface LocalBusinessSchemaProps {
  name: string
  description: string
  areaServed: string
}

export function LocalBusinessSchema({ name, description, areaServed }: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: name,
    description: description,
    url: 'https://onboard.com.au',
    about: `Editorial information concerning ${areaServed}`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
