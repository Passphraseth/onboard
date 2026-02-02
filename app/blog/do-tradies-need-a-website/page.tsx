import { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema, FAQSchema } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Do Tradies Need a Website in 2026? (Yes — Here\'s Why) | Onboard',
  description: '87% of Australians search online before hiring a tradie. Learn why having a professional website is essential for tradies in 2026.',
  keywords: 'tradie website, do tradies need a website, tradesman website australia, tradie marketing',
  openGraph: {
    title: 'Do Tradies Need a Website in 2026?',
    description: '87% of Australians search online before hiring a tradie. Here\'s why you need a website.',
    url: 'https://onboard.com.au/blog/do-tradies-need-a-website',
    type: 'article',
  },
}

export default function DoTradiesNeedAWebsitePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://onboard.com.au' },
          { name: 'Blog', url: 'https://onboard.com.au/blog' },
          { name: 'Do Tradies Need a Website?', url: 'https://onboard.com.au/blog/do-tradies-need-a-website' },
        ]}
      />
      <FAQSchema
        faqs={[
          {
            question: 'Do tradies really need a website?',
            answer: 'Yes. 87% of Australians search online before hiring a tradie. Even referrals Google you before calling. A professional website builds trust and helps you win more jobs.',
          },
          {
            question: 'How much does a tradie website cost?',
            answer: 'Traditional agencies charge $3,000-$10,000. Modern website builders like Onboard offer professional tradie websites for $49/month with everything included.',
          },
          {
            question: 'How long does it take to get a tradie website?',
            answer: 'With Onboard, your website is ready to preview in under a minute. Traditional agencies can take weeks or months.',
          },
        ]}
      />

      <article className="max-w-3xl mx-auto px-6">
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
            <span>February 2026</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight">
            Do Tradies Need a Website in 2026? (Yes — Here's Why)
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed">
            "I get all my work through word of mouth." We hear this all the time. And it's true — referrals are gold for tradies. But here's the thing: even referrals Google you before they call.
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <h2>The Referral Reality Check</h2>
          <p>
            Your mate Dave tells his neighbour you're a great sparky. What's the first thing that neighbour does?
          </p>
          <p>
            <strong>They Google you.</strong>
          </p>
          <p>
            If they find nothing — or worse, find a competitor with a professional site — you've just lost a warm lead.
          </p>
          <p>
            <strong>87% of Australians search online before hiring a tradie.</strong> That's not a guess. That's the market.
          </p>

          <h2>"But I'm Already Busy"</h2>
          <p>
            Great. What about when you're not?
          </p>
          <p>
            The trades are cyclical. Interest rates go up, building slows down, work dries up. The tradies with a professional online presence keep getting leads. The ones relying purely on word of mouth scramble.
          </p>
          <p>
            A website is insurance for the slow times and fuel for the busy ones.
          </p>

          <h2>What a Tradie Website Actually Does</h2>
          
          <h3>1. Builds Trust Before You Answer the Phone</h3>
          <p>
            Photos of your work, a professional look, maybe a few reviews — all of this builds credibility. By the time they call, they're already half-sold.
          </p>

          <h3>2. Filters Tyre-Kickers</h3>
          <p>
            Your website can show your service areas, the types of jobs you take, rough pricing guidelines. Bad-fit enquiries filter themselves out.
          </p>

          <h3>3. Works While You Work</h3>
          <p>
            You're on a job site. Your website is answering questions, showing off your work, and capturing enquiries 24/7.
          </p>

          <h3>4. Helps You Charge What You're Worth</h3>
          <p>
            A professional online presence positions you as a professional business, not a bloke with a ute. That means you can charge accordingly.
          </p>

          <h2>"Websites Are Expensive and Take Forever"</h2>
          <p>
            That used to be true. Getting a website meant:
          </p>
          <ul>
            <li>$3,000-$10,000 to an agency</li>
            <li>Weeks of back-and-forth</li>
            <li>Learning to update it yourself (or paying someone every time)</li>
          </ul>
          <p>
            <strong>Not anymore.</strong>
          </p>
          <p>
            Modern tools like Onboard create professional tradie websites in minutes for $49/month. Your site is ready to preview immediately — no design meetings, no technical skills required.
          </p>

          <h2>What Your Tradie Website Needs</h2>
          <p>Keep it simple:</p>
          <ul>
            <li><strong>Your name/business name</strong> — obvious but essential</li>
            <li><strong>What you do</strong> — clear list of services</li>
            <li><strong>Where you work</strong> — suburbs or regions you cover</li>
            <li><strong>Photos of your work</strong> — real jobs, not stock images</li>
            <li><strong>How to contact you</strong> — phone, form, or both</li>
            <li><strong>Licence and insurance info</strong> — builds trust instantly</li>
          </ul>
          <p>
            That's it. You don't need a blog, a video, or 15 pages. You need something professional that answers the basic questions.
          </p>

          <h2>The Bottom Line</h2>
          <p>
            You don't need a website to be a good tradie. But you need one to be a <em>visible</em> tradie.
          </p>
          <p>
            The best tradies are often booked out — not because they're on Instagram doing content marketing, but because they show up when someone searches and they look professional when they do.
          </p>
          <p>
            A simple, professional website puts you in the game. Without one, you're leaving money on the table.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-neutral-900 rounded-lg border border-neutral-800 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Get Online?</h3>
          <p className="text-neutral-400 mb-6">
            See your professional tradie website in under a minute.
          </p>
          <Link href="/websites-for-tradies" className="btn btn-primary">
            Create my tradie website
          </Link>
        </div>
      </article>
    </>
  )
}
