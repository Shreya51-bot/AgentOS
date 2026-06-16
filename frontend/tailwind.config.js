/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // support class-based dark mode
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0B0F19', // Deep space dark background
          card: '#151C2C',
          hover: '#1E293B'
        },
        primary: {
          DEFAULT: '#6366F1', // Indigo primary
          hover: '#4F46E5',
          light: '#EEF2FF'
        },
        secondary: {
          DEFAULT: '#8B5CF6', // Purple secondary
          hover: '#7C3AED'
        },
        accent: {
          DEFAULT: '#10B981', // Emerald green
          warning: '#F59E0B', // Amber
          danger: '#EF4444'   // Rose red
        },
        slate: {
          950: '#090D16'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)'
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)'
      }
    },
  },
  plugins: [],
}
