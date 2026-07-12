'use client'

import Link from 'next/link'
import { trackEvent } from '@/components/GoogleAnalytics'

interface AcquisitionCTAProps {
  compact?: boolean
  source: string
  cluster?: 'aml_ctf'
  ctaLocation?: string
}

export default function AcquisitionCTA({ compact = false, source, cluster, ctaLocation }: AcquisitionCTAProps) {
  const query = cluster ? `?source_page=${encodeURIComponent(source)}&source_cluster=${cluster}` : ''
  function trackCta(intent: 'acquire' | 'offer') {
    if (cluster === 'aml_ctf') {
      trackEvent('aml_acquisition_cta_click', { page_slug: source, cta_location: ctaLocation || 'inline', intent })
    }
    trackEvent(intent === 'acquire' ? 'acquire_now_click' : 'submit_offer_click', { source, ...(cluster ? { source_cluster: cluster } : {}) })
  }
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${compact ? '' : 'mt-8'}`}>
      <Link
        href={`/acquire${query}#acquire-now`}
        onClick={() => trackCta('acquire')}
        className="inline-flex min-h-14 flex-1 items-center justify-between bg-[#f2f0e9] px-6 text-sm font-medium text-[#151714] transition-colors hover:bg-[#c98c45]"
      >
        Acquire Now — A$49,500 <span aria-hidden="true">↘</span>
      </Link>
      <Link
        href={`/acquire${query}#make-offer`}
        onClick={() => trackCta('offer')}
        className="inline-flex min-h-14 flex-1 items-center justify-between border border-white/20 px-6 text-sm font-medium text-[#f2f0e9] transition-colors hover:border-white/60"
      >
        Submit an Offer <span aria-hidden="true">↘</span>
      </Link>
    </div>
  )
}
