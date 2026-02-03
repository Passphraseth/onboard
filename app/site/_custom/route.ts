import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Handle custom domain requests
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const domain = searchParams.get('domain')
  const path = searchParams.get('path') || '/'

  if (!domain) {
    return new NextResponse('Domain required', { status: 400 })
  }

  // Normalize domain
  const normalizedDomain = domain.toLowerCase().replace(/^www\./, '')

  const supabase = createAdminClient()

  // Look up site by custom domain
  const { data: site } = await supabase
    .from('client_sites')
    .select('id, slug, generated_html, custom_domain, domain_verified, status')
    .eq('custom_domain', normalizedDomain)
    .single()

  // If not found, try without www prefix variations
  if (!site) {
    const { data: siteAlt } = await supabase
      .from('client_sites')
      .select('id, slug, generated_html, custom_domain, domain_verified, status')
      .eq('custom_domain', `www.${normalizedDomain}`)
      .single()

    if (siteAlt) {
      // Found with www prefix - redirect to non-www
      return NextResponse.redirect(`https://${normalizedDomain}${path}`, 301)
    }
  }

  if (!site) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Domain Not Configured</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: #0f0f0f;
            color: white;
          }
          .container {
            text-align: center;
            max-width: 400px;
            padding: 2rem;
          }
          h1 { font-size: 1.5rem; margin-bottom: 1rem; }
          p { opacity: 0.7; margin-bottom: 1.5rem; }
          a {
            display: inline-block;
            background: white;
            color: black;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Domain Not Configured</h1>
          <p>The domain <strong>${domain}</strong> is not connected to any site.</p>
          <a href="https://onboard.com.au">Visit Onboard</a>
        </div>
      </body>
      </html>`,
      {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
      }
    )
  }

  // Check if domain is verified
  if (!site.domain_verified) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Domain Pending Verification</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: #0f0f0f;
            color: white;
          }
          .container {
            text-align: center;
            max-width: 500px;
            padding: 2rem;
          }
          h1 { font-size: 1.5rem; margin-bottom: 1rem; }
          p { opacity: 0.7; margin-bottom: 1rem; }
          .note {
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🔄 Domain Verification Pending</h1>
          <p>The domain <strong>${domain}</strong> is connected but still being verified.</p>
          <div class="note">
            <p>DNS changes can take up to 48 hours to propagate.</p>
            <p>Please check back soon!</p>
          </div>
        </div>
      </body>
      </html>`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      }
    )
  }

  // Check site status
  if (site.status === 'paused') {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head><title>Site Paused</title></head>
      <body style="font-family: system-ui; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0f0f0f; color: white;">
        <div style="text-align: center;">
          <h1>Site Currently Unavailable</h1>
          <p>This site is temporarily paused.</p>
        </div>
      </body>
      </html>`,
      {
        status: 503,
        headers: { 'Content-Type': 'text/html' },
      }
    )
  }

  // Serve the site HTML
  if (!site.generated_html) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head><title>Site Not Ready</title></head>
      <body style="font-family: system-ui; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0f0f0f; color: white;">
        <div style="text-align: center;">
          <h1>Site Not Ready</h1>
          <p>This site hasn't been published yet.</p>
        </div>
      </body>
      </html>`,
      {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
      }
    )
  }

  return new NextResponse(site.generated_html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}
