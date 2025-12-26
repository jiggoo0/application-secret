/** @format */
import type { Config } from "tailwindcss"
import { themeConfig } from "./config/theme" // ตรวจสอบว่า path ถูกต้องตามที่จัดโครงสร้างไว้

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
      },
      screens: {
        "2xl": themeConfig.layout.containerMaxWidth,
      },
    },
    extend: {
      colors: {
        // Mapping จาก themeConfig โดยตรง
        brand: {
          DEFAULT: themeConfig.colors.primary.DEFAULT,
          dark: themeConfig.colors.primary.dark,
          light: themeConfig.colors.primary.light,
          accent: themeConfig.colors.primary.accent,
        },
        industrial: {
          black: themeConfig.colors.industrial.black,
          dark: themeConfig.colors.industrial.dark,
          gray: themeConfig.colors.industrial.gray,
          border: themeConfig.colors.industrial.border,
          surface: themeConfig.colors.industrial.surface,
          soft: themeConfig.colors.industrial.soft,
        },
        status: {
          success: themeConfig.colors.status.success,
          warning: themeConfig.colors.status.warning,
          danger: themeConfig.colors.status.danger,
        },
      },
      // Typography Mapping
      lineHeight: {
        "thai-tight": themeConfig.typography.lineHeight.tight,
        "thai-base": themeConfig.typography.lineHeight.snug,
        "thai-relaxed": themeConfig.typography.lineHeight.relaxed,
      },
      letterSpacing: {
        tightest: themeConfig.typography.letterSpacing.tighter,
        widest: themeConfig.typography.letterSpacing.widest,
        ultra: themeConfig.typography.letterSpacing.ultra,
      },
      fontSize: {
        display: themeConfig.typography.fontSize.display,
        micro: themeConfig.typography.fontSize.micro,
      },
      // Blueprint & System Effects
      boxShadow: {
        sharp: themeConfig.effects.shadow.sharp,
        blueprint: themeConfig.effects.shadow.blueprint,
        glow: themeConfig.effects.shadow.glow,
      },
      backgroundImage: {
        "blueprint-grid": `
          linear-gradient(to right, ${themeConfig.colors.industrial.border}1A 1px, transparent 1px),
          linear-gradient(to bottom, ${themeConfig.colors.industrial.border}1A 1px, transparent 1px)
        `,
        "terminal-gradient":
          "linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.8) 100%)",
      },
      backgroundSize: {
        "grid-sm": "20px 20px",
        "grid-md": "40px 40px",
        "grid-lg": "80px 80px",
      },
      animation: {
        "border-draw":
          "border-width 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 4s ease-in-out infinite",
        "scan-line": "scan 3s linear infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "shimmer-run": "shimmer 2s infinite linear",
      },
      keyframes: {
        "border-width": {
          "0%": { width: "0", opacity: "0" },
          "100%": { width: "100%", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(15px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      borderRadius: {
        none: themeConfig.layout.radius,
        xs: "1px",
        sm: "2px",
        DEFAULT: themeConfig.layout.radius,
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

export default config
