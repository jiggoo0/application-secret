/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const theme = require('./config/theme.js');

module.exports = {
  // ─── Content Paths ─────────────────────────────────────
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './utils/**/*.{js,jsx}',
    './hooks/**/*.{js,jsx}',
    './public/**/*.html',
  ],

  // ─── Dark Mode Strategy ────────────────────────────────
  darkMode: 'class',

  // ─── Theme Extension ───────────────────────────────────
  theme: {
    extend: {
      colors: {
        ...theme.colors,
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
          hover: 'hsl(var(--primary-hover))',
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
        neutral: 'hsl(var(--neutral))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--error))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
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

  // ─── Plugins ────────────────────────────────────────────
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
            border: `1px solid ${theme('colors.muted.DEFAULT')}`,
            boxShadow: theme('boxShadow.inset'),
            transitionProperty: 'all',
            transitionDuration: theme('transitionDuration.fast'),
            transitionTimingFunction: theme('transitionTimingFunction.fast'),
            backgroundColor: theme('colors.background'),
            color: theme('colors.foreground'),
          },
          '.btn-primary': {
            backgroundColor: theme('colors.primary.DEFAULT'),
            color: theme('colors.primary.foreground'),
            borderColor: theme('colors.primary.DEFAULT'),
          },
          '.btn-primary:hover': {
            backgroundColor: theme('colors.primary.hover'),
            boxShadow: theme('boxShadow.hover'),
          },
          '.btn-secondary': {
            backgroundColor: theme('colors.secondary.DEFAULT'),
            color: theme('colors.secondary.foreground'),
            borderColor: theme('colors.secondary.DEFAULT'),
          },
          '.btn-secondary:hover': {
            backgroundColor: theme('colors.accent.DEFAULT'),
            boxShadow: theme('boxShadow.hover'),
          },
          '.btn-outline': {
            backgroundColor: 'transparent',
            color: theme('colors.primary.DEFAULT'),
            borderColor: theme('colors.primary.DEFAULT'),
          },
          '.btn-outline:hover': {
            backgroundColor: theme('colors.primary.hover'),
            color: theme('colors.primary.foreground'),
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
            color: theme('colors.muted.foreground'),
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

  // ─── DaisyUI Config ─────────────────────────────────────
  daisyui: {
    themes: [
      {
        business: {
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
    darkTheme: 'business',
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};
