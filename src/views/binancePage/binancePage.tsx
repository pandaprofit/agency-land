import { FC } from 'react'
import classNames from 'classnames'

import styles from './binancePage.module.scss'
import { BinancePageProps } from './binancePage.types'
import { BinanceData } from '@/components'

const BinancePage: FC<BinancePageProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <BinanceData />
    </main>
  )
}

export default BinancePage
