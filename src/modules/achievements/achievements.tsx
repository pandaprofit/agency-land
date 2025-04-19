'use client' // Необходимо для localStorage и useState

import { FC } from 'react' // Убрали useState, useEffect
import classNames from 'classnames'

import { Achievement } from '@/components' // Импортируем компонент
import { ACHIEVEMENTS_LIST } from '@/shared/data/achievements.data' // Импортируем список всех достижений
import { useAchievements } from '@/hooks/useAchievements' // Импортируем наш хук
import styles from './achievements.module.scss'
import { AchievementsProps } from './achievements.types'

const Achievements: FC<AchievementsProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  // Получаем данные и функции из хука
  const { unlockedIds } = useAchievements()

  return (
    <div className={rootClassName}>
      <h3 className={styles.title}>Ваши достижения</h3>
      {unlockedIds.length > 0 ? (
        <div className={styles.list}>
          {unlockedIds.map(id => {
            const achievementDetails = ACHIEVEMENTS_LIST[id]
            // Отображаем только если нашли детали достижения по ID
            return achievementDetails ? (
              <Achievement
                key={id}
                {...achievementDetails} // Передаем все детали
                isUnlocked={true} // Всегда true, так как берем из unlockedIds
              />
            ) : null;
          })}
        </div>
      ) : (
        <p className={styles.placeholder}>У вас пока нет достижений.</p>
      )}
      {/* В будущем можно добавить переключатель для показа всех достижений (включая заблокированные) */}
    </div>
  )
}

export default Achievements
