/**
 * Agentic Site Generator V4 API
 *
 * This endpoint uses a multi-phase AI approach:
 * 1. Research - Analyzes industry and competitors
 * 2. Brief - Creates a unique design brief
 * 3. Generate - Produces high-quality HTML
 *
 * Timeout: 120 seconds (this is a quality-focused generator)
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateAgenticSite, AgenticInput } from '@/lib/generation/agentic-generator'

export const dynamic = 'force-dynamic'
export const maxDuration = 120 // 2 minutes for quality generation

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const body = await request.json()

    // Validate required fields
    if (!body.businessName || !body.businessType) {
      return NextResponse.json(
        { error: 'businessName and businessType are required' },
        { status: 400 }
      )
    }

    console.log('\n' + '='.repeat(60))
    console.log('📥 AGENTIC GENERATOR V4 - API REQUEST')
    console.log(`Business: ${body.businessName}`)
    console.log(`Type: ${body.businessType}`)
    console.log(`Location: ${body.location || 'Not specified'}`)
    console.log('='.repeat(60) + '\n')

    // Build input
    const input: AgenticInput = {
      businessName: body.businessName,
      businessType: body.businessType,
      location: body.location || body.suburb || 'Melbourne',
      phone: body.phone,
      email: body.email,
      address: body.address,
      hours: body.hours,
      instagram: body.instagram?.replace('@', ''),
      facebook: body.facebook,
      website: body.website,
      services: normalizeServices(body.services, body.customServices),
      uniqueSellingPoints: normalizeArray(body.uniqueSellingPoints),
      targetCustomers: normalizeArray(body.targetCustomers),
      additionalNotes: body.additionalNotes,
      preferredColors: body.preferredColors,
      preferredTone: body.preferredTone,
      logoUrl: body.logoUrl,
    }

    // Generate the site
    const result = await generateAgenticSite(input)

    const totalTime = Date.now() - startTime

    return NextResponse.json({
      success: result.success,
      slug: result.slug,
      generationTime: result.generationTime,
      totalTime,
      saved: result.saved,
      // Include brief summary for debugging
      briefSummary: result.designBrief.substring(0, 500) + '...',
    })

  } catch (error) {
    console.error('V4 Generator Error:', error)
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
 * Normalize services array from various input formats
 */
function normalizeServices(services?: string[], customServices?: string): string[] {
  const result: string[] = []

  // Add services array
  if (Array.isArray(services)) {
    result.push(...services.filter(s => s && s.trim()))
  }

  // Add custom services (newline separated)
  if (customServices && typeof customServices === 'string') {
    const custom = customServices
      .split('\n')
      .map(s => s.trim())
      .filter(s => s && s.length > 0)
    result.push(...custom)
  }

  return result.length > 0 ? result : ['Professional Services']
}

/**
 * Normalize array input (handles string or array)
 */
function normalizeArray(input?: string | string[]): string[] {
  if (!input) return []
  if (Array.isArray(input)) return input.filter(s => s && s.trim())
  if (typeof input === 'string') {
    return input.split(',').map(s => s.trim()).filter(s => s)
  }
  return []
}
