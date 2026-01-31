import { Metadata } from 'next'
import CategoryLandingPage from '@/components/CategoryLandingPage'

export const metadata: Metadata = {
  title: 'Websites for Cafes & Restaurants Australia | Hospitality Website Builder',
  description: 'Beautiful websites for cafes and restaurants. Showcase your menu, ambiance, and location to attract more diners and boost your online presence.',
  keywords: 'cafe website, restaurant website builder, hospitality website, coffee shop website, bistro website Australia, menu website design',
  openGraph: {
    title: 'Websites for Cafes & Restaurants | Onboard',
    description: 'Beautiful hospitality websites that attract diners. Ready in minutes.',
    url: 'https://onboard.com.au/websites-for-cafes',
  },
}

export default function CafeWebsitesPage() {
  return (
    <CategoryLandingPage
      industry="Cafe"
      industryPlural="Cafes & Restaurants"
      heroTitle="A cafe website that fills more seats"
      heroSubtitle="Websites for cafes & restaurants"
      heroDescription="Your food is amazing. Make sure people can find you online. A beautiful website showcases your menu, vibe, and location to hungry customers searching nearby."
      benefits={[
        'Showcase your menu and specials',
        'Beautiful food photography display',
        'Easy to find location and hours',
        'Online ordering integration',
        'Capture the vibe and atmosphere',
        'Show up in local food searches',
      ]}
      features={[
        { title: 'Menu display', description: 'Breakfast, lunch, dinner, and specials' },
        { title: 'Photo gallery', description: 'Showcase food and atmosphere' },
        { title: 'Location & hours', description: 'Clear directions and opening times' },
        { title: 'Reservation links', description: 'Connect to your booking system' },
        { title: 'Instagram feed', description: 'Pull in your latest food shots' },
        { title: 'Events & catering', description: 'Promote functions and catering' },
      ]}
      painPoints={[
        "Missing customers who search online before dining out",
        "Menu changes require expensive website updates",
        "Google listing doesn't show your personality",
        "No way to promote events and specials online",
      ]}
      keywords={[
        'cafe website',
        'restaurant website',
        'coffee shop website',
        'bistro website',
        'hospitality website',
      ]}
      screenshotImage="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80"
      ctaText="Create my cafe website"
    />
  )
}
