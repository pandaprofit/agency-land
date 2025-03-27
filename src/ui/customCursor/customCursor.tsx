import { FC } from 'react'
import classNames from 'classnames'

import styles from './customCursor.module.scss'
import { CustomCursorProps } from './customCursor.types'

const CustomCursor: FC<CustomCursorProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default CustomCursor
