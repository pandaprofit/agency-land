'use client'

import { FC, useRef } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
import styles from './introduce.module.scss'
import { IntroduceProps } from './introduce.types'

const Introduce: FC<IntroduceProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const overlayRefs = useRef<(SVGPathElement | null)[]>([])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set([pathRefs.current, overlayRefs.current], {
        opacity: 0,
        scale: 0.8
      })

      const tl = gsap.timeline()

      tl.to(pathRefs.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      })
        .to(overlayRefs.current, {
          opacity: 0.5,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out"
        }, "-=0.5")

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const setPathRef = (index: number) => (el: SVGPathElement | null) => {
    if (el) pathRefs.current[index] = el
  }

  const setOverlayRef = (index: number) => (el: SVGPathElement | null) => {
    if (el) overlayRefs.current[index] = el
  }

  return (
    <div className={rootClassName} ref={containerRef}>
      <svg viewBox="0 0 1200 400" className={styles.svg}>
        {/* S */}
        <path
          ref={setPathRef(0)}
          d="M50,80 L130,80 L130,160 L50,160 L50,240 L130,240 L130,320 L50,320"
          className={styles.mainPath}
        />
        <path
          ref={setOverlayRef(0)}
          d="M48,78 L128,78 L128,158 L48,158 L48,238 L128,238 L128,318 L48,318"
          className={styles.overlayPath}
        />

        {/* H */}
        <path
          ref={setPathRef(1)}
          d="M180,80 L180,320 M180,200 L260,200 M260,80 L260,320"
          className={styles.mainPath}
        />
        <path
          ref={setOverlayRef(1)}
          d="M178,78 L178,318 M178,198 L258,198 M258,78 L258,318"
          className={styles.overlayPath}
        />

        {/* A */}
        <path
          ref={setPathRef(2)}
          d="M310,320 L390,80 L470,320 M340,240 L440,240"
          className={styles.mainPath}
        />
        <path
          ref={setOverlayRef(2)}
          d="M308,318 L388,78 L468,318 M338,238 L438,238"
          className={styles.overlayPath}
        />

        {/* R */}
        <path
          ref={setPathRef(3)}
          d="M520,80 L520,320 M520,80 L600,80 L600,200 L520,200 L600,320"
          className={styles.mainPath}
        />
        <path
          ref={setOverlayRef(3)}
          d="M518,78 L518,318 M518,78 L598,78 L598,198 L518,198 L598,318"
          className={styles.overlayPath}
        />

        {/* K */}
        <path
          ref={setPathRef(4)}
          d="M650,80 L650,320 M650,200 L730,80 M650,200 L730,320"
          className={styles.mainPath}
        />
        <path
          ref={setOverlayRef(4)}
          d="M648,78 L648,318 M648,198 L728,78 M648,198 L728,318"
          className={styles.overlayPath}
        />

        {/* S */}
        <path
          ref={setPathRef(5)}
          d="M780,80 L860,80 L860,160 L780,160 L780,240 L860,240 L860,320 L780,320"
          className={styles.mainPath}
        />
        <path
          ref={setOverlayRef(5)}
          d="M778,78 L858,78 L858,158 L778,158 L778,238 L858,238 L858,318 L778,318"
          className={styles.overlayPath}
        />
      </svg>
    </div>
  )
}

export default Introduce
