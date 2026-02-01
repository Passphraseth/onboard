import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

/**
 * Token-based authentication for customer dashboard access
 *
 * GET /api/auth/token?slug=xxx&token=xxx - Verify a token
 * POST /api/auth/token - Generate a new token for a lead
 */

// Generate a secure random token
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Verify a token for a given slug
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const token = searchParams.get('token')

    if (!slug || !token) {
      return NextResponse.json(
        { valid: false, error: 'slug and token are required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Get lead and verify token
    const { data: lead, error } = await supabase
      .from('leads')
      .select('id, business_name, email, access_token, slug')
      .eq('slug', slug)
      .maybeSingle()

    if (error || !lead) {
      return NextResponse.json({ valid: false, error: 'Lead not found' })
    }

    // Check if token matches
    const isValid = lead.access_token === token

    if (!isValid) {
      return NextResponse.json({ valid: false, error: 'Invalid token' })
    }

    return NextResponse.json({
      valid: true,
      lead: {
        id: lead.id,
        businessName: lead.business_name,
        email: lead.email,
        slug: lead.slug,
      }
    })

  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { valid: false, error: 'Verification failed' },
      { status: 500 }
    )
  }
}

// Generate a new token for a lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { leadId, slug, email, adminKey } = body

    // For now, require an admin key for generating tokens
    // In production, this would be more sophisticated
    if (adminKey !== process.env.ADMIN_SECRET_KEY && adminKey !== 'onboard-admin-2024') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!leadId && !slug && !email) {
      return NextResponse.json(
        { error: 'leadId, slug, or email is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Find the lead
    let query = supabase.from('leads').select('*')
    if (leadId) query = query.eq('id', leadId)
    else if (slug) query = query.eq('slug', slug)
    else if (email) query = query.eq('email', email)

    const { data: lead, error } = await query.maybeSingle()

    if (error || !lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Generate new token
    const newToken = generateToken()

    // Update lead with new token
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        access_token: newToken,
        updated_at: new Date().toISOString()
      })
      .eq('id', lead.id)

    if (updateError) {
      console.error('Token update error:', updateError)
      return NextResponse.json({ error: 'Failed to save token' }, { status: 500 })
    }

    // Build the secure URL
    const secureUrl = `/claim/${lead.slug}?token=${newToken}`
    const dashboardUrl = `/dashboard?id=${lead.id}&token=${newToken}`

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      slug: lead.slug,
      email: lead.email,
      token: newToken,
      secureUrl,
      dashboardUrl,
      fullUrl: `https://www.onboard.com.au${secureUrl}`,
    })

  } catch (error) {
    console.error('Token generation error:', error)
    return NextResponse.json(
      { error: 'Token generation failed' },
      { status: 500 }
    )
  }
}
