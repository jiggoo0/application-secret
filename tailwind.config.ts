/** @format */
import type { Config } from "tailwindcss"

const config: Config = {
  // 🎯 ปรับปรุง Content Path ให้ครอบคลุมทุกจุดที่ใช้ Class
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // 📏 กำหนด Container ให้แม่นยำเพื่อความสมมาตรแบบวิศวกรรม
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "4rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // --- 🎨 THE EXECUTIVE INDUSTRIAL PALETTE ---
        brand: {
          DEFAULT: "#FCDE09", // Pure Brand Yellow
          dark: "#D4BC08",
          light: "#FEF9C3",
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          400: "#94A3B8",
          500: "#64748B",
          900: "#0F172A",
          950: "#020617", // Authority Black
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },

      // --- 🔡 TYPOGRAPHY PROTOCOL (ต้องตรงกับ fonts.ts เป๊ะๆ) ---
      fontFamily: {
        // ผสาน Inter และ IBM Plex Sans Thai เป็น Font Sans หลัก
        sans: ["var(--font-inter)", "var(--font-thai)", "sans-serif"],
        thai: ["var(--font-thai)", "sans-serif"],
        // ใช้ JetBrains Mono ที่คุณตั้งค่าไว้ใน fonts.ts
        mono: ["var(--font-mono)", "monospace"],
      },

      // --- 📐 SHARP INDUSTRIAL ELEMENTS ---
      boxShadow: {
        sharp: "8px 8px 0px 0px #020617",
        "sharp-brand": "8px 8px 0px 0px #FCDE09",
        "sharp-sm": "4px 4px 0px 0px #020617",
        "sharp-white": "8px 8px 0px 0px #FFFFFF",
        "sharp-hover": "12px 12px 0px 0px #020617",
      },

      // --- 🧩 BACKGROUND ARCHITECTURE ---
      backgroundImage: {
        "blueprint-grid": "url('/grid-pattern.svg')", // อย่าลืมใส่ไฟล์นี้ในโฟลเดอร์ public
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      // --- 🚄 MOTION_SYSTEM (Fixing Ambiguity) ---
      transitionTimingFunction: {
        "p-machine": "cubic-bezier(0.85, 0, 0.15, 1)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scanline: "scanline 8s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
