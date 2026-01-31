import { Metadata } from 'next'
import CategoryLandingPage from '@/components/CategoryLandingPage'
import { FitnessMockup } from '@/components/WebsiteMockups'

export const metadata: Metadata = {
  title: 'Websites for Personal Trainers Australia | Fitness Website Builder',
  description: 'Professional websites for personal trainers and fitness coaches. Showcase your expertise, share client transformations, and grow your fitness business online.',
  keywords: 'personal trainer website, fitness website builder, PT website, gym website, fitness coach website Australia, online trainer website',
  openGraph: {
    title: 'Websites for Personal Trainers | Onboard',
    description: 'Professional fitness websites that attract clients. Ready in minutes.',
    url: 'https://onboard.com.au/websites-for-personal-trainers',
  },
}

export default function PersonalTrainerWebsitesPage() {
  return (
    <CategoryLandingPage
      industry="Personal Trainer"
      industryPlural="Personal Trainers"
      heroTitle="A PT website that builds your client base"
      heroSubtitle="Websites for personal trainers & fitness coaches"
      heroDescription="You transform bodies and lives. Your website should show that. Showcase client results, your training style, and make it easy for people to start their fitness journey with you."
      benefits={[
        'Showcase client transformations',
        'Display your qualifications',
        'Explain your training philosophy',
        'Easy consultation booking',
        'Promote packages and pricing',
        'Build your personal brand',
      ]}
      features={[
        { title: 'Transformation gallery', description: 'Before/after client results' },
        { title: 'Training programs', description: 'PT, group, online coaching options' },
        { title: 'About & qualifications', description: 'Build trust with your credentials' },
        { title: 'Pricing packages', description: 'Clear session and package pricing' },
        { title: 'Free consultation', description: 'Easy booking for trial sessions' },
        { title: 'Testimonials', description: 'Client success stories' },
      ]}
      painPoints={[
        "Relying only on gym referrals for new clients",
        "Hard to compete with big fitness chains online",
        "No professional way to show your results",
        "Social media alone isn't converting to clients",
      ]}
      keywords={[
        'personal trainer website',
        'PT website',
        'fitness coach website',
        'gym trainer website',
        'online trainer website',
      ]}
      mockup={<FitnessMockup />}
      ctaText="Create my PT website"
    />
  )
}
