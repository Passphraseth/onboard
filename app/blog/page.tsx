import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | Onboard - Website Tips for Australian Small Business',
  description: 'Tips, guides, and insights for Australian small business owners looking to improve their online presence.',
}

const posts = [
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
