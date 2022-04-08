const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./resources/**/*.{php,jsx,js}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      height: {
        '15': '3.375rem'
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
    plugin(({addVariant}) => {
      addVariant('children', '& > *')
    })
  ],
}
