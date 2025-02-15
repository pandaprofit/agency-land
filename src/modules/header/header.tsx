import { FC } from 'react'
import styles from './header.module.scss'

const Header: FC = () => {
	return (
		<header className="container mx-auto px-4">
			<nav>
				<ul className={styles.nav}>
					<li>О Нас</li>
					<li>Портфолио</li>
					<li>Принципы работы</li>
					<li>Услуги</li>
					<li>Контакты</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
