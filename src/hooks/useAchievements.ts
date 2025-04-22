'use client' // Хук будет использоваться в клиентских компонентах

import { useState, useEffect, useCallback, useRef } from 'react'
import { AchievementDetails, ACHIEVEMENTS_LIST } from '@/shared/data/achievements.data' // Импортируем детали

// Ключ для localStorage
const userAchievementsKey = 'userAchievements'

// Добавляем статус уведомления
export type NotificationStatus = 'visible' | 'fading';

// Интерфейс для уведомления (добавляем уникальный ID)
interface AchievementNotification extends AchievementDetails {
	notificationId: string;
	status: NotificationStatus;
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
	// Храним таймауты начала fade-out
	const fadeOutTimeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

	// Очистка всех таймаутов при размонтировании
	useEffect(() => {
		const timeouts = fadeOutTimeoutsRef.current;
		return () => {
			Object.values(timeouts).forEach(clearTimeout);
		};
	}, []);

	// Функция для удаления уведомления из состояния (вызывается после fade-out)
	const removeNotification = useCallback((notificationId: string) => {
		setActiveNotifications(prev => prev.filter(n => n.notificationId !== notificationId));
		// Очищаем таймаут начала fade-out, если он еще не сработал (например, при ручном закрытии)
		if (fadeOutTimeoutsRef.current[notificationId]) {
			clearTimeout(fadeOutTimeoutsRef.current[notificationId]);
			delete fadeOutTimeoutsRef.current[notificationId];
		}
		// console.log(`Notification removed from state: ${notificationId}`);
	}, []);

	// Функция для начала fade-out (устанавливает статус)
	const startFading = useCallback((notificationId: string) => {
		setActiveNotifications(prev =>
			prev.map(n => n.notificationId === notificationId ? { ...n, status: 'fading' } : n)
		);
		// Удаляем таймаут начала fade-out, так как он сработал
		delete fadeOutTimeoutsRef.current[notificationId];
		// console.log(`Notification status changed to fading: ${notificationId}`);
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

			// 2. Добавляем уведомление в состояние
			const notificationId = `${id}_${Date.now()}`
			const newNotification: AchievementNotification = {
				...achievementDetails,
				notificationId,
				status: 'visible' // Начальный статус
			};
			console.log(`Adding notification: ${notificationId}`);
			setActiveNotifications(prev => [newNotification, ...prev]);

			// 3. Устанавливаем таймаут для НАЧАЛА fade-out через 5 секунд
			fadeOutTimeoutsRef.current[notificationId] = setTimeout(() => {
				console.log(`Starting fade out for: ${notificationId}`);
				startFading(notificationId);
			}, 5000); // 5 секунд видимости

		} else {
			// Если ачивка уже была, ничего не делаем (или просто логируем)
			console.log(`Achievement "${id}" is already unlocked. Notification not shown.`);
		}
	}, [unlockedIds, startFading])

	// Функция для проверки, разблокировано ли достижение
	const isUnlocked = useCallback((id: string): boolean => {
		return unlockedIds.includes(id)
	}, [unlockedIds]) // Зависит от unlockedIds

	// Функция ручного закрытия (сразу удаляет)
	const clearNotification = removeNotification;

	// Возвращаем состояние и функции
	return {
		unlockedIds,
		unlockAchievement,
		isUnlocked,
		activeNotifications, // Возвращаем массив уведомлений
		clearNotification,  // Функция для удаления конкретного уведомления
		removeNotification, // Передаем для использования после анимации
	}
}
