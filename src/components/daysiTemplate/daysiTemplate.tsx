'use client'

import { FC } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { DaysiTemplateProps } from './daysiTemplate.types'

const DaysiTemplate: FC<DaysiTemplateProps> = ({
  className,
  title,
  description,
  imageUrl,
  buttonText,
  onButtonClick
}) => {
  const rootClassName = classNames('card w-96 bg-base-100 shadow-xl', className)

  return (
    <div className={rootClassName}>
      <figure className="px-10 pt-10">
        <Image
          src={imageUrl}
          alt={title}
          width={384}
          height={200}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title font-unbounded">{title}</h2>
        <p className="text-base-content">{description}</p>
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DaysiTemplate
