import { AchievementDetails } from '@/shared/data/achievements.data';

// Наследуем от AchievementDetails и добавляем специфичные для отображения пропсы
export interface AchievementProps extends Partial<AchievementDetails> {
  className?: string;
  isUnlocked: boolean; // Флаг, получено ли достижение
  // Возможно, в будущем понадобятся другие пропсы для стилизации или интерактивности
}
