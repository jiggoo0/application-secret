/** @format */

/**
 * 🛰️ SYSTEM_TOKENS: Industrial_Sharp_V4.0
 * * กลยุทธ์การออกแบบ:
 * 1. HIGH_CONTRAST: เน้นความชัดเจนของข้อมูลเชิงเทคนิค (Data-First)
 * 2. LEGIBILITY: ยกระดับสีเทาเพื่อให้อ่านออกบนพื้นหลัง #020617
 * 3. BRAND_AUTHORITY: ใช้สีเหลือง #FCDE09 เฉพาะจุดเพื่อดึงสายตา
 */

export const DESIGN_TOKENS = {
  colors: {
    // 🎨 Branding: จิตวิญญาณของ "เจ้าป่า"
    brand: '#FCDE09',
    brandDark: '#D4BC08',

    // 🏛️ Slate System: ปรับจูนเพื่อความชัดเจนสูงสุด
    background: '#020617', // Slate-950
    textPrimary: '#F1F5F9', // Slate-200 (สำหรับเนื้อหาหลัก)
    textSecondary: '#CBD5E1', // Slate-300 (สำหรับ Metadata/Labels)
    textMuted: '#64748B', // Slate-500 (สำหรับส่วนที่ไม่สำคัญ)

    white: '#FFFFFF',
    success: '#10B981',
    error: '#EF4444',
  },

  typography: {
    // 📢 HEADLINE: กระแทกสายตาด้วยอักษรตัวหนาและ italic
    h1: 'text-6xl md:text-8xl lg:text-[110px] font-black uppercase italic tracking-tighter leading-[0.85] text-white',
    h2: 'text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white',

    // 📟 DATA_LABEL: สำหรับพวก ID, Logs, หรือรหัสเอกสาร
    label: 'font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-300',

    // 📝 CONTENT: อ่านง่าย สว่างชัดเจน
    body: 'font-thai text-base md:text-lg font-bold leading-relaxed text-slate-200',
  },

  shadows: {
    // 📐 INDUSTRIAL_SHARP: เงาต้องแข็ง คม และไม่ฟุ้ง
    sharp: 'shadow-[6px_6px_0px_0px_#020617]',
    sharpBrand: 'shadow-[6px_6px_0px_0px_#FCDE09]',
    sharpWhite: 'shadow-[6px_6px_0px_0px_#FFFFFF]',
  },

  interaction: {
    transition: 'transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)',
    hover: 'hover:-translate-x-1 hover:-translate-y-1',
  },
} as const

export type DesignTokens = typeof DESIGN_TOKENS
