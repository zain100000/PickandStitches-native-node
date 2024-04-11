/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#539165',
        secondary: '#9DC08B',
        ternary: '#00bcd4',
        white: '#FFF',
        dark: '#000',
        light: '#E5E5E5',
        grey: '#908e8c',
      },
    },
  },
  plugins: [],
};
