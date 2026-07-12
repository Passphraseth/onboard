import AmlEditorialPage from '@/components/acquisition/AmlEditorialPage'
import { AML_PAGES, getAmlMetadata } from '@/lib/aml-ctf-content'

export const metadata = getAmlMetadata('customer-due-diligence-cdd')
export default function Page() { return <AmlEditorialPage page={AML_PAGES['customer-due-diligence-cdd']} /> }
