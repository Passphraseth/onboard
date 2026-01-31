import { Metadata } from 'next'
import CategoryLandingPage from '@/components/CategoryLandingPage'

export const metadata: Metadata = {
  title: 'Websites for HVAC & Air Conditioning Australia | HVAC Website Builder',
  description: 'Professional websites for HVAC technicians and air conditioning businesses. Generate more leads, showcase your services, and build trust with a professional website.',
  keywords: 'hvac website, air conditioning website builder, heating cooling website, AC repair website, air con website Australia, refrigeration website',
  openGraph: {
    title: 'Websites for HVAC & Air Conditioning | Onboard',
    description: 'Professional HVAC websites that generate leads. Ready in minutes.',
    url: 'https://onboard.com.au/websites-for-hvac',
  },
}

export default function HvacWebsitesPage() {
  return (
    <CategoryLandingPage
      industry="HVAC Technician"
      industryPlural="HVAC & Air Con Specialists"
      heroTitle="An HVAC website that keeps leads flowing"
      heroSubtitle="Websites for air conditioning & heating"
      heroDescription="Customers need to trust who they let into their home or business. A professional website builds that trust and shows you're the right choice for their comfort needs."
      benefits={[
        'Generate more service leads',
        'Highlight emergency services',
        'Display brands you service',
        'Easy booking and quotes',
        'Build customer trust',
        'Show up in local searches',
      ]}
      features={[
        { title: 'Service showcase', description: 'Install, repair, maintenance services' },
        { title: 'Emergency callouts', description: 'Prominent 24/7 contact' },
        { title: 'Brands serviced', description: 'Show logos of brands you work on' },
        { title: 'License display', description: 'ARCtick and trade credentials' },
        { title: 'Quote requests', description: 'Easy enquiry forms' },
        { title: 'Service areas', description: 'Show your coverage zone' },
      ]}
      painPoints={[
        "Competitors getting the jobs with better websites",
        "Customers can't find your emergency contact",
        "No way to show your range of services online",
        "Missing out on commercial and residential leads",
      ]}
      keywords={[
        'hvac website',
        'air conditioning website',
        'heating cooling website',
        'AC repair website',
        'refrigeration website',
      ]}
      screenshotImage="https://images.unsplash.com/photo-1631545806609-6578e9192f0a?w=1200&q=80"
      ctaText="Create my HVAC website"
    />
  )
}
