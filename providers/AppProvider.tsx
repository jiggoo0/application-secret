"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * AppProvider: ศูนย์กลางการจัดการ State และ Context ของแอปพลิเคชัน
 * ประกอบด้วย:
 * 1. ThemeProvider - จัดการระบบ Light/Dark Mode (Tailwind 4.0 Support)
 * 2. TooltipProvider - รองรับการแสดงผล Tooltip ทั่วทั้งแอป
 * 3. Toaster - ระบบแจ้งเตือน (Toast) ที่เรียกใช้งานผ่าน Server Actions หรือ Client
 */

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={300}>
        {/* ส่วนเนื้อหาหลักของแอป */}
        {children}

        {/* คอมโพเนนต์ลอย (Global UI) */}
        <Toaster
          position="top-center"
          expand={false}
          richColors
          closeButton
          theme="light" // หรือผูกตามระบบด้วยการใช้ theme context
        />
      </TooltipProvider>
    </NextThemesProvider>
  );
}
