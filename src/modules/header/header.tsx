import { FC } from 'react'
import styles from './header.module.scss'
import Link from 'next/link'

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<div className="container mx-auto px-4">
				<nav>
					<ul className={styles.nav}>
						<li><Link href="#">О Нас</Link></li>
						<li><Link href="/portfolio">Портфолио</Link></li>
						<li><Link href="#">Принципы работы</Link></li>
						<li><Link href="#">Услуги</Link></li>
						<li><Link href="#">Контакты</Link></li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
