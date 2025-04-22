'use client'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import styles from './mainWidgets.module.scss'
import { MainWidgetsProps } from './mainWidgets.types'
import Image from 'next/image'
import { ChoiseToggles, Game } from '@/components'
import case1 from '@public/images/MainPage/por2folio.png'
import Link from 'next/link'
import gsap from 'gsap'

const MainWidgets: FC<MainWidgetsProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  const [activeToggle, setActiveToggle] = useState<'cheap' | 'fast' | 'quality' | null>(null)
  const [visibleTooltip, setVisibleTooltip] = useState<'cheap' | 'fast' | 'quality' | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const handleTooltip = useCallback(() => {
    setVisibleTooltip(null)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        handleTooltip()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleTooltip])

  useEffect(() => {
    // Очищаем предыдущую анимацию
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Если есть видимый тултип и он отличается от нового activeToggle
    if (visibleTooltip && visibleTooltip !== activeToggle) {
      // Анимация исчезновения с последующим показом нового тултипа
      const tl = gsap.timeline()

      tl.to(imageRef.current, {
        autoAlpha: 0,
        scale: 0,
        duration: 0.3,
        ease: "elastic.in(1.2, 0.5)"
      })
        .to(textRef.current, {
          autoAlpha: 0,
          scale: 0,
          duration: 0.25,
          ease: "elastic.in(1, 0.5)"
        }, "-=0.2")
        .to(tooltipRef.current, {
          autoAlpha: 0,
          scale: 0,
          duration: 0.25,
          ease: "elastic.in(1.2, 0.5)",
          onComplete: () => {
            if (activeToggle) {
              setVisibleTooltip(activeToggle)
            } else {
              setVisibleTooltip(null)
            }
          }
        }, "-=0.15")

      timelineRef.current = tl
    }
    // Если нет видимого тултипа и есть новый activeToggle
    else if (!visibleTooltip && activeToggle) {
      setVisibleTooltip(activeToggle)
    }
    // Если есть видимый тултип и нет activeToggle
    else if (visibleTooltip && !activeToggle) {
      const tl = gsap.timeline()

      tl.to(imageRef.current, {
        autoAlpha: 0,
        scale: 0,
        duration: 0.3,
        ease: "elastic.in(1.2, 0.5)"
      })
        .to(textRef.current, {
          autoAlpha: 0,
          scale: 0,
          duration: 0.25,
          ease: "elastic.in(1, 0.5)"
        }, "-=0.2")
        .to(tooltipRef.current, {
          autoAlpha: 0,
          scale: 0,
          duration: 0.25,
          ease: "elastic.in(1.2, 0.5)",
          onComplete: () => {
            setVisibleTooltip(null)
          }
        }, "-=0.15")

      timelineRef.current = tl
    }
  }, [activeToggle, visibleTooltip])

  useEffect(() => {
    if (visibleTooltip && tooltipRef.current && textRef.current && imageRef.current) {
      // Сначала скрываем элементы
      gsap.set([tooltipRef.current, textRef.current, imageRef.current], {
        autoAlpha: 0,
        scale: 0,
      })

      // Анимируем появление с отскоком
      const tl = gsap.timeline()

      tl.to(tooltipRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1.2, 0.5)"
      })
        .to(textRef.current, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.25,
          ease: "elastic.out(1, 0.5)"
        }, "-=0.2")
        .to(imageRef.current, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.25,
          ease: "elastic.out(1.2, 0.5)"
        }, "-=0.2")

      timelineRef.current = tl
    }
  }, [visibleTooltip])

  const renderTooltip = () => {
    if (!visibleTooltip) return null

    switch (visibleTooltip) {
      case 'cheap':
        return (
          <div ref={tooltipRef} className="absolute right-4 top-4 max-w-[80%] flex items-start gap-3 origin-top-right">
            <span ref={textRef} className="text-base bg-base-200 p-4 rounded-xl shadow-lg border border-base-300 overflow-hidden origin-right">
              Да, конечно, братишка, все наши сотрудники не будут есть месяц, чтобы сделать тебе сайт дешевле!
            </span>
            <div ref={imageRef} className="origin-center">
              <Image
                src="/images/chims.webp"
                alt="Экономный динозавр"
                width={80}
                height={80}
                className="animate-bounce"
              />
            </div>
          </div>
        )
      case 'fast':
        return (
          <div ref={tooltipRef} className="absolute left-4 top-4 max-w-[80%] flex items-start gap-3 origin-top-left">
            <div ref={imageRef} className="origin-center">
              <Image
                src="/images/sticker-dino.png"
                alt="Быстрая ракета"
                width={80}
                height={80}
                className="animate-pulse"
              />
            </div>
            <span ref={textRef} className="text-base bg-base-200 p-4 rounded-xl shadow-lg border border-secondary overflow-hidden origin-left">
              Сделаем так быстро, что вы не успеете моргнуть! Правда, код будет похож на спагетти...
            </span>
          </div>
        )
      case 'quality':
        return (
          <div ref={tooltipRef} className="absolute right-4 bottom-4 max-w-[80%] flex items-start gap-3 origin-bottom-right">
            <span ref={textRef} className="text-base bg-base-200 p-4 rounded-xl shadow-lg border border-accent overflow-hidden origin-right">
              Идеальный код, чистая архитектура, полное тестовое покрытие! Но придётся подождать...
            </span>
            <div ref={imageRef} className="origin-center">
              <Image
                src="/images/sticker-crown.png"
                alt="Корона качества"
                width={80}
                height={80}
                className="animate-spin-slow"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={rootClassName}>
      <div className={styles.game}>
        <div>
          <Game />
        </div>
      </div>
      <div className={styles.portfolioSection}>
        <Link href="/portfolio">
          <div className={styles.portfolioContent}>
            <span className={styles.portfolioTitle}>Por2folio</span>
            <div className={styles.portfolioImageContainer}>
              <Image
                src={case1}
                alt="Por2folio"
                width={348}
                height={473}
                className={styles.portfolioImage}
              />
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.choise}>
        <div>
          {renderTooltip()}
          <ChoiseToggles
            activeToggle={activeToggle}
            setActiveToggle={setActiveToggle}
          />
        </div>
      </div>
      <div className={styles.widgets}>
        <div>

        </div>
      </div>
      <div className={styles.widgets}>
        <div>

        </div>
      </div>
    </div>
  )
}

export default MainWidgets
