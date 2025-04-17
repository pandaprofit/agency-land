import { FC } from 'react'
import classNames from 'classnames'

import styles from './casesFilter.module.scss'
import { CasesFilterProps } from './casesFilter.types'
import { Button } from '@/ui'

const CasesFilter: FC<CasesFilterProps> = ({
  className,
  setStack,
  currentStack = 'All'
}) => {
  const rootClassName = classNames(styles.root, className)

  const onHandleClick = (stack: string) => {
    setStack(stack)
  }

  return (
    <div className={rootClassName}>
      <Button
        tagName='button'
        onClick={() => onHandleClick('All')}
        isActive={currentStack === 'All'}
      >
        All
      </Button>
      <Button
        tagName='button'
        onClick={() => onHandleClick('React')}
        isActive={currentStack === 'React'}
      >
        React
      </Button>
      <Button
        tagName='button'
        onClick={() => onHandleClick('Webflow')}
        isActive={currentStack === 'Webflow'}
      >
        Webflow
      </Button>
      <Button
        tagName='button'
        onClick={() => onHandleClick('Tilda')}
        isActive={currentStack === 'Tilda'}
      >
        Tilda
      </Button>
      <Button
        tagName='button'
        onClick={() => onHandleClick('Wordpress')}
        isActive={currentStack === 'Wordpress'}
      >
        WordPress
      </Button>
    </div>
  )
}

export default CasesFilter
