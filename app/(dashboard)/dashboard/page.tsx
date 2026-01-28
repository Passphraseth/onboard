'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock data - in production this would come from Supabase
const mockCustomer = {
  firstName: 'John',
  businessName: "Smith's Plumbing",
  plan: 'growth',
  updatesUsed: 3,
  updatesLimit: 5,
  siteUrl: 'smithsplumbing.onboard.site',
  status: 'active',
}

const mockUpdates = [
  { id: '1', title: 'Changed business hours', date: 'Jan 25, 2026', status: 'completed' },
  { id: '2', title: 'Added new service photo', date: 'Jan 22, 2026', status: 'completed' },
  { id: '3', title: 'Updated contact phone', date: 'Jan 18, 2026', status: 'completed' },
]

export default function DashboardPage() {
  const [updateMessage, setUpdateMessage] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!updateMessage.trim()) return

    setSending(true)
    try {
      // In production, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Update request sent! We\'ll get back to you shortly.')
      setUpdateMessage('')
    } catch (error) {
      alert('Failed to send update request')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">
      {/* Sidebar */}
      <aside className="w-60 bg-brand-black border-r border-white/10 p-4 hidden md:block">
        <Link href="/" className="text-lg font-black block mb-8">
          Onboard 🛫
        </Link>

        <nav className="space-y-1">
          <NavItem href="/dashboard" icon="📊" active>Dashboard</NavItem>
          <NavItem href="/dashboard/updates" icon="✏️">Request Update</NavItem>
          <NavItem href={`https://${mockCustomer.siteUrl}`} icon="🌐" external>View My Site</NavItem>
          <NavItem href="/dashboard/history" icon="📝">Update History</NavItem>
          <NavItem href="/dashboard/billing" icon="💳">Billing</NavItem>
          <NavItem href="/dashboard/support" icon="💬">Support</NavItem>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-black">Hey {mockCustomer.firstName}! 👋</h1>
          <div className="flex gap-3">
            <a
              href={`https://${mockCustomer.siteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline border-white/20 text-sm py-2"
            >
              View Site
            </a>
            <button className="btn btn-lime text-sm py-2">
              Request Update
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Site Status"
            value={<span className="text-emerald-400">● Live</span>}
          />
          <StatCard
            label="Updates Used"
            value={
              <span className="text-brand-lime">
                {mockCustomer.updatesUsed} / {mockCustomer.updatesLimit}
              </span>
            }
          />
          <StatCard
            label="Plan"
            value={`Growth 🚀`}
          />
        </div>

        {/* Quick Update */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">Quick Update ✏️</h2>
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
                Or text us at 0400 XXX XXX 💬
              </span>
            </div>
          </form>
        </div>

        {/* Recent Updates */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Recent Updates</h2>
            <Link href="/dashboard/history" className="text-brand-blue text-sm hover:underline">
              View All →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {mockUpdates.map((update) => (
              <div key={update.id} className="py-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{update.title}</h4>
                  <p className="text-sm opacity-50">{update.date}</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                  Done ✅
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="fixed bottom-0 left-0 right-0 bg-brand-black border-t border-white/10 p-4 flex justify-around md:hidden">
          <MobileNavItem href="/dashboard" icon="📊" label="Home" active />
          <MobileNavItem href="/dashboard/updates" icon="✏️" label="Update" />
          <MobileNavItem href="/dashboard/billing" icon="💳" label="Billing" />
          <MobileNavItem href="/dashboard/support" icon="💬" label="Help" />
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
}: {
  href: string
  icon: string
  label: string
  active?: boolean
}) {
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

function StatCard({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <div className="text-sm opacity-60 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}
