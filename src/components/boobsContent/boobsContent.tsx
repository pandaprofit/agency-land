import { FC } from 'react'
import classNames from 'classnames'

import styles from './boobsContent.module.scss'
import { BoobsContentProps } from './boobsContent.types'

const BoobsContent: FC<BoobsContentProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <div className={styles.boobs}>
        <div className={styles.boob}>а</div>
        <div className={styles.boob}>а</div>
        <div className={styles.boob}>а</div>
        <div className={styles.boob}>а</div>

      </div>
    </div>
  )
}

export default BoobsContent
