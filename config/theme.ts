/** @format */

export const DESIGN_TOKENS = {
  colors: {
    // 🎨 Branding & Core
    brand: "#FCDE09", // เหลืองเอกลักษณ์
    brandDark: "#EAB308",

    // 🏛️ Authority Colors
    slate950: "#020617", // หัวข้อและปุ่มหลัก (Deep Trust)
    slate500: "#64748B", // คำอธิบายและรายละเอียด (Professional Gray)
    slate50: "#F8FAFC", // พื้นหลังส่วนรอง (Subtle Depth)

    // ✅ Functional
    success: "#10B981",
    error: "#EF4444",
    white: "#FFFFFF",
  },

  typography: {
    // หัวข้อหลัก: เน้นความใหญ่และ Tracking ที่ชิดกันเพื่อความ Sharp (ลดความเอียงลง)
    h1: "text-6xl md:text-8xl lg:text-[120px] font-black uppercase tracking-tighter leading-[0.9]",
    h2: "text-5xl md:text-7xl font-black uppercase tracking-tight leading-none",

    // ข้อมูลทางเทคนิค: ใช้ Font Mono เพื่อสื่อถึงระบบและรหัสเอกสาร
    label:
      "font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-500",

    // เนื้อหา: เน้นอ่านง่าย มั่นคง
    body: "text-base font-bold leading-relaxed text-slate-500",
  },

  shadows: {
    // เงาแข็งที่เป็นเอกลักษณ์ของ Industrial Sharp
    sharp: "shadow-[8px_8px_0px_0px_#020617]",
    sharpBrand: "shadow-[8px_8px_0px_0px_#FCDE09]",
  },

  transitions: "duration-300 ease-in-out",
} as const
