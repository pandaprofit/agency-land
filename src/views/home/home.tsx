import { FC } from 'react'


import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'
<<<<<<< HEAD
import { Intro } from '@modules/intro'
=======
import { Intro } from '@/components/intro'
import { About } from '@/modules/about'

>>>>>>> 22932c164a8ecfe04c729c98119d801203181b4e


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
