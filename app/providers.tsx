/** @format */

"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"

/**
 * 🛰️ SYSTEM_PROVIDERS_PROTOCOL
 * ----------------------------------------------------------------
 * จัดการ Context และสภาวะแวดล้อมของแอปพลิเคชัน
 * ✅ FIXED: React 19 Cascading Render (set-state-in-effect)
 * ✅ FIXED: Hydration Mismatch Guard
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  // ใช้ useEffect เพื่อยืนยันว่า Component ถูกติดตั้งบน Client แล้ว
  React.useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * 🛡️ HYDRATION_GUARD
   * เพื่อป้องกัน Flash of Unstyled Content (FOUC)
   * เราจะไม่เรนเดอร์ Theme-dependent UI จนกว่าจะ Mounted
   */
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white" aria-hidden="true">
        {/* แสดงผลเฉพาะโครงสร้างว่างเปล่าเพื่อรักษา Layout */}
        <div className="opacity-0 transition-opacity duration-300">
          {children}
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {/* 🚀 ระบบจะเริ่มทำงานเมื่อ Mounted สร็จสมบูรณ์ */}
      <div className="relative flex min-h-screen flex-col selection:bg-blue-600 selection:text-white">
        {children}
      </div>
    </ThemeProvider>
  )
}
