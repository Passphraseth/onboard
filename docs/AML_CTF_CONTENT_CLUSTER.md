# AML/CTF content-cluster deployment record

Last reviewed: 12 July 2026

Editorial owner: Onboard Australia

## Published Phase 1 routes and metadata

| Route | Title | Meta description |
|---|---|---|
| `/aml-ctf` | Australian AML/CTF Onboarding Resources — Onboard | Explore Australian AML/CTF onboarding, Tranche 2, KYC, KYB and customer due diligence resources, sourced to current AUSTRAC guidance. |
| `/aml-ctf-onboarding-software-australia` | AML/CTF Client Onboarding Software Australia — Onboard | Explore AML/CTF client onboarding workflows, KYC, KYB, CDD and Australian compliance technology. The Onboard domain portfolio is available for acquisition. |
| `/tranche-2-client-onboarding` | Tranche 2 Client Onboarding Australia — AML/CTF Workflows | Understand how client onboarding may change for Australian businesses providing newly regulated designated services from 1 July 2026. |
| `/aml-ctf-accountants` | AML/CTF Client Onboarding for Accountants Australia | Explore client, entity, beneficial-owner, risk and CDD workflows for Australian accounting services that may be designated services. |
| `/aml-ctf-law-firms` | AML/CTF Client Onboarding for Australian Law Firms | Explore matter, client, entity, customer-risk and due-diligence workflows for Australian legal services that may be designated services. |
| `/aml-ctf-real-estate` | AML/CTF Client Onboarding for Australian Real Estate | Explore vendor, purchaser, identity, authority and customer-risk workflows for Australian real-estate designated services. |
| `/kyc-vs-kyb` | KYC vs KYB: Individual and Business Verification Australia | Compare KYC for individuals with commonly used KYB workflows for companies, trusts, partnerships, representatives and beneficial owners. |
| `/customer-due-diligence-cdd` | Customer Due Diligence Australia — Initial CDD Guide | A sourced overview of initial customer due diligence, identification, verification, customer risk, evidence and onboarding workflows in Australia. |
| `/enhanced-customer-due-diligence` | Enhanced Customer Due Diligence Australia — ECDD | Understand enhanced customer due diligence workflows, additional review, approval, evidence and escalation using current AUSTRAC guidance. |
| `/australian-aml-ctf-software-market` | Australian AML/CTF and Tranche 2 Software Market 2026 | A neutral 2026 overview of Australian AML/CTF, KYC, KYB, identity, screening and client-onboarding technology categories and providers. |

Every route has a unique description, canonical, Open Graph and Twitter/X metadata. Metadata is maintained in `lib/aml-ctf-content.ts`.

## Internal-link map

- The global navigation, footer and homepage link into the AML/CTF hub and highest-value cluster routes.
- The hub links to the pillar, Tranche 2, workflow, sector and market pages.
- The pillar links across Phase 1 sectors and CDD workflows, then to the acquisition pathway.
- Each sector links back to the hub and across KYC/KYB, CDD, enhanced CDD and the market guide.
- Each workflow guide links to the hub, adjacent workflows and relevant sector pages.
- The market guide links to the hub, pillar, sector pages, acquisition flow and official provider websites.
- Every page includes top and bottom portfolio-acquisition calls to action with source attribution.

## Primary regulatory sources

All regulatory claims were checked against AUSTRAC on 12 July 2026:

- [About the reforms](https://www.austrac.gov.au/industry-and-business/about-amlctf-reforms/about-reforms)
- [Professional designated services](https://www.austrac.gov.au/new-austrac/designated-services-newly-regulated-entities/professional-designated-services)
- [Real estate designated services](https://www.austrac.gov.au/new-austrac/designated-services-newly-regulated-entities/real-estate-designated-services)
- [Program starter kits](https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/program-starter-kits)
- [Accountant program starter kit](https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/program-starter-kits/accountant-program-starter-kit)
- [Legal profession program starter kit](https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/program-starter-kits/legal-profession-program-starter-kit)
- [Real estate program starter kit](https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/program-starter-kits/real-estate-program-starter-kit)
- [Overview of customer due diligence](https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/your-amlctf-program/customer-due-diligence/overview-customer-due-diligence)
- [Overview of initial customer due diligence](https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/your-amlctf-program/customer-due-diligence/initial-customer-due-diligence/overview-initial-customer-due-diligence)
- [Enhanced customer due diligence](https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/your-amlctf-program/customer-due-diligence/enhanced-customer-due-diligence)
- [Ongoing customer due diligence](https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/your-amlctf-program/customer-due-diligence/ongoing-customer-due-diligence)
- [AML/CTF Rules](https://www.austrac.gov.au/about-us/legislation/amlctf-rules)

The page-level source assignment is the `primarySources` field for each page in `lib/aml-ctf-content.ts`.

## Market-guide provider sources

The directory uses only provider statements from official sites, last checked 12 July 2026:

- FrankieOne: `https://frankieone.com/`
- GBG greenID: `https://www.gbg.com/en/contact/customer-support/greenid/`
- Equifax Australia: `https://www.equifax.com.au/business-enterprise/solutions/aml-compliance`

Listings are neutral, contain no rankings or fabricated pricing, and tell readers to verify current capability and pricing directly.

## Structured data

AML pages output a truthful JSON-LD graph containing:

- `Organization`
- `WebSite`
- `WebPage`
- `Article`
- `BreadcrumbList`
- `FAQPage` only where the same questions and answers are visible on the page

No `SoftwareApplication`, `Product`, `LocalBusiness`, review, rating, government-organisation or AUSTRAC-affiliation schema is used.

## Analytics events

- `aml_page_view`
- `aml_source_link_click`
- `aml_acquisition_cta_click`
- `aml_market_vendor_click`
- `aml_related_article_click`
- `aml_offer_form_start`
- `aml_offer_form_submit`
- `aml_acquisition_form_start`
- `aml_acquisition_form_submit`

Parameters are limited to page slug, sector, workflow topic, CTA location and outbound domain. No form-entered personal information is sent to analytics.

The acquisition form preserves `source_page`, `source_cluster=aml_ctf` and UTM attribution in the seller email. It also offers an optional buyer-interest field. Identity-document uploads are not accepted.

## Legal and compliance review items

`TODO: LEGAL/COMPLIANCE REVIEW` is represented by `legalReviewRequired` in the content model and rendered only in development. The public site displays a substantive disclaimer instead.

Owner review is required before adding or materially expanding:

- detailed obligation or exemption summaries
- statutory thresholds, time periods or reporting deadlines
- privilege, confidentiality or professional-duty analysis
- record-retention periods or ownership thresholds
- PEP classifications, source-of-funds or source-of-wealth requirements
- transaction or suspicious-matter reporting instructions
- transitional-rule interpretations

The current law-firm page deliberately avoids giving a view on legal professional privilege.

## Phase 2 backlog

Create only as substantive, sourced pages—not placeholders:

- `/aml-ctf-conveyancers`
- `/aml-ctf-trust-company-services`
- `/ongoing-customer-due-diligence`
- `/aml-ctf-client-risk-assessment`
- `/beneficial-ownership-verification`
- `/pep-sanctions-screening`
- `/aml-ctf-record-keeping`
- `/aml-ctf-compliance-officer`

Optional variants remain deferred until Search Console demonstrates distinct demand. No city-level AML/CTF pages should be created without genuinely unique content.

## Maintenance schedule

- Review the cluster at least every six months. Next scheduled review: 12 January 2027.
- Review sooner when AUSTRAC changes the Act, Rules, transitional material, designated-service guidance, starter kits or CDD guidance.
- Re-check every external link and provider profile during each review.
- Update `AML_LAST_REVIEWED`, source `lastChecked` values and schema dates together.

## Quality assurance results

- Production build: passed; all ten Phase 1 routes statically generated.
- Route checks: 10/10 returned 200 with one H1, canonical, visible disclaimer, `WebPage`, `Article`, `BreadcrumbList` and sitemap entry.
- Metadata: 10/10 unique titles and 10/10 unique descriptions.
- Links: all 28 unique internal cluster links and all 15 AUSTRAC/provider source links resolved.
- Browser QA: mobile, tablet and desktop layouts passed; the KYC/KYB comparison scrolls within its container without page overflow; FAQ and acquisition attribution interactions passed.
- Lighthouse mobile, local production build:

| Route | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---:|---:|---:|---:|---:|---:|
| `/aml-ctf-onboarding-software-australia` | 100 | 100 | 100 | 100 | 1.7 s | 0 |
| `/australian-aml-ctf-software-market` | 100 | 100 | 100 | 100 | 1.8 s | 0 |

## Search Console submission checklist

1. Confirm production returns 200 for all ten Phase 1 routes.
2. Confirm each route has its self-referencing canonical.
3. Inspect `https://onboard.com.au/sitemap.xml` and confirm all Phase 1 routes appear.
4. Submit or re-submit the sitemap in Google Search Console.
5. Request indexing for the hub, pillar, Tranche 2 page and market guide first.
6. Inspect rendered HTML for title, description, canonical and JSON-LD.
7. Monitor Indexing, Core Web Vitals and HTTPS reports.
8. Review query and page data after 28 and 90 days before deciding on Phase 2 or optional variants.
9. Keep unrelated 404 handling URL-specific; do not mass-redirect random paths into this cluster.
