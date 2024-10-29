import { FC } from 'react'


import styles from './navigation.module.scss'

const Navigation: FC = () => (
  <nav>
			<ul className={styles.nav}>
				<li>О Нас</li>
				<li>Портфолио</li>
				<li>Принципы работы</li>
				<li>Услуги</li>
				<li>Контакты</li>
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
