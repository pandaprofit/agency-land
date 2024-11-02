import { FC } from 'react'
import classNames from 'classnames'

import styles from './aboutContent.module.scss'
import { AboutContentProps } from './aboutContent.types'

const AboutContent: FC<AboutContentProps> = ({ className, title, description}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.description}>
        <span>text</span>
        <p>{description}</p>
        <span>/text</span>
      </div>
    </div>
  )
}

export default AboutContent
