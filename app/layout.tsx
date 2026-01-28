import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Onboard 🛫 - No Bullsh*t Websites',
  description: 'Professional websites for service businesses. Updates by text message. Live in 24 hours. From $29/mo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-brand-blue text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
