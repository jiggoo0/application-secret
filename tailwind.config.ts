/** @format */
import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '4rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FCDE09',
          dark: '#D4BC08',
          light: '#FFF9C4',
        },
        // 🏗️ INDUSTRIAL_SLATE: เข้ม ดุดัน สไตล์โรงงาน
        slate: {
          '50': '#FFFFFF',
          '100': '#F8FAFC',
          '200': '#F1F5F9',
          '300': '#E2E8F0',
          '400': '#CBD5E1',
          '500': '#94A3B8',
          '900': '#0F172A',
          '950': '#020617',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-thai)', 'sans-serif'],
        thai: ['var(--font-thai)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      // 📐 MASTER_TRANSITION: แก้ปัญหา Ambiguous Class Warning
      transitionTimingFunction: {
        'sharp-ease': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      boxShadow: {
        // 📐 SHARP_SHADOW_SYSTEM: เงาเหลี่ยมแบบอุตสาหกรรม
        sharp: '8px 8px 0px 0px #020617',
        'sharp-brand': '8px 8px 0px 0px #FCDE09',
        'sharp-sm': '4px 4px 0px 0px #020617',
        'sharp-white': '8px 8px 0px 0px #FFFFFF',
      },
      backgroundImage: {
        'blueprint-grid': "url('/grid-pattern.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        scanline: 'scanline 8s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
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
    },
  },
  // ✅ FIXED: ใช้ ESM Import แทน require เพื่อปิดช่องโหว่ ESLint
  plugins: [tailwindAnimate],
}

export default config
