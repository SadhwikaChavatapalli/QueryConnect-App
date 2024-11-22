/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8EDE3',
        beige: '#DFD3C3',
        taupe: '#D0B8A8',
        brown: '#8D493A',
      },
    },
    margin: {
      'default': '1rem'
    }
  },
  plugins: [
              require("@tailwindcss/typography"),
              require('daisyui'),
              addDynamicIconSelectors(),
          ],
};
