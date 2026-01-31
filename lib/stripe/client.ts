// Server-only Stripe client
// DO NOT import this file in client components - use ./plans.ts instead

import Stripe from 'stripe'

// Re-export plans for server-side use
export { PLANS, PRICES, type PlanKey } from './plans'

// Create Stripe instance lazily to avoid build-time errors
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
      typescript: true,
    })
  }
  return stripeInstance
}

// For backward compatibility, but will throw at runtime if key not set
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
      typescript: true,
    })
  : (null as unknown as Stripe)
