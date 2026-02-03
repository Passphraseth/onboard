'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface CustomerData {
  id: string
  firstName: string
  businessName: string
  email: string
  phone?: string
  plan: string
  status: string
  siteUrl: string
  slug: string
  accessToken?: string
}

interface UpdateRequest {
  id: string
  message: string
  type: string
  status: string
  created_at: string
  completed_at?: string
}

interface DashboardData {
  customer: CustomerData
  updates: UpdateRequest[]
  stats: {
    updatesUsed: number
    updatesLimit: number
    status: string
  }
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const leadId = searchParams.get('id')
  const email = searchParams.get('email')

  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [updateMessage, setUpdateMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const params = new URLSearchParams()
        if (leadId) params.set('leadId', leadId)
        if (email) params.set('email', email)

        const res = await fetch(`/api/dashboard?${params}`)
        if (res.ok) {
          const dashboardData = await res.json()
          setData(dashboardData)
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    if (leadId || email) {
      fetchData()
    } else {
      setLoading(false)
    }
  }, [leadId, email])

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!updateMessage.trim() || !data?.customer) return

    setSending(true)
    setSubmitSuccess(false)

    try {
      const res = await fetch('/api/updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: data.customer.id,
          message: updateMessage,
        }),
      })

      if (res.ok) {
        setSubmitSuccess(true)
        setUpdateMessage('')
        // Refresh data
        const refreshRes = await fetch(`/api/dashboard?leadId=${data.customer.id}`)
        if (refreshRes.ok) {
          const newData = await refreshRes.json()
          setData(newData)
        }
      }
    } catch (error) {
      console.error('Failed to send update:', error)
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">📊</div>
          <div className="text-lg opacity-70">Loading your dashboard...</div>
        </div>
      </div>
    )
  }

  if (!leadId && !email) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-2xl font-bold mb-4">Access Your Dashboard</h1>
          <p className="opacity-70 mb-8">
            Enter your email address to access your dashboard. We'll send you a magic link.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const email = formData.get('email') as string
              window.location.href = `/dashboard?email=${encodeURIComponent(email)}`
            }}
            className="space-y-4"
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-brand-blue"
            />
            <button type="submit" className="btn btn-lime w-full justify-center">
              Access Dashboard →
            </button>
          </form>
          <p className="text-sm opacity-50 mt-6">
            Don't have an account?{' '}
            <Link href="/" className="text-brand-blue hover:underline">
              Get started
            </Link>
          </p>
        </div>
      </div>
    )
  }

  if (!data?.customer) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">🤔</div>
          <h1 className="text-2xl font-bold mb-4">Customer Not Found</h1>
          <p className="opacity-70 mb-8">
            We couldn't find a customer with that email. Please check your email or get started with a new site.
          </p>
          <Link href="/" className="btn btn-lime">
            Get Started →
          </Link>
        </div>
      </div>
    )
  }

  const customer = data.customer
  const stats = data.stats
  const updates = data.updates

  const planNames: Record<string, string> = {
    starter: 'Starter 🌱',
    growth: 'Growth 🚀',
    pro: 'Pro 👑',
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">
      {/* Sidebar */}
      <aside className="w-60 bg-brand-black border-r border-white/10 p-4 hidden md:block">
        <Link href="/" className="text-lg font-black block mb-8">
          Onboard 🛫
        </Link>

        <nav className="space-y-1">
          <NavItem href={`/dashboard?id=${customer.id}`} icon="📊" active>
            Dashboard
          </NavItem>
          <NavItem href={`https://${customer.siteUrl}`} icon="🌐" external>
            View My Site
          </NavItem>
          <NavItem href="mailto:hello@onboard.com.au" icon="💬">
            Support
          </NavItem>
        </nav>

        <div className="mt-8 p-4 bg-white/5 rounded-xl">
          <div className="text-sm opacity-60 mb-1">Your Plan</div>
          <div className="font-bold">{planNames[customer.plan] || customer.plan}</div>
          {customer.plan !== 'pro' && (
            <Link
              href={`/pricing?upgrade=true&lead=${customer.id}`}
              className="text-xs text-brand-lime hover:underline mt-2 block"
            >
              Upgrade →
            </Link>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black">Hey {customer.firstName}! 👋</h1>
            <p className="text-sm opacity-60 mt-1">{customer.businessName}</p>
          </div>
          <div className="flex gap-3">
            <a
              href={`https://${customer.siteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lime text-sm py-2"
            >
              🌐 View My Site
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Site Status"
            value={
              stats.status === 'live' ? (
                <span className="text-emerald-400">● Live</span>
              ) : stats.status === 'pending' ? (
                <span className="text-yellow-400">● Pending</span>
              ) : (
                <span className="text-white/60">● {stats.status}</span>
              )
            }
          />
          <StatCard
            label="Updates This Month"
            value={
              <span className="text-brand-lime">
                {stats.updatesUsed} / {stats.updatesLimit === 999 ? '∞' : stats.updatesLimit}
              </span>
            }
          />
          <StatCard label="Your Plan" value={planNames[customer.plan] || customer.plan} />
        </div>

        {/* Quick Update */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">Quick Update Request ✏️</h2>

          {submitSuccess && (
            <div className="bg-emerald-500/20 text-emerald-400 px-4 py-3 rounded-lg mb-4">
              ✅ Update request sent! We'll get back to you within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmitUpdate}>
            <textarea
              value={updateMessage}
              onChange={(e) => setUpdateMessage(e.target.value)}
              placeholder="What do you need changed? e.g. 'Change hours to 8-5 weekdays' or 'Add a new service called Emergency Repairs'"
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-white/40 outline-none focus:border-brand-blue min-h-[100px] resize-y"
            />
            <div className="flex items-center gap-4 mt-4">
              <button
                type="submit"
                disabled={sending || !updateMessage.trim()}
                className="btn btn-lime disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send Request'}
              </button>
              <span className="text-sm opacity-50">
                Or email{' '}
                <a href="mailto:hello@onboard.com.au" className="text-brand-blue hover:underline">
                  hello@onboard.com.au
                </a>
              </span>
            </div>
          </form>
        </div>

        {/* Recent Updates */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
          <h2 className="font-bold text-lg mb-4">Recent Updates</h2>

          {updates.length === 0 ? (
            <div className="text-center py-8 opacity-60">
              <div className="text-3xl mb-2">📝</div>
              <p>No update requests yet.</p>
              <p className="text-sm">Use the form above to request your first update!</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {updates.slice(0, 5).map((update) => (
                <div key={update.id} className="py-4 flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{update.message}</p>
                    <p className="text-xs opacity-50 mt-1">
                      {new Date(update.created_at).toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <StatusBadge status={update.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <QuickAction
            icon="📞"
            label="Update Phone"
            onClick={() => setUpdateMessage('Please update my phone number to: ')}
          />
          <QuickAction
            icon="🕐"
            label="Update Hours"
            onClick={() => setUpdateMessage('Please update my business hours to: ')}
          />
          <QuickAction
            icon="📷"
            label="Add Photos"
            onClick={() => setUpdateMessage('I would like to add photos to my site. Here are the links: ')}
          />
          <QuickAction
            icon="✨"
            label="New Service"
            onClick={() => setUpdateMessage('Please add a new service called: ')}
          />
        </div>

        {/* Mobile nav */}
        <nav className="fixed bottom-0 left-0 right-0 bg-brand-black border-t border-white/10 p-4 flex justify-around md:hidden">
          <MobileNavItem href={`/dashboard?id=${customer.id}`} icon="📊" label="Home" active />
          <MobileNavItem href={`https://${customer.siteUrl}`} icon="🌐" label="Site" external />
          <MobileNavItem href="mailto:hello@onboard.com.au" icon="💬" label="Help" />
        </nav>
      </main>
    </div>
  )
}

function NavItem({
  href,
  icon,
  children,
  active = false,
  external = false,
}: {
  href: string
  icon: string
  children: React.ReactNode
  active?: boolean
  external?: boolean
}) {
  const className = `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
    active
      ? 'bg-brand-blue text-white'
      : 'text-white/60 hover:text-white hover:bg-white/5'
  }`

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <span>{icon}</span>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      <span>{icon}</span>
      {children}
    </Link>
  )
}

function MobileNavItem({
  href,
  icon,
  label,
  active = false,
  external = false,
}: {
  href: string
  icon: string
  label: string
  active?: boolean
  external?: boolean
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex flex-col items-center gap-1 text-xs ${
          active ? 'text-brand-lime' : 'text-white/60'
        }`}
      >
        <span className="text-lg">{icon}</span>
        {label}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 text-xs ${
        active ? 'text-brand-lime' : 'text-white/60'
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  )
}

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <div className="text-sm opacity-60 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    'in-progress': 'bg-blue-500/20 text-blue-400',
    completed: 'bg-emerald-500/20 text-emerald-400',
  }

  const labels: Record<string, string> = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Done ✅',
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
        styles[status] || 'bg-white/10 text-white/60'
      }`}
    >
      {labels[status] || status}
    </span>
  )
}

function QuickAction({
  icon,
  label,
  onClick,
}: {
  icon: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center hover:bg-white/[0.06] transition-colors"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xs opacity-70">{label}</div>
    </button>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4 animate-pulse">📊</div>
        <div className="text-lg opacity-70">Loading dashboard...</div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DashboardContent />
    </Suspense>
  )
}
