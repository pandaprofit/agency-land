import { FC } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

import styles from './navigation.module.scss'
import { NavigationProps } from './navigation.types'

const Navigation: FC<NavigationProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <nav className={styles.navigation}>
        <ul className={styles.navigation__list}>
          <li><Link href="/" className={styles.navigation__item}>Main</Link></li>
          <li><Link href="/about" className={styles.navigation__item}>About</Link></li>
          <li><Link href="/portfolio" className={styles.navigation__item}>Portfolio</Link></li>
          <li><Link href="/news" className={styles.navigation__item}>News</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
