import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | Onboard - Website Tips for Australian Small Business',
  description: 'Tips, guides, and insights for Australian small business owners looking to improve their online presence.',
}

const posts = [
  {
    slug: 'plumber-website-design',
    title: 'Plumber Website Design: What Every Plumbing Business Needs Online',
    excerpt: 'Your plumbing business needs more than a Facebook page. Learn what makes a great plumber website and how to get one without the tech headaches.',
    date: 'March 2026',
    readTime: '10 min read',
  },
  {
    slug: 'seo-for-tradies',
    title: 'SEO for Tradies: How to Get Found on Google Without Paying for Ads',
    excerpt: 'SEO sounds complicated, but for tradies it boils down to a few things done right. Here\'s how to show up when locals search for your trade.',
    date: 'March 2026',
    readTime: '11 min read',
  },
  {
    slug: 'hipages-vs-own-website',
    title: 'Hipages vs Your Own Website: Which Gets More Jobs?',
    excerpt: 'Hipages charges $21-$60 per lead. Your own website? $2-$14. We break down the real cost comparison and when to use each.',
    date: 'March 2026',
    readTime: '10 min read',
  },
  {
    slug: 'best-website-builder-for-tradies',
    title: 'Best Website Builder for Tradies: 2026 Comparison',
    excerpt: 'Wix, Squarespace, WordPress, or done-for-you? We compare the best website builders for tradies based on what actually matters.',
    date: 'March 2026',
    readTime: '11 min read',
  },
  {
    slug: 'tradie-website-cost',
    title: 'How Much Does a Tradie Website Cost? (2026 Honest Guide)',
    excerpt: 'From free DIY to $15,000 agencies — here\'s what a tradie website actually costs and what you get at each price point.',
    date: 'March 2026',
    readTime: '10 min read',
  },
  {
    slug: 'small-business-website-cost-australia',
    title: 'How Much Does a Website Cost for a Small Business in Australia? (2026)',
    excerpt: 'The honest answer to what a small business website costs in Australia — from DIY to agency to done-for-you, with hidden costs most people forget.',
    date: 'March 2026',
    readTime: '12 min read',
  },
  {
    slug: 'tradie-marketing',
    title: 'Tradie Marketing: 7 Ways to Get More Jobs Without Wasting Money (2026 Guide)',
    excerpt: 'Word of mouth dries up. Learn the 7 tradie marketing strategies that actually bring in jobs — from websites to Google Ads — and what each one costs.',
    date: 'March 2026',
    readTime: '12 min read',
  },
  {
    slug: 'do-tradies-need-a-website',
    title: 'Do Tradies Need a Website in 2026? (Yes — Here\'s Why)',
    excerpt: 'Word of mouth is still gold, but 87% of Australians search online before hiring a tradie. No website = invisible to most potential customers.',
    date: 'February 2026',
    readTime: '5 min read',
  },
  {
    slug: 'best-website-builders-small-business-australia',
    title: 'Best Website Builders for Australian Small Business (2026)',
    excerpt: 'Squarespace, Wix, WordPress, Shopify — which one actually works for Aussie service businesses? We break it down.',
    date: 'February 2026',
    readTime: '8 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold tracking-tight mb-4">Blog</h1>
        <p className="text-neutral-400 text-lg">
          Tips and insights for Australian small business owners.
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-neutral-800 pb-8">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-2xl font-semibold tracking-tight mb-3 group-hover:text-neutral-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-neutral-400 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-neutral-500">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
