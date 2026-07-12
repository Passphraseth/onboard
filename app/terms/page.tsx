import type { Metadata } from 'next'
import LegalPage from '@/components/acquisition/LegalPage'
const title = 'Terms'
const description = 'Website terms for the Onboard Australian domain portfolio acquisition site.'
export const metadata: Metadata = { title: `${title} | Onboard Australia`, description, alternates: { canonical: 'https://onboard.com.au/terms' }, openGraph: { title, description, url: 'https://onboard.com.au/terms', type: 'website' }, twitter: { card: 'summary', title, description } }
export default function TermsPage() { return <LegalPage title={title} description={description} path="/terms">
  <section><h2>Website purpose</h2><p>This website provides information about domain names and related digital assets available for acquisition. It does not itself form a binding sale agreement or provide an onboarding software product.</p></section>
  <section><h2>Price and offers</h2><p>The displayed fixed price is an invitation to submit an acquisition request. Alternative offers may be considered. No transaction is binding until authorised parties execute definitive sale documents and settlement conditions are satisfied.</p></section>
  <section><h2>Eligibility and verification</h2><p>A proposed buyer must provide accurate information and satisfy applicable .au eligibility and allocation requirements. The seller may request evidence of entity details, authority to act, intended use and domain eligibility.</p></section>
  <section><h2>Settlement</h2><p>Unless otherwise agreed in signed documents, settlement is expected to use a tax invoice and cleared electronic funds transfer. No card payment or automatic transfer occurs through this website.</p></section>
  <section><h2>Information accuracy</h2><p>Reasonable care is taken with website content, but market information, third-party products, rules and availability can change. Buyers must conduct independent due diligence.</p></section>
  <section><h2>Owner and legal review</h2><p>TODO: OWNER/LEGAL REVIEW — insert seller entity, governing law, liability limitations, intellectual-property terms, acceptable-use terms and final transaction disclaimers.</p></section>
</LegalPage> }
