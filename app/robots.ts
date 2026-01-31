import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://onboard.com.au'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/claim/'],
      },
      // Allow AI crawlers for AI search visibility
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      {
        userAgent: 'Anthropic-AI',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
