import { Metadata } from 'next'
import CategoryLandingPage from '@/components/CategoryLandingPage'
import { CleanerMockup } from '@/components/WebsiteMockups'

export const metadata: Metadata = {
  title: 'Websites for Cleaners Australia | Cleaning Business Website Builder',
  description: 'Professional websites for cleaning businesses. Showcase your services, build trust with badges, and get more cleaning jobs with a website that converts.',
  keywords: 'cleaning business website, cleaner website builder, house cleaning website, commercial cleaning website, cleaning service website Australia, end of lease cleaning website',
  openGraph: {
    title: 'Websites for Cleaning Businesses | Onboard',
    description: 'Professional websites for cleaners. Ready in minutes.',
    url: 'https://onboard.com.au/websites-for-cleaners',
  },
}

export default function CleanerWebsitesPage() {
  return (
    <CategoryLandingPage
      industry="Cleaner"
      industryPlural="Cleaning Businesses"
      heroTitle="A cleaning website that books more jobs"
      heroSubtitle="Websites for cleaning businesses"
      heroDescription="You make spaces spotless. Your website should make booking spotless too. Get a professional website that builds trust and makes it easy for customers to hire you."
      benefits={[
        'Show up in local Google searches',
        'Build trust with new customers',
        'Clear service and pricing display',
        'Easy quote request forms',
        'Professional and trustworthy look',
        'Works great on mobile',
      ]}
      features={[
        { title: 'Service packages', description: 'Regular, deep clean, end of lease options' },
        { title: 'Trust badges', description: 'Insured, police checked, eco-friendly' },
        { title: 'Before/after gallery', description: 'Showcase your cleaning transformations' },
        { title: 'Quote calculator', description: 'Help customers understand pricing' },
        { title: 'Service areas', description: 'Show which suburbs you cover' },
        { title: 'Booking system', description: 'Easy online scheduling' },
      ]}
      painPoints={[
        "Struggling to stand out from other cleaning services",
        "Customers questioning if you're legitimate",
        "Hard to communicate your range of services",
        "Wasting time on quotes that don't convert",
      ]}
      keywords={[
        'cleaning business website',
        'house cleaner website',
        'commercial cleaning website',
        'end of lease cleaning website',
        'cleaning service website',
      ]}
      mockup={<CleanerMockup />}
      ctaText="Create my cleaning website"
    />
  )
}
