/** @format */

"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"

/**
 * 🛰️ SYSTEM_PROVIDERS_PROTOCOL
 * ----------------------------------------------------------------
 * จัดการ Context และสภาวะแวดล้อมของแอปพลิเคชัน
 * ✅ ENFORCED: Named Export Strategy
 * ✅ ENFORCED: Industrial Sharp Selection Color
 */
export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false)

  // 🛡️ HYDRATION_PROTOCOL: ยืนยันสถานะ Client-side
  React.useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * 🏗️ PRE-RENDER_SCAFFOLD
   * ป้องกัน Flash of Unstyled Content (FOUC) โดยรักษาโครงสร้างสีขาวสะอาดตา
   */
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white" aria-hidden="true">
        <div className="opacity-0">{children}</div>
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
      {/* 🚀 GLOBAL_LAYOUT_WRAPPER: บังคับใช้สีแบรนด์และพื้นหลังที่เสถียร */}
      <div className="relative flex min-h-screen flex-col selection:bg-[#FCDE09] selection:text-slate-950">
        {children}
      </div>
    </ThemeProvider>
  )
}
