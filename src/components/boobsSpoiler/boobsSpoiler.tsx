'use client'

import { FC, useEffect, useRef, ReactNode, useState } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import Image from 'next/image'

import styles from './boobsSpoiler.module.scss'
import BoobsImage from '@public/images/game_background.png'

interface BoobsSpoilerProps {
  className?: string
  children: ReactNode
}

const BoobsSpoiler: FC<BoobsSpoilerProps> = ({
  className,
  children
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const rootClassName = classNames(styles.spoiler, className)

  const hideRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const dotsAnimationRef = useRef<gsap.core.Tween | null>(null);
  const fadeAnimationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const hideElement = hideRef.current;
    if (!hideElement) return;

    const dots: HTMLDivElement[] = [];
    const numDots = 1000;
    const containerWidth = hideElement.offsetWidth;
    const containerHeight = hideElement.offsetHeight;

    if (containerWidth === 0 || containerHeight === 0) {
      console.warn('BoobsSpoiler: Container dimensions are zero. Dots cannot be generated.');
      return;
    }

    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = styles.dot;
      const top = Math.random() * containerHeight;
      const left = Math.random() * containerWidth;
      dot.style.top = `${top}px`;
      dot.style.left = `${left}px`;
      const size = 1 + Math.random() * 2;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      gsap.set(dot, { opacity: gsap.utils.random(0.3, 0.9) });
      hideElement.appendChild(dot);
      dots.push(dot);
    }

    dotsAnimationRef.current = gsap.to(dots, {
      x: () => gsap.utils.random(-50, 50),
      y: () => gsap.utils.random(-50, 50),
      opacity: () => gsap.utils.random(0.3, 0.9),
      duration: () => gsap.utils.random(0.5, 1.5),
      ease: "none",
      repeat: -1,
      yoyo: true,
      stagger: 0,
    });

    return () => {
      dotsAnimationRef.current?.kill();
      dots.forEach(dot => dot.remove());
    };
  }, []);

  useEffect(() => {
    fadeAnimationRef.current?.kill();

    const hideEl = hideRef.current;
    const imgContEl = imageContainerRef.current;

    if (!hideEl || !imgContEl) return;

    const tl = gsap.timeline();
    fadeAnimationRef.current = tl;

    if (isHovered) {
      tl.to(imgContEl, { opacity: 0, duration: 0.05, ease: 'none', pointerEvents: 'none' }, 0)
        .to(hideEl, { opacity: 0, duration: 0.45, ease: 'none', pointerEvents: 'none' }, 0);
    } else {
      tl.to(hideEl, { opacity: 1, duration: 0.15, ease: 'none', pointerEvents: 'auto' }, 0)
        .to(imgContEl, { opacity: 1, duration: 1.8, ease: 'none', pointerEvents: 'auto' }, 0);
    }
  }, [isHovered]);

  return (
    <div
      className={rootClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={imageContainerRef} className={styles.backgroundImageContainer}>
        <Image
          src={BoobsImage}
          alt="Spoiler Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className={styles.content}>
        {children}
      </div>
      <div ref={hideRef} className={styles.hide}></div>
    </div>
  )
}

export default BoobsSpoiler
