'use client'

import React, { createContext, useContext, ReactNode } from 'react';
import { useAchievements } from '@/hooks/useAchievements';
import { AchievementDetails } from '@/shared/data/achievements.data';

// Интерфейс для уведомления (копируем или импортируем из хука)
interface AchievementNotification extends AchievementDetails {
	notificationId: string;
}

// Обновляем тип контекста
interface AchievementsContextType {
	unlockedIds: string[];
	unlockAchievement: (id: string) => void;
	isUnlocked: (id: string) => boolean;
	activeNotifications: AchievementNotification[]; // Массив уведомлений
	clearNotification: (notificationId: string) => void; // Принимает ID
}

// Создаем контекст
const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

// Провайдер остается без изменений, он использует useAchievements
export const AchievementsProvider = ({ children }: { children: ReactNode }) => {
	const achievements = useAchievements();

	return (
		<AchievementsContext.Provider value={achievements}>
			{children}
		</AchievementsContext.Provider>
	);
};

// Хук для использования контекста остается без изменений
export const useAchievementsContext = () => {
	const context = useContext(AchievementsContext);
	if (context === undefined) {
		throw new Error('useAchievementsContext must be used within an AchievementsProvider');
	}
	return context;
};
