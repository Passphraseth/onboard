import AmlEditorialPage from '@/components/acquisition/AmlEditorialPage'
import { AML_PAGES, getAmlMetadata } from '@/lib/aml-ctf-content'

export const metadata = getAmlMetadata('aml-ctf-real-estate')
export default function Page() { return <AmlEditorialPage page={AML_PAGES['aml-ctf-real-estate']} /> }
