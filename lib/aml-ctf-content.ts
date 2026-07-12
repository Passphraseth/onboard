import type { Metadata } from 'next'
import { SITE_URL } from './acquisition-content'

export const AML_LAST_REVIEWED = '12 July 2026'
export const AML_LAST_REVIEWED_ISO = '2026-07-12'

export interface AmlSource {
  title: string
  url: string
  publisher: string
  lastChecked: string
}

export interface AmlSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
  note?: string
}

export interface AmlContentPage {
  slug: string
  eyebrow: string
  metaTitle: string
  metaDescription: string
  h1: string
  summary: string
  sector?: string
  workflowTopic?: string
  sections: AmlSection[]
  workflowSteps?: { title: string; description: string }[]
  definitions?: { term: string; description: string }[]
  comparison?: {
    headings: string[]
    rows: string[][]
  }
  sectorCards?: { title: string; description: string; href: string }[]
  vendors?: {
    name: string
    url: string
    availability: string
    sectors: string
    capabilities: string
    integrations: string
    pricing: string
  }[]
  relatedPages: string[]
  primarySources: AmlSource[]
  faq?: { question: string; answer: string }[]
  legalReviewRequired: boolean
}

const reviewed = AML_LAST_REVIEWED

const SOURCES = {
  reforms: {
    title: 'About the AML/CTF reforms',
    url: 'https://www.austrac.gov.au/industry-and-business/about-amlctf-reforms/about-reforms',
    publisher: 'AUSTRAC',
    lastChecked: reviewed,
  },
  designated: {
    title: 'Professional designated services',
    url: 'https://www.austrac.gov.au/new-austrac/designated-services-newly-regulated-entities/professional-designated-services',
    publisher: 'AUSTRAC',
    lastChecked: reviewed,
  },
  realEstate: {
    title: 'Real estate designated services',
    url: 'https://www.austrac.gov.au/new-austrac/designated-services-newly-regulated-entities/real-estate-designated-services',
    publisher: 'AUSTRAC',
    lastChecked: reviewed,
  },
  starterKits: {
    title: 'Program starter kits',
    url: 'https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/program-starter-kits',
    publisher: 'AUSTRAC',
    lastChecked: reviewed,
  },
  accountantKit: {
    title: 'Accountant program starter kit',
    url: 'https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/program-starter-kits/accountant-program-starter-kit',
    publisher: 'AUSTRAC',
    lastChecked: reviewed,
  },
  legalKit: {
    title: 'Legal profession program starter kit',
    url: 'https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/program-starter-kits/legal-profession-program-starter-kit',
    publisher: 'AUSTRAC',
    lastChecked: reviewed,
  },
  realEstateKit: {
    title: 'Real estate program starter kit',
    url: 'https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/program-starter-kits/real-estate-program-starter-kit',
    publisher: 'AUSTRAC',
    lastChecked: reviewed,
  },
  cdd: {
    title: 'Overview of customer due diligence',
    url: 'https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/your-amlctf-program/customer-due-diligence/overview-customer-due-diligence',
    publisher: 'AUSTRAC',
    lastChecked: reviewed,
  },
  initialCdd: {
    title: 'Overview of initial customer due diligence',
    url: 'https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/your-amlctf-program/customer-due-diligence/initial-customer-due-diligence/overview-initial-customer-due-diligence',
    publisher: 'AUSTRAC',
    lastChecked: reviewed,
  },
  enhancedCdd: {
    title: 'Enhanced customer due diligence',
    url: 'https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/your-amlctf-program/customer-due-diligence/enhanced-customer-due-diligence',
    publisher: 'AUSTRAC',
    lastChecked: reviewed,
  },
  ongoingCdd: {
    title: 'Ongoing customer due diligence',
    url: 'https://www.austrac.gov.au/industry-and-business/obligations-and-guidance/your-amlctf-program/customer-due-diligence/ongoing-customer-due-diligence',
    publisher: 'AUSTRAC',
    lastChecked: reviewed,
  },
  rules: {
    title: 'AML/CTF Rules',
    url: 'https://www.austrac.gov.au/about-us/legislation/amlctf-rules',
    publisher: 'AUSTRAC',
    lastChecked: reviewed,
  },
}

const SECTORS = [
  { title: 'Accountants', description: 'Client and entity onboarding for accounting services that may fall within designated services.', href: '/aml-ctf-accountants' },
  { title: 'Law firms', description: 'Matter opening, client identity, entity structures and risk escalation for relevant legal services.', href: '/aml-ctf-law-firms' },
  { title: 'Real estate', description: 'Vendor and purchaser workflows for property-related services that fall within the regime.', href: '/aml-ctf-real-estate' },
]

export const AML_PAGES: Record<string, AmlContentPage> = {
  'aml-ctf': {
    slug: 'aml-ctf',
    eyebrow: 'Australian AML/CTF resource hub',
    metaTitle: 'Australian AML/CTF Onboarding Resources | Onboard',
    metaDescription: 'Explore Australian AML/CTF onboarding, Tranche 2, KYC, KYB and customer due diligence resources, sourced to current AUSTRAC guidance.',
    h1: 'Australian AML/CTF onboarding resources',
    summary: 'A practical directory for understanding onboarding workflows around designated services, customer due diligence and Australian compliance technology—published by a domain portfolio, not a software provider.',
    sections: [
      {
        title: 'Start with the designated service',
        paragraphs: ['Certain designated services commonly provided by newly regulated businesses became subject to AML/CTF obligations from 1 July 2026. A profession or job title alone does not determine coverage: a business should first assess the services it provides and the required Australian connection.'],
        note: 'Not every accountant, lawyer, conveyancer or real-estate business is automatically regulated.',
      },
      {
        title: 'KYC, entities and due diligence',
        paragraphs: ['Initial onboarding can involve individual identity, authority to act, entity structures, beneficial owners, the purpose of the relationship and customer risk. The exact information and verification appropriate to a reporting entity depends on its customers, services, risks and policies.'],
        bullets: ['KYC and commonly used KYB workflows', 'Initial customer due diligence', 'Enhanced review and escalation', 'Ongoing customer review', 'Evidence and audit history'],
      },
      {
        title: 'Technology is an implementation choice',
        paragraphs: ['Software may support collection, verification, workflow, screening, approvals and records. It does not replace a business understanding its own obligations, designing an appropriate AML/CTF program or obtaining professional advice.'],
      },
    ],
    sectorCards: SECTORS,
    relatedPages: ['aml-ctf-onboarding-software-australia', 'tranche-2-client-onboarding', 'kyc-vs-kyb', 'customer-due-diligence-cdd', 'enhanced-customer-due-diligence', 'australian-aml-ctf-software-market'],
    primarySources: [SOURCES.reforms, SOURCES.designated, SOURCES.cdd, SOURCES.rules],
    faq: [
      { question: 'Does Onboard provide AML/CTF software?', answer: 'No. Onboard is an Australian domain portfolio available for acquisition. These pages are general editorial information.' },
      { question: 'Is every business in a newly regulated profession covered?', answer: 'No. Coverage depends on whether the business provides a designated service and on the applicable legislation, Rules and circumstances.' },
    ],
    legalReviewRequired: true,
  },
  'aml-ctf-onboarding-software-australia': {
    slug: 'aml-ctf-onboarding-software-australia',
    eyebrow: 'AML/CTF onboarding technology',
    metaTitle: 'AML/CTF Client Onboarding Software Australia | Onboard',
    metaDescription: 'Explore AML/CTF client onboarding workflows, KYC, KYB, CDD and Australian compliance technology. The Onboard domain portfolio is available for acquisition.',
    h1: 'AML/CTF client onboarding in Australia',
    summary: 'A neutral guide to the workflows technology may support when an Australian business provides designated services, and to the commercial opportunity represented by the Onboard name.',
    workflowTopic: 'aml_ctf_onboarding',
    sections: [
      {
        title: 'What an onboarding workflow may support',
        paragraphs: ['For a reporting entity, onboarding can connect customer information, verification, risk decisions and approval evidence before a designated service begins. The workflow should reflect the entity’s AML/CTF program rather than impose a generic checklist.'],
        bullets: ['Identity and entity information', 'Authority and beneficial-owner capture', 'Customer risk assessment', 'Standard or enhanced review paths', 'Records, approvals and audit trails'],
      },
      {
        title: 'From KYC to ongoing review',
        paragraphs: ['AUSTRAC describes customer due diligence as identification, verification and monitoring. Technology can make those activities visible across initial onboarding and later review, while manual investigation remains important for exceptions and judgement.'],
      },
      {
        title: 'Technology buying considerations',
        paragraphs: ['Evaluation should begin with the organisation’s service, risk and governance needs. Product demonstrations should be tested against realistic customer types and exception cases.'],
        bullets: ['Configurable workflows and permissions', 'Evidence capture and audit logs', 'Entity and ownership support', 'Manual review and escalation', 'Integration and export capability', 'Security, data handling and change management'],
      },
      {
        title: 'Why the Onboard name fits',
        paragraphs: ['Onboard describes the process directly and works across customer, client, employee and contractor contexts. The matching Australian domain portfolio could give a compliance-technology, identity or professional-services platform a concise category brand.'],
      },
    ],
    workflowSteps: [
      { title: 'Determine scope', description: 'Establish whether the business provides a designated service and what obligations apply.' },
      { title: 'Design the workflow', description: 'Translate the business’s program, customer types and risk approach into controlled steps.' },
      { title: 'Collect and verify', description: 'Capture information and evidence appropriate to the customer and assessed risk.' },
      { title: 'Decide and record', description: 'Route exceptions, approvals and evidence into an auditable decision.' },
      { title: 'Review over time', description: 'Support monitoring and updates where the applicable obligations and risk require them.' },
    ],
    sectorCards: SECTORS,
    relatedPages: ['aml-ctf', 'tranche-2-client-onboarding', 'kyc-vs-kyb', 'customer-due-diligence-cdd', 'enhanced-customer-due-diligence', 'australian-aml-ctf-software-market'],
    primarySources: [SOURCES.reforms, SOURCES.designated, SOURCES.cdd, SOURCES.initialCdd],
    faq: [
      { question: 'Can software guarantee AML/CTF compliance?', answer: 'No. Software may support a reporting entity’s workflow, but compliance depends on the entity’s obligations, program, implementation and circumstances.' },
      { question: 'Is Onboard an AML/CTF product?', answer: 'No. The Onboard Australian domain portfolio is available for acquisition; this page is a market resource.' },
    ],
    legalReviewRequired: true,
  },
  'tranche-2-client-onboarding': {
    slug: 'tranche-2-client-onboarding',
    eyebrow: 'Newly regulated services',
    metaTitle: 'Tranche 2 Client Onboarding Australia | AML/CTF Workflows',
    metaDescription: 'Understand how client onboarding may change for Australian businesses providing newly regulated designated services from 1 July 2026.',
    h1: 'Tranche 2 client onboarding workflows',
    summary: '“Tranche 2” is commonly used for the expansion of Australia’s AML/CTF regime to certain professional, property and other high-risk services. It is a market label, not a substitute for checking the designated services.',
    workflowTopic: 'tranche_2',
    sections: [
      {
        title: 'The 1 July 2026 context',
        paragraphs: ['AUSTRAC states that businesses providing certain newly regulated designated services are regulated from 1 July 2026. The relevant groups include real-estate professionals, lawyers, conveyancers, accountants and trust and company service providers, but only in relation to services within the law’s scope.'],
        note: 'A business should first determine whether it provides a designated service, then establish the obligations applying to its activities.',
      },
      {
        title: 'Onboarding may become a controlled process',
        paragraphs: ['Where obligations apply, a client-opening process may need to establish the customer and relevant persons, understand the requested service, assess risk, apply the appropriate due-diligence path and retain decision evidence.'],
      },
      {
        title: 'Higher-risk and existing relationships',
        paragraphs: ['Enhanced and ongoing due diligence are not simply extra form fields. They can require targeted controls, review and updated information according to the customer’s risk and the reporting entity’s policies. Transitional and existing-customer questions should be checked against current AUSTRAC material.'],
      },
      {
        title: 'Governance before tooling',
        paragraphs: ['Technology decisions should follow clear ownership, escalation paths, policies and an understanding of the data the organisation needs to handle. A vendor cannot determine legal scope for a business merely from its profession.'],
      },
    ],
    workflowSteps: [
      { title: 'Check the service', description: 'Map actual activities against current designated-service guidance.' },
      { title: 'Understand the customer', description: 'Identify the customer, representatives and relevant entity relationships.' },
      { title: 'Assess risk', description: 'Apply the reporting entity’s documented customer-risk approach.' },
      { title: 'Select the review path', description: 'Use the initial, enhanced or other pathway that applies to the circumstances.' },
      { title: 'Keep evidence current', description: 'Record decisions and support later review as required.' },
    ],
    relatedPages: ['aml-ctf', 'aml-ctf-onboarding-software-australia', 'aml-ctf-accountants', 'aml-ctf-law-firms', 'aml-ctf-real-estate', 'customer-due-diligence-cdd'],
    primarySources: [SOURCES.reforms, SOURCES.designated, SOURCES.starterKits, SOURCES.rules],
    legalReviewRequired: true,
  },
  'aml-ctf-accountants': {
    slug: 'aml-ctf-accountants',
    eyebrow: 'Accounting profession',
    metaTitle: 'AML/CTF Client Onboarding for Accountants Australia',
    metaDescription: 'Explore client, entity, beneficial-owner, risk and CDD workflows for Australian accounting services that may be designated services.',
    h1: 'AML/CTF onboarding workflows for accountants',
    summary: 'Some services commonly provided by accountants may be designated services; ordinary accounting work is not automatically regulated merely because an accountant provides it.',
    sector: 'accountants',
    sections: [
      {
        title: 'Service scope comes first',
        paragraphs: ['AUSTRAC’s professional designated-services guidance is profession-neutral and turns on the service and facts of each case. An accounting practice should map its actual work rather than treat every engagement as regulated.'],
      },
      {
        title: 'Client and entity intake',
        paragraphs: ['A relevant engagement may involve individuals, companies, trusts, partnerships, representatives, controllers and beneficial owners. A configurable workflow can present the information path appropriate to the customer type.'],
        bullets: ['Customer and contact details', 'Entity and structure information', 'Authority to act', 'Purpose and nature of the service', 'Supporting evidence and review status'],
      },
      {
        title: 'Risk, CDD and escalation',
        paragraphs: ['Customer risk informs the information and controls appropriate to the relationship. Higher-risk or complex cases need a visible route to additional review rather than an automated pass based on form completion alone.'],
      },
      {
        title: 'Practice workflow and records',
        paragraphs: ['A practical implementation may connect engagement acceptance, responsible-partner review, document management and practice-management records. Integration should preserve decision history and access controls. AUSTRAC’s accountant starter kit is the authoritative starting point for eligible businesses using that pathway.'],
      },
    ],
    relatedPages: ['aml-ctf', 'tranche-2-client-onboarding', 'kyc-vs-kyb', 'customer-due-diligence-cdd', 'enhanced-customer-due-diligence', 'australian-aml-ctf-software-market'],
    primarySources: [SOURCES.designated, SOURCES.accountantKit, SOURCES.cdd, SOURCES.initialCdd],
    faq: [{ question: 'Are all accounting services regulated under the AML/CTF reforms?', answer: 'No. A practice needs to determine whether the particular services it provides are designated services and whether the other requirements apply.' }],
    legalReviewRequired: true,
  },
  'aml-ctf-law-firms': {
    slug: 'aml-ctf-law-firms',
    eyebrow: 'Legal profession',
    metaTitle: 'AML/CTF Client Onboarding for Australian Law Firms',
    metaDescription: 'Explore matter, client, entity, customer-risk and due-diligence workflows for Australian legal services that may be designated services.',
    h1: 'AML/CTF onboarding workflows for law firms',
    summary: 'Certain professional designated services may bring a legal practice within the AML/CTF regime. The answer depends on the service and facts—not the “law firm” label alone.',
    sector: 'law_firms',
    sections: [
      {
        title: 'Matter and service context',
        paragraphs: ['A controlled intake should distinguish the client relationship from the service being requested. AUSTRAC’s guidance gives examples of activities that may directly advance relevant transactions and activities that may fall outside that scope.'],
      },
      {
        title: 'Clients, entities and authority',
        paragraphs: ['Matter opening may need to capture the customer, representatives, authority to act, legal arrangements, companies, trusts, controllers and beneficial owners. The path should adapt to the structure rather than force every client through an individual-only form.'],
      },
      {
        title: 'Risk and review paths',
        paragraphs: ['Customer risk, the nature of the service and the available information can affect the review required. A workflow may support initial CDD, enhanced review, internal approval and documented escalation without replacing professional judgement.'],
      },
      {
        title: 'Records and professional duties',
        paragraphs: ['Access, confidentiality and record design need review against the practice’s professional and legal obligations. This page does not attempt to resolve privilege, confidentiality or conflicts between duties; those issues require current authoritative guidance and legal review.'],
        note: 'Professional-duties content requires legal review before a buyer adapts it into a product or compliance program.',
      },
    ],
    relatedPages: ['aml-ctf', 'tranche-2-client-onboarding', 'kyc-vs-kyb', 'customer-due-diligence-cdd', 'enhanced-customer-due-diligence', 'australian-aml-ctf-software-market'],
    primarySources: [SOURCES.designated, SOURCES.legalKit, SOURCES.cdd, SOURCES.initialCdd],
    faq: [{ question: 'Are all legal matters designated services?', answer: 'No. AUSTRAC’s guidance explains that coverage depends on the actual service and facts of the matter. A practice should assess its activities against current law and guidance.' }],
    legalReviewRequired: true,
  },
  'aml-ctf-real-estate': {
    slug: 'aml-ctf-real-estate',
    eyebrow: 'Real-estate sector',
    metaTitle: 'AML/CTF Client Onboarding for Australian Real Estate',
    metaDescription: 'Explore vendor, purchaser, identity, authority and customer-risk workflows for Australian real-estate designated services.',
    h1: 'AML/CTF onboarding workflows for real estate',
    summary: 'Real-estate AML/CTF coverage is tied to particular designated services. It should not be described as applying identically to every sale, lease or agency activity.',
    sector: 'real_estate',
    sections: [
      {
        title: 'Property-related service scope',
        paragraphs: ['AUSTRAC publishes a dedicated description of real-estate designated services and separate professional-services guidance. Businesses should identify the customer and the specific activity being performed before designing an onboarding path.'],
      },
      {
        title: 'Vendor and purchaser onboarding',
        paragraphs: ['A workflow may need separate paths for vendors, purchasers, representatives and non-individual customers. Identity, authority, entity and ownership information can be captured alongside transaction context.'],
        bullets: ['Customer and representative details', 'Authority to act', 'Company or trust information', 'Beneficial-owner information where applicable', 'Transaction and service context'],
      },
      {
        title: 'Risk and higher-review scenarios',
        paragraphs: ['Customer and transaction information may inform a risk assessment and whether additional review is required. Software can route a case for manual attention, but screening or form completion alone does not establish compliance.'],
      },
      {
        title: 'Agency workflow and evidence',
        paragraphs: ['A useful implementation may connect listing or buyer engagement, responsible-person approval, customer records and an exportable audit trail. The AUSTRAC real-estate starter kit is a primary operational source for eligible businesses choosing that approach.'],
      },
    ],
    relatedPages: ['aml-ctf', 'tranche-2-client-onboarding', 'kyc-vs-kyb', 'customer-due-diligence-cdd', 'enhanced-customer-due-diligence', 'australian-aml-ctf-software-market'],
    primarySources: [SOURCES.reforms, SOURCES.realEstate, SOURCES.realEstateKit, SOURCES.cdd],
    faq: [{ question: 'Does the regime apply to every real-estate activity?', answer: 'No. Coverage depends on the designated service and other applicable requirements. Refer to AUSTRAC’s current real-estate guidance.' }],
    legalReviewRequired: true,
  },
  'kyc-vs-kyb': {
    slug: 'kyc-vs-kyb',
    eyebrow: 'Identity and entity verification',
    metaTitle: 'KYC vs KYB: Individual and Business Verification Australia',
    metaDescription: 'Compare KYC for individuals with commonly used KYB workflows for companies, trusts, partnerships, representatives and beneficial owners.',
    h1: 'KYC vs KYB',
    summary: 'KYC is the established “know your customer” language used in AUSTRAC guidance. KYB is common industry shorthand for business or entity verification; it should not be treated as a separate statutory AUSTRAC category without context.',
    workflowTopic: 'kyc_kyb',
    sections: [
      {
        title: 'The practical distinction',
        paragraphs: ['An individual path focuses on establishing a person and relevant risk information. An entity path commonly also needs to understand the organisation, who represents it, who controls or owns it where relevant, and why it is seeking the service.'],
      },
      {
        title: 'Entity types change the path',
        paragraphs: ['Companies, trusts, partnerships and other legal arrangements have different structures and evidence. A flexible workflow should branch by customer type and preserve the relationship between the entity and the people connected to it.'],
      },
      {
        title: 'Verification and manual review',
        paragraphs: ['Reliable independent data can support verification, but mismatches, complex structures, authority questions and risk indicators may require manual review. A pass from one data source is not the whole customer due-diligence process.'],
      },
    ],
    definitions: [
      { term: 'KYC', description: 'Know your customer: information used to identify and understand a customer and relevant persons, with verification appropriate to the circumstances and risk.' },
      { term: 'KYB', description: 'Common industry shorthand for know-your-business or entity-verification workflows. It is useful product language, but not presented here as a separate defined AUSTRAC obligation.' },
      { term: 'CDD', description: 'Customer due diligence: the broader process AUSTRAC describes through identification, verification and monitoring.' },
    ],
    comparison: {
      headings: ['Workflow area', 'Individual customer', 'Company, trust or other entity'],
      rows: [
        ['Primary subject', 'The individual and any person acting for them', 'The entity plus relevant representatives and connected persons'],
        ['Typical structure', 'Personal identity information', 'Registration, legal form, structure and authority'],
        ['Connected people', 'Representatives or persons on whose behalf the service is received', 'Representatives, controllers and beneficial owners where applicable'],
        ['Review complexity', 'May still require escalation based on risk or evidence', 'Can require structure tracing, relationship mapping and manual review'],
      ],
    },
    relatedPages: ['aml-ctf', 'aml-ctf-onboarding-software-australia', 'customer-due-diligence-cdd', 'enhanced-customer-due-diligence', 'aml-ctf-accountants', 'aml-ctf-law-firms'],
    primarySources: [SOURCES.cdd, SOURCES.initialCdd, SOURCES.designated],
    faq: [{ question: 'Is KYB a defined AUSTRAC term?', answer: 'KYB is commonly used by industry for business-verification workflows. This guide does not present it as a separate statutory AUSTRAC term.' }],
    legalReviewRequired: true,
  },
  'customer-due-diligence-cdd': {
    slug: 'customer-due-diligence-cdd',
    eyebrow: 'Initial customer due diligence',
    metaTitle: 'Customer Due Diligence Australia | Initial CDD Guide',
    metaDescription: 'A sourced overview of initial customer due diligence, identification, verification, customer risk, evidence and onboarding workflows in Australia.',
    h1: 'Customer due diligence and client onboarding',
    summary: 'AUSTRAC describes CDD as understanding customers before providing designated services and throughout the business relationship, using identification, verification and monitoring.',
    workflowTopic: 'initial_cdd',
    sections: [
      {
        title: 'What initial CDD is for',
        paragraphs: ['Initial CDD is concerned with establishing the customer and specified related persons, understanding the relationship or transaction, identifying customer ML/TF risk and collecting and verifying information appropriate to that risk.'],
      },
      {
        title: 'Customer and relationship information',
        paragraphs: ['The path depends on the customer type. Individuals, companies, trusts and other arrangements can require different information, including representatives and beneficial owners where applicable.'],
        bullets: ['Customer identity', 'People acting for or connected to the customer', 'Authority to act', 'Purpose and nature of the relationship', 'Customer-risk information'],
      },
      {
        title: 'Evidence and decisions',
        paragraphs: ['An onboarding system can collect information, connect to verification services and record review outcomes. The reporting entity still needs policies defining what it collects and verifies, when it escalates and how it establishes required matters.'],
      },
      {
        title: 'CDD continues after onboarding',
        paragraphs: ['Initial CDD is part of a wider lifecycle. Ongoing monitoring, updated information and enhanced measures may become relevant according to the applicable obligations and customer risk.'],
      },
    ],
    workflowSteps: [
      { title: 'Collect', description: 'Capture customer and relationship information appropriate to the customer type.' },
      { title: 'Assess', description: 'Identify the customer’s ML/TF risk under the reporting entity’s approach.' },
      { title: 'Verify', description: 'Use reliable and independent data appropriate to the circumstances and risk.' },
      { title: 'Resolve', description: 'Investigate mismatches, exceptions and higher-review cases.' },
      { title: 'Record', description: 'Keep the information and reasoning needed to evidence the decision.' },
    ],
    relatedPages: ['aml-ctf', 'kyc-vs-kyb', 'enhanced-customer-due-diligence', 'tranche-2-client-onboarding', 'aml-ctf-accountants', 'aml-ctf-real-estate'],
    primarySources: [SOURCES.cdd, SOURCES.initialCdd, SOURCES.ongoingCdd, SOURCES.rules],
    faq: [{ question: 'Is CDD only an identity check?', answer: 'No. AUSTRAC describes CDD through identification, verification and monitoring, with customer risk and the broader relationship also relevant.' }],
    legalReviewRequired: true,
  },
  'enhanced-customer-due-diligence': {
    slug: 'enhanced-customer-due-diligence',
    eyebrow: 'Higher-review workflows',
    metaTitle: 'Enhanced Customer Due Diligence Australia | ECDD',
    metaDescription: 'Understand enhanced customer due diligence workflows, additional review, approval, evidence and escalation using current AUSTRAC guidance.',
    h1: 'Enhanced customer due diligence workflows',
    summary: 'Enhanced CDD involves additional, risk-targeted measures. It is not a universal document list, and the controls used should be proportionate, effective and appropriate to the risk and circumstances.',
    workflowTopic: 'enhanced_cdd',
    sections: [
      {
        title: 'When additional controls matter',
        paragraphs: ['AUSTRAC identifies specific circumstances in which enhanced CDD applies, including high customer ML/TF risk and other defined situations. This guide does not reproduce a definitive trigger list; teams should use the current official guidance and their policies.'],
      },
      {
        title: 'Target the identified risk',
        paragraphs: ['Additional information or verification should respond to the reason for enhanced review. Complex ownership, a change in risk, unusual activity or a relevant PEP context can require different investigation and evidence.'],
      },
      {
        title: 'Review and approval workflow',
        paragraphs: ['Technology may support case assignment, evidence requests, screening results, internal notes, approvals and an audit trail. It should also make unresolved issues visible and prevent a superficial “complete” status.'],
        bullets: ['Reason for enhanced review', 'Additional information requested', 'Verification and screening outcomes', 'Reviewer and approval history', 'Decision, controls and next-review status'],
      },
      {
        title: 'Ongoing and repeatable controls',
        paragraphs: ['Enhanced measures may be relevant during initial CDD, ongoing CDD or both. Workflow configuration should support review over time where the risk and the reporting entity’s obligations require it.'],
      },
    ],
    workflowSteps: [
      { title: 'Record the reason', description: 'Identify the circumstance and customer risk driving enhanced review.' },
      { title: 'Select targeted measures', description: 'Apply controls that address the specific risk rather than a generic bundle.' },
      { title: 'Investigate', description: 'Collect, verify and assess the additional information needed.' },
      { title: 'Approve or escalate', description: 'Route the case under the reporting entity’s policies and responsibilities.' },
      { title: 'Set the next review', description: 'Preserve evidence and any ongoing control or monitoring decision.' },
    ],
    relatedPages: ['aml-ctf', 'customer-due-diligence-cdd', 'kyc-vs-kyb', 'tranche-2-client-onboarding', 'aml-ctf-law-firms', 'aml-ctf-real-estate'],
    primarySources: [SOURCES.enhancedCdd, SOURCES.cdd, SOURCES.initialCdd, SOURCES.ongoingCdd],
    faq: [{ question: 'Is enhanced CDD the same for every higher-risk customer?', answer: 'No. AUSTRAC says measures should be targeted, proportionate and effective for the specific risk and its duration.' }],
    legalReviewRequired: true,
  },
  'australian-aml-ctf-software-market': {
    slug: 'australian-aml-ctf-software-market',
    eyebrow: 'Australian market guide',
    metaTitle: 'Australian AML/CTF and Tranche 2 Software Market 2026',
    metaDescription: 'A neutral 2026 overview of Australian AML/CTF, KYC, KYB, identity, screening and client-onboarding technology categories and providers.',
    h1: 'Australian AML/CTF software market guide',
    summary: 'A factual orientation to technology categories and selected providers with Australian availability. Listings use public provider information and do not constitute endorsement or a claim that one product satisfies every obligation.',
    workflowTopic: 'software_market',
    sections: [
      {
        title: 'A broader buyer market in 2026',
        paragraphs: ['The 1 July 2026 expansion creates demand from businesses that may be new to structured AML/CTF workflows. The market spans specialist compliance platforms, identity and business verification, screening, onboarding orchestration and practice-management integrations.'],
      },
      {
        title: 'Different products solve different layers',
        paragraphs: ['Identity verification, entity data, PEP and sanctions screening, customer-risk workflow, monitoring and records may come from one platform or several connected services. Buyers should distinguish a data check from an end-to-end operating workflow.'],
        bullets: ['Client onboarding and case workflow', 'Individual identity verification', 'Entity and beneficial-ownership workflows', 'PEP and sanctions screening', 'Ongoing monitoring and review', 'Audit trails and reporting exports'],
      },
      {
        title: 'Evaluation questions',
        paragraphs: ['A useful evaluation starts with the reporting entity’s customer types, services, policies, risk approach and integration environment. Claims should be tested against current product documentation and a representative set of real cases.'],
        bullets: ['Which customer and entity types are supported?', 'What information is collected versus verified?', 'How are exceptions and manual review handled?', 'Which data sources and jurisdictions are available?', 'How are changes, access and audit records managed?', 'Is pricing public or quote-based?'],
      },
      {
        title: 'A strategic category brand',
        paragraphs: ['Onboard is a concise description of the journey these platforms coordinate. The complete Australian portfolio is available to a compliance, identity, onboarding or professional-services technology business seeking a direct market position.'],
      },
    ],
    vendors: [
      {
        name: 'FrankieOne',
        url: 'https://frankieone.com/',
        availability: 'Official website presents a global platform with Australian market roots and coverage.',
        sectors: 'Banks, fintechs and other regulated organisations.',
        capabilities: 'Publicly states KYC, KYB, AML, identity and fraud orchestration capabilities.',
        integrations: 'Single API and integration hub across third-party data sources and checks.',
        pricing: 'Contact provider; no standard public price verified.',
      },
      {
        name: 'GBG greenID',
        url: 'https://www.gbg.com/en/contact/customer-support/greenid/',
        availability: 'Australian support and greenID customer access are publicly listed.',
        sectors: 'Financial services, gaming, crypto, insurance, public sector and other identity use cases.',
        capabilities: 'Publicly lists identity-data verification, documents and biometrics, KYC and KYB.',
        integrations: 'Product and platform details should be confirmed with GBG for the intended workflow.',
        pricing: 'Contact provider; no standard public price verified.',
      },
      {
        name: 'Equifax Australia',
        url: 'https://www.equifax.com.au/business-enterprise/solutions/aml-compliance',
        availability: 'Australian AML and due-diligence solution pages are publicly available.',
        sectors: 'Financial services and other reporting entities, including newly regulated use cases.',
        capabilities: 'Publicly describes identity, entity, beneficial-ownership, screening and ongoing due-diligence services.',
        integrations: 'Portal, workflow and service options vary by product and should be confirmed directly.',
        pricing: 'Contact provider; no standard public price verified.',
      },
    ],
    relatedPages: ['aml-ctf', 'aml-ctf-onboarding-software-australia', 'tranche-2-client-onboarding', 'aml-ctf-accountants', 'aml-ctf-law-firms', 'aml-ctf-real-estate'],
    primarySources: [SOURCES.reforms, SOURCES.designated, SOURCES.cdd, SOURCES.starterKits],
    faq: [
      { question: 'Are the listed providers endorsed by Onboard or AUSTRAC?', answer: 'No. Listings are informational, and inclusion does not imply endorsement, affiliation or suitability for a particular business.' },
      { question: 'Does buying software make a business compliant?', answer: 'No. Software can support controls and evidence, but the business remains responsible for understanding and meeting the obligations that apply to it.' },
    ],
    legalReviewRequired: true,
  },
}

export const AML_PHASE_ONE_ROUTES = Object.keys(AML_PAGES)

export function getAmlMetadata(slug: string): Metadata {
  const page = AML_PAGES[slug]
  const canonical = `${SITE_URL}/${page.slug}`
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    authors: [{ name: 'Onboard Australia editorial' }],
    alternates: { canonical },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonical,
      siteName: 'Onboard Australia',
      type: 'article',
      locale: 'en_AU',
      modifiedTime: AML_LAST_REVIEWED_ISO,
    },
    twitter: { card: 'summary_large_image', title: page.metaTitle, description: page.metaDescription },
  }
}

export function getAmlPageLabel(slug: string) {
  return AML_PAGES[slug]?.h1 || slug.replaceAll('-', ' ')
}
