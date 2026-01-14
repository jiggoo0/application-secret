"use client";

import { motion } from "framer-motion";
import { H2, P } from "@/components/ui/typography";
import { CheckCircle2, ShieldIcon, Zap, Users } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { icon: Users, label: "ลูกค้าที่ไว้วางใจ", value: "5,000+" },
    { icon: ShieldIcon, label: "อัตราการผ่านวีซ่า", value: "99%" },
    { icon: Zap, label: "ประสบการณ์", value: "10+ ปี" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 rounded-lg bg-primary/5 text-primary text-sm font-bold mb-6">
              ทำไมต้องเลือกเรา?
            </div>
            <H2 className="text-4xl md:text-5xl font-black mb-6 border-none p-0">
              JP-VISOUL.DOCS <br />
              <span className="text-slate-400">พันธมิตรที่วางใจได้</span>
            </H2>
            <P className="text-lg text-slate-600 mb-8 leading-relaxed">
              เราไม่ใช่แค่ผู้ให้บริการจัดการเอกสาร
              แต่เราคือที่ปรึกษาที่ร่วมเดินทางไปกับคุณ
              ไม่ว่าจะเป็นการขยายธุรกิจไปต่างประเทศ
              หรือการเริ่มต้นชีวิตใหม่ในดินแดนที่คุณฝัน
            </P>

            <div className="space-y-4 mb-10">
              {[
                "ทีมงานผู้เชี่ยวชาญที่อัปเดตกฎหมายอยู่เสมอ",
                "โปร่งใสในทุกขั้นตอน ตรวจสอบได้",
                "บริการรวดเร็ว ทันใจ ในราคาที่คุ้มค่า",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                    <CheckCircle2 className="text-secondary" size={16} />
                  </div>
                  <span className="font-medium text-slate-700">{text}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-10">
              {stats.map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="text-2xl md:text-3xl font-black text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Decorative Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden bg-slate-100 aspect-square md:aspect-video lg:aspect-square">
              {/* Replace with actual About Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-slate-400 font-medium">
                  ภาพประกอบองค์กร
                </span>
              </div>
            </div>
            {/* Decorative Background Shape */}
            <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-secondary/20 rounded-[3rem] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
