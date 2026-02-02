import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

// This would integrate with your existing database/CRM system
// For now, we'll simulate the API response

interface LeadMagnetData {
  type: 'tradie-checklist' | 'roi-calculator' | 'free-audit'
  name: string
  email: string
  businessType: string
  source: string
  currentWebsite?: string
  results?: any
  monthlyRevenue?: number
  averageJobValue?: number
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadMagnetData = await request.json()
    const { type, name, email, businessType, source, ...additionalData } = body

    // Basic validation
    if (!name || !email || !businessType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get client IP for tracking
    const forwardedFor = headers().get('x-forwarded-for')
    const clientIP = forwardedFor ? forwardedFor.split(',')[0] : 'unknown'

    // Prepare lead data
    const leadData = {
      type,
      name,
      email: email.toLowerCase().trim(),
      businessType,
      source,
      clientIP,
      timestamp: new Date().toISOString(),
      additionalData,
    }

    // Log to console for now (replace with database insertion)
    console.log('New lead magnet submission:', leadData)

    // Here you would:
    // 1. Insert into database
    // 2. Send to CRM (HubSpot, Pipedrive, etc.)
    // 3. Add to email list
    // 4. Send confirmation email with the lead magnet

    // Simulate different responses based on type
    let response: any = { success: true }

    switch (type) {
      case 'tradie-checklist':
        response = {
          success: true,
          message: 'Tradie checklist sent successfully',
          nextSteps: [
            'Check your email for the PDF download',
            'Complete the 15-point audit of your current site',
            'Book a free consultation if you need help implementing fixes'
          ]
        }
        break

      case 'roi-calculator':
        response = {
          success: true,
          message: 'ROI report generated successfully',
          calculatedValues: additionalData.results,
          recommendations: generateROIRecommendations(additionalData)
        }
        break

      case 'free-audit':
        response = {
          success: true,
          message: 'Free audit request received',
          estimatedCompletion: '24-48 hours'
        }
        break

      default:
        response = { success: true, message: 'Lead captured successfully' }
    }

    // Send welcome email (you'd integrate with your email service here)
    await sendWelcomeEmail(leadData)

    return NextResponse.json(response)

  } catch (error) {
    console.error('Lead magnet API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateROIRecommendations(data: any) {
  const { monthlyRevenue, averageJobValue, results } = data

  const recommendations = []

  if (results?.annualValue > 50000) {
    recommendations.push({
      priority: 'high',
      action: 'Get professional website immediately',
      reason: `With ${results.annualValue.toLocaleString()} in annual opportunity, delaying costs you $${Math.round(results.annualValue/365)} per day`
    })
  }

  if (averageJobValue > 1000) {
    recommendations.push({
      priority: 'high', 
      action: 'Focus on premium positioning',
      reason: 'High-value customers expect professional online presence'
    })
  }

  if (monthlyRevenue > 20000) {
    recommendations.push({
      priority: 'medium',
      action: 'Consider Google Ads investment',
      reason: 'Your business size can support paid acquisition'
    })
  }

  return recommendations
}

async function sendWelcomeEmail(leadData: any) {
  // This would integrate with your email service (SendGrid, Mailgun, etc.)
  // For now, just log
  console.log('Would send welcome email to:', leadData.email)
  
  // Example email content based on lead type
  const emailTemplates = {
    'tradie-checklist': {
      subject: '🔧 Your Free Tradie Website Checklist is here!',
      content: `
        Hi ${leadData.name},

        Thanks for downloading our 15-Point Website Checklist for Australian Tradies!

        📎 Download your checklist: [ATTACHMENT]

        Here's what to do next:
        1. Print the checklist or open it on your phone
        2. Go through each point for your current website (or lack thereof)
        3. Make note of where you're failing - each failure is costing you customers

        Most tradies fail 8-12 points on this checklist. If that's you, don't worry - we can fix everything in about 15 minutes.

        Want to see what a professional tradie website looks like for your business?
        👉 See your preview: https://onboard.com.au/onboard

        Cheers,
        Bobby
        Onboard - Your No BS Digital Partner

        PS: Reply to this email with any questions. I read every response personally.
      `
    },
    'roi-calculator': {
      subject: '📊 Your Website ROI Report (Custom Analysis)',
      content: `
        Hi ${leadData.name},

        Your custom ROI analysis is attached, but here are the key numbers:

        💰 Annual Opportunity: $${leadData.additionalData.results?.annualValue?.toLocaleString()}
        📈 Website ROI: ${leadData.additionalData.results?.websiteROI?.toLocaleString()}%
        🎯 Monthly Jobs Available: ${leadData.additionalData.results?.onlineOpportunity}

        Translation: You're potentially missing $${Math.round(leadData.additionalData.results?.annualValue / 365)} per day without a professional website.

        Ready to capture this revenue? See what your professional website could look like:
        👉 https://onboard.com.au/onboard

        Cheers,
        Bobby
      `
    }
  }

  // In production, you'd send the actual email here
  return true
}

// Optional: GET endpoint to retrieve lead stats (for admin dashboard)
export async function GET(request: NextRequest) {
  // This would require authentication in production
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type')
  
  // Return mock stats for now
  return NextResponse.json({
    totalLeads: 247,
    thisWeek: 18,
    conversionRate: 3.2,
    byType: {
      'tradie-checklist': 156,
      'roi-calculator': 72,
      'free-audit': 19
    }
  })
}