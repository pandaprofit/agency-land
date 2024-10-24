import { FC } from 'react'
import classNames from 'classnames'

import styles from './intro.module.scss'
import { IntroProps } from './intro.types'

const Intro: FC<IntroProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default Intro
