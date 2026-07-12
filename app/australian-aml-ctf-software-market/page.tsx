import AmlEditorialPage from '@/components/acquisition/AmlEditorialPage'
import { AML_PAGES, getAmlMetadata } from '@/lib/aml-ctf-content'

export const metadata = getAmlMetadata('australian-aml-ctf-software-market')
export default function Page() { return <AmlEditorialPage page={AML_PAGES['australian-aml-ctf-software-market']} /> }
