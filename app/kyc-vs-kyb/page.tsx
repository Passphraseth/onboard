import AmlEditorialPage from '@/components/acquisition/AmlEditorialPage'
import { AML_PAGES, getAmlMetadata } from '@/lib/aml-ctf-content'

export const metadata = getAmlMetadata('kyc-vs-kyb')
export default function Page() { return <AmlEditorialPage page={AML_PAGES['kyc-vs-kyb']} /> }
