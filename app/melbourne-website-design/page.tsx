import { Metadata } from 'next'
import LocationLandingPage from '@/components/LocationLandingPage'

export const metadata: Metadata = {
  title: 'Melbourne Website Design for Small Business | Onboard',
  description: 'Professional website design for Melbourne small businesses. Australian servers, fast load times, ready in minutes. Free to preview, $49/month to launch.',
  keywords: 'website design melbourne, melbourne web design, small business website melbourne, website builder melbourne, melbourne website designer',
  openGraph: {
    title: 'Melbourne Website Design | Onboard',
    description: 'Professional websites for Melbourne businesses. Ready in minutes.',
    url: 'https://onboard.com.au/melbourne-website-design',
  },
}

export default function MelbourneWebsiteDesignPage() {
  return (
    <LocationLandingPage
      city="Melbourne"
      state="Victoria"
      heroTitle="Professional websites for Melbourne businesses"
      heroDescription="Skip the agency wait times and DIY frustration. Get a professional website for your Melbourne business in minutes — not weeks. Australian servers for fast local load times."
      suburbs={[
        'Richmond',
        'South Yarra',
        'Fitzroy',
        'Brunswick',
        'St Kilda',
        'Prahran',
        'Collingwood',
        'Carlton',
        'Footscray',
        'Hawthorn',
        'Malvern',
        'Brighton',
        'Toorak',
        'CBD',
        'Doncaster',
        'Ringwood',
        'Frankston',
        'Dandenong',
      ]}
      industries={[
        { name: 'Tradies', slug: 'tradies' },
        { name: 'Plumbers', slug: 'plumbers' },
        { name: 'Electricians', slug: 'electricians' },
        { name: 'Builders', slug: 'builders' },
        { name: 'Cafes', slug: 'cafes' },
        { name: 'Photographers', slug: 'photographers' },
        { name: 'Hairdressers', slug: 'hairdressers' },
        { name: 'Beauticians', slug: 'beauticians' },
        { name: 'Personal Trainers', slug: 'personal-trainers' },
        { name: 'Landscapers', slug: 'landscapers' },
        { name: 'Cleaners', slug: 'cleaners' },
        { name: 'Mechanics', slug: 'mechanics' },
      ]}
    />
  )
}
