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
