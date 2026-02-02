import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Tradie Website Checklist | 15-Point Audit for Australian Tradies',
  description: 'Download the exact 15-point checklist we use to audit $50M+ worth of Australian trade businesses. See where your website stands and what\'s costing you customers.',
  keywords: 'tradie website checklist, website audit for tradies, australian tradie marketing, trade business website audit',
  openGraph: {
    title: 'Free Tradie Website Checklist | Onboard',
    description: 'The 15-point website checklist every Australian tradie needs. Free download.',
    url: 'https://onboard.com.au/tradie-checklist',
    type: 'website',
  },
}

export default function TradieChecklistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}