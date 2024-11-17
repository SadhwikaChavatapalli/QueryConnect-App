/** @type {import('tailwindcss').Config} */
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
  },
  plugins: [require('daisyui')],
};
