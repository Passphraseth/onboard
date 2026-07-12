import MarketEditorialPage from '@/components/acquisition/MarketEditorialPage'
import { MARKET_PAGES, getMarketMetadata } from '@/lib/acquisition-content'
export const metadata = getMarketMetadata('contractor-onboarding')
export default function Page() { return <MarketEditorialPage page={MARKET_PAGES['contractor-onboarding']} /> }
