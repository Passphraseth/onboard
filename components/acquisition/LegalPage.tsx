import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AcquisitionSchemas from './AcquisitionSchemas'

export default function LegalPage({ title, description, path, children }: { title: string; description: string; path: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#151714] text-[#f2f0e9]">
      <AcquisitionSchemas title={title} description={description} path={path} breadcrumbs={[{ name: 'Home', path: '/' }, { name: title, path }]} />
      <Navbar />
      <main className="px-6 pb-24 pt-36 lg:px-10">
        <article className="mx-auto max-w-4xl">
          <nav className="mb-10 text-xs text-white/60"><Link href="/" className="hover:text-white">Home</Link><span className="mx-3">/</span><span>{title}</span></nav>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c98c45]">Information · Updated July 2026</p>
          <h1 className="mt-6 text-5xl font-medium tracking-[-0.055em] md:text-7xl">{title}</h1>
          <div className="mt-14 space-y-10 text-base leading-8 text-white/55 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-white [&_h2]:tracking-[-0.035em] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">{children}</div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
