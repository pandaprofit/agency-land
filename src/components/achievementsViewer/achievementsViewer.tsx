'use client'

import { FC } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

import { useAchievements } from '@/hooks/useAchievements'
import styles from './achievementsViewer.module.scss'
import { AchievementsViewerProps } from './achievementsViewer.types'

const AchievementsViewer: FC<AchievementsViewerProps> = ({
  className
}) => {
  const { notificationAchievement, clearNotification } = useAchievements()

  if (!notificationAchievement) {
    return null;
  }

  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      {notificationAchievement.icon && (
        <div className={styles.iconWrapper}>
          <Image src={notificationAchievement.icon} alt="Achievement Icon" width={40} height={40} />
        </div>
      )}
      <div className={styles.content}>
        <p className={styles.label}>Достижение получено!</p>
        <h5 className={styles.title}>{notificationAchievement.title}</h5>
      </div>
      <button onClick={clearNotification} className={styles.closeButton}>×</button>
    </div>
  )
}

export default AchievementsViewer
