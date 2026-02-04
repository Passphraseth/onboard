/**
 * Agentic Site Generator v4
 *
 * A truly agentic approach to website generation that:
 * 1. RESEARCHES - Searches and analyzes real competitor websites
 * 2. THINKS - Creates a unique design brief based on research
 * 3. GENERATES - Produces high-quality, unique HTML
 *
 * This is NOT a template system - it creates genuinely unique sites.
 */

import Anthropic from '@anthropic-ai/sdk'
import { createAdminClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

const anthropic = new Anthropic()

export interface AgenticInput {
  businessName: string
  businessType: string
  location: string

  // Contact
  phone?: string
  email?: string
  address?: string
  hours?: string

  // Social
  instagram?: string
  facebook?: string
  website?: string

  // Content
  services?: string[]
  uniqueSellingPoints?: string[]
  targetCustomers?: string[]
  additionalNotes?: string

  // User preferences
  preferredColors?: string[]
  preferredTone?: string
  logoUrl?: string
}

export interface AgenticResult {
  success: boolean
  html: string
  slug: string
  designBrief: string
  competitorInsights: string
  generationTime: number
  saved: boolean
}

/**
 * Main entry point - generates a unique website using agentic research
 */
export async function generateAgenticSite(input: AgenticInput): Promise<AgenticResult> {
  const startTime = Date.now()

  console.log('\n' + '='.repeat(60))
  console.log('🚀 AGENTIC SITE GENERATOR V4')
  console.log(`Business: ${input.businessName}`)
  console.log(`Type: ${input.businessType}`)
  console.log(`Location: ${input.location}`)
  console.log('='.repeat(60) + '\n')

  // PHASE 1: Research competitors and industry
  console.log('📊 PHASE 1: Researching industry and competitors...')
  const competitorInsights = await researchCompetitorsWithAI(input)
  console.log('✅ Research complete\n')

  // PHASE 2: Create a unique design brief
  console.log('📝 PHASE 2: Creating design brief...')
  const designBrief = await createDesignBrief(input, competitorInsights)
  console.log('✅ Design brief complete\n')

  // PHASE 3: Generate the HTML based on the brief
  console.log('🎨 PHASE 3: Generating unique website...')
  const html = await generateHTMLFromBrief(input, designBrief, competitorInsights)
  console.log('✅ HTML generation complete\n')

  // Save to database
  console.log('💾 Saving to database...')
  const slug = slugify(input.businessName)
  const supabase = createAdminClient()

  // First check if site exists
  const { data: existingSite } = await supabase
    .from('client_sites')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  let saved = false

  if (existingSite) {
    // Update existing record
    const { error: updateError } = await supabase
      .from('client_sites')
      .update({ generated_html: html, updated_at: new Date().toISOString() })
      .eq('slug', slug)

    saved = !updateError
    if (updateError) {
      console.error('Error updating site:', updateError)
    } else {
      console.log(`✅ Updated existing site for slug: ${slug}`)
    }
  } else {
    // Create new record - find lead_id first
    const { data: lead } = await supabase
      .from('leads')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

    const { error: insertError } = await supabase
      .from('client_sites')
      .insert({
        slug,
        lead_id: lead?.id || null,
        generated_html: html,
        status: 'preview',
        template: 'agentic-v4',
        content: {
          businessName: input.businessName,
          businessType: input.businessType,
          location: input.location,
        },
      })

    saved = !insertError
    if (insertError) {
      console.error('Error creating site:', insertError)
    } else {
      console.log(`✅ Created new site for slug: ${slug}`)

      // Link site back to lead
      if (lead?.id) {
        const { data: newSite } = await supabase
          .from('client_sites')
          .select('id')
          .eq('slug', slug)
          .single()

        if (newSite) {
          await supabase
            .from('leads')
            .update({ preview_site_id: newSite.id })
            .eq('id', lead.id)
        }
      }
    }
  }

  const generationTime = Date.now() - startTime
  console.log(`\n⏱️ Total generation time: ${generationTime}ms`)

  return {
    success: true,
    html,
    slug,
    designBrief,
    competitorInsights,
    generationTime,
    saved,
  }
}

/**
 * PHASE 1: Research competitors using AI to understand the industry
 * Uses Haiku for speed - this phase needs to be fast
 */
async function researchCompetitorsWithAI(input: AgenticInput): Promise<string> {
  // Build context about what we know
  const businessContext = `
Business: ${input.businessName}
Type: ${input.businessType}
Location: ${input.location}
Services: ${input.services?.join(', ') || 'Not specified'}
Target Customers: ${input.targetCustomers?.join(', ') || 'Not specified'}
Instagram: ${input.instagram || 'Not provided'}
Website: ${input.website || 'Not provided'}
User's preferred tone: ${input.preferredTone || 'Not specified'}
User's preferred colors: ${input.preferredColors?.join(', ') || 'Not specified'}
  `.trim()

  const researchPrompt = `You are a web design researcher. Quickly analyze ${input.businessType} websites in ${input.location}, Australia.

BUSINESS: ${businessContext}

Provide CONCISE recommendations for:
1. Color palette (5 hex codes: primary, secondary, accent, background, text)
2. Fonts (Google Fonts: heading + body)
3. Key sections to include
4. Unique angle for ${input.businessName}

${input.preferredColors?.length ? `Use these colors: ${input.preferredColors.join(', ')}` : ''}
${input.preferredTone ? `Tone: ${input.preferredTone}` : ''}

Be brief but specific. Output should be under 500 words.`

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1000,
    messages: [{ role: 'user', content: researchPrompt }]
  })

  const textContent = response.content.find(c => c.type === 'text')
  return textContent?.type === 'text' ? textContent.text : ''
}

/**
 * PHASE 2: Create a unique design brief based on research
 * Uses Sonnet for quality - creative direction needs nuance
 */
async function createDesignBrief(input: AgenticInput, competitorInsights: string): Promise<string> {
  // Create variation based on business name
  const nameHash = input.businessName.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  const designStyles = ['bold-editorial', 'minimal-elegant', 'warm-approachable', 'modern-tech', 'classic-refined', 'creative-dynamic']
  const selectedStyle = designStyles[nameHash % designStyles.length]

  const briefPrompt = `You're a creative director developing a UNIQUE design concept for ${input.businessName}.

BUSINESS: ${input.businessType} in ${input.location}
SERVICES: ${input.services?.join(', ') || 'General services'}
CLIENT VIBE: ${input.preferredTone || 'Professional'}
${input.preferredColors?.length ? `MUST USE COLORS: ${input.preferredColors.join(', ')}` : 'COLOR FREEDOM: Choose distinctive palette'}

DESIGN STYLE SEED: "${selectedStyle}" - use this as inspiration but interpret it uniquely.

Create a design brief that would make this site STAND OUT from competitors. Include:

1. **COLOR PALETTE** (5 hex codes)
   ${input.preferredColors?.length ? `Use the client's colors: ${input.preferredColors.join(', ')}` : 'Be bold - avoid safe/boring choices'}

2. **TYPOGRAPHY PAIRING** (Google Fonts)
   - Heading font: something with personality
   - Body font: highly readable complement

3. **HERO CONCEPT** - One sentence describing a visually striking hero that's NOT generic

4. **UNIQUE DESIGN ELEMENT** - One signature visual element that makes this site memorable
   (e.g., diagonal lines, floating shapes, dramatic shadows, split-tone backgrounds, oversized numbers)

5. **HEADLINE** - A punchy, memorable headline for ${input.businessName}

Keep it under 300 words. Be specific and creative.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{ role: 'user', content: briefPrompt }]
  })

  const textContent = response.content.find(c => c.type === 'text')
  return textContent?.type === 'text' ? textContent.text : ''
}

/**
 * PHASE 3: Generate HTML from the design brief
 */
async function generateHTMLFromBrief(
  input: AgenticInput,
  designBrief: string,
  competitorInsights: string
): Promise<string> {
  // Build color instruction - USER PREFERENCES OVERRIDE EVERYTHING
  const colorInstruction = input.preferredColors?.length
    ? `
## ⚠️ MANDATORY COLOR SCHEME (USER SPECIFIED - DO NOT IGNORE)
The client has SPECIFICALLY REQUESTED these colors. You MUST use them:
${input.preferredColors.map((c, i) => `- Color ${i + 1}: ${c}`).join('\n')}

If the client specified "black and white" or similar, use:
- Background: #ffffff or #000000
- Text: #000000 or #ffffff (contrast with background)
- Accents: Shades of gray (#333, #666, #999, #ccc)

DO NOT use any other colors. The design brief colors are OVERRIDDEN by these user preferences.
`
    : ''

  const toneInstruction = input.preferredTone
    ? `\n## MANDATORY TONE: ${input.preferredTone}\nThe client specifically requested a "${input.preferredTone}" feel. The entire design must reflect this.\n`
    : ''

  // Generate a unique design seed based on business name for consistent variation
  const designSeed = input.businessName.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 6

  const heroVariations = [
    'Full-screen dramatic hero with oversized typography and a single powerful image',
    'Split-screen hero: bold text on left, striking image on right (or vice versa)',
    'Minimal hero with elegant centered text, subtle background, and floating elements',
    'Video-style hero with dark overlay and cinematic typography',
    'Asymmetric hero with offset content, unique shapes, and dynamic composition',
    'Editorial-style hero with magazine-like typography and sophisticated spacing'
  ]

  const layoutVariations = [
    'Card-based layout with floating shadows and rounded corners',
    'Full-width sections with alternating backgrounds and edge-to-edge imagery',
    'Contained layout with generous whitespace and refined borders',
    'Overlapping sections with creative z-index layering',
    'Grid-based masonry-style layout with varied content blocks',
    'Minimal layout with dramatic typography as the main visual element'
  ]

  const generatePrompt = `You are an award-winning web designer creating a COMPLETELY UNIQUE website.
Your reputation depends on NEVER creating generic or template-like designs.

## THIS PROJECT: ${input.businessName}
Industry: ${input.businessType} | Location: ${input.location}
${colorInstruction}${toneInstruction}

## CONTACT & BUSINESS DETAILS
Phone: ${input.phone || 'Not provided'} | Email: ${input.email || 'Not provided'}
Address: ${input.address || 'Not provided'} | Hours: ${input.hours || 'Not provided'}
${input.instagram ? `Instagram: https://instagram.com/${input.instagram}` : ''}
${input.facebook ? `Facebook: ${input.facebook}` : ''}

## THEIR SERVICES
${input.services?.map(s => `• ${s}`).join('\n') || '• Professional services'}

## DESIGN DIRECTION FROM BRIEF
${designBrief}

---

## YOUR CREATIVE DIRECTION

**HERO STYLE**: ${heroVariations[designSeed]}
**LAYOUT APPROACH**: ${layoutVariations[(designSeed + 3) % 6]}

## WHAT MAKES THIS DESIGN UNIQUE

Create something that would win a design award. Consider:

1. **TYPOGRAPHY AS ART** - Use type size, weight, and spacing dramatically. Consider:
   - Oversized headlines (80px-150px on desktop)
   - Interesting font pairings from Google Fonts
   - Creative letter-spacing and line-heights
   - Text that breaks conventional boundaries

2. **UNCONVENTIONAL LAYOUTS** - Break the mold:
   - Asymmetric compositions
   - Overlapping elements
   - Unusual grid structures
   - Creative use of negative space
   - Elements that bleed to edges

3. **SOPHISTICATED COLOR USE** - Beyond basic:
   - Subtle gradients or textures
   - Strategic use of color blocking
   - Interesting hover state colors
   - Consider dark mode aesthetic if appropriate

4. **MICRO-INTERACTIONS** - CSS-only polish:
   - Creative hover transforms
   - Smooth transitions (0.3-0.5s)
   - Subtle scale/translate effects
   - Border and shadow animations

5. **VISUAL HIERARCHY** - Guide the eye:
   - Clear focal points per section
   - Breathing room between elements
   - Strategic contrast

## TECHNICAL REQUIREMENTS
- Single-page site with anchor navigation (href="#section")
- Fully responsive (mobile-first)
- Self-contained HTML with <style> tag
- Google Fonts + Font Awesome 6 CDN only
- No emojis - use Font Awesome icons
- Real content - no lorem ipsum
- Contact form (action="#")
- Smooth scroll behavior

## ANTI-PATTERNS TO AVOID
❌ Generic hero with centered text and stock photo
❌ Three-column service cards that look like every other site
❌ Basic Bootstrap-style layouts
❌ Predictable section ordering
❌ Safe, boring color choices
❌ Template-feeling anything

## OUTPUT
Return ONLY the complete HTML. Start with <!DOCTYPE html>, end with </html>.
No markdown, no explanations - just exceptional HTML/CSS.`

  // Use streaming for the HTML generation (main quality phase)
  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 16000,
    messages: [{ role: 'user', content: generatePrompt }]
  })

  const response = await stream.finalMessage()

  const textContent = response.content.find(c => c.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No HTML content generated')
  }

  return cleanHTML(textContent.text)
}

/**
 * Clean and validate the generated HTML
 */
function cleanHTML(text: string): string {
  let html = text

  // Remove markdown code blocks if present
  const codeBlockMatch = html.match(/```(?:html)?\s*([\s\S]*?)```/)
  if (codeBlockMatch) {
    html = codeBlockMatch[1]
  }

  // Ensure it starts with DOCTYPE
  if (!html.trim().toLowerCase().startsWith('<!doctype')) {
    const doctypeIndex = html.toLowerCase().indexOf('<!doctype')
    if (doctypeIndex !== -1) {
      html = html.substring(doctypeIndex)
    }
  }

  // Ensure it ends with </html>
  const htmlEndIndex = html.toLowerCase().lastIndexOf('</html>')
  if (htmlEndIndex !== -1) {
    html = html.substring(0, htmlEndIndex + 7)
  }

  return html.trim()
}
