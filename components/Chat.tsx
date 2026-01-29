'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id?: string
  sender: 'user' | 'assistant'
  message: string
  created_at?: string
}

interface ChatProps {
  slug: string
  businessName: string
  primaryColor?: string
}

export default function Chat({ slug, businessName, primaryColor = '#2563eb' }: ChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load existing messages when chat opens
  useEffect(() => {
    if (isOpen && !hasLoaded) {
      loadMessages()
    }
  }, [isOpen, hasLoaded])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadMessages = async () => {
    try {
      const res = await fetch(`/api/chat?slug=${slug}`)
      if (res.ok) {
        const data = await res.json()
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages)
        } else {
          // Add welcome message if no messages exist
          setMessages([
            {
              sender: 'assistant',
              message: `Hi! 👋 I'm here to help you customize ${businessName}'s website. Want to change colors, fonts, layout, or anything else? Just let me know!`,
            },
          ])
        }
        setHasLoaded(true)
      }
    } catch (error) {
      console.error('Error loading messages:', error)
      // Still show welcome message on error
      setMessages([
        {
          sender: 'assistant',
          message: `Hi! 👋 I'm here to help you customize ${businessName}'s website. Want to change colors, fonts, layout, or anything else? Just let me know!`,
        },
      ])
      setHasLoaded(true)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)

    // Optimistically add user message
    setMessages((prev) => [...prev, { sender: 'user', message: userMessage }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, message: userMessage }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.assistantMessage) {
          setMessages((prev) => [
            ...prev,
            { sender: 'assistant', message: data.assistantMessage.message },
          ])
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          message: "Sorry, I couldn't process that. Please try again or email us at hello@onboard.com.au",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform hover:scale-110"
        style={{ backgroundColor: primaryColor }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div
            className="p-4 text-white"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="font-bold">Customize Your Site ✨</div>
            <div className="text-sm opacity-80">Ask me to change anything!</div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] min-h-[300px] bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                  }`}
                  style={{
                    backgroundColor: msg.sender === 'user' ? primaryColor : undefined,
                  }}
                >
                  <div className="text-sm whitespace-pre-wrap">{msg.message}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-50 transition-opacity"
                style={{ backgroundColor: primaryColor }}
              >
                ➤
              </button>
            </div>
            <div className="text-xs text-gray-400 text-center mt-2">
              Changes will be applied after you subscribe
            </div>
          </form>
        </div>
      )}
    </>
  )
}
