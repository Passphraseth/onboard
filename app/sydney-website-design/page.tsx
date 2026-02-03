import { Metadata } from 'next'
import LocationLandingPage from '@/components/LocationLandingPage'

export const metadata: Metadata = {
  title: 'Sydney Website Design for Small Business | Onboard',
  description: 'Professional website design for Sydney small businesses. Australian hosting, fast performance, ready in minutes. Free to preview, $49/month.',
  keywords: 'website design sydney, sydney web design, small business website sydney, website builder sydney, sydney website designer',
  openGraph: {
    title: 'Sydney Website Design | Onboard',
    description: 'Professional websites for Sydney businesses. Ready in minutes.',
    url: 'https://onboard.com.au/sydney-website-design',
  },
}

export default function SydneyWebsiteDesignPage() {
  return (
    <LocationLandingPage
      city="Sydney"
      state="New South Wales"
      heroTitle="Professional websites for Sydney businesses"
      heroDescription="Sydney moves fast. Your website should keep up. Get a professional site for your Sydney business in minutes — no agency wait times, no DIY hassle."
      suburbs={[
        'Surry Hills',
        'Newtown',
        'Bondi',
        'Paddington',
        'Balmain',
        'Manly',
        'Parramatta',
        'Chatswood',
        'Mosman',
        'Double Bay',
        'Darlinghurst',
        'Alexandria',
        'CBD',
        'North Sydney',
        'Cronulla',
        'Penrith',
        'Liverpool',
        'Blacktown',
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
