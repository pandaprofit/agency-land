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
      <svg viewBox="0 0 800 400" className={styles.svg}>
        {/* S */}
        <path
          ref={setPathRef(0)}
          d="M20,40 L100,40 L100,120 L20,120 L20,200 L100,200 L100,280 L20,280"
          className={styles.mainPath}
        />
        <path
          ref={setOverlayRef(0)}
          d="M18,38 L98,38 L98,118 L18,118 L18,198 L98,198 L98,278 L18,278"
          className={styles.overlayPath}
        />

        {/* H */}
        <path
          ref={setPathRef(1)}
          d="M140,40 L140,280 M140,160 L220,160 M220,40 L220,280"
          className={styles.mainPath}
        />
        <path
          ref={setOverlayRef(1)}
          d="M138,38 L138,278 M138,158 L218,158 M218,38 L218,278"
          className={styles.overlayPath}
        />

        {/* A */}
        <path
          ref={setPathRef(2)}
          d="M260,280 L340,40 L420,280 M285,200 L395,200"
          className={styles.mainPath}
        />
        <path
          ref={setOverlayRef(2)}
          d="M258,278 L338,38 L418,278 M283,198 L393,198"
          className={styles.overlayPath}
        />

        {/* R */}
        <path
          ref={setPathRef(3)}
          d="M460,40 L460,280 M460,40 L540,40 L540,160 L460,160 L540,280"
          className={styles.mainPath}
        />
        <path
          ref={setOverlayRef(3)}
          d="M458,38 L458,278 M458,38 L538,38 L538,158 L458,158 L538,278"
          className={styles.overlayPath}
        />

        {/* K */}
        <path
          ref={setPathRef(4)}
          d="M580,40 L580,280 M580,160 L660,40 M580,160 L660,280"
          className={styles.mainPath}
        />
        <path
          ref={setOverlayRef(4)}
          d="M578,38 L578,278 M578,158 L658,38 M578,158 L658,278"
          className={styles.overlayPath}
        />

        {/* S */}
        <path
          ref={setPathRef(5)}
          d="M700,40 L780,40 L780,120 L700,120 L700,200 L780,200 L780,280 L700,280"
          className={styles.mainPath}
        />
        <path
          ref={setOverlayRef(5)}
          d="M698,38 L778,38 L778,118 L698,118 L698,198 L778,198 L778,278 L698,278"
          className={styles.overlayPath}
        />
      </svg>
    </div>
  )
}

export default Introduce
