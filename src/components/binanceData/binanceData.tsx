'use client'

import { FC } from 'react'
import classNames from 'classnames'

import styles from './binanceData.module.scss'
import { BinanceDataProps } from './binanceData.types'
import { useBinanceSocket } from '@/shared/hooks/useBinanceSocket'
import useSavePrice from '@/shared/hooks/useSavePrice'

const BinanceData: FC<BinanceDataProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  const { data, } = useBinanceSocket()

  const { getPrice, savePrice, deletePrice } = useSavePrice()

  return (
    <div className={rootClassName}>
      <div>
        <h1>Binance Data</h1>
      </div>
      <div className={styles.data}>
        <div className={styles.data__header}>
          <h2>
            Название актива
          </h2>
          <h2>
            Последняя цена
          </h2>
        </div>
        <div className={styles.data__body}>
          {
            Object.entries(data).map(([key, value]) => (
              <div key={key} className={styles.data__body__item}>
                <h3>{key}</h3>
                <p>{value}</p>

                <button onClick={() => {
                  savePrice(key, value)

                }}>
                  Сохранить цену
                </button>
                {
                  localStorage.getItem(`${key}1`) === key && (
                    <p>
                      Сохраненая цена: {getPrice(key)}
                    </p>
                  )
                }
                <button onClick={() => {
                  deletePrice(key)
                }}>
                  Удалить цену
                </button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default BinanceData
