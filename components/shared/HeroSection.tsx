"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { H1, Lead } from "@/components/ui/typography";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-8"
        >
          <Star className="text-secondary fill-secondary" size={16} />
          <span className="text-xs font-bold tracking-widest uppercase text-slate-600">
            Trusted Document Service in Thailand
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <H1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 border-none p-0">
            จัดการเรื่องเอกสาร <br />
            ให้เป็นเรื่อง <span className="text-secondary italic">ง่าย</span>
          </H1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Lead className="max-w-2xl mx-auto mb-10 text-slate-500">
            บริการให้คำปรึกษาด้านวีซ่า จดทะเบียนธุรกิจ และแปลเอกสารรับรองครบวงจร
            รวดเร็ว แม่นยำ และเป็นมืออาชีพ โดยทีมงานผู้เชี่ยวชาญ
          </Lead>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="h-16 px-8 rounded-2xl text-lg font-bold w-full sm:w-auto shadow-xl shadow-primary/20"
          >
            <Link href="/services">
              ดูบริการทั้งหมด <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-16 px-8 rounded-2xl text-lg font-bold w-full sm:w-auto"
          >
            <Link href="/contact">ปรึกษาเราฟรี</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-8 text-slate-400"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-secondary" />
            <span className="text-sm font-medium">ปลอดภัย 100%</span>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-2">
            <Star size={20} className="text-secondary" />
            <span className="text-sm font-medium">
              ประเมินฟรีไม่มีค่าใช้จ่าย
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
