import type { Metadata } from 'next'

export const SITE_URL = 'https://onboard.com.au'
export const ASKING_PRICE = 29_500
export const MINIMUM_OFFER = 18_000

export const MARKET_LINKS = [
  { name: 'Employee onboarding', href: '/employee-onboarding' },
  { name: 'Contractor onboarding', href: '/contractor-onboarding' },
  { name: 'Customer onboarding', href: '/customer-onboarding' },
  { name: 'Client onboarding', href: '/client-onboarding' },
  { name: 'SaaS onboarding', href: '/saas-onboarding' },
  { name: 'KYC onboarding', href: '/kyc-onboarding' },
  { name: 'Construction inductions', href: '/construction-inductions' },
]

export const PROCESS_STEPS = [
  { number: '01', title: 'Submit acquisition request', description: 'Choose the fixed-price pathway or submit a confidential offer with qualified buyer details.' },
  { number: '02', title: 'Buyer verification', description: 'The seller confirms the buyer entity, authority to act and likely eligibility to hold the Australian domains.' },
  { number: '03', title: 'Agreement and invoice', description: 'The parties settle the scope, execute a domain sale agreement and receive a tax invoice.' },
  { number: '04', title: 'Cleared EFT settlement', description: 'The buyer pays by electronic funds transfer, or uses an agreed escrow arrangement.' },
  { number: '05', title: 'Domain transfer', description: 'Once funds clear, transfer credentials and reasonable transfer assistance are provided.' },
]

export const HOME_FAQS = [
  { question: 'Are the domains sold together?', answer: 'Yes. onboard.com.au, onboard.au and onboard.net.au are initially offered as one Australian domain portfolio.' },
  { question: 'Is the price negotiable?', answer: 'The fixed acquisition price is A$29,500 plus GST if applicable. Qualified buyers may also submit a confidential offer.' },
  { question: 'Is GST included?', answer: 'The public price is stated as A$29,500 plus GST if applicable. Final tax treatment will be confirmed in the sale documentation and tax invoice.' },
  { question: 'How does settlement work?', answer: 'Settlement proceeds through buyer verification, a sale agreement, tax invoice, cleared electronic funds transfer and domain transfer. No card payment is taken on this website.' },
  { question: 'Can an overseas company acquire the domains?', answer: 'Potentially, but the registrant must satisfy the applicable auDA eligibility and allocation rules. Buyers should obtain their own advice and confirm eligibility before settlement.' },
  { question: 'What eligibility is required for .au domains?', answer: 'Australian presence and namespace-specific allocation requirements apply. Eligibility is verified against the current auDA Licensing Rules before transfer.' },
  { question: 'Is the current website included?', answer: 'The domain portfolio is the primary asset. Existing website content and other digital assets may be discussed separately and are not automatically included.' },
  { question: 'How quickly can the transfer be completed?', answer: 'Timing depends on buyer verification, agreement execution, cleared funds, registrar processes and buyer eligibility. A straightforward transaction may complete promptly, but no same-day transfer is promised.' },
  { question: 'Can a buyer use escrow?', answer: 'An established escrow arrangement may be considered by agreement, including agreement on provider and fees.' },
  { question: 'Are historical traffic or revenue guarantees provided?', answer: 'No. Historical search data is supplied for context only. No guarantee is made regarding traffic, rankings, revenue, conversion or future domain value.' },
]

export interface EditorialSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export interface MarketPageConfig {
  slug: string
  eyebrow: string
  title: string
  description: string
  intro: string
  sections: EditorialSection[]
  fitTitle: string
  fitParagraphs: string[]
  disclaimer?: string
  related: string[]
}

export const MARKET_PAGES: Record<string, MarketPageConfig> = {
  'employee-onboarding': {
    slug: 'employee-onboarding',
    eyebrow: 'Employee onboarding market',
    title: 'Employee onboarding technology in Australia',
    description: 'A practical overview of employee onboarding workflows and why the Onboard Australian domain portfolio fits an HR technology brand.',
    intro: 'Employee onboarding connects recruitment, HR administration, payroll readiness, workplace compliance and the employee experience. The category ranges from focused pre-start tools to broad human-capital platforms.',
    sections: [
      { title: 'What employee onboarding includes', paragraphs: ['A structured process begins when a candidate accepts an offer and continues through pre-start preparation, day-one readiness and early employment milestones. The workflow often crosses HR, payroll, IT, facilities and the hiring manager.'], bullets: ['Offers, contracts and electronic signatures', 'Personal, tax, bank and superannuation details', 'Policies, acknowledgements and required documents', 'Equipment, access and system provisioning', 'Role training, introductions and probation milestones'] },
      { title: 'Common workflows', paragraphs: ['Australian employers typically need a clear hand-off from recruitment into a secure employee record. Reusable templates can help teams assign tasks by role, location or employment type while maintaining visibility over incomplete actions.'], bullets: ['Candidate-to-employee data transfer', 'Pre-start forms and document collection', 'Automated reminders and approvals', 'Manager and new-starter task lists', 'Completion reporting and audit history'] },
      { title: 'Typical buyers and users', paragraphs: ['HR technology vendors, payroll platforms, workforce-management providers and recruitment systems may all address part of this market. Buyers inside an organisation can include people teams, payroll, IT, risk and operational leaders.'], bullets: ['HR and people operations', 'Payroll and workforce administration', 'Talent acquisition', 'IT service management', 'Compliance and learning teams'] },
      { title: 'Australian considerations', paragraphs: ['Local workflows commonly involve Australian employment records, tax and superannuation details, work-right checks and privacy obligations. Requirements vary by organisation, sector and employment arrangement, so product design needs configurable controls rather than a single universal checklist.'] },
    ],
    fitTitle: 'Why “Onboard” fits an HR technology brand',
    fitParagraphs: ['Onboard is already the verb teams use for bringing a new employee into an organisation. It is short, positive and understood by HR leaders, hiring managers and employees without explanation.', 'The three-domain portfolio provides a clear Australian identity for a focused onboarding product, an HR platform module or a broader workforce brand.'],
    related: ['contractor-onboarding', 'client-onboarding', 'australian-onboarding-software-market'],
  },
  'contractor-onboarding': {
    slug: 'contractor-onboarding',
    eyebrow: 'Contractor and workforce compliance',
    title: 'Contractor onboarding and workforce compliance',
    description: 'Contractor prequalification, credential, induction and mobilisation workflows in Australia—and the commercial fit of the Onboard brand.',
    intro: 'Contractor onboarding begins before a worker reaches a site. It brings company prequalification, worker credentials, insurance, inductions, access and ongoing compliance into one controlled workflow.',
    sections: [
      { title: 'Contractor prequalification', paragraphs: ['Organisations often assess a contracting entity before inviting individual workers to mobilise. The scope depends on risk, industry and procurement requirements.'], bullets: ['Entity and ABN details', 'Insurance certificates and expiry dates', 'Safety systems and policies', 'Trade licences and capability evidence', 'Commercial and risk approvals'] },
      { title: 'Worker credentials and inductions', paragraphs: ['Once a contractor company is approved, individual workers may need to supply licences, competencies and identity information, then complete role- or site-specific learning.'], bullets: ['Licence and competency collection', 'Identity and work-right checks where required', 'Policy and SWMS acknowledgements', 'Online inductions and assessments', 'Completion and expiry tracking'] },
      { title: 'Site access and mobilisation', paragraphs: ['Onboarding status becomes operational when it controls whether a worker is ready to start. Integrations may connect compliance records to rosters, access control, sign-in systems or project mobilisation.'], bullets: ['Ready-to-work status', 'Project and location assignment', 'QR or access-control workflows', 'Mobilisation task lists', 'Exception handling and approvals'] },
      { title: 'Ongoing compliance', paragraphs: ['Contractor onboarding is not a one-time event. Insurance, licences, inductions and project requirements expire or change, so mature systems continue monitoring after initial approval.'] },
    ],
    fitTitle: 'Why Onboard suits contractor-management software',
    fitParagraphs: ['The name describes the commercial outcome directly: get a company, worker or supplier approved and ready to work. It can cover the journey from prequalification through mobilisation without being tied to one industry.', 'An Australian exact-match domain can support contractor compliance, workforce mobilisation, supplier onboarding or site-access technology.'],
    related: ['construction-inductions', 'employee-onboarding', 'melbourne-onboarding-software'],
  },
  'customer-onboarding': {
    slug: 'customer-onboarding',
    eyebrow: 'Customer onboarding market',
    title: 'Customer onboarding platforms in Australia',
    description: 'Customer activation, account setup, implementation and adoption workflows—and why Onboard is a versatile Australian brand.',
    intro: 'Customer onboarding turns a signed agreement or completed registration into an active, capable customer. In simple products this may take minutes; in enterprise software and regulated services it can involve weeks of coordinated work.',
    sections: [
      { title: 'Customer activation', paragraphs: ['The first objective is to move a customer from intent to a working account with clear ownership and next steps.'], bullets: ['Account and profile setup', 'Invitations, permissions and team access', 'Identity or business verification', 'Payment or billing configuration', 'Welcome communications and next actions'] },
      { title: 'Product education', paragraphs: ['Guided setup, contextual learning and role-based checklists help customers reach an early outcome without being overwhelmed by the full product.'], bullets: ['Setup checklists', 'Interactive guidance', 'Knowledge and training content', 'Milestone tracking', 'Support escalation'] },
      { title: 'Implementation milestones', paragraphs: ['Enterprise onboarding may include discovery, configuration, data migration, integration, testing and go-live. A shared plan helps the vendor and customer understand dependencies and accountability.'] },
      { title: 'Retention and adoption', paragraphs: ['Onboarding is closely connected to adoption. Teams monitor completion, feature use, stakeholder engagement and time-to-value so that early friction is addressed before it becomes churn risk.'] },
    ],
    fitTitle: 'Why Onboard fits customer onboarding',
    fitParagraphs: ['“Onboard” works as both a product name and a call to action. It describes the customer journey without limiting the brand to one software category or implementation method.', 'The portfolio could support customer-success software, identity-led account opening, implementation management or a specialist onboarding service.'],
    related: ['saas-onboarding', 'kyc-onboarding', 'sydney-customer-onboarding'],
  },
  'client-onboarding': {
    slug: 'client-onboarding',
    eyebrow: 'Professional services',
    title: 'Client onboarding for Australian professional services',
    description: 'Client intake, engagement, document and compliance workflows for accounting, legal and advisory firms.',
    intro: 'Client onboarding is the bridge between winning work and delivering it. Professional-services firms need to capture the right information, establish the engagement, complete risk checks and make the hand-off into service delivery visible.',
    sections: [
      { title: 'From proposal to engagement', paragraphs: ['A controlled workflow can begin with proposal acceptance and continue through scope confirmation, engagement letters and authority to proceed.'], bullets: ['Proposal and scope acceptance', 'Engagement letters and e-signatures', 'Conflict or independence checks', 'Responsible partner assignment', 'Matter or job creation'] },
      { title: 'Client information capture', paragraphs: ['Structured intake reduces repeated questions and gives service teams a consistent record. Different entity types and services may require different fields and evidence.'], bullets: ['Contact and entity information', 'ABN, ACN and ownership details', 'Goals, service requirements and deadlines', 'Document requests and secure upload', 'Communication preferences'] },
      { title: 'Payments and compliance', paragraphs: ['Firms may need payment setup, identity checks, privacy consents or regulatory procedures before work begins. The exact requirements depend on the profession, service and risk profile.'] },
      { title: 'Professional-services use cases', paragraphs: ['Accounting, legal, financial advisory, consulting and managed-service firms share a need for a clear client record and a reliable transition from sales into delivery.'] },
    ],
    fitTitle: 'Why Onboard fits a client-intake brand',
    fitParagraphs: ['The term is familiar to both firms and clients, while remaining warmer and more action-oriented than “intake” or “matter opening.”', 'Onboard could serve a vertical professional-services product or a horizontal workflow platform connecting forms, agreements, documents and compliance.'],
    related: ['customer-onboarding', 'kyc-onboarding', 'employee-onboarding'],
  },
  'saas-onboarding': {
    slug: 'saas-onboarding',
    eyebrow: 'SaaS implementation',
    title: 'SaaS customer onboarding and implementation',
    description: 'A market guide to SaaS setup, implementation, adoption and customer-success handover, presented by the Onboard domain portfolio.',
    intro: 'SaaS onboarding covers the work between purchase and sustained product use. Self-serve products focus on fast activation; enterprise platforms coordinate people, configuration, data, integrations and change management.',
    sections: [
      { title: 'Product onboarding', paragraphs: ['Product-led onboarding helps a user reach a meaningful first outcome through focused setup, contextual prompts and progress cues.'], bullets: ['Account and workspace setup', 'Role-based setup paths', 'Templates and sample data', 'Guided tasks and in-product education', 'Activation and completion signals'] },
      { title: 'Implementation', paragraphs: ['Complex products require a shared delivery plan. Discovery, solution design, configuration and testing often involve customer and vendor teams working across several systems.'], bullets: ['Discovery and success criteria', 'Configuration and permissions', 'Integration and data migration', 'Testing and acceptance', 'Go-live planning'] },
      { title: 'Training and adoption', paragraphs: ['Training may combine live sessions, self-paced content and role-specific resources. Adoption measures should reflect the customer outcome, not just completion of a generic checklist.'] },
      { title: 'Customer-success handover', paragraphs: ['A documented transition from implementation to ongoing customer success preserves context, outstanding actions, stakeholder commitments and agreed value measures.'] },
    ],
    fitTitle: 'Why Onboard fits SaaS',
    fitParagraphs: ['Onboard is concise enough for a product name and broad enough for self-serve activation, enterprise implementation or customer-success operations.', 'The Australian portfolio gives a local market signal without restricting a future product from expanding internationally under complementary domains.'],
    related: ['customer-onboarding', 'client-onboarding', 'sydney-customer-onboarding'],
  },
  'kyc-onboarding': {
    slug: 'kyc-onboarding',
    eyebrow: 'Digital identity and KYC',
    title: 'KYC, digital identity and customer onboarding',
    description: 'General market information about Australian KYC, business verification and regulated customer-onboarding workflows.',
    intro: 'Regulated onboarding combines a usable customer journey with identity, business and risk controls. The workflow varies by product, customer type, jurisdiction and the obligations that apply to the provider.',
    sections: [
      { title: 'Know Your Customer workflows', paragraphs: ['A KYC process commonly captures identity information, validates evidence and records the outcome of checks before an account or service is activated.'], bullets: ['Identity data capture', 'Document and biometric verification', 'Address and source checks where required', 'Screening and risk assessment', 'Review, escalation and audit records'] },
      { title: 'Business verification', paragraphs: ['Business onboarding may need entity registration details, beneficial ownership information, authorised representatives and evidence of the intended relationship.'], bullets: ['Entity and registry checks', 'Director and beneficial-owner capture', 'Authority to act', 'Business documents', 'Ongoing review triggers'] },
      { title: 'Financial-services use cases', paragraphs: ['Banks, lenders, payments businesses, wealth platforms, marketplaces and fintechs may all use onboarding orchestration to combine internal rules with external identity, fraud and data services.'] },
      { title: 'Customer experience and controls', paragraphs: ['Risk-based orchestration can present the checks relevant to a customer while routing exceptions for review. Good design makes status, consent and next steps clear without weakening required controls.'] },
    ],
    fitTitle: 'Why Onboard suits regulated onboarding',
    fitParagraphs: ['The name focuses on the customer outcome rather than a single check or data source. That makes it suitable for orchestration across identity, KYC, KYB, AML and account-opening workflows.', 'Its Australian domains could support a local fintech, regulated platform or verification provider seeking a direct and memorable brand.'],
    disclaimer: 'This page is general market information and is not legal, compliance or financial advice. Requirements should be assessed for the specific organisation, product and jurisdiction.',
    related: ['customer-onboarding', 'client-onboarding', 'sydney-customer-onboarding'],
  },
  'construction-inductions': {
    slug: 'construction-inductions',
    eyebrow: 'Construction technology',
    title: 'Construction inductions and contractor onboarding',
    description: 'Worker registration, site induction, credential and contractor-prequalification workflows for construction technology buyers.',
    intro: 'Construction onboarding coordinates the company, worker, project and site requirements that need to be satisfied before work begins. Digital workflows can move preparation off site while maintaining a clear readiness record.',
    sections: [
      { title: 'Worker registration', paragraphs: ['A worker profile can capture identity, employer, role, contact information and the evidence needed for the work they will perform.'], bullets: ['Worker and employer details', 'Trade licences and competencies', 'Emergency and project information', 'Mobile-accessible registration', 'Review and approval status'] },
      { title: 'Site inductions', paragraphs: ['Project-specific content communicates site rules, hazards and emergency procedures. Assessments and acknowledgements create a completion record before access is granted.'], bullets: ['Site and role-specific modules', 'Video, documents and assessments', 'Policy and SWMS acknowledgement', 'Language and accessibility considerations', 'Completion evidence'] },
      { title: 'Contractor prequalification', paragraphs: ['Head contractors and asset owners may assess contracting companies separately from individual workers, including insurance, safety systems and commercial documentation.'] },
      { title: 'Recurring compliance and access', paragraphs: ['Expiry monitoring, refresher requirements and access integrations help ensure a worker who was ready yesterday remains authorised for the work and site today.'] },
    ],
    fitTitle: 'Why Onboard fits construction technology',
    fitParagraphs: ['Onboard speaks directly to the moment a subcontractor or worker becomes ready to enter a project. It can cover registration, induction, compliance and mobilisation without using narrow safety jargon.', 'The portfolio could support construction induction software, contractor management, workforce compliance or site-access technology.'],
    related: ['contractor-onboarding', 'melbourne-onboarding-software', 'australian-onboarding-software-market'],
  },
  'melbourne-onboarding-software': {
    slug: 'melbourne-onboarding-software',
    eyebrow: 'Melbourne market perspective',
    title: 'Melbourne employee and contractor onboarding technology',
    description: 'An editorial overview of Melbourne HR technology, workforce compliance, construction onboarding and professional-services intake.',
    intro: 'Melbourne’s onboarding technology market spans people systems, workforce compliance, construction technology and the intake needs of major professional-services organisations. This is a market perspective, not a claim that Onboard operates a Melbourne office.',
    sections: [
      { title: 'HR technology and workforce management', paragraphs: ['Melbourne organisations range from growing employers to complex multi-site workforces. Their onboarding needs often connect recruitment, HR records, payroll readiness, scheduling and learning.'], bullets: ['Pre-start employee workflows', 'Casual and shift-workforce readiness', 'Payroll and HRIS hand-off', 'Role and location-based task automation', 'Credential and training records'] },
      { title: 'Contractor compliance and construction', paragraphs: ['Victoria’s construction, infrastructure, facilities and industrial sectors create demand for contractor prequalification, worker credentials, site induction and access workflows. The technology category sits between procurement, safety and site operations.'] },
      { title: 'Professional-services client intake', paragraphs: ['Melbourne’s accounting, legal, advisory and consulting firms need efficient ways to move a new client from engagement into delivery while managing documents, entity details, approvals and risk processes.'] },
      { title: 'A commercially flexible local brand', paragraphs: ['An Australian exact-match Onboard domain could suit a Melbourne-founded HR, construction or workflow technology business without implying a physical office or local service area.'] },
    ],
    fitTitle: 'The Onboard opportunity in Melbourne',
    fitParagraphs: ['The name works across the people, contractor and client workflows prominent in the Melbourne market. It provides local relevance through the domain portfolio rather than through unsupported location claims.', 'A buyer could establish a focused category brand while retaining room to expand into adjacent onboarding workflows.'],
    related: ['employee-onboarding', 'contractor-onboarding', 'construction-inductions'],
  },
  'sydney-customer-onboarding': {
    slug: 'sydney-customer-onboarding',
    eyebrow: 'Sydney market perspective',
    title: 'Sydney customer onboarding, fintech and KYC platforms',
    description: 'An editorial overview of Sydney fintech, enterprise SaaS, digital identity and regulated customer-onboarding markets.',
    intro: 'Sydney’s concentration of financial services, fintech and enterprise technology creates a distinct onboarding market centred on customer activation, identity, implementation and regulated account opening. This page is market information and does not claim a Sydney office.',
    sections: [
      { title: 'Fintech and financial services', paragraphs: ['Customer onboarding in financial services can join application data, identity verification, business verification, risk decisions, disclosures and account activation. Established institutions and fintechs may approach the journey differently, but both need usable controls and clear exception handling.'] },
      { title: 'Digital identity, KYC and AML', paragraphs: ['Sydney-based teams working in banking, payments, lending and wealth technology may need to orchestrate multiple data and verification services. The opportunity extends beyond a single identity check into end-to-end onboarding operations.'], bullets: ['Individual identity verification', 'Business and beneficial-owner checks', 'Fraud and risk signals', 'Consent and disclosure records', 'Manual review and escalation'] },
      { title: 'Enterprise SaaS implementation', paragraphs: ['Large customers frequently need structured discovery, configuration, integration, migration and training before a platform is operational. Implementation visibility can be a product category in its own right.'] },
      { title: 'Customer activation and adoption', paragraphs: ['For less regulated software, the commercial focus shifts toward time-to-value, guided setup and adoption. A broad onboarding brand can span both self-serve and high-touch enterprise journeys.'] },
    ],
    fitTitle: 'The Onboard opportunity in Sydney',
    fitParagraphs: ['Onboard is broad enough for fintech orchestration, digital identity, customer-success operations or enterprise implementation while remaining direct and memorable.', 'The portfolio offers an Australian brand foundation without implying endorsement by, or affiliation with, any Sydney market participant.'],
    disclaimer: 'This page is general market information and is not legal, compliance or financial advice.',
    related: ['kyc-onboarding', 'customer-onboarding', 'saas-onboarding'],
  },
}

export function getMarketMetadata(slug: string): Metadata {
  const page = MARKET_PAGES[slug]
  const canonical = `${SITE_URL}/${slug}`
  return {
    title: `${page.title} | Onboard Australia`,
    description: page.description,
    alternates: { canonical },
    openGraph: { title: page.title, description: page.description, url: canonical, type: 'website', locale: 'en_AU' },
    twitter: { card: 'summary', title: page.title, description: page.description },
  }
}
