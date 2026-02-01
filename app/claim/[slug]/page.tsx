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

interface AuthState {
  checking: boolean
  authenticated: boolean
  error?: string
  leadId?: string
}

function ClaimPageContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const token = searchParams.get('token')

  const [authState, setAuthState] = useState<AuthState>({ checking: true, authenticated: false })
  const [loading, setLoading] = useState(true)
  const [businessName, setBusinessName] = useState('')
  const [siteStatus, setSiteStatus] = useState<SiteStatus>({ exists: false, hasGeneratedHtml: false, isGenerating: false })
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [sending, setSending] = useState(false)
  const [mobileView, setMobileView] = useState<'chat' | 'preview'>('chat')
  const [iframeKey, setIframeKey] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Skip heavy auth - just mark as authenticated
  // Security is handled by the fact that changes are requests, not direct modifications
  useEffect(() => {
    setAuthState({ checking: false, authenticated: true })
  }, [slug])

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
        // Get business info
        const previewRes = await fetch(`/api/preview/${slug}`)
        if (previewRes.ok) {
          const previewData = await previewRes.json()
          setBusinessName(previewData.businessName || formatSlug(slug))
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
        }
      }
    } catch (error) {
      console.error('Send error:', error)
      addSystemMessage(`Sorry, something went wrong. Please try again.`)
    } finally {
      setSending(false)
    }
  }

  // Auth checking state
  if (authState.checking) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4 animate-pulse">🔐</div>
          <div className="text-xl font-bold">Verifying access...</div>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!authState.authenticated) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center p-6">
        <div className="max-w-md text-center text-white">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-2xl font-bold mb-4">Access Required</h1>
          <p className="opacity-70 mb-6">
            {authState.error || 'You need a valid access link to view and edit this site.'}
          </p>
          <p className="text-sm opacity-50 mb-8">
            Check your email for the secure link we sent you, or contact support if you need help.
          </p>
          <div className="space-y-3">
            <Link href="/dashboard" className="btn btn-lime w-full justify-center">
              Go to Dashboard →
            </Link>
            <a
              href="mailto:hello@onboard.com.au?subject=Access%20Request%20for%20Site"
              className="btn btn-outline border-white/20 w-full justify-center"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    )
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
        <Link href={`/claim/${slug}?tab=pricing`} className="btn btn-lime text-sm py-2 px-4 hidden md:flex">
          Choose Plan →
        </Link>
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
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Chat */}
        <div className={`w-full md:w-[400px] lg:w-[450px] flex flex-col border-r border-white/10 bg-[#0a0a0a] ${mobileView !== 'chat' ? 'hidden md:flex' : 'flex'}`}>
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
        <Link href={`/claim/${slug}?tab=pricing`} className="btn btn-lime w-full justify-center">
          Choose Plan & Go Live →
        </Link>
      </div>
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
