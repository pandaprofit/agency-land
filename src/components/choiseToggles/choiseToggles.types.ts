import { Dispatch, RefObject, SetStateAction } from 'react'

export interface ChoiseTogglesProps {
  className?: string
  activeToggle: 'cheap' | 'fast' | 'quality' | null
  setActiveToggle: Dispatch<SetStateAction<'cheap' | 'fast' | 'quality' | null>>
  visibleTooltip: 'cheap' | 'fast' | 'quality' | null
  setVisibleTooltip: Dispatch<SetStateAction<'cheap' | 'fast' | 'quality' | null>>
  tooltipRef: RefObject<HTMLDivElement>
}
