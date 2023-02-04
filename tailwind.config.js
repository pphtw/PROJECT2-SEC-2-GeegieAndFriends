/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        content: '1820px',
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
        marquee2: 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
          
        },
        marquee2: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(-0%)' },
          
        },
        
      },
    },
  },
  plugins: [],
}
