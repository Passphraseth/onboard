import { Metadata } from 'next'
import CategoryLandingPage from '@/components/CategoryLandingPage'

export const metadata: Metadata = {
  title: 'Websites for Plumbers Australia | Professional Plumber Website Builder',
  description: 'Get a professional plumber website that brings in more jobs. Built for Australian plumbers. Mobile-friendly, SEO-ready, and designed to convert visitors into customers.',
  keywords: 'plumber website, plumber website builder, plumbing website design, plumber web design Australia, tradie website, emergency plumber website',
  openGraph: {
    title: 'Websites for Plumbers | Onboard',
    description: 'Professional websites for Australian plumbers. Ready in minutes.',
    url: 'https://onboard.com.au/websites-for-plumbers',
  },
}

export default function PlumberWebsitesPage() {
  return (
    <CategoryLandingPage
      industry="Plumber"
      industryPlural="Plumbers"
      heroTitle="A plumber website that brings in more jobs"
      heroSubtitle="Professional websites for plumbers"
      heroDescription="Stop losing customers to competitors with better websites. Get a professional, mobile-friendly website that showcases your services and makes it easy for customers to contact you."
      benefits={[
        'Show up on Google for local searches',
        'Get more calls from your website',
        'Look professional and trustworthy',
        'Showcase your services clearly',
        'Easy contact form for quotes',
        'Works perfectly on mobile',
      ]}
      features={[
        { title: 'Emergency callouts', description: 'Prominent emergency contact for urgent jobs' },
        { title: 'Service areas', description: 'Show customers which suburbs you service' },
        { title: 'Service showcase', description: 'Display your plumbing services clearly' },
        { title: 'Trust signals', description: 'Licensed, insured, and experienced badges' },
        { title: 'Quote requests', description: 'Easy forms for customers to request quotes' },
        { title: 'Mobile optimised', description: 'Looks great on phones where customers search' },
      ]}
      painPoints={[
        "Paying for ads but your website doesn't convert",
        "Losing jobs to competitors with better websites",
        "Your website looks outdated or unprofessional",
        "Customers can't find your contact details easily",
      ]}
      keywords={[
        'plumber website',
        'plumber website builder',
        'plumbing web design',
        'tradie website',
        'emergency plumber website',
        'local plumber website',
      ]}
      ctaText="Create my plumber website"
    />
  )
}
