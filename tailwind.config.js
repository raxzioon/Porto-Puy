/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#ff5fac',
          pinkLight: '#ff8ec4',
          pinkGlow: 'rgba(255, 95, 172, 0.45)',
          gold: '#d8ac6a',
          goldLight: '#f8dfa5',
          goldGlow: 'rgba(216, 172, 106, 0.4)',
          dark: '#07070a',
          darkSurface: '#0e0d14',
          card: '#121118',
          cardBorder: 'rgba(255, 255, 255, 0.08)'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif']
      },
      boxShadow: {
        'glow-pink': '0 0 25px rgba(255, 95, 172, 0.45)',
        'glow-pink-lg': '0 0 40px rgba(255, 95, 172, 0.65)',
        'glow-gold': '0 0 25px rgba(216, 172, 106, 0.4)',
        'glow-card': '0 8px 30px -4px rgba(0, 0, 0, 0.7), 0 0 20px -2px rgba(255, 95, 172, 0.15)',
        'nav-glow': '0 8px 32px 0 rgba(0, 0, 0, 0.6), 0 0 28px -4px rgba(255, 95, 172, 0.45)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
