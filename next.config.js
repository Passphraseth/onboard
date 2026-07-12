/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'maps.googleapis.com'],
  },
  async redirects() {
    return [
      {
        source: '/blog/tradie-marketing-7-ways-to-get-more-jobs-without-wasting-money',
        destination: '/blog/tradie-marketing',
        permanent: true,
      },
      {
        source: '/blog/how-much-does-a-tradie-website-cost-in-2026-real-prices-no-bs',
        destination: '/blog/tradie-website-cost',
        permanent: true,
      },
      {
        source: '/best-website-builder-for-tradies',
        destination: '/blog/best-website-builder-for-tradies',
        permanent: true,
      },
      {
        source: '/best-website-builders-small-business-australia',
        destination: '/blog/best-website-builders-small-business-australia',
        permanent: true,
      },
      {
        source: '/websites-for-plumber',
        destination: '/websites-for-plumbers',
        permanent: true,
      },
      {
        source: '/onboard',
        destination: '/acquire',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/acquire',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/acquire',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/terms',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
