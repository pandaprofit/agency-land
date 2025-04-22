// Импорт необходимых компонентов и типов
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import styles from '../../news/news.module.scss'

// Определение интерфейса для новостной статьи
// Расширенная версия интерфейса, включающая поле text для полного текста статьи
interface Story {
  id: number        // Уникальный идентификатор новости
  title: string     // Заголовок новости
  by: string        // Имя автора
  time: number      // Время публикации (в формате Unix timestamp)
  url?: string      // Опциональная ссылка на оригинальную статью
  text?: string     // Опциональный полный текст статьи
}

// Компонент страницы с детальной информацией о новости
export default function NewsDetails({ story }: { story: Story }) {
  return (
    <div className={styles.container}>
      <Link href="/news" className={styles.backLink}>
        ← Back to News
      </Link>
      
      <h1>{story.title}</h1>
      <div className={styles.details}>
        <p>Author: {story.by}</p>
        <p>Date: {new Date(story.time * 1000).toLocaleString()}</p>
        {story.url && (
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            Read full story
          </a>
        )}
        {story.text && (
          <div 
            className={styles.content} 
            dangerouslySetInnerHTML={{ __html: story.text }} 
          />
        )}
      </div>
    </div>
  )
}

// Функция для получения данных на стороне сервера
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Получаем ID новости из параметров URL
  const { id } = context.params!
  
  try {
    // Запрашиваем данные о конкретной новости по её ID
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    const story = await res.json()

    // Возвращаем данные в качестве props для компонента
    return { props: { story } }
  } catch (error) {
    // В случае ошибки логируем её и возвращаем 404 страницу
    console.error('Error:', error)
    return { notFound: true }
  }
}