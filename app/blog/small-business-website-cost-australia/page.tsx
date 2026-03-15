import { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema, FAQSchema } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Small Business Website Cost Australia: The Honest 2026 Breakdown | Onboard',
  description: 'How much does a small business website cost in Australia? From $0 to $15,000+. We break down every option, hidden costs, and what you actually need in 2026.',
  keywords: 'small business website cost australia, website design cost australia, how much does a website cost australia, website cost australia, affordable website australia, business website packages australia, cheap website design',
  openGraph: {
    title: 'Small Business Website Cost Australia: The Honest 2026 Breakdown',
    description: 'How much does a small business website cost in Australia? From $0 to $15,000+. Full breakdown of every option and hidden costs.',
    url: 'https://onboard.com.au/blog/small-business-website-cost-australia',
    type: 'article',
  },
}

export default function SmallBusinessWebsiteCostAustraliaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://onboard.com.au' },
          { name: 'Blog', url: 'https://onboard.com.au/blog' },
          { name: 'Small Business Website Cost Australia', url: 'https://onboard.com.au/blog/small-business-website-cost-australia' },
        ]}
      />
      <FAQSchema
        faqs={[
          {
            question: 'How much does a basic website cost in Australia?',
            answer: 'A basic small business website in Australia costs between $0 and $15,000+ depending on how you build it. DIY builders cost $20-$50/month, freelancers charge $1,000-$5,000, and agencies charge $5,000-$15,000+. Done-for-you services like Onboard cost $495 setup + $79/month with everything included.',
          },
          {
            question: "What's the cheapest way to get a professional business website?",
            answer: 'The cheapest professional option is a done-for-you service like Onboard at $495 + $79/month. DIY builders are cheaper upfront ($20-$50/month) but factor in the 40-80 hours of your time to build it, plus the ongoing maintenance.',
          },
          {
            question: 'Do I need to pay for hosting separately?',
            answer: 'It depends on how you build your site. With DIY builders (Squarespace, Wix) and done-for-you services (Onboard), hosting is included. With a freelancer or agency build, you\'ll usually need to arrange and pay for hosting separately — budget $10-$100/month.',
          },
          {
            question: 'How much should I budget for website maintenance?',
            answer: 'If you\'re managing it yourself, budget 2-5 hours per month. If paying someone, expect $100-$500/month for a maintenance package. With Onboard, maintenance and updates are included in the $79/month fee.',
          },
          {
            question: 'Is a $500 website good enough for a small business?',
            answer: 'Yes. A $500 website from a quality done-for-you service can be just as effective as a $10,000 agency website for most small businesses. What matters is clean design, mobile responsiveness, fast loading, proper SEO, and clear calls to action.',
          },
          {
            question: 'How long does it take to build a small business website?',
            answer: 'DIY: 2-8 weeks. Freelancer: 2-6 weeks. Agency: 4-12 weeks. Onboard: 7 days. Every week without a website is a week of missed enquiries.',
          },
        ]}
      />

      <article className="max-w-3xl mx-auto px-6">
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
            <span>March 2026</span>
            <span>•</span>
            <span>11 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight">
            Small Business Website Cost Australia: The Honest 2026 Breakdown
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed">
            You&apos;ve googled &ldquo;small business website cost australia&rdquo; because you need a straight answer. Not a &ldquo;it depends&rdquo; followed by a sales pitch. Here&apos;s the full picture.
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">

          {/* TLDR */}
          <div className="not-prose bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-10">
            <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wide mb-3">TL;DR</p>
            <ul className="text-neutral-300 space-y-2 text-base">
              <li>• A small business website costs $0 to $15,000+ depending on the route you take.</li>
              <li>• DIY builders cost $20-$50/mo but eat 40-80 hours of your time.</li>
              <li>• Agencies charge $5,000-$15,000+ — most of that goes to overheads.</li>
              <li>• <Link href="/onboard" className="text-white underline hover:text-neutral-300">Onboard</Link> costs $495 setup + $79/mo with everything included. 7-day turnaround.</li>
              <li>• The real cost is what you pay over 3 years when you add hosting, maintenance, security, and updates.</li>
            </ul>
          </div>

          <p>
            Here&apos;s the problem: most articles about website costs in Australia are written by agencies trying to justify their $10K quotes. Or by website builders trying to make $29/month sound like nothing. Neither is giving you the full picture.
          </p>
          <p>
            This guide breaks down what every option actually costs, what&apos;s included (and what isn&apos;t), and what a small business in Australia genuinely needs in 2026. No fluff. No hidden agendas. Just the numbers.
          </p>

          <h2>The Honest Answer (It Depends — But Here&apos;s the Full Picture)</h2>
          <p>
            Yes, the cost of a small business website in Australia depends on what you need. But that answer on its own is useless. So here&apos;s the honest breakdown.
          </p>
          <p>If you want a professional website that actually brings in customers, you&apos;re looking at one of five options:</p>
          <ol>
            <li><strong>Free website builders</strong> — $0 upfront, but you get what you pay for</li>
            <li><strong>DIY paid builders</strong> — $20-$50/month plus your time</li>
            <li><strong>Freelancer</strong> — $1,000-$5,000 one-off</li>
            <li><strong>Agency</strong> — $5,000-$15,000+ one-off</li>
            <li><strong>Done-for-you service</strong> — $495 + $79/month (like <Link href="/onboard">Onboard</Link>)</li>
          </ol>
          <p>
            The right option depends on your budget, how much time you have, and whether you want to maintain the thing yourself or hand it off.
          </p>

          <h2>Website Cost Breakdown: 5 Options Compared</h2>

          <h3>1. Free Website Builders ($0)</h3>
          <p><strong>Examples:</strong> Google Sites, WordPress.com (free tier), Carrd</p>
          <p>
            A basic website with limited templates, their branding on your site, no custom domain, limited SEO, and no business email. Fine for a personal hobby blog. For a business trying to win customers? A dodgy-looking website is worse than no website at all. Customers judge your business by your online presence before they ever call you.
          </p>

          <h3>2. DIY Paid Builders ($20-$50/month)</h3>
          <p><strong>Examples:</strong> Squarespace ($27-$49/mo), Wix ($17-$45/mo), Shopify ($39-$399/mo)</p>
          <p>
            Professional templates, custom domain, basic SEO tools, and hosting included. But nobody builds it for you. You&apos;ll spend 40-80 hours setting up, writing content, choosing images, and figuring out SEO.
          </p>
          <p>
            If your time is worth $50/hour, that&apos;s $2,000-$4,000 in time alone. Plus the ongoing 2-5 hours per month maintaining it. Most small business owners start with a DIY builder, get it 60% done, and then it sits there half-finished for months.
          </p>

          <h3>3. Freelance Web Designer ($1,000-$5,000)</h3>
          <p>
            Custom design, professional build, usually 3-5 pages, basic SEO setup, 2-6 week turnaround. But ongoing maintenance is usually extra. Content updates are extra. Hosting is often your problem.
          </p>
          <p>
            Freelancers typically charge $50-$150/hour for changes after launch. Need to update your services page? That&apos;s $100. Need an urgent fix on a Saturday? Good luck getting a response. The good freelancers are booked out for months. The cheap ones often deliver cheap work.
          </p>

          <h3>4. Web Design Agency ($5,000-$15,000+)</h3>
          <p>
            Professional design and development, brand strategy, multiple revision rounds. But hosting ($30-$100/month), maintenance ($100-$500/month), content updates ($100-$200/hour), and SEO ($500-$2,000/month) are all extra.
          </p>
          <p>
            A <Link href="/pricing">website that costs $10,000 to build</Link> can easily hit $15,000-$25,000 over three years once you add everything. Most of what you&apos;re paying for is their overheads — office rent, account managers, multiple rounds of meetings, fancy proposals.
          </p>

          <h3>5. Done-For-You Service ($495 + $79/month)</h3>
          <p>
            <strong>Example:</strong> <Link href="/onboard">Onboard</Link>
          </p>
          <p>
            Professionally designed website, custom to your business and brand. Hosting, SSL, SEO optimisation, ongoing updates and maintenance — all included. Mobile-responsive design. 7-day turnaround. Unlimited content changes.
          </p>
          <p>
            $495 upfront + $79/month. That&apos;s it. No hidden fees. No extra charges for updates. No surprise hosting bills. <Link href="/pricing">The pricing is transparent</Link>.
          </p>

          {/* Comparison Table */}
          <div className="not-prose overflow-x-auto my-10">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="py-3 pr-4 text-neutral-300 font-semibold">Option</th>
                  <th className="py-3 pr-4 text-neutral-300 font-semibold">Upfront</th>
                  <th className="py-3 pr-4 text-neutral-300 font-semibold">Monthly</th>
                  <th className="py-3 pr-4 text-neutral-300 font-semibold">Build Time</th>
                  <th className="py-3 pr-4 text-neutral-300 font-semibold">Updates</th>
                  <th className="py-3 text-neutral-300 font-semibold">SEO</th>
                </tr>
              </thead>
              <tbody className="text-neutral-400">
                <tr className="border-b border-neutral-800">
                  <td className="py-3 pr-4">Free Builder</td>
                  <td className="py-3 pr-4">$0</td>
                  <td className="py-3 pr-4">$0</td>
                  <td className="py-3 pr-4">20-40 hrs</td>
                  <td className="py-3 pr-4">You do it</td>
                  <td className="py-3">No</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-3 pr-4">DIY Builder</td>
                  <td className="py-3 pr-4">$0-$50</td>
                  <td className="py-3 pr-4">$20-$50</td>
                  <td className="py-3 pr-4">40-80 hrs</td>
                  <td className="py-3 pr-4">You do it</td>
                  <td className="py-3">Basic tools</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-3 pr-4">Freelancer</td>
                  <td className="py-3 pr-4">$1K-$5K</td>
                  <td className="py-3 pr-4">$0-$100</td>
                  <td className="py-3 pr-4">2-6 weeks</td>
                  <td className="py-3 pr-4">Extra cost</td>
                  <td className="py-3">Basic</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-3 pr-4">Agency</td>
                  <td className="py-3 pr-4">$5K-$15K+</td>
                  <td className="py-3 pr-4">$100-$500</td>
                  <td className="py-3 pr-4">4-12 weeks</td>
                  <td className="py-3 pr-4">Extra cost</td>
                  <td className="py-3">Extra cost</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-3 pr-4 text-white font-medium">Onboard</td>
                  <td className="py-3 pr-4 text-white font-medium">$495</td>
                  <td className="py-3 pr-4 text-white font-medium">$79</td>
                  <td className="py-3 pr-4 text-white font-medium">7 days</td>
                  <td className="py-3 pr-4 text-white font-medium">Included</td>
                  <td className="py-3 text-white font-medium">Included</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Hidden Costs Most People Forget</h2>
          <p>The website build is just one part of the equation. These are the costs that catch Australian small businesses off guard:</p>

          <h3>Domain Name ($15-$50/year)</h3>
          <p>
            Your .com.au domain needs to be renewed every year. Most builders include the first year free, then charge you. With Onboard, domain management is included.
          </p>

          <h3>Hosting ($10-$100/month)</h3>
          <p>
            Freelancer or agency build? You usually need to sort out your own hosting. Cheap shared hosting ($10-$20/month) is slow and unreliable. Good hosting ($30-$100/month) adds up fast. With DIY builders and Onboard, hosting is included.
          </p>

          <h3>SSL Certificate ($0-$200/year)</h3>
          <p>
            The padlock icon that tells customers your site is secure. Google penalises sites without it. Some hosts include it free, others charge. Included with Onboard.
          </p>

          <h3>Professional Email ($7-$25/user/month)</h3>
          <p>
            You need a business email (you@yourbusiness.com.au), not a Gmail address. Google Workspace costs $10.80/user/month. Microsoft 365 costs $9/user/month.
          </p>

          <h3>Content Updates ($0-$200/hour)</h3>
          <p>
            Your website isn&apos;t set-and-forget. Prices change, services get added, team members come and go. Paying someone by the hour for updates adds up. Onboard includes unlimited content changes in your monthly fee.
          </p>

          <h3>Security and Maintenance ($0-$500/month)</h3>
          <p>
            Software updates, security patches, backups, and monitoring. Ignore this and you&apos;ll eventually get hacked or your site will break. Agencies charge $100-$500/month for maintenance packages.
          </p>

          <h3>SEO ($0-$2,000/month)</h3>
          <p>
            Building a website without SEO is like printing business cards and leaving them in a drawer. If you want your site to show up on Google, you need ongoing optimisation. Agencies charge $500-$2,000/month for this.
          </p>

          <h2>Total Cost of Ownership Over 3 Years</h2>
          <p>This is where the real picture becomes clear. It&apos;s not about what the website costs to build. It&apos;s about what it costs to run.</p>

          {/* 3-Year Comparison Table */}
          <div className="not-prose overflow-x-auto my-10">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="py-3 pr-4 text-neutral-300 font-semibold">Option</th>
                  <th className="py-3 pr-4 text-neutral-300 font-semibold">Year 1</th>
                  <th className="py-3 pr-4 text-neutral-300 font-semibold">Year 2</th>
                  <th className="py-3 pr-4 text-neutral-300 font-semibold">Year 3</th>
                  <th className="py-3 text-neutral-300 font-semibold">3-Year Total</th>
                </tr>
              </thead>
              <tbody className="text-neutral-400">
                <tr className="border-b border-neutral-800">
                  <td className="py-3 pr-4">Free Builder</td>
                  <td className="py-3 pr-4">$0 + time</td>
                  <td className="py-3 pr-4">$0 + time</td>
                  <td className="py-3 pr-4">$0 + time</td>
                  <td className="py-3">$0 (looks unprofessional)</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-3 pr-4">DIY Builder</td>
                  <td className="py-3 pr-4">$360-$600 + 60hrs</td>
                  <td className="py-3 pr-4">$360-$600 + 30hrs</td>
                  <td className="py-3 pr-4">$360-$600 + 30hrs</td>
                  <td className="py-3">$1,080-$1,800 + 120hrs</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-3 pr-4">Freelancer</td>
                  <td className="py-3 pr-4">$2,600-$5,600</td>
                  <td className="py-3 pr-4">$600-$1,200</td>
                  <td className="py-3 pr-4">$600-$1,200</td>
                  <td className="py-3">$3,800-$8,000</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-3 pr-4">Agency</td>
                  <td className="py-3 pr-4">$8,200-$21,000</td>
                  <td className="py-3 pr-4">$1,200-$6,000</td>
                  <td className="py-3 pr-4">$1,200-$6,000</td>
                  <td className="py-3">$10,600-$33,000</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-3 pr-4 text-white font-medium">Onboard</td>
                  <td className="py-3 pr-4 text-white font-medium">$1,443</td>
                  <td className="py-3 pr-4 text-white font-medium">$948</td>
                  <td className="py-3 pr-4 text-white font-medium">$948</td>
                  <td className="py-3 text-white font-medium">$3,339</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            When you compare total cost of ownership, Onboard comes in at <strong>$3,339 all-in</strong> over three years. That includes design, build, hosting, SSL, maintenance, updates, and SEO optimisation. No surprises.
          </p>
          <p>
            Want to see exactly how a website investment pays for itself? Use the <Link href="/roi-calculator">Onboard ROI calculator</Link> to plug in your numbers.
          </p>

          <h2>What You Actually Need vs What Agencies Upsell</h2>
          <p>Here&apos;s what a small business in Australia actually needs from a website in 2026:</p>

          <p><strong>You need:</strong></p>
          <ul>
            <li>A clean, professional design that works on mobile</li>
            <li>Fast loading speed (under 3 seconds)</li>
            <li>Clear information about your services and how to contact you</li>
            <li>Basic SEO so people can find you on Google</li>
            <li>SSL certificate for security</li>
            <li>Google Business Profile integration</li>
            <li>A contact form, phone number, or both</li>
            <li>5-10 pages: Home, About, Services, Contact, maybe a blog</li>
          </ul>

          <p><strong>You don&apos;t need (yet):</strong></p>
          <ul>
            <li>Custom animations and fancy effects</li>
            <li>A 50-page website</li>
            <li>A custom CMS built from scratch</li>
            <li>&ldquo;Brand discovery workshops&rdquo;</li>
            <li>Monthly retainer meetings with an account manager</li>
            <li>Integration with 15 different tools</li>
          </ul>

          <p>
            Most agencies sell you the second list because that&apos;s where their margins are. A small plumbing business in Perth doesn&apos;t need a $12,000 website with custom animations. It needs a clean site that shows up on Google and makes it easy for customers to call.
          </p>
          <p>
            If you&apos;re a <Link href="/blog/do-tradies-need-a-website">tradie wondering whether you even need a website</Link>, the short answer is yes. But it doesn&apos;t have to cost a fortune.
          </p>

          <h2>How to Choose the Right Option</h2>

          <p><strong>Choose a DIY builder if:</strong></p>
          <ul>
            <li>You genuinely enjoy building websites</li>
            <li>You have 40-80 hours spare to get it done properly</li>
            <li>You&apos;re happy maintaining it yourself ongoing</li>
          </ul>

          <p><strong>Choose a freelancer if:</strong></p>
          <ul>
            <li>You have a specific design vision that needs custom work</li>
            <li>Your budget is $2,000-$5,000</li>
            <li>You&apos;re okay sorting out hosting and maintenance yourself</li>
          </ul>

          <p><strong>Choose an agency if:</strong></p>
          <ul>
            <li>You&apos;re a larger business with complex requirements</li>
            <li>You need e-commerce with hundreds of products</li>
            <li>Your budget is $10,000+ and you&apos;re comfortable with ongoing costs</li>
          </ul>

          <p><strong>Choose <Link href="/onboard">Onboard</Link> if:</strong></p>
          <ul>
            <li>You want a professional website without the agency price tag</li>
            <li>You&apos;d rather focus on running your business than building a website</li>
            <li>You want everything included in one predictable monthly fee</li>
            <li>You need it done in days, not weeks or months</li>
          </ul>

          <p>
            Still not sure? <Link href="/free-audit">Get a free website audit</Link> and we&apos;ll tell you exactly where you stand. Or compare builder options in our guide to the <Link href="/blog/best-website-builders-small-business-australia">best website builders for small business in Australia</Link>.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>How much does a basic website cost in Australia?</h3>
          <p>
            A basic small business website in Australia costs between $0 and $15,000+ depending on how you build it. DIY builders cost $20-$50/month, freelancers charge $1,000-$5,000, and agencies charge $5,000-$15,000+. Done-for-you services like Onboard cost $495 setup + $79/month with everything included.
          </p>

          <h3>What&apos;s the cheapest way to get a professional business website?</h3>
          <p>
            The cheapest professional option is a done-for-you service like <Link href="/onboard">Onboard</Link> at $495 + $79/month. DIY builders are cheaper upfront but factor in the 40-80 hours of your time to build it. Your time has a dollar value too.
          </p>

          <h3>Do I need to pay for hosting separately?</h3>
          <p>
            It depends on how you build your site. With DIY builders (Squarespace, Wix) and done-for-you services (Onboard), hosting is included. With a freelancer or agency, you&apos;ll usually need to arrange hosting separately — budget $10-$100/month.
          </p>

          <h3>How much should I budget for website maintenance?</h3>
          <p>
            If you&apos;re managing it yourself, budget 2-5 hours per month. If paying someone, expect $100-$500/month. With Onboard, maintenance and updates are included in the $79/month — no extra charges.
          </p>

          <h3>Is a $500 website good enough for a small business?</h3>
          <p>
            Absolutely. A $500 website from a quality done-for-you service can be just as effective as a $10,000 agency site for most small businesses. What matters is clean design, mobile responsiveness, fast loading, proper SEO, and clear calls to action. Check out what <Link href="/websites-for-tradies">Onboard websites look like</Link> for examples.
          </p>

          <h3>How long does it take to build a small business website?</h3>
          <p>
            DIY: 2-8 weeks. Freelancer: 2-6 weeks. Agency: 4-12 weeks. <Link href="/onboard">Onboard</Link>: 7 days. Every week without a website is a week of missed enquiries.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-neutral-900 rounded-lg border border-neutral-800 text-center">
          <h3 className="text-2xl font-semibold mb-4">Get Your Business Online in 7 Days</h3>
          <p className="text-neutral-400 mb-6 max-w-xl mx-auto">
            Stop overthinking it. A professional website doesn&apos;t have to cost thousands or take months. $495 setup + $79/month. Everything included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn btn-primary">
              See pricing
            </Link>
            <Link href="/free-audit" className="btn btn-secondary">
              Get a free audit
            </Link>
          </div>
          <p className="text-neutral-500 text-sm mt-4">
            Over 500 Australian businesses already trust Onboard.
          </p>
        </div>
      </article>
    </>
  )
}
