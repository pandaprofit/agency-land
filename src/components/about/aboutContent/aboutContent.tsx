import { FC } from 'react'
import classNames from 'classnames'

import styles from './aboutContent.module.scss'
import { AboutContentProps } from './aboutContent.types'

const AboutContent: FC<AboutContentProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default AboutContent
