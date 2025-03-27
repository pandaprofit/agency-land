import { FC } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Shark from '@icons/logo.svg'

import styles from './logo.module.scss'
import { LogoProps } from './logo.types'

const Logo: FC<LogoProps> = ({
  className,
  mini
}) => {
  const rootClassName = classNames(styles.root, className)
  const logoClassName = classNames(styles.logo, {
    [styles.mini]: mini
  })

  return (
    <Link href="/" className={rootClassName}>
      <Shark className={logoClassName} />
    </Link>
  )
}

export default Logo
