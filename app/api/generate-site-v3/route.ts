/**
 * Data-Driven Site Generation API v3
 *
 * This is the API endpoint wrapper for the site generation logic.
 * The actual generation logic is in /lib/generation/generate-site.ts
 * so it can be called directly from other server-side code.
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateAndSaveSite, GenerationInput } from '@/lib/generation/generate-site'

export const dynamic = 'force-dynamic'
export const maxDuration = 180 // Allow up to 3 minutes for full extraction + generation

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.businessName || !body.businessType || !body.location) {
      return NextResponse.json(
        { error: 'businessName, businessType, and location are required' },
        { status: 400 }
      )
    }

    // Build the generation input
    const input: GenerationInput = {
      businessName: body.businessName,
      businessType: body.businessType,
      location: body.location,
      website: body.website,
      instagram: body.instagram,
      facebook: body.facebook,
      competitorUrls: body.competitorUrls,
      services: body.services,
      uniqueSellingPoints: body.uniqueSellingPoints,
      targetCustomers: body.targetCustomers,
      preferredColors: body.preferredColors,
      preferredTone: body.preferredTone,
      additionalNotes: body.additionalNotes,
      phone: body.phone,
      email: body.email,
      address: body.address,
      hours: body.hours,
      logoUrl: body.logoUrl,
    }

    // Call the shared generation function
    const result = await generateAndSaveSite(input)

    return NextResponse.json(result)

  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate site', details: String(error) },
      { status: 500 }
    )
  }
}
