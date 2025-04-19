'use client'

import React, { createContext, useContext, ReactNode } from 'react';
import { useAchievements } from '@/hooks/useAchievements';
import { AchievementDetails } from '@/shared/data/achievements.data';
import { NotificationStatus } from '@/hooks/useAchievements'; // Импортируем тип статуса

// Обновляем интерфейс уведомления
interface AchievementNotification extends AchievementDetails {
	notificationId: string;
	status: NotificationStatus;
}

// Обновляем тип контекста
interface AchievementsContextType {
	unlockedIds: string[];
	unlockAchievement: (id: string) => void;
	isUnlocked: (id: string) => boolean;
	activeNotifications: AchievementNotification[];
	clearNotification: (notificationId: string) => void; // Для немедленного удаления (ручное закрытие)
	removeNotification: (notificationId: string) => void; // Для удаления после анимации
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
