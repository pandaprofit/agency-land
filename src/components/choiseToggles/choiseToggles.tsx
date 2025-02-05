'use client'

import { FC, useState } from 'react'
import classNames from 'classnames'
import styles from './choiseToggles.module.scss'
import { ChoiseTogglesProps } from './choiseToggles.types'

const ChoiseToggles: FC<ChoiseTogglesProps> = ({
  className,
  onToggleChange
}) => {
  const [activeToggle, setActiveToggle] = useState<'cheap' | 'fast' | 'quality' | null>(null)

  const rootClassName = classNames(styles.root, className)

  const handleToggleChange = (toggle: 'cheap' | 'fast' | 'quality') => {
    const newValue = activeToggle === toggle ? null : toggle
    setActiveToggle(newValue)
    onToggleChange?.(newValue)
  }

  return (
    <div className={rootClassName}>
      <div className="flex flex-col gap-6 w-full">
        <div className="form-control w-full">
          <label className="label cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="label-text text-xl">Дёшево</span>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-lg"
                checked={activeToggle === 'cheap'}
                onChange={() => handleToggleChange('cheap')}
              />
            </div>
          </label>
        </div>

        <div className="form-control w-full">
          <label className="label cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="label-text text-xl">Быстро</span>
              <input
                type="checkbox"
                className="toggle toggle-secondary toggle-lg"
                checked={activeToggle === 'fast'}
                onChange={() => handleToggleChange('fast')}
              />
            </div>
          </label>
        </div>

        <div className="form-control w-full">
          <label className="label cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="label-text text-xl">Качественно</span>
              <input
                type="checkbox"
                className="toggle toggle-accent toggle-lg"
                checked={activeToggle === 'quality'}
                onChange={() => handleToggleChange('quality')}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default ChoiseToggles
