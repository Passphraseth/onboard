'use client'

import { useState } from 'react'
import { trackEvent } from '@/components/GoogleAnalytics'

export default function AmlFAQAccordion({ items, pageSlug }: { items: { question: string; answer: string }[]; pageSlug: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <div className="border-t border-white/15">
      {items.map((item, index) => {
        const open = openIndex === index
        return (
          <div key={item.question} className="border-b border-white/15">
            <h3>
              <button
                type="button"
                className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left text-base font-medium"
                aria-expanded={open}
                onClick={() => {
                  setOpenIndex(open ? null : index)
                  if (!open) trackEvent('faq_expand', { page_slug: pageSlug, cluster: 'aml_ctf', question_index: index })
                }}
              >
                {item.question}<span aria-hidden="true" className="text-[#c98c45]">{open ? '−' : '+'}</span>
              </button>
            </h3>
            {open && <p className="max-w-3xl pb-6 text-sm leading-7 text-white/60">{item.answer}</p>}
          </div>
        )
      })}
    </div>
  )
}
