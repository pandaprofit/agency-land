'use client'

import { FC, useState, useEffect } from 'react'
import classNames from 'classnames'

// import { useAchievements } from '@/hooks/useAchievements' // Убираем старый импорт
import { useAchievementsContext } from '@/context/AchievementsContext' // Используем контекст
import styles from './about.module.scss'
import { AboutProps } from './about.types'
import { Achievements } from '@/modules/achievements'

type ActiveTab = 'us' | 'you'

const AboutPage: FC<AboutProps> = ({
  className
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('us')
  const rootClassName = classNames(styles.root, className)
  const { unlockAchievement } = useAchievementsContext() // Получаем из контекста

  useEffect(() => {
    unlockAchievement('visited_about');
  }, [unlockAchievement]);

  return (
    <main className={rootClassName}>
      {/* --- Кнопки табов (только для мобильных) --- */}
      <div className={styles.tabButtons}>
        <button
          className={classNames(styles.tabButton, { [styles.active]: activeTab === 'us' })}
          onClick={() => setActiveTab('us')}
        >
          About Us
        </button>
        <button
          className={classNames(styles.tabButton, { [styles.active]: activeTab === 'you' })}
          onClick={() => setActiveTab('you')}
        >
          About You
        </button>
      </div>

      {/* --- Контентная зона (колонки/табы) --- */}
      <div className={styles.contentArea}>
        {/* Секция "About Us" */}
        <section className={classNames(styles.column, styles.aboutUs, { [styles.visible]: activeTab === 'us' })}>
          <h2 className={styles.heading}>About Us</h2>
          {/* TODO: Добавьте сюда контент "About Us" */}
          <p>Здесь будет текст о нас...</p>
        </section>

        {/* Секция "About You" */}
        <section className={classNames(styles.column, styles.aboutYou, { [styles.visible]: activeTab === 'you' })}>
          <h2 className={styles.heading}>About You</h2>
          {/* TODO: Добавьте сюда контент "About You" */}
          <Achievements />
        </section>
      </div>
    </main>
  )
}

export default AboutPage
