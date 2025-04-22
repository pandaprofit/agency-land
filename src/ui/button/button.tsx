import Link from 'next/link'
import classNames from 'classnames'

import styles from './button.module.scss'
import { ButtonProps } from './button.types'

export default function Button({
  children,
  tagName,
  href,
  className,
  isActive,
  ...props
}: ButtonProps) {
  const rootClassName = classNames(
    styles.root,
    className,
    { [styles.active]: isActive }
  )

  return tagName === 'a' ? (
    <Link href={href!} className={rootClassName} {...props}>
      {children}
    </Link>
  ) : (
    <button className={rootClassName} {...props}>
      {children}
    </button>
  )
}
