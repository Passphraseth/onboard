import { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema, FAQSchema } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Tradie Marketing: 7 Ways to Get More Jobs Without Wasting Money (2026 Guide) | Onboard',
  description: 'Learn the 7 tradie marketing strategies that actually bring in jobs. From websites to Google Ads, discover what works, what it costs, and how to stop relying on word of mouth alone.',
  keywords: 'tradie marketing, digital marketing for tradies, tradie advertising, how to get more leads as a tradie, tradie marketing ideas, online marketing for tradies',
  openGraph: {
    title: 'Tradie Marketing: 7 Ways to Get More Jobs Without Wasting Money (2026 Guide)',
    description: 'Learn the 7 tradie marketing strategies that actually bring in jobs. From websites to Google Ads, discover what works, what it costs, and how to stop relying on word of mouth alone.',
    url: 'https://onboard.com.au/blog/tradie-marketing',
    type: 'article',
  },
}

export default function TradieMarketingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://onboard.com.au' },
          { name: 'Blog', url: 'https://onboard.com.au/blog' },
          { name: 'Tradie Marketing', url: 'https://onboard.com.au/blog/tradie-marketing' },
        ]}
      />
      <FAQSchema
        faqs={[
          {
            question: 'Do tradies really need a website in 2026?',
            answer: 'Yes. 97% of customers search online before hiring a tradie. If you don\'t have a website, you\'re invisible to most potential customers. Your website is also where all your other marketing channels send people.',
          },
          {
            question: 'How much does tradie marketing cost per month?',
            answer: 'You can start for as little as $109/month with a professional website ($79) and SEO Booster ($30). Add Google Ads at $600-$1,500/month when you\'re ready to scale.',
          },
          {
            question: 'What\'s the best marketing channel for tradies?',
            answer: 'A professional website combined with Google Business Profile gives you the biggest bang for your buck. These two channels capture people who are actively searching for your trade in your area.',
          },
          {
            question: 'Is Hipages worth it for tradies?',
            answer: 'Hipages can generate leads, but you\'re paying $21-$60 per lead and competing with other tradies for the same job. With your own website and marketing, leads cost $2-$14 on average, and they\'re exclusive to you.',
          },
          {
            question: 'How long does tradie marketing take to work?',
            answer: 'Google Ads can deliver leads within days. Google Business Profile and local SEO take 2-6 months to build momentum. The best approach is to use Google Ads for immediate leads while building your organic presence for long-term, lower-cost leads.',
          },
          {
            question: 'Can I do my own tradie marketing?',
            answer: 'You can, but it takes time and know-how. Most tradies find that doing the work they\'re good at (their trade) and outsourcing the marketing delivers a better return.',
          },
        ]}
      />

      <article className="max-w-3xl mx-auto px-6">
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
            <span>March 2026</span>
            <span>&bull;</span>
            <span>12 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight">
            Tradie Marketing: 7 Ways to Get More Jobs Without Wasting Money
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed">
            You&apos;re flat out. Jobs are coming in through mates, repeat customers, and the odd referral from a happy client. Business is good. So why would you bother with marketing?
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-8">
            <h3 className="mt-0">Key Takeaways</h3>
            <ul>
              <li>Word of mouth alone won&apos;t keep your calendar full. The tradies who stay busy year-round use at least 3-4 marketing channels.</li>
              <li>A professional website is the foundation of all tradie marketing. Without one, every other channel works harder than it needs to.</li>
              <li>Google Business Profile is free and puts you in front of people actively searching for your trade in your area.</li>
              <li>You don&apos;t need to spend thousands on an agency. A solid tradie website costs $495 to set up and $79/month to run.</li>
              <li>The best tradie marketing strategy is the one you&apos;ll actually stick with. Start with 2-3 channels, get them right, then expand.</li>
            </ul>
          </div>

          <p>
            Here&apos;s why: word of mouth dries up. It happens to every tradie eventually. A quiet month turns into two. Your regular builder slows down. That real estate agent who sent you three jobs a month changes companies. And suddenly you&apos;re sitting by the phone wondering where the next job is coming from.
          </p>
          <p>
            The tradies who never have that problem aren&apos;t necessarily better at their trade than you. They&apos;ve just set up a few marketing channels that bring in leads whether or not someone remembers to recommend them.
          </p>
          <p>
            This guide covers the 7 tradie marketing strategies that actually work in 2026. No fluff, no agency jargon. Just practical stuff you can start this week.
          </p>

          <h2>Why Most Tradies Get Marketing Wrong</h2>
          <p>Most tradies fall into one of two traps.</p>
          <p>
            <strong>Trap 1: &quot;Word of mouth is enough.&quot;</strong> It works brilliantly until it doesn&apos;t. You have zero control over when referrals come in. One quiet month and you&apos;re scrambling. According to industry data, 97% of people search online before hiring a local tradie. If you&apos;re not showing up, your competitor is getting those jobs.
          </p>
          <p>
            <strong>Trap 2: &quot;I tried Facebook ads and it didn&apos;t work, so marketing is a waste.&quot;</strong> Running one campaign on one channel and writing off the whole thing is like buying a ute with a flat tyre and saying all utes are rubbish. The channel might have been wrong, the targeting might have been off, or the landing page might not have existed.
          </p>
          <p>
            The truth is somewhere in the middle. You don&apos;t need to become a marketing guru. You need 3-4 channels working together so leads come in consistently, not just when someone happens to mention your name.
          </p>

          <h2>The 7 Marketing Channels That Actually Work for Tradies</h2>

          <h3>1. A Professional Website</h3>
          <p>
            This is the foundation. Everything else in tradie marketing drives people to your website. If you don&apos;t have one, or if yours looks like it was built in 2012, you&apos;re losing jobs to competitors who do.
          </p>
          <p>
            Here&apos;s what a <Link href="/websites-for-tradies">tradie website</Link> needs to do:
          </p>
          <ul>
            <li><strong>Show up on Google.</strong> Proper SEO so when someone searches &quot;plumber near me&quot; or &quot;electrician Sydney,&quot; you appear.</li>
            <li><strong>Look professional.</strong> Clean, mobile-friendly, loads fast. Customers judge your work by your website before they ever call you.</li>
            <li><strong>Make it easy to get in touch.</strong> Phone number front and centre. Contact form. Maybe even online booking.</li>
            <li><strong>Show proof.</strong> Reviews, photos of your work, any licences or certifications.</li>
          </ul>
          <p>
            A lot of tradies think a website costs $5,000-$15,000 through an agency. It doesn&apos;t have to. <Link href="/onboard">Onboard</Link> builds done-for-you tradie websites for $495 setup and $79/month. Seven-day turnaround. Over 500 tradies already use it.
          </p>
          <p>
            <strong>Why it matters for marketing:</strong> Without a website, every dollar you spend on Google Ads, every post you make on social media, and every Google Business Profile view has nowhere to send people. Your website is where leads convert into actual phone calls and quote requests.
          </p>

          <h3>2. Google Business Profile</h3>
          <p>
            If you only do one thing on this list besides getting a website, make it this. Your Google Business Profile (GBP) is the box that shows up when someone searches for your trade in your area. It&apos;s completely free.
          </p>
          <p><strong>How to set it up properly:</strong></p>
          <ul>
            <li>Claim your listing at business.google.com</li>
            <li>Fill in every field: business name, address, phone, hours, service area</li>
            <li>Choose the right categories (be specific: &quot;Residential Plumber&quot; not just &quot;Plumber&quot;)</li>
            <li>Add at least 10 photos of your actual work</li>
            <li>Write a description that includes your trade, location, and services</li>
          </ul>
          <p><strong>How to make it work harder:</strong></p>
          <ul>
            <li>Ask every happy customer for a Google review. This is the single biggest factor in local rankings.</li>
            <li>Post updates weekly. Finished a job? Post a photo. Running a special? Post it.</li>
            <li>Respond to every review, good or bad. Google rewards engagement.</li>
          </ul>
          <p>
            Your GBP is often the first thing a potential customer sees. It shows your reviews, photos, contact details, and location on a map. For a lot of tradies, this is where the majority of their online leads come from.
          </p>

          <h3>3. Local SEO</h3>
          <p>
            Local SEO is what gets your website to show up when someone searches for your trade in your area. It&apos;s different from regular SEO because you&apos;re competing with other tradies in your suburb or city, not the entire internet.
          </p>
          <p><strong>The basics of local SEO for tradies:</strong></p>
          <ul>
            <li><strong>Location pages.</strong> If you service multiple areas, have a page for each one. &quot;Plumber in Parramatta,&quot; &quot;Plumber in Penrith,&quot; etc.</li>
            <li><strong>Consistent NAP.</strong> Your Name, Address, and Phone number should be exactly the same everywhere online.</li>
            <li><strong>Local directories.</strong> Get listed on Yellow Pages, True Local, Yelp Australia, and any trade-specific directories.</li>
            <li><strong>Content that mentions your area.</strong> Blog posts, service descriptions, and FAQs that reference the suburbs and cities you work in.</li>
          </ul>
          <p>
            If you&apos;re not sure how your current website stacks up, <Link href="/free-audit">Onboard&apos;s free audit</Link> will tell you exactly where you stand and what needs fixing.
          </p>
          <p>
            The <Link href="/websites-for-tradies">SEO Booster add-on</Link> ($30/month) handles the ongoing optimisation so you don&apos;t have to think about keywords, meta tags, or Google algorithm updates.
          </p>

          <h3>4. Google Ads</h3>
          <p>
            Google Ads puts you at the very top of search results, above everyone else. When someone searches &quot;emergency electrician Brisbane,&quot; your ad appears first.
          </p>
          <p><strong>Why it works for tradies:</strong></p>
          <ul>
            <li>You only pay when someone clicks.</li>
            <li>You can target specific suburbs and postcodes.</li>
            <li>You show up for people who are actively searching for your service right now. That&apos;s high-intent traffic.</li>
          </ul>
          <p><strong>What to watch out for:</strong></p>
          <ul>
            <li><strong>Budget blowouts.</strong> Set a daily cap and stick to it. Start with $20-$30/day and adjust based on results.</li>
            <li><strong>Broad keywords.</strong> Don&apos;t bid on &quot;plumber.&quot; Bid on &quot;licensed plumber Bondi&quot; or &quot;emergency plumber eastern suburbs.&quot;</li>
            <li><strong>No landing page.</strong> Sending ad traffic to your homepage is a waste. Send them to a specific service page that matches what they searched for.</li>
          </ul>
          <p>
            Google Ads works best when you have a solid website to send traffic to. If your site loads slowly, doesn&apos;t have a clear call to action, or looks dodgy on mobile, you&apos;re paying for clicks that won&apos;t convert into jobs.
          </p>

          <h3>5. Social Media</h3>
          <p>
            Let&apos;s be honest: most tradies aren&apos;t going to post on Instagram every day. And that&apos;s fine. Social media for tradies isn&apos;t about going viral. It&apos;s about showing potential customers that you&apos;re active, professional, and doing good work.
          </p>
          <p><strong>What actually works:</strong></p>
          <ul>
            <li><strong>Before and after photos.</strong> Nothing sells your work better than a visual transformation.</li>
            <li><strong>Quick job videos.</strong> 30-second clips of interesting work. People love watching tradies work.</li>
            <li><strong>Customer testimonials.</strong> A quick quote from a happy customer with a photo of the finished job.</li>
            <li><strong>Behind the scenes.</strong> Your van setup, your tools, your team. It builds trust.</li>
          </ul>
          <p><strong>Where to post:</strong></p>
          <ul>
            <li><strong>Facebook</strong> is still the biggest platform for Australian tradies. Local community groups are gold for visibility.</li>
            <li><strong>Instagram</strong> works well for trades with visual results: builders, landscapers, painters, tilers.</li>
            <li><strong>TikTok</strong> is growing fast for tradies. Short, entertaining job videos get massive reach.</li>
          </ul>
          <p>
            <Link href="/websites-for-tradies">Onboard&apos;s Social Media add-on</Link> ($10/month) takes the hassle out of regular posting if you&apos;d rather focus on the tools than the phone.
          </p>

          <h3>6. Referral Systems</h3>
          <p>
            Word of mouth is brilliant. The problem is it&apos;s passive. A referral system makes it active.
          </p>
          <p><strong>How to build one:</strong></p>
          <ul>
            <li><strong>Ask every happy customer.</strong> Sounds obvious, but most tradies never actually ask. &quot;If you know anyone who needs a sparky, I&apos;d appreciate you passing on my number.&quot;</li>
            <li><strong>Make it easy.</strong> Give them a business card, a fridge magnet, or a simple link to share. Your <Link href="/websites-for-tradies">tradie website</Link> URL is the easiest thing to pass along.</li>
            <li><strong>Offer an incentive.</strong> $50 off their next job for every referral that converts. Or a gift card. Whatever works for your business.</li>
            <li><strong>Follow up.</strong> After you finish a job, send a quick text or email thanking them and asking if they&apos;d recommend you.</li>
          </ul>
          <p>
            The difference between &quot;I get referrals sometimes&quot; and &quot;referrals are a consistent lead source&quot; is simply having a system.
          </p>

          <h3>7. Review Management</h3>
          <p>
            Reviews are the new word of mouth. Before someone calls you, they check your Google reviews. A tradie with 50 five-star reviews will get the call over a tradie with 3 reviews every single time.
          </p>
          <p><strong>How to get more reviews:</strong></p>
          <ul>
            <li>Ask at the end of every job. Face to face is best.</li>
            <li>Send a follow-up text with a direct link to your Google review page.</li>
            <li>Make it specific: &quot;Would you mind leaving a quick Google review? It really helps my business.&quot; Generic asks get ignored.</li>
            <li>Respond to every review. Thank the good ones. Address the bad ones professionally.</li>
          </ul>
          <p>
            <strong>How many reviews do you need?</strong> Aim for at least 20 to start looking credible. Then keep building. The top-ranking tradies in most areas have 50-100+ reviews.
          </p>
          <p>
            Reviews also directly affect your Google Business Profile ranking. More reviews with higher ratings means you show up higher in local search results. It&apos;s one of the few tradie marketing strategies that improves everything else.
          </p>

          <h2>How Much Should Tradies Spend on Marketing?</h2>
          <p>Here&apos;s a realistic breakdown of what each channel costs and what you can expect:</p>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Channel</th>
                  <th>Monthly Cost</th>
                  <th>Expected Leads/Month</th>
                  <th>Cost Per Lead</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Professional website</td>
                  <td>$79 (Onboard)</td>
                  <td>10-30</td>
                  <td>$3-$8</td>
                </tr>
                <tr>
                  <td>Google Business Profile</td>
                  <td>Free</td>
                  <td>5-20</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <td>Local SEO</td>
                  <td>$30 (SEO Booster)</td>
                  <td>5-15</td>
                  <td>$2-$6</td>
                </tr>
                <tr>
                  <td>Google Ads</td>
                  <td>$600-$1,500</td>
                  <td>15-40</td>
                  <td>$15-$40</td>
                </tr>
                <tr>
                  <td>Social media</td>
                  <td>$0-$10</td>
                  <td>3-10</td>
                  <td>$0-$3</td>
                </tr>
                <tr>
                  <td>Referral system</td>
                  <td>$0-$100</td>
                  <td>2-5</td>
                  <td>$0-$50</td>
                </tr>
                <tr>
                  <td>Review management</td>
                  <td>Free</td>
                  <td>Indirect</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <td><strong>Total (starter)</strong></td>
                  <td><strong>$109-$219</strong></td>
                  <td><strong>20-60</strong></td>
                  <td><strong>$2-$11 avg</strong></td>
                </tr>
                <tr>
                  <td><strong>Total (growth)</strong></td>
                  <td><strong>$719-$1,719</strong></td>
                  <td><strong>40-120</strong></td>
                  <td><strong>$6-$14 avg</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Compare that to what platforms like Hipages charge: $21-$60 per lead, and you&apos;re competing with 2-3 other tradies for the same job. With your own marketing channels, every lead that comes through your website is yours alone.
          </p>
          <p>
            The industry rule of thumb is to spend 5-10% of revenue on marketing. For a tradie turning over $300,000 a year, that&apos;s $15,000-$30,000. But you don&apos;t need to start there. A $109/month starter package with Onboard&apos;s website and SEO Booster will outperform doing nothing by a country mile.
          </p>
          <p>
            Want to see what your return would look like? Try the <Link href="/roi-calculator">ROI calculator</Link> to get a personalised estimate.
          </p>

          <h2>DIY vs. Hiring Someone: What Makes Sense?</h2>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>DIY</th>
                  <th>Onboard (Done-for-You)</th>
                  <th>Marketing Agency</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Setup cost</strong></td>
                  <td>$0-$500</td>
                  <td>$495</td>
                  <td>$5,000-$15,000</td>
                </tr>
                <tr>
                  <td><strong>Monthly cost</strong></td>
                  <td>$20-$50 (hosting)</td>
                  <td>$79/month</td>
                  <td>$1,500-$5,000/month</td>
                </tr>
                <tr>
                  <td><strong>Time investment</strong></td>
                  <td>10-20 hours setup, 5+ hrs/week ongoing</td>
                  <td>Minimal. 7-day turnaround, they handle it</td>
                  <td>Minimal, but slow communication</td>
                </tr>
                <tr>
                  <td><strong>Quality</strong></td>
                  <td>Depends on your skills</td>
                  <td>Professional, SEO-optimised, 4.8 stars from 500+ clients</td>
                  <td>Professional but expensive</td>
                </tr>
                <tr>
                  <td><strong>SEO included</strong></td>
                  <td>You figure it out</td>
                  <td>SEO Booster add-on $30/mo</td>
                  <td>Usually included at agency prices</td>
                </tr>
                <tr>
                  <td><strong>Turnaround</strong></td>
                  <td>Weeks to months</td>
                  <td>7 days</td>
                  <td>4-12 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>If you&apos;re handy with tech</strong> and have spare time, DIY can work. But be honest with yourself. Most tradies would rather be on the tools than wrestling with WordPress. And a website that looks amateur does more harm than good.
          </p>
          <p>
            <strong>If you want it done properly without the agency price tag</strong>, <Link href="/onboard">Onboard</Link> is built for exactly this. Done-for-you websites designed for tradies, by people who understand the trade industry. No lock-in contracts. No surprise fees.
          </p>
          <p>
            <strong>If you have the budget</strong>, a good agency can deliver results. But for most solo tradies and small teams, $3,000-$5,000 a month is hard to justify when you can get 80% of the results for $109/month.
          </p>
          <p>
            Whether you&apos;re a <Link href="/websites-for-plumbers">plumber</Link>, <Link href="/websites-for-electricians">electrician</Link>, or <Link href="/websites-for-builders">builder</Link>, the right approach depends on your budget, your time, and how fast you want results.
          </p>

          <h2>Get Started With Tradie Marketing That Actually Works</h2>
          <p>You don&apos;t need to do everything at once. Here&apos;s a simple plan:</p>
          <ol>
            <li><strong>This week:</strong> Get a professional <Link href="/websites-for-tradies">tradie website</Link> sorted. It takes 7 days with Onboard.</li>
            <li><strong>Next week:</strong> Claim and optimise your Google Business Profile.</li>
            <li><strong>This month:</strong> Start asking every customer for a Google review.</li>
            <li><strong>Month 2:</strong> Add the SEO Booster and start appearing in more local searches.</li>
            <li><strong>Month 3:</strong> Consider Google Ads if you want to accelerate growth.</li>
          </ol>
          <p>
            The tradies who stay consistently busy aren&apos;t the ones who are best at their trade (though they&apos;re usually good). They&apos;re the ones who made sure people can find them.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-neutral-900 rounded-lg border border-neutral-800 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Get More Jobs?</h3>
          <p className="text-neutral-400 mb-6">
            $495 setup, $79/month, 7-day turnaround. Join 500+ tradies who stopped relying on word of mouth alone.
          </p>
          <Link href="/onboard" className="btn btn-primary">
            Get started with Onboard
          </Link>
        </div>
      </article>
    </>
  )
}
