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
  // Получаем функцию проверки статуса из хука
  const { isUnlocked } = useAchievements()

  // Получаем список всех ID достижений из нашего словаря
  const allAchievementIds = Object.keys(ACHIEVEMENTS_LIST);

  return (
    <div className={rootClassName}>
      <h3 className={styles.title}>Достижения</h3>
      {allAchievementIds.length > 0 ? (
        <div className={styles.list}>
          {/* Итерируемся по всем возможным ачивкам */}
          {allAchievementIds.map(id => {
            const achievementDetails = ACHIEVEMENTS_LIST[id]
            const unlocked = isUnlocked(id); // Проверяем статус

            return (
              <Achievement
                key={id}
                {...achievementDetails} // Передаем все детали (включая condition)
                isUnlocked={unlocked} // Передаем актуальный статус
              />
            );
          })}
        </div>
      ) : (
        <p className={styles.placeholder}>Список достижений пуст.</p>
      )}
    </div>
  )
}

export default Achievements
