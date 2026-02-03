import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      <main className="pt-24 pb-16">
        {children}
      </main>

      <Footer />
    </div>
  )
}
