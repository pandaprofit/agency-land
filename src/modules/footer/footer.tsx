import { FC } from 'react'
import styles from './footer.module.scss'
import Logo from '@/ui/logo/logo'

const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Logo mini />
        </div>
      </div>
    </footer>
  )
}

export default Footer
