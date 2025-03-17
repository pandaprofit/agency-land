import { FC } from 'react'
import classNames from 'classnames'

import styles from './aboutContent.module.scss'
import { AboutContentProps } from './aboutContent.types'

const AboutContent: FC<AboutContentProps> = ({ className, title, description }) => {
  const rootClassName = classNames(
    styles.root,
    'bg-base-100 border-2 border-primary hover:border-accent transition-colors duration-300',
    className
  )

  return (
    <div className={rootClassName}>
      <h2 className={classNames(styles.title, 'text-primary')}>{title}</h2>
      <div className={classNames(styles.description, 'text-accent')}>
        <span className="text-secondary">text</span>
        <p className="text-primary">{description}</p>
        <span className="text-secondary">/text</span>
      </div>
    </div>
  )
}

export default AboutContent
