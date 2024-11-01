import { FC } from 'react'
import classNames from 'classnames'
import { AboutContent } from './aboutContent'

import styles from './about.module.scss'
import { AboutProps } from './about.types'

const About: FC<AboutProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <AboutContent />
      <AboutContent />
      <AboutContent />
      <AboutContent />
    </div>
  )
}

export default About
