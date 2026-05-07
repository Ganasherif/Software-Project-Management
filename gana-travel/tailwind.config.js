/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#12212E',
        teal: '#307082',
        mint: '#6CA3A2',
        cream: '#ECE7DC',
        orange: '#EA9940',
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 24px -8px rgba(18, 33, 46, 0.12)',
        card: '0 10px 30px -10px rgba(18, 33, 46, 0.15)',
        cta: '0 10px 25px -10px rgba(234, 153, 64, 0.6)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.4s ease-out both',
        pop: 'pop 0.35s ease-out',
      },
    },
  },
  plugins: [],
}
