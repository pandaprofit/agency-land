'use client'

import { FC, useEffect } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import case1 from '@public/images/MainPage/por2folio.png'

import styles from './portfolio.module.scss'
import { PortfolioProps } from './portfolio.types'

const Portfolio: FC<PortfolioProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - (0.5 * window.innerHeight)
      const scrollProgress = scrolled / maxScroll

      document.documentElement.style.setProperty('--scroll', scrollProgress.toString())
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Link href="/portfolio" className={rootClassName}>
      <div className={styles.portfolioContent}>
        <p className={styles.portfolioTitle}>Por2folio</p>
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
  )
}

export default Portfolio
