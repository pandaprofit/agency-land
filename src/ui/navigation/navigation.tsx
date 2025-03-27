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
          <li><Link href="#" className={styles.navigation__item}>О Нас</Link></li>
          <li><Link href="/portfolio" className={styles.navigation__item}>Портфолио</Link></li>
          <li><Link href="#" className={styles.navigation__item}>Принципы работы</Link></li>
          <li><Link href="#" className={styles.navigation__item}>Услуги</Link></li>
          <li><Link href="#" className={styles.navigation__item}>Контакты</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
