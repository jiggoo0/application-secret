/** @format */
import type { Config } from "tailwindcss"
import { themeConfig } from "./config/theme"

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
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: themeConfig.colors.primary.DEFAULT,
          dark: themeConfig.colors.primary.dark,
          light: themeConfig.colors.primary.light || "#3b82f6",
        },
        industrial: {
          black: "#0f172a",
          gray: "#64748b",
          soft: "#f8fafc",
          border: "#cbd5e1",
        },
        "brand-dark": themeConfig.colors.primary.dark,
        "industrial-black": "#0f172a",
        "industrial-border": "#cbd5e1",
      },
      lineHeight: {
        "thai-tight": "1.15",
        "thai-base": "1.65",
        "thai-loose": "1.85",
      },
      letterSpacing: {
        tightest: "-0.05em",
        widest: "0.3em",
        ultra: "0.45em",
      },
      backgroundImage: {
        "blueprint-grid": `
          linear-gradient(to right, var(--tw-content-border, #cbd5e1) 1px, transparent 1px),
          linear-gradient(to bottom, var(--tw-content-border, #cbd5e1) 1px, transparent 1px)
        `,
        "radial-light":
          "radial-gradient(circle at center, transparent 0%, rgba(248, 250, 252, 0.9) 100%)",
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
      },
      borderRadius: {
        none: "0",
        xs: "1px",
        sm: "2px",
        DEFAULT: "0",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

export default config
