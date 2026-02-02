import { Metadata } from 'next'
import CategoryLandingPage from '@/components/CategoryLandingPage'

export const metadata: Metadata = {
  title: 'Websites for Tradies Australia | Professional Tradie Website Builder',
  description: 'Professional websites for Australian tradies. Ready in minutes, not weeks. Mobile-friendly, fast hosting, contact forms included. Free to preview, $49/month.',
  keywords: 'tradie website, tradie website builder, website for tradies australia, tradesman website, trade business website',
  openGraph: {
    title: 'Websites for Tradies Australia | Onboard',
    description: 'Professional tradie websites ready in minutes. Free to preview.',
    url: 'https://onboard.com.au/websites-for-tradies',
  },
}

export default function TradieWebsitesPage() {
  return (
    <CategoryLandingPage
      industry="Tradie"
      industryPlural="Tradies"
      heroTitle="A website that works as hard as you do"
      heroSubtitle="Websites for Tradies"
      heroDescription="87% of Australians search online before hiring a tradie. Show up professional, win more jobs. Your website is ready in minutes — not weeks."
      benefits={[
        'Show off your best work',
        'Click-to-call on mobile',
        'Capture quote requests 24/7',
        'Look professional instantly',
        'Rank in local Google searches',
        'Works on every device',
      ]}
      features={[
        { title: 'Project gallery', description: 'Photos of completed jobs that sell your skills' },
        { title: 'Service areas', description: 'Show exactly where you work' },
        { title: 'Quote request forms', description: 'Capture leads while you\'re on the tools' },
        { title: 'Click to call', description: 'One tap to ring you from mobile' },
        { title: 'Licence & insurance', description: 'Build trust with credentials upfront' },
        { title: 'Fast Australian hosting', description: 'Quick load times for local customers' },
      ]}
      painPoints={[
        "Losing jobs to competitors who show up on Google",
        "Word of mouth is great, but referrals still Google you first",
        "No time or budget for expensive web designers",
        "Current site looks outdated or doesn't work on phones",
      ]}
      keywords={[
        'tradie website',
        'tradesman website',
        'trade business website',
        'website for tradies',
        'tradie website builder',
      ]}
      ctaText="Create my tradie website"
    />
  )
}
