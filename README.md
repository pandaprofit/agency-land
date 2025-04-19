# Инструкция к работе

## Стек

- **[Node.js](https://nodejs.org/en/download/prebuilt-installer)** 20 версии
- Пакетный менеджер **[yarn](https://classic.yarnpkg.com/lang/en/docs/install/)** `npm install --global yarn`

### 🐱‍💻 Команды

| Command                  | Action                                        |
| :----------------------- | :-------------------------------------------- |
| `yarn install`           | Установить зависимости                        |
| `yarn run dev`           | Запустить локальный дев сервер                |
| `yarn run build`         | Создать оптимизированный production build     |
| `yarn run start`         | Запустить production build                    |
| `yarn run lint`          | Запустить линтер                              |
| `yarn run stylelint`     | Запустить линтер стилей                       |
| `yarn run prettier`      | Фрорматировать код с настройками prettier     |
| `yarn run check`         | Запустить проверку линтерами и форматирование |
| `yarn run gen:component` | Утилита для создания шаблонного компонента    |

↑ Генерируй компоненты с помощью консольной команды ↑

### 🚀 Структура проекта

_Задумывалась_ **модульная архитектура**

Правило — Нижележащий слой может испльзоваться только в слоях стоящих выше по иерархии

**Лестница слоёв:** `shared 🡒 ui 🡒 service 🡒 components 🡒 modules 🡒 views 🡒 app`

```text
├── public/                 # статические файлы (иконки, картинки и тп.)
│   ├── icons/
│   ├── images/
│   ├── ...
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/                # next app router
│   │   ├── fonts/          # шрифты для локального подключения next/font
│   │   ├── ...
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/         # компоненты ( могут обладать бизнес-логикой )
│   │   ├── dialog/
│   │   ├── ...
│   │   └── index.ts
│   ├── modules/            # модули ( могут иметь вложенные компоненты, своё состояние и изолированную логику )
│   │   ├── footer/
│   │   ├── header/
│   │   └── ...
│   ├── service/            # сервисные компоненты ( провайдеры, порталы и подобные им сущности )
│   │   ├── portal/
│   │   ├── provider/
│   │   └── ...
│   ├── shared/             # общее ( переиспользуемые глобальные сущности не имеющие конкретной привязки )
│   │   ├── api/
│   │   ├── assets/
│   │   ├── atoms/
│   │   ├── const/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── types/
│   ├── ui/                 # элементы интерфейса ( базовые переиспользуемые ui компоненты )
│   │   ├── button/
│   │   ├── ...
│   │   └── index.ts
│   └── views/              # страницы ( лэйауты страниц )
│       ├── home/
│       └── ...
├── util/                   # утилиты ( автоматизация процессов, генерация компонентов, оптимизация картинок и тп. )
│   ├── component/
│   └── ...
├── package.json
└── ...
```


### 🔄 Стейт менеджмент

В качестве стейт менеджера по умолчанию используется **[Jotai](https://jotai.org/)**

### 🎴 Картинки

Для оптимизации изображений используйте компонент **[next/image](https://nextjs.org/docs/app/building-your-application/optimizing/images)**

### ♠️ Иконки

SVG графика для импорта в качестве компонента хранится в директории `src/shared/assets/icons`

Импортируется как компонент:

```typescript jsx
import Icon from '@icons/icon.svg'

const IconExample = () => (
  <div>
    <Icon />
  </div>
)
```

### 📏 Адаптив и скейлинг

По умолчанию в сборке используется скейлинг - хук `useScaling` (вызов из `src/service/provider`). В этом же хуке устанавливается значение для кастомной переменной `--vh` и происходит определение типа устройства, в зависимости от ширины вьюпорта (`mobile`, `tablet`, `desktop`).

В качестве параметров `useScaling` принимает `deviceBreakpoints` (брейкпоинты для определения типа устройства) и `scalingBreakpoints` (брейкпоинты для скейлинга).

Каждый брейкпоинт в `scalingBreakpoints` должен определять ширину экрана `size`, на которой будет произведён переход на него (с опциональным значением `min` для скейлинга вниз от брейкпоинта) и параметры `fontSize` для размера шрифта, устанавливаемого на тег `html` (обязательный базовый размер `base` и опциональные `min` и `max` для предотвращения чрезмерного уменьшения/увеличения размеров).

При задании размеров в стилях необходимо использовать функцию `rem()`, которая импортируется из `'styles/func'`:

```scss
@use '@styles/func';

.element {
  width: func.rem(100);
}
```

## 🏆 Система достижений

Система достижений позволяет отслеживать и отображать прогресс пользователя на сайте.

### Хранение данных

*   **Список всех возможных достижений** (ID, название, описание, иконка, условие выполнения) хранится в файле: `src/shared/data/achievements.data.ts` в объекте `ACHIEVEMENTS_LIST`.
*   **Список ID разблокированных достижений** пользователя хранится в `localStorage` браузера под ключом `userAchievements`.

### Добавление/Изменение достижений

1.  **Отредактируйте файл `src/shared/data/achievements.data.ts`:**
    *   **Для добавления**: Добавьте новую запись в объект `ACHIEVEMENTS_LIST`. Ключ должен быть уникальной строкой (ID ачивки, например, `clicked_secret_button`). Значение - объект типа `AchievementDetails`, заполните все поля (`id`, `title`, `description`, `condition`, `icon` - опционально).
    *   **Для изменения**: Найдите существующую запись по ID и внесите нужные правки.

### Разблокировка достижений

Чтобы выдать пользователю достижение при выполнении какого-либо действия:

1.  Импортируйте хук `useAchievements` в нужный **клиентский** компонент (`'use client'`):
    ```typescript
    import { useAchievements } from '@/hooks/useAchievements';
    ```
2.  Получите функцию `unlockAchievement` из хука:
    ```typescript
    const { unlockAchievement } = useAchievements();
    ```
3.  Вызовите `unlockAchievement` с ID нужного достижения в обработчике события или `useEffect`:
    ```typescript
    // Пример в обработчике клика
    const handleClick = () => {
      unlockAchievement('your_achievement_id');
    };

    // Пример в useEffect (сработает один раз при монтировании)
    useEffect(() => {
      unlockAchievement('page_visited_achievement_id');
    }, [unlockAchievement]); // Важно добавить unlockAchievement в зависимости
    ```

### Отображение достижений

*   **Модуль `Achievements` (`src/modules/achievements`)**: Отображает полный список всех достижений (разблокированных и заблокированных) с их статусом и условиями.
*   **Компонент `AchievementsViewer` (`src/components/achievementsViewer`)**: Отображает всплывающее уведомление в момент получения нового достижения. Этот компонент должен быть добавлен в корневой layout (`src/app/layout.tsx`) один раз.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Core product API

 - [genshin.dev API](https://github.com/genshindev/api)

## DESIGN

 - [Material Core](https://mui.com/material-ui/)
