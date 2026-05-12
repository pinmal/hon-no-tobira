/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        bg: '#0f0e17',
        surface: '#1a1a2e',
        card: '#16213e',
        accent: '#e8a045',
        accentLight: '#f0c070',
        textPrimary: '#fffffe',
        textMuted: '#a7a9be',
        border: '#2a2a4a',
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
};
