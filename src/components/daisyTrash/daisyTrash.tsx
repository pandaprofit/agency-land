'use client'

import { FC } from 'react'
import classNames from 'classnames'
import { DaisyTrashProps } from './daisyTrash.types'
import styles from './daisyTrash.module.scss'

const DaisyTrash: FC<DaisyTrashProps> = ({
  className,
  title = "Ретро стиль!",
  progressValue = 70,
  badgeText = "Новинка"
}) => {
  const rootClassName = classNames(
    'card w-96 bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300',
    'border-2 border-primary hover:border-accent',
    className
  )

  return (
    <div className={rootClassName}>
      <div className="card-body">
        <h2 className="card-title font-unbounded text-primary">{title}</h2>
        <div className="flex flex-col gap-4">
          <div className="badge badge-secondary text-secondary-content">{badgeText}</div>
          <progress className="progress progress-primary" value={progressValue} max="100"></progress>
          <div className="join">
            <button className="btn join-item text-accent hover:text-accent-content">«</button>
            <button className="btn join-item text-accent hover:text-accent-content">Меню</button>
            <button className="btn join-item text-accent hover:text-accent-content">»</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DaisyTrash
