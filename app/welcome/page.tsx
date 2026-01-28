'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function WelcomePage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Could verify session here if needed
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🛫</div>
          <div className="text-xl font-bold">Setting up your account...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-8xl mb-6">🎉</div>
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Welcome to Onboard!
        </h1>
        <p className="text-xl opacity-80 mb-8">
          You're all set. Here's what happens next:
        </p>

        <div className="bg-white/5 rounded-2xl p-8 text-left mb-8 border border-white/10">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-lime text-brand-black rounded-full flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg">We build your site ⚡</h3>
                <p className="opacity-70">
                  Our team will create your website within the next 24 hours using your business info.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-lime text-brand-black rounded-full flex items-center justify-center font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg">You'll get a text 💬</h3>
                <p className="opacity-70">
                  We'll text you when your site is ready with a link to preview it.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-lime text-brand-black rounded-full flex items-center justify-center font-bold shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg">Request any changes ✏️</h3>
                <p className="opacity-70">
                  Just text us any tweaks you want. We'll handle it and send you a preview before publishing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-blue/20 rounded-xl p-6 mb-8 border border-brand-blue/30">
          <h3 className="font-bold mb-2">📱 Save this number for updates:</h3>
          <div className="text-2xl font-black text-brand-lime">0400 XXX XXX</div>
          <p className="text-sm opacity-70 mt-2">
            Text us anytime to update your site. "Change hours to 9-5" → Done.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="btn btn-lime">
            Go to Dashboard 📊
          </Link>
          <Link href="/" className="btn btn-outline border-white/30">
            Back to Home
          </Link>
        </div>

        <p className="mt-8 text-sm opacity-50">
          Check your email for a receipt and login link. Questions? Email hello@onboard.com.au
        </p>
      </div>
    </div>
  )
}
