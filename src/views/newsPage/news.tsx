'use client'

import Link from 'next/link'
import styles from './news.module.scss'
import { useState, useEffect } from 'react'

// Константы для кэширования
const CACHE_KEY = 'hackerNewsCache';
const CACHE_LIFETIME = 5 * 60 * 1000; // 5 минут в миллисекундах

// Определение интерфейса для новостной статьи
// Описывает структуру данных, которые мы получаем от API
interface Story {
  id: number        // Уникальный идентификатор новости
  title: string     // Заголовок новости
  by: string        // Имя автора
  time: number      // Время публикации (в формате Unix timestamp)
  url?: string      // Опциональная ссылка на оригинальную статью
}

// Интерфейс для кэшированных данных
interface CachedData {
  stories: Story[];
  timestamp: number;
}

// Функция для получения данных с Hacker News API
async function getData() {
  try {
    // Получаем список ID топовых новостей
    const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    const storyIds = await res.json()
    // Убираем ограничение в 10 новостей
    const topStories = storyIds

    // Получаем полную информацию о каждой новости
    const stories = await Promise.all(
      topStories.map(async (id: number) => {
        const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        return storyRes.json()
      })
    )

    return stories
  } catch (error) {
    // В случае ошибки логируем её и возвращаем пустой массив
    console.error('Error fetching news:', error)
    return []
  }
}

// Функция для проверки доступности localStorage
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// Функция для сохранения данных в кэш
const saveToCache = (stories: Story[]) => {
  if (!isLocalStorageAvailable()) return;
  
  try {
    const cacheData: CachedData = {
      stories,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

// Функция для получения данных из кэша
const getFromCache = (): CachedData | null => {
  if (!isLocalStorageAvailable()) return null;
  
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (!cachedData) return null;
    return JSON.parse(cachedData);
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

// Функция для проверки актуальности кэша
const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_LIFETIME;
};

// Константы для кэширования историй
const STORY_CACHE_KEY = 'hackerNewsStoryCache';
const STORY_CACHE_LIFETIME = 5 * 60 * 1000; // 5 минут
const ITEMS_PER_PAGE = 20; // Количество элементов на странице
const CURRENT_PAGE_KEY = 'hackerNewsCurrentPage'; // Ключ для сохранения текущей страницы
const SCROLL_POSITION_KEY = 'hackerNewsScrollPosition'; // Ключ для сохранения позиции прокрутки

// Интерфейс для кэшированной истории
interface CachedStory {
  story: Story;
  timestamp: number;
}

// Функция для предварительной загрузки новостей для страницы
const preloadStoriesForPage = async (page: number, stories: Story[]) => {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, stories.length);
  
  // Получаем ID новостей для текущей страницы
  const storyIds = stories.slice(startIndex, endIndex).map(story => story.id);
  
  // Создаем массив промисов для параллельной загрузки
  const preloadPromises = storyIds.map(async (id) => {
    try {
      // Проверяем, есть ли уже кэшированная версия
      const cachedData = getStoryFromCache(id.toString());
      
      if (!cachedData || !isCacheValid(cachedData.timestamp)) {
        // Если кэша нет или он устарел, загружаем новость
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        const data = await res.json();
        
        if (data) {
          // Сохраняем в кэш
          saveStoryToCache(id.toString(), data);
        }
      }
    } catch (error) {
      console.error(`Error preloading story ${id}:`, error);
    }
  });

  // Запускаем все загрузки параллельно
  await Promise.all(preloadPromises);
};

// Функция для предзагрузки соседних страниц
const preloadAdjacentPages = async (currentPage: number, totalPages: number, stories: Story[]) => {
  const pagesToPreload = [];
  
  // Добавляем предыдущую страницу, если она существует
  if (currentPage > 1) {
    pagesToPreload.push(currentPage - 1);
  }
  
  // Добавляем следующую страницу, если она существует
  if (currentPage < totalPages) {
    pagesToPreload.push(currentPage + 1);
  }
  
  // Предзагружаем все соседние страницы параллельно
  await Promise.all(
    pagesToPreload.map(page => preloadStoriesForPage(page, stories))
  );
};

// Функция для получения истории из кэша
const getStoryFromCache = (id: string): CachedStory | null => {
  if (!isLocalStorageAvailable()) return null;
  
  try {
    const cacheKey = `${STORY_CACHE_KEY}_${id}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (!cachedData) return null;
    return JSON.parse(cachedData);
  } catch (error) {
    console.error('Error reading story from cache:', error);
    return null;
  }
};

// Функция для сохранения истории в кэш
const saveStoryToCache = (id: string, story: Story) => {
  if (!isLocalStorageAvailable()) return;
  
  try {
    const cacheKey = `${STORY_CACHE_KEY}_${id}`;
    const cacheData: CachedStory = {
      story,
      timestamp: Date.now()
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error saving story to cache:', error);
  }
};

// Основной компонент страницы новостей
export default function NewsPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(() => {
    // Инициализируем состояние из localStorage при загрузке компонента
    if (typeof window !== 'undefined' && isLocalStorageAvailable()) {
      try {
        const savedPage = localStorage.getItem(CURRENT_PAGE_KEY);
        return savedPage ? parseInt(savedPage, 10) : 1;
      } catch (error) {
        console.error('Error reading current page from cache:', error);
        return 1;
      }
    }
    return 1;
  })
  const [sortType, setSortType] = useState<string>('default')
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
  const itemsPerPage = ITEMS_PER_PAGE

  // Сохраняем текущую страницу в localStorage при её изменении
  useEffect(() => {
    if (isLocalStorageAvailable()) {
      try {
        localStorage.setItem(CURRENT_PAGE_KEY, currentPage.toString());
      } catch (error) {
        console.error('Error saving current page to cache:', error);
      }
    }
  }, [currentPage]);

  // Восстанавливаем позицию прокрутки при загрузке компонента
  useEffect(() => {
    if (typeof window !== 'undefined' && isLocalStorageAvailable()) {
      try {
        const savedScrollPosition = localStorage.getItem(SCROLL_POSITION_KEY);
        if (savedScrollPosition) {
          // Используем setTimeout, чтобы дать время на рендеринг компонента
          setTimeout(() => {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
          }, 100);
          
          // Очищаем сохраненную позицию прокрутки после восстановления
          localStorage.removeItem(SCROLL_POSITION_KEY);
        }
      } catch (error) {
        console.error('Error restoring scroll position:', error);
      }
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Пытаемся получить данные из кэша
        const cachedData = getFromCache();
        
        if (cachedData && isCacheValid(cachedData.timestamp)) {
          // Если кэш валиден, используем его
          setStories(cachedData.stories);
          setLoading(false);
          
          // Обновляем данные в фоне
          updateDataInBackground();
        } else {
          // Если кэш невалиден или отсутствует, загружаем данные
          await fetchFreshData();
        }
      } catch (error) {
        console.error('Error in loadData:', error);
        // В случае ошибки пытаемся загрузить свежие данные
        await fetchFreshData();
      }
    };

    const fetchFreshData = async () => {
      try {
        const data = await getData();
        if (data && data.length > 0) {
          setStories(data);
          saveToCache(data); // Сохраняем данные в кэш при первой загрузке
        } else {
          // Если данные пустые, пробуем использовать кэш
          const cachedData = getFromCache();
          if (cachedData) {
            setStories(cachedData.stories);
          }
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        // Пытаемся использовать кэш даже если он устарел
        const cachedData = getFromCache();
        if (cachedData) {
          setStories(cachedData.stories);
        }
      } finally {
        setLoading(false);
      }
    };

    const updateDataInBackground = async () => {
      try {
        const data = await getData();
        if (data && data.length > 0) {
          setStories(data);
          saveToCache(data);
        }
      } catch (error) {
        console.error('Error updating data in background:', error);
      }
    };

    loadData();
  }, []);

  // Фильтрация новостей на основе поискового запроса
  const filteredStories = stories.filter(story => {
    const searchLower = searchQuery.toLowerCase()
    return (
      story.title.toLowerCase().includes(searchLower) ||
      story.by.toLowerCase().includes(searchLower)
    )
  })

  // Функция для очистки заголовка от кавычек в начале и HTML-тегов
  const cleanTitle = (title: string): string => {
    if (!title) return '';
    
    // Удаляем HTML-теги (более надежный способ)
    const withoutHtml = title.replace(/<[^>]*>|&[^;]+;/g, '');
    
    // Удаляем кавычки в начале строки (включая типографские кавычки)
    const withoutQuotes = withoutHtml.replace(/^["'"]+/, '');
    
    // Удаляем пробелы в начале и конце
    return withoutQuotes.trim();
  }

  // Сортировка новостей
  const sortedStories = [...filteredStories].sort((a, b) => {
    switch (sortType) {
      case 'title-asc':
        return cleanTitle(a.title).localeCompare(cleanTitle(b.title))
      case 'title-desc':
        return cleanTitle(b.title).localeCompare(cleanTitle(a.title))
      case 'date-asc':
        return a.time - b.time
      case 'date-desc':
        return b.time - a.time
      default:
        return 0
    }
  })

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(sortedStories.length / itemsPerPage)

  // Получаем новости для текущей страницы
  const currentStories = sortedStories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Генерируем массив номеров страниц для отображения
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 7 // Увеличиваем максимальное количество видимых страниц

    if (totalPages <= maxVisiblePages) {
      // Если страниц меньше или равно maxVisiblePages, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Всегда показываем первую страницу
      pages.push(1)

      // Вычисляем диапазон страниц вокруг текущей
      // Показываем по 2 страницы с каждой стороны от текущей
      let start = Math.max(2, currentPage - 2)
      let end = Math.min(totalPages - 1, currentPage + 2)

      // Добавляем многоточие после первой страницы, если нужно
      if (start > 2) {
        pages.push('...')
      }

      // Добавляем страницы вокруг текущей
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Добавляем многоточие перед последней страницей, если нужно
      if (end < totalPages - 1) {
        pages.push('...')
      }

      // Всегда показываем последнюю страницу
      pages.push(totalPages)
    }

    return pages
  }

  // Обработчик изменения страницы
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
      
      // Предзагружаем текущую страницу
      preloadStoriesForPage(page, sortedStories);
      
      // Предзагружаем соседние страницы
      preloadAdjacentPages(page, totalPages, sortedStories);
    }
  }

  // Обработчик для быстрого перехода на страницу
  const handleQuickJump = (direction: 'prev' | 'next') => {
    let newPage = currentPage
    
    if (direction === 'prev') {
      // Переход на 2 страницы назад, но не меньше 1
      newPage = Math.max(1, currentPage - 2)
    } else {
      // Переход на 2 страницы вперед, но не больше totalPages
      newPage = Math.min(totalPages, currentPage + 2)
    }
    
    handlePageChange(newPage)
  }

  // Обработчик изменения типа сортировки
  const handleSortChange = (type: string) => {
    setSortType(type)
    setCurrentPage(1) // Сброс на первую страницу при изменении сортировки
    setIsSortMenuOpen(false)
  }

  // Закрытие меню сортировки при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(`.${styles.sortContainer}`)) {
        setIsSortMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Получаем текст для текущего варианта сортировки
  const getSortLabel = () => {
    switch (sortType) {
      case 'title-asc':
        return 'По алфавиту (А-Я)'
      case 'title-desc':
        return 'По алфавиту (Я-А)'
      case 'date-asc':
        return 'По дате (сначала старые)'
      case 'date-desc':
        return 'По дате (сначала новые)'
      default:
        return 'Сортировка'
    }
  }

  // Обработчик клика по новости
  const handleNewsClick = (storyId: number) => {
    // Сохраняем текущую позицию прокрутки перед переходом
    if (isLocalStorageAvailable()) {
      try {
        localStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
      } catch (error) {
        console.error('Error saving scroll position:', error);
      }
    }
  };

  // Добавляем эффект для предзагрузки при первой загрузке
  useEffect(() => {
    if (stories.length > 0) {
      // Предзагружаем текущую страницу
      preloadStoriesForPage(currentPage, stories);
      
      // Предзагружаем соседние страницы
      preloadAdjacentPages(currentPage, totalPages, stories);
    }
  }, [stories, currentPage, totalPages]);

  if (loading) {
    return <div className={styles.container}>Loading...</div>
  }

  return (
    // Основной контейнер страницы
    <div className={styles.container}>
      {/* Заголовок страницы */}
      <h1>Hacker News</h1>
      <div className={styles.subtitle}>все новости спизжены с открытых источников</div>
      
      {/* Поисковая строка */}
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Поиск по заголовку или автору..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className={styles.searchInput}
          />
          
          <div className={styles.sortContainer}>
            <button 
              className={`${styles.sortButton} ${isSortMenuOpen ? styles.sortButtonActive : ''}`}
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
            >
              {getSortLabel()}
              <span className={styles.sortIcon}>▼</span>
            </button>
            
            {isSortMenuOpen && (
              <div className={styles.sortMenu}>
                <button 
                  className={`${styles.sortMenuItem} ${sortType === 'title-asc' ? styles.sortMenuItemActive : ''}`}
                  onClick={() => handleSortChange('title-asc')}
                >
                  По алфавиту (А-Я)
                  {sortType === 'title-asc' && <span className={styles.checkmark}>✓</span>}
                </button>
                <button 
                  className={`${styles.sortMenuItem} ${sortType === 'title-desc' ? styles.sortMenuItemActive : ''}`}
                  onClick={() => handleSortChange('title-desc')}
                >
                  По алфавиту (Я-А)
                  {sortType === 'title-desc' && <span className={styles.checkmark}>✓</span>}
                </button>
                <button 
                  className={`${styles.sortMenuItem} ${sortType === 'date-asc' ? styles.sortMenuItemActive : ''}`}
                  onClick={() => handleSortChange('date-asc')}
                >
                  По дате (сначала старые)
                  {sortType === 'date-asc' && <span className={styles.checkmark}>✓</span>}
                </button>
                <button 
                  className={`${styles.sortMenuItem} ${sortType === 'date-desc' ? styles.sortMenuItemActive : ''}`}
                  onClick={() => handleSortChange('date-desc')}
                >
                  По дате (сначала новые)
                  {sortType === 'date-desc' && <span className={styles.checkmark}>✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Список новостей */}
      <div className={styles.newsList}>
        {currentStories.map((story: Story, index: number) => (
          <article key={story.id} className={styles.newsItem}>
            <div className={styles.newsNumber}>{(currentPage - 1) * itemsPerPage + index + 1}</div>
            <div className={styles.newsContent}>
              <Link href={`/news/${story.id}`} onClick={() => handleNewsClick(story.id)}>
                <h2>{story.title}</h2>
              </Link>
              <div className={styles.meta}>
                <span>Author: {story.by}</span>
                <span>Date: {new Date(story.time * 1000).toLocaleDateString()}</span>
                {story.url && (
                  <a href={story.url} target="_blank" rel="noopener noreferrer">
                    Original source
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Пагинация */}
      <div className={styles.pagination}>
        <button 
          onClick={() => handleQuickJump('prev')}
          disabled={currentPage <= 2}
          className={styles.paginationButton}
        >
          ←
        </button>
        
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(page as number)}
              className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
            >
              {page}
            </button>
          )
        ))}

        <button 
          onClick={() => handleQuickJump('next')}
          disabled={currentPage >= totalPages - 1}
          className={styles.paginationButton}
        >
          →
        </button>
      </div>
    </div>
  )
}