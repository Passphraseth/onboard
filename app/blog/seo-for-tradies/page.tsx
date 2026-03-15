import { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema, FAQSchema } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'SEO for Tradies: How to Get Found on Google Without Paying for Ads | Onboard',
  description:
    'Learn how SEO works for Australian tradies. Simple, no-jargon guide to ranking on Google, setting up Google Business Profile, and getting free organic leads.',
  keywords: [
    'seo for tradies',
    'tradie seo',
    'how to rank on google as a tradie',
    'local seo tradies',
    'google business profile tradies',
    'tradie google ranking',
    'seo for trade businesses',
  ],
  openGraph: {
    title: 'SEO for Tradies: How to Get Found on Google Without Paying for Ads | Onboard',
    description:
      'Learn how SEO works for Australian tradies. Simple, no-jargon guide to ranking on Google, setting up Google Business Profile, and getting free organic leads.',
    url: 'https://onboard.com.au/blog/seo-for-tradies',
    type: 'article',
  },
}

export default function SeoForTradies() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://onboard.com.au' },
    { name: 'Blog', url: 'https://onboard.com.au/blog' },
    {
      name: 'SEO for Tradies',
      url: 'https://onboard.com.au/blog/seo-for-tradies',
    },
  ]

  const faqs = [
    {
      question: 'How long does SEO take to work for tradies?',
      answer:
        'Most tradies start seeing results within 3 to 6 months. Local SEO tends to kick in faster than broader keywords. If you optimise your Google Business Profile straight away, you could appear in the local map pack within weeks. Full organic rankings for competitive keywords typically take 6 to 12 months.',
    },
    {
      question: 'Do I need to pay for SEO as a tradie?',
      answer:
        'You do not need to pay for ongoing SEO services if your website is built properly from the start. A well-structured tradie website with the right content and local targeting handles most of the heavy lifting. With Onboard, SEO fundamentals are baked into every site we build.',
    },
    {
      question: 'What is the difference between SEO and Google Ads?',
      answer:
        'Google Ads are paid listings that appear at the top of search results. You pay every time someone clicks. SEO is the process of ranking in the free organic results below the ads. SEO takes longer to kick in but costs nothing per click once you are ranking. Most tradies get better long-term ROI from SEO.',
    },
    {
      question: 'Can I do SEO myself or do I need an expert?',
      answer:
        'You can absolutely handle basic SEO yourself. Setting up Google Business Profile, getting reviews, and making sure your website mentions your services and service areas are all things you can do without any technical knowledge. For more advanced stuff like technical SEO and link building, a professional can help speed things up.',
    },
    {
      question: 'What is the most important SEO factor for tradies?',
      answer:
        'For tradies, Google Business Profile is the single most impactful SEO factor. It determines whether you show up in the local map pack, which is where most customers look first. After that, having a mobile-friendly website with service and location pages is the next biggest factor.',
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
            <span>14 min read</span>
            <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
              SEO
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            SEO for Tradies: How to Get Found on Google Without Paying for Ads
          </h1>
          <p className="text-xl text-gray-400">
            A straight-talking, no-jargon guide to getting your trade business ranking on Google.
            No marketing degree required.
          </p>
        </header>

        <div className="prose prose-invert prose-lg">
          <p>
            Every day, thousands of Australians jump on Google and search for a tradie. &ldquo;Plumber
            near me.&rdquo; &ldquo;Electrician Western Sydney.&rdquo; &ldquo;Carpenter Melbourne
            northern suburbs.&rdquo;
          </p>
          <p>
            If your business isn&apos;t showing up in those results, someone else is getting those
            jobs. And here&apos;s the thing: you don&apos;t need to spend a fortune on Google Ads
            to be visible. You just need to understand the basics of SEO.
          </p>
          <p>
            SEO sounds technical and complicated, but for tradies, it really isn&apos;t. Most of it
            is common sense once someone explains it in plain English. That&apos;s exactly what
            we&apos;re going to do in this guide.
          </p>

          <h2>What Is SEO, Actually?</h2>
          <p>
            SEO stands for Search Engine Optimisation. In plain English, it means making your
            website and online presence attractive to Google so it shows your business when people
            search for what you do.
          </p>
          <p>
            When someone searches &ldquo;plumber Parramatta&rdquo;, Google looks at every website
            it knows about and picks the ones it thinks are the best match. SEO is the process of
            convincing Google that <em>your</em> website is the best match.
          </p>
          <p>
            There are two main types of results on Google:
          </p>
          <ul>
            <li>
              <strong>Paid ads:</strong> Those listings at the top with the little &ldquo;Sponsored&rdquo;
              tag. Businesses pay Google every time someone clicks on them.
            </li>
            <li>
              <strong>Organic results:</strong> Everything below the ads. These are free. You
              can&apos;t pay to be here. You have to earn it through SEO.
            </li>
          </ul>
          <p>
            There&apos;s also the <strong>local map pack</strong>, that box with three businesses
            and a map that appears for local searches. This is absolute gold for tradies, and
            it&apos;s driven largely by your Google Business Profile. More on that in a tick.
          </p>

          <h2>Why SEO Matters for Tradies</h2>
          <p>
            Let&apos;s be real: most tradies get work through word-of-mouth, and that&apos;s
            brilliant. But there are only so many hours in the day, and word-of-mouth has a ceiling.
          </p>
          <p>
            SEO breaks through that ceiling. Here&apos;s why it matters:
          </p>
          <ul>
            <li>
              <strong>Free leads, forever:</strong> Once you rank, every click is free. No per-lead
              fees like Hipages. No cost-per-click like Google Ads.
            </li>
            <li>
              <strong>High-intent customers:</strong> Someone Googling &ldquo;emergency electrician
              near me&rdquo; at 9pm needs you <em>now</em>. These are the best leads you&apos;ll
              ever get.
            </li>
            <li>
              <strong>Trust:</strong> People trust organic Google results more than ads. Ranking
              high makes you look established and legitimate.
            </li>
            <li>
              <strong>Compounding returns:</strong> Unlike ads that stop the moment you stop
              paying, SEO keeps working. Content you create today can bring leads for years.
            </li>
          </ul>
          <p>
            If you want to understand why having a website matters in the first place, have a read
            of our article on{' '}
            <Link href="/blog/do-tradies-need-a-website">whether tradies actually need a website</Link>.
            Spoiler: they do.
          </p>

          <h2>Google Business Profile: Your Number One Priority</h2>
          <p>
            If you do nothing else from this article, do this: set up and optimise your Google
            Business Profile (GBP). It used to be called Google My Business, and it&apos;s the
            single most important thing for local tradie SEO.
          </p>
          <p>
            Your Google Business Profile is what shows up in the local map pack. When someone
            searches &ldquo;plumber near me&rdquo;, those three businesses with the map, phone
            numbers, and reviews? That&apos;s Google Business Profile.
          </p>
          <h3>How to Set It Up Right</h3>
          <ol>
            <li>
              <strong>Claim your profile:</strong> Go to{' '}
              <strong>business.google.com</strong> and claim or create your listing. Google will
              verify you, usually by postcard or phone.
            </li>
            <li>
              <strong>Fill in everything:</strong> Business name, address, phone number, website,
              hours, service areas. Leave nothing blank.
            </li>
            <li>
              <strong>Choose the right categories:</strong> Pick your primary trade as the main
              category, then add related categories. For example, &ldquo;Plumber&rdquo; as
              primary, with &ldquo;Water Heater Installation Service&rdquo; and &ldquo;Drain
              Cleaning Service&rdquo; as additional categories.
            </li>
            <li>
              <strong>Add photos:</strong> Photos of your work, your team, your van. Businesses
              with photos get 42% more direction requests and 35% more website clicks.
            </li>
            <li>
              <strong>Write a solid description:</strong> Mention your services, your service areas
              (suburbs, cities), and what makes you different. Use natural language, not keyword
              stuffing.
            </li>
            <li>
              <strong>Get reviews:</strong> This is massive. Ask every happy customer for a Google
              review. Respond to every review, good or bad. Businesses with more reviews rank
              higher and convert better.
            </li>
          </ol>

          <h2>Local SEO Basics: Ranking in Your Area</h2>
          <p>
            Local SEO is all about showing up when people in your area search for your services.
            For tradies, this is the bread and butter.
          </p>
          <h3>NAP Consistency</h3>
          <p>
            NAP stands for Name, Address, Phone number. Your business details need to be exactly
            the same everywhere they appear online: your website, Google Business Profile, Facebook,
            Yellow Pages, True Local, and anywhere else you&apos;re listed.
          </p>
          <p>
            Google cross-references these listings to verify your business is legit. If your phone
            number is different on your website versus your Google profile, it confuses Google and
            hurts your rankings.
          </p>
          <h3>Service Area Pages</h3>
          <p>
            This is one of the biggest wins for tradie SEO. Create pages on your website for each
            area you serve. Instead of one generic &ldquo;Our Services&rdquo; page, have:
          </p>
          <ul>
            <li>Plumber in Parramatta</li>
            <li>Plumber in Blacktown</li>
            <li>Plumber in Penrith</li>
            <li>Emergency Plumber Western Sydney</li>
          </ul>
          <p>
            Each page should have unique content about serving that area. Mention local landmarks,
            common issues in the area, and how quickly you can get there. This tells Google you
            genuinely serve those suburbs, not just that you&apos;ve listed them.
          </p>
          <h3>Service Pages</h3>
          <p>
            Similarly, have individual pages for each service you offer. Don&apos;t lump everything
            into one page. A dedicated &ldquo;Hot Water System Repair&rdquo; page will rank much
            better for that search than a generic services page that mentions it once.
          </p>

          <h2>What Makes a Tradie Website Rank on Google</h2>
          <p>
            Your <Link href="/websites-for-tradies">tradie website</Link> is the foundation of
            your SEO. Here&apos;s what Google looks at:
          </p>
          <h3>1. Mobile-Friendliness</h3>
          <p>
            More than 60% of searches happen on mobile phones. If your website doesn&apos;t work
            properly on a phone, Google will penalise you. It needs to load fast, be easy to read,
            and have buttons big enough to tap with a thumb.
          </p>
          <h3>2. Page Speed</h3>
          <p>
            Slow websites rank lower. Full stop. Google has confirmed this. Your site should load
            in under 3 seconds. Compress your images, use modern hosting, and keep things lean.
          </p>
          <h3>3. Quality Content</h3>
          <p>
            Google wants to show users the most helpful result. Your website content should
            genuinely answer the questions people are searching for. If someone searches
            &ldquo;how much does a hot water system cost&rdquo;, and your website has a detailed,
            honest answer, Google will love you for it.
          </p>
          <h3>4. Technical SEO</h3>
          <p>
            This is the behind-the-scenes stuff: proper page titles, meta descriptions, header
            tags, image alt text, schema markup, and clean URLs. You don&apos;t need to understand
            all of this. A well-built website handles it automatically.
          </p>
          <p>
            That&apos;s exactly what we do at <Link href="/onboard">Onboard</Link>. Every website
            we build comes with all the technical SEO sorted from day one. You focus on the
            tools. We handle the tech.
          </p>
          <h3>5. Backlinks</h3>
          <p>
            Backlinks are links from other websites pointing to yours. Think of them as votes of
            confidence. The more reputable websites that link to you, the more Google trusts you.
          </p>
          <p>
            For tradies, easy backlinks include: local business directories (Yellow Pages, True
            Local, Oneflare), your local council&apos;s business directory, industry association
            websites, and supplier websites that list their recommended installers.
          </p>

          <h2>Content Tips for Tradies Who Hate Writing</h2>
          <p>
            We get it. You became a tradie to work with your hands, not sit at a computer writing
            blog posts. Here&apos;s the good news: you don&apos;t need to write essays. You just
            need to answer the questions your customers are already asking.
          </p>
          <h3>Easy Content Ideas</h3>
          <ul>
            <li>
              <strong>&ldquo;How much does X cost?&rdquo; pages:</strong> People search for pricing
              all the time. Be the one who gives them a straight answer.
            </li>
            <li>
              <strong>Before and after galleries:</strong> Show your work. Photos are content too,
              and they keep people on your site longer.
            </li>
            <li>
              <strong>Common problem pages:</strong> &ldquo;Why is my hot water system making
              noise?&rdquo; or &ldquo;Signs you need to rewire your house.&rdquo; Answer the
              question, then offer your services.
            </li>
            <li>
              <strong>Area guides:</strong> &ldquo;Common plumbing issues in older Melbourne
              homes&rdquo; or &ldquo;Why Brisbane homes need regular electrical inspections.&rdquo;
            </li>
            <li>
              <strong>FAQs:</strong> Write down the 10 questions you get asked most often. Each
              one is a piece of content.
            </li>
          </ul>
          <p>
            You don&apos;t need to publish every week. Even a handful of solid, helpful pages can
            make a massive difference to your rankings.
          </p>

          <h2>Common SEO Mistakes Tradies Make</h2>
          <p>
            We see these over and over again. Avoid them and you&apos;re already ahead of most of
            your competition:
          </p>
          <h3>1. No Website at All</h3>
          <p>
            Relying entirely on Facebook or Hipages means you&apos;re invisible to Google organic
            search. A Facebook page is not a substitute for a website.
          </p>
          <h3>2. DIY Website Builder Disasters</h3>
          <p>
            Those free Wix or Squarespace sites look nice but often have terrible SEO under the
            hood. Slow loading, bloated code, and limited customisation. If you&apos;re going to
            have a website, do it properly.
          </p>
          <h3>3. Ignoring Google Business Profile</h3>
          <p>
            Your GBP might be the most visited page about your business on the internet. Treat it
            like your shopfront. Keep it updated, respond to reviews, and post regularly.
          </p>
          <h3>4. Keyword Stuffing</h3>
          <p>
            Writing &ldquo;best plumber Sydney cheap plumber Sydney affordable plumber Sydney&rdquo;
            everywhere doesn&apos;t work. Google is smart enough to recognise this and will
            actually penalise you for it. Write naturally.
          </p>
          <h3>5. Not Having Service Area Pages</h3>
          <p>
            If you serve 15 suburbs but your website only mentions your home suburb, you&apos;re
            missing out on 14 suburbs worth of searches.
          </p>
          <h3>6. Forgetting About Reviews</h3>
          <p>
            Reviews are a ranking factor AND a conversion factor. A tradie with 50 five-star
            reviews will outrank and outconvert a tradie with zero reviews every single time.
          </p>

          <h2>Realistic Timelines: What to Expect</h2>
          <p>
            SEO is not a magic button. Anyone who promises you page one rankings in a week is
            lying. Here&apos;s what realistic SEO timelines look like for tradies:
          </p>
          <ul>
            <li>
              <strong>Week 1-2:</strong> Google Business Profile optimised, website launched with
              proper structure.
            </li>
            <li>
              <strong>Month 1-2:</strong> Google indexes your site, you start appearing in results
              for long-tail keywords (specific, less competitive searches).
            </li>
            <li>
              <strong>Month 3-4:</strong> Local map pack appearances start. Reviews are building.
              You&apos;re getting a trickle of organic traffic.
            </li>
            <li>
              <strong>Month 4-6:</strong> Organic leads start coming in regularly. You&apos;re
              ranking for your main keywords in your service areas.
            </li>
            <li>
              <strong>Month 6-12:</strong> Strong rankings established. Consistent lead flow.
              Starting to rank for competitive keywords.
            </li>
            <li>
              <strong>Year 2+:</strong> Dominant local presence. Consistent leads. Competitors
              are wondering how you do it.
            </li>
          </ul>
          <p>
            The key is to start. Every month you wait is a month your competitors are getting ahead.
          </p>

          <h2>SEO for Specific Trades</h2>
          <p>
            While the fundamentals apply to all trades, some have specific considerations:
          </p>
          <ul>
            <li>
              <strong><Link href="/websites-for-plumbers">Plumbers</Link>:</strong> Emergency
              keywords are gold. &ldquo;Emergency plumber&rdquo; searches convert incredibly well.
              Make sure you have a dedicated emergency services page.
            </li>
            <li>
              <strong><Link href="/websites-for-electricians">Electricians</Link>:</strong> Safety
              content performs well. Articles about electrical safety, switchboard upgrades, and
              smoke alarm regulations build authority and rank for informational searches.
            </li>
            <li>
              <strong>Builders:</strong> Portfolio content is crucial. Before-and-after photo
              galleries with project descriptions rank well and convert like crazy.
            </li>
            <li>
              <strong>HVAC:</strong> Seasonal keywords matter. Optimise for heating in autumn and
              cooling in spring to catch people before peak demand.
            </li>
          </ul>

          <h2>Free SEO Audit: See Where You Stand</h2>
          <p>
            Not sure how your current online presence stacks up? We offer a{' '}
            <Link href="/free-audit">free SEO audit</Link> for any tradie business. We&apos;ll
            check your Google Business Profile, your website (if you have one), your local
            rankings, and your online reviews, then give you a clear action plan.
          </p>
          <p>
            No obligation, no sales pitch. Just honest advice on what&apos;s working and
            what&apos;s not.
          </p>

          <h2>The Bottom Line</h2>
          <p>
            SEO for tradies isn&apos;t rocket science. It&apos;s about having a proper website,
            an optimised Google Business Profile, good reviews, and content that answers the
            questions your customers are asking.
          </p>
          <p>
            You don&apos;t need to become a marketing expert. You don&apos;t need to spend
            thousands on an SEO agency. You just need the foundations done right, and then
            consistency.
          </p>
          <p>
            At <Link href="/onboard">Onboard</Link>, we build tradie websites with SEO baked in
            from day one. Proper structure, local targeting, fast loading, mobile-friendly, the
            works. $495 to set up, $79 a month to keep it running. You focus on the job site. We
            make sure Google sends people your way.
          </p>
          <p>
            For more on marketing your trade business, check out our comprehensive{' '}
            <Link href="/blog/tradie-marketing">Tradie Marketing Guide</Link>.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>How long does SEO take to work for tradies?</h3>
          <p>
            Most tradies start seeing results within 3 to 6 months. Local SEO tends to kick in
            faster than broader keywords. If you optimise your Google Business Profile straight
            away, you could appear in the local map pack within weeks. Full organic rankings for
            competitive keywords typically take 6 to 12 months.
          </p>

          <h3>Do I need to pay for SEO as a tradie?</h3>
          <p>
            You do not need to pay for ongoing SEO services if your website is built properly from
            the start. A well-structured tradie website with the right content and local targeting
            handles most of the heavy lifting. With Onboard, SEO fundamentals are baked into every
            site we build.
          </p>

          <h3>What is the difference between SEO and Google Ads?</h3>
          <p>
            Google Ads are paid listings that appear at the top of search results. You pay every
            time someone clicks. SEO is the process of ranking in the free organic results below
            the ads. SEO takes longer to kick in but costs nothing per click once you are ranking.
            Most tradies get better long-term ROI from SEO.
          </p>

          <h3>Can I do SEO myself or do I need an expert?</h3>
          <p>
            You can absolutely handle basic SEO yourself. Setting up Google Business Profile,
            getting reviews, and making sure your website mentions your services and service areas
            are all things you can do without any technical knowledge. For more advanced stuff like
            technical SEO and link building, a professional can help speed things up.
          </p>

          <h3>What is the most important SEO factor for tradies?</h3>
          <p>
            For tradies, Google Business Profile is the single most impactful SEO factor. It
            determines whether you show up in the local map pack, which is where most customers
            look first. After that, having a mobile-friendly website with service and location
            pages is the next biggest factor.
          </p>
        </div>
      </article>
    </>
  )
}
