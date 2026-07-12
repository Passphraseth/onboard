import MarketEditorialPage from '@/components/acquisition/MarketEditorialPage'
import { MARKET_PAGES, getMarketMetadata } from '@/lib/acquisition-content'
export const metadata = getMarketMetadata('sydney-customer-onboarding')
export default function Page() { return <MarketEditorialPage page={MARKET_PAGES['sydney-customer-onboarding']} /> }
