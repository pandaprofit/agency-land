import type { Metadata } from 'next'
import NewsPage from '@/views/newsPage/news'

export const metadata: Metadata = {
  title: 'News',
  description: ''
}

export default function Home() {
  return <NewsPage />
}
