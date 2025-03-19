import { FC } from 'react'
import classNames from 'classnames'

import styles from './casesFilter.module.scss'
import { CasesFilterProps } from './casesFilter.types'
import { Button } from '@/ui'

const CasesFilter: FC<CasesFilterProps> = ({
  className,
  setStack
}) => {
  const rootClassName = classNames(styles.root, className)

  const onHandleClick = (stack: string) => {
    setStack(stack)
  }

  return (
    <div className={rootClassName}>
      <Button tagName='button' onClick={() => onHandleClick('All')}>
        All
      </Button>
      <Button tagName='button' onClick={() => onHandleClick('React')}>
        React
      </Button>
      <Button tagName='button' onClick={() => onHandleClick('Webflow')}>
        Webflow
      </Button>
      <Button tagName='button' onClick={() => onHandleClick('Tilda')}>
        Tilda
      </Button>
      <Button tagName='button' onClick={() => onHandleClick('Wordpress')}>
        WordPress
      </Button>
    </div>
  )
}

export default CasesFilter
