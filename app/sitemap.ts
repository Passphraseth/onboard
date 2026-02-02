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
    {
      url: `${baseUrl}/onboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
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
    'do-tradies-need-a-website',
    'best-website-builders-small-business-australia',
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  // Lead magnet pages
  const leadMagnetPages = [
    'tradie-checklist',
    'roi-calculator', 
    'free-audit',
  ].map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...industryPages, ...locationPages, ...blogPages, ...leadMagnetPages]
}
