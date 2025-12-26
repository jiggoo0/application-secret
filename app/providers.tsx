"use client"

import React from "react"
import { ThemeProvider } from "next-themes" // <-- ตรวจสอบว่ามี next-themes ติดตั้ง
import { Toaster } from "sonner"

type ProvidersProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
