/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        content: '1820px',
      },
      animation: {
        marquee: 'marquee 13s linear infinite',
        marquee2: 'marquee2 13s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-300%)' },
          
          
        },
        marquee2: {
          '0%': { transform: 'translateX(160%)' },
          '100%': { transform: 'translateX(0%)' },
          
        },
        
      },
    },
  },
  plugins: [],
}
