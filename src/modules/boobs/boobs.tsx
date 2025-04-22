import { FC } from 'react'
import classNames from 'classnames'

import styles from './boobs.module.scss'
import { BoobsProps } from './boobs.types'
import BoobsContent from '@/components/boobsContent/boobsContent'
import BoobsSpoiler from '@/components/boobsSpoiler/boobsSpoiler'
const Boobs: FC<BoobsProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <BoobsSpoiler>
        <BoobsContent />
      </BoobsSpoiler>
    </div>
  )
}

export default Boobs
