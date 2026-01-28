// Server-only Stripe client
// DO NOT import this file in client components - use ./plans.ts instead

import Stripe from 'stripe'

// Re-export plans for server-side use
export { PLANS, PRICES, type PlanKey } from './plans'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})
