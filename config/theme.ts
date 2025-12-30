/** @format */

/**
 * 🛰️ MASTER_THEME_CONFIGURATION (V4.5.0 - LUXURY_INDUSTRIAL)
 * ✅ MISSION: SINGLE SOURCE OF TRUTH - บังคับใช้มาตรฐานทองคำและขอบคม
 */

export const theme = {
  colors: {
    brand: {
      primary: '#020617', // Deepest Space (Black)
      secondary: '#0F172A', // Navy Steel
      accent: '#C8A45D', // Champagne Gold (Authority)
      accentHover: '#D9B87A', // Light Gold
    },
    base: {
      bg: '#05080A', // Ultra Dark Background
      surface: '#0F172A',
      card: '#131C2E',
      border: '#1E293B', // Industrial Bolt Gray
      text: '#F8FAFC', // Clean White
      muted: '#64748B', // Steel Muted
    },
    status: {
      success: '#10B981', // Emerald
      warning: '#F59E0B', // Amber
      error: '#EF4444', // Rose
    },
  },

  font: {
    family: {
      body: 'var(--font-inter), var(--font-ibm-plex-sans-thai), sans-serif',
      mono: 'var(--font-jetbrains-mono), monospace',
    },
    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '900', // เน้นความหนักแน่นแบบ Industrial
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0em',
      wide: '0.05em', // สำหรับ Header ที่ต้องการความหรูหรา
    },
  },

  // 📐 SHARP_ENFORCEMENT: ยกเลิกความโค้งมนทั้งหมด
  radius: {
    none: '0px',
    sharp: '0px',
    sm: '0px', // Override เพื่อป้องกันความผิดพลาด
    md: '0px',
    lg: '0px',
    full: '9999px', // อนุญาตเฉพาะรูปโปรไฟล์หรือป้ายสถานะเท่านั้น
  },

  shadow: {
    // Hard Shadows เท่านั้น (ไม่มี Blur เยอะ)
    soft: '2px 2px 0px 0px rgba(0,0,0,1)',
    card: '6px 6px 0px 0px #020617',
    gold: '0 0 0 1px #C8A45D', // Precision Border
    none: 'none',
  },

  layout: {
    container: '1200px',
    section: '8rem',
    header: '4.5rem',
  },
} as const

export type Theme = typeof theme
