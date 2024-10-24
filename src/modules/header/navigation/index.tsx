import { FC } from 'react'


import styles from './navigation.module.scss'

const Navigation: FC = () => (
  <nav>
			<ul className={styles.nav}>
				<li>Service</li>
				<li>Portfolio</li>
				<li>About Us</li>
				<li>Pricing or Packages</li>
				<li>Contact</li>
			</ul>
			<div className={styles.navbarpoint}>
				<span className={styles.navpoint}></span>
				<span className={styles.navpoint}></span>
				<span className={styles.navpoint}></span>
				<span className={styles.navpoint}></span>
				<span className={styles.navpoint}></span>
			</div>

	</nav>
)

export default Navigation
