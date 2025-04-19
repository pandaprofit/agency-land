'use client'

import { FC, useCallback } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

// import { useAchievements } from '@/hooks/useAchievements' // Убираем старый импорт
import { useAchievementsContext } from '@/context/AchievementsContext' // Используем контекст
import styles from './achievementsViewer.module.scss'
import { AchievementsViewerProps } from './achievementsViewer.types'

const AchievementsViewer: FC<AchievementsViewerProps> = ({
  className
}) => {
  // Получаем массив активных уведомлений и функцию очистки
  const { activeNotifications, clearNotification, removeNotification } = useAchievementsContext()

  // Обработчик завершения CSS transition (для opacity)
  const handleTransitionEnd = useCallback((notificationId: string) => {
    // Убеждаемся, что transition завершился именно для opacity
    // (event.propertyName === 'opacity' - можно добавить для надежности, но может быть хрупко)
    console.log(`Transition ended for ${notificationId}, removing notification.`);
    removeNotification(notificationId);
  }, [removeNotification]);

  // Если массив пуст, ничего не рендерим
  if (activeNotifications.length === 0) {
    return null;
  }

  const rootClassName = classNames(styles.root, className)

  return (
    // Контейнер для всех уведомлений
    <div className={rootClassName}>
      {/* Мапим массив уведомлений */}
      {activeNotifications.map((notification) => (
        // Обертка для каждого отдельного уведомления
        // Используем notificationId как ключ
        <div
          key={notification.notificationId}
          className={classNames(
            styles.notificationItem,
            { [styles.fading]: notification.status === 'fading' }
          )}
          onTransitionEnd={() => handleTransitionEnd(notification.notificationId)}
        >
          {/* Иконка */}
          {notification.icon && (
            <div className={styles.iconWrapper}>
              <Image src={notification.icon} alt="Achievement Icon" width={40} height={40} />
            </div>
          )}
          {/* Контент */}
          <div className={styles.content}>
            <p className={styles.label}>Достижение получено!</p>
            <h5 className={styles.title}>{notification.title}</h5>
          </div>
          {/* Кнопка закрытия для конкретного уведомления */}
          <button onClick={() => clearNotification(notification.notificationId)} className={styles.closeButton}>×</button>
        </div>
      ))}
    </div>
  )
}

export default AchievementsViewer
