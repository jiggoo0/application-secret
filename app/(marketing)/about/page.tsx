import { Metadata } from "next";
import Image from "next/image";
import { Target, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";

import { SITE_CONFIG } from "@/constants/site-config";
import { H1, H2, P } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: `เกี่ยวกับเรา | ${SITE_CONFIG.name}`,
  description:
    "ทำความรู้จักกับ JP-VISOUL ทีมงานมืออาชีพผู้สร้างสะพานเชื่อมโอกาสผ่านงานเอกสาร",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-50 pt-24 pb-20 md:pt-32 md:pb-32">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 rounded-md border border-blue-600/10 bg-blue-600/5 px-4 py-1.5 text-[9px] font-black italic uppercase tracking-[0.3em] text-blue-600">
            Institutional Purpose
          </Badge>

          <H1 className="mb-8 border-none p-0 text-5xl font-black italic uppercase leading-[0.9] tracking-tighter text-[#0A192F] md:text-8xl">
            Architecting <br />
            <span className="text-blue-600">Opportunities</span>
          </H1>

          <P className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-500 md:text-xl">
            JP-VISOUL ก่อตั้งขึ้นเพื่อทลายกำแพงความยุ่งยากทางเอกสารและการเงิน
            เราเชื่อมั่นในระบบจัดการที่แม่นยำ
            เพื่อสร้างรากฐานที่มั่นคงให้ทุกก้าวเดินของคุณ
          </P>
        </div>
      </section>

      {/* 2. Vision & Mission */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Image */}
            <div className="relative group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-slate-100 shadow-2xl md:aspect-square">
                <Image
                  src="/images/about-vision.jpg"
                  alt="วิสัยทัศน์ JP-VISOUL"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 to-transparent opacity-60" />
              </div>

              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-xl border-2 border-blue-600/5" />

              <div className="absolute top-10 -right-4 z-20 max-w-[220px] rounded-lg border border-white/10 bg-[#0A192F] p-6 italic text-white shadow-2xl">
                <ShieldCheck className="mb-3 text-blue-500" size={28} />
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em]">
                  Status
                </p>
                <p className="text-sm font-bold leading-tight">
                  High-Precision Document Protocol Verified
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-16">
              {/* Vision */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                    <Target size={20} />
                  </div>
                  <span className="text-[11px] font-black italic uppercase tracking-[0.3em] text-blue-600">
                    The Vision
                  </span>
                </div>

                <H2 className="border-none p-0 text-3xl font-black italic uppercase leading-tight tracking-tighter text-[#0A192F] md:text-5xl">
                  ผู้นำด้านการจัดการ <br />
                  <span className="text-blue-600">เอกสารเชิงกลยุทธ์</span>
                </H2>

                <P className="text-lg font-medium leading-relaxed text-slate-500">
                  มุ่งสู่การเป็นสถาบันที่ปรึกษาอันดับหนึ่ง
                  ที่ลูกค้าไว้วางใจในความแม่นยำ รวดเร็ว
                  และการรักษาความลับในระดับสากล
                </P>
              </div>

              {/* Mission */}
              <div className="grid grid-cols-1 gap-8 border-t border-slate-100 pt-8 sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <HeartHandshake className="text-blue-600" size={18} />
                    <span className="text-[11px] font-black italic uppercase tracking-widest text-[#0A192F]">
                      Honesty First
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-slate-500">
                    ยึดถือความซื่อสัตย์และโปร่งใสในทุกขั้นตอนของภารกิจ
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-blue-600" size={18} />
                    <span className="text-[11px] font-black italic uppercase tracking-widest text-[#0A192F]">
                      Success Driven
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-slate-500">
                    ความสำเร็จของลูกค้าคือตัวชี้วัดความสามารถของเรา
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Final CTA */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/5 bg-[#0A192F] p-12 text-white shadow-2xl md:p-20">
          <div className="relative z-10">
            <Badge className="mb-8 rounded-full border border-blue-500/20 bg-blue-500/20 px-6 py-2 text-[10px] font-black italic uppercase tracking-[0.3em] text-blue-400">
              Ready to Execute
            </Badge>

            <H2 className="mb-8 border-none p-0 text-4xl font-black italic uppercase leading-[0.95] tracking-tighter text-white md:text-6xl">
              ให้เราจัดการ <br />
              <span className="text-blue-500">แทนคุณวันนี้</span>
            </H2>

            <P className="mx-auto mb-12 max-w-lg text-lg font-medium text-slate-400">
              เริ่มต้นวางแผนจัดการเอกสารด้วย Protocol ที่ดีที่สุดกับทีม
              JP-VISOUL
            </P>

            <button className="mx-auto flex items-center gap-3 rounded-xl bg-blue-600 px-12 py-6 text-lg font-black italic uppercase tracking-widest text-white shadow-xl shadow-blue-900/40 transition-all hover:bg-blue-500 active:scale-95">
              Get Started
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="absolute top-0 right-0 -z-0 h-80 w-80 bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 -z-0 h-64 w-64 bg-blue-600/5 blur-[100px]" />
        </div>
      </section>
    </div>
  );
}
