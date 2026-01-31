import { Metadata } from 'next'
import CategoryLandingPage from '@/components/CategoryLandingPage'

export const metadata: Metadata = {
  title: 'Websites for Mechanics Australia | Auto Repair Website Builder',
  description: 'Professional websites for mechanics and auto repair shops. Build customer trust, showcase your services, and get more bookings with a mechanic website that works.',
  keywords: 'mechanic website, auto repair website builder, car service website, automotive website Australia, workshop website, mobile mechanic website',
  openGraph: {
    title: 'Websites for Mechanics | Onboard',
    description: 'Professional auto repair websites that build trust. Ready in minutes.',
    url: 'https://onboard.com.au/websites-for-mechanics',
  },
}

export default function MechanicWebsitesPage() {
  return (
    <CategoryLandingPage
      industry="Mechanic"
      industryPlural="Mechanics"
      heroTitle="A mechanic website that builds customer trust"
      heroSubtitle="Websites for mechanics & auto repairers"
      heroDescription="Customers want to know they can trust their mechanic. A professional website builds that trust before they even walk in. Show off your expertise and make booking easy."
      benefits={[
        'Build trust with new customers',
        'Clear service menu display',
        'Easy online booking',
        'Show certifications and experience',
        'Mobile-friendly for on-the-go searches',
        'Local SEO for nearby customers',
      ]}
      features={[
        { title: 'Service menu', description: 'Servicing, repairs, tyres, and more' },
        { title: 'Trust signals', description: 'Licensed, experienced, warranty info' },
        { title: 'Booking system', description: 'Let customers book their service' },
        { title: 'Location info', description: 'Easy to find with maps and hours' },
        { title: 'Vehicle types', description: 'Show what makes and models you work on' },
        { title: 'Customer reviews', description: 'Display your Google reviews' },
      ]}
      painPoints={[
        "Customers unsure if they can trust a new mechanic",
        "Competitors with modern websites getting the jobs",
        "Hard to compete with big chain service centers",
        "No online presence when customers search for mechanics",
      ]}
      keywords={[
        'mechanic website',
        'auto repair website',
        'car service website',
        'workshop website',
        'mobile mechanic website',
      ]}
      ctaText="Create my mechanic website"
    />
  )
}
