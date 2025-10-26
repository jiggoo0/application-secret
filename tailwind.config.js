/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const theme = require('./config/theme.js');

const isTermux = !!process.env.TERMUX;

const config = {
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
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Noto Sans Thai"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '6px',
        lg: '8px',
        xl: '12px',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0, 0, 0, 0.05)',
        medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
          primary: '#1E3A8A',
          'primary-focus': '#1E40AF',
          secondary: '#F1F5F9',
          'secondary-focus': '#E2E8F0',
          accent: '#0EA5E9',
          neutral: '#64748B',
          'base-100': '#FFFFFF',
          info: '#2094f3',
          success: '#16A34A',
          warning: '#facc15',
          error: '#DC2626',
        },
      },
    ],
    darkTheme: 'adosy',
    base: false,
    styled: false,
    utils: true,
    logs: false,
  },
};

if (isTermux) {
  config.watchOptions = {
    poll: 1000,
    aggregateTimeout: 300,
    ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**', '/data', '/data/data', '/'],
  };
}

module.exports = config;
