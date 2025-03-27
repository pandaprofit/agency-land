import { FC } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Shark from '@icons/logo.svg'

import styles from './logo.module.scss'
import { LogoProps } from './logo.types'

const Logo: FC<LogoProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <Link href="/" className={rootClassName}>
      <Shark className={styles.logo} />
    </Link>
  )
}

export default Logo
