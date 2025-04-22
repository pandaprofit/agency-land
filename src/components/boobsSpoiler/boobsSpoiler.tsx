'use client'

import { FC, useEffect, useRef, ReactNode } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'

import styles from './boobsSpoiler.module.scss'

interface BoobsSpoilerProps {
  className?: string
  children: ReactNode
}

const BoobsSpoiler: FC<BoobsSpoilerProps> = ({
  className,
  children
}) => {
  const rootClassName = classNames(styles.spoiler, className)
  const hideRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

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

    animationRef.current = gsap.to(dots, {
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
      animationRef.current?.kill();
      dots.forEach(dot => dot.remove());
    };

  }, []);

  return (
    <div className={rootClassName}>
      <div className={styles.content}>
        {children}
      </div>
      <div ref={hideRef} className={styles.hide}></div>
    </div>
  )
}

export default BoobsSpoiler
