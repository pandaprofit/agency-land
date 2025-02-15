'use client'

import { FC, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { gsap } from "gsap";
import styles from './daisyGrid.module.scss'
import { DaisyGridProps } from './daisyGrid.types'
import { ChoiseToggles } from '@/components/choiseToggles'
import { Game } from '@/components/game'
import { Introduce } from '@/components/introduce'

const DaisyGrid: FC<DaisyGridProps> = ({
  className,
  children
}) => {
  const [activeToggle, setActiveToggle] = useState<'cheap' | 'fast' | 'quality' | null>(null)
  const [visibleTooltip, setVisibleTooltip] = useState<'cheap' | 'fast' | 'quality' | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Адаптивный грид:
  // sm: 1 колонка (мобильные)
  // md: 2 колонки (планшеты)
  // lg: 3 колонки (небольшие десктопы)
  // xl: 4 колонки (большие экраны)
  const rootClassName = classNames(
    'grid gap-4 p-4',
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    'grid-rows-[repeat(4,minmax(300px,auto))] lg:grid-rows-[repeat(4,minmax(20vh,auto))]', // 20vh на десктопе
    className
  )

  const hideTooltip = (onComplete?: () => void) => {
    if (tooltipRef.current && textRef.current && imageRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.()
          setVisibleTooltip(null)
        }
      })

      tl.to(imageRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: "elastic.in(1.2, 0.5)"
      })
        .to(textRef.current, {
          autoAlpha: 0,
          duration: 0.25,
          ease: "elastic.in(1, 0.5)"
        }, "-=0.2")
        .to(tooltipRef.current, {
          autoAlpha: 0,
          duration: 0.25,
          ease: "elastic.in(1.2, 0.5)"
        }, "-=0.15")

      timelineRef.current = tl
    } else {
      onComplete?.()
      setVisibleTooltip(null)
    }
  }

  const showTooltip = (newToggle: 'cheap' | 'fast' | 'quality') => {
    setVisibleTooltip(newToggle)
  }

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
  }, [activeToggle])

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
    <div className="relative">
      <div className={rootClassName}>
        {/* Первый элемент - занимает 2 колонки и 2 строки */}
        <div className="col-span-1 row-span-2 rounded-box sm:col-span-2 xl:col-span-2 card bg-base-100 shadow-xl min-h-[300px] lg:min-h-[40vh] hover:scale-105 transition-all duration-300 hover:shadow-2xl">
          <div className="h-full flex items-center justify-center overflow-hidden">
            <Game />
          </div>
        </div>

        {/* Второй элемент - занимает 1 колонку и 2 строки */}
        <div className="row-span-2 card bg-base-100 shadow-xl p-4 min-h-[300px] lg:min-h-[40vh] hover:scale-105 transition-all duration-300 hover:shadow-2xl">
          <div className="h-full flex items-center justify-center">
            <span className="text-base-content opacity-50 hover:opacity-100 transition-opacity text-lg lg:text-xl">Виджет 2 (1×2)</span>
          </div>
        </div>

        {/* Третий элемент - занимает 1 колонку и 2 строки */}
        <div className="row-span-2 card bg-base-100 shadow-xl p-4 min-h-[300px] lg:min-h-[40vh] hover:scale-105 transition-all duration-300 hover:shadow-2xl">
          <div className="h-full flex items-center justify-center">
            <span className="text-base-content opacity-50 hover:opacity-100 transition-opacity text-lg lg:text-xl">Виджет 3 (1×2)</span>
          </div>
        </div>

        {/* Четвертый элемент - занимает 2 колонки и 1 строку */}
        <div className="col-span-1 sm:col-span-2 xl:col-span-2 card bg-base-100 shadow-xl p-4 min-h-[300px] lg:min-h-[20vh] hover:scale-105 transition-all duration-300 hover:shadow-2xl overflow-hidden">
          <div className="h-full flex items-center justify-center">
            <span className={styles.content}>Виджет 4 (2×1)</span>
          </div>
        </div>

        {/* Пятый элемент - занимает 2 колонки и 1 строку, расположен под четвертым */}
        <div className="col-span-1 sm:col-span-2 xl:col-span-2 row-start-4 card bg-base-100 shadow-xl p-4 min-h-[300px] lg:min-h-[20vh] hover:scale-105 transition-all duration-300 hover:shadow-2xl">
          <div className="h-full flex items-center justify-center">
            <span className={styles.content}>Виджет 5 (2×1)</span>
          </div>
        </div>

        {/* Шестой элемент - ChoiseToggles */}
        <div className="col-span-1 row-span-2 sm:col-span-2 xl:col-span-2 col-start-3 row-start-3 card bg-base-100 shadow-xl p-4 min-h-[300px] lg:min-h-[40vh] hover:scale-105 transition-all duration-300 hover:shadow-2xl">
          <div className="h-full flex items-center justify-center relative overflow-hidden">
            {renderTooltip()}
            <ChoiseToggles onToggleChange={setActiveToggle} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DaisyGrid
