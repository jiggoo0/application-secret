/** @format */
"use client"

import React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { inter } from "@/lib/fonts"

interface MainLayoutProps {
  children: React.ReactNode
}

/**
 * 🌐 MainLayout
 * ใช้เป็น Layout หลักสำหรับหน้าเว็บ
 * ครอบคลุม Header / Footer และ responsive container
 */
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div
      className={`${inter.variable} flex min-h-screen flex-col bg-white font-sans text-slate-900`}
    >
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
