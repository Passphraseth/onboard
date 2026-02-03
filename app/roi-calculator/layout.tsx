import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Website ROI Calculator | How Much Revenue Are You Missing?',
  description: 'Calculate exactly how much money your business could be earning with a professional website. Free ROI calculator for Australian service businesses.',
  keywords: 'website roi calculator, business website return on investment, website value calculator australia',
  openGraph: {
    title: 'Website ROI Calculator | Onboard',
    description: 'Calculate how much revenue you\'re missing without a professional website.',
    url: 'https://onboard.com.au/roi-calculator',
    type: 'website',
  },
}

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}