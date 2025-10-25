/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const theme = require('./config/theme.js');

module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './utils/**/*.{js,jsx}',
    './hooks/**/*.{js,jsx}',
    './public/**/*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...theme.colors,
        background: 'hsl(var(--background, 0 0% 100%))',
        foreground: 'hsl(var(--foreground, 0 0% 7%))',
        card: 'hsl(var(--card, 0 0% 100%))',
        'card-foreground': 'hsl(var(--card-foreground, 0 0% 7%))',
        popover: 'hsl(var(--popover, 0 0% 100%))',
        'popover-foreground': 'hsl(var(--popover-foreground, 0 0% 7%))',
        primary: 'hsl(var(--primary, 0 0% 9%))',
        'primary-hover': 'hsl(var(--primary-hover, 220 60% 40%))',
        'primary-foreground': 'hsl(var(--primary-foreground, 0 0% 98%))',
        secondary: 'hsl(var(--secondary, 0 0% 96.1%))',
        'secondary-foreground': 'hsl(var(--secondary-foreground, 0 0% 12%))',
        accent: 'hsl(var(--accent, 0 0% 96.1%))',
        'accent-foreground': 'hsl(var(--accent-foreground, 0 0% 12%))',
        muted: 'hsl(var(--muted, 0 0% 96.1%))',
        'muted-foreground': 'hsl(var(--muted-foreground, 0 0% 30%))',
        destructive: 'hsl(var(--destructive, 0 84.2% 60.2%))',
        'destructive-foreground': 'hsl(var(--destructive-foreground, 0 0% 98%))',
        border: 'hsl(var(--border, 0 0% 89.8%))',
        input: 'hsl(var(--input, 0 0% 89.8%))',
        ring: 'hsl(var(--ring, 0 0% 7%))',
        neutral: 'hsl(var(--neutral, 210 16% 90%))',
        success: 'hsl(var(--success, 160 70% 40%))',
        warning: 'hsl(var(--warning, 43 90% 60%))',
        error: 'hsl(var(--error, 0 70% 45%))',
        chart: {
          1: 'hsl(var(--chart-1, 12 76% 61%))',
          2: 'hsl(var(--chart-2, 173 58% 39%))',
          3: 'hsl(var(--chart-3, 197 37% 24%))',
          4: 'hsl(var(--chart-4, 43 74% 66%))',
          5: 'hsl(var(--chart-5, 27 87% 67%))',
        },
      },
      borderRadius: {
        ...theme.borderRadius,
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        ...theme.boxShadow,
        inset: 'var(--shadow-inset)',
        hover: 'var(--shadow-hover)',
        card: 'var(--shadow-card)',
      },
      fontFamily: {
        sans: theme.fontFamily.sans,
        heading: theme.fontFamily.heading,
        mono: theme.fontFamily.mono,
      },
      fontSize: {
        ...theme.fontSize,
        h1: theme.fontSize.h1,
        h2: theme.fontSize.h2,
        h3: theme.fontSize.h3,
      },
      fontWeight: {
        ...theme.fontWeight,
      },
      spacing: {
        ...theme.spacing,
      },
      zIndex: {
        ...theme.zIndex,
      },
      screens: {
        ...theme.screens,
      },
      opacity: {
        ...theme.opacity,
      },
      transitionDuration: {
        fast: '200ms',
        normal: '300ms',
      },
      transitionTimingFunction: {
        fast: 'ease-in-out',
        normal: 'ease',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
    require('tailwindcss-animate'),
    plugin(({ addUtilities, theme }) => {
      addUtilities(
        {
          '.btn': {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: theme('fontWeight.medium'),
            borderRadius: theme('borderRadius.md'),
            padding: `${theme('spacing.sm')} ${theme('spacing.md')}`,
            border: `1px solid ${theme('colors.border')}`,
            boxShadow: theme('boxShadow.inset'),
            transitionProperty: 'all',
            transitionDuration: theme('transitionDuration.fast'),
            transitionTimingFunction: theme('transitionTimingFunction.fast'),
            backgroundColor: theme('colors.background'),
            color: theme('colors.foreground'),
          },
          '.btn-primary': {
            backgroundColor: theme('colors.primary'),
            color: theme('colors.primary-foreground'),
            borderColor: theme('colors.primary'),
          },
          '.btn-primary:hover': {
            backgroundColor: theme('colors.primary-hover'),
            boxShadow: theme('boxShadow.hover'),
          },
          '.btn-secondary': {
            backgroundColor: theme('colors.secondary'),
            color: theme('colors.secondary-foreground'),
            borderColor: theme('colors.secondary'),
          },
          '.btn-secondary:hover': {
            backgroundColor: theme('colors.accent'),
            boxShadow: theme('boxShadow.hover'),
          },
          '.btn-outline': {
            backgroundColor: 'transparent',
            color: theme('colors.primary'),
            borderColor: theme('colors.primary'),
          },
          '.btn-outline:hover': {
            backgroundColor: theme('colors.primary-hover'),
            color: theme('colors.primary-foreground'),
          },
          '.btn-disabled': {
            opacity: theme('opacity.50'),
            cursor: 'not-allowed',
            pointerEvents: 'none',
          },
          '.card': {
            backgroundColor: theme('colors.surface'),
            borderRadius: theme('borderRadius.lg'),
            boxShadow: theme('boxShadow.card'),
            border: `1px solid ${theme('colors.border')}`,
            padding: theme('spacing.lg'),
            transition: 'box-shadow 0.2s ease-in-out',
          },
          '.card:hover': {
            boxShadow: theme('boxShadow.hover'),
          },
          '.badge': {
            display: 'inline-block',
            padding: `${theme('spacing.xs')} ${theme('spacing.sm')}`,
            fontSize: theme('fontSize.xs'),
            fontWeight: theme('fontWeight.medium'),
            borderRadius: theme('borderRadius.full'),
            backgroundColor: theme('colors.neutral'),
            color: theme('colors.muted-foreground'),
          },
          '.badge-success': {
            backgroundColor: theme('colors.success'),
            color: theme('colors.background'),
          },
          '.badge-warning': {
            backgroundColor: theme('colors.warning'),
            color: theme('colors.foreground'),
          },
          '.badge-error': {
            backgroundColor: theme('colors.error'),
            color: theme('colors.background'),
          },
        },
        { variants: ['responsive', 'hover'] },
      );
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
    styled: true,
    utils: true,
    logs: false,
  },
};
