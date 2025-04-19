import { FC } from 'react'
import classNames from 'classnames'

import styles from './about.module.scss'
import { AboutProps } from './about.types'

const AboutPage: FC<AboutProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}></main>
  )
}

export default AboutPage
