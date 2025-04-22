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
    styles[`col${width.mobile}`],
    styles[`sm-col${width.tablet}`],
    styles[`lg-col${width.desktop}`],
    // Высота в строках
    styles[`row${height.mobile}`],
    styles[`sm-row${height.tablet}`],
    styles[`lg-row${height.desktop}`]
  )

  return (
    <div className={rootClassName + ' CursorHover'}>
      {children}
    </div>
  )
}

export default VidjetsItem
