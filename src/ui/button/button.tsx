import Link from 'next/link'

import styles from './button.module.scss'
import { ButtonProps } from './button.types'

export default function Button({
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
