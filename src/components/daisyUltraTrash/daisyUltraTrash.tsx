'use client'

import { FC, useCallback } from 'react'
import classNames from 'classnames'
import { DaisyUltraTrashProps } from './daisyUltraTrash.types'
import styles from './daisyUltraTrash.module.scss'
import DaysiTemplate from '@/components/daysiTemplate/daysiTemplate'
import { DaisyTrash } from '@/components/daisyTrash'

const DaisyUltraTrash: FC<DaisyUltraTrashProps> = ({
	className
}) => {
	const rootClassName = classNames(
		'flex justify-center items-center gap-8 flex-wrap bg-base-200 p-10 rounded-2xl',
		'text-primary border-2 border-primary',
		'hover:border-accent transition-colors duration-300',
		className
	)

	const handleButtonClick = useCallback(() => {
		alert('Кнопка работает!')
	}, [])

	return (
		<div className={rootClassName}>
			<DaysiTemplate
				title="Добро пожаловать!"
				description="Это пример компонента с использованием DaisyUI. Он включает в себя красивую карточку с изображением, текстом и интерактивной кнопкой."
				imageUrl="/images/example.jpg"
				buttonText="Узнать больше"
				onButtonClick={handleButtonClick}
				className="hover:scale-105 transition-transform duration-300"
			/>

			<DaisyTrash />
		</div>
	)
}

export default DaisyUltraTrash
