// Smart AI Preview Content Generator
// Detects business type and generates contextual, compelling content

interface BusinessProfile {
  category: string
  icon: string
  tagline: string
  description: string
  services: Array<{ name: string; description: string; icon: string }>
  testimonials: Array<{ name: string; text: string; rating: number; suburb: string }>
  colors: { primary: string; secondary: string; accent: string }
  ctaText: string
  features: string[]
}

// Business category patterns and their configurations
const BUSINESS_CATEGORIES: Record<string, {
  keywords: string[]
  icon: string
  colors: { primary: string; secondary: string; accent: string }
  services: Array<{ name: string; description: string; icon: string }>
  testimonials: Array<{ name: string; text: string; rating: number; suburb: string }>
  taglines: string[]
  features: string[]
  ctaTexts: string[]
}> = {
  plumber: {
    keywords: ['plumb', 'pipe', 'drain', 'water', 'tap', 'leak', 'gas fit'],
    icon: '🔧',
    colors: { primary: '#1e40af', secondary: '#0f172a', accent: '#22c55e' },
    services: [
      { name: 'Emergency Plumbing', description: 'Fast 24/7 response for burst pipes, blocked drains, and plumbing emergencies', icon: '🚨' },
      { name: 'Blocked Drains', description: 'Professional drain clearing using latest hydro-jet technology', icon: '💧' },
      { name: 'Hot Water Systems', description: 'Installation, repair & replacement of all hot water system types', icon: '🔥' },
      { name: 'Gas Fitting', description: 'Licensed gas fitters for installations, repairs & safety checks', icon: '⛽' },
      { name: 'Bathroom Renovations', description: 'Complete bathroom plumbing for your renovation project', icon: '🚿' },
      { name: 'Leak Detection', description: 'Advanced leak detection to find hidden water leaks fast', icon: '🔍' },
    ],
    testimonials: [
      { name: 'Mark Thompson', text: 'Called at 11pm with a burst pipe. They were here in 30 minutes and fixed it on the spot. Lifesavers!', rating: 5, suburb: 'Brunswick' },
      { name: 'Sarah Chen', text: 'Fair pricing, no surprises. Explained everything clearly. Will definitely use again.', rating: 5, suburb: 'Carlton' },
      { name: 'David Williams', text: 'Fixed our hot water system same day. Great communication the whole time.', rating: 5, suburb: 'Fitzroy' },
    ],
    taglines: [
      '24/7 Emergency Plumber',
      'Your Local Emergency Plumber',
      'Fast, Reliable Plumbing Services',
      'Licensed Plumbers You Can Trust',
    ],
    features: ['24/7 Emergency Service', 'Licensed & Insured', 'Upfront Pricing', 'Same Day Service'],
    ctaTexts: ['Get Emergency Help Now', 'Book a Plumber', 'Get a Free Quote'],
  },
  electrician: {
    keywords: ['electr', 'power', 'wir', 'solar', 'light', 'volt', 'circuit'],
    icon: '⚡',
    colors: { primary: '#ea580c', secondary: '#0f172a', accent: '#fbbf24' },
    services: [
      { name: 'Electrical Repairs', description: 'Fast repairs for power outages, faulty switches, and electrical faults', icon: '🔌' },
      { name: 'Safety Inspections', description: 'Comprehensive electrical safety inspections for homes & businesses', icon: '✅' },
      { name: 'Solar Installation', description: 'Expert solar panel installation and battery storage systems', icon: '☀️' },
      { name: 'Lighting Design', description: 'Modern LED lighting upgrades and smart home lighting', icon: '💡' },
      { name: 'Switchboard Upgrades', description: 'Safety switch and switchboard upgrades to current standards', icon: '🔧' },
      { name: 'EV Charger Installation', description: 'Electric vehicle charging station installation for home & business', icon: '🚗' },
    ],
    testimonials: [
      { name: 'James Lee', text: 'Installed solar panels and we\'re now saving $400/quarter on electricity. Professional team!', rating: 5, suburb: 'Hawthorn' },
      { name: 'Emma Watson', text: 'Upgraded our old switchboard. Clean work, on time, and very fair price.', rating: 5, suburb: 'Richmond' },
      { name: 'Michael Brown', text: 'Fixed multiple electrical issues in one visit. Explained everything clearly. Highly recommend.', rating: 5, suburb: 'Prahran' },
    ],
    taglines: [
      'Your Trusted Local Electrician',
      'Powering Melbourne Homes',
      'Licensed Electrical Services',
      'Expert Electrical Solutions',
    ],
    features: ['Licensed & Insured', 'Safety Certified', 'Upfront Pricing', 'Workmanship Guarantee'],
    ctaTexts: ['Book an Electrician', 'Get a Free Quote', 'Request a Callback'],
  },
  hairdresser: {
    keywords: ['hair', 'salon', 'barber', 'cut', 'styl', 'colour', 'color', 'beauty', 'braid'],
    icon: '💇‍♀️',
    colors: { primary: '#db2777', secondary: '#1f2937', accent: '#f472b6' },
    services: [
      { name: 'Cut & Style', description: 'Precision cuts tailored to your face shape and lifestyle', icon: '✂️' },
      { name: 'Colour & Highlights', description: 'From natural looks to bold transformations with premium products', icon: '🎨' },
      { name: 'Balayage & Ombre', description: 'Hand-painted colour techniques for a natural, sun-kissed look', icon: '✨' },
      { name: 'Keratin Treatment', description: 'Smooth, frizz-free hair that lasts up to 3 months', icon: '💎' },
      { name: 'Hair Extensions', description: 'Premium tape-in and clip-in extensions for added length and volume', icon: '💫' },
      { name: 'Bridal & Events', description: 'Special occasion styling for weddings, formals, and events', icon: '👰' },
    ],
    testimonials: [
      { name: 'Jessica Moore', text: 'Finally found my forever salon! They really listen and the colour is always perfect.', rating: 5, suburb: 'South Yarra' },
      { name: 'Amy Taylor', text: 'Best balayage I\'ve ever had. Worth every cent. Already booked my next appointment!', rating: 5, suburb: 'Toorak' },
      { name: 'Lisa Chen', text: 'The team made me feel so welcome. My hair has never looked better!', rating: 5, suburb: 'St Kilda' },
    ],
    taglines: [
      'Where Style Meets Expertise',
      'Your Hair, Elevated',
      'Creative Hair Artists',
      'Colour Specialists',
    ],
    features: ['Premium Products', 'Free Consultation', 'Late Night Appointments', 'Afterpay Available'],
    ctaTexts: ['Book Your Appointment', 'Book Now', 'See Our Work'],
  },
  cafe: {
    keywords: ['cafe', 'coffee', 'brunch', 'breakfast', 'bakery', 'toast', 'espresso'],
    icon: '☕',
    colors: { primary: '#78350f', secondary: '#1c1917', accent: '#fbbf24' },
    services: [
      { name: 'Specialty Coffee', description: 'Single origin beans roasted locally and brewed to perfection', icon: '☕' },
      { name: 'All-Day Breakfast', description: 'From classic eggs benny to smashed avo - served until 3pm', icon: '🍳' },
      { name: 'Fresh Pastries', description: 'Baked in-house daily. Croissants, danishes, and sweet treats', icon: '🥐' },
      { name: 'Healthy Options', description: 'Acai bowls, smoothies, and plant-based alternatives', icon: '🥗' },
      { name: 'Catering', description: 'Coffee carts and catering for your office or event', icon: '🎉' },
      { name: 'Takeaway', description: 'Grab your favourite brew on the go with our loyalty program', icon: '🏃' },
    ],
    testimonials: [
      { name: 'Tom Mitchell', text: 'Best flat white in the area. The smashed avo is also incredible. My new regular spot!', rating: 5, suburb: 'Collingwood' },
      { name: 'Rachel Green', text: 'Great vibes, friendly staff, and the pastries are next level. Love this place!', rating: 5, suburb: 'Fitzroy' },
      { name: 'Alex Park', text: 'Finally a cafe that gets specialty coffee right. The beans are always fresh.', rating: 5, suburb: 'Brunswick' },
    ],
    taglines: [
      'Coffee Worth Waking Up For',
      'Your Neighbourhood Cafe',
      'Great Coffee, Great Vibes',
      'Specialty Coffee & All-Day Eats',
    ],
    features: ['Locally Roasted Beans', 'Dog Friendly', 'Free WiFi', 'Outdoor Seating'],
    ctaTexts: ['View Our Menu', 'Find Us', 'Order Ahead'],
  },
  cleaner: {
    keywords: ['clean', 'maid', 'house', 'domestic', 'commercial clean', 'office clean', 'carpet'],
    icon: '🧹',
    colors: { primary: '#0891b2', secondary: '#0f172a', accent: '#22d3ee' },
    services: [
      { name: 'Regular Home Cleaning', description: 'Weekly or fortnightly cleaning to keep your home spotless', icon: '🏠' },
      { name: 'Deep Cleaning', description: 'Thorough top-to-bottom clean for a fresh start', icon: '✨' },
      { name: 'End of Lease', description: 'Get your bond back with our comprehensive exit clean', icon: '🔑' },
      { name: 'Office Cleaning', description: 'Professional commercial cleaning for a productive workspace', icon: '🏢' },
      { name: 'Carpet Cleaning', description: 'Steam cleaning and stain removal for carpets and rugs', icon: '🧼' },
      { name: 'Window Cleaning', description: 'Streak-free windows inside and out', icon: '🪟' },
    ],
    testimonials: [
      { name: 'Kate Wilson', text: 'They got my full bond back with their end of lease clean. Amazing attention to detail!', rating: 5, suburb: 'Northcote' },
      { name: 'John Davies', text: 'Been using them weekly for 6 months. Always reliable and my house has never been cleaner.', rating: 5, suburb: 'Preston' },
      { name: 'Maria Santos', text: 'Professional team, eco-friendly products, and very thorough. Highly recommend!', rating: 5, suburb: 'Coburg' },
    ],
    taglines: [
      'Your Trusted Cleaning Experts',
      'Professional Cleaning Services',
      'Sparkling Clean, Every Time',
      'Let Us Handle the Mess',
    ],
    features: ['Eco-Friendly Products', 'Insured & Vetted Staff', 'Same Day Bookings', '100% Bond Back Guarantee'],
    ctaTexts: ['Get a Free Quote', 'Book a Clean', 'Request a Quote'],
  },
  mechanic: {
    keywords: ['mechanic', 'auto', 'car', 'motor', 'vehicle', 'workshop', 'service', 'brake', 'tyre'],
    icon: '🔧',
    colors: { primary: '#dc2626', secondary: '#0f172a', accent: '#fbbf24' },
    services: [
      { name: 'Log Book Servicing', description: 'Manufacturer-compliant servicing that keeps your warranty valid', icon: '📋' },
      { name: 'Brake & Clutch', description: 'Expert brake pad replacement and clutch repairs', icon: '🛞' },
      { name: 'Tyres & Wheel Alignment', description: 'Quality tyres fitted and balanced, plus precision alignment', icon: '⚙️' },
      { name: 'Air Conditioning', description: 'Car AC regas, repairs, and maintenance', icon: '❄️' },
      { name: 'Roadworthy Certificates', description: 'Fast and fair RWC inspections', icon: '✅' },
      { name: 'Pre-Purchase Inspections', description: 'Know what you\'re buying before you commit', icon: '🔍' },
    ],
    testimonials: [
      { name: 'Steve Johnson', text: 'Honest mechanics are hard to find. These guys tell you what needs fixing and what can wait. Legend!', rating: 5, suburb: 'Footscray' },
      { name: 'Karen White', text: 'Got my RWC done same day. Fair price, no hassles. Will be back for all my servicing.', rating: 5, suburb: 'Sunshine' },
      { name: 'Daniel Kim', text: 'Saved me from buying a lemon with their pre-purchase inspection. Worth every dollar!', rating: 5, suburb: 'Maribyrnong' },
    ],
    taglines: [
      'Your Local Trusted Mechanic',
      'Honest Auto Repairs',
      'Quality Service, Fair Prices',
      'Expert Vehicle Care',
    ],
    features: ['Licensed Mechanics', 'Warranty Protected', 'Loan Car Available', 'Fixed Price Servicing'],
    ctaTexts: ['Book a Service', 'Get a Quote', 'Call Now'],
  },
  default: {
    keywords: [],
    icon: '🏢',
    colors: { primary: '#2563eb', secondary: '#0f172a', accent: '#d4ff00' },
    services: [
      { name: 'Service One', description: 'Professional, reliable service tailored to your needs', icon: '⭐' },
      { name: 'Service Two', description: 'Quality workmanship backed by our satisfaction guarantee', icon: '✅' },
      { name: 'Service Three', description: 'Experienced team ready to help you today', icon: '💼' },
    ],
    testimonials: [
      { name: 'Happy Customer', text: 'Great service from start to finish. Professional, on time, and excellent results. Highly recommend!', rating: 5, suburb: 'Melbourne' },
      { name: 'Satisfied Client', text: 'Friendly team who really know their stuff. Fair prices and quality work.', rating: 5, suburb: 'Melbourne' },
    ],
    taglines: [
      'Professional Services You Can Trust',
      'Quality Service, Every Time',
      'Your Local Experts',
    ],
    features: ['Professional Service', 'Experienced Team', 'Fair Pricing', 'Satisfaction Guaranteed'],
    ctaTexts: ['Get Started', 'Contact Us', 'Book Now'],
  },
}

// Melbourne suburbs for realistic testimonials
const MELBOURNE_SUBURBS = [
  'Brunswick', 'Carlton', 'Fitzroy', 'Collingwood', 'Richmond', 'South Yarra',
  'Prahran', 'St Kilda', 'Hawthorn', 'Malvern', 'Toorak', 'Northcote',
  'Preston', 'Coburg', 'Footscray', 'Yarraville', 'Moonee Ponds', 'Essendon',
  'Box Hill', 'Glen Waverley', 'Clayton', 'Brighton', 'Sandringham', 'Moorabbin',
]

function detectBusinessCategory(businessName: string): string {
  const lowerName = businessName.toLowerCase()

  for (const [category, config] of Object.entries(BUSINESS_CATEGORIES)) {
    if (category === 'default') continue
    if (config.keywords.some(keyword => lowerName.includes(keyword))) {
      return category
    }
  }

  return 'default'
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function generatePreviewContent(businessName: string, suburb?: string) {
  const category = detectBusinessCategory(businessName)
  const config = BUSINESS_CATEGORIES[category]
  const location = suburb || getRandomItem(MELBOURNE_SUBURBS)

  // Shuffle and pick services (pick 4-6)
  const shuffledServices = shuffleArray(config.services)
  const selectedServices = shuffledServices.slice(0, Math.min(6, shuffledServices.length))

  // Shuffle and pick testimonials (pick 2-3)
  const shuffledTestimonials = shuffleArray(config.testimonials)
  const selectedTestimonials = shuffledTestimonials.slice(0, Math.min(3, shuffledTestimonials.length))

  // Generate tagline with location
  const baseTagline = getRandomItem(config.taglines)
  const tagline = baseTagline.includes('Local')
    ? baseTagline.replace('Local', location)
    : `${baseTagline} • ${location}`

  return {
    businessName,
    category,
    icon: config.icon,
    tagline,
    description: `${businessName} provides professional ${category === 'default' ? 'services' : category + ' services'} to customers in ${location} and surrounding Melbourne suburbs. With years of experience and a commitment to quality, we're your trusted local experts.`,
    phone: '0400 000 000',
    email: 'hello@example.com',
    address: `${location}, VIC`,
    suburb: location,
    hours: [
      { day: 'Monday', open: '8:00 AM', close: '5:00 PM' },
      { day: 'Tuesday', open: '8:00 AM', close: '5:00 PM' },
      { day: 'Wednesday', open: '8:00 AM', close: '5:00 PM' },
      { day: 'Thursday', open: '8:00 AM', close: '5:00 PM' },
      { day: 'Friday', open: '8:00 AM', close: '5:00 PM' },
      { day: 'Saturday', open: '9:00 AM', close: '2:00 PM' },
      { day: 'Sunday', closed: true },
    ],
    services: selectedServices,
    features: config.features,
    testimonials: selectedTestimonials,
    colors: config.colors,
    ctaText: getRandomItem(config.ctaTexts),
    heroStyle: category, // For template selection
  }
}

export { detectBusinessCategory }
