import { FC } from 'react'
import classNames from 'classnames'

import styles from './cases.module.scss'
import { CasesProps } from './cases.types'
import { CaseItem } from '@/components'
import casesData from '@/shared/data/cases.json'
const Cases: FC<CasesProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  const cases = casesData

  return (
    <div className={rootClassName}>
      
      {
        cases.map((item) => {
          return (
            <CaseItem
              key={item.title}
              imagePreview={item.imagePreview}
              title={item.title}
              stack={item.stack}
              isDesign={item.isDesign}
              link={item.link}
            />
          )
        })
      }
    </div>
  )
}

export default Cases
