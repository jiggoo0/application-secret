/** @type {import('tailwindcss').Config['theme']} */
module.exports = {
  colors: {
    background: 'hsl(0 0% 100%)',
    surface: 'hsl(0 0% 100%)',
    card: 'hsl(0 0% 100%)',
    popover: 'hsl(0 0% 100%)',
    foreground: 'hsl(0 0% 7%)',
    'card-foreground': 'hsl(0 0% 7%)',
    'popover-foreground': 'hsl(0 0% 7%)',

    primary: {
      DEFAULT: 'hsl(0 0% 9%)',
      hover: 'hsl(220 60% 40%)',
      foreground: 'hsl(0 0% 98%)',
    },
    secondary: {
      DEFAULT: 'hsl(0 0% 96.1%)',
      foreground: 'hsl(0 0% 12%)',
    },
    accent: {
      DEFAULT: 'hsl(0 0% 96.1%)',
      foreground: 'hsl(0 0% 12%)',
    },
    muted: {
      DEFAULT: 'hsl(0 0% 96.1%)',
      foreground: 'hsl(0 0% 30%)',
    },
    destructive: {
      DEFAULT: 'hsl(0 84.2% 60.2%)',
      foreground: 'hsl(0 0% 98%)',
    },
    border: 'hsl(0 0% 89.8%)',
    input: 'hsl(0 0% 89.8%)',
    ring: 'hsl(0 0% 7%)',
    neutral: 'hsl(210 16% 90%)',
    success: 'hsl(160 70% 40%)',
    warning: 'hsl(43 90% 60%)',
    error: 'hsl(0 70% 45%)',

    chart: {
      1: 'hsl(12 76% 61%)',
      2: 'hsl(173 58% 39%)',
      3: 'hsl(197 37% 24%)',
      4: 'hsl(43 74% 66%)',
      5: 'hsl(27 87% 67%)',
    },
  },

  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    heading: ['Poppins', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },

  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    h1: '2.25rem',
    h2: '1.875rem',
    h3: '1.5rem',
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
    sm: 'calc(var(--radius) - 4px)',
    md: 'calc(var(--radius) - 2px)',
    lg: 'var(--radius)',
    full: '9999px',
  },

  boxShadow: {
    inset: 'var(--shadow-inset)',
    hover: 'var(--shadow-hover)',
    card: 'var(--shadow-card)',
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem',
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

  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
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
