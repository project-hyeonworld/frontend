/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 적용할 js파일 경로 지정
  ],
  darkMode: false,
  theme: {
    extend: {
      color: {
        gray: colors.coolGray,
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia,
      }
    },
  },
  plugins: [],
}

