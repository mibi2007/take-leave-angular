const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        red: {
          50: '#fce3e3',
          100: '#f8b8ba',
          200: '#f4898c',
          300: '#f0595d',
          400: '#ec363b',
          500: '#e91218',
          600: '#e61015',
          700: '#e30d11',
          800: '#df0a0e',
          900: '#d90508',
          A100: '#ffffff',
          A200: '#ffcfcf',
          A400: '#ff9c9c',
          A700: '#ff8283',
        },
        'light-grey': '#e6e6e6',
      },
      boxShadow: {
        1: '0px 3px 5px rgba(0, 0, 0, 0.1)',
        2: '0px 5px 10px rgba(0, 0, 0, 0.15)',
        3: '0px 15px 15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
