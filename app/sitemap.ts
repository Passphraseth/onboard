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

  return [...staticPages, ...industryPages]
}
