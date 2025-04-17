'use client'
import { FC, Suspense, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import classNames from 'classnames'

import styles from './cases.module.scss'
import { CasesProps } from './cases.types'
import { CaseItem, CasesFilter } from '@/components'
import casesData from '@/shared/data/cases.json'

// Хелпер для фильтрации
const filterCases = (stack: string) => {
  return casesData.filter((item) => {
    switch (stack) {
      case 'All': return true
      case 'React': return item.stack.includes('React')
      case 'Webflow': return item.stack.includes('Webflow')
      case 'Tilda': return item.stack.includes('Tilda')
      case 'Wordpress': return item.stack.includes('WordPress')
      default: return true
    }
  })
}

// Обертка для использования useSearchParams в клиентском компоненте
function CasesContent({ className }: CasesProps) {
  const rootClassName = classNames(styles.root, className)
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentStack = searchParams.get('stack') || 'All'

  // Вычисляем видимые кейсы напрямую
  const visibleCases = useMemo(() => filterCases(currentStack), [currentStack]);

  const handleStackChange = (stack: string) => {
    const currentStackFromUrl = searchParams.get('stack') || 'All'
    if (stack !== currentStackFromUrl) {
      router.push(`?stack=${stack}`, { scroll: false })
    }
  }

  return (
    <div className={rootClassName}>
      <CasesFilter
        currentStack={currentStack}
        setStack={handleStackChange}
      />
      <div className={styles.cases}>
        {
          visibleCases.map((item) => (
            <div
              key={item.title}
              className={styles.caseItemContainer}
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

// Основной компонент, использующий Suspense
const Cases: FC<CasesProps> = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CasesContent {...props} />
    </Suspense>
  )
}

export default Cases
