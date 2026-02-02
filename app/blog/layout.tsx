import Link from 'next/link'
import Footer from '@/components/Footer'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            onboard
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/blog" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/pricing" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/onboard" className="btn btn-primary text-sm">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        {children}
      </main>

      <Footer />
    </div>
  )
}
