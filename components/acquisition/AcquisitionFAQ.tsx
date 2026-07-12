'use client'

import { trackEvent } from '@/components/GoogleAnalytics'

export default function AcquisitionFAQ({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="border-t border-white/15">
      {items.map((item) => (
        <details
          key={item.question}
          className="group border-b border-white/15 py-5"
          onToggle={(event) => {
            if (event.currentTarget.open) trackEvent('faq_expand', { question: item.question })
          }}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
            {item.question}
            <span className="text-[#c98c45] transition-transform group-open:rotate-45" aria-hidden="true">＋</span>
          </summary>
          <p className="max-w-3xl pt-4 leading-7 text-white/55">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
