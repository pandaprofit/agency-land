import { FC } from 'react'


import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'
import { Intro } from '@/modules/intro'
import { About } from '@/modules/about'



const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Intro />
      <About />
    </main>
  )
}

export default Home
