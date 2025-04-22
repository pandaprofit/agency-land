import Link from 'next/link'
import styles from './news.module.scss'

// Определение интерфейса для новостной статьи
// Описывает структуру данных, которые мы получаем от API
interface Story {
  id: number        // Уникальный идентификатор новости
  title: string     // Заголовок новости
  by: string        // Имя автора
  time: number      // Время публикации (в формате Unix timestamp)
  url?: string      // Опциональная ссылка на оригинальную статью
}

// Функция для получения данных с Hacker News API
async function getData() {
  try {
    // Получаем список ID топовых новостей
    const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    const storyIds = await res.json()
    // Берем только первые 10 новостей
    const topStories = storyIds.slice(0, 10)

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

// Основной компонент страницы новостей
export default async function NewsPage() {
  // Получаем список новостей
  const stories = await getData()

  return (
    // Основной контейнер страницы
    <div className={styles.container}>
      {/* Заголовок страницы */}
      <h1>Hacker News</h1>
      {/* Контейнер для списка новостей */}
      <div className={styles.newsList}>
        {/* Отображаем каждую новость */}
        {stories.map((story: Story, index: number) => (
          <article key={story.id} className={styles.newsItem}>
            {/* Номер новости */}
            <div className={styles.newsNumber}>{index + 1}</div>
            {/* Контейнер для содержимого новости */}
            <div className={styles.newsContent}>
              {/* Ссылка на детальную страницу новости */}
              <Link href={`/news/${story.id}`}>
                <h2>{story.title}</h2>
              </Link>
              {/* Метаданные новости (автор, дата, ссылка) */}
              <div className={styles.meta}>
                <span>Author: {story.by}</span>
                <span>Date: {new Date(story.time * 1000).toLocaleDateString()}</span>
                {/* Ссылка на оригинальную статью (если есть) */}
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
    </div>
  )
}