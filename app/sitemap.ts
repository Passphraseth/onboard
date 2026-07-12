import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://onboard.com.au'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...[
      'employee-onboarding',
      'contractor-onboarding',
      'customer-onboarding',
      'client-onboarding',
      'saas-onboarding',
      'kyc-onboarding',
      'construction-inductions',
      'australian-onboarding-software-market',
      'melbourne-onboarding-software',
      'sydney-customer-onboarding',
      'acquisition-process',
      'acquire',
      'privacy',
      'terms',
      'disclaimer',
      'aml-ctf',
      'aml-ctf-onboarding-software-australia',
      'tranche-2-client-onboarding',
      'aml-ctf-accountants',
      'aml-ctf-law-firms',
      'aml-ctf-real-estate',
      'kyc-vs-kyb',
      'customer-due-diligence-cdd',
      'enhanced-customer-due-diligence',
      'australian-aml-ctf-software-market',
    ].map((path) => ({
      url: `${baseUrl}/${path}`,
      lastModified: new Date(),
      changeFrequency: path === 'acquire' ? 'weekly' as const : 'monthly' as const,
      priority: path === 'acquire' ? 0.95 : path.includes('onboarding') || path === 'construction-inductions' ? 0.85 : 0.7,
    })),
  ]

  // Industry landing pages - high priority for SEO
  const industryPages = [
    'tradies',
    'plumbers',
    'electricians',
    'hairdressers',
    'beauticians',
    'cleaners',
    'landscapers',
    'mechanics',
    'cafes',
    'personal-trainers',
    'photographers',
    'builders',
    'hvac',
  ].map((industry) => ({
    url: `${baseUrl}/websites-for-${industry}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // City/location pages for local SEO
  const locationPages = [
    'melbourne',
    'sydney',
    'brisbane',
  ].map((city) => ({
    url: `${baseUrl}/${city}-website-design`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Blog posts
  const blogPages = [
    'best-website-builder-for-tradies',
    'best-website-builders-small-business-australia',
    'do-tradies-need-a-website',
    'hipages-vs-own-website',
    'plumber-website-design',
    'seo-for-tradies',
    'small-business-website-cost-australia',
    'tradie-marketing',
    'tradie-website-cost',
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...industryPages, ...locationPages, ...blogPages]
}
