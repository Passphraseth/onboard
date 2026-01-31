export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Onboard',
    url: 'https://onboard.com.au',
    logo: 'https://onboard.com.au/logo.png',
    description: 'Professional websites for Australian service businesses. Ready in minutes, not weeks.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressCountry: 'AU',
    },
    sameAs: [
      'https://instagram.com/onboard',
      'https://linkedin.com/company/onboard',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function SoftwareApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Onboard Website Builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
      description: 'Free to preview, $49/month to launch',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
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
    '@type': 'Service',
    name: serviceName,
    serviceType: serviceType,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'Onboard',
      url: 'https://onboard.com.au',
    },
    areaServed: {
      '@type': 'Country',
      name: areaServed,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Preview',
            description: 'Free website preview',
          },
          price: '0',
          priceCurrency: 'AUD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Launch',
            description: 'Full website with custom domain',
          },
          price: '49',
          priceCurrency: 'AUD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '49',
            priceCurrency: 'AUD',
            billingDuration: 'P1M',
          },
        },
      ],
    },
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
  items: { name: string; url: string }[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
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
