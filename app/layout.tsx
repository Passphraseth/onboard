import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'Onboard — Professional websites for service businesses',
  description: 'Get a stunning, conversion-focused website for your business in minutes. Built for tradies, cafes, photographers, and service businesses across Australia.',
  keywords: 'website builder, service business website, Australian website builder, tradie website, small business website, plumber website, electrician website, hairdresser website',
  authors: [{ name: 'Onboard' }],
  creator: 'Onboard',
  publisher: 'Onboard',
  metadataBase: new URL('https://onboard.com.au'),
  openGraph: {
    title: 'Onboard — Professional websites for service businesses',
    description: 'Get a stunning, conversion-focused website for your business in minutes.',
    url: 'https://onboard.com.au',
    siteName: 'Onboard',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Onboard — Professional websites for service businesses',
    description: 'Get a stunning, conversion-focused website for your business in minutes.',
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
      </body>
    </html>
  )
}
