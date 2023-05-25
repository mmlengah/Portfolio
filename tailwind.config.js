/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html', './css/extra.css'],
  theme: {
    extend: {
      fontFamily: {
        'fontawesome': ['FontAwesome'],
      },      
    },
  },
  plugins: [],
}