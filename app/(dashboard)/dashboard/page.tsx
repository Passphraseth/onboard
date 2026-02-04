'use client'

import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface UserData {
  id: string
  email: string
  businessName: string
  slug: string
  plan: string
  status: string
}

interface SiteData {
  id: string
  status: string
  hasContent: boolean
}

interface UpdateRequest {
  id: string
  message: string
  status: string
  created_at: string
}

interface SessionData {
  authenticated: boolean
  user: UserData
  site: SiteData | null
  updateRequests: number
}

function DashboardContent() {
  const router = useRouter()
  const [session, setSession] = useState<SessionData | null>(null)
  const [updates, setUpdates] = useState<UpdateRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [updateMessage, setUpdateMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/session')
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated) {
            setSession(data)
            // Fetch update requests
            fetchUpdates(data.user.id)
          } else {
            router.push('/login')
          }
        } else {
          router.push('/login')
        }
      } catch {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  async function fetchUpdates(leadId: string) {
    try {
      const res = await fetch(`/api/updates?leadId=${leadId}`)
      if (res.ok) {
        const data = await res.json()
        setUpdates(data.updates || [])
      }
    } catch (error) {
      console.error('Failed to fetch updates:', error)
    }
  }

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!updateMessage.trim() || !session?.user) return

    setSending(true)
    setSubmitSuccess(false)

    try {
      const res = await fetch('/api/updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: session.user.id,
          message: updateMessage,
        }),
      })

      if (res.ok) {
        setSubmitSuccess(true)
        setUpdateMessage('')
        fetchUpdates(session.user.id)
      }
    } catch (error) {
      console.error('Failed to send update:', error)
    } finally {
      setSending(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/session', { method: 'DELETE' })
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-lg opacity-70">Loading your dashboard...</div>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return null // Will redirect to login
  }

  const user = session.user
  const site = session.site
  const siteUrl = `${user.slug}.onboard.site`

  const planLimits: Record<string, number> = {
    starter: 2,
    growth: 5,
    pro: 999
  }

  const planNames: Record<string, string> = {
    starter: 'Starter 🌱',
    growth: 'Growth 🚀',
    pro: 'Pro 👑',
  }

  const currentMonthUpdates = updates.filter(u => {
    const date = new Date(u.created_at)
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">
      {/* Sidebar */}
      <aside className="w-60 bg-brand-black border-r border-white/10 p-4 hidden md:flex flex-col">
        <Link href="/" className="text-lg font-black block mb-8">
          Onboard 🛫
        </Link>

        <nav className="space-y-1 flex-1">
          <NavItem href="/dashboard" icon="📊" active>
            Dashboard
          </NavItem>
          <NavItem href={`/site/${user.slug}`} icon="🌐" external>
            View My Site
          </NavItem>
          <NavItem href="mailto:hello@onboard.com.au" icon="💬">
            Support
          </NavItem>
        </nav>

        <div className="mt-auto">
          <div className="p-4 bg-white/5 rounded-xl mb-4">
            <div className="text-sm opacity-60 mb-1">Your Plan</div>
            <div className="font-bold">{planNames[user.plan] || user.plan}</div>
            {user.plan !== 'pro' && (
              <button className="text-xs text-brand-lime hover:underline mt-2 block">
                Upgrade →
              </button>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black">Hey {user.businessName}! 👋</h1>
            <p className="text-sm opacity-60 mt-1">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/site/${user.slug}`}
              target="_blank"
              className="btn btn-lime text-sm py-2"
            >
              🌐 View My Site
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Site Status"
            value={
              site?.status === 'active' ? (
                <span className="text-emerald-400">● Live</span>
              ) : site?.hasContent ? (
                <span className="text-yellow-400">● Ready</span>
              ) : (
                <span className="text-white/60">● Pending</span>
              )
            }
          />
          <StatCard
            label="Updates This Month"
            value={
              <span className="text-brand-lime">
                {currentMonthUpdates} / {planLimits[user.plan] === 999 ? '∞' : planLimits[user.plan]}
              </span>
            }
          />
          <StatCard label="Your Plan" value={planNames[user.plan] || user.plan} />
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
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-white/40 outline-none focus:border-brand-lime min-h-[100px] resize-y"
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
                <a href="mailto:hello@onboard.com.au" className="text-brand-lime hover:underline">
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
          <MobileNavItem href="/dashboard" icon="📊" label="Home" active />
          <MobileNavItem href={`/site/${user.slug}`} icon="🌐" label="Site" external />
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
        <div className="w-8 h-8 border-2 border-brand-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
