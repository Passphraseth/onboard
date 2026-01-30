/**
 * Brand Extraction API
 *
 * This endpoint orchestrates all data extraction before site generation.
 * It pulls data from:
 * - User's existing website
 * - User's Instagram
 * - Competitor websites
 * - User preferences
 *
 * Returns a comprehensive BrandProfile that drives unique site generation.
 */

import { NextRequest, NextResponse } from 'next/server'
import { extractBrandProfile, ExtractionInput, BrandProfile } from '@/lib/extraction/brand-orchestrator'

export const dynamic = 'force-dynamic'
export const maxDuration = 120 // Allow up to 2 minutes for full extraction

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

    // Build extraction input from request
    const input: ExtractionInput = {
      // Required
      businessName: body.businessName,
      businessType: body.businessType,
      location: body.location,

      // URLs to analyze
      existingWebsite: body.website || body.existingWebsite,
      instagramUsername: extractInstagramUsername(body.instagram),
      facebookUrl: body.facebook || body.facebookUrl,
      competitorUrls: body.competitorUrls || body.competitors,

      // User preferences
      services: body.services,
      uniqueSellingPoints: body.uniqueSellingPoints || body.usps,
      targetCustomers: body.targetCustomers,
      preferredColors: body.preferredColors || body.brandColors,
      preferredTone: body.preferredTone || body.tone || body.feel,
      additionalNotes: body.additionalNotes || body.notes,

      // Contact info
      phone: body.phone,
      email: body.email,
      address: body.address,
      hours: body.hours,

      // Direct uploads
      logoUrl: body.logoUrl || body.logo,
    }

    console.log('\n=== BRAND EXTRACTION API ===')
    console.log(`Business: ${input.businessName}`)
    console.log(`Type: ${input.businessType}`)
    console.log(`Location: ${input.location}`)
    console.log(`Website: ${input.existingWebsite || 'Not provided'}`)
    console.log(`Instagram: ${input.instagramUsername || 'Not provided'}`)
    console.log(`Competitor URLs: ${input.competitorUrls?.length || 0}`)
    console.log('============================\n')

    // Run the extraction
    const brandProfile = await extractBrandProfile(input)

    // Return the brand profile
    return NextResponse.json({
      success: true,
      profile: brandProfile,
      // Also return a simplified version for quick access
      summary: {
        colors: brandProfile.colors,
        fonts: brandProfile.fonts,
        layout: brandProfile.layout,
        tone: brandProfile.tone,
        hasInstagramData: !!brandProfile.rawData.instagramAnalysis,
        hasWebsiteData: !!brandProfile.rawData.websiteAnalysis,
        hasCompetitorData: !!brandProfile.rawData.competitorPatterns,
        imageCount: brandProfile.images.gallery.length,
      }
    })

  } catch (error) {
    console.error('Brand extraction error:', error)
    return NextResponse.json(
      { error: 'Failed to extract brand data', details: String(error) },
      { status: 500 }
    )
  }
}

/**
 * Extract Instagram username from various input formats
 */
function extractInstagramUsername(input?: string): string | undefined {
  if (!input) return undefined

  // Already just a username
  if (!input.includes('/') && !input.includes('.')) {
    return input.replace('@', '').trim()
  }

  // Full URL like https://instagram.com/username
  const urlMatch = input.match(/instagram\.com\/([^/?]+)/)
  if (urlMatch) {
    return urlMatch[1]
  }

  // Handle @username format
  if (input.startsWith('@')) {
    return input.slice(1).trim()
  }

  return input.trim()
}
