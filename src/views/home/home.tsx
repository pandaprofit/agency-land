'use client'

import { FC, useCallback } from 'react'

import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'
import { Intro } from '@/modules/intro'
import { About } from '@/modules/about'
import DaysiTemplate from '@/components/daysiTemplate/daysiTemplate'
import DaisyGrid from '@/components/daisyGrid/daisyGrid'
import Introduce from '@/components/introduce/introduce'

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  const handleButtonClick = useCallback(() => {
    alert('Кнопка работает!')
  }, [])

  return (
    <main className={rootClassName}>
      <Introduce />
      <Intro />
      <About />

      {/* Секция с DaisyUI компонентами */}
      <section className="py-20 flex flex-col gap-20">
        <div className="flex justify-center items-center gap-8 flex-wrap bg-base-200">
          <DaysiTemplate
            title="Добро пожаловать!"
            description="Это пример компонента с использованием DaisyUI. Он включает в себя красивую карточку с изображением, текстом и интерактивной кнопкой."
            imageUrl="/images/example.jpg"
            buttonText="Узнать больше"
            onButtonClick={handleButtonClick}
            className="hover:scale-105 transition-transform duration-300"
          />

          {/* Дополнительная карточка в ретро-стиле */}
          <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="card-body">
              <h2 className="card-title font-unbounded">Ретро стиль!</h2>
              <div className="flex flex-col gap-4">
                <div className="badge badge-secondary">Новинка</div>
                <progress className="progress progress-primary" value="70" max="100"></progress>
                <div className="join">
                  <button className="btn join-item">«</button>
                  <button className="btn join-item">Меню</button>
                  <button className="btn join-item">»</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Секция с гридом */}
        <div className="container mx-auto px-4">
          <DaisyGrid />
        </div>
      </section>
    </main>
  )
}

export default Home
