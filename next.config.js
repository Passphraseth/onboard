/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'maps.googleapis.com'],
  },
  // Fix canonical issues - redirect www to non-www and enforce trailing slash consistency
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.onboard.com.au',
          },
        ],
        destination: 'https://onboard.com.au/:path*',
        permanent: true,
      },
    ]
  },
  // Consistent trailing slash handling (no trailing slash)
  trailingSlash: false,
}

module.exports = nextConfig
