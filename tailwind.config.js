/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      retro: {
        "color-scheme": "light",
        "primary": "#A47764",        // Теплый коричневый как основной цвет
        "primary-content": "#F0F0E5", // Светлый для контраста

        // Вторичные цвета
        "secondary": "#8B645A",      // Темно-коричневый
        "secondary-content": "#E4C7B8", // Нежно-розовый

        // Акцентные цвета
        "accent": "#C39E88",         // Теплый розово-коричневый
        "accent-content": "#56453F",  // Темный для контраста

        // Нейтральные цвета
        "neutral": "#BBAA92",        // Бежевый
        "neutral-content": "#56453F", // Темный для контраста

        // Фоновые цвета (от светлого к темному)
        "base-100": "#F0F0E5",       // Самый светлый фон
        "base-200": "#E4C7B8",       // Нежно-розовый фон
        "base-300": "#A28777",       // Средний коричневый
        "base-content": "#56453F",    // Темный текст

        // Статусные цвета
        "info": "#C39E88",           // Информационный (теплый)
        "success": "#BBAA92",        // Успех (бежевый)
        "warning": "#A47764",        // Предупреждение (коричневый)
        "error": "#8B645A",          // Ошибка (темно-коричневый)

        // Скругления
        "--rounded-box": "0.4rem",
        "--rounded-btn": "0.4rem",
        "--rounded-badge": "0.4rem",
        "--tab-radius": "0.4rem",
      }
    }]
  }
}
