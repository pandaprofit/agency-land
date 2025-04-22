export interface AchievementDetails {
	id: string; // Уникальный идентификатор
	title: string; // Название достижения
	description: string; // Описание
	icon?: string; // Путь к иконке (опционально)
	condition: string; // Условие выполнения
}

// Словарь всех возможных достижений
export const ACHIEVEMENTS_LIST: Record<string, AchievementDetails> = {
	visited_about: {
		id: 'visited_about',
		title: 'Любопытный Варвар',
		description: 'Вы посетили страницу \'О нас\'. Мы ценим ваш интерес!',
		icon: '/icons/achievements/eye.svg', // Пример пути
		condition: 'Посетить страницу "О нас"'
	},
	clicked_monkey: {
		id: 'clicked_monkey',
		title: 'Король Обезьян?',
		description: 'Вы кликнули на нашего особого гостя!',
		icon: '/icons/achievements/monkey.svg', // Пример пути
		condition: 'Кликнуть на обезьянку в правом нижнем углу'
	},
	filtered_cases_react: {
		id: 'filtered_cases_react',
		title: 'Реактивный Фильтр',
		description: 'Вы отфильтровали кейсы по стеку React.',
		icon: '/icons/achievements/react.svg', // Пример пути
		condition: 'Отфильтровать портфолио по стеку React'
	},
	// Добавьте сюда другие достижения...
	placeholder_locked: { // Пример явно заблокированного для теста
		id: 'placeholder_locked',
		title: 'Скрытое Сокровище',
		description: 'Это достижение пока не получено.',
		icon: '/icons/achievements/lock.svg',
		condition: 'Выполнить секретное действие'
	},
	// --- Новые тестовые ачивки ---
	test_achievement_1: {
		id: 'test_achievement_1',
		title: 'Первопроходец Тестов',
		description: 'Это первая тестовая ачивка.',
		// icon: '/icons/achievements/test.svg',
		condition: 'Просто существует для теста'
	},
	test_achievement_2: {
		id: 'test_achievement_2',
		title: 'Вторая Попытка',
		description: 'Еще одно тестовое достижение, чтобы список был длиннее.',
		icon: '/icons/achievements/star.svg',
		condition: 'Проверить отображение с иконкой'
	},
};
