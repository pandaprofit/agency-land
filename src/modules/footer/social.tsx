import { FC } from 'react'
import { FooterSocialProps } from './footer.types'

const Social: FC<FooterSocialProps & { className?: string }> = ({ items, className }) => {
	return (
		<div className={className}>
			{items.map(({ label, href, icon }) => (
				<a
					key={label}
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={label}
				>
					{icon}
				</a>
			))}
		</div>
	)
}

export default Social
