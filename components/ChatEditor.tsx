'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface ChatEditorProps {
  previewData: {
    businessName: string
    leadId: string
    content: any
  }
  onContentUpdate: (updates: any) => void
}

const QUICK_ACTIONS = [
  { label: 'Change colors', prompt: 'I want to change the color scheme' },
  { label: 'Edit services', prompt: 'I need to update my services' },
  { label: 'Add photos', prompt: 'How can I add my own photos?' },
  { label: 'Change tagline', prompt: 'I want a different tagline' },
  { label: 'Update hours', prompt: 'I need to change my opening hours' },
  { label: 'Edit contact info', prompt: 'Update my contact details' },
]

export default function ChatEditor({ previewData, onContentUpdate }: ChatEditorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hey! 👋 I'm here to help you customize your ${previewData.businessName} website. What would you like to change?`,
      timestamp: new Date(),
      suggestions: ['Change the colors', 'Update my services', 'Edit the tagline', 'Add my photos'],
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const processUserRequest = async (userMessage: string): Promise<{ response: string; updates?: any; suggestions?: string[] }> => {
    const lowerMessage = userMessage.toLowerCase()

    // Color change requests
    if (lowerMessage.includes('color') || lowerMessage.includes('colour')) {
      if (lowerMessage.includes('blue')) {
        return {
          response: "I've updated the color scheme to a professional blue! How does that look?",
          updates: { colors: { primary: '#2563eb', secondary: '#1e3a8a', accent: '#3b82f6' } },
          suggestions: ['Try green instead', 'Make it darker', 'Change to red'],
        }
      } else if (lowerMessage.includes('green')) {
        return {
          response: "Done! I've switched to a fresh green theme. What do you think?",
          updates: { colors: { primary: '#16a34a', secondary: '#166534', accent: '#22c55e' } },
          suggestions: ['Try blue instead', 'Make it lighter', 'Add more contrast'],
        }
      } else if (lowerMessage.includes('red') || lowerMessage.includes('pink')) {
        return {
          response: "I've applied a bold red/pink color scheme. Looking vibrant!",
          updates: { colors: { primary: '#dc2626', secondary: '#991b1b', accent: '#f87171' } },
          suggestions: ['Try something softer', 'Change to orange', 'Make it professional'],
        }
      } else if (lowerMessage.includes('black') || lowerMessage.includes('dark')) {
        return {
          response: "Sleek! I've applied a dark, professional theme.",
          updates: { colors: { primary: '#18181b', secondary: '#09090b', accent: '#a1a1aa' } },
          suggestions: ['Add a pop of color', 'Try gold accents', 'Make it lighter'],
        }
      }
      return {
        response: "I can change the colors for you! What color scheme would you like? I can do:\n\n• **Blue** - Professional & trustworthy\n• **Green** - Fresh & eco-friendly\n• **Red/Pink** - Bold & energetic\n• **Dark** - Sleek & modern\n\nOr describe a specific color!",
        suggestions: ['Make it blue', 'Use green', 'Go with dark theme'],
      }
    }

    // Tagline requests
    if (lowerMessage.includes('tagline') || lowerMessage.includes('slogan') || lowerMessage.includes('headline')) {
      if (userMessage.includes('"') || userMessage.includes("'")) {
        const match = userMessage.match(/["']([^"']+)["']/)
        if (match) {
          return {
            response: `Perfect! I've updated your tagline to "${match[1]}" ✨`,
            updates: { tagline: match[1] },
            suggestions: ['Shorten it', 'Make it catchier', 'Add an emoji'],
          }
        }
      }
      return {
        response: "I'd be happy to help with your tagline! What message do you want to convey? Some ideas:\n\n• Focus on speed: \"Fast, reliable service\"\n• Focus on quality: \"Excellence in every detail\"\n• Focus on trust: \"Your trusted local experts\"\n\nOr just type what you want in quotes and I'll set it!",
        suggestions: ['Show me more examples', 'Focus on quality', 'Make it local'],
      }
    }

    // Services requests
    if (lowerMessage.includes('service')) {
      if (lowerMessage.includes('add') || lowerMessage.includes('new')) {
        return {
          response: "Sure! What service would you like to add? Just tell me the name and a brief description, like:\n\n\"Emergency callouts - 24/7 service for urgent issues\"",
          suggestions: ['Add emergency service', 'Add consultation', 'Show current services'],
        }
      }
      if (lowerMessage.includes('remove') || lowerMessage.includes('delete')) {
        const currentServices = previewData.content?.services?.map((s: any) => s.name).join(', ')
        return {
          response: `Your current services are: ${currentServices}. Which one would you like to remove?`,
          suggestions: previewData.content?.services?.slice(0, 3).map((s: any) => `Remove ${s.name}`) || [],
        }
      }
      return {
        response: "I can help you manage your services! Would you like to:\n\n• **Add** a new service\n• **Remove** an existing one\n• **Edit** the descriptions\n\nWhat would you like to do?",
        suggestions: ['Add a service', 'Edit descriptions', 'See current services'],
      }
    }

    // Photos requests
    if (lowerMessage.includes('photo') || lowerMessage.includes('image') || lowerMessage.includes('picture')) {
      return {
        response: "Great idea! Adding real photos makes your site much more personal. Here's how:\n\n📱 **From Instagram**: If you gave us your Instagram handle, we can pull photos from there!\n\n📧 **Email them**: Send photos to hello@onboard.com.au and we'll add them within 24 hours.\n\nWould you like to connect your Instagram?",
        suggestions: ['Connect Instagram', 'I\'ll email photos', 'Use stock photos for now'],
      }
    }

    // Hours requests
    if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('time')) {
      return {
        response: "I can update your opening hours! Just tell me the new hours, like:\n\n\"Open Monday-Friday 9am-5pm, Saturday 10am-2pm, closed Sunday\"\n\nOr you can be specific about individual days.",
        suggestions: ['Mon-Fri 9-5', 'Same hours every day', 'Add weekend hours'],
      }
    }

    // Contact requests
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('address')) {
      return {
        response: "Which contact details would you like to update?\n\n• 📞 Phone number\n• 📧 Email address\n• 📍 Business address\n\nJust let me know the new details!",
        suggestions: ['Update phone', 'Change email', 'Add address'],
      }
    }

    // Testimonials requests
    if (lowerMessage.includes('testimonial') || lowerMessage.includes('review')) {
      return {
        response: "Testimonials are powerful! You can:\n\n• **Add real reviews** - Send us your Google or Facebook reviews\n• **Edit the sample ones** - Tell me what changes you want\n• **Remove them** - If you'd prefer not to show any for now\n\nWhat would you like to do?",
        suggestions: ['Add my Google reviews', 'Edit existing ones', 'Remove testimonials'],
      }
    }

    // CTA button requests
    if (lowerMessage.includes('button') || lowerMessage.includes('cta') || lowerMessage.includes('call to action')) {
      return {
        response: "The main call-to-action button is important! What would you like it to say?\n\nSome popular options:\n• \"Get a Free Quote\"\n• \"Book Now\"\n• \"Call Us Today\"\n• \"Request a Callback\"\n\nOr tell me your own text!",
        suggestions: ['Book Now', 'Get a Quote', 'Contact Us'],
      }
    }

    // Like/Approve
    if (lowerMessage.includes('looks good') || lowerMessage.includes('perfect') || lowerMessage.includes('love it') || lowerMessage.includes('approve')) {
      return {
        response: "Awesome! 🎉 If you're happy with how it looks, you can choose a plan to make it live! Your site will be published within 24 hours.\n\nIs there anything else you'd like to tweak first?",
        suggestions: ['Choose a plan', 'One more change', 'Schedule a call'],
      }
    }

    // Default response
    return {
      response: "I'm here to help! I can assist with:\n\n• 🎨 **Colors** - Change the color scheme\n• ✏️ **Tagline** - Update your main message\n• 🛠️ **Services** - Add or edit services\n• 📸 **Photos** - Add your own images\n• ⏰ **Hours** - Update opening times\n• 📞 **Contact** - Change phone/email/address\n\nWhat would you like to change?",
      suggestions: ['Change colors', 'Edit tagline', 'Update services'],
    }
  }

  const handleSend = async (message: string = input) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700))

    const { response, updates, suggestions } = await processUserRequest(message)

    if (updates) {
      onContentUpdate(updates)
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      suggestions,
    }

    setMessages(prev => [...prev, assistantMessage])
    setIsTyping(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl z-50 transition-all ${
          isOpen ? 'bg-gray-600 rotate-45' : 'bg-brand-lime text-brand-black hover:scale-110'
        }`}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col max-h-[70vh]">
          {/* Header */}
          <div className="bg-brand-blue text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-lime rounded-full flex items-center justify-center text-lg">
              🛫
            </div>
            <div>
              <div className="font-bold">Edit Your Site</div>
              <div className="text-xs opacity-70">Chat to make changes</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    message.role === 'user'
                      ? 'bg-brand-blue text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors border border-gray-300 text-gray-700"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
            {QUICK_ACTIONS.slice(0, 3).map((action, i) => (
              <button
                key={i}
                onClick={() => handleSend(action.prompt)}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full whitespace-nowrap text-gray-600"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your request..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center disabled:opacity-50"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
