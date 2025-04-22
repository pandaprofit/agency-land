'use client' // Необходимо для localStorage и useState

import { FC, useState, useMemo, useRef, useLayoutEffect } from 'react' // Добавили useState, useMemo, useRef, useLayoutEffect
import classNames from 'classnames'
import { gsap } from 'gsap' // Импорт GSAP

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
  const listContainerRef = useRef<HTMLDivElement>(null);
  const previousHeightRef = useRef<number | null>(null); // Ref для предыдущей высоты

  const allAchievementIds = Object.keys(ACHIEVEMENTS_LIST);

  const filteredAndSortedIds = useMemo(() => {
    // console.log(`Filter changed to: ${activeFilter}`);
    return allAchievementIds
      .filter(id => {
        if (activeFilter === 'unlocked') return isUnlocked(id);
        if (activeFilter === 'locked') return !isUnlocked(id);
        return true;
      })
      .sort((a, b) => {
        const unlockedA = isUnlocked(a);
        const unlockedB = isUnlocked(b);
        return (unlockedB ? 1 : 0) - (unlockedA ? 1 : 0);
      });
  }, [allAchievementIds, activeFilter, isUnlocked]);

  useLayoutEffect(() => {
    const container = listContainerRef.current;
    if (!container) return;

    // console.log('useLayoutEffect triggered');

    // --- Измерение новой высоты ---
    gsap.set(container, { height: 'auto' }); // Сначала установим auto
    const newHeight = container.offsetHeight;
    // console.log(`Measured new height: ${newHeight}`);
    // console.log(`Previous height from ref: ${previousHeightRef.current}`);

    // Получаем предыдущую высоту из ref
    const prevHeight = previousHeightRef.current;

    // --- Анимация, если высота изменилась и это не первый рендер ---
    if (prevHeight !== null && prevHeight !== newHeight) {
      // console.log(`Animating height from ${prevHeight} to ${newHeight}`);
      gsap.fromTo(container,
        { height: prevHeight, overflow: 'hidden' },
        {
          height: newHeight,
          duration: 0.4,
          ease: 'power1.inOut',
          onComplete: () => {
            // console.log('Animation complete, setting height to auto.');
            // Важно: Устанавливаем auto ТОЛЬКО после завершения анимации
            gsap.set(container, { height: 'auto', overflow: 'visible' });
          }
        }
      );
    } else {
        // Если высота не изменилась или это первый рендер,
        // просто убедимся, что высота auto и overflow visible
        // console.log('No animation needed, ensuring height is auto.');
        gsap.set(container, { height: 'auto', overflow: 'visible' });
    }

    // Сохраняем текущую (новую) высоту в ref для следующего рендера
    previousHeightRef.current = newHeight;

  }, [filteredAndSortedIds]); // Зависим от отфильтрованного списка

  return (
    <div className={rootClassName}>
      <div className={styles.header}>
        <h3 className={styles.title}>Достижения</h3>
        <div className={styles.filters}>
          {/* Убираем сброс isInitialRender из onClick */}
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

      <div ref={listContainerRef} className={styles.listContainer}>
        {filteredAndSortedIds.length > 0 ? (
          <div className={styles.list}>
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
    </div>
  )
}

export default Achievements
