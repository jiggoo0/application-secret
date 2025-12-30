import type { Config } from 'tailwindcss'
import { theme as brandTheme } from './config/theme'
import animate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/**
 * 🛰️ TAILWIND_CONFIG_ARCHITECT_EDITION (V4.2.1-STRICT)
 * ✅ FIXED: Slate Property Error, Path Alignment, Type-Safe Tokens
 */

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        xl: '2.5rem',
      },
      screens: {
        '2xl': '1400px', // ใช้ค่า Static เพื่อลดความซับซ้อนของการเรียกใช้ theme object
      },
    },
    extend: {
      colors: {
        // 🏗️ PRIMARY_AXIS: บังคับใช้ค่าจาก Brand Theme โดยตรง
        brand: {
          DEFAULT: brandTheme.colors.brand.accent, // #C8A45D (Gold)
          foreground: brandTheme.colors.brand.primary, // #020617 (Black)
          dark: brandTheme.colors.brand.primary,
        },
        // 🛡️ SYSTEM_TOKENS: แมปเข้ากับ CSS Variables ของ Shadcn/UI
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: brandTheme.colors.brand.accent,
        background: brandTheme.colors.base.bg,
        foreground: brandTheme.colors.base.text,

        // 🌑 DARK_MATTER: นิยาม Slate ใหม่เองเพื่อป้องกัน TS2339
        slate: {
          950: '#020617',
        },
      },

      // 📏 GEOMETRY: บังคับขอบคม 100% (No Border Radius)
      borderRadius: {
        none: '0',
        DEFAULT: '0',
        sharp: '0',
        sm: '0',
        md: '0',
        lg: '0',
        full: '9999px', // ยกเว้นสำหรับ Avatar หรือ Badge วงกลม
      },

      // 🌑 DEPTH_PROTOCOL: Hard Shadow (ห้ามฟุ้ง)
      boxShadow: {
        'sharp-sm': `2px 2px 0px 0px ${brandTheme.colors.brand.primary}`,
        'sharp-md': `4px 4px 0px 0px ${brandTheme.colors.brand.primary}`,
        'sharp-brand': `4px 4px 0px 0px ${brandTheme.colors.brand.accent}`,
        'sharp-lg': `8px 8px 0px 0px ${brandTheme.colors.brand.primary}`,
      },

      // ⚡ MECHANICAL_TIMING
      transitionTimingFunction: {
        industrial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      backgroundImage: {
        'industrial-grid': `linear-gradient(to right, ${brandTheme.colors.brand.primary}1A 1px, transparent 1px), linear-gradient(to bottom, ${brandTheme.colors.brand.primary}1A 1px, transparent 1px)`,
      },
    },
  },
  plugins: [
    animate,
    typography,
    // CUSTOM_UTILITY: สร้างคลาสสำหรับขอบคมแบบ Manual
    function ({ addUtilities }: any) {
      addUtilities({
        '.border-sharp': {
          'border-style': 'solid',
          'border-width': '1px',
          'border-color': brandTheme.colors.brand.primary,
        },
      })
    },
  ],
}

export default config
