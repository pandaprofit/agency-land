import { FC } from 'react'
import classNames from 'classnames'

import styles from './magicVszuh.module.scss'
import { MagicVszuhProps } from './magicVszuh.types'

const MagicVszuh: FC<MagicVszuhProps> = ({
  className,
  setIsMobile
}) => {
  const rootClassName = classNames(styles.root, className)

  const handleClick = () => {
    setIsMobile(prev => !prev)
  }

  return (
    <button
      className={rootClassName}
      onClick={handleClick}
      aria-label="Переключить мобильный режим"
    >
      Вжух
    </button>
  )
}

export default MagicVszuh
