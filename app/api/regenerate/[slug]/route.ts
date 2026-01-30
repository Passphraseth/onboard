import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { generateAgenticSite, AgenticInput } from '@/lib/generation/agentic-generator'

export const dynamic = 'force-dynamic'
export const maxDuration = 120 // 2 minutes for quality generation

/**
 * Regenerate a site using the V4 Agentic Generator
 * POST /api/regenerate/[slug]
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const startTime = Date.now()

  try {
    const { slug } = params
    console.log(`\n🔄 REGENERATING: ${slug}`)

    const supabase = createAdminClient()

    // Fetch existing lead data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*, client_sites(*)')
      .eq('slug', slug)
      .maybeSingle()

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead not found', slug },
        { status: 404 }
      )
    }

    // Extract metadata
    const metadata = lead.metadata || {}

    // Combine services
    const services = [
      ...(metadata.services || []),
      ...(metadata.customServices ? metadata.customServices.split('\n').filter((s: string) => s.trim()) : [])
    ]

    // Build hours string
    const hours = formatHours(metadata.operatingHours)

    // Build input for V4 generator
    const agenticInput: AgenticInput = {
      businessName: lead.business_name,
      businessType: lead.category || 'business',
      location: lead.suburb || 'Melbourne',
      phone: lead.phone || metadata.phone || '',
      email: lead.email || metadata.email || '',
      address: metadata.address || '',
      hours,
      instagram: metadata.instagram?.replace('@', '') || '',
      facebook: metadata.facebook || '',
      website: metadata.website || '',
      services: services.length > 0 ? services : ['Professional Services'],
      uniqueSellingPoints: parseList(metadata.uniqueSellingPoints),
      targetCustomers: parseList(metadata.targetCustomers),
      additionalNotes: metadata.additionalNotes || '',
      preferredColors: metadata.preferredColors,
      preferredTone: metadata.preferredTone,
      logoUrl: metadata.logoUrl,
    }

    console.log('Input for V4 generator:', {
      business: agenticInput.businessName,
      type: agenticInput.businessType,
      services: agenticInput.services,
      tone: agenticInput.preferredTone,
      colors: agenticInput.preferredColors,
    })

    // Generate using V4 Agentic Generator
    const result = await generateAgenticSite(agenticInput)

    const totalTime = Date.now() - startTime

    return NextResponse.json({
      success: true,
      slug,
      message: `Regenerated ${lead.business_name} with V4 Agentic Generator`,
      generationTime: result.generationTime,
      totalTime,
      saved: result.saved,
      briefPreview: result.designBrief.substring(0, 300) + '...',
    })

  } catch (error) {
    console.error('Regenerate error:', error)
    return NextResponse.json(
      {
        error: 'Failed to regenerate site',
        details: error instanceof Error ? error.message : 'Unknown error',
        time: Date.now() - startTime
      },
      { status: 500 }
    )
  }
}

function formatHours(hours: Record<string, { open: string; close: string; closed: boolean }> | undefined): string {
  if (!hours) return ''

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const formatted: string[] = []

  days.forEach(day => {
    const dayHours = hours[day]
    if (dayHours) {
      const hoursString = dayHours.closed ? 'Closed' : `${dayHours.open} - ${dayHours.close}`
      formatted.push(`${day.charAt(0).toUpperCase() + day.slice(1, 3)}: ${hoursString}`)
    }
  })

  return formatted.join(' | ')
}

function parseList(input: string | string[] | undefined): string[] {
  if (!input) return []
  if (Array.isArray(input)) return input.filter(s => s && s.trim())
  if (typeof input === 'string') {
    return input.split(',').map(s => s.trim()).filter(s => s)
  }
  return []
}
