'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/components/GoogleAnalytics'

export function AmlPageView({ pageSlug, sector, workflowTopic }: { pageSlug: string; sector?: string; workflowTopic?: string }) {
  useEffect(() => {
    trackEvent('aml_page_view', {
      page_slug: pageSlug,
      ...(sector ? { sector } : {}),
      ...(workflowTopic ? { workflow_topic: workflowTopic } : {}),
    })
  }, [pageSlug, sector, workflowTopic])
  return null
}

interface AmlTrackedLinkProps {
  href: string
  eventName: 'aml_source_link_click' | 'aml_market_vendor_click' | 'aml_related_article_click'
  pageSlug: string
  children: React.ReactNode
  className?: string
}

export function AmlTrackedLink({ href, eventName, pageSlug, children, className }: AmlTrackedLinkProps) {
  const external = href.startsWith('http')
  const destination = external ? new URL(href).hostname : href
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={className}
      onClick={() => trackEvent(eventName, {
        page_slug: pageSlug,
        ...(external ? { outbound_domain: destination } : { destination }),
      })}
    >
      {children}
    </a>
  )
}
