import { Dispatch, SetStateAction } from 'react'

export interface ChoiseTogglesProps {
  className?: string
  activeToggle: 'cheap' | 'fast' | 'quality' | null
  setActiveToggle: Dispatch<SetStateAction<'cheap' | 'fast' | 'quality' | null>>
}
