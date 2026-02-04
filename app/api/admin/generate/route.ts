import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { generateAgenticSite, AgenticInput } from '@/lib/generation/agentic-generator'

export const dynamic = 'force-dynamic'
export const maxDuration = 120

/**
 * Admin API to trigger site generation for a lead
 * POST /api/admin/generate
 * Body: { leadId: string } or { slug: string } or { email: string }
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const body = await request.json()
    const { leadId, slug, email } = body

    if (!leadId && !slug && !email) {
      return NextResponse.json(
        { error: 'leadId, slug, or email is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Find the lead
    let lead = null
    if (leadId) {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .maybeSingle()
      lead = data
    } else if (slug) {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()
      lead = data
    } else if (email) {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .eq('email', email)
        .maybeSingle()
      lead = data
    }

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    console.log(`\n${'='.repeat(60)}`)
    console.log(`🔧 ADMIN: Generating site for ${lead.business_name}`)
    console.log(`Slug: ${lead.slug}`)
    console.log(`${'='.repeat(60)}\n`)

    // Get metadata (preferences are stored here)
    const metadata = lead.metadata || {}

    // Build input from lead data
    // Note: Colors/tone are stored in metadata from onboarding, not direct columns
    const input: AgenticInput = {
      businessName: lead.business_name,
      businessType: lead.business_type || lead.industry || metadata.businessType || 'Service Business',
      location: lead.suburb || lead.location || 'Melbourne',
      phone: lead.phone || metadata.phone,
      email: lead.email,
      address: lead.address || metadata.address,
      hours: lead.hours || formatHoursFromMetadata(metadata.operatingHours),
      instagram: lead.instagram || metadata.instagram,
      facebook: lead.facebook || metadata.facebook,
      website: lead.website || metadata.website,
      services: parseServices(lead.services || metadata.services),
      uniqueSellingPoints: parseArray(lead.unique_selling_points || metadata.uniqueSellingPoints),
      targetCustomers: parseArray(lead.target_customers || metadata.targetCustomers),
      additionalNotes: lead.additional_notes || lead.notes || metadata.additionalNotes,
      // CRITICAL: Read from metadata where onboarding stores them
      preferredColors: lead.preferred_colors || metadata.preferredColors,
      preferredTone: lead.preferred_tone || metadata.preferredTone,
      logoUrl: lead.logo_url || metadata.logoUrl,
    }

    console.log('Generation input:', {
      businessName: input.businessName,
      preferredColors: input.preferredColors,
      preferredTone: input.preferredTone,
    })

    // Generate the site
    const result = await generateAgenticSite(input)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Generation failed', details: result },
        { status: 500 }
      )
    }

    // Update lead status
    await supabase
      .from('leads')
      .update({ status: 'generated', updated_at: new Date().toISOString() })
      .eq('id', lead.id)

    const totalTime = Date.now() - startTime

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      slug: lead.slug,
      businessName: lead.business_name,
      generationTime: result.generationTime,
      totalTime,
      previewUrl: `/claim/${lead.slug}`,
      siteUrl: `/site/${lead.slug}`,
    })

  } catch (error) {
    console.error('Admin generate error:', error)
    return NextResponse.json(
      {
        error: 'Generation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        time: Date.now() - startTime
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/admin/generate?slug=xxx
 * Check if a site has been generated
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const leadId = searchParams.get('leadId')

    if (!slug && !leadId) {
      return NextResponse.json(
        { error: 'slug or leadId is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Check if site exists
    let query = supabase.from('client_sites').select('id, slug, created_at, updated_at')

    if (slug) {
      query = query.eq('slug', slug)
    } else if (leadId) {
      query = query.eq('lead_id', leadId)
    }

    const { data: site } = await query.maybeSingle()

    // Also check for generated_html
    let hasHtml = false
    if (site) {
      const { data: siteWithHtml } = await supabase
        .from('client_sites')
        .select('generated_html')
        .eq('id', site.id)
        .maybeSingle()
      hasHtml = !!siteWithHtml?.generated_html
    }

    return NextResponse.json({
      exists: !!site,
      hasGeneratedHtml: hasHtml,
      site: site ? {
        id: site.id,
        slug: site.slug,
        createdAt: site.created_at,
        updatedAt: site.updated_at,
      } : null,
    })

  } catch (error) {
    console.error('Admin generate GET error:', error)
    return NextResponse.json(
      { error: 'Failed to check site status' },
      { status: 500 }
    )
  }
}

function parseServices(services: unknown): string[] {
  if (!services) return ['Professional Services']
  if (Array.isArray(services)) return services.filter(s => s && typeof s === 'string')
  if (typeof services === 'string') {
    try {
      const parsed = JSON.parse(services)
      if (Array.isArray(parsed)) return parsed
    } catch {
      return services.split(',').map(s => s.trim()).filter(Boolean)
    }
  }
  return ['Professional Services']
}

function parseArray(input: unknown): string[] {
  if (!input) return []
  if (Array.isArray(input)) return input.filter(s => s && typeof s === 'string')
  if (typeof input === 'string') {
    try {
      const parsed = JSON.parse(input)
      if (Array.isArray(parsed)) return parsed
    } catch {
      return input.split(',').map(s => s.trim()).filter(Boolean)
    }
  }
  return []
}

function formatHoursFromMetadata(operatingHours: unknown): string | undefined {
  if (!operatingHours || typeof operatingHours !== 'object') return undefined

  const hours = operatingHours as Record<string, { open?: string; close?: string; closed?: boolean }>
  const parts: string[] = []

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  for (const day of days) {
    const dayHours = hours[day]
    if (dayHours && !dayHours.closed && dayHours.open && dayHours.close) {
      parts.push(`${day.charAt(0).toUpperCase() + day.slice(1)}: ${dayHours.open}-${dayHours.close}`)
    }
  }

  return parts.length > 0 ? parts.join(', ') : undefined
}
