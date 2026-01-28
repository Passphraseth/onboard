// Client-safe plan configuration
// This file can be imported by both client and server components

export const PRICES = {
  starter: 'price_1SuQ8FGgOB6KnWmR734ywMqg',
  growth: 'price_1SuQ8gGgOB6KnWmRrPoiKPrW',
  pro: 'price_1SuQ8uGgOB6KnWmRX83ShQyx',
}

export const PLANS = {
  starter: {
    name: 'Starter 🌱',
    price: 29,
    priceId: PRICES.starter,
    features: [
      'Single page website',
      'Mobile responsive',
      'Contact form',
      '2 text updates/month',
      '48hr response time',
      'Onboard subdomain',
    ],
  },
  growth: {
    name: 'Growth 🚀',
    price: 49,
    priceId: PRICES.growth,
    popular: true,
    features: [
      'Up to 5 pages',
      'Custom domain included',
      '5 text updates/month',
      '24hr response time',
      'Google Business sync',
      'Booking widget',
      'SEO optimized',
    ],
  },
  pro: {
    name: 'Pro 👑',
    price: 79,
    priceId: PRICES.pro,
    features: [
      'Unlimited pages',
      'Unlimited updates',
      'Same-day response',
      'Advanced booking',
      'Payment integration',
      'Blog functionality',
      'Priority support',
    ],
  },
}

export type PlanKey = keyof typeof PLANS
