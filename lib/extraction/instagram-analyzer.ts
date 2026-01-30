/**
 * Instagram Analyzer - Extract brand data from Instagram profiles
 * Uses RapidAPI's Instagram scraper to get profile data, posts, and images
 */

export interface InstagramAnalysis {
  username: string
  profile: {
    name: string
    bio: string
    website?: string
    followerCount: number
    postCount: number
    profilePicUrl: string
  }
  brand: {
    colors: string[] // Extracted from images
    tone: 'professional' | 'casual' | 'luxurious' | 'fun' | 'minimal' | 'warm'
    aesthetic: string // Description of visual style
  }
  content: {
    commonHashtags: string[]
    topicThemes: string[]
    postingStyle: 'product-focused' | 'lifestyle' | 'behind-scenes' | 'mixed'
  }
  images: {
    profilePic: string
    recentPosts: Array<{
      url: string
      caption: string
      likes: number
    }>
  }
}

/**
 * Fetch and analyze Instagram profile
 * Requires RAPIDAPI_KEY environment variable
 */
export async function analyzeInstagram(username: string): Promise<InstagramAnalysis | null> {
  const rapidApiKey = process.env.RAPIDAPI_KEY

  if (!rapidApiKey) {
    console.log('No RAPIDAPI_KEY configured, skipping Instagram analysis')
    return null
  }

  try {
    // Clean username
    username = username.replace('@', '').trim()
    console.log(`Analyzing Instagram: @${username}`)

    // Fetch profile data from RapidAPI
    const profileResponse = await fetch(
      `https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${username}`,
      {
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com',
        },
        signal: AbortSignal.timeout(15000),
      }
    )

    if (!profileResponse.ok) {
      console.error(`Instagram API error: ${profileResponse.status}`)
      return null
    }

    const profileData = await profileResponse.json()
    const data = profileData.data

    if (!data) {
      console.error('No Instagram data returned')
      return null
    }

    // Fetch recent posts
    const postsResponse = await fetch(
      `https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts?username_or_id_or_url=${username}&count=12`,
      {
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com',
        },
        signal: AbortSignal.timeout(15000),
      }
    )

    let posts: any[] = []
    if (postsResponse.ok) {
      const postsData = await postsResponse.json()
      posts = postsData.data?.items || []
    }

    // Analyze the profile
    const profile = {
      name: data.full_name || username,
      bio: data.biography || '',
      website: data.external_url,
      followerCount: data.follower_count || 0,
      postCount: data.media_count || 0,
      profilePicUrl: data.profile_pic_url_hd || data.profile_pic_url || '',
    }

    // Analyze brand characteristics from bio and posts
    const brand = analyzeBrandFromContent(profile.bio, posts)

    // Extract content patterns
    const content = analyzeContentPatterns(posts)

    // Get images
    const images = {
      profilePic: profile.profilePicUrl,
      recentPosts: posts.slice(0, 9).map((post: any) => ({
        url: post.image_versions?.items?.[0]?.url || post.thumbnail_url || '',
        caption: post.caption?.text || '',
        likes: post.like_count || 0,
      })),
    }

    return {
      username,
      profile,
      brand,
      content,
      images,
    }
  } catch (error) {
    console.error(`Error analyzing Instagram @${username}:`, error)
    return null
  }
}

/**
 * Analyze brand characteristics from bio and posts
 */
function analyzeBrandFromContent(
  bio: string,
  posts: any[]
): InstagramAnalysis['brand'] {
  const lowerBio = bio.toLowerCase()
  const allCaptions = posts.map((p: any) => p.caption?.text || '').join(' ').toLowerCase()
  const combinedText = lowerBio + ' ' + allCaptions

  // Detect tone
  let tone: InstagramAnalysis['brand']['tone'] = 'professional'
  if (combinedText.match(/luxury|premium|exclusive|elegant|sophisticated/)) {
    tone = 'luxurious'
  } else if (combinedText.match(/fun|enjoy|love|happy|excited|🎉|😊/)) {
    tone = 'fun'
  } else if (combinedText.match(/minimal|simple|clean|modern/)) {
    tone = 'minimal'
  } else if (combinedText.match(/warm|friendly|family|community|care/)) {
    tone = 'warm'
  } else if (combinedText.match(/chill|casual|relax|easy/)) {
    tone = 'casual'
  }

  // Generate aesthetic description
  const aestheticKeywords: string[] = []
  if (combinedText.includes('bright')) aestheticKeywords.push('bright')
  if (combinedText.includes('dark') || combinedText.includes('moody')) aestheticKeywords.push('moody')
  if (combinedText.includes('colorful')) aestheticKeywords.push('colorful')
  if (combinedText.includes('natural')) aestheticKeywords.push('natural')
  if (combinedText.includes('urban')) aestheticKeywords.push('urban')
  if (combinedText.includes('vintage')) aestheticKeywords.push('vintage')
  if (combinedText.includes('modern')) aestheticKeywords.push('modern')

  const aesthetic = aestheticKeywords.length > 0
    ? aestheticKeywords.join(', ')
    : 'clean and professional'

  // For colors, we would ideally analyze the actual images
  // For now, return a placeholder - this could be enhanced with image analysis
  const colors = detectColorsFromText(combinedText)

  return {
    colors,
    tone,
    aesthetic,
  }
}

/**
 * Detect color preferences from text
 */
function detectColorsFromText(text: string): string[] {
  const colorMentions: Record<string, string> = {
    'black': '#000000',
    'white': '#ffffff',
    'gold': '#d4af37',
    'rose': '#ff007f',
    'pink': '#ffc0cb',
    'blue': '#3b82f6',
    'navy': '#1e3a5f',
    'green': '#22c55e',
    'teal': '#14b8a6',
    'red': '#ef4444',
    'orange': '#f97316',
    'yellow': '#eab308',
    'purple': '#8b5cf6',
    'brown': '#92400e',
    'beige': '#f5f5dc',
    'cream': '#fffdd0',
  }

  const detected: string[] = []
  for (const [name, hex] of Object.entries(colorMentions)) {
    if (text.includes(name) && !detected.includes(hex)) {
      detected.push(hex)
    }
  }

  return detected.length > 0 ? detected : ['#1a1a1a', '#ffffff']
}

/**
 * Analyze content posting patterns
 */
function analyzeContentPatterns(posts: any[]): InstagramAnalysis['content'] {
  // Extract hashtags
  const allHashtags: string[] = []
  posts.forEach((post: any) => {
    const caption = post.caption?.text || ''
    const hashtags = caption.match(/#[\w]+/g) || []
    allHashtags.push(...hashtags.map((h: string) => h.toLowerCase()))
  })

  // Count hashtag frequency
  const hashtagCounts: Record<string, number> = {}
  allHashtags.forEach(tag => {
    hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1
  })

  const commonHashtags = Object.entries(hashtagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag)

  // Detect topic themes
  const topicThemes: string[] = []
  const allCaptions = posts.map((p: any) => p.caption?.text || '').join(' ').toLowerCase()

  const themeKeywords: Record<string, string[]> = {
    'food': ['coffee', 'food', 'eat', 'taste', 'delicious', 'menu', 'dish'],
    'fitness': ['workout', 'gym', 'fitness', 'training', 'health', 'exercise'],
    'beauty': ['beauty', 'skin', 'hair', 'makeup', 'glow', 'treatment'],
    'service': ['service', 'quality', 'professional', 'expert', 'team'],
    'local': ['local', 'community', 'neighborhood', 'area', 'melbourne', 'sydney'],
    'sustainability': ['sustainable', 'eco', 'green', 'organic', 'natural'],
  }

  for (const [theme, keywords] of Object.entries(themeKeywords)) {
    if (keywords.some(kw => allCaptions.includes(kw))) {
      topicThemes.push(theme)
    }
  }

  // Detect posting style
  let postingStyle: InstagramAnalysis['content']['postingStyle'] = 'mixed'
  if (allCaptions.includes('product') || allCaptions.includes('shop') || allCaptions.includes('buy')) {
    postingStyle = 'product-focused'
  } else if (allCaptions.includes('lifestyle') || allCaptions.includes('day in')) {
    postingStyle = 'lifestyle'
  } else if (allCaptions.includes('behind') || allCaptions.includes('team') || allCaptions.includes('making')) {
    postingStyle = 'behind-scenes'
  }

  return {
    commonHashtags,
    topicThemes,
    postingStyle,
  }
}

/**
 * Extract dominant colors from an image URL using a simple analysis
 * For production, consider using a service like ColorAPI or Imagga
 */
export async function extractColorsFromImage(imageUrl: string): Promise<string[]> {
  // This is a placeholder - for real color extraction, you'd want to:
  // 1. Use Canvas API to load the image (in browser)
  // 2. Use a service like ColorAPI, Imagga, or Google Vision
  // 3. Use a Node library like node-vibrant

  // For now, return empty - this should be implemented with a real service
  console.log(`Would extract colors from: ${imageUrl}`)
  return []
}
