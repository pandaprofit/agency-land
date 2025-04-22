import { FC } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

import styles from './achievement.module.scss'
import { AchievementProps } from './achievement.types'

const Achievement: FC<AchievementProps> = ({
  className,
  id,
  title = '???',
  description,
  icon,
  condition,
  isUnlocked
}) => {
  const rootClassName = classNames(
    styles.root,
    className,
    { [styles.unlocked]: isUnlocked },
    { [styles.locked]: !isUnlocked }
  );

  if (!id || !title) {
    return null;
  }

  return (
    <div className={rootClassName} title={isUnlocked ? description : condition}>
      {icon && (
        <div className={styles.iconWrapper}>
          <Image src={icon} alt={title || 'Achievement icon'} width={40} height={40} />
        </div>
      )}
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        {condition && (
          <p className={styles.condition}>{condition}</p>
        )}
      </div>
    </div>
  )
}

export default Achievement
