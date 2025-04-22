export interface ButtonProps {
  className?: string
  tagName: 'button' | 'a'
  href?: string
  children: React.ReactNode
  onClick?: () => void
  isActive?: boolean
}
