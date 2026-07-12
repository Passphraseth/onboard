import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://onboard.com.au'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/claim/', '/checkout/', '/site/', '/login/'],
      },
      // Allow AI crawlers for AI search visibility
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/claim/', '/checkout/', '/site/', '/login/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/claim/', '/checkout/', '/site/', '/login/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/claim/', '/checkout/', '/site/', '/login/'],
      },
      {
        userAgent: 'Anthropic-AI',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/claim/', '/checkout/', '/site/', '/login/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/claim/', '/checkout/', '/site/', '/login/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/claim/', '/checkout/', '/site/', '/login/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
