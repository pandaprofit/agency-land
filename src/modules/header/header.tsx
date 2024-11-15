import { FC } from 'react'
import styles from './header.module.scss'

const Header: FC = () => {
  return (
		<nav>
			<ul className={styles.nav}>
				<li>О Нас</li>
				<li>Портфолио</li>
				<li>Принципы работы</li>
				<li>Услуги</li>
				<li>Контакты</li>
			</ul>
	</nav>
  )
}

export default Header
