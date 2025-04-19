import { FC, useState, useEffect, useCallback } from 'react'
import classNames from 'classnames'

import styles from './lostintime.module.scss'
import { LostintimeProps, ApiEntry, ProcessedEntry } from './lostintime.types'

// Вспомогательная функция для форматирования даты
const formatDate = (date: Date | null): string => {
  if (!date) return '-';
  const pad = (num: number) => num.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};


const Lostintime: FC<LostintimeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)
  const [entries, setEntries] = useState<ProcessedEntry[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // const API_URL = '/api/lostintime/entries'; // Путь для прокси (не работает на GH Pages)
  const API_URL = 'https://artem-lost-in-time.vercel.app/api/entries'; // Прямой URL API

  // Функция загрузки и обработки данных
  const fetchEntries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setEntries(null); // Очищаем старые данные перед загрузкой

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
      }

      const data: ApiEntry[] = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Неверный формат ответа API');
      }

      if (data.length === 0) {
        setEntries([]);
        setIsLoading(false);
        return;
      }

      // Сортировка (свежие сверху)
      const sortedData = data.sort((a, b) =>
        new Date(b.departureTime).getTime() - new Date(a.departureTime).getTime()
      );

      // Обработка и форматирование
      const processedData: ProcessedEntry[] = sortedData.map(entry => {
        const departureDate = new Date(entry.departureTime);
        const returnDate = entry.returnTime ? new Date(entry.returnTime) : null;
        const expectedReturnDate = new Date(departureDate.getTime() + entry.estimatedDuration * 60 * 1000);

        return {
          ...entry,
          departureTimeFormatted: formatDate(departureDate),
          expectedReturnTimeFormatted: formatDate(expectedReturnDate),
          returnTimeFormatted: returnDate ? formatDate(returnDate) : 'Не вернулся',
          lateByFormatted: entry.lateBy !== null ? entry.lateBy.toString() : '-',
        };
      });

      setEntries(processedData);

    } catch (err) {
      console.error('Ошибка при загрузке данных:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка при загрузке данных');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Загрузка данных при монтировании
  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <div className={rootClassName}>
      <h2 className={styles.title}>Парни , ща приду ©Артём Андреевич </h2>
      <button onClick={fetchEntries} disabled={isLoading} className={styles.refreshButton}>
        {isLoading ? 'Загрузка...' : 'Обновить'}
      </button>

      {isLoading && <p className={styles.loading}>Загрузка...</p>}
      {error && <p className={styles.error}>Ошибка: {error}</p>}

      {!isLoading && !error && entries && entries.length === 0 && (
        <p className={styles.noEntries}>Записей пока нет.</p>
      )}

      {!isLoading && !error && entries && entries.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Время ухода</th>
              <th>Ушел на (мин)</th>
              <th>Ожидаемое время возвращения</th>
              <th>Время прихода</th>
              <th>Опоздание (мин)</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.departureTimeFormatted}</td>
                <td>{entry.estimatedDuration}</td>
                <td>{entry.expectedReturnTimeFormatted}</td>
                <td>{entry.returnTimeFormatted}</td>
                <td>{entry.lateByFormatted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Lostintime
