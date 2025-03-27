'use client'

import { FC } from 'react'
import Image from 'next/image'
import styles from './game.module.scss'
import siberianValley from '@public/images/game_background.png'

export const Game: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.snowfall}>
        {[...Array(50)].map((_, i) => (
          <div key={i} className={styles.snowflake} style={{
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${Math.random() * 20 + 2}s`,
            '--position': `${Math.random() * 100}%`,
            '--size': `${Math.random() * 6 + 4}px`,
          } as React.CSSProperties} />
        ))}
      </div>
      <Image
        src={siberianValley}
        alt="Сибирская долина"
        width={800}
        height={30}
        quality={100}
      />
    </div>
  )
}

export default Game
