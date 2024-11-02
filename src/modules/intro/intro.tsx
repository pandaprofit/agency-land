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
					{`{IT NAME`}<br/>{`AGENCY}`}
				</h1>
				<p className={styles.description}>
					<span className={styles.highlighted}>Your</span> Vision<span className={styles.signs}>,</span> <span className={styles.highlighted}>Our</span>  Code <span className={styles.signs}>—</span> <span className={styles.highlighted}>Let&#39;s <br/> Build</span>  the Web <span className={styles.highlighted}>Together</span>
				</p>
			</div>
    </div>
  )
}

export default Intro
