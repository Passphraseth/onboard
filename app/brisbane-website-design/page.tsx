import { Metadata } from 'next'
import LocationLandingPage from '@/components/LocationLandingPage'

export const metadata: Metadata = {
  title: 'Brisbane Website Design for Small Business | Onboard',
  description: 'Professional website design for Brisbane small businesses. Australian servers, fast load times, ready in minutes. Free to preview, $49/month.',
  keywords: 'website design brisbane, brisbane web design, small business website brisbane, website builder brisbane, brisbane website designer',
  openGraph: {
    title: 'Brisbane Website Design | Onboard',
    description: 'Professional websites for Brisbane businesses. Ready in minutes.',
    url: 'https://onboard.com.au/brisbane-website-design',
  },
}

export default function BrisbaneWebsiteDesignPage() {
  return (
    <LocationLandingPage
      city="Brisbane"
      state="Queensland"
      heroTitle="Professional websites for Brisbane businesses"
      heroDescription="Brisbane businesses don't muck around. Neither does Onboard. Get a professional website in minutes — no agencies, no hassle, no worries."
      suburbs={[
        'Fortitude Valley',
        'New Farm',
        'West End',
        'South Brisbane',
        'Paddington',
        'Bulimba',
        'Newstead',
        'Ascot',
        'Hamilton',
        'CBD',
        'Woolloongabba',
        'Chermside',
        'Indooroopilly',
        'Ipswich',
        'Logan',
        'Redcliffe',
        'Caboolture',
        'Gold Coast',
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
        { name: 'HVAC', slug: 'hvac' },
      ]}
    />
  )
}
