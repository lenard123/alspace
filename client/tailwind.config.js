const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      height: {
        '15': '3.375rem'
      }
    },
  },
  plugins: [],
}
