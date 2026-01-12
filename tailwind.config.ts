/** @format */
import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        md: '2rem',
        xl: '3rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      /* ===============================
       * JP-VISUALDOCS COLOR SYSTEM
       * =============================== */
      colors: {
        primary: '#0F172A', // Slate-900
        secondary: '#1E293B', // Slate-800
        accent: '#059669', // Emerald-600 (Verified / Completed only)
        background: '#FAFAF9', // Stone-50

        border: '#E5E7EB',
        muted: '#64748B',

        status: {
          draft: '#64748B',
          processing: '#2563EB',
          verifying: '#D97706',
          completed: '#059669',
        },
      },

      /* ===============================
       * TYPOGRAPHY
       * =============================== */
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-thai)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },

      /* ===============================
       * GLASS & DEPTH SYSTEM
       * =============================== */
      backdropBlur: {
        glass: '12px',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
        subtle: '0 4px 12px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        xl: '14px',
      },

      /* ===============================
       * MOTION SYSTEM (CALM / PROFESSIONAL)
       * =============================== */
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.4s ease-out',
        fadeIn: 'fadeIn 0.25s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindAnimate],
}

export default config
