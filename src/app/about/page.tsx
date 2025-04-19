import type { Metadata } from 'next'
import AboutPage from '@/views/aboutPage/about'

export const metadata: Metadata = {
  title: 'About',
  description: ''
}

export default function Home() {
  return <AboutPage />
}
