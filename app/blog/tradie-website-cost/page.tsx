import { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema, FAQSchema } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'How Much Does a Tradie Website Cost in 2026? (Real Prices) | Onboard',
  description:
    'Find out what a tradie website actually costs in Australia. Compare DIY, agency, and done-for-you options from $0 to $15,000+. Includes hidden costs and ROI breakdown.',
  keywords:
    'tradie website cost, how much does a website cost for a tradie, website cost australia, tradie website price, cheap tradie website, website for tradies cost',
  openGraph: {
    title: 'How Much Does a Tradie Website Cost in 2026? (Real Prices) | Onboard',
    description:
      'Find out what a tradie website actually costs in Australia. Compare DIY, agency, and done-for-you options from $0 to $15,000+. Includes hidden costs and ROI breakdown.',
    url: 'https://onboard.com.au/blog/tradie-website-cost',
    type: 'article',
  },
}

export default function TradieWebsiteCost() {
  return (
    <>
      <BreadcrumbSchema
        faqs={[
          { name: 'Home', url: 'https://onboard.com.au' },
          { name: 'Blog', url: 'https://onboard.com.au/blog' },
          { name: 'Tradie Website Cost', url: 'https://onboard.com.au/blog/tradie-website-cost' },
        ]}
      />
      <FAQSchema
        faqs={[
          {
            question: 'How much does a basic tradie website cost in Australia?',
            answer:
              'A basic tradie website in Australia ranges from free (DIY builders like Wix) to $15,000+ (custom agency builds). Done-for-you services like Onboard sit in the middle at $495 setup plus $79/month, which includes design, hosting, SEO, and ongoing support.',
          },
          {
            question: 'Is a free website builder good enough for a tradie?',
            answer:
              'Free website builders can technically get you online, but they come with major trade-offs: ads on your site, no custom domain, limited SEO, and generic templates that don\'t build trust. Most tradies find they need to upgrade within a few months anyway, which ends up costing more in time and money.',
          },
          {
            question: 'What hidden costs should tradies watch out for with websites?',
            answer:
              'Common hidden costs include domain registration ($15-$50/year), SSL certificates ($0-$200/year), premium themes ($50-$200), plugins and extensions ($100-$500/year), email hosting ($5-$15/month), stock photos ($100-$500), ongoing maintenance ($50-$200/month), and SEO tools ($30-$100/month). These can easily add $1,000-$3,000 per year on top of your base cost.',
          },
          {
            question: 'How long does it take for a tradie website to pay for itself?',
            answer:
              'Most tradie websites pay for themselves within 1-3 months. If your average job is worth $500 and your website brings in just 2 extra jobs per month, that\'s $1,000 in revenue against a $79/month running cost. The ROI gets better over time as your SEO improves and you rank higher on Google.',
          },
          {
            question: 'Should a tradie pay an agency or use a done-for-you service?',
            answer:
              'It depends on your budget and needs. Agencies charge $3,000-$15,000 upfront and often $100-$300/month for maintenance, which makes sense for large businesses. For most solo tradies and small teams, a done-for-you service like Onboard delivers the same professional result at a fraction of the cost, with the bonus of ongoing support and updates included.',
          },
        ]}
      />

      <article className="max-w-3xl mx-auto px-6">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-400">March 2026</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">11 min read</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="inline-block bg-blue-600/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
              Tradie Websites
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How Much Does a Tradie Website Cost in 2026? (Real Prices, No BS)
          </h1>
          <p className="text-xl text-gray-400">
            We break down what tradies actually pay for websites in Australia — from free DIY builders to $15K agency builds — so you can pick the right option without getting ripped off.
          </p>
        </header>

        <div className="prose prose-invert prose-lg">
          <h2>Key Takeaways</h2>
          <ul>
            <li>A tradie website costs anywhere from $0 to $15,000+ depending on the route you take. The sweet spot for most tradies is $495-$2,000 upfront.</li>
            <li>DIY builders are &quot;free&quot; until you factor in your time, premium features, and the jobs you lose to a dodgy-looking site.</li>
            <li>Agency websites look great but the cost rarely makes sense for a sole trader or small team.</li>
            <li>Done-for-you services like <Link href="/onboard">Onboard</Link> ($495 setup + $79/month) hit the sweet spot: professional quality without the agency price tag.</li>
            <li>The real question isn&apos;t &quot;how much does a website cost?&quot; — it&apos;s &quot;how many jobs will I lose without one?&quot;</li>
          </ul>

          <hr />

          <p>
            You&apos;ve been putting it off. Every time someone asks &quot;have you got a website?&quot; you mumble something about being too busy or not needing one. But deep down you know it&apos;s costing you work.
          </p>

          <p>
            So you start looking into it. And immediately you&apos;re confused. One bloke on Facebook says he got a site for free. An agency wants $8,000. Your mate&apos;s nephew reckons he can build one for $500 but he&apos;s also still at uni. What&apos;s the actual answer?
          </p>

          <p>
            We&apos;ve helped over 500 Australian tradies get online with <Link href="/websites-for-tradies">Onboard</Link>, so we&apos;ve heard every pricing question there is. This guide gives you the full picture — every option, what it really costs (including the stuff they don&apos;t tell you upfront), and which one makes the most sense for your situation.
          </p>

          <h2>The Three Routes to a Tradie Website</h2>

          <p>
            There are really only three paths. Each has its place, and the right one depends on your budget, your time, and how serious you are about getting leads online.
          </p>

          <h3>Option 1: DIY Website Builders ($0-$50/month)</h3>

          <p>
            This is the &quot;I&apos;ll do it myself&quot; option. Platforms like Wix, Squarespace, and WordPress.com let you drag and drop your way to a website. Some even have free plans.
          </p>

          <p><strong>What you&apos;ll actually pay:</strong></p>

          <ul>
            <li><strong>Free plan:</strong> $0/month — but your URL will be something like &quot;yourname.wixsite.com&quot; (not a great look when you&apos;re quoting a $20K bathroom reno)</li>
            <li><strong>Basic paid plan:</strong> $15-$30/month — gets you a custom domain and removes ads</li>
            <li><strong>Business plan:</strong> $30-$50/month — adds forms, booking tools, and e-commerce</li>
          </ul>

          <p><strong>The real cost nobody talks about:</strong></p>

          <ul>
            <li><strong>Your time:</strong> Most tradies spend 20-40 hours building their first site. At $80/hour (a sparkie&apos;s average rate), that&apos;s $1,600-$3,200 in lost earning time.</li>
            <li><strong>Domain name:</strong> $15-$50/year</li>
            <li><strong>Premium template:</strong> $50-$200 (the free ones all look the same)</li>
            <li><strong>Stock photos:</strong> $100-$500 if you don&apos;t have your own</li>
            <li><strong>Plugins/add-ons:</strong> Contact forms, SEO tools, booking systems — $100-$500/year</li>
            <li><strong>Ongoing maintenance:</strong> Updates, backups, fixing things that break — 2-5 hours/month</li>
          </ul>

          <p><strong>Total first-year cost: $500-$4,000</strong> (including your time)</p>

          <p><strong>Best for:</strong> Tradies who genuinely enjoy tinkering with tech and have spare time on weekends. If that&apos;s you, go for it. If you&apos;d rather be on the tools or watching the footy, keep reading.</p>

          <p>
            Want to compare the specific platforms? Check out our{' '}
            <Link href="/blog/best-website-builders-small-business-australia">
              guide to the best website builders for small business in Australia
            </Link>.
          </p>

          <h3>Option 2: Web Design Agency ($3,000-$15,000+)</h3>

          <p>
            This is the &quot;hand it to a professional&quot; option. A web design agency builds you a custom site from scratch. They handle the design, the copy, the SEO setup, and launch it for you.
          </p>

          <p><strong>What you&apos;ll actually pay:</strong></p>

          <ul>
            <li><strong>Small local agency:</strong> $3,000-$6,000 for a 5-8 page site</li>
            <li><strong>Mid-range agency:</strong> $6,000-$10,000 with custom design and copywriting</li>
            <li><strong>Premium agency:</strong> $10,000-$15,000+ with advanced features, animations, and integrations</li>
          </ul>

          <p><strong>The hidden costs:</strong></p>

          <ul>
            <li><strong>Hosting:</strong> $20-$100/month (usually not included)</li>
            <li><strong>Maintenance retainer:</strong> $100-$300/month for updates and changes</li>
            <li><strong>Content updates:</strong> $50-$150 per change if you can&apos;t edit it yourself</li>
            <li><strong>Redesign every 3-4 years:</strong> Another $3,000-$10,000 when the site looks dated</li>
            <li><strong>SEO:</strong> $500-$2,000/month if you want ongoing optimisation</li>
          </ul>

          <p><strong>Total first-year cost: $5,000-$20,000+</strong></p>

          <p><strong>Best for:</strong> Larger trade businesses with 5+ employees, commercial clients, and marketing budgets over $1,000/month. If you&apos;re a sole trader or small team, this is almost certainly overkill.</p>

          <h3>Option 3: Done-for-You Service ($495 + $79/month)</h3>

          <p>
            This is the middle ground that didn&apos;t exist five years ago. Services like{' '}
            <Link href="/onboard">Onboard</Link> build you a professional, custom website without the agency price tag.
          </p>

          <p><strong>What you pay with Onboard:</strong></p>

          <ul>
            <li><strong>Setup:</strong> $495 one-off — includes custom design, copywriting, and SEO setup</li>
            <li><strong>Monthly:</strong> $79/month — includes hosting, SSL, support, updates, and backups</li>
            <li><strong>Hidden costs:</strong> None. Domain, hosting, SSL, support — it&apos;s all included.</li>
          </ul>

          <p><strong>What&apos;s included:</strong></p>

          <ul>
            <li>Custom-designed website (not a template with your logo slapped on)</li>
            <li>Professional copywriting tailored to your trade and area</li>
            <li>Mobile-optimised (over 70% of tradie searches happen on phones)</li>
            <li>SEO foundations so you start ranking on Google</li>
            <li>Quote request forms and click-to-call buttons</li>
            <li>Google Business Profile integration</li>
            <li>Ongoing support — need a change? Just ask.</li>
            <li>7-day turnaround from sign-up to launch</li>
          </ul>

          <p><strong>Total first-year cost: $1,443</strong></p>

          <p>
            <strong>Best for:</strong> Solo tradies and small teams who want a professional site without the DIY headache or the agency bill. This is what the{' '}
            <Link href="/websites-for-tradies">majority of tradies</Link> actually need.
          </p>

          <h2>The Full Cost Comparison Table</h2>

          <p>Here&apos;s the honest comparison, including the stuff most providers don&apos;t mention upfront:</p>

          <table>
            <thead>
              <tr>
                <th>Cost Factor</th>
                <th>DIY Builder</th>
                <th>Agency</th>
                <th>Onboard</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Upfront cost</td>
                <td>$0-$200</td>
                <td>$3,000-$15,000</td>
                <td>$495</td>
              </tr>
              <tr>
                <td>Monthly cost</td>
                <td>$15-$50</td>
                <td>$100-$400</td>
                <td>$79</td>
              </tr>
              <tr>
                <td>Your time to set up</td>
                <td>20-40 hours</td>
                <td>5-10 hours (briefing/feedback)</td>
                <td>1 hour (quick chat)</td>
              </tr>
              <tr>
                <td>Ongoing time required</td>
                <td>2-5 hours/month</td>
                <td>1-2 hours/month</td>
                <td>0 hours</td>
              </tr>
              <tr>
                <td>Domain included</td>
                <td>Sometimes</td>
                <td>Sometimes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>SSL included</td>
                <td>Yes</td>
                <td>Usually</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>SEO setup</td>
                <td>DIY</td>
                <td>Basic</td>
                <td>Included</td>
              </tr>
              <tr>
                <td>Support</td>
                <td>Help docs only</td>
                <td>Email/retainer</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>First-year total</td>
                <td>$500-$4,000</td>
                <td>$5,000-$20,000</td>
                <td>$1,443</td>
              </tr>
            </tbody>
          </table>

          <h2>Hidden Costs That Catch Tradies Out</h2>

          <p>
            No matter which route you take, there are costs that pop up after you&apos;ve committed. Here are the ones tradies tell us caught them off guard:
          </p>

          <h3>1. The &quot;Free&quot; Template Tax</h3>

          <p>
            Free templates on DIY builders look alright in the demo. Then you add your content and it looks like a dog&apos;s breakfast. You end up buying a premium template ($50-$200) or spending hours trying to make the free one work.
          </p>

          <h3>2. The Plugin Creep</h3>

          <p>
            You need a contact form — that&apos;s a plugin. SEO tools — another plugin. Image compression — plugin. Backup system — plugin. Before you know it, you&apos;re paying $30-$80/month in plugin subscriptions on top of your hosting.
          </p>

          <h3>3. The &quot;Small Change&quot; Invoice</h3>

          <p>
            With agencies, changing a phone number might cost $50. Adding a new service page? $200-$500. These small charges add up fast, especially in the first year when you&apos;re still refining your content.
          </p>

          <h3>4. The Redesign Cycle</h3>

          <p>
            Web design trends change. A site built in 2023 already looks dated in 2026. DIY builders expect you to redesign yourself. Agencies charge you again. With Onboard, design refreshes are part of the service.
          </p>

          <h3>5. The SEO Afterthought</h3>

          <p>
            Having a website that doesn&apos;t rank on Google is like having a shopfront in the middle of the desert. Many tradies build a site, then realise SEO is a whole separate cost — $500-$2,000/month with most agencies. With Onboard, SEO foundations are built in from day one.
          </p>

          <h2>Why Cheap Doesn&apos;t Mean Good Value</h2>

          <p>
            We see this all the time. A tradie goes with the cheapest option, ends up with a site that looks like it was built by their 12-year-old, and wonders why nobody&apos;s calling.
          </p>

          <p>Here&apos;s the thing: your website is often the first impression a potential customer gets of your business. Before they call you, before they see your work, before they talk to you — they Google you. And what they find decides whether they pick up the phone or scroll to the next tradie.</p>

          <p>A cheap website that looks unprofessional does three things:</p>

          <ol>
            <li><strong>Kills trust immediately.</strong> If your website looks dodgy, people assume your work is too.</li>
            <li><strong>Doesn&apos;t rank on Google.</strong> No SEO = no traffic = no leads. You&apos;ve basically built a billboard in your shed.</li>
            <li><strong>Costs more in the long run.</strong> You&apos;ll rebuild it within 12 months, losing the time and money you already invested.</li>
          </ol>

          <p>
            The best value isn&apos;t the cheapest option. It&apos;s the one that brings in more work than it costs. Check out our{' '}
            <Link href="/roi-calculator">ROI calculator</Link> to see what a proper website could be worth to your business.
          </p>

          <h2>The ROI Calculation Every Tradie Should Do</h2>

          <p>
            Forget the cost for a second. Let&apos;s talk about what a website actually <em>makes</em> you.
          </p>

          <p><strong>Here&apos;s a simple calculation:</strong></p>

          <ul>
            <li>Average job value for your trade: Let&apos;s say $800</li>
            <li>New leads from website per month: Even a modest site gets 5-10 enquiries/month</li>
            <li>Conversion rate: 30% of enquiries become jobs (conservative)</li>
            <li>New jobs per month from website: 1.5-3 jobs</li>
            <li>Monthly revenue from website: $1,200-$2,400</li>
            <li>Monthly website cost (Onboard): $79</li>
          </ul>

          <p>
            <strong>That&apos;s a return of 15-30x your investment.</strong> Every single month.
          </p>

          <p>
            Even if your website only brings in one extra job per month, that&apos;s $800 against a $79 cost. A 10x return. Show me another investment that does that.
          </p>

          <p>
            Want to run the numbers for your specific trade?{' '}
            <Link href="/roi-calculator">Use our free ROI calculator</Link>.
          </p>

          <h2>What to Look for in a Tradie Website (At Any Price Point)</h2>

          <p>
            Whatever you end up paying, make sure your website has these non-negotiables:
          </p>

          <ul>
            <li><strong>Mobile-first design.</strong> Over 70% of &quot;tradie near me&quot; searches happen on phones. If your site doesn&apos;t look great on mobile, you&apos;re invisible to most potential customers.</li>
            <li><strong>Fast loading speed.</strong> If it takes more than 3 seconds, half your visitors leave before they see anything.</li>
            <li><strong>Clear call-to-action.</strong> Phone number and &quot;Get a Quote&quot; button visible on every page. Don&apos;t make people hunt for it.</li>
            <li><strong>SEO foundations.</strong> Proper page titles, meta descriptions, heading structure, and local keywords so Google knows what you do and where you do it.</li>
            <li><strong>Reviews/social proof.</strong> Google reviews integrated into the site. Customers trust other customers more than they trust you.</li>
            <li><strong>Service area clarity.</strong> Tell people exactly where you work. &quot;Servicing Sydney&apos;s Northern Beaches&quot; is better than &quot;servicing the Sydney area.&quot;</li>
            <li><strong>SSL certificate.</strong> The padlock icon in the browser. Without it, Google flags your site as &quot;not secure&quot; and visitors bounce.</li>
          </ul>

          <p>
            Not sure if your current site ticks these boxes?{' '}
            <Link href="/free-audit">Get a free website audit</Link> and we&apos;ll tell you exactly what&apos;s working and what&apos;s not.
          </p>

          <h2>When to Upgrade Your Approach</h2>

          <p>
            Your website needs change as your business grows. Here&apos;s a rough guide:
          </p>

          <ul>
            <li><strong>Just starting out, tight budget:</strong> A DIY builder is fine temporarily, but plan to upgrade within 6-12 months.</li>
            <li><strong>Established tradie, ready to grow:</strong> A <Link href="/onboard">done-for-you service like Onboard</Link> is the smart move. Professional quality, minimal time investment, affordable monthly cost.</li>
            <li><strong>Growing business, 5+ staff:</strong> Consider an agency for advanced features, but get quotes from at least three and check their portfolio of trade websites specifically.</li>
            <li><strong>Large operation, commercial clients:</strong> Agency or custom development. Budget $10K+ upfront and $500+/month for maintenance and SEO.</li>
          </ul>

          <h2>Still Not Sure? Here&apos;s What We&apos;d Tell a Mate</h2>

          <p>
            If a mate asked us &quot;how much should I spend on a website for my trade business?&quot; — here&apos;s what we&apos;d say:
          </p>

          <p>
            Don&apos;t overthink it. You don&apos;t need a $10,000 site. You don&apos;t need to spend your weekends fighting with Wix. You need a professional site that shows up on Google, looks trustworthy on a phone, and makes it dead easy for someone to call you or request a quote.
          </p>

          <p>
            <Link href="/pricing">Onboard does exactly that for $495 + $79/month.</Link> No lock-in contracts. Seven-day turnaround. Over 500 tradies already use it.
          </p>

          <p>
            If you&apos;re still on the fence, read{' '}
            <Link href="/blog/do-tradies-need-a-website">our breakdown of whether tradies actually need a website</Link>{' '}
            — spoiler: they do.
          </p>

          <p>
            <strong>Ready to stop losing jobs to tradies with better websites?</strong>{' '}
            <Link href="/onboard">Get started with Onboard today</Link>.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>How much does a basic tradie website cost in Australia?</h3>
          <p>
            A basic tradie website in Australia ranges from free (DIY builders like Wix) to $15,000+ (custom agency builds). Done-for-you services like Onboard sit in the middle at $495 setup plus $79/month, which includes design, hosting, SEO, and ongoing support.
          </p>

          <h3>Is a free website builder good enough for a tradie?</h3>
          <p>
            Free website builders can technically get you online, but they come with major trade-offs: ads on your site, no custom domain, limited SEO, and generic templates that don&apos;t build trust. Most tradies find they need to upgrade within a few months anyway, which ends up costing more in time and money.
          </p>

          <h3>What hidden costs should tradies watch out for with websites?</h3>
          <p>
            Common hidden costs include domain registration ($15-$50/year), SSL certificates ($0-$200/year), premium themes ($50-$200), plugins and extensions ($100-$500/year), email hosting ($5-$15/month), stock photos ($100-$500), ongoing maintenance ($50-$200/month), and SEO tools ($30-$100/month). These can easily add $1,000-$3,000 per year on top of your base cost.
          </p>

          <h3>How long does it take for a tradie website to pay for itself?</h3>
          <p>
            Most tradie websites pay for themselves within 1-3 months. If your average job is worth $500 and your website brings in just 2 extra jobs per month, that&apos;s $1,000 in revenue against a $79/month running cost. The ROI gets better over time as your SEO improves and you rank higher on Google.
          </p>

          <h3>Should a tradie pay an agency or use a done-for-you service?</h3>
          <p>
            It depends on your budget and needs. Agencies charge $3,000-$15,000 upfront and often $100-$300/month for maintenance, which makes sense for large businesses. For most solo tradies and small teams, a done-for-you service like <Link href="/onboard">Onboard</Link> delivers the same professional result at a fraction of the cost, with the bonus of ongoing support and updates included.
          </p>
        </div>
      </article>
    </>
  )
}
