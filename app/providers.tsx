/** @format */

'use client'

import * as React from 'react'
import { ThemeProvider } from 'next-themes'

/**
 * 🛰️ SYSTEM_PROVIDERS_PROTOCOL (UPDATED – DARK LUXURY)
 * ----------------------------------------------------------------
 * - บังคับ Dark Theme เป็นค่าเริ่มต้น
 * - ตัด white scaffold ทิ้ง
 * - ใช้ token จาก globals.css โดยตรง
 * - ป้องกัน FOUC แบบไม่ทำลาย theme
 */
export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * 🛡️ HYDRATION_SAFETY
   * ใช้พื้นหลังตาม token จริง (ไม่ใช้ white)
   */
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <div className="opacity-0">{children}</div>
      </div>
    )
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {/* 🚀 GLOBAL_LAYOUT_WRAPPER */}
      <div className="relative flex min-h-screen flex-col bg-[var(--bg)] text-[var(--text)] antialiased selection:bg-[rgba(200,164,93,0.25)] selection:text-white">
        {children}
      </div>
    </ThemeProvider>
  )
}
