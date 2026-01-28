// Design System - Based on ThemeForest popularity data & 2025 design trends
// This provides variety so 100 sites don't look the same

export interface StylePreset {
  name: string
  keywords: string[] // Words that trigger this style from user input
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  typography: {
    headingStyle: 'serif' | 'sans-serif' | 'display'
    bodyStyle: 'serif' | 'sans-serif'
    headingWeight: 'normal' | 'bold' | 'black'
  }
  layout: {
    heroStyle: 'gradient' | 'image-overlay' | 'split' | 'minimal' | 'video'
    spacing: 'compact' | 'comfortable' | 'spacious'
    cardStyle: 'elevated' | 'flat' | 'outlined' | 'glass'
  }
  vibe: string // Description for content generation
}

export interface CategoryDefaults {
  icon: string
  defaultStyle: string
  suggestedStyles: string[]
  serviceIcons: string[]
  ctaOptions: string[]
}

// Style Presets - Detected from user preferences
export const stylePresets: Record<string, StylePreset> = {
  // Luxury Minimalist (Chanel, Dior vibes)
  'luxury-minimal': {
    name: 'Luxury Minimal',
    keywords: ['chanel', 'luxury', 'high-end', 'highend', 'premium', 'elegant', 'sophisticated', 'minimalist', 'minimal', 'clean', 'black and white', 'monochrome', 'dior', 'gucci', 'upscale'],
    colors: {
      primary: '#000000',
      secondary: '#1a1a1a',
      accent: '#c9a86c', // Subtle gold
      background: '#ffffff',
      text: '#1a1a1a'
    },
    typography: {
      headingStyle: 'serif',
      bodyStyle: 'sans-serif',
      headingWeight: 'normal'
    },
    layout: {
      heroStyle: 'minimal',
      spacing: 'spacious',
      cardStyle: 'flat'
    },
    vibe: 'understated elegance with generous whitespace'
  },

  // Modern Bold (Tech startups, innovative companies)
  'modern-bold': {
    name: 'Modern Bold',
    keywords: ['modern', 'bold', 'innovative', 'tech', 'startup', 'cutting-edge', 'dynamic', 'vibrant', 'energetic', 'fresh'],
    colors: {
      primary: '#6366f1', // Indigo
      secondary: '#0f172a',
      accent: '#22d3ee', // Cyan
      background: '#0f172a',
      text: '#ffffff'
    },
    typography: {
      headingStyle: 'sans-serif',
      bodyStyle: 'sans-serif',
      headingWeight: 'black'
    },
    layout: {
      heroStyle: 'gradient',
      spacing: 'comfortable',
      cardStyle: 'glass'
    },
    vibe: 'bold and innovative with strong visual impact'
  },

  // Warm Professional (Trades, construction, reliable)
  'warm-professional': {
    name: 'Warm Professional',
    keywords: ['professional', 'reliable', 'trusted', 'established', 'traditional', 'family', 'local', 'friendly', 'warm'],
    colors: {
      primary: '#ea580c', // Orange
      secondary: '#1c1917',
      accent: '#fbbf24', // Amber
      background: '#ffffff',
      text: '#1c1917'
    },
    typography: {
      headingStyle: 'sans-serif',
      bodyStyle: 'sans-serif',
      headingWeight: 'bold'
    },
    layout: {
      heroStyle: 'image-overlay',
      spacing: 'comfortable',
      cardStyle: 'elevated'
    },
    vibe: 'trustworthy and approachable'
  },

  // Natural Organic (Eco, wellness, sustainable)
  'natural-organic': {
    name: 'Natural Organic',
    keywords: ['natural', 'organic', 'eco', 'sustainable', 'green', 'wellness', 'holistic', 'earth', 'nature', 'botanical'],
    colors: {
      primary: '#166534', // Forest green
      secondary: '#1c1917',
      accent: '#a3e635', // Lime
      background: '#fefce8', // Warm white
      text: '#1c1917'
    },
    typography: {
      headingStyle: 'serif',
      bodyStyle: 'sans-serif',
      headingWeight: 'normal'
    },
    layout: {
      heroStyle: 'image-overlay',
      spacing: 'spacious',
      cardStyle: 'flat'
    },
    vibe: 'natural and calming with earthy tones'
  },

  // Soft Feminine (Beauty, spa, salon)
  'soft-feminine': {
    name: 'Soft Feminine',
    keywords: ['feminine', 'soft', 'gentle', 'beauty', 'spa', 'salon', 'delicate', 'romantic', 'blush', 'rose'],
    colors: {
      primary: '#db2777', // Pink
      secondary: '#1f2937',
      accent: '#f9a8d4', // Light pink
      background: '#fdf2f8', // Pink tint white
      text: '#1f2937'
    },
    typography: {
      headingStyle: 'serif',
      bodyStyle: 'sans-serif',
      headingWeight: 'normal'
    },
    layout: {
      heroStyle: 'split',
      spacing: 'spacious',
      cardStyle: 'elevated'
    },
    vibe: 'soft and inviting with elegant touches'
  },

  // Dark Moody (Barbers, tattoo, edgy services)
  'dark-moody': {
    name: 'Dark Moody',
    keywords: ['dark', 'moody', 'edgy', 'urban', 'industrial', 'tattoo', 'barber', 'masculine', 'gritty', 'cool'],
    colors: {
      primary: '#dc2626', // Red
      secondary: '#0a0a0a',
      accent: '#fafafa', // White
      background: '#0a0a0a',
      text: '#fafafa'
    },
    typography: {
      headingStyle: 'display',
      bodyStyle: 'sans-serif',
      headingWeight: 'black'
    },
    layout: {
      heroStyle: 'image-overlay',
      spacing: 'compact',
      cardStyle: 'outlined'
    },
    vibe: 'bold and edgy with dark aesthetics'
  },

  // Classic Traditional (Law, finance, established businesses)
  'classic-traditional': {
    name: 'Classic Traditional',
    keywords: ['classic', 'traditional', 'timeless', 'heritage', 'established', 'conservative', 'formal', 'prestigious'],
    colors: {
      primary: '#1e3a5f', // Navy
      secondary: '#0f172a',
      accent: '#b8860b', // Dark gold
      background: '#f8fafc',
      text: '#0f172a'
    },
    typography: {
      headingStyle: 'serif',
      bodyStyle: 'serif',
      headingWeight: 'bold'
    },
    layout: {
      heroStyle: 'minimal',
      spacing: 'comfortable',
      cardStyle: 'outlined'
    },
    vibe: 'established and trustworthy with classic appeal'
  },

  // Bright Playful (Kids services, entertainment, fun)
  'bright-playful': {
    name: 'Bright Playful',
    keywords: ['fun', 'playful', 'bright', 'colorful', 'kids', 'family', 'cheerful', 'happy', 'vibrant'],
    colors: {
      primary: '#8b5cf6', // Purple
      secondary: '#1e1b4b',
      accent: '#fbbf24', // Yellow
      background: '#ffffff',
      text: '#1e1b4b'
    },
    typography: {
      headingStyle: 'display',
      bodyStyle: 'sans-serif',
      headingWeight: 'bold'
    },
    layout: {
      heroStyle: 'gradient',
      spacing: 'comfortable',
      cardStyle: 'elevated'
    },
    vibe: 'fun and energetic with bold colors'
  }
}

// Category defaults with multiple style suggestions
export const categoryDefaults: Record<string, CategoryDefaults> = {
  plumber: {
    icon: '🔧',
    defaultStyle: 'warm-professional',
    suggestedStyles: ['warm-professional', 'modern-bold', 'classic-traditional'],
    serviceIcons: ['🚿', '🚽', '🔧', '💧', '🛁', '⚡'],
    ctaOptions: ['Get a Free Quote', 'Call Now', 'Book Online', 'Request Service']
  },
  electrician: {
    icon: '⚡',
    defaultStyle: 'modern-bold',
    suggestedStyles: ['modern-bold', 'warm-professional', 'classic-traditional'],
    serviceIcons: ['⚡', '💡', '🔌', '🔋', '📱', '🏠'],
    ctaOptions: ['Get a Free Quote', 'Emergency Call', 'Book Electrician', 'Request Quote']
  },
  hairdresser: {
    icon: '💇',
    defaultStyle: 'soft-feminine',
    suggestedStyles: ['soft-feminine', 'luxury-minimal', 'dark-moody', 'modern-bold'],
    serviceIcons: ['✂️', '💇', '💅', '🪮', '✨', '💆'],
    ctaOptions: ['Book Appointment', 'View Services', 'Call Salon', 'Book Now']
  },
  beautician: {
    icon: '💅',
    defaultStyle: 'soft-feminine',
    suggestedStyles: ['soft-feminine', 'luxury-minimal', 'natural-organic'],
    serviceIcons: ['💅', '💆', '✨', '🧴', '💋', '🌸'],
    ctaOptions: ['Book Treatment', 'View Menu', 'Gift Vouchers', 'Book Now']
  },
  cleaner: {
    icon: '🧹',
    defaultStyle: 'natural-organic',
    suggestedStyles: ['natural-organic', 'modern-bold', 'warm-professional'],
    serviceIcons: ['🧹', '🧽', '✨', '🏠', '🧴', '🌿'],
    ctaOptions: ['Get a Quote', 'Book Cleaning', 'Free Estimate', 'Schedule Clean']
  },
  landscaper: {
    icon: '🌳',
    defaultStyle: 'natural-organic',
    suggestedStyles: ['natural-organic', 'warm-professional', 'modern-bold'],
    serviceIcons: ['🌳', '🌺', '🌿', '✂️', '🏡', '💧'],
    ctaOptions: ['Free Quote', 'View Portfolio', 'Book Consultation', 'Get Started']
  },
  mechanic: {
    icon: '🔩',
    defaultStyle: 'dark-moody',
    suggestedStyles: ['dark-moody', 'warm-professional', 'modern-bold'],
    serviceIcons: ['🔩', '🚗', '🔧', '⚙️', '🛞', '🔋'],
    ctaOptions: ['Book Service', 'Get a Quote', 'Call Workshop', 'Schedule Repair']
  },
  cafe: {
    icon: '☕',
    defaultStyle: 'warm-professional',
    suggestedStyles: ['warm-professional', 'natural-organic', 'modern-bold'],
    serviceIcons: ['☕', '🥐', '🍰', '🥪', '🫖', '🧁'],
    ctaOptions: ['View Menu', 'Order Online', 'Book Table', 'Visit Us']
  },
  fitness: {
    icon: '💪',
    defaultStyle: 'modern-bold',
    suggestedStyles: ['modern-bold', 'dark-moody', 'bright-playful'],
    serviceIcons: ['💪', '🏋️', '🧘', '🏃', '⭐', '🎯'],
    ctaOptions: ['Start Free Trial', 'Join Now', 'Book Class', 'Get Fit Today']
  },
  photographer: {
    icon: '📸',
    defaultStyle: 'luxury-minimal',
    suggestedStyles: ['luxury-minimal', 'dark-moody', 'modern-bold'],
    serviceIcons: ['📸', '🎬', '💒', '👶', '🎨', '✨'],
    ctaOptions: ['View Portfolio', 'Book Session', 'Get Quote', 'Enquire Now']
  },
  construction: {
    icon: '🏗️',
    defaultStyle: 'warm-professional',
    suggestedStyles: ['warm-professional', 'modern-bold', 'classic-traditional'],
    serviceIcons: ['🏗️', '🔨', '🏠', '📐', '🧱', '⚒️'],
    ctaOptions: ['Get a Free Quote', 'View Projects', 'Contact Us', 'Start Building']
  },
  hvac: {
    icon: '❄️',
    defaultStyle: 'modern-bold',
    suggestedStyles: ['modern-bold', 'warm-professional', 'classic-traditional'],
    serviceIcons: ['❄️', '🔥', '💨', '🌡️', '🏠', '⚡'],
    ctaOptions: ['Get a Quote', 'Book Service', 'Emergency Call', 'Schedule Visit']
  }
}

// Detect style from user preferences text
export function detectStyleFromPreferences(preferences: string | undefined, category: string): StylePreset {
  if (!preferences) {
    // Return category default
    const categoryDefault = categoryDefaults[category]?.defaultStyle || 'warm-professional'
    return stylePresets[categoryDefault]
  }

  const lowerPrefs = preferences.toLowerCase()

  // Check each style preset for keyword matches
  let bestMatch: { style: StylePreset; score: number } | null = null

  for (const [key, preset] of Object.entries(stylePresets)) {
    let score = 0
    for (const keyword of preset.keywords) {
      if (lowerPrefs.includes(keyword.toLowerCase())) {
        // Longer keywords get higher scores
        score += keyword.length
      }
    }
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { style: preset, score }
    }
  }

  if (bestMatch) {
    return bestMatch.style
  }

  // Fall back to category default
  const categoryDefault = categoryDefaults[category]?.defaultStyle || 'warm-professional'
  return stylePresets[categoryDefault]
}

// Get layout variation for variety (so sites don't all look the same)
export function getLayoutVariation(seed: string): number {
  // Simple hash to get consistent but varied layouts
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) % 3 // Returns 0, 1, or 2 for 3 layout variations
}

// Generate varied testimonial styles
export function getTestimonialVariation(index: number, style: StylePreset): 'card' | 'quote' | 'minimal' {
  const variations: ('card' | 'quote' | 'minimal')[] = ['card', 'quote', 'minimal']
  return variations[index % 3]
}

// Hero section variations
export const heroVariations = {
  gradient: {
    class: 'bg-gradient-to-br',
    overlay: false
  },
  'image-overlay': {
    class: 'bg-cover bg-center',
    overlay: true,
    overlayOpacity: 0.7
  },
  split: {
    class: 'grid md:grid-cols-2',
    overlay: false
  },
  minimal: {
    class: 'bg-white text-black',
    overlay: false
  },
  video: {
    class: 'relative overflow-hidden',
    overlay: true,
    overlayOpacity: 0.5
  }
}
