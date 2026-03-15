import { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema, FAQSchema } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Hipages vs Your Own Website: Which Gets More Jobs? | Onboard',
  description:
    'Compare Hipages lead costs ($21-60 per lead) with owning your own tradie website. Find out which option actually gets more jobs and better ROI for Australian tradies.',
  keywords: [
    'hipages vs own website',
    'is hipages worth it',
    'hipages cost per lead',
    'hipages alternative',
    'tradie website vs hipages',
    'hipages leads',
    'tradie lead generation',
  ],
  openGraph: {
    title: 'Hipages vs Your Own Website: Which Gets More Jobs? | Onboard',
    description:
      'Compare Hipages lead costs ($21-60 per lead) with owning your own tradie website. Find out which option actually gets more jobs and better ROI for Australian tradies.',
    url: 'https://onboard.com.au/blog/hipages-vs-own-website',
    type: 'article',
  },
}

export default function HipagesVsOwnWebsite() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://onboard.com.au' },
    { name: 'Blog', url: 'https://onboard.com.au/blog' },
    {
      name: 'Hipages vs Your Own Website',
      url: 'https://onboard.com.au/blog/hipages-vs-own-website',
    },
  ]

  const faqs = [
    {
      question: 'How much does Hipages cost per lead?',
      answer:
        'Hipages lead costs vary by trade and location, but most tradies report paying between $21 and $60 per lead. Some high-competition trades like plumbing and electrical in metro areas can see costs even higher. Keep in mind, not every lead converts into a paying job, so your actual cost per job is typically much more.',
    },
    {
      question: 'Can I use Hipages and my own website at the same time?',
      answer:
        'Absolutely. Many successful tradies use both. Hipages can fill gaps in your schedule while your website builds organic traffic over time. The key is tracking which source delivers better ROI so you can shift your budget accordingly.',
    },
    {
      question: 'Is Hipages worth it for new tradies?',
      answer:
        'Hipages can be useful when you are just starting out and need jobs quickly. However, the leads are shared with other tradies so competition is fierce. Building your own website early means you start ranking on Google sooner, which pays off long-term with cheaper, exclusive leads.',
    },
    {
      question: 'How long does it take for a tradie website to start getting leads?',
      answer:
        'Most tradie websites start generating organic leads within 3 to 6 months if they are properly optimised for local SEO. Some tradies see enquiries within weeks, especially if they set up Google Business Profile and target specific suburbs. It is not instant like Hipages, but the leads you get are yours alone.',
    },
    {
      question: 'What is the real cost difference between Hipages and a website?',
      answer:
        'Hipages costs $21-60 per lead with no guarantee of conversion, and you pay forever. A professional tradie website costs around $495 to set up plus $79 per month with Onboard. Once your site ranks, organic leads cost you nothing extra. Most tradies find their website pays for itself within 2-3 months.',
    },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />

      <article className="max-w-3xl mx-auto px-6">
        <header className="mb-10">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <time dateTime="2026-03">March 2026</time>
            <span>12 min read</span>
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
              Lead Generation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hipages vs Your Own Website: Which Gets More Jobs?
          </h1>
          <p className="text-xl text-gray-400">
            We break down the real costs, conversion rates, and long-term value of Hipages
            compared to owning your own tradie website. The answer might surprise you.
          </p>
        </header>

        <div className="prose prose-invert prose-lg">
          <p>
            If you&apos;re an Australian tradie, chances are you&apos;ve either used Hipages or at
            least thought about it. It&apos;s one of the biggest lead generation platforms in the
            country, and it promises a steady stream of customers landing in your inbox.
          </p>
          <p>
            Sounds great, right? Well, sort of. The reality is a bit more complicated than the
            sales pitch. Hipages leads cost money, they&apos;re shared with your competitors, and
            you never truly own the relationship with the customer.
          </p>
          <p>
            On the other hand, having your own website means customers find <em>you</em> directly.
            No middleman. No shared leads. No per-lead fees eating into your margins.
          </p>
          <p>
            So which one actually gets you more jobs? Let&apos;s break it all down honestly, with
            real numbers, so you can make the right call for your business.
          </p>

          <h2>How Hipages Actually Works</h2>
          <p>
            For those who haven&apos;t used it, here&apos;s the quick rundown. Hipages is a lead
            marketplace. Homeowners post a job (say, &ldquo;need a plumber in Parramatta&rdquo;),
            and Hipages sends that lead to multiple tradies in the area. You pay for the lead
            whether or not you win the job.
          </p>
          <p>
            There are two main models Hipages uses:
          </p>
          <ul>
            <li>
              <strong>Pay-per-lead:</strong> You pay for each lead you receive. Costs range from
              around $21 for simpler jobs to $60 or more for high-value trades like plumbing,
              electrical, or building work.
            </li>
            <li>
              <strong>Subscription plans:</strong> Monthly plans that give you a set number of leads
              per month, often with a minimum commitment period.
            </li>
          </ul>
          <p>
            The platform does the marketing for you. They run Google Ads, they rank for trade-related
            searches, and they funnel those enquiries to their registered tradies. You&apos;re
            essentially renting access to their audience.
          </p>

          <h2>The Real Cost of Hipages Leads</h2>
          <p>
            Let&apos;s talk numbers, because this is where things get interesting.
          </p>
          <p>
            The average Hipages lead costs between <strong>$21 and $60</strong>, depending on your
            trade and location. But here&apos;s the kicker: that&apos;s the cost per{' '}
            <em>lead</em>, not per <em>job</em>.
          </p>
          <p>
            Most tradies report converting somewhere between 20% and 35% of Hipages leads into
            actual paying jobs. So let&apos;s do the maths:
          </p>
          <ul>
            <li>Average lead cost: $40</li>
            <li>Conversion rate: 25%</li>
            <li>Leads needed per job: 4</li>
            <li><strong>Actual cost per job: $160</strong></li>
          </ul>
          <p>
            If you&apos;re a plumber doing a $300 job, that&apos;s more than half your revenue gone
            on lead acquisition alone. For higher-value jobs it makes more sense, but the margins
            are still tight.
          </p>
          <p>
            And here&apos;s the thing most people don&apos;t talk about: the lead quality can be
            inconsistent. You&apos;ll get tyre-kickers, people who&apos;ve already hired someone
            else, and the classic &ldquo;just getting quotes to compare&rdquo; crowd. You pay for
            all of them.
          </p>

          <h2>The Pros of Hipages</h2>
          <p>
            Look, we&apos;re not here to bash Hipages. It does have genuine advantages:
          </p>
          <ul>
            <li>
              <strong>Instant leads:</strong> Sign up today, get leads tomorrow. There&apos;s no
              waiting around for SEO to kick in.
            </li>
            <li>
              <strong>No marketing skills needed:</strong> You don&apos;t have to know anything
              about websites, SEO, or digital marketing. Hipages handles it all.
            </li>
            <li>
              <strong>Good for filling gaps:</strong> If you&apos;ve got a quiet week, Hipages can
              help fill your schedule quickly.
            </li>
            <li>
              <strong>Brand exposure:</strong> Your profile on Hipages gives you some visibility,
              especially if you collect good reviews there.
            </li>
            <li>
              <strong>Established trust:</strong> Some homeowners trust the Hipages platform and
              prefer booking through it.
            </li>
          </ul>

          <h2>The Cons of Hipages</h2>
          <p>
            Now for the other side of the coin:
          </p>
          <ul>
            <li>
              <strong>Shared leads:</strong> You&apos;re competing with 2-3 other tradies for
              every lead. Speed matters more than quality sometimes.
            </li>
            <li>
              <strong>Ongoing costs:</strong> The moment you stop paying, the leads stop. There is
              zero compounding value.
            </li>
            <li>
              <strong>No brand building:</strong> The customer remembers Hipages, not your business
              name. You&apos;re building their brand, not yours.
            </li>
            <li>
              <strong>Price pressure:</strong> When customers are comparing three quotes
              side-by-side, price often wins. This pushes margins down.
            </li>
            <li>
              <strong>You don&apos;t own the leads:</strong> Hipages owns the customer
              relationship. If they change their pricing or algorithms, you&apos;re at their
              mercy.
            </li>
            <li>
              <strong>Variable quality:</strong> Not all leads are genuine. You still pay for
              no-shows and time-wasters.
            </li>
          </ul>

          <h2>How Your Own Website Compares</h2>
          <p>
            Now let&apos;s look at the alternative:{' '}
            <Link href="/websites-for-tradies">having your own professional website</Link>.
          </p>
          <p>
            When someone Googles &ldquo;electrician near me&rdquo; or &ldquo;plumber Western
            Sydney&rdquo;, your website can show up directly in the search results. The customer
            clicks through, sees your work, reads your reviews, and contacts <em>you</em>. Nobody
            else. Just you.
          </p>
          <p>
            That&apos;s a fundamentally different dynamic. There&apos;s no bidding war. No shared
            leads. No per-lead fees. The customer has already chosen you before they pick up the
            phone.
          </p>
          <p>
            With a properly optimised tradie website, you get:
          </p>
          <ul>
            <li>
              <strong>Exclusive leads:</strong> Every enquiry through your website is yours alone.
              No one else is getting that same lead.
            </li>
            <li>
              <strong>Higher conversion rates:</strong> Website leads typically convert at 40-60%
              because the customer has already researched you and decided to reach out.
            </li>
            <li>
              <strong>Brand building:</strong> Your website, your name, your reputation. Every
              visit builds trust in <em>your</em> business.
            </li>
            <li>
              <strong>Compounding value:</strong> Unlike Hipages, your website gets stronger over
              time. The SEO work you do today keeps paying off for years.
            </li>
            <li>
              <strong>You own everything:</strong> Your content, your customer data, your online
              presence. No platform can take that away.
            </li>
          </ul>

          <h2>Cost Per Lead: The Real Comparison</h2>
          <p>
            Let&apos;s put some real numbers side by side.
          </p>
          <h3>Hipages (12-Month View)</h3>
          <ul>
            <li>Monthly spend: ~$800-$1,500 (varies by trade)</li>
            <li>Leads per month: ~20-30</li>
            <li>Cost per lead: $40-$60</li>
            <li>Conversion rate: 20-35%</li>
            <li>Cost per job: $115-$300</li>
            <li>Annual spend: $9,600-$18,000</li>
            <li>Value at end of year if you cancel: $0</li>
          </ul>
          <h3>Your Own Website with Onboard (12-Month View)</h3>
          <ul>
            <li>Setup cost: $495</li>
            <li>Monthly cost: $79/month ($948/year)</li>
            <li>Total first-year cost: $1,443</li>
            <li>Leads per month (after 3-6 months): 10-30+</li>
            <li>Cost per lead (month 6+): $5-$15</li>
            <li>Conversion rate: 40-60%</li>
            <li>Cost per job: $8-$38</li>
            <li>Value at end of year if you cancel: You still have a ranking website</li>
          </ul>
          <p>
            The difference is massive. With Hipages, you could spend $15,000+ a year on leads that
            vanish the moment you stop paying. With{' '}
            <Link href="/pricing">your own website</Link>, you invest a fraction of that and build
            an asset that keeps working for you.
          </p>
          <p>
            Want to see exactly how your numbers stack up? Try our{' '}
            <Link href="/roi-calculator">free ROI calculator</Link> to compare costs for your
            specific trade and location.
          </p>

          <h2>Can You Use Both? (Yes, and Here&apos;s How)</h2>
          <p>
            Here&apos;s the smart play that a lot of successful tradies use: run both, but shift
            your budget over time.
          </p>
          <p>
            When you&apos;re starting out or your website is brand new, Hipages can fill the gaps.
            Use it to keep busy while your site builds authority and starts ranking on Google.
          </p>
          <p>
            As your website starts generating organic leads (usually within 3-6 months), gradually
            reduce your Hipages spend. Plenty of tradies eventually turn Hipages off completely
            because their website brings in more than enough work.
          </p>
          <p>The transition usually looks something like this:</p>
          <ul>
            <li>
              <strong>Months 1-3:</strong> Hipages for most leads, website being indexed and
              starting to rank.
            </li>
            <li>
              <strong>Months 3-6:</strong> Website generating some leads, reduce Hipages spend by
              30-50%.
            </li>
            <li>
              <strong>Months 6-12:</strong> Website is your primary lead source. Hipages is
              optional backup.
            </li>
            <li>
              <strong>Year 2+:</strong> Most tradies are fully reliant on their website and
              word-of-mouth. Hipages costs drop to zero.
            </li>
          </ul>

          <h2>Why Owning Your Leads Matters</h2>
          <p>
            This is the bit that doesn&apos;t get talked about enough. When a customer comes
            through Hipages, they&apos;re Hipages&apos; customer first and yours second. The
            platform controls the relationship.
          </p>
          <p>
            When a customer finds you through your own website, you own that relationship. You can:
          </p>
          <ul>
            <li>Follow up directly for repeat business</li>
            <li>Ask for reviews on your Google profile</li>
            <li>Build a referral network</li>
            <li>Send seasonal offers or reminders</li>
            <li>Create a genuine brand that people recommend to mates</li>
          </ul>
          <p>
            Think about the tradies you know who are always booked out. Guaranteed, they&apos;re
            not relying on Hipages. They&apos;ve built a reputation, a website, and a Google
            presence that feeds them work on autopilot.
          </p>
          <p>
            That&apos;s the difference between renting your business and owning it.
          </p>

          <h2>What Does a Good Tradie Website Need?</h2>
          <p>
            You don&apos;t need anything fancy. A tradie website that actually generates leads
            needs:
          </p>
          <ul>
            <li>
              <strong>Clear service pages:</strong> What you do, where you do it, and how to
              contact you.
            </li>
            <li>
              <strong>Local SEO:</strong> Suburb-specific content so Google shows you to nearby
              customers.
            </li>
            <li>
              <strong>Mobile-friendly design:</strong> Most people search on their phones. If your
              site doesn&apos;t work on mobile, you&apos;re invisible.
            </li>
            <li>
              <strong>Fast loading:</strong> Slow sites get penalised by Google and abandoned by
              visitors.
            </li>
            <li>
              <strong>Easy contact options:</strong> Click-to-call, quote forms, and clear calls to
              action.
            </li>
            <li>
              <strong>Reviews and trust signals:</strong> Social proof that shows you&apos;re
              legit.
            </li>
          </ul>
          <p>
            At <Link href="/onboard">Onboard</Link>, we build all of this for you. No DIY
            website builders, no templates you have to figure out yourself. We create a
            professional, SEO-optimised website for your trade business and handle all the
            technical stuff. $495 setup, $79 a month. Done.
          </p>

          <h2>Real Talk: When Hipages Makes More Sense</h2>
          <p>
            We&apos;re big believers in owning your online presence, but we also believe in being
            honest. There are times when Hipages is the better play:
          </p>
          <ul>
            <li>
              <strong>You need jobs this week:</strong> If you&apos;re brand new and cash flow is
              tight, Hipages delivers faster than SEO.
            </li>
            <li>
              <strong>You&apos;re in a new area:</strong> Just moved to a new city? Hipages can get
              you established while your local SEO catches up.
            </li>
            <li>
              <strong>Seasonal slow periods:</strong> Use it tactically during quiet months rather
              than as a permanent fixture.
            </li>
          </ul>
          <p>
            But even in these situations, the smart move is to have your website working in the
            background. Because every month you wait to build your online presence is another month
            of paying full price for shared leads.
          </p>

          <h2>The Bottom Line</h2>
          <p>
            Hipages is a tool. It has its place. But it&apos;s not a business strategy. It&apos;s a
            short-term fix that costs more the longer you rely on it.
          </p>
          <p>
            Your own website is an investment. It costs less, delivers better leads, and gets
            stronger every month. It&apos;s the difference between renting a shopfront and owning
            the building.
          </p>
          <p>
            The tradies who are smashing it in 2026 aren&apos;t the ones paying top dollar for
            shared leads. They&apos;re the ones who built their own online presence, own their
            customer relationships, and let their website do the heavy lifting.
          </p>
          <p>
            If you haven&apos;t started yet, now&apos;s the time.{' '}
            <Link href="/onboard">Get your tradie website sorted with Onboard</Link> and start
            building something that actually belongs to you.
          </p>
          <p>
            Already wondering if you even need a website? We covered that in detail over at{' '}
            <Link href="/blog/do-tradies-need-a-website">
              Do Tradies Need a Website?
            </Link>{' '}
            And if you want the full picture on marketing your trade business, check out our{' '}
            <Link href="/blog/tradie-marketing">Tradie Marketing Guide</Link>.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>How much does Hipages cost per lead?</h3>
          <p>
            Hipages lead costs vary by trade and location, but most tradies report paying between
            $21 and $60 per lead. Some high-competition trades like plumbing and electrical in
            metro areas can see costs even higher. Keep in mind, not every lead converts into a
            paying job, so your actual cost per job is typically much more.
          </p>

          <h3>Can I use Hipages and my own website at the same time?</h3>
          <p>
            Absolutely. Many successful tradies use both. Hipages can fill gaps in your schedule
            while your website builds organic traffic over time. The key is tracking which source
            delivers better ROI so you can shift your budget accordingly.
          </p>

          <h3>Is Hipages worth it for new tradies?</h3>
          <p>
            Hipages can be useful when you are just starting out and need jobs quickly. However,
            the leads are shared with other tradies so competition is fierce. Building your own
            website early means you start ranking on Google sooner, which pays off long-term with
            cheaper, exclusive leads.
          </p>

          <h3>How long does it take for a tradie website to start getting leads?</h3>
          <p>
            Most tradie websites start generating organic leads within 3 to 6 months if they are
            properly optimised for local SEO. Some tradies see enquiries within weeks, especially
            if they set up Google Business Profile and target specific suburbs. It is not instant
            like Hipages, but the leads you get are yours alone.
          </p>

          <h3>What is the real cost difference between Hipages and a website?</h3>
          <p>
            Hipages costs $21-60 per lead with no guarantee of conversion, and you pay forever. A
            professional tradie website costs around $495 to set up plus $79 per month with
            Onboard. Once your site ranks, organic leads cost you nothing extra. Most tradies find
            their website pays for itself within 2-3 months.
          </p>
        </div>
      </article>
    </>
  )
}
