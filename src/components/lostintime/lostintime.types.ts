// src/components/lostintime/lostintime.types.ts

// Тип объекта, приходящего с API
export interface ApiEntry {
  id: string;
  departureTime: string; // ISO 8601 string
  estimatedDuration: number; // minutes
  returnTime: string | null; // ISO 8601 string or null
  lateBy: number | null; // minutes or null
}

// Тип объекта после обработки и форматирования
export interface ProcessedEntry extends Omit<ApiEntry, 'departureTime' | 'returnTime'> {
  departureTimeFormatted: string;
  expectedReturnTimeFormatted: string;
  returnTimeFormatted: string; // "ДД.ММ.ГГГГ ЧЧ:ММ:СС" или "Не вернулся"
  lateByFormatted: string; // минуты или "-"
}

// Пропсы компонента (пока только className)
export interface LostintimeProps {
  className?: string;
}
