import { FC } from 'react'
import classNames from 'classnames'

import styles from './intro.module.scss'
import { IntroProps } from './intro.types'

const Intro: FC<IntroProps> = ({className}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <div>
				<h1>
					<span className={styles.it}>{`{IT `}</span>NAME<br/>{`AGENCY}`}
				</h1>
				<p className={styles.description}>
					<span className={styles.highlighted}>Your</span> Vision, <span className={styles.highlighted}>Our</span>  Code — Let&#39;s <br/> <span className={styles.highlighted}>Build</span>  the Web <span className={styles.highlighted}>Together</span>
				</p>
			</div>
    </div>
  )
}

export default Intro
