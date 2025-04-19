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

Система достижений позволяет отслеживать прогресс пользователя, показывать уведомления о новых достижениях и отображать общий список.

### Хранение данных

*   **Описания достижений**: Все возможные достижения (ID, название, описание, иконка, условие выполнения) хранятся в файле: `src/shared/data/achievements.data.ts` в объекте `ACHIEVEMENTS_LIST`. Тип данных описан в интерфейсе `AchievementDetails` там же.
*   **Статус пользователя**: Список ID разблокированных пользователем достижений хранится в `localStorage` браузера под ключом `userAchievements`.

### Управление состоянием (Контекст)

Вся логика работы с достижениями (чтение/запись `localStorage`, управление уведомлениями) инкапсулирована в хуке `useAchievements` (`src/hooks/useAchievements.ts`).

Для доступа к состоянию и функциям управления достижениями из компонентов используется **React Context**: `AchievementsContext` (`src/context/AchievementsContext.tsx`).

*   **Провайдер**: `AchievementsProvider` - должен оборачивать ваше приложение (или его часть) в `src/app/layout.tsx`.
*   **Хук для использования**: `useAchievementsContext()` - используйте этот хук в **клиентских** компонентах (`'use client'`) для доступа к данным и функциям.

### Добавление/Изменение достижений

1.  Отредактируйте файл `src/shared/data/achievements.data.ts`:
    *   **Добавление**: Добавьте новую запись в объект `ACHIEVEMENTS_LIST`. Ключ = уникальный ID ачивки (строка, например, `scrolled_to_bottom`). Значение = объект типа `AchievementDetails` со всеми полями.
    *   **Изменение**: Найдите запись по ID и измените нужные поля.

### Разблокировка достижений (и показ уведомления)

Чтобы выдать пользователю достижение:

1.  В нужном **клиентском** компоненте импортируйте хук контекста:
    ```typescript
    import { useAchievementsContext } from '@/context/AchievementsContext';
    ```
2.  Получите функцию `unlockAchievement`:
    ```typescript
    const { unlockAchievement } = useAchievementsContext();
    ```
3.  Вызовите `unlockAchievement('achievement_id')` в нужном месте (обработчик события, `useEffect` и т.д.).
    ```typescript
    useEffect(() => {
      unlockAchievement('page_visited');
    }, [unlockAchievement]);
    ```
    Эта функция:
    *   Проверит, не была ли ачивка уже разблокирована.
    *   Если нет, добавит ID в `localStorage` и внутреннее состояние.
    *   **Только если ачивка новая**, добавит уведомление в очередь для показа.

### Отображение

*   **Уведомления (`AchievementsViewer`)**: Компонент `src/components/achievementsViewer` отвечает за отображение всплывающих уведомлений.
    *   Он должен быть добавлен **один раз** в корневой layout (`src/app/layout.tsx`) внутри `AchievementsProvider`.
    *   Уведомления появляются в правом нижнем углу, выстраиваются друг над другом.
    *   Каждое уведомление видно 5 секунд, затем плавно исчезает в течение 15 секунд.
*   **Список достижений (`Achievements`)**: Модуль `src/modules/achievements` отображает полный список всех достижений.
    *   Использует `useAchievementsContext` для определения статуса (разблокировано/заблокировано) каждой ачивки.
    *   Позволяет фильтровать список ("Все", "Полученные", "Не полученные").
    *   Сортирует список: сначала разблокированные, потом заблокированные.
    *   Отображает условие выполнения для каждой ачивки.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Core product API

 - [genshin.dev API](https://github.com/genshindev/api)

## DESIGN

 - [Material Core](https://mui.com/material-ui/)
