import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

// This would integrate with your existing database/CRM system
// For now, we'll simulate the API response

interface ROIResults {
  annualValue: number
  websiteROI: number
  onlineOpportunity: number
  currentJobs: number
}

interface LeadMagnetData {
  type: 'tradie-checklist' | 'roi-calculator' | 'free-audit'
  name: string
  email: string
  businessType: string
  source: string
  currentWebsite?: string
  results?: ROIResults
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
    const headersList = await headers()
    const forwardedFor = headersList.get('x-forwarded-for')
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

function generateROIRecommendations(data: { monthlyRevenue?: number; averageJobValue?: number; results?: ROIResults }) {
  const { monthlyRevenue, averageJobValue, results } = data

  const recommendations: { priority: string; action: string; reason: string }[] = []

  if (results && results.annualValue > 50000) {
    recommendations.push({
      priority: 'high',
      action: 'Get professional website immediately',
      reason: `With ${results.annualValue.toLocaleString()} in annual opportunity, delaying costs you $${Math.round(results.annualValue / 365)} per day`
    })
  }

  if (averageJobValue && averageJobValue > 1000) {
    recommendations.push({
      priority: 'high',
      action: 'Focus on premium positioning',
      reason: 'High-value customers expect professional online presence'
    })
  }

  if (monthlyRevenue && monthlyRevenue > 20000) {
    recommendations.push({
      priority: 'medium',
      action: 'Consider Google Ads investment',
      reason: 'Your business size can support paid acquisition'
    })
  }

  return recommendations
}

interface LeadDataForEmail {
  email: string
  name: string
  type: string
}

async function sendWelcomeEmail(leadData: LeadDataForEmail) {
  // This would integrate with your email service (SendGrid, Mailgun, etc.)
  // For now, just log
  console.log('Would send welcome email to:', leadData.email, 'type:', leadData.type)
  // In production, you'd send the actual email here
  return true
}

// Optional: GET endpoint to retrieve lead stats (for admin dashboard)
export async function GET(request: NextRequest) {
  // This would require authentication in production
  const searchParams = request.nextUrl.searchParams
  const filterType = searchParams.get('type')

  // Return mock stats for now
  const stats = {
    totalLeads: 247,
    thisWeek: 18,
    conversionRate: 3.2,
    byType: {
      'tradie-checklist': 156,
      'roi-calculator': 72,
      'free-audit': 19
    }
  }

  if (filterType && filterType in stats.byType) {
    return NextResponse.json({
      type: filterType,
      count: stats.byType[filterType as keyof typeof stats.byType]
    })
  }

  return NextResponse.json(stats)
}