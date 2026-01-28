import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

// Price IDs from environment
export const PRICES = {
  starter: process.env.STRIPE_PRICE_STARTER!,
  growth: process.env.STRIPE_PRICE_GROWTH!,
  pro: process.env.STRIPE_PRICE_PRO!,
}

// Plan details
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
