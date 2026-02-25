// Client-safe plan configuration
// This file can be imported by both client and server components

export const PRICES = {
  setup: 'price_setup_495', // Will need to be updated with real Stripe price ID
  monthly: 'price_1SuQ8uGgOB6KnWmRX83ShQyx', // Reuse the $79 pro price for now
  booking: 'price_addon_booking',
  ecommerce: 'price_addon_ecommerce', 
  seo: 'price_addon_seo',
  social: 'price_addon_social',
  email: 'price_addon_email',
}

export const SETUP_FEE = 495

export const MONTHLY_FEE = 79

export const ADDONS = {
  booking: {
    name: 'Online Booking',
    price: 15,
    description: 'Appointment scheduling, calendar integration, automated confirmations',
    priceId: PRICES.booking,
  },
  ecommerce: {
    name: 'E-commerce',
    price: 49,
    description: 'Product catalog, shopping cart, payment processing, inventory management',
    priceId: PRICES.ecommerce,
  },
  seo: {
    name: 'SEO Booster',
    price: 30,
    description: 'Monthly keyword optimization, local SEO management, Google ranking focus',
    priceId: PRICES.seo,
  },
  social: {
    name: 'Social Media',
    price: 10,
    description: 'Instagram feed integration, Facebook integration',
    priceId: PRICES.social,
  },
  email: {
    name: 'Email Marketing',
    price: 25,
    description: 'Newsletter system, automated campaigns, customer retention sequences',
    priceId: PRICES.email,
  },
}

// Keep backward compat
export const PLANS = {
  standard: {
    name: 'Done For You',
    setupFee: SETUP_FEE,
    monthlyFee: MONTHLY_FEE,
    features: [
      'Custom designed website',
      'Professional copywriting',
      'Image sourcing & optimization',
      'Mobile optimised',
      'SEO foundation',
      'Contact forms & lead capture',
      'Hosting & maintenance',
      'Unlimited content updates',
      'Security monitoring',
      'Backup management',
    ],
  },
}

export type AddonKey = keyof typeof ADDONS
