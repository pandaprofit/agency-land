'use client'

import Link from 'next/link'
import styles from '../../newsPage/[id]/news_id.module.scss'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

// Константы для кэширования
const STORY_CACHE_KEY = 'hackerNewsStoryCache';
const STORY_CACHE_LIFETIME = 5 * 60 * 1000; // 5 минут

interface Story {
  id: number
  title: string
  by: string
  time: number
  url?: string
  text?: string
}

interface CachedStory {
  story: Story;
  timestamp: number;
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

// Функция для проверки актуальности кэша
const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < STORY_CACHE_LIFETIME;
};

// Функция для получения истории с сервера
const fetchStoryFromServer = async (id: string): Promise<Story | null> => {
  try {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
};

export default function NewsDetails() {
  const params = useParams()
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)
  const [adjacentStories, setAdjacentStories] = useState<{ prev: Story | null; next: Story | null }>({ prev: null, next: null })

  // Загрузка истории
  useEffect(() => {
    const loadStory = async () => {
      if (!params?.id) return;

      const storyId = params.id as string;
      
      // Пытаемся получить историю из кэша
      const cachedData = getStoryFromCache(storyId);
      
      if (cachedData && isCacheValid(cachedData.timestamp)) {
        // Если кэш валиден, используем его
        setStory(cachedData.story);
        setLoading(false);
        
        // Обновляем данные в фоне
        const freshData = await fetchStoryFromServer(storyId);
        if (freshData) {
          setStory(freshData);
          saveStoryToCache(storyId, freshData);
        }
      } else {
        // Если кэш невалиден или отсутствует, загружаем данные
        const data = await fetchStoryFromServer(storyId);
        if (data) {
          setStory(data);
          saveStoryToCache(storyId, data);
        }
        setLoading(false);
      }
    };

    loadStory();
  }, [params?.id]);

  // Загрузка соседних новостей
  useEffect(() => {
    if (!story) return;

    try {
      // Получаем список всех новостей из localStorage
      const cachedData = localStorage.getItem('hackerNewsCache');
      if (!cachedData) return;

      const { stories } = JSON.parse(cachedData);
      if (!stories || !Array.isArray(stories)) return;

      // Находим индекс текущей новости
      const currentIndex = stories.findIndex(s => s.id === story.id);
      if (currentIndex === -1) return;

      // Получаем предыдущую и следующую новости
      const prev = currentIndex > 0 ? stories[currentIndex - 1] : null;
      const next = currentIndex < stories.length - 1 ? stories[currentIndex + 1] : null;

      setAdjacentStories({ prev, next });
    } catch (error) {
      console.error('Error loading adjacent stories:', error);
    }
  }, [story]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!story) {
    return <div className={styles.error}>Story not found</div>;
  }

  return (
    <div className={styles.newsDetails}>
      <Link href="/news" className={styles.backLink}>
        ← Back to news list
      </Link>
      
      <h1 className={styles.title}>{story.title}</h1>
      <div className={styles.meta}>
        <span>By {story.by}</span>
        <span>•</span>
        <span>{new Date(story.time * 1000).toLocaleString()}</span>
      </div>
      
      {story.text && (
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: story.text }} />
      )}
      
      {story.url && (
        <a href={story.url} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
          Read original article →
        </a>
      )}

      <div className={styles.navigation}>
        {adjacentStories.prev && (
          <Link href={`/news/${adjacentStories.prev.id}`} className={styles.navLink}>
            <span className={styles.navArrow}>&lt;</span>
            <span className={styles.navTitle}>{adjacentStories.prev.title}</span>
          </Link>
        )}
        
        {adjacentStories.next && (
          <Link href={`/news/${adjacentStories.next.id}`} className={styles.navLink}>
            <span className={styles.navTitle}>{adjacentStories.next.title}</span>
            <span className={styles.navArrow}>&gt;</span>
          </Link>
        )}
      </div>
    </div>
  );
}