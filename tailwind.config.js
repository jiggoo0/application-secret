/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

// ตรวจสอบสภาพแวดล้อมการทำงาน (Termux) เพื่อแก้ปัญหา Permission Denied ในการ Watch ไฟล์
const isTermux = !!process.env.TERMUX;

const config = {
  // รองรับ Next.js 15 App Router ตามโครงสร้างไฟล์ใน project-structure.md
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      // 🏗️ 1. DESIGN TOKENS (Industrial Neobrutalism)
      fontFamily: {
        // Headlines: Font Prompt, Black (900), Italic
        heading: ['var(--font-prompt)', 'Inter', 'sans-serif'],
        // Body: Font Inter, Medium (500)
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        // Documents: Font TH Sarabun New
        mono: ['var(--font-sarabun)', 'monospace'],
      },

      // No rounded corners (rounded-none) ตาม Spec
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        full: '9999px',
      },

      // Hard shadows ONLY (No blur)
      boxShadow: {
        neo: '4px 4px 0px 0px #0f172a',
        'neo-lg': '8px 8px 0px 0px #0f172a',
        'neo-sm': '2px 2px 0px 0px #0f172a',
      },

      borderWidth: {
        DEFAULT: '2px',
        4: '4px',
      },

      colors: {
        border: '#0f172a', // Slate-900
        input: '#0f172a',
        ring: '#2563eb', // Electric Blue
        background: '#ffffff',
        foreground: '#0f172a',

        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a',
        },
        accent: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },
        success: '#16a34a',
        warning: '#eab308',
        destructive: '#dc2626',
      },

      aspectRatio: {
        a4: '1 / 1.414',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('daisyui'),
    // 🛠️ Custom Plugin สำหรับสร้าง Utility Neobrutalism
    plugin(function ({ addComponents }) {
      addComponents({
        '.neo-button': {
          '@apply border-2 border-slate-900 bg-white px-4 py-2 font-bold shadow-neo transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-neo-lg active:translate-x-[0px] active:translate-y-[0px] active:shadow-none':
            {},
        },
        '.neo-card': {
          '@apply border-2 border-slate-900 bg-white p-6 shadow-neo': {},
        },
        '.neo-input': {
          '@apply border-2 border-slate-900 rounded-none focus:ring-2 focus:ring-blue-600 focus:outline-none p-2':
            {},
        },
      });
    }),
  ],
  daisyui: {
    themes: [
      {
        jpvisoul: {
          primary: '#2563eb',
          secondary: '#f1f5f9',
          accent: '#0f172a',
          neutral: '#0f172a',
          'base-100': '#ffffff',
          '--rounded-box': '0',
          '--rounded-btn': '0',
          '--rounded-badge': '0',
        },
      },
    ],
    darkTheme: 'jpvisoul',
  },
};

// 🛠️ การแก้ไขปัญหา Permission Denied (EACCES) ใน Termux
if (isTermux) {
  config.watchOptions = {
    poll: 1000, // ใช้การตรวจสอบแบบช่วงเวลาแทนการใช้ Filesystem Watcher ของระบบ
    aggregateTimeout: 300,
    // บังคับให้ Watch เฉพาะไฟล์ในโปรเจกต์ ป้องกันการสแกนไปที่ Root (/data)
    ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**', '/data/**', '/data/data/**', '/'],
  };
}

module.exports = config;
