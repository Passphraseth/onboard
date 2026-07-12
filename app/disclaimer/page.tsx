import type { Metadata } from 'next'
import LegalPage from '@/components/acquisition/LegalPage'
const title = 'Disclaimer'
const description = 'Important information about the Onboard domain portfolio, market content and third-party references.'
export const metadata: Metadata = { title: `${title} | Onboard Australia`, description, alternates: { canonical: 'https://onboard.com.au/disclaimer' }, openGraph: { title, description, url: 'https://onboard.com.au/disclaimer', type: 'website' }, twitter: { card: 'summary', title, description } }
export default function DisclaimerPage() { return <LegalPage title={title} description={description} path="/disclaimer">
  <section><h2>Domain-acquisition website</h2><p>This website offers domain names and potentially related digital assets. It does not represent that Onboard currently provides onboarding software or professional onboarding services.</p></section>
  <section><h2>General market information</h2><p>Industry and market pages are general editorial information only. They are not legal, compliance, financial, tax, employment, safety or investment advice.</p></section>
  <section><h2>No performance guarantee</h2><p>No guarantee is given regarding traffic, search rankings, revenue, conversion, brand adoption, commercial performance or future domain value. Historical search information is supplied only as context.</p></section>
  <section><h2>Third-party names</h2><p>Third-party company names, product names and trademarks belong to their respective owners. A reference or link does not imply affiliation, endorsement, partnership or approval.</p></section>
  <section><h2>Eligibility and due diligence</h2><p>Domain eligibility and allocation requirements can change. A buyer should review current auDA rules, registrar procedures and its own legal and tax position before entering an agreement.</p></section>
  <section><h2>Owner and legal review</h2><p>TODO: OWNER/LEGAL REVIEW — confirm the final seller-specific disclaimer and applicable limitation wording.</p></section>
</LegalPage> }
