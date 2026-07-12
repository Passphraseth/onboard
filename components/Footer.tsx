import Link from 'next/link'
import { MARKET_LINKS } from '@/lib/acquisition-content'

const LEGAL_LINKS = [
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'Disclaimer', href: '/disclaimer' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#10120f] text-[#f2f0e9]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-[-0.04em]">onboard<span className="text-[#c98c45]">.</span></Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">A premium Australian domain portfolio available for acquisition.</p>
            <p className="mt-6 text-sm text-white/70">onboard.com.au<br />onboard.au<br />onboard.net.au</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c98c45]">Markets</h2>
            <ul className="mt-5 space-y-2.5">
              {MARKET_LINKS.map((item) => <li key={item.href}><Link href={item.href} className="text-sm text-white/65 hover:text-white">{item.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c98c45]">Acquisition</h2>
            <ul className="mt-5 space-y-2.5">
              <li><Link href="/acquire" className="text-sm text-white/65 hover:text-white">Acquire or submit an offer</Link></li>
              <li><Link href="/acquisition-process" className="text-sm text-white/65 hover:text-white">Acquisition process</Link></li>
              <li><Link href="/australian-onboarding-software-market" className="text-sm text-white/65 hover:text-white">Australian market overview</Link></li>
              <li><Link href="/blog" className="text-sm text-white/65 hover:text-white">Retained articles</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c98c45]">Information</h2>
            <ul className="mt-5 space-y-2.5">
              {LEGAL_LINKS.map((item) => <li key={item.href}><Link href={item.href} className="text-sm text-white/65 hover:text-white">{item.name}</Link></li>)}
            </ul>
            <p className="mt-6 text-xs leading-5 text-white/55">Seller legal entity and ABN will be confirmed in the acquisition documents.</p>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Onboard Australia</p>
          <p>Domain names and related digital assets. No software product is represented.</p>
        </div>
      </div>
    </footer>
  )
}
