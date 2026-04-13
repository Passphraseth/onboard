// Client-safe plan configuration
// This file can be imported by both client and server components

export const PRICES = {
  starter_setup: 'price_setup_495',
  starter_monthly: 'price_1SuQ8uGgOB6KnWmRX83ShQyx',
  growth_setup: 'price_growth_setup_795',
  growth_monthly: 'price_growth_monthly_149',
  pro_setup: 'price_pro_setup_1295',
  pro_monthly: 'price_pro_monthly_299',
  booking: 'price_addon_booking',
  ecommerce: 'price_addon_ecommerce',
  seo: 'price_addon_seo',
  social: 'price_addon_social',
  email: 'price_addon_email',
}

// Legacy exports for backward compat
export const SETUP_FEE = 495
export const MONTHLY_FEE = 79

export const TIERS = {
  starter: {
    name: 'Starter',
    setupFee: 495,
    monthlyFee: 79,
    description: 'Everything you need to get online.',
    features: [
      '5-page custom website',
      'Professional copywriting',
      'Image sourcing & optimization',
      'Mobile responsive',
      'Basic SEO',
      'SSL & hosting',
      'Contact forms & lead capture',
      '1 revision/month',
    ],
    setupPriceId: PRICES.starter_setup,
    monthlyPriceId: PRICES.starter_monthly,
  },
  growth: {
    name: 'Growth',
    setupFee: 795,
    monthlyFee: 149,
    description: 'Grow with bookings, reviews & SEO.',
    badge: 'Most popular',
    features: [
      'Everything in Starter',
      'Online bookings (Cal.com)',
      'Google review automation',
      'Basic CRM',
      'Monthly SEO report',
      '3 revisions/month',
    ],
    setupPriceId: PRICES.growth_setup,
    monthlyPriceId: PRICES.growth_monthly,
  },
  pro: {
    name: 'Pro',
    setupFee: 1295,
    monthlyFee: 299,
    description: 'Full marketing engine for your business.',
    features: [
      'Everything in Growth',
      'Google Ads management',
      'Email/SMS marketing automation',
      'Payment processing (Stripe)',
      'Advanced analytics',
      'Unlimited revisions',
      'Priority support',
    ],
    setupPriceId: PRICES.pro_setup,
    monthlyPriceId: PRICES.pro_monthly,
  },
}

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
    features: TIERS.starter.features,
  },
}

export type TierKey = keyof typeof TIERS
export type AddonKey = keyof typeof ADDONS
export type PlanKey = keyof typeof PLANS
