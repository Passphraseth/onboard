import type { Metadata } from 'next'
import LegalPage from '@/components/acquisition/LegalPage'
const title = 'Privacy'
const description = 'How the Onboard domain-acquisition website handles enquiry, analytics and technical information.'
export const metadata: Metadata = { title: `${title} | Onboard Australia`, description, alternates: { canonical: 'https://onboard.com.au/privacy' }, openGraph: { title, description, url: 'https://onboard.com.au/privacy', type: 'website' }, twitter: { card: 'summary', title, description } }
export default function PrivacyPage() { return <LegalPage title={title} description={description} path="/privacy">
  <section><h2>Information collected</h2><p>When you submit an acquisition request or offer, the website collects the buyer and representative information shown in the form. This may include identity and contact information, entity details, ABN or ACN, intended use, proposed price and settlement preferences.</p></section>
  <section><h2>How information is used</h2><p>Information is used to assess and respond to acquisition enquiries, verify a potential buyer, prepare transaction documents, prevent misuse and maintain necessary transaction records. It is not sold as a marketing list.</p></section>
  <section><h2>Form processing</h2><p>Acquisition enquiries are processed by Formspree and delivered to the seller. Formspree may process the information supplied for delivery, spam prevention and service operation. Do not submit information that is not necessary for the proposed acquisition.</p></section>
  <section><h2>Analytics and technical data</h2><p>The site uses Google Analytics 4 to understand page usage and acquisition-form events. Analytics should not intentionally receive the personal information entered into forms. Hosting and security systems may process IP address, device and request information.</p></section>
  <section><h2>Access, correction and contact</h2><p>Requests concerning submitted information can be made through the acquisition form. Identity may need to be verified before information is disclosed or changed.</p></section>
  <section><h2>Owner and legal review</h2><p>TODO: OWNER/LEGAL REVIEW — insert the seller legal entity, applicable privacy contact, retention periods, cross-border disclosures and any additional Australian Privacy Act wording required for the seller.</p></section>
</LegalPage> }
