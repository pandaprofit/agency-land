'use client' // Хук будет использоваться в клиентских компонентах

import { useState, useEffect, useCallback, useRef } from 'react'
import { AchievementDetails, ACHIEVEMENTS_LIST } from '@/shared/data/achievements.data' // Импортируем детали

// Ключ для localStorage
const userAchievementsKey = 'userAchievements'

// Функция для безопасного чтения из localStorage
const getStoredAchievements = (): string[] => {
	// Проверяем, доступен ли localStorage (на случай SSR или окружений без window)
	if (typeof window === 'undefined' || !window.localStorage) {
		return []
	}
	try {
		const storedData = localStorage.getItem(userAchievementsKey)
		if (storedData) {
			const parsedIds = JSON.parse(storedData)
			if (Array.isArray(parsedIds) && parsedIds.every(item => typeof item === 'string')) {
				return parsedIds
			}
		}
	} catch (error) {
		console.error('Failed to read achievements from localStorage:', error)
		localStorage.removeItem(userAchievementsKey); // Очищаем при ошибке
	}
	return [] // Возвращаем пустой массив по умолчанию или при ошибке
}

// Функция для записи в localStorage
const setStoredAchievements = (ids: string[]) => {
	if (typeof window === 'undefined' || !window.localStorage) {
		return
	}
	try {
		localStorage.setItem(userAchievementsKey, JSON.stringify(ids))
	} catch (error) {
		console.error('Failed to save achievements to localStorage:', error)
	}
}

export const useAchievements = () => {
	// Состояние для ID разблокированных достижений
	const [unlockedIds, setUnlockedIds] = useState<string[]>(() => getStoredAchievements())
	// Состояние для хранения данных ачивки, которую нужно показать в уведомлении
	const [notificationAchievement, setNotificationAchievement] = useState<AchievementDetails | null>(null)
	const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null) // Ref для таймаута уведомления

	// Очистка таймаута при размонтировании
	useEffect(() => {
		return () => {
			if (notificationTimeoutRef.current) {
				clearTimeout(notificationTimeoutRef.current);
			}
		};
	}, []);

	// Функция для разблокировки нового достижения
	const unlockAchievement = useCallback((id: string) => {
		// Проверяем, не разблокировано ли уже
		if (!unlockedIds.includes(id)) {
			const achievementDetails = ACHIEVEMENTS_LIST[id]
			if (!achievementDetails) {
				console.warn(`Achievement with id "${id}" not found in ACHIEVEMENTS_LIST.`)
				return; // Не разблокируем, если нет описания
			}

			const newUnlockedIds = [...unlockedIds, id]
			setUnlockedIds(newUnlockedIds) // Обновляем состояние
			setStoredAchievements(newUnlockedIds) // Обновляем localStorage
			console.log(`Achievement unlocked: ${id}`); // Для дебага

			// Показываем уведомление
			setNotificationAchievement(achievementDetails);
			console.log('Notification state set:', achievementDetails);

			// Очищаем предыдущий таймаут, если есть
			if (notificationTimeoutRef.current) {
				clearTimeout(notificationTimeoutRef.current);
			}

			// Ставим таймаут на скрытие уведомления (например, через 5 секунд)
			notificationTimeoutRef.current = setTimeout(() => {
				setNotificationAchievement(null);
				notificationTimeoutRef.current = null;
			}, 5000);
		}
	}, [unlockedIds]) // Зависит от unlockedIds

	// Функция для проверки, разблокировано ли достижение
	const isUnlocked = useCallback((id: string): boolean => {
		return unlockedIds.includes(id)
	}, [unlockedIds]) // Зависит от unlockedIds

	// Функция для ручного скрытия уведомления (если понадобится кнопка)
	const clearNotification = useCallback(() => {
		setNotificationAchievement(null);
		if (notificationTimeoutRef.current) {
			clearTimeout(notificationTimeoutRef.current);
			notificationTimeoutRef.current = null;
		}
	}, [])

	// Возвращаем состояние и функции
	return {
		unlockedIds,
		unlockAchievement,
		isUnlocked,
		notificationAchievement, // Возвращаем данные для уведомления
		clearNotification,     // Возвращаем функцию для скрытия
	}
}
