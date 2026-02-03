'use client'

import Link from 'next/link'
import { useState } from 'react'

const SERVICES = [
  { name: 'Tradies', href: '/websites-for-tradies' },
  { name: 'Plumbers', href: '/websites-for-plumbers' },
  { name: 'Electricians', href: '/websites-for-electricians' },
  { name: 'Builders', href: '/websites-for-builders' },
  { name: 'Hairdressers', href: '/websites-for-hairdressers' },
  { name: 'Beauticians', href: '/websites-for-beauticians' },
  { name: 'Cafes', href: '/websites-for-cafes' },
  { name: 'Photographers', href: '/websites-for-photographers' },
  { name: 'Personal Trainers', href: '/websites-for-personal-trainers' },
  { name: 'Landscapers', href: '/websites-for-landscapers' },
  { name: 'Cleaners', href: '/websites-for-cleaners' },
  { name: 'Mechanics', href: '/websites-for-mechanics' },
  { name: 'HVAC', href: '/websites-for-hvac' },
]

const RESOURCES = [
  { name: 'Free Tradie Checklist', href: '/tradie-checklist', description: '15-point website audit' },
  { name: 'ROI Calculator', href: '/roi-calculator', description: 'See your revenue potential' },
  { name: 'Free Website Audit', href: '/free-audit', description: 'Personal review in 24h' },
]

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          onboard
        </Link>
        <div className="flex items-center gap-8">
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
              Services
              <svg 
                className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl py-2">
                {SERVICES.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="block px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
              Resources
              <svg 
                className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {resourcesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl py-2">
                {RESOURCES.map((resource) => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="block px-4 py-3 text-sm hover:bg-neutral-800 transition-colors"
                  >
                    <div className="text-neutral-200">{resource.name}</div>
                    <div className="text-xs text-neutral-500">{resource.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" className="text-sm text-neutral-400 hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/pricing" className="text-sm text-neutral-400 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/onboard" className="btn btn-primary text-sm">
            Get started
          </Link>
        </div>
      </div>
    </nav>
  )
}
