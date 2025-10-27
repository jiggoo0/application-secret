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
  darkMode: ['class', 'class'],
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
        heading: ['"Noto Sans Thai"', 'sans-serif'], // ✅ แก้ quote ให้ถูกต้อง
      },
      borderRadius: {
        DEFAULT: '6px',
        lg: 'var(--radius)',
        xl: '12px',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
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