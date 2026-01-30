import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Onboard — Professional websites for service businesses',
  description: 'Get a stunning, conversion-focused website for your business in minutes. Built for tradies, cafes, photographers, and service businesses across Australia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
