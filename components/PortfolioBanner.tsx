'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const RETAINED_CONTENT_PREFIXES = [
  '/blog',
  '/websites-for-',
  '/melbourne-website-design',
  '/sydney-website-design',
  '/brisbane-website-design',
  '/tradie-checklist',
  '/roi-calculator',
  '/free-audit',
]

export default function PortfolioBanner() {
  const pathname = usePathname()

  if (!RETAINED_CONTENT_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null
  }

  return (
    <aside className="fixed bottom-3 left-3 right-3 z-[70] mx-auto max-w-3xl border border-white/15 bg-[#171914]/95 px-4 py-3 text-white shadow-2xl backdrop-blur-md sm:bottom-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-5" aria-label="Domain acquisition notice">
      <p className="text-sm text-white/75">The Onboard Australian domain portfolio is available for acquisition.</p>
      <Link href="/acquire" className="mt-2 inline-flex shrink-0 items-center gap-2 text-sm font-medium text-white sm:mt-0">
        Confidential enquiry <span aria-hidden="true">↗</span>
      </Link>
    </aside>
  )
}
