'use client' // Хук будет использоваться в клиентских компонентах

import { useState, useEffect, useCallback } from 'react'

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

	// Загрузка данных при монтировании (на случай, если начальное состояние не успело прочитать)
	// Хотя useState с функцией должен это делать, добавим для надежности.
	// В современных версиях React useState с функцией должен срабатывать надежно.
	// Можно этот useEffect убрать, если нет проблем с инициализацией.
	// useEffect(() => {
	//   setUnlockedIds(getStoredAchievements());
	// }, []);

	// Функция для разблокировки нового достижения
	const unlockAchievement = useCallback((id: string) => {
		// Проверяем, не разблокировано ли уже
		if (!unlockedIds.includes(id)) {
			const newUnlockedIds = [...unlockedIds, id]
			setUnlockedIds(newUnlockedIds) // Обновляем состояние
			setStoredAchievements(newUnlockedIds) // Обновляем localStorage
			console.log(`Achievement unlocked: ${id}`); // Для дебага
			// TODO: Показать уведомление пользователю?
		}
	}, [unlockedIds]) // Зависит от unlockedIds

	// Функция для проверки, разблокировано ли достижение
	const isUnlocked = useCallback((id: string): boolean => {
		return unlockedIds.includes(id)
	}, [unlockedIds]) // Зависит от unlockedIds

	// Возвращаем состояние и функции
	return {
		unlockedIds,
		unlockAchievement,
		isUnlocked,
	}
}
