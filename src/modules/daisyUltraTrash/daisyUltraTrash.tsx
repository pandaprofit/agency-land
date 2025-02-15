import { FC } from 'react'
import classNames from 'classnames'

import styles from './daisyUltraTrash.module.scss'
import { DaisyUltraTrashProps } from './daisyUltraTrash.types'

const DaisyUltraTrash: FC<DaisyUltraTrashProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default DaisyUltraTrash
