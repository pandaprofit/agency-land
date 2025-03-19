import { ElementType } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import styles from './button.module.scss'
import { ButtonProps } from './button.types'

const defaultElement = 'button'

export default function Button<E extends ElementType = typeof defaultElement>({
  children,
  tagName,
  href,
  ...props
}: ButtonProps) {

  return tagName === 'a' ? (
    <Link href={href!} className={styles.root} {...props}>
      {children}
    </Link>
  ) : (
    <button className={styles.root} {...props}>
      {children}
    </button>
  )
}
