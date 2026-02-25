'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface SubscriptionData {
  businessName: string
  slug: string
  plan: string
  email: string
}

function WelcomeContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<SubscriptionData | null>(null)

  useEffect(() => {
    async function verifySession() {
      if (!sessionId) {
        setError('No session ID provided')
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/subscription/verify?session_id=${sessionId}`)
        if (res.ok) {
          const result = await res.json()
          setData(result)
        } else {
          setError('Could not verify subscription')
        }
      } catch (err) {
        console.error('Verify error:', err)
        setError('Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    verifySession()
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-neutral-400">Setting up your account...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-neutral-400 mb-6">{error}</p>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const planNames: Record<string, string> = {
    starter: 'Starter',
    growth: 'Growth',
    pro: 'Pro'
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 bg-brand-lime rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight mb-3">
          You're all set, {data?.businessName || 'friend'}! 🎉
        </h1>
        <p className="text-neutral-400 mb-8">
          Your {planNames[data?.plan || 'starter'] || 'Starter'} subscription is now active.
        </p>

        {/* Site Preview Card */}
        {data?.slug && (
          <div className="card p-6 mb-8 text-left">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-neutral-400 mb-1">Your website</div>
                <div className="font-medium">{data.slug}.onboard.site</div>
              </div>
              <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                Live
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/site/${data.slug}`}
                target="_blank"
                className="btn btn-lime flex-1 justify-center text-sm"
              >
                View Site →
              </Link>
              <Link
                href="/dashboard"
                className="btn btn-secondary flex-1 justify-center text-sm"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}

        {/* What's Next */}
        <div className="card p-8 text-left mb-8">
          <h2 className="font-medium mb-6">What's next</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-brand-lime text-black rounded-full flex items-center justify-center font-medium shrink-0 text-sm">
                ✓
              </div>
              <div>
                <h3 className="font-medium mb-1">Your site is live</h3>
                <p className="text-neutral-400 text-sm">
                  Share your link with customers right away.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white/10 text-white rounded-full flex items-center justify-center font-medium shrink-0 text-sm">
                2
              </div>
              <div>
                <h3 className="font-medium mb-1">Request updates anytime</h3>
                <p className="text-neutral-400 text-sm">
                  Text or email us changes you want. We'll handle it within 24 hours.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white/10 text-white rounded-full flex items-center justify-center font-medium shrink-0 text-sm">
                3
              </div>
              <div>
                <h3 className="font-medium mb-1">Connect your domain</h3>
                <p className="text-neutral-400 text-sm">
                  Already have a domain? We'll help you connect it for free.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-neutral-900 rounded-lg p-6 mb-8 border border-neutral-800">
          <h3 className="font-medium mb-3">Need changes? Reach out anytime</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="mailto:hello@onboard.com.au" className="text-brand-lime hover:underline">
              hello@onboard.com.au
            </a>
            <span className="hidden sm:block text-neutral-600">•</span>
            <a href="sms:+61400000000" className="text-brand-lime hover:underline">
              0400 000 000
            </a>
          </div>
        </div>

        <p className="text-sm text-neutral-500">
          Check your email ({data?.email}) for a receipt and getting started guide.
        </p>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <div className="text-neutral-400">Loading...</div>
      </div>
    </div>
  )
}

export default function WelcomePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <WelcomeContent />
    </Suspense>
  )
}
