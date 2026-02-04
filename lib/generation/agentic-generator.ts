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
 * Uses Haiku for speed - brief doesn't need to be super detailed
 */
async function createDesignBrief(input: AgenticInput, competitorInsights: string): Promise<string> {
  const briefPrompt = `Create a concise design brief for ${input.businessName} (${input.businessType} in ${input.location}).

BUSINESS INFO:
- Phone: ${input.phone || 'N/A'} | Email: ${input.email || 'N/A'}
- Address: ${input.address || 'N/A'} | Hours: ${input.hours || 'N/A'}
- Instagram: ${input.instagram ? `@${input.instagram}` : 'N/A'}
- Services: ${input.services?.join(', ') || 'General services'}
- USPs: ${input.uniqueSellingPoints?.join(', ') || 'Quality service'}
- Tone: ${input.preferredTone || 'Professional'}
- Colors: ${input.preferredColors?.join(', ') || 'Choose based on industry'}

RESEARCH INSIGHTS:
${competitorInsights}

OUTPUT A BRIEF DESIGN SPEC:
1. COLORS: 5 hex codes (primary, secondary, accent, background, text)
2. FONTS: Google Fonts (heading + body)
3. HERO: Style (full-bleed/split/minimal) + headline suggestion
4. SECTIONS: List in order with one-line purpose
5. CTA: Primary call-to-action text

Keep response under 400 words. Be specific with hex codes and font names.`

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
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
  const generatePrompt = `You are an expert frontend developer creating a production-ready website.

## THE CLIENT
${input.businessName} - a ${input.businessType} in ${input.location}

## CONTACT INFORMATION
- Phone: ${input.phone || 'Not provided'}
- Email: ${input.email || 'Not provided'}
- Address: ${input.address || 'Not provided'}
- Hours: ${input.hours || 'Not provided'}
- Instagram: ${input.instagram ? `https://instagram.com/${input.instagram}` : ''}
- Facebook: ${input.facebook || ''}

## SERVICES
${input.services?.map(s => `- ${s}`).join('\n') || '- Professional services'}

## DESIGN BRIEF
${designBrief}

---

## YOUR TASK

Create a complete, production-ready HTML website that:

1. **Follows the design brief EXACTLY** - Use the exact colors, fonts, and layout specified
2. **Is fully responsive** - Works perfectly on mobile, tablet, and desktop
3. **Looks professional** - This should look like it was built by a premium agency
4. **Has smooth interactions** - Include subtle hover effects, smooth scrolling
5. **Is self-contained** - All CSS in a <style> tag, no external dependencies except:
   - Google Fonts (import the fonts specified in the brief)
   - Font Awesome 6 for icons (https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)

## CRITICAL REQUIREMENTS

- **ONE-PAGE SITE** - This is a single-page website. All content lives on one page.
- **ANCHOR LINKS ONLY** - All navigation links MUST be anchor links (e.g., href="#about", href="#services", href="#contact"). Do NOT link to separate pages like /about or /privacy.
- **NO EMOJIS** - Use Font Awesome icons only
- **NO PLACEHOLDER TEXT** - Use the actual business name, services, contact info provided
- **REAL CONTENT** - Write compelling copy for this specific business
- **UNIQUE DESIGN** - This should NOT look like a generic template
- **SMOOTH SCROLLING** - Navigation should smooth-scroll to sections using anchor links
- **CONTACT FORM** - Include a contact form that posts to "#" (we'll wire it up later)
- **SOCIAL LINKS** - Include icons linking to their social profiles if provided
- **FOOTER LINKS** - In the footer, do NOT include links to Privacy Policy, Terms, or other pages. Just include social links and contact info.

## SECTIONS TO INCLUDE
Based on the design brief, include appropriate sections. Typical structure:
1. Navigation (fixed/sticky)
2. Hero section
3. About/Introduction
4. Services
5. Why Choose Us / Features
6. Testimonials or Social Proof
7. Contact section with form
8. Footer

## OUTPUT FORMAT
Return ONLY the complete HTML document. Start with <!DOCTYPE html> and end with </html>.
No explanations, no markdown code blocks - just the raw HTML.`

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
