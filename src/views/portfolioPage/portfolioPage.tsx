import { FC } from 'react'
import classNames from 'classnames'

import styles from './portfolioPage.module.scss'
import { PortfolioPageProps } from './portfolioPage.types'
import { Cases } from '@/modules/cases'

const PortfolioPage: FC<PortfolioPageProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Cases />
    </main>
  )
}

export default PortfolioPage
