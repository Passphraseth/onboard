# Onboard acquisition-site deployment notes

Updated: 12 July 2026

## Created routes

- `/employee-onboarding`
- `/contractor-onboarding`
- `/customer-onboarding`
- `/client-onboarding`
- `/saas-onboarding`
- `/kyc-onboarding`
- `/construction-inductions`
- `/australian-onboarding-software-market`
- `/melbourne-onboarding-software`
- `/sydney-customer-onboarding`
- `/acquisition-process`
- `/acquire`
- `/privacy`
- `/terms`
- `/disclaimer`

Existing blog and service-business URLs remain available. A restrained acquisition banner is limited to those retained routes.

The AML/CTF Phase 1 cluster adds ten substantive routes. See `docs/AML_CTF_CONTENT_CLUSTER.md` for its route list, source assignments, metadata, analytics, legal-review flags and Phase 2 backlog.

## Redirect map

| Source | Destination | Purpose |
|---|---|---|
| `/blog/tradie-marketing-7-ways-to-get-more-jobs-without-wasting-money` | `/blog/tradie-marketing` | Restore historical long-form slug |
| `/blog/how-much-does-a-tradie-website-cost-in-2026-real-prices-no-bs` | `/blog/tradie-website-cost` | Restore historical long-form slug |
| `/best-website-builder-for-tradies` | `/blog/best-website-builder-for-tradies` | Priority article alias |
| `/best-website-builders-small-business-australia` | `/blog/best-website-builders-small-business-australia` | Priority article alias |
| `/websites-for-plumber` | `/websites-for-plumbers` | Singular/plural alias |
| `/onboard` | `/acquire` | Retire former product onboarding flow |
| `/pricing` | `/acquire` | Retire former software pricing |
| `/contact` | `/acquire` | Acquisition contact replacement |
| `/privacy-policy` | `/privacy` | Legal alias |
| `/terms-of-service` | `/terms` | Legal alias |

`onboard.au` and `onboard.net.au` are handled by application-level 308 redirects when their DNS and Vercel project assignments point at this deployment. Their external DNS remains an owner task.

## Metadata and structured data

- Every new indexable route has a unique title, description, canonical URL, Open Graph metadata and Twitter/X metadata.
- Acquisition routes use accurate `Organization`, `WebSite`, `WebPage`, `Article`, `BreadcrumbList` and visible `FAQPage` schema as appropriate.
- Former fake software-offer, aggregate-rating and local-business schema has been removed or neutralised.
- The XML sitemap contains every new acquisition and market route plus retained indexed content.
- Robots rules block APIs, dashboard, claims, checkout, generated-site and login routes.

## Form integration

Endpoint: `POST /api/acquisition-enquiry`

The fixed-price form collects entity and representative verification details, ABN/ACN, registered address, intended use, settlement timeframe and required buyer confirmations. The offer form collects a qualified buyer identity, ABN/ACN, amount, intended use, timeframe and message.

Controls include:

- HTML validation
- server-side validation
- honeypot field
- minimum completion-time check
- HTML escaping in generated emails
- no direct card payment
- seller notification
- buyer acknowledgement email

Submissions are delivered through Resend to the configured seller recipient in the server route. They are not currently stored in a database.

## Analytics events

- `acquire_now_click`
- `submit_offer_click`
- `acquisition_form_start`
- `acquisition_form_submit`
- `offer_form_start`
- `offer_form_submit`
- `market_page_view`
- `faq_expand`
- `outbound_company_link`
- `aml_page_view`
- `aml_source_link_click`
- `aml_acquisition_cta_click`
- `aml_market_vendor_click`
- `aml_related_article_click`
- `aml_offer_form_start`
- `aml_offer_form_submit`
- `aml_acquisition_form_start`
- `aml_acquisition_form_submit`

No form field values are sent to analytics.

AML/CTF acquisition referrals carry source-page, cluster and UTM attribution into the private seller email. The acquisition form also includes an optional buyer-interest field.

## Environment variables

Required for the acquisition form:

- `RESEND_API_KEY`

The wider legacy application still expects its existing Supabase and Stripe variables during a full build. The acquisition flow does not use Stripe.

## Lighthouse results

Mobile Lighthouse, Chrome 13.4.0 CLI:

| Build | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|---|---:|---:|---:|---:|---:|---:|
| Live site before brief implementation | 100 | 96 | 96 | 100 | 1.54 s | 0 |
| New local production build | 100 | 100 | 100 | 100 | 1.86 s | 0 |

Network conditions can move timing metrics between runs. The category scores and zero layout shift satisfy the stated targets.

## Deployment checklist

1. Run `npm ci`.
2. Run the production build with the existing project environment variables.
3. Confirm `/`, `/acquire`, all market routes, legal routes, sitemap and robots return 200.
4. Confirm the fixed-price and offer modes render the correct fields.
5. Submit a controlled test enquiry only after confirming the production `RESEND_API_KEY` and recipient.
6. Verify both seller notification and buyer acknowledgement delivery.
7. Deploy the `main` branch to Vercel.
8. Confirm the production deployment ID changes and public pages contain the new acquisition copy.
9. Attach `onboard.au` and `onboard.net.au` to the Vercel project and update their DNS.
10. Submit the updated sitemap in Google Search Console.
11. Export Analytics 404 page paths and add only URL-specific relevant redirects.
12. Re-submit the XML sitemap after AML/CTF deployment and request indexing for the hub, pillar, Tranche 2 and market-guide routes.
13. Review the AML/CTF cluster every six months, or sooner after material AUSTRAC changes.

## Outstanding owner decisions

- Seller legal entity
- Public ABN/ACN
- Final GST treatment
- Whether existing website assets are included or separately negotiated
- Whether escrow is offered and who pays related fees
- Final privacy, terms and disclaimer language
- Final data-retention policy
- Whether historical search metrics remain public
- Domain transfer or escrow fee allocation

Legal pages contain `TODO: OWNER/LEGAL REVIEW` markers wherever seller-specific legal wording is still required.
