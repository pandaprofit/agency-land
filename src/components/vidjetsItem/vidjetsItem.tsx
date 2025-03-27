'use client'

import { FC } from 'react'
import classNames from 'classnames'

import styles from './vidjetsItem.module.scss'
import { VidjetsItemProps } from './vidjetsItem.types'

const VidjetsItem: FC<VidjetsItemProps> = ({
  className,
  children,
  width = {
    mobile: 4,    // По умолчанию на всю ширину
    tablet: 4,
    desktop: 4
  },
  height = {
    mobile: 1,    // По умолчанию 1 строка
    tablet: 1,
    desktop: 1
  }
}) => {
  const rootClassName = classNames(
    styles.root,
    className,
    // Ширина в колонках
    `col-span-${width.mobile}`,
    `sm:col-span-${width.tablet}`,
    `lg:col-span-${width.desktop}`,
    // Высота в строках
    `row-span-${height.mobile}`,
    `sm:row-span-${height.tablet}`,
    `lg:row-span-${height.desktop}`
  )

  return (
    <div className={rootClassName}>
      {children}
    </div>
  )
}

export default VidjetsItem
