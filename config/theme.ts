/** @format */

export const DESIGN_TOKENS = {
  /* ------------------------------------------------------------------
   * COLOR SYSTEM — JP-VISUALDOCS (TRUST / DOCUMENT / ENTERPRISE)
   * ------------------------------------------------------------------ */
  colors: {
    // แกนหลักของระบบ
    primary: '#0F172A', // Slate-900
    secondary: '#1E293B', // Slate-800
    background: '#FAFAF9', // Stone-50

    // ตัวอักษร
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',

    // เส้น / พื้นผิว
    white: '#FFFFFF',
    border: '#E5E7EB',

    // สถานะ (ใช้เชิงความหมายเท่านั้น)
    status: {
      draft: '#64748B',
      processing: '#2563EB',
      verifying: '#D97706',
      completed: '#059669',
      error: '#EF4444',
    },

    // Accent (ใช้เฉพาะ Verified / Completed)
    accent: '#059669',
  },

  /* ------------------------------------------------------------------
   * TYPOGRAPHY — CALM / PROFESSIONAL / READABLE
   * ------------------------------------------------------------------ */
  typography: {
    // หัวข้อหลัก
    h1: 'font-sans text-4xl md:text-5xl font-semibold tracking-tight text-primary',

    // หัวข้อรอง
    h2: 'font-sans text-2xl md:text-3xl font-semibold tracking-tight text-primary',

    // ป้ายอ้างอิง / รหัส / Log
    label: 'font-mono text-xs uppercase tracking-widest text-muted',

    // เนื้อหาหลัก
    body: 'font-thai text-base leading-relaxed text-textSecondary',
  },

  /* ------------------------------------------------------------------
   * DEPTH & SURFACE — SOFT / TRUSTED
   * ------------------------------------------------------------------ */
  shadows: {
    soft: 'shadow-[0_10px_30px_rgba(0,0,0,0.08)]',
    subtle: 'shadow-[0_4px_12px_rgba(0,0,0,0.06)]',
  },

  /* ------------------------------------------------------------------
   * INTERACTION — QUIET / RESPONSIVE
   * ------------------------------------------------------------------ */
  interaction: {
    transition: 'transition-all duration-200 ease-out',
    hover: 'hover:opacity-90',
  },

  /* ------------------------------------------------------------------
   * GLASS (LIMITED USE)
   * ------------------------------------------------------------------ */
  glass: {
    base: 'bg-white/10 backdrop-blur-[12px] border border-white/20 rounded-xl',
  },
} as const

/* ------------------------------------------------------------------
 * TYPE EXPORT
 * ------------------------------------------------------------------ */
export type DesignTokens = typeof DESIGN_TOKENS
