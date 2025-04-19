'use client' // Хук будет использоваться в клиентских компонентах

import { useState, useEffect, useCallback, useRef } from 'react'
import { AchievementDetails, ACHIEVEMENTS_LIST } from '@/shared/data/achievements.data' // Импортируем детали

// Ключ для localStorage
const userAchievementsKey = 'userAchievements'

// Интерфейс для уведомления (добавляем уникальный ID)
interface AchievementNotification extends AchievementDetails {
	notificationId: string;
}

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
	// Храним массив активных уведомлений
	const [activeNotifications, setActiveNotifications] = useState<AchievementNotification[]>([])
	// Используем Ref для хранения таймаутов по ID уведомления
	const notificationTimeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

	// Очистка всех таймаутов при размонтировании
	useEffect(() => {
		const timeouts = notificationTimeoutsRef.current;
		return () => {
			Object.values(timeouts).forEach(clearTimeout);
		};
	}, []);

	// Функция для удаления уведомления по ID
	const removeNotification = useCallback((notificationId: string) => {
		setActiveNotifications(prev => prev.filter(n => n.notificationId !== notificationId));
		// Удаляем и очищаем таймаут из Ref
		if (notificationTimeoutsRef.current[notificationId]) {
			clearTimeout(notificationTimeoutsRef.current[notificationId]);
			delete notificationTimeoutsRef.current[notificationId];
		}
	}, []);

	// Функция для разблокировки нового достижения
	const unlockAchievement = useCallback((id: string) => {
		// --- Логика сохранения и показа уведомления (только если ачивка новая) ---
		if (!unlockedIds.includes(id)) {
			const achievementDetails = ACHIEVEMENTS_LIST[id]
			if (!achievementDetails) {
				console.warn(`Achievement with id "${id}" not found in ACHIEVEMENTS_LIST.`)
				return;
			}

			// 1. Обновляем состояние и localStorage
			const newUnlockedIds = [...unlockedIds, id]
			setUnlockedIds(newUnlockedIds)
			setStoredAchievements(newUnlockedIds)
			console.log(`Achievement unlocked and saved: ${id}`);

			// 2. Показываем уведомление (только для новой ачивки)
			const notificationId = `${id}_${Date.now()}`
			const newNotification: AchievementNotification = {
				...achievementDetails,
				notificationId
			};
			console.log(`Adding notification: ${notificationId}`);
			setActiveNotifications(prev => [newNotification, ...prev]);

			// 3. Устанавливаем таймаут для этого уведомления
			const timeoutId = setTimeout(() => {
				console.log(`Auto-removing notification: ${notificationId}`);
				removeNotification(notificationId);
			}, 5000);

			// Сохраняем таймаут
			notificationTimeoutsRef.current[notificationId] = timeoutId;

		} else {
			// Если ачивка уже была, ничего не делаем (или просто логируем)
			console.log(`Achievement "${id}" is already unlocked. Notification not shown.`);
		}
	}, [unlockedIds, removeNotification])

	// Функция для проверки, разблокировано ли достижение
	const isUnlocked = useCallback((id: string): boolean => {
		return unlockedIds.includes(id)
	}, [unlockedIds]) // Зависит от unlockedIds

	// clearNotification теперь синоним removeNotification для внешнего использования
	const clearNotification = removeNotification;

	// Возвращаем состояние и функции
	return {
		unlockedIds,
		unlockAchievement,
		isUnlocked,
		activeNotifications, // Возвращаем массив уведомлений
		clearNotification,  // Функция для удаления конкретного уведомления
	}
}
