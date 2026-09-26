/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#070A0F',
          900: '#0B0F17',
          850: '#101622',
          800: '#151D2C',
          750: '#1B2538',
          700: '#233048',
          600: '#334466',
          500: '#4E638D',
          400: '#7B91BA',
          300: '#A6B7D6',
          200: '#D1DBEC',
          100: '#E8EDF6',
          50: '#F4F7FB'
        },
        mode: {
          normal: {
            DEFAULT: '#10b981',
            bg: 'rgba(16, 185, 129, 0.10)',
            border: 'rgba(16, 185, 129, 0.30)',
            glow: 'rgba(16, 185, 129, 0.20)'
          },
          rush: {
            DEFAULT: '#f59e0b',
            bg: 'rgba(245, 158, 11, 0.10)',
            border: 'rgba(245, 158, 11, 0.30)',
            glow: 'rgba(245, 158, 11, 0.20)'
          },
          rescue: {
            DEFAULT: '#f43f5e',
            bg: 'rgba(244, 63, 94, 0.12)',
            border: 'rgba(244, 63, 94, 0.35)',
            glow: 'rgba(244, 63, 94, 0.25)'
          }
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-normal': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-rush': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
        'glow-rescue': '0 0 25px -5px rgba(244, 63, 94, 0.30)',
        'glow-brand': '0 0 25px -5px rgba(59, 130, 246, 0.25)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.3)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.25s ease-out forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}
