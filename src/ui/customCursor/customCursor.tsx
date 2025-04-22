'use client'

import { FC, useEffect, useState, useRef } from 'react'
import classNames from 'classnames'

import styles from './customCursor.module.scss'
import { CustomCursorProps } from './customCursor.types'

const CustomCursor: FC<CustomCursorProps> = ({
  className
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const currentPositionRef = useRef({ x: 0, y: 0 })

  const rootClassName = classNames(styles.root, className, {
    [styles.isHovering]: isHovering
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')
      const hasCursorHover = target.classList.contains('CursorHover') || target.closest('.CursorHover')

      if (isClickable || hasCursorHover) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const animate = () => {
      if (cursorRef.current) {
        const dx = position.x - currentPositionRef.current.x
        const dy = position.y - currentPositionRef.current.y

        currentPositionRef.current.x += dx * 0.1
        currentPositionRef.current.y += dy * 0.1

        cursorRef.current.style.transform = `translate(${currentPositionRef.current.x - 50}px, ${currentPositionRef.current.y - 10}px)`
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [position])

  return (
    <div
      ref={cursorRef}
      className={rootClassName}
    />
  )
}

export default CustomCursor
