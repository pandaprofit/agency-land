'use client' // Draggable требует клиентского рендера

import { FC, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable' // Импортируем Draggable

import styles from './boobs.module.scss'
import { BoobsProps } from './boobs.types'
import BoobsContent from '@/components/boobsContent/boobsContent'
import BoobsSpoiler from '@/components/boobsSpoiler/boobsSpoiler'

gsap.registerPlugin(Draggable); // Регистрируем плагин один раз

const Boobs: FC<BoobsProps> = ({
  className
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const draggableInstance = useRef<Draggable[] | null>(null);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    // Установка начальной позиции и показ элемента
    requestAnimationFrame(() => {
      const windowW = window.innerWidth;
      const windowH = window.innerHeight;
      const elementW = element.offsetWidth;
      const elementH = element.offsetHeight;

      if (elementW > 0 && elementH > 0) {
        const offsetX = windowW * 0.10;
        const offsetY = windowH * 0.10;

        const initialX = windowW - elementW - offsetX;
        const initialY = windowH - elementH - offsetY;

        // Устанавливаем позицию и делаем видимым
        // Можно добавить delay небольшой, если нужно плавное появление
        gsap.set(element, { x: initialX, y: initialY, opacity: 1, delay: 0.1 });
      } else {
        // Если размеры не определились, элемент останется невидимым (opacity: 0 из CSS)
        console.warn("Boobs module: Could not get element dimensions for initial positioning.");
      }
    });

    // Убираем setTimeout - создаем Draggable сразу после планирования gsap.set
    draggableInstance.current = Draggable.create(element, {
      type: "x,y",
      bounds: window,
      edgeResistance: 0.65,
      inertia: {
        resistance: 200
      },
      onDragEnd: function () {
        const currentX = this.x;
        const currentY = this.y;
        const windowW = window.innerWidth;
        const windowH = window.innerHeight;
        const elementW = this.target.offsetWidth;
        const elementH = this.target.offsetHeight;
        const offsetX = windowW * 0.10;
        const offsetY = windowH * 0.10;

        const corners = [
          { x: offsetX, y: offsetY },
          { x: windowW - elementW - offsetX, y: offsetY },
          { x: offsetX, y: windowH - elementH - offsetY },
          { x: windowW - elementW - offsetX, y: windowH - elementH - offsetY }
        ];

        let closestCorner = corners[0];
        let minDistance = Infinity;

        corners.forEach(corner => {
          const dx = corner.x - currentX;
          const dy = corner.y - currentY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < minDistance) {
            minDistance = distance;
            closestCorner = corner;
          }
        });

        gsap.to(this.target, {
          x: closestCorner.x,
          y: closestCorner.y,
          duration: 0.8,
          ease: "back.out(1.7)"
        });
      }
    });

    // Очистка при размонтировании
    return () => {
      // clearTimeout не нужен
      if (draggableInstance.current && Array.isArray(draggableInstance.current)) {
        draggableInstance.current[0]?.kill();
      }
    };

  }, []);

  const rootClassName = classNames(styles.root, className)
  return (
    <div ref={rootRef} className={rootClassName}>
      <BoobsSpoiler>
        <BoobsContent />
      </BoobsSpoiler>
    </div>
  )
}

export default Boobs
