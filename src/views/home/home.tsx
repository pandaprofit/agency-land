'use client'

import { FC } from 'react'
import classNames from 'classnames'
import styles from './home.module.scss'
import { HomeProps } from './home.types'
// import { Intro } from '@/modules/intro'
// import { About } from '@/modules/about'
import DaisyGrid from '@/components/daisyGrid/daisyGrid'
import Introduce from '@/components/introduce/introduce'
import { DaisyUltraTrash } from '@/components/daisyUltraTrash'
import Vidjets from '@/modules/vidjets/vidjets'

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={classNames(rootClassName, "flex flex-col gap-[60px]")}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-[60px]">
          <Introduce />
          {/* <Intro /> */}
          {/* <About /> */}
          <DaisyUltraTrash />
          <DaisyGrid />
          <Vidjets>
            {/* Здесь будут элементы сетки */}
          </Vidjets>
        </div>
      </div>
    </main>
  )
}

export default Home
