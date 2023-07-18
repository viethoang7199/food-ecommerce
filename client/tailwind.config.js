/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['Lobster Two', 'cursive']
      },
      colors: {
        pink: '#EA0D42',
        black: '#010F1C',
        orange: '#FF9D2D',
        background: '#FAF7F2',
        overlay: 'rgba(0,0,0,0.5)'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pingHero: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.025)' }

        },
        button: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' }
        },
      },
      animation: {
        wiggle: 'wiggle 1s infinite',
        pingHero: 'pingHero 1s infinite',
        button: 'button 0.8s infinite',
      }
    },
  },
  plugins: [],
}