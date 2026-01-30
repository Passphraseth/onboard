'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function WelcomeContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
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

  return (
    <div className="min-h-screen">
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight mb-3">
          Welcome to Onboard
        </h1>
        <p className="text-neutral-400 mb-12">
          You're all set. Here's what happens next.
        </p>

        <div className="card p-8 text-left mb-8">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-medium shrink-0 text-sm">
                1
              </div>
              <div>
                <h3 className="font-medium mb-1">We build your site</h3>
                <p className="text-neutral-400 text-sm">
                  Your website will be ready within 24 hours.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-medium shrink-0 text-sm">
                2
              </div>
              <div>
                <h3 className="font-medium mb-1">You'll get a notification</h3>
                <p className="text-neutral-400 text-sm">
                  We'll text you when your site is ready to preview.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-medium shrink-0 text-sm">
                3
              </div>
              <div>
                <h3 className="font-medium mb-1">Request changes</h3>
                <p className="text-neutral-400 text-sm">
                  Text us any tweaks. We'll handle it and send you a preview.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-lg p-6 mb-8 border border-neutral-800">
          <h3 className="font-medium mb-2">Save this number for updates</h3>
          <div className="text-2xl font-semibold mb-2">0400 XXX XXX</div>
          <p className="text-sm text-neutral-400">
            Text us anytime to update your site.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
          <Link href="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>

        <p className="mt-8 text-sm text-neutral-500">
          Check your email for a receipt. Questions? hello@onboard.com.au
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
