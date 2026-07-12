import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AcquisitionForm from '@/components/AcquisitionForm'
import AcquisitionSchemas from '@/components/acquisition/AcquisitionSchemas'

const title = 'Acquire the Onboard Australian Domain Portfolio'
const description = 'Request fixed-price acquisition documents or submit a confidential offer for onboard.com.au, onboard.au and onboard.net.au.'

export const metadata: Metadata = {
  title: `${title} | Onboard Australia`,
  description,
  alternates: { canonical: 'https://onboard.com.au/acquire' },
  openGraph: { title, description, url: 'https://onboard.com.au/acquire', type: 'website', locale: 'en_AU' },
  twitter: { card: 'summary', title, description },
}

export default function AcquirePage() {
  return (
    <div className="min-h-screen bg-[#151714] text-[#f2f0e9]">
      <AcquisitionSchemas title={title} description={description} path="/acquire" breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Acquire', path: '/acquire' }]} />
      <Navbar />
      <main className="px-6 pb-24 pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-10 text-xs text-white/60" aria-label="Breadcrumb"><Link href="/" className="hover:text-white">Home</Link><span className="mx-3">/</span><span>Acquire</span></nav>
          <div className="grid gap-16 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Confidential acquisition</p>
              <h1 className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.055em] md:text-7xl">Acquire now.<br />Or submit<br />an offer.</h1>
              <p className="mt-8 max-w-md leading-7 text-white/65">The complete portfolio is offered at A$29,500 plus GST if applicable. Qualified alternative offers are also considered privately.</p>
              <div className="mt-9 border-y border-white/15 py-6 text-sm leading-7 text-white/55">
                <p>onboard.com.au</p><p>onboard.au</p><p>onboard.net.au</p>
              </div>
              <p className="mt-6 text-xs leading-5 text-white/55">Secure settlement by agreement, tax invoice and cleared electronic funds transfer. No card payment is taken.</p>
            </div>
            <AcquisitionForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
