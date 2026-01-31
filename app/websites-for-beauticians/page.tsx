import { Metadata } from 'next'
import CategoryLandingPage from '@/components/CategoryLandingPage'

export const metadata: Metadata = {
  title: 'Websites for Beauty Salons & Nail Technicians Australia | Beauty Website Builder',
  description: 'Stunning websites for beauty therapists, nail techs, and beauty salons. Showcase your treatments, build trust, and attract more clients with a professional beauty website.',
  keywords: 'beauty salon website, nail technician website, beauty therapist website, lash tech website, beauty website builder Australia, spa website design',
  openGraph: {
    title: 'Websites for Beauty Salons & Nail Techs | Onboard',
    description: 'Beautiful websites for beauty businesses. Ready in minutes.',
    url: 'https://onboard.com.au/websites-for-beauticians',
  },
}

export default function BeauticianWebsitesPage() {
  return (
    <CategoryLandingPage
      industry="Beauty Therapist"
      industryPlural="Beauty Professionals"
      heroTitle="A beauty website that attracts dream clients"
      heroSubtitle="Websites for beauty salons & nail techs"
      heroDescription="You create stunning results for your clients. Your website should showcase that. Get a beautiful, professional website that builds trust and fills your appointment book."
      benefits={[
        'Showcase your treatments beautifully',
        'Build trust with new clients',
        'Display services and pricing clearly',
        'Connect your social media',
        'Easy online booking integration',
        'Look as premium as your services',
      ]}
      features={[
        { title: 'Treatment gallery', description: 'Before/after photos and portfolio' },
        { title: 'Service menu', description: 'Facials, nails, lashes, waxing and more' },
        { title: 'Brand aesthetic', description: 'Elegant design matching your salon style' },
        { title: 'Booking links', description: 'Connect to your booking system' },
        { title: 'Gift vouchers', description: 'Promote gift cards and packages' },
        { title: 'Client testimonials', description: 'Social proof from happy clients' },
      ]}
      painPoints={[
        "Relying only on Instagram to get new clients",
        "Hard to communicate your full range of services",
        "No professional presence for referrals to check",
        "Competitors with websites appearing more established",
      ]}
      keywords={[
        'beauty salon website',
        'nail tech website',
        'beauty therapist website',
        'lash tech website',
        'spa website builder',
      ]}
      screenshotImage="/screenshots/beautician.svg"
      ctaText="Create my beauty website"
    />
  )
}
