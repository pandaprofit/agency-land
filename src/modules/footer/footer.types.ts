import { ReactNode } from 'react'

export interface FooterSocialItemI {
  icon: ReactNode
  href: string
  label: string
}

export interface FooterSocialProps {
  items: FooterSocialItemI[]
}
