import type { Metadata } from 'next'
import BinancePage from '@/views/binancePage/binancePage'

export const metadata: Metadata = {
  title: 'Binance',
  description: 'Binance'
}

export default function Home() {
  return <BinancePage />
}
