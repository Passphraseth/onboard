import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// Serve generated HTML directly as a page
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('client_sites')
    .select('generated_html')
    .eq('slug', slug)
    .maybeSingle()

  if (!data?.generated_html) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head><title>Site Not Found</title></head>
      <body style="font-family: system-ui; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0;">
        <div style="text-align: center;">
          <h1>Site not found</h1>
          <p>The site "${slug}" hasn't been generated yet.</p>
          <a href="/onboard" style="color: #2563eb;">Create your site</a>
        </div>
      </body>
      </html>`,
      {
        status: 404,
        headers: { 'Content-Type': 'text/html' }
      }
    )
  }

  return new NextResponse(data.generated_html, {
    headers: { 'Content-Type': 'text/html' }
  })
}
