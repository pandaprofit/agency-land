'use client' // Необходимо для localStorage и useState

import { FC, useState, useEffect } from 'react'
import classNames from 'classnames'

import { Achievement } from '@/components' // Импортируем компонент
import { ACHIEVEMENTS_LIST } from '@/shared/data/achievements.data' // Импортируем список всех достижений
import styles from './achievements.module.scss'
import { AchievementsProps } from './achievements.types'

// Ключ для localStorage
const userAchievementsKey = 'userAchievements'

const Achievements: FC<AchievementsProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  // Состояние для хранения ID разблокированных достижений
  const [unlockedIds, setUnlockedIds] = useState<string[]>([])

  // Эффект для чтения данных из localStorage при монтировании
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(userAchievementsKey)
      if (storedData) {
        const parsedIds = JSON.parse(storedData)
        // Проверяем, что это массив строк
        if (Array.isArray(parsedIds) && parsedIds.every(item => typeof item === 'string')) {
          setUnlockedIds(parsedIds)
        } else {
          console.warn('Invalid data found in localStorage for achievements.')
          localStorage.removeItem(userAchievementsKey); // Очищаем некорректные данные
        }
      }
    } catch (error) {
      console.error('Failed to read achievements from localStorage:', error)
      // Если ошибка парсинга JSON, очищаем некорректные данные
      localStorage.removeItem(userAchievementsKey);
    }
  }, []) // Пустой массив зависимостей - запускается один раз при монтировании

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
                isUnlocked={true}
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
