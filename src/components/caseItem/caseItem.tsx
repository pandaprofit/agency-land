'use client'

import { FC, useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

import styles from './caseItem.module.scss'
import { CaseItemProps } from './caseItem.types'
import Link from 'next/link'

const CaseItem: FC<CaseItemProps> = ({
  className,
  title,
  imagePreview,
  stack,
  isDesign,
  link
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <Link
      href={link}
      target="_blank"
      className={rootClassName}
    >
      <Image
        src={imagePreview}
        alt="case preview"
        width={348}
        height={473}
        className={styles.image}
        priority
      />
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        <p className={styles.stack}>
          {
            stack?.map((item) => {
              return (
                <span key={item} className={styles.stackItem}>{item}</span>
              )
            })
          }
        </p>
        <p className={styles.description}>
          {
            isDesign ? 'Дизайн разработан с нуля' : 'Существующий дизайн дорабатывался'
          }
        </p>
      </div>
    </Link>
  )
}

export default CaseItem
