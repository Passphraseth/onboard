import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-blue">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-black">
          Onboard 🛫
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="hover:underline">How It Works</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <Link href="#examples" className="hover:underline">Examples</Link>
          <Link href="/pricing" className="btn btn-lime">
            Get Started →
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24 text-center max-w-4xl mx-auto">
        <p className="text-base font-semibold mb-4 opacity-90">
          🇦🇺 Melbourne's fastest way to get your business online
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 tracking-tight">
          Websites that work.
          <br />
          <span className="text-brand-lime">No bullsh*t.</span> ✊
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          Professional site in 24 hours. Updates by text message. No tech skills needed. From $29/mo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="#preview-form" className="btn btn-lime text-lg px-8 py-4">
            See Your Free Preview 👀
          </Link>
          <Link href="#how-it-works" className="btn btn-outline border-white/30 text-lg px-8 py-4">
            How It Works
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-brand-lime">24hrs</div>
            <div className="text-sm opacity-80">to go live ⚡</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-brand-lime">$0</div>
            <div className="text-sm opacity-80">setup fees 💸</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-brand-lime">Text</div>
            <div className="text-sm opacity-80">for updates 💬</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-brand-black py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Here's how it works 👇</h2>
            <p className="text-lg opacity-80">No tech skills. No learning curve. We handle everything.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-3">1. Tell us your business</h3>
              <p className="opacity-70">Enter your business name. We pull your info from Google and build a preview in minutes.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="text-4xl mb-4">👀</div>
              <h3 className="text-xl font-bold mb-3">2. Check your preview</h3>
              <p className="opacity-70">See your professional site with real info. Request changes or approve it as-is.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-3">3. Text us updates</h3>
              <p className="opacity-70">"Change hours to 9-5" → Done. No dashboards, no logins. Just text like you'd text a mate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Text Updates Demo */}
      <section className="bg-brand-black py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                Updates by text 💬
                <br />Seriously.
              </h2>
              <p className="text-lg opacity-80 mb-4">
                No logging in. No "where's that setting?" No calling your nephew who's "good with computers."
              </p>
              <p className="text-lg opacity-80 mb-6">
                Just text us what you need. We sort it. Usually within hours.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-lg">✅ Change hours, prices, services</li>
                <li className="flex items-center gap-3 text-lg">✅ Add photos — just send them</li>
                <li className="flex items-center gap-3 text-lg">✅ We preview before publishing</li>
                <li className="flex items-center gap-3 text-lg">✅ Works via SMS or email</li>
              </ul>
            </div>

            {/* Phone Mockup */}
            <div className="bg-brand-black rounded-[2rem] p-3 max-w-[340px] mx-auto">
              <div className="bg-[#1a1a1a] rounded-[1.75rem] overflow-hidden">
                <div className="bg-brand-blue p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-lime rounded-full flex items-center justify-center text-lg">🛫</div>
                  <div>
                    <div className="font-bold">Onboard</div>
                    <div className="text-sm opacity-70">Online</div>
                  </div>
                </div>
                <div className="p-4 space-y-3 min-h-[280px]">
                  <div className="bg-brand-blue rounded-2xl rounded-br-sm p-3 ml-auto max-w-[85%] text-sm">
                    Hey can you change our hours to 8-6 weekdays and closed weekends?
                  </div>
                  <div className="bg-[#2a2a2a] rounded-2xl rounded-bl-sm p-3 max-w-[85%] text-sm">
                    Done! ✨ Here's a preview:
                    <br />onboard.site/preview/abc
                    <br /><br />Reply OK to publish.
                  </div>
                  <div className="bg-brand-blue rounded-2xl rounded-br-sm p-3 ml-auto max-w-[85%] text-sm">
                    OK 👍
                  </div>
                  <div className="bg-[#2a2a2a] rounded-2xl rounded-bl-sm p-3 max-w-[85%] text-sm">
                    Published! 🎉 Your site is updated. Anything else?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Gallery */}
      <section id="examples" className="bg-brand-lime py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-brand-black mb-4">Real results 🔥</h2>
            <p className="text-lg text-brand-black/80">Here's what we've built for Melbourne businesses just like yours.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Example 1 - Plumber */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg group hover:scale-[1.02] transition-transform">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 text-white p-6 min-h-[200px] flex flex-col justify-center text-center">
                <div className="text-4xl mb-3">🔧</div>
                <h3 className="text-xl font-bold mb-1">Smith's Plumbing</h3>
                <p className="text-sm opacity-80">24/7 Emergency Plumber • Brunswick</p>
                <div className="flex gap-2 justify-center mt-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Blocked Drains</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Hot Water</span>
                </div>
              </div>
              <div className="p-4 text-center text-brand-black">
                <div className="text-sm font-medium">Live in 18 hours</div>
                <div className="text-xs opacity-60">200% more enquiries in first week</div>
              </div>
            </div>

            {/* Example 2 - Hair Salon */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg group hover:scale-[1.02] transition-transform">
              <div className="bg-gradient-to-br from-pink-500 to-rose-400 text-white p-6 min-h-[200px] flex flex-col justify-center text-center">
                <div className="text-4xl mb-3">💇‍♀️</div>
                <h3 className="text-xl font-bold mb-1">Luxe Hair Studio</h3>
                <p className="text-sm opacity-80">Creative Colour & Styling • Richmond</p>
                <div className="flex gap-2 justify-center mt-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Balayage</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Extensions</span>
                </div>
              </div>
              <div className="p-4 text-center text-brand-black">
                <div className="text-sm font-medium">Booking widget added</div>
                <div className="text-xs opacity-60">"Finally stopped missing calls!" — Sarah</div>
              </div>
            </div>

            {/* Example 3 - Electrician */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg group hover:scale-[1.02] transition-transform">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-6 min-h-[200px] flex flex-col justify-center text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-xl font-bold mb-1">PowerUp Electrical</h3>
                <p className="text-sm opacity-80">Residential & Commercial • Footscray</p>
                <div className="flex gap-2 justify-center mt-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Rewiring</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Solar</span>
                </div>
              </div>
              <div className="p-4 text-center text-brand-black">
                <div className="text-sm font-medium">Updates by text</div>
                <div className="text-xs opacity-60">"Just texted to add solar. Done in 2 hours."</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="#preview-form" className="btn btn-black text-lg px-8 py-4">
              Get Your Free Preview →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA / Preview Form */}
      <section id="preview-form" className="bg-brand-pink py-16 md:py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Ready to see your site? 🚀</h2>
          <p className="text-lg opacity-90 mb-8">
            Answer a few quick questions and we'll build a personalized preview. Takes about 2 minutes.
          </p>

          <Link
            href="/onboard"
            className="btn btn-black text-lg px-8 py-4 inline-flex items-center gap-2"
          >
            Start Building Your Site →
          </Link>

          <p className="mt-4 text-sm opacity-70">
            No payment required. See your preview first.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-black py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-black mb-3">Onboard 🛫</div>
            <p className="opacity-60 text-sm">
              Get results, no bullsh*t. Websites for service businesses that actually work.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Product</h4>
            <div className="space-y-2 text-sm opacity-60">
              <Link href="#how-it-works" className="block hover:opacity-100">How It Works</Link>
              <Link href="/pricing" className="block hover:opacity-100">Pricing</Link>
              <Link href="#examples" className="block hover:opacity-100">Examples</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3">Support</h4>
            <div className="space-y-2 text-sm opacity-60">
              <Link href="/contact" className="block hover:opacity-100">Contact</Link>
              <Link href="/faq" className="block hover:opacity-100">FAQ</Link>
              <Link href="/terms" className="block hover:opacity-100">Terms</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3">Contact</h4>
            <div className="space-y-2 text-sm opacity-60">
              <a href="mailto:hello@onboard.com.au" className="block hover:opacity-100">hello@onboard.com.au</a>
              <span className="block">Melbourne, Australia 🇦🇺</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
