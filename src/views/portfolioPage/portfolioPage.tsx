import { FC } from 'react'
import classNames from 'classnames'

import styles from './portfolioPage.module.scss'
import { PortfolioPageProps } from './portfolioPage.types'

const PortfolioPage: FC<PortfolioPageProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <main className={rootClassName}></main>
  )
}

export default PortfolioPage
