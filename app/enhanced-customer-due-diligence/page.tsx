import AmlEditorialPage from '@/components/acquisition/AmlEditorialPage'
import { AML_PAGES, getAmlMetadata } from '@/lib/aml-ctf-content'

export const metadata = getAmlMetadata('enhanced-customer-due-diligence')
export default function Page() { return <AmlEditorialPage page={AML_PAGES['enhanced-customer-due-diligence']} /> }
