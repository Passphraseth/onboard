import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const VERCEL_TOKEN = process.env.VERCEL_TOKEN
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID

interface VercelDomainConfig {
  name: string
  apexName: string
  projectId: string
  redirect?: string
  redirectStatusCode?: number
  gitBranch?: string
  updatedAt?: number
  createdAt?: number
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

// Add a custom domain to a site
export async function POST(request: NextRequest) {
  try {
    const { siteId, slug, domain, leadId } = await request.json()

    if (!domain || (!siteId && !slug)) {
      return NextResponse.json(
        { error: 'Domain and either siteId or slug required' },
        { status: 400 }
      )
    }

    // Normalize domain (remove protocol, www, trailing slash)
    const normalizedDomain = domain
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '')
      .toLowerCase()

    // Validate domain format
    const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/
    if (!domainRegex.test(normalizedDomain)) {
      return NextResponse.json(
        { error: 'Invalid domain format' },
        { status: 400 }
      )
    }

    // Get site
    let site
    if (siteId) {
      const { data } = await supabase
        .from('client_sites')
        .select('id, slug, custom_domain')
        .eq('id', siteId)
        .single()
      site = data
    } else {
      const { data } = await supabase
        .from('client_sites')
        .select('id, slug, custom_domain')
        .eq('slug', slug)
        .single()
      site = data
    }

    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    // Check if domain is already in use by another site
    const { data: existingDomain } = await supabase
      .from('client_sites')
      .select('id, slug')
      .eq('custom_domain', normalizedDomain)
      .neq('id', site.id)
      .single()

    if (existingDomain) {
      return NextResponse.json(
        { error: 'Domain is already in use by another site' },
        { status: 409 }
      )
    }

    // Add domain to Vercel
    let vercelData: VercelDomainConfig | null = null
    if (VERCEL_TOKEN && VERCEL_PROJECT_ID) {
      const vercelUrl = VERCEL_TEAM_ID
        ? `https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/domains?teamId=${VERCEL_TEAM_ID}`
        : `https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/domains`

      const vercelResponse = await fetch(vercelUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: normalizedDomain }),
      })

      vercelData = await vercelResponse.json()

      if (vercelData?.error && vercelData.error.code !== 'domain_already_exists') {
        return NextResponse.json(
          { error: vercelData.error.message || 'Failed to add domain to Vercel' },
          { status: 400 }
        )
      }
    }

    // Update site with custom domain
    await supabase
      .from('client_sites')
      .update({
        custom_domain: normalizedDomain,
        domain_verified: vercelData?.verified || false,
      })
      .eq('id', site.id)

    // Return verification instructions if needed
    const verification = vercelData?.verification || []
    const needsVerification = verification.length > 0 && !vercelData?.verified

    return NextResponse.json({
      success: true,
      domain: normalizedDomain,
      verified: vercelData?.verified || false,
      needsVerification,
      verification: needsVerification ? verification : null,
      message: needsVerification
        ? 'Please add the DNS records below to verify your domain'
        : 'Domain added successfully!',
    })
  } catch (error) {
    console.error('Error adding custom domain:', error)
    return NextResponse.json(
      { error: 'Failed to add custom domain' },
      { status: 500 }
    )
  }
}

// Get domain status and verification info
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get('siteId')
    const slug = searchParams.get('slug')
    const domain = searchParams.get('domain')

    if (!siteId && !slug && !domain) {
      return NextResponse.json(
        { error: 'siteId, slug, or domain required' },
        { status: 400 }
      )
    }

    // Get site
    let site
    if (domain) {
      const { data } = await supabase
        .from('client_sites')
        .select('id, slug, custom_domain, domain_verified')
        .eq('custom_domain', domain)
        .single()
      site = data
    } else if (siteId) {
      const { data } = await supabase
        .from('client_sites')
        .select('id, slug, custom_domain, domain_verified')
        .eq('id', siteId)
        .single()
      site = data
    } else {
      const { data } = await supabase
        .from('client_sites')
        .select('id, slug, custom_domain, domain_verified')
        .eq('slug', slug)
        .single()
      site = data
    }

    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    if (!site.custom_domain) {
      return NextResponse.json({
        domain: null,
        configured: false,
        verified: false,
      })
    }

    // Check verification status in Vercel
    let vercelData: VercelDomainConfig | null = null
    if (VERCEL_TOKEN && VERCEL_PROJECT_ID && site.custom_domain) {
      const vercelUrl = VERCEL_TEAM_ID
        ? `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${site.custom_domain}?teamId=${VERCEL_TEAM_ID}`
        : `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${site.custom_domain}`

      const vercelResponse = await fetch(vercelUrl, {
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      })

      if (vercelResponse.ok) {
        vercelData = await vercelResponse.json()

        // Update verification status in database if changed
        if (vercelData && vercelData.verified !== site.domain_verified) {
          await supabase
            .from('client_sites')
            .update({ domain_verified: vercelData.verified })
            .eq('id', site.id)
        }
      }
    }

    return NextResponse.json({
      domain: site.custom_domain,
      configured: true,
      verified: vercelData?.verified || site.domain_verified,
      verification: vercelData?.verification || null,
      slug: site.slug,
    })
  } catch (error) {
    console.error('Error checking domain:', error)
    return NextResponse.json(
      { error: 'Failed to check domain status' },
      { status: 500 }
    )
  }
}

// Remove a custom domain
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get('siteId')
    const slug = searchParams.get('slug')

    if (!siteId && !slug) {
      return NextResponse.json(
        { error: 'siteId or slug required' },
        { status: 400 }
      )
    }

    // Get site
    let site
    if (siteId) {
      const { data } = await supabase
        .from('client_sites')
        .select('id, custom_domain')
        .eq('id', siteId)
        .single()
      site = data
    } else {
      const { data } = await supabase
        .from('client_sites')
        .select('id, custom_domain')
        .eq('slug', slug)
        .single()
      site = data
    }

    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    if (!site.custom_domain) {
      return NextResponse.json({ success: true, message: 'No custom domain configured' })
    }

    // Remove from Vercel
    if (VERCEL_TOKEN && VERCEL_PROJECT_ID) {
      const vercelUrl = VERCEL_TEAM_ID
        ? `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${site.custom_domain}?teamId=${VERCEL_TEAM_ID}`
        : `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${site.custom_domain}`

      await fetch(vercelUrl, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      })
    }

    // Clear custom domain in database
    await supabase
      .from('client_sites')
      .update({
        custom_domain: null,
        domain_verified: false,
      })
      .eq('id', site.id)

    return NextResponse.json({
      success: true,
      message: 'Custom domain removed',
    })
  } catch (error) {
    console.error('Error removing custom domain:', error)
    return NextResponse.json(
      { error: 'Failed to remove custom domain' },
      { status: 500 }
    )
  }
}
