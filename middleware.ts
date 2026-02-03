import { NextRequest, NextResponse } from 'next/server'

// Domains that serve the main marketing site
const MAIN_DOMAINS = [
  'onboard.com.au',
  'www.onboard.com.au',
  'localhost:3000',
  'localhost',
]

// Site serving domain
const SITE_DOMAIN = 'onboard.site'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // Skip for API routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if this is a subdomain request on onboard.site
  if (host.endsWith(`.${SITE_DOMAIN}`) || host.endsWith(`.onboard.site`)) {
    const subdomain = host.split('.')[0]

    // Skip if accessing the root domain
    if (subdomain === 'www' || subdomain === SITE_DOMAIN || !subdomain) {
      return NextResponse.next()
    }

    // Rewrite to the site route
    const url = request.nextUrl.clone()
    url.pathname = `/site/${subdomain}${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  // Check for custom domains (not main marketing domains)
  const isMainDomain = MAIN_DOMAINS.some(domain =>
    host === domain || host.startsWith(`${domain}:`)
  )

  if (!isMainDomain && !host.includes('vercel.app')) {
    // This is a custom domain - rewrite to the custom domain handler
    // The handler will look up the domain in the database and serve the site
    const url = request.nextUrl.clone()
    url.pathname = `/site/_custom`
    url.searchParams.set('domain', host.replace(/:\d+$/, ''))
    url.searchParams.set('path', pathname)
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
