import type { Metadata } from 'next'
import NewsDetails from '@/views/newsPage/[id]/news_id'

export const metadata: Metadata = {
  title: 'News Details',
  description: 'Detailed view of a news story'
}

export default function NewsPage() {
  return <NewsDetails />
}