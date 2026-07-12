import AmlEditorialPage from '@/components/acquisition/AmlEditorialPage'
import { AML_PAGES, getAmlMetadata } from '@/lib/aml-ctf-content'

export const metadata = getAmlMetadata('tranche-2-client-onboarding')
export default function Page() { return <AmlEditorialPage page={AML_PAGES['tranche-2-client-onboarding']} /> }
