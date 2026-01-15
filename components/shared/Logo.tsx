"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  /** dark: สำหรับพื้นหลังเข้ม | light: สำหรับพื้นหลังขาว */
  variant?: "light" | "dark";
}

export default function Logo({
  className,
  iconOnly = false,
  variant = "light",
}: LogoProps) {
  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3 group select-none transition-opacity hover:opacity-100",
        className,
      )}
    >
      {/* --- ICON PART: สื่อถึงความถูกต้องและระบบงาน --- */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* ทรงสี่เหลี่ยมตัดมุมที่สื่อถึง Stamp/Seal ของความถูกต้อง */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-[10px] shadow-sm transition-colors duration-300",
            isDark ? "bg-white" : "bg-[#0A192F]",
          )}
          whileHover={{ scale: 1.05 }}
        />

        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* สัญลักษณ์รูปเอกสารที่ตรวจสอบแล้ว */}
          <motion.path
            d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
            stroke={isDark ? "#0A192F" : "#3B82F6"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d="M9 15L11 17L15 11"
            stroke={isDark ? "#0A192F" : "#FFFFFF"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          />
        </svg>

        {/* วงแหวนบางๆ เพื่อเพิ่มมิติความพรีเมียม */}
        <div
          className={cn(
            "absolute inset-[-3px] border border-blue-500/20 rounded-[14px] transition-all duration-700 group-hover:rotate-90",
            isDark ? "border-white/20" : "border-[#0A192F]/10",
          )}
        />
      </div>

      {/* --- TEXT PART: เน้นชื่อแบรนด์ให้เด่นและจดจำง่าย --- */}
      {!iconOnly && (
        <div className="flex flex-col -space-y-1.5">
          <span
            className={cn(
              "font-black text-2xl tracking-tighter uppercase italic leading-none",
              isDark ? "text-white" : "text-[#0A192F]",
            )}
          >
            JP-VISOUL
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "text-[9px] font-black tracking-[0.2em] uppercase italic",
                isDark ? "text-blue-300" : "text-blue-600",
              )}
            >
              Document
            </span>
            <span
              className={cn(
                "text-[9px] font-bold uppercase tracking-[0.1em] opacity-50",
                isDark ? "text-slate-400" : "text-slate-500",
              )}
            >
              Solutions
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}
