"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MessageCircle,
  ShieldCheck,
  Zap,
  FileCheck2,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
import { CONTACT } from "@/constants/contact";

/**
 * HeroSection – JP-VISOUL (Production Ready)
 * - ใช้ CONTACT จาก constants/contact.ts
 * - ปลอดภัยต่อ config ที่อาจไม่ครบ
 * - รองรับ animation + responsive เต็มรูปแบบ
 */
export default function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#FAFAF9] pb-16 pt-24">
      {/* ================= Background ================= */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[5%] top-[10%] h-[45%] w-[45%] rounded-full bg-blue-100/30 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[5%] h-[40%] w-[40%] rounded-full bg-slate-200/40 blur-[110px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          {/* ================= Badge ================= */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white px-5 py-2.5 shadow-xl shadow-blue-900/5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600" />
            </span>
            <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-blue-600">
              พร้อมเป็นที่ปรึกษาและดูแลเอกสารเคียงข้างคุณ
            </span>
          </motion.div>

          {/* ================= Headline ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <H1 className="mb-8 border-none p-0 text-5xl font-black leading-[1.1] tracking-tight text-[#0A192F] md:text-7xl">
              จัดการเอกสารให้ <br />
              <span className="italic text-blue-600">
                ง่าย ชัดเจน และถูกต้อง
              </span>
            </H1>
          </motion.div>

          {/* ================= Sub headline ================= */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mb-14 max-w-3xl text-lg font-medium leading-relaxed text-slate-600 md:text-xl"
          >
            ไม่ต้องกังวลเรื่องเอกสารซับซ้อน เราพร้อมช่วยวางโครงสร้างให้ครบถ้วน
            <br className="hidden md:block" />
            <span className="font-bold text-[#0A192F]">
              คุยง่าย เริ่มงานได้ไวใน 2 ชม.
            </span>{" "}
            ดูแลอย่างใส่ใจในทุกขั้นตอนก่อนยื่นจริง
          </motion.p>

          {/* ================= Actions ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-24 flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <Button
              asChild
              className="group h-16 rounded-2xl bg-[#06C755] px-10 text-xl font-bold text-white shadow-xl shadow-emerald-900/20 transition-all hover:bg-[#05b34c] active:scale-95"
            >
              <a
                href={CONTACT.line.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4"
              >
                <MessageCircle size={24} fill="currentColor" />
                ทักแชทปรึกษาเราทาง LINE
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-16 rounded-2xl border-slate-200 px-10 text-lg font-bold text-[#0A192F] transition-all hover:bg-slate-50"
            >
              <Link href="/services" className="flex items-center gap-3">
                ดูบริการทั้งหมดของเรา
                <ArrowRight size={20} className="text-blue-600" />
              </Link>
            </Button>
          </motion.div>

          {/* ================= Values ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 gap-12 border-t border-slate-100 pt-16 md:grid-cols-3 md:gap-8"
          >
            <Pillar
              icon={<Zap size={24} className="text-blue-600" />}
              title="ดูแลรวดเร็วทันใจ"
              desc="วิเคราะห์ข้อมูลและเริ่มร่างงานทันที ไม่ปล่อยให้คุณต้องรอนาน"
            />
            <Pillar
              icon={<FileCheck2 size={24} className="text-blue-600" />}
              title="ตรวจสอบละเอียด 2 ชั้น"
              desc="เช็คความถูกต้องโดยผู้เชี่ยวชาญถึง 2 คน เพื่อความมั่นใจสูงสุด"
            />
            <Pillar
              icon={<ShieldCheck size={24} className="text-blue-600" />}
              title="รักษาความลับสูงสุด"
              desc="ข้อมูลส่วนตัวของคุณจะถูกดูแลเป็นอย่างดี ปลอดภัย 100%"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================= Sub Component ================= */

function Pillar({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group flex flex-col items-center gap-4 text-center md:items-start md:text-left">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm transition-transform duration-500 group-hover:scale-110">
        {icon}
      </div>

      <div className="space-y-1">
        <h4 className="text-lg font-bold text-[#0A192F]">{title}</h4>
        <p className="max-w-[280px] text-sm font-medium leading-relaxed text-slate-500">
          {desc}
        </p>
      </div>
    </div>
  );
}
