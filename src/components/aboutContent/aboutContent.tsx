import { FC } from 'react'
import classNames from 'classnames'

import styles from './aboutContent.module.scss'
import { AboutContentProps } from './aboutContent.types'

const AboutContent: FC<AboutContentProps> = ({ className, title, description}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <h2 className={styles.title}>{title}</h2>
      <p><span className={styles.blue}>{`<`}</span>text<span className={styles.blue}>{`>`}</span><br /><span className={styles.yelow}>{`{`}</span>{description}<span className={styles.yelow}>{`}`}</span><br/><span className={styles.blue}>{`<`}</span>/text<span className={styles.blue}>{`>`}</span></p>
    </div>
  )
}

export default AboutContent
