import type { Metadata } from 'next'
import { HomeView } from '@views/home'

export const metadata: Metadata = {
  title: 'Sharks Agency',
  description: 'We will eat your wishes and digest the result'
}

export default function Home() {
  return <HomeView />
}
