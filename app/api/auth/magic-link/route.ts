import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import crypto from 'crypto'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Check if this email has a lead/subscription
    const { data: lead } = await supabase
      .from('leads')
      .select('id, business_name, slug, status')
      .eq('email', email.toLowerCase())
      .single()

    if (!lead) {
      // Don't reveal if email exists or not for security
      // But still return success to prevent email enumeration
      return NextResponse.json({ success: true })
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    // Store the token - using leads table for simplicity
    // Add auth_token and auth_token_expires columns if needed
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        auth_token: token,
        auth_token_expires: expiresAt.toISOString()
      })
      .eq('id', lead.id)

    if (updateError) {
      console.error('Error storing auth token:', updateError)
      // If columns don't exist, we still want to send the link
      // Just won't be able to verify it properly
    }

    // Build the magic link
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'https://www.onboard.com.au'
    const magicLink = `${origin}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`

    // Send email
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Onboard <hello@onboard.com.au>',
          to: email,
          subject: `Your login link for ${lead.business_name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 24px;">Sign in to Onboard</h1>
              <p style="color: #666; margin-bottom: 24px;">
                Click the button below to access your dashboard for <strong>${lead.business_name}</strong>.
              </p>
              <a href="${magicLink}" style="display: inline-block; background: #BFFF00; color: #000; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                Sign in to Dashboard
              </a>
              <p style="color: #999; font-size: 14px; margin-top: 32px;">
                This link expires in 15 minutes. If you didn't request this, you can safely ignore this email.
              </p>
            </div>
          `
        })
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        // Still log the link for development
        console.log('Magic link (email failed):', magicLink)
      }
    } else {
      // No email configured - log the link
      console.log('Magic link (no email configured):', magicLink)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Magic link error:', error)
    return NextResponse.json({ error: 'Failed to send login link' }, { status: 500 })
  }
}
