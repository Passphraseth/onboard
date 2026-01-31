import { Metadata } from 'next'
import CategoryLandingPage from '@/components/CategoryLandingPage'

export const metadata: Metadata = {
  title: 'Websites for Builders & Construction Australia | Builder Website Builder',
  description: 'Professional websites for builders and construction companies. Showcase your projects, build trust, and win more construction jobs with a website that works.',
  keywords: 'builder website, construction website builder, building company website, renovation website, home builder website Australia, construction company website',
  openGraph: {
    title: 'Websites for Builders & Construction | Onboard',
    description: 'Professional builder websites that win more jobs. Ready in minutes.',
    url: 'https://onboard.com.au/websites-for-builders',
  },
}

export default function BuilderWebsitesPage() {
  return (
    <CategoryLandingPage
      industry="Builder"
      industryPlural="Builders & Construction"
      heroTitle="A builder website that wins bigger jobs"
      heroSubtitle="Websites for builders & construction"
      heroDescription="Your builds speak for themselves. Make sure clients can see them. A professional website showcases your projects, credentials, and capabilities to win the jobs you want."
      benefits={[
        'Showcase completed projects',
        'Display licenses and credentials',
        'Before and after galleries',
        'Build trust with testimonials',
        'Professional quote requests',
        'Stand out from competitors',
      ]}
      features={[
        { title: 'Project portfolio', description: 'Before/after of completed builds' },
        { title: 'Service areas', description: 'Renovations, extensions, new builds' },
        { title: 'License & insurance', description: 'Display your credentials' },
        { title: 'Quote requests', description: 'Professional enquiry forms' },
        { title: 'Team showcase', description: 'Introduce your building team' },
        { title: 'Testimonials', description: 'Client reviews and references' },
      ]}
      painPoints={[
        "Best work hidden in a phone gallery",
        "Losing jobs to builders with better marketing",
        "Hard to show your range of capabilities",
        "No professional presence for larger projects",
      ]}
      keywords={[
        'builder website',
        'construction website',
        'renovation website',
        'home builder website',
        'building company website',
      ]}
      ctaText="Create my builder website"
    />
  )
}
