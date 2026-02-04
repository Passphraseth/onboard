'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Message {
  id: string
  sender: 'user' | 'assistant' | 'system'
  message: string
  timestamp: Date
}

interface SiteStatus {
  exists: boolean
  hasGeneratedHtml: boolean
  isGenerating: boolean
}

const PLANS = {
  starter: { name: 'Starter', price: 29, features: ['Single page website', 'Mobile responsive', '2 updates/month', 'yourname.onboard.site domain'] },
  growth: { name: 'Growth', price: 49, features: ['Up to 5 pages', 'Custom domain included', '5 updates/month', 'Booking widget', 'Instagram feed'] },
  pro: { name: 'Pro', price: 79, features: ['Unlimited pages', 'Priority support', 'Unlimited updates', 'Payment integration', 'Advanced analytics'] },
}

function ClaimPageContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string

  const [loading, setLoading] = useState(true)
  const [businessName, setBusinessName] = useState('')
  const [leadId, setLeadId] = useState<string | null>(null)
  const [siteStatus, setSiteStatus] = useState<SiteStatus>({ exists: false, hasGeneratedHtml: false, isGenerating: false })
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [sending, setSending] = useState(false)
  const [mobileView, setMobileView] = useState<'chat' | 'preview'>('chat')
  const [iframeKey, setIframeKey] = useState(0)
  const [showPricing, setShowPricing] = useState(searchParams.get('tab') === 'pricing')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initial load - check site status and load data
  useEffect(() => {
    async function init() {
      try {
        // Get business info and lead ID
        const previewRes = await fetch(`/api/preview/${slug}`)
        if (previewRes.ok) {
          const previewData = await previewRes.json()
          setBusinessName(previewData.businessName || formatSlug(slug))
          if (previewData.leadId) setLeadId(previewData.leadId)
        } else {
          setBusinessName(formatSlug(slug))
        }

        // Check if site exists
        const statusRes = await fetch(`/api/admin/generate?slug=${slug}`)
        if (statusRes.ok) {
          const status = await statusRes.json()
          setSiteStatus({
            exists: status.exists,
            hasGeneratedHtml: status.hasGeneratedHtml,
            isGenerating: false
          })

          // Set initial message based on site status
          if (status.hasGeneratedHtml) {
            addSystemMessage(`Welcome back! Your site preview is ready on the right. 👉\n\nI can help you customize:\n• Colors & branding\n• Text & content\n• Layout & sections\n• Contact details\n\nWhat would you like to change?`)
          } else {
            addSystemMessage(`Hi! I see your site hasn't been generated yet.\n\nWould you like me to create your website now? Just say "Yes" or "Generate my site" to get started!`)
          }
        }

        // Load existing chat messages
        const chatRes = await fetch(`/api/chat?slug=${slug}`)
        if (chatRes.ok) {
          const chatData = await chatRes.json()
          if (chatData.messages?.length > 0) {
            setMessages(prev => [
              ...prev,
              ...chatData.messages.map((m: { id: string; sender: string; message: string; created_at: string }) => ({
                id: m.id,
                sender: m.sender as 'user' | 'assistant',
                message: m.message,
                timestamp: new Date(m.created_at)
              }))
            ])
          }
        }
      } catch (error) {
        console.error('Init error:', error)
        setBusinessName(formatSlug(slug))
        addSystemMessage(`Welcome! Let me help you with your website. What would you like to do?`)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [slug])

  function addSystemMessage(text: string) {
    setMessages(prev => [...prev, {
      id: `system-${Date.now()}`,
      sender: 'assistant',
      message: text,
      timestamp: new Date()
    }])
  }

  function formatSlug(s: string) {
    return s.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  async function handleSend() {
    if (!inputValue.trim() || sending) return

    const userMessage = inputValue.trim()
    setInputValue('')
    setSending(true)

    // Add user message immediately
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      message: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])

    try {
      // Check if user wants to generate site
      if (!siteStatus.hasGeneratedHtml &&
          userMessage.toLowerCase().match(/yes|generate|create|build|start|go ahead|do it|make/)) {
        // Trigger site generation
        setSiteStatus(prev => ({ ...prev, isGenerating: true }))
        addSystemMessage(`Great! I'm generating your website now. This takes about 30-60 seconds...\n\n⏳ Researching your industry...\n⏳ Creating design brief...\n⏳ Building your site...`)

        const genRes = await fetch('/api/admin/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug })
        })

        if (genRes.ok) {
          const result = await genRes.json()
          setSiteStatus({ exists: true, hasGeneratedHtml: true, isGenerating: false })
          setIframeKey(k => k + 1)
          addSystemMessage(`✅ Done! Your website for ${result.businessName} is ready!\n\nTake a look on the right and let me know what you'd like to change. I can update:\n• Colors & fonts\n• Headlines & text\n• Services listed\n• Contact info\n• Layout & sections`)
        } else {
          setSiteStatus(prev => ({ ...prev, isGenerating: false }))
          addSystemMessage(`Sorry, there was an issue generating your site. Please try again or contact support.`)
        }
      } else {
        // Normal chat - send to API
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, message: userMessage })
        })

        if (res.ok) {
          const data = await res.json()
          if (data.assistantMessage) {
            setMessages(prev => [...prev, {
              id: `assistant-${Date.now()}`,
              sender: 'assistant',
              message: data.assistantMessage.message,
              timestamp: new Date()
            }])
          }
          // Auto-refresh preview if site was updated
          if (data.siteUpdated) {
            setIframeKey(k => k + 1)
          }
        }
      }
    } catch (error) {
      console.error('Send error:', error)
      addSystemMessage(`Sorry, something went wrong. Please try again.`)
    } finally {
      setSending(false)
    }
  }

  // Loading site data
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4 animate-pulse">✨</div>
          <div className="text-xl font-bold">Loading your preview...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-black text-white flex flex-col">
      {/* Header */}
      <header className="px-4 md:px-6 py-3 flex justify-between items-center border-b border-white/10 shrink-0">
        <Link href="/" className="text-lg font-black">
          Onboard 🛫
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm opacity-70 hidden sm:block">Customizing</span>
          <span className="font-bold text-brand-lime">{businessName}</span>
        </div>
        <button onClick={() => setShowPricing(true)} className="btn btn-lime text-sm py-2 px-4 hidden md:flex">
          Choose Plan →
        </button>
      </header>

      {/* Mobile Toggle */}
      <div className="md:hidden flex border-b border-white/10">
        <button
          onClick={() => setMobileView('chat')}
          className={`flex-1 py-3 text-sm font-bold ${mobileView === 'chat' ? 'text-brand-lime border-b-2 border-brand-lime' : 'opacity-60'}`}
        >
          💬 Customize
        </button>
        <button
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-3 text-sm font-bold ${mobileView === 'preview' ? 'text-brand-lime border-b-2 border-brand-lime' : 'opacity-60'}`}
        >
          👀 Preview
        </button>
      </div>

      {/* Main Content - Two Column */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Column - Chat */}
        <div className={`w-full md:w-[400px] lg:w-[450px] flex flex-col border-r border-white/10 bg-[#0a0a0a] min-h-0 ${mobileView !== 'chat' ? 'hidden md:flex' : 'flex'}`}>
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10">
            <h2 className="font-bold text-lg">Customize Your Site ✨</h2>
            <p className="text-sm opacity-60 mt-1">Tell me what you'd like to change</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.sender === 'user'
                      ? 'bg-brand-blue text-white rounded-br-md'
                      : 'bg-white/10 text-white rounded-bl-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            ))}
            {(sending || siteStatus.isGenerating) && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-lime rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-brand-lime rounded-full animate-pulse delay-100" />
                    <div className="w-2 h-2 bg-brand-lime rounded-full animate-pulse delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your request..."
                disabled={sending || siteStatus.isGenerating}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-brand-blue disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || sending || siteStatus.isGenerating}
                className="bg-brand-lime text-black px-4 py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-brand-lime/90 transition-colors"
              >
                ➤
              </button>
            </form>
            <p className="text-xs opacity-40 mt-2 text-center">
              Changes are noted and applied after you subscribe
            </p>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-white/10 grid grid-cols-2 gap-2">
            <QuickAction
              icon="🎨"
              label="Change Colors"
              onClick={() => setInputValue('I want to change the colors to ')}
            />
            <QuickAction
              icon="✏️"
              label="Edit Text"
              onClick={() => setInputValue('Please update the headline to ')}
            />
            <QuickAction
              icon="📞"
              label="Update Contact"
              onClick={() => setInputValue('Update my phone number to ')}
            />
            <QuickAction
              icon="➕"
              label="Add Service"
              onClick={() => setInputValue('Add a new service called ')}
            />
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className={`flex-1 flex flex-col bg-[#111] ${mobileView !== 'preview' ? 'hidden md:flex' : 'flex'}`}>
          {/* Preview Header */}
          <div className="p-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm text-white/60 ml-2">{slug}.onboard.site</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIframeKey(k => k + 1)}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                🔄 Refresh
              </button>
              <Link
                href={`/site/${slug}`}
                target="_blank"
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                ↗ Open
              </Link>
            </div>
          </div>

          {/* Preview Frame */}
          <div className="flex-1 bg-white overflow-hidden">
            {siteStatus.hasGeneratedHtml ? (
              <iframe
                key={iframeKey}
                src={`/site/${slug}`}
                className="w-full h-full border-0"
                title={`Preview of ${businessName}`}
              />
            ) : siteStatus.isGenerating ? (
              <div className="h-full flex items-center justify-center bg-gradient-to-br from-brand-blue/20 to-brand-black">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4 animate-spin">⚙️</div>
                  <div className="text-xl font-bold mb-2">Generating your site...</div>
                  <div className="text-sm opacity-60">This takes about 30-60 seconds</div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center max-w-md p-8">
                  <div className="text-6xl mb-4">🚀</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to build your site?</h2>
                  <p className="text-gray-600 mb-6">
                    Use the chat on the left to tell me about your business, or just say "Generate my site" to get started!
                  </p>
                  <button
                    onClick={() => {
                      setInputValue('Yes, generate my site!')
                      setMobileView('chat')
                    }}
                    className="bg-brand-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-blue/90 transition-colors"
                  >
                    Generate My Site →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden p-4 border-t border-white/10">
        <button onClick={() => setShowPricing(true)} className="btn btn-lime w-full justify-center">
          Choose Plan & Go Live →
        </button>
      </div>

      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold">Choose Your Plan</h2>
                <p className="text-neutral-400 text-sm mt-1">Go live with {businessName}</p>
              </div>
              <button
                onClick={() => setShowPricing(false)}
                className="text-neutral-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Plans */}
            <div className="p-6 grid md:grid-cols-3 gap-4">
              {/* Starter */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-neutral-400 text-sm mb-1">Starter</div>
                <div className="text-3xl font-bold mb-1">
                  $29<span className="text-lg text-neutral-500">/mo</span>
                </div>
                <div className="text-neutral-500 text-sm mb-6">Get online quickly</div>
                <ul className="space-y-2 mb-6">
                  {PLANS.starter.features.map((f) => (
                    <li key={f} className="text-sm text-neutral-400 flex gap-2">
                      <span className="text-brand-lime">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/checkout?plan=starter&slug=${slug}${leadId ? `&lead=${leadId}` : ''}`}
                  className="btn btn-secondary w-full justify-center"
                >
                  Get Started
                </Link>
              </div>

              {/* Growth - Featured */}
              <div className="bg-white/5 border-2 border-brand-lime rounded-xl p-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-lime text-black px-3 py-1 rounded-full text-xs font-bold">
                  Most Popular
                </div>
                <div className="text-neutral-400 text-sm mb-1">Growth</div>
                <div className="text-3xl font-bold mb-1">
                  $49<span className="text-lg text-neutral-500">/mo</span>
                </div>
                <div className="text-neutral-500 text-sm mb-6">Best for growing businesses</div>
                <ul className="space-y-2 mb-6">
                  {PLANS.growth.features.map((f) => (
                    <li key={f} className="text-sm text-neutral-400 flex gap-2">
                      <span className="text-brand-lime">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/checkout?plan=growth&slug=${slug}${leadId ? `&lead=${leadId}` : ''}`}
                  className="btn btn-lime w-full justify-center"
                >
                  Get Started
                </Link>
              </div>

              {/* Pro */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-neutral-400 text-sm mb-1">Pro</div>
                <div className="text-3xl font-bold mb-1">
                  $79<span className="text-lg text-neutral-500">/mo</span>
                </div>
                <div className="text-neutral-500 text-sm mb-6">For established businesses</div>
                <ul className="space-y-2 mb-6">
                  {PLANS.pro.features.map((f) => (
                    <li key={f} className="text-sm text-neutral-400 flex gap-2">
                      <span className="text-brand-lime">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/checkout?plan=pro&slug=${slug}${leadId ? `&lead=${leadId}` : ''}`}
                  className="btn btn-secondary w-full justify-center"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Footer note */}
            <div className="p-6 pt-0 text-center text-neutral-500 text-sm">
              All plans include hosting, SSL, and 24/7 support. Cancel anytime.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function QuickAction({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs transition-colors"
    >
      <span>{icon}</span>
      <span className="opacity-80">{label}</span>
    </button>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center">
      <div className="text-center text-white">
        <div className="text-6xl mb-4 animate-pulse">✨</div>
        <div className="text-xl font-bold">Loading...</div>
      </div>
    </div>
  )
}

export default function ClaimPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ClaimPageContent />
    </Suspense>
  )
}
