import { AchievementDetails } from '@/shared/data/achievements.data';

// Наследуем от AchievementDetails и добавляем/переопределяем пропсы
export interface AchievementProps extends Partial<Omit<AchievementDetails, 'id'>> { // Делаем все поля из Details опциональными, кроме id
  id: string; // ID делаем обязательным
  className?: string;
  isUnlocked: boolean; // Флаг, получено ли достижение
  // Поле condition будет получено через AchievementDetails
  // Возможно, в будущем понадобятся другие пропсы для стилизации или интерактивности
}
