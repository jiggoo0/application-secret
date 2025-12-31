/** @format */

'use client'

import * as React from 'react'
import { ThemeProvider } from 'next-themes'

/**
 * 🛰️ SYSTEM_PROVIDERS_PROTOCOL (UPDATED – DARK LUXURY)
 * ----------------------------------------------------------------
 * - บังคับ Dark Theme เป็นค่าเริ่มต้น
 * - ใช้ Design Token จาก globals.css โดยตรง
 * - ป้องกัน FOUC โดยไม่สร้าง white scaffold
 */
export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * 🛡️ HYDRATION_SAFETY
   * ใช้ token จริงจาก :root
   */
  if (!mounted) {
    return (
      <div
        className="min-h-screen antialiased"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
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
      <div
        className="relative flex min-h-screen flex-col antialiased selection:bg-[#FCDE09]/25 selection:text-slate-950"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
        {children}
      </div>
    </ThemeProvider>
  )
}
