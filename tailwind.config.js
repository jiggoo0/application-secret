/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const theme = require('./config/theme.js');

const isTermux = !!process.env.TERMUX;

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      ...theme,
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
        },
      },
      gridTemplateColumns: {
        layout: 'repeat(auto-fit, minmax(280px, 1fr))',
      },
      maxWidth: {
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
      },
      minHeight: {
        screen: '100vh',
      },
      transitionProperty: {
        layout: 'margin, padding, width, height',
      },
      lineHeight: {
        relaxed: '1.75',
        tight: '1.25',
      },
      aspectRatio: {
        square: '1 / 1',
        video: '16 / 9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('daisyui'),
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.container': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          [`@media (min-width: ${theme('screens.sm')})`]: {
            maxWidth: '640px',
          },
          [`@media (min-width: ${theme('screens.md')})`]: {
            maxWidth: '768px',
          },
          [`@media (min-width: ${theme('screens.lg')})`]: {
            maxWidth: '1024px',
          },
          [`@media (min-width: ${theme('screens.xl')})`]: {
            maxWidth: '1280px',
          },
          [`@media (min-width: ${theme('screens.2xl')})`]: {
            maxWidth: '1536px',
          },
        },
      });
    }),
  ],
  daisyui: {
    themes: [
      {
        adosy: {
          primary: '#2563eb',
          'primary-focus': '#1d4ed8',
          secondary: '#f1f5f9',
          'secondary-focus': '#e0f2fe',
          accent: '#16a34a',
          neutral: '#d1d5db',
          'base-100': '#ffffff',
          info: '#2094f3',
          success: '#16a34a',
          warning: '#facc15',
          error: '#dc2626',
        },
      },
    ],
    darkTheme: 'adosy',
    base: false,
    styled: false,
    utils: true,
    logs: false,
  },
  ...(isTermux && {
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**', '/data', '/data/data', '/'],
    },
  }),
};
