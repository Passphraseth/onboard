import { Metadata } from 'next'
import CategoryLandingPage from '@/components/CategoryLandingPage'

export const metadata: Metadata = {
  title: 'Websites for Landscapers Australia | Landscaping Website Builder',
  description: 'Professional websites for landscapers and gardeners. Showcase your outdoor transformations and get more landscaping jobs with a stunning portfolio website.',
  keywords: 'landscaper website, landscaping website builder, gardener website, lawn care website, outdoor living website Australia, landscape design website',
  openGraph: {
    title: 'Websites for Landscapers | Onboard',
    description: 'Professional landscaping websites that showcase your work. Ready in minutes.',
    url: 'https://onboard.com.au/websites-for-landscapers',
  },
}

export default function LandscaperWebsitesPage() {
  return (
    <CategoryLandingPage
      industry="Landscaper"
      industryPlural="Landscapers"
      heroTitle="A landscaping website that grows your business"
      heroSubtitle="Websites for landscapers & gardeners"
      heroDescription="Your outdoor transformations speak for themselves. Let your website show them off. Get a professional website with stunning project galleries that wins you more jobs."
      benefits={[
        'Showcase project transformations',
        'Before and after galleries',
        'Highlight your expertise areas',
        'Easy consultation requests',
        'Professional portfolio display',
        'Local SEO optimised',
      ]}
      features={[
        { title: 'Project gallery', description: 'Before/after of your best transformations' },
        { title: 'Service showcase', description: 'Design, installation, maintenance' },
        { title: 'Seasonal services', description: 'Promote seasonal landscaping work' },
        { title: 'Free quote forms', description: 'Capture leads with easy forms' },
        { title: 'Service areas', description: 'Map of suburbs you service' },
        { title: 'Team & equipment', description: 'Show your capabilities' },
      ]}
      painPoints={[
        "Beautiful work but no way to show it online",
        "Losing jobs to competitors with better websites",
        "Photos scattered across phone and social media",
        "No professional way to send to potential clients",
      ]}
      keywords={[
        'landscaper website',
        'gardener website',
        'lawn care website',
        'landscape design website',
        'landscaping portfolio',
      ]}
      ctaText="Create my landscaping website"
    />
  )
}
