'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/components/GoogleAnalytics'

export function MarketPageView({ market }: { market: string }) {
  useEffect(() => {
    trackEvent('market_page_view', { market })
  }, [market])
  return null
}

export function TrackedOutboundLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('outbound_company_link', { destination: href })}
      className="font-medium text-[#f2f0e9] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#c98c45]"
    >
      {children}
    </a>
  )
}
