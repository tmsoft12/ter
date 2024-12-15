/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#1a1b26',
          text: '#a9b1d6',
          green: '#9ece6a',
          blue: '#7aa2f7',
          purple: '#9d7cd8'
        }
      },
      animation: {
        'scan': 'scan 1.5s ease-in-out infinite',
        'pulse': 'pulse 1s ease-in-out infinite'
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 }
        }
      }
    },
  },
  plugins: [],
}