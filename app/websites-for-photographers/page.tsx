import { Metadata } from 'next'
import CategoryLandingPage from '@/components/CategoryLandingPage'
import { PhotographyMockup } from '@/components/WebsiteMockups'

export const metadata: Metadata = {
  title: 'Websites for Photographers Australia | Photography Portfolio Website Builder',
  description: 'Stunning portfolio websites for photographers. Showcase your work beautifully, attract dream clients, and grow your photography business with a professional website.',
  keywords: 'photographer website, photography portfolio website, wedding photographer website, portrait photographer website Australia, photography website builder',
  openGraph: {
    title: 'Websites for Photographers | Onboard',
    description: 'Beautiful photography portfolio websites. Ready in minutes.',
    url: 'https://onboard.com.au/websites-for-photographers',
  },
}

export default function PhotographerWebsitesPage() {
  return (
    <CategoryLandingPage
      industry="Photographer"
      industryPlural="Photographers"
      heroTitle="A photography website that wins dream clients"
      heroSubtitle="Portfolio websites for photographers"
      heroDescription="Your images tell stories. Your website should tell yours. Get a stunning portfolio website that showcases your best work and attracts the clients you actually want."
      benefits={[
        'Beautiful portfolio galleries',
        'Fast-loading image display',
        'Multiple gallery categories',
        'Enquiry forms for bookings',
        'Mobile-optimised galleries',
        'SEO for local searches',
      ]}
      features={[
        { title: 'Portfolio galleries', description: 'Weddings, portraits, events, and more' },
        { title: 'Full-screen slideshows', description: 'Immersive image viewing' },
        { title: 'About your style', description: 'Share your photography philosophy' },
        { title: 'Package pricing', description: 'Clear service and pricing info' },
        { title: 'Booking enquiry', description: 'Easy contact for quotes' },
        { title: 'Client proofing', description: 'Link to gallery delivery' },
      ]}
      painPoints={[
        "Amazing photos stuck on Instagram without context",
        "Website templates that don't do your work justice",
        "Spending hours building instead of shooting",
        "Hard to show different photography styles together",
      ]}
      keywords={[
        'photographer website',
        'photography portfolio',
        'wedding photographer website',
        'portrait photographer website',
        'photography website builder',
      ]}
      mockup={<PhotographyMockup />}
      ctaText="Create my photography website"
    />
  )
}
