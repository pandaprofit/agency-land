'use client' // Необходимо для localStorage и useState

import { FC, useState, useMemo } from 'react' // Добавили useState, useMemo
import classNames from 'classnames'

import { Achievement } from '@/components' // Импортируем компонент
import { ACHIEVEMENTS_LIST } from '@/shared/data/achievements.data' // Импортируем список всех достижений
import { useAchievementsContext } from '@/context/AchievementsContext' // Используем контекст
import styles from './achievements.module.scss'
import { AchievementsProps } from './achievements.types'

type AchievementFilter = 'all' | 'unlocked' | 'locked';

const Achievements: FC<AchievementsProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  const { isUnlocked } = useAchievementsContext()
  const [activeFilter, setActiveFilter] = useState<AchievementFilter>('all')

  const allAchievementIds = Object.keys(ACHIEVEMENTS_LIST);

  // Фильтруем и сортируем ID достижений
  const filteredAndSortedIds = useMemo(() => {
    return allAchievementIds
      .filter(id => {
        if (activeFilter === 'unlocked') return isUnlocked(id);
        if (activeFilter === 'locked') return !isUnlocked(id);
        return true; // 'all'
      })
      .sort((a, b) => {
        const unlockedA = isUnlocked(a);
        const unlockedB = isUnlocked(b);
        // Сначала разблокированные (-1), потом заблокированные (1)
        return (unlockedB ? 1 : 0) - (unlockedA ? 1 : 0);
      });
  }, [allAchievementIds, activeFilter, isUnlocked]); // Пересчитываем при смене фильтра или статуса

  return (
    <div className={rootClassName}>
      <div className={styles.header}>
        <h3 className={styles.title}>Достижения</h3>
        {/* Кнопки фильтрации */}
        <div className={styles.filters}>
          <button
            onClick={() => setActiveFilter('all')}
            className={classNames(styles.filterButton, { [styles.active]: activeFilter === 'all' })}
          >
            Все
          </button>
          <button
            onClick={() => setActiveFilter('unlocked')}
            className={classNames(styles.filterButton, { [styles.active]: activeFilter === 'unlocked' })}
          >
            Полученные
          </button>
          <button
            onClick={() => setActiveFilter('locked')}
            className={classNames(styles.filterButton, { [styles.active]: activeFilter === 'locked' })}
          >
            Не полученные
          </button>
        </div>
      </div>

      {filteredAndSortedIds.length > 0 ? (
        <div className={styles.list}>
          {/* Мапим отфильтрованный и отсортированный массив */}
          {filteredAndSortedIds.map(id => {
            const achievementDetails = ACHIEVEMENTS_LIST[id]
            const unlocked = isUnlocked(id);

            return (
              <Achievement
                key={id}
                {...achievementDetails}
                isUnlocked={unlocked}
              />
            );
          })}
        </div>
      ) : (
        <p className={styles.placeholder}>Нет достижений, соответствующих фильтру.</p>
      )}
    </div>
  )
}

export default Achievements
