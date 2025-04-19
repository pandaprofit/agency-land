import { FC } from 'react'
import classNames from 'classnames'

import styles from './achievementsViewer.module.scss'
import { AchievementsViewerProps } from './achievementsViewer.types'

const AchievementsViewer: FC<AchievementsViewerProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default AchievementsViewer
