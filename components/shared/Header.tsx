"use client";

import { cn } from "@/lib/utils";
import { H1, Lead } from "@/components/ui/typography";
import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function Header({
  title,
  description,
  centered = true,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        // ปรับพื้นหลังเป็น Slate-50 อ่อนๆ เพื่อให้ตัดกับ Content สีขาวด้านล่าง
        "relative overflow-hidden bg-slate-50/50 pt-20 pb-10 md:pt-24 md:pb-14 border-b border-slate-200/60",
        className,
      )}
    >
      {/* Background Decor - ปรับความเข้มของสีให้ดูหรูหราขึ้น */}
      <div className="absolute inset-0 pointer-events-none">
        {/* สี Secondary (ทอง/ส้ม) บลัชที่มุมขวา */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
        {/* สี Primary (น้ำเงิน/กรมท่า) บลัชที่มุมซ้าย */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div
        className={cn(
          "container relative z-10 mx-auto px-6", // เพิ่ม Padding ซ้ายขวา
          centered ? "text-center" : "text-left",
        )}
      >
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* ใช้สี Slate-900 เพื่อความอ่านง่ายและดูแพง */}
          <H1 className="mb-4 border-none p-0 text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            {title}
          </H1>
        </motion.div>

        {/* Description Section */}
        {description && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Lead
              className={cn(
                "max-w-2xl text-slate-600 thai-snug text-base md:text-lg font-medium",
                centered ? "mx-auto" : "ml-0",
              )}
            >
              {description}
            </Lead>
          </motion.div>
        )}

        {/* Decorative Line - ปรับเป็นสี Secondary เพื่อเป็น Accent Color */}
        {centered && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 60, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 bg-gradient-to-r from-secondary to-secondary/50 mx-auto mt-8 rounded-full shadow-sm shadow-secondary/20"
          />
        )}
      </div>
    </header>
  );
}
