import { Metadata } from 'next'
import CategoryLandingPage from '@/components/CategoryLandingPage'

export const metadata: Metadata = {
  title: 'Websites for Hairdressers & Barbers Australia | Salon Website Builder',
  description: 'Beautiful websites for hairdressers and barbers. Showcase your portfolio, accept bookings, and grow your client base with a stunning salon website.',
  keywords: 'hairdresser website, salon website builder, barber website, hair salon website design, hairdresser portfolio website, beauty salon website Australia',
  openGraph: {
    title: 'Websites for Hairdressers & Barbers | Onboard',
    description: 'Beautiful salon websites that attract new clients. Ready in minutes.',
    url: 'https://onboard.com.au/websites-for-hairdressers',
  },
}

export default function HairdresserWebsitesPage() {
  return (
    <CategoryLandingPage
      industry="Hairdresser"
      industryPlural="Hairdressers & Barbers"
      heroTitle="A salon website as stylish as your work"
      heroSubtitle="Websites for hairdressers & barbers"
      heroDescription="Your cuts are on point. Your website should be too. Showcase your portfolio, attract new clients, and make booking easy with a website that reflects your salon's vibe."
      benefits={[
        'Showcase your best work',
        'Connect your Instagram feed',
        'Display your services and pricing',
        'Make booking easy for clients',
        'Look professional and modern',
        'Stand out from other salons',
      ]}
      features={[
        { title: 'Portfolio gallery', description: 'Showcase your transformations and styles' },
        { title: 'Service menu', description: 'Clear pricing for cuts, colour, and treatments' },
        { title: 'Instagram integration', description: 'Pull in your latest work automatically' },
        { title: 'Online booking', description: 'Let clients book appointments easily' },
        { title: 'Team profiles', description: 'Introduce your stylists and their specialties' },
        { title: 'Location & hours', description: 'Make it easy for clients to find you' },
      ]}
      painPoints={[
        "Relying only on social media for online presence",
        "Hard for new clients to find your services and prices",
        "No professional website to share with referrals",
        "Spending hours managing bookings manually",
      ]}
      keywords={[
        'hairdresser website',
        'salon website builder',
        'barber website',
        'hair salon website',
        'stylist portfolio website',
      ]}
      screenshotImage="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80"
      ctaText="Create my salon website"
    />
  )
}
