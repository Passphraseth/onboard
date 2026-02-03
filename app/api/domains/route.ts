import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const VERCEL_TOKEN = process.env.VERCEL_TOKEN
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID
const SITE_DOMAIN = 'onboard.site'

interface VercelDomainResponse {
  name: string
  apexName: string
  projectId: string
  verified: boolean
  verification?: {
    type: string
    domain: string
    value: string
    reason: string
  }[]
  error?: {
    code: string
    message: string
  }
}

// Create a subdomain for a site
export async function POST(request: NextRequest) {
  try {
    const { slug, leadId, customerId } = await request.json()

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    // Validate the slug exists in database
    const { data: site } = await supabase
      .from('client_sites')
      .select('id, slug, status')
      .eq('slug', slug)
      .single()

    if (!site) {
      return NextResponse.json(
        { error: 'Site not found' },
        { status: 404 }
      )
    }

    const subdomain = `${slug}.${SITE_DOMAIN}`

    // Check if Vercel configuration exists
    if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
      // Return success with placeholder URL for development
      console.log('Vercel not configured, skipping domain creation')
      return NextResponse.json({
        success: true,
        domain: subdomain,
        url: `https://${subdomain}`,
        development: true,
        message: 'Vercel not configured - domain creation skipped',
      })
    }

    // Add domain to Vercel project
    const vercelUrl = VERCEL_TEAM_ID
      ? `https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/domains?teamId=${VERCEL_TEAM_ID}`
      : `https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/domains`

    const vercelResponse = await fetch(vercelUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: subdomain,
      }),
    })

    const vercelData: VercelDomainResponse = await vercelResponse.json()

    if (vercelData.error) {
      // Domain might already exist, which is fine
      if (vercelData.error.code === 'domain_already_exists') {
        return NextResponse.json({
          success: true,
          domain: subdomain,
          url: `https://${subdomain}`,
          alreadyExists: true,
        })
      }

      console.error('Vercel domain error:', vercelData.error)
      return NextResponse.json(
        { error: vercelData.error.message || 'Failed to add domain' },
        { status: 400 }
      )
    }

    // Update the site record with the subdomain
    await supabase
      .from('client_sites')
      .update({
        status: 'live',
        published_at: new Date().toISOString(),
      })
      .eq('id', site.id)

    // If there's a lead, update its status too
    if (leadId) {
      await supabase
        .from('leads')
        .update({ status: 'converted' })
        .eq('id', leadId)
    }

    return NextResponse.json({
      success: true,
      domain: subdomain,
      url: `https://${subdomain}`,
      verified: vercelData.verified,
    })
  } catch (error) {
    console.error('Error creating subdomain:', error)
    return NextResponse.json(
      { error: 'Failed to create subdomain' },
      { status: 500 }
    )
  }
}

// Get domain status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    const subdomain = `${slug}.${SITE_DOMAIN}`

    if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
      return NextResponse.json({
        domain: subdomain,
        configured: false,
        development: true,
      })
    }

    // Check domain status in Vercel
    const vercelUrl = VERCEL_TEAM_ID
      ? `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${subdomain}?teamId=${VERCEL_TEAM_ID}`
      : `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${subdomain}`

    const vercelResponse = await fetch(vercelUrl, {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    })

    if (!vercelResponse.ok) {
      return NextResponse.json({
        domain: subdomain,
        configured: false,
        status: 'not_configured',
      })
    }

    const vercelData: VercelDomainResponse = await vercelResponse.json()

    return NextResponse.json({
      domain: subdomain,
      configured: true,
      verified: vercelData.verified,
      url: `https://${subdomain}`,
    })
  } catch (error) {
    console.error('Error checking domain:', error)
    return NextResponse.json(
      { error: 'Failed to check domain status' },
      { status: 500 }
    )
  }
}
