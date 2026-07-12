'use client'

import Link from 'next/link'
import { trackEvent } from '@/components/GoogleAnalytics'

interface AcquisitionCTAProps {
  compact?: boolean
  source: string
}

export default function AcquisitionCTA({ compact = false, source }: AcquisitionCTAProps) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${compact ? '' : 'mt-8'}`}>
      <Link
        href="/acquire#acquire-now"
        onClick={() => trackEvent('acquire_now_click', { source })}
        className="inline-flex min-h-14 flex-1 items-center justify-between bg-[#f2f0e9] px-6 text-sm font-medium text-[#151714] transition-colors hover:bg-[#c98c45]"
      >
        Acquire Now — A$29,500 <span aria-hidden="true">↘</span>
      </Link>
      <Link
        href="/acquire#make-offer"
        onClick={() => trackEvent('submit_offer_click', { source })}
        className="inline-flex min-h-14 flex-1 items-center justify-between border border-white/20 px-6 text-sm font-medium text-[#f2f0e9] transition-colors hover:border-white/60"
      >
        Submit an Offer <span aria-hidden="true">↘</span>
      </Link>
    </div>
  )
}
