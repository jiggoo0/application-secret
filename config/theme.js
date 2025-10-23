/** @type {import('tailwindcss').Config['theme']} */
module.exports = {
  colors: {
    background: 'hsl(var(--background))',
    surface: 'hsl(var(--surface))',
    card: 'hsl(var(--card))',
    popover: 'hsl(var(--popover))',
    foreground: 'hsl(var(--foreground))',
    'card-foreground': 'hsl(var(--card-foreground))',
    'popover-foreground': 'hsl(var(--popover-foreground))',
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      hover: 'hsl(var(--primary-hover))',
      foreground: 'hsl(var(--primary-foreground))',
    },
    secondary: {
      DEFAULT: 'hsl(var(--secondary))',
      foreground: 'hsl(var(--secondary-foreground))',
    },
    accent: {
      DEFAULT: 'hsl(var(--accent))',
      foreground: 'hsl(var(--accent-foreground))',
    },
    muted: {
      DEFAULT: 'hsl(var(--muted))',
      foreground: 'hsl(var(--muted-foreground))',
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
