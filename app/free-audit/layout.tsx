import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Website Audit | Professional Analysis Within 24 Hours',
  description: 'Get a free professional website audit from an expert. I\'ll personally review your site and send actionable recommendations within 24-48 hours.',
  keywords: 'free website audit, website analysis, website review australia, professional website audit',
  openGraph: {
    title: 'Free Website Audit | Onboard',
    description: 'Get a free professional website audit with actionable recommendations.',
    url: 'https://onboard.com.au/free-audit',
    type: 'website',
  },
}

export default function FreeAuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}