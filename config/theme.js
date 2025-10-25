/** @type {import('tailwindcss').Config['theme']} */
module.exports = {
  colors: {
    background: 'hsl(var(--background, 0 0% 100%))',
    surface: 'hsl(var(--surface, 0 0% 100%))',
    card: 'hsl(var(--card, 0 0% 100%))',
    popover: 'hsl(var(--popover, 0 0% 100%))',
    foreground: 'hsl(var(--foreground, 0 0% 7%))',
    'card-foreground': 'hsl(var(--card-foreground, 0 0% 7%))',
    'popover-foreground': 'hsl(var(--popover-foreground, 0 0% 7%))',

    primary: {
      DEFAULT: 'hsl(var(--primary, 220 60% 40%))',
      hover: 'hsl(var(--primary-hover, 220 60% 30%))',
      foreground: 'hsl(var(--primary-foreground, 0 0% 98%))',
    },
    secondary: {
      DEFAULT: 'hsl(var(--secondary, 0 0% 96%))',
      foreground: 'hsl(var(--secondary-foreground, 0 0% 20%))',
    },
    accent: {
      DEFAULT: 'hsl(var(--accent, 160 70% 40%))',
      foreground: 'hsl(var(--accent-foreground, 0 0% 98%))',
    },
    muted: {
      DEFAULT: 'hsl(var(--muted, 0 0% 90%))',
      foreground: 'hsl(var(--muted-foreground, 0 0% 40%))',
    },
    destructive: {
      DEFAULT: 'hsl(var(--destructive, 0 84% 60%))',
      foreground: 'hsl(var(--destructive-foreground, 0 0% 98%))',
    },
    border: 'hsl(var(--border, 0 0% 89%))',
    input: 'hsl(var(--input, 0 0% 89%))',
    ring: 'hsl(var(--ring, 220 60% 40%))',
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

  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    heading: ['Poppins', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    h1: ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],
    h2: ['1.875rem', { lineHeight: '2.25rem', fontWeight: '600' }],
    h3: ['1.5rem', { lineHeight: '2rem', fontWeight: '500' }],
  },

  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },

  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    card: '0 2px 8px rgba(0, 0, 0, 0.06)',
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem',
    '4xl': '4rem',
  },

  screens: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  zIndex: {
    auto: 'auto',
    base: '0',
    dropdown: '10',
    sticky: '20',
    fixed: '30',
    modal: '40',
    popover: '50',
    toast: '60',
    tooltip: '70',
  },

  opacity: {
    0: '0',
    5: '0.05',
    10: '0.1',
    20: '0.2',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    80: '0.8',
    90: '0.9',
    100: '1',
  },
};
