export interface AchievementDetails {
	id: string; // Уникальный идентификатор
	title: string; // Название достижения
	description: string; // Описание
	icon?: string; // Путь к иконке (опционально)
}

// Словарь всех возможных достижений
export const ACHIEVEMENTS_LIST: Record<string, AchievementDetails> = {
	visited_about: {
		id: 'visited_about',
		title: 'Любопытный Варвар',
		description: 'Вы посетили страницу \'О нас\'. Мы ценим ваш интерес!',
		icon: '/icons/achievements/eye.svg' // Пример пути
	},
	clicked_monkey: {
		id: 'clicked_monkey',
		title: 'Король Обезьян?',
		description: 'Вы кликнули на нашего особого гостя!',
		icon: '/icons/achievements/monkey.svg' // Пример пути
	},
	filtered_cases_react: {
		id: 'filtered_cases_react',
		title: 'Реактивный Фильтр',
		description: 'Вы отфильтровали кейсы по стеку React.',
		icon: '/icons/achievements/react.svg' // Пример пути
	},
	// Добавьте сюда другие достижения...
};
