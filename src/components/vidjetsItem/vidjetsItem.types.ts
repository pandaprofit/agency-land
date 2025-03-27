export interface VidjetsItemProps {
  className?: string
  children: React.ReactNode
  width?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  height?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
}
