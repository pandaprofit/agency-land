import { FC } from 'react'
import classNames from 'classnames'

import styles from './news.module.scss'
import { NewsProps } from './news.types'

const News: FC<NewsProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <main className={rootClassName}></main>
  )
}

export default News
