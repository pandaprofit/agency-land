'use client'
import { FC, useState } from 'react'
import classNames from 'classnames'

import styles from './cases.module.scss'
import { CasesProps } from './cases.types'
import { CaseItem, CasesFilter } from '@/components'
import casesData from '@/shared/data/cases.json'

const Cases: FC<CasesProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  const [, setSelectedStack] = useState<string>('all')
  const [visibleCases, setVisibleCases] = useState(casesData)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleStackChange = (stack: string) => {
    // Начинаем анимацию
    setIsAnimating(true)

    // Ждем завершения анимации исчезновения
    setTimeout(() => {
      // Фильтруем кейсы
      const newFilteredCases = casesData.filter((item) => {
        switch (stack) {
          case 'All':
            return true
          case 'React':
            return item.stack.includes('React')
          case 'Webflow':
            return item.stack.includes('Webflow')
          case 'Tilda':
            return item.stack.includes('Tilda')
          case 'Wordpress':
            return item.stack.includes('WordPress')
          default:
            return true
        }
      })

      // Обновляем стейт
      setSelectedStack(stack)
      setVisibleCases(newFilteredCases)

      // Завершаем анимацию
      setIsAnimating(false)
    }, 600) // Время должно совпадать с длительностью CSS анимации
  }

  return (
    <div className={rootClassName}>
      <CasesFilter
        setStack={handleStackChange}
      />
      <div className={styles.cases}>
        {
          visibleCases.map((item) => (
            <div
              key={item.title}
              className={classNames({
                [styles.animating]: isAnimating
              })}
            >
              <CaseItem
                imagePreview={item.imagePreview}
                title={item.title}
                stack={item.stack}
                isDesign={item.isDesign}
                link={item.link}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Cases
