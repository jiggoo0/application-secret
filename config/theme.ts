/** @format */

/**
 * 🚀 JP VISUAL DOCS: SYSTEM THEME CONFIGURATION
 * Centralized source of truth for design tokens.
 * สัญญาการออกแบบสำหรับโปรโตคอล JP Visual Docs v2.8
 */

export const themeConfig = {
  colors: {
    primary: {
      DEFAULT: "#2563eb", // Blue 600
      dark: "#1e40af", // Blue 800
      light: "#dbeafe", // Blue 100
      accent: "#3b82f6", // Blue 500
    },

    industrial: {
      black: "#0f172a", // Slate 900
      dark: "#1e293b", // Slate 800
      gray: "#64748b", // Slate 500
      border: "#cbd5e1", // Slate 300 (Grid Lines)
      surface: "#f1f5f9", // Slate 100
      soft: "#f8fafc", // Slate 50
    },

    status: {
      success: "#16a34a", // Green 600
      warning: "#ca8a04", // Yellow 600
      danger: "#dc2626", // Red 600
      info: "#0891b2", // Cyan 600
    },
  },

  typography: {
    lineHeight: {
      none: "1",
      tight: "1.15", // Headline ไทยตัวหนา
      snug: "1.45", // Sub-headline
      relaxed: "1.75", // Body Text
    },

    letterSpacing: {
      tighter: "-0.05em",
      normal: "0",
      wide: "0.1em",
      widest: "0.3em", // Buttons
      ultra: "0.45em", // Labels
    },

    fontSize: {
      micro: "0.625rem", // 10px - Tags/Captions
      xs: "0.75rem", // 12px - Label Mono
      sm: "0.875rem", // 14px - Body
      base: "1rem", // 16px - Main content
      lg: "1.125rem", // 18px - Small titles
      xl: "1.25rem", // 20px - Section headings
      display: "clamp(2.5rem, 8vw, 6.5rem)", // Responsive Headline
    },
  },

  layout: {
    containerMaxWidth: "1400px",
    headerHeight: "80px",
    headerHeightMobile: "64px",
    gridGap: "1px",
    radius: "0px", // Industrial sharp corners (เหลี่ยมคมชัด)
  },

  effects: {
    shadow: {
      sharp: "6px 6px 0px 0px rgba(15, 23, 42, 1)",
      blueprint: "0 0 40px rgba(37, 99, 235, 0.1)",
      glow: "0 0 15px rgba(37, 99, 235, 0.5)", // สำหรับไฟสถานะ
    },
    transition: {
      fast: "150ms cubic-bezier(0.16, 1, 0.3, 1)",
      default: "400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slow: "700ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
} as const

/** 🏷️ Helper Type สำหรับดึงค่า Config ไปใช้ใน Component */
export type ThemeConfig = typeof themeConfig

/** 🛠️ Tailwind Extension Helper (ตัวอย่างการนำไป mapping) */
export const themeUtils = {
  getPrimaryShadow: () => themeConfig.effects.shadow.sharp,
  getGridStyle: () => ({
    display: "grid",
    gap: themeConfig.layout.gridGap,
    backgroundColor: themeConfig.colors.industrial.border,
  }),
}
