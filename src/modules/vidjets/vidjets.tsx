'use client'

import { FC, useState } from 'react'
import classNames from 'classnames'

import styles from './vidjets.module.scss'
import { VidjetsProps } from './vidjets.types'
import VidjetsItem from '@/components/vidjetsItem/vidjetsItem'
import Game from '@/components/game/game'
import Portfolio from '@/components/portfolio/portfolio'
import ChoiseToggles from '@/components/choiseToggles/choiseToggles'

const Vidjets: FC<VidjetsProps> = ({
  className,
  gap = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  }
}) => {
  const [activeToggle, setActiveToggle] = useState<'cheap' | 'fast' | 'quality' | null>(null)

  const rootClassName = classNames(
    styles.root,
    className,
    styles[`gap${gap.mobile}`],
    styles[`sm-gap${gap.tablet}`],
    styles[`lg-gap${gap.desktop}`]
  )

  return (
    <div className={rootClassName}>
      <VidjetsItem
        width={{
          mobile: 1,
          tablet: 1,
          desktop: 2
        }}
        height={{
          mobile: 1,
          tablet: 1,
          desktop: 2
        }}
      >
        <Game />
      </VidjetsItem>
      <VidjetsItem
        width={{
          mobile: 1,
          tablet: 1,
          desktop: 1
        }}
        height={{
          mobile: 1,
          tablet: 1,
          desktop: 2
        }}
      >
        <Portfolio />
      </VidjetsItem>
    </div>
  )
}

export default Vidjets
