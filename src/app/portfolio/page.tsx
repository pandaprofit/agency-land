import type { Metadata } from 'next'
import PortfolioPage from '@/views/portfolioPage/portfolioPage'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Legion Next.js template'
}

export default function Home() {
  return <PortfolioPage />
}
