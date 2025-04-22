'use client' // Компонент использует хуки и события

import { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import Image from 'next/image'
import monkey from '@public/images/monkey.png'
// import { useAchievements } from '@/hooks/useAchievements' // Убираем старый импорт
import { useAchievementsContext } from '@/context/AchievementsContext' // Используем контекст
import styles from './monkeyking.module.scss'
import { MonkeykingProps } from './monkeyking.types'

const Monkeyking: FC<MonkeykingProps> = ({
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const rootClassName = classNames(
    styles.root,
    className,
    { [styles.visible]: isVisible }
  )
  const monkeyRef = useRef<HTMLDivElement>(null)
  const { unlockAchievement } = useAchievementsContext() // Получаем из контекста

  useEffect(() => {
    const timer = setTimeout(() => {
      if (monkeyRef.current) {
        gsap.to(monkeyRef.current, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            setIsVisible(true);
          }
        });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    console.log('Monkey clicked! Implement module display here.');
    unlockAchievement('clicked_monkey')
    unlockAchievement('test_achievement_1') // Оставляем для теста
    // TODO: Добавить логику отображения другого модуля
  }

  return (
    <div ref={monkeyRef} className={rootClassName} onClick={handleClick}>
      <Image
        src={monkey}
        alt="Pasha Technique"
        width={300}
        height={420}
      />
    </div>
  )
}

export default Monkeyking
