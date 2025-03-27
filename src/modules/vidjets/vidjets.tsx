'use client'

import { FC } from 'react'
import classNames from 'classnames'

import styles from './vidjets.module.scss'
import { VidjetsProps } from './vidjets.types'
import VidjetsItem from '@/components/vidjetsItem/vidjetsItem'
import Game from '@/components/game/game'
import Portfolio from '@/components/portfolio/portfolio'
import ChoiseToggles from '@/components/choiseToggles/choiseToggles'

const Vidjets: FC<VidjetsProps> = ({
  className,
  children,
  gap = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  }
}) => {
  const rootClassName = classNames(
    styles.root,
    className,
    `gap-${gap.mobile}`,
    `sm:gap-${gap.tablet}`,
    `lg:gap-${gap.desktop}`
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
        Место для вашей рекламы
      </VidjetsItem>
      <VidjetsItem
        width={{
          mobile: 1,
          tablet: 1,
          desktop: 2
        }}
        height={{
          mobile: 1,
          tablet: 1,
          desktop: 1
        }}
      >
        Место для вашей рекламы
      </VidjetsItem>
      <VidjetsItem
        width={{
          mobile: 1,
          tablet: 1,
          desktop: 2
        }}
        height={{
          mobile: 1,
          tablet: 1,
          desktop: 1
        }}
      >
        Место для вашей рекламы
      </VidjetsItem>
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
        <ChoiseToggles />
      </VidjetsItem>
    </div>
  )
}

export default Vidjets
