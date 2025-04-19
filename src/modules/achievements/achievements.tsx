import { FC } from 'react'
import classNames from 'classnames'

import styles from './achievements.module.scss'
import { AchievementsProps } from './achievements.types'

const Achievements: FC<AchievementsProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default Achievements
