import { Metadata } from 'next'
import CategoryLandingPage from '@/components/CategoryLandingPage'
import { ElectricianMockup } from '@/components/WebsiteMockups'

export const metadata: Metadata = {
  title: 'Websites for Electricians Australia | Professional Electrician Website Builder',
  description: 'Get a professional electrician website that generates more leads. Built for Australian sparkies. Mobile-friendly, SEO-ready, and designed to win more jobs.',
  keywords: 'electrician website, electrician website builder, electrical contractor website, sparky website, tradie website Australia, electrical services website',
  openGraph: {
    title: 'Websites for Electricians | Onboard',
    description: 'Professional websites for Australian electricians. Ready in minutes.',
    url: 'https://onboard.com.au/websites-for-electricians',
  },
}

export default function ElectricianWebsitesPage() {
  return (
    <CategoryLandingPage
      industry="Electrician"
      industryPlural="Electricians"
      heroTitle="An electrician website that generates leads"
      heroSubtitle="Professional websites for electricians"
      heroDescription="Your electrical skills are top-notch. Your website should be too. Get a professional website that showcases your expertise and makes customers trust you before they even call."
      benefits={[
        'Rank higher on Google locally',
        'Convert visitors into customers',
        'Display licenses and certifications',
        'Easy emergency contact access',
        'Professional service showcase',
        'Mobile-first design',
      ]}
      features={[
        { title: '24/7 emergency', description: 'Highlight your emergency electrical services' },
        { title: 'License display', description: 'Show your electrical license credentials' },
        { title: 'Service range', description: 'From power points to full rewiring' },
        { title: 'Safety focused', description: 'Emphasise your safety record and practices' },
        { title: 'Quote system', description: 'Free quote request forms' },
        { title: 'Service areas', description: 'Map of your covered suburbs' },
      ]}
      painPoints={[
        "Competitors with flashier websites getting the jobs",
        "No time to build or maintain a website",
        "Current website doesn't show your professionalism",
        "Missing out on customers searching online",
      ]}
      keywords={[
        'electrician website',
        'sparky website builder',
        'electrical contractor website',
        'tradie website',
        'emergency electrician website',
      ]}
      mockup={<ElectricianMockup />}
      ctaText="Create my electrician website"
    />
  )
}
