import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import PortfolioBanner from '@/components/PortfolioBanner'

export const metadata: Metadata = {
  title: 'Onboard Australia',
  description: 'The Onboard Australian domain portfolio.',
  authors: [{ name: 'Onboard' }],
  creator: 'Onboard',
  publisher: 'Onboard',
  metadataBase: new URL('https://onboard.com.au'),
  openGraph: {
    title: 'Acquire Onboard Australia',
    description: 'A category-defining Australian domain portfolio for onboarding products and services.',
    url: 'https://onboard.com.au',
    siteName: 'Onboard',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acquire Onboard Australia',
    description: 'A category-defining Australian domain portfolio for onboarding products and services.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        {children}
        <PortfolioBanner />
      </body>
    </html>
  )
}
