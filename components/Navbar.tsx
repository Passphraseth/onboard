'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MARKET_LINKS } from '@/lib/acquisition-content'
import { trackEvent } from './GoogleAnalytics'

const SECONDARY_MARKETS = [
  { name: 'Melbourne market', href: '/melbourne-onboarding-software' },
  { name: 'Sydney market', href: '/sydney-customer-onboarding' },
]

const AML_LINKS = [
  { name: 'AML/CTF resource hub', href: '/aml-ctf' },
  { name: 'AML/CTF onboarding', href: '/aml-ctf-onboarding-software-australia' },
  { name: 'Tranche 2', href: '/tranche-2-client-onboarding' },
  { name: 'Accountants', href: '/aml-ctf-accountants' },
  { name: 'Law firms', href: '/aml-ctf-law-firms' },
  { name: 'Real estate', href: '/aml-ctf-real-estate' },
  { name: 'KYC vs KYB', href: '/kyc-vs-kyb' },
  { name: 'Customer due diligence', href: '/customer-due-diligence-cdd' },
  { name: 'AML/CTF software market', href: '/australian-aml-ctf-software-market' },
]

export default function Navbar() {
  const [marketsOpen, setMarketsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  function closeMobile() {
    setMobileOpen(false)
    setMarketsOpen(false)
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#151714]/92 text-[#f2f0e9] backdrop-blur-md" aria-label="Primary navigation">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="text-lg font-semibold tracking-[-0.04em]" aria-label="Onboard Australia home">
          onboard<span className="text-[#c98c45]">.</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <Link href="/#portfolio" className="text-sm text-white/55 transition-colors hover:text-white">Portfolio</Link>
          <div className="relative" onMouseEnter={() => setMarketsOpen(true)} onMouseLeave={() => setMarketsOpen(false)}>
            <button
              type="button"
              onClick={() => setMarketsOpen((open) => !open)}
              className="flex items-center gap-2 py-3 text-sm text-white/55 transition-colors hover:text-white"
              aria-expanded={marketsOpen}
            >
              Markets <span aria-hidden="true" className={`text-xs transition-transform ${marketsOpen ? 'rotate-180' : ''}`}>⌄</span>
            </button>
            {marketsOpen && (
              <div className="absolute left-0 top-full grid w-[42rem] grid-cols-2 border border-white/10 bg-[#1c1e1a] p-3 shadow-2xl">
                <div className="p-2">
                  <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c98c45]">Onboarding markets</p>
                  {[...MARKET_LINKS, ...SECONDARY_MARKETS].map((item) => <Link key={item.href} href={item.href} className="block px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white">{item.name}</Link>)}
                </div>
                <div className="border-l border-white/10 p-2">
                  <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c98c45]">AML/CTF resources</p>
                  {AML_LINKS.map((item) => <Link key={item.href} href={item.href} className="block px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white">{item.name}</Link>)}
                </div>
              </div>
            )}
          </div>
          <Link href="/australian-onboarding-software-market" className="text-sm text-white/55 transition-colors hover:text-white">Australian Market</Link>
          <Link href="/acquisition-process" className="text-sm text-white/55 transition-colors hover:text-white">Process</Link>
          <Link
            href="/acquire"
            onClick={() => trackEvent('acquire_now_click', { source: 'navigation' })}
            className="inline-flex min-h-11 items-center bg-[#f2f0e9] px-5 text-sm font-medium text-[#151714] transition-colors hover:bg-[#c98c45]"
          >
            Acquire
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center border border-white/15 text-white md:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
        >
          <span aria-hidden="true">{mobileOpen ? '×' : '☰'}</span>
        </button>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 bg-[#151714] px-6 py-6 md:hidden">
          <div className="mx-auto max-w-7xl space-y-1">
            <Link href="/#portfolio" onClick={closeMobile} className="block border-b border-white/10 py-3 text-sm">Portfolio</Link>
            <p className="pt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#c98c45]">Markets</p>
            <div className="grid grid-cols-2 gap-x-5 py-3">
              {[...MARKET_LINKS, ...SECONDARY_MARKETS].map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMobile} className="py-2 text-sm text-white/60">{item.name}</Link>
              ))}
            </div>
            <p className="border-t border-white/10 pt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#c98c45]">AML/CTF resources</p>
            <div className="grid grid-cols-2 gap-x-5 py-3">
              {AML_LINKS.map((item) => <Link key={item.href} href={item.href} onClick={closeMobile} className="py-2 text-sm text-white/60">{item.name}</Link>)}
            </div>
            <Link href="/australian-onboarding-software-market" onClick={closeMobile} className="block border-t border-white/10 py-3 text-sm">Australian Market</Link>
            <Link href="/acquisition-process" onClick={closeMobile} className="block border-t border-white/10 py-3 text-sm">Acquisition Process</Link>
            <Link href="/acquire" onClick={() => { trackEvent('acquire_now_click', { source: 'mobile_navigation' }); closeMobile() }} className="mt-5 flex min-h-12 items-center justify-between bg-[#f2f0e9] px-5 text-sm font-medium text-[#151714]">
              Acquire Now <span aria-hidden="true">↘</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
