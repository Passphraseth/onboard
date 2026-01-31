'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = 'G-C9PZ21680F'

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

// Utility function to track events
export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters)
  }
}

// Track conversion events
export function trackConversion(action: string, category: string, label?: string, value?: number) {
  trackEvent(action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Signup funnel tracking
export const SignupFunnelEvents = {
  START_ONBOARDING: 'start_onboarding',
  COMPLETE_BUSINESS_NAME: 'complete_business_name',
  COMPLETE_BUSINESS_TYPE: 'complete_business_type',
  COMPLETE_LOCATION: 'complete_location',
  COMPLETE_HOURS: 'complete_hours',
  COMPLETE_CONTACT: 'complete_contact',
  COMPLETE_SOCIALS: 'complete_socials',
  COMPLETE_BRANDING: 'complete_branding',
  COMPLETE_SERVICES: 'complete_services',
  COMPLETE_USP: 'complete_usp',
  GENERATE_WEBSITE: 'generate_website',
  VIEW_PREVIEW: 'view_preview',
  CLAIM_SITE: 'claim_site',
  COMPLETE_SIGNUP: 'complete_signup',
}

export function trackSignupStep(step: keyof typeof SignupFunnelEvents, businessType?: string) {
  trackEvent(SignupFunnelEvents[step], {
    event_category: 'signup_funnel',
    business_type: businessType,
  })
}
