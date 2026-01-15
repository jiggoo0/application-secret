"use client";

import Link from "next/link";
import { ArrowLeft, Inbox, ShieldCheck } from "lucide-react";

// Data & UI Components
import { SERVICES } from "@/constants/services-data";
import ServiceCard from "@/components/shared/ServiceCard";
import { H1, Lead, P } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

interface CategoryArchiveProps {
  /** slug ของ category เช่น visa, legal, financial */
  category: string;
  /** custom title (optional) */
  title?: string;
}

export default function CategoryArchiveTemplate({
  category,
  title,
}: CategoryArchiveProps) {
  const normalizedCategory = category.toLowerCase();

  /** กรองบริการตาม category (case-insensitive) */
  const filteredServices = SERVICES.filter(
    (service) => service.category?.toLowerCase() === normalizedCategory,
  );

  /** Mapping ชื่อหมวดหมู่ (ใช้ lowercase ให้ตรง slug) */
  const categoryNames: Record<string, string> = {
    financial: "การเงินและสินเชื่อ",
    immigration: "วีซ่าและต่างประเทศ",
    documentation: "งานเอกสารและรับรอง",
    systems: "ระบบดิจิทัลและเทคนิค",
    infrastructure: "การผลิตและบัตร",
  };

  const displayName = title || categoryNames[normalizedCategory] || category;

  const [firstWord, ...restWords] = displayName.split(" ");

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* ================= HEADER ================= */}
      <header className="relative overflow-hidden bg-[#0A192F] pt-32 pb-20 text-white md:pt-40 md:pb-32">
        <div className="container mx-auto relative z-10 px-4">
          <Link
            href="/services"
            className="group mb-10 inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 transition-all hover:text-white"
          >
            <ArrowLeft
              size={14}
              className="mr-2 transition-transform group-hover:-translate-x-2"
            />
            All Protocols
          </Link>

          <div className="max-w-4xl">
            <Badge className="mb-6 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-[10px] font-black uppercase italic tracking-widest text-blue-400">
              Category Archive
            </Badge>

            <H1 className="mb-6 border-none p-0 text-5xl font-black italic uppercase tracking-tighter leading-[0.9] text-white md:text-7xl">
              {firstWord}
              {restWords.length > 0 && (
                <>
                  <br />
                  <span className="text-blue-500">{restWords.join(" ")}</span>
                </>
              )}
            </H1>

            <Lead className="max-w-2xl text-lg font-medium text-slate-400 md:text-xl">
              ศูนย์รวมโซลูชันด้าน {displayName} ของ JP-VISOUL
              ปรับปรุงระบบการจัดการและมาตรฐานใหม่สำหรับปี 2026
            </Lead>
          </div>
        </div>

        {/* Background Decor */}
        <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/3 translate-x-1/3 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </header>

      {/* ================= CONTENT ================= */}
      <main className="container mx-auto relative z-20 -mt-12 px-4 py-16 md:py-24">
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[4rem] border-2 border-dashed border-slate-200 bg-white py-40 text-center shadow-sm">
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-slate-200">
              <Inbox size={48} strokeWidth={1} />
            </div>

            <H1 className="mb-3 text-3xl font-black italic uppercase tracking-tighter text-[#0A192F]">
              No Protocols <span className="text-blue-500">Found</span>
            </H1>

            <P className="mb-8 text-sm font-bold uppercase tracking-widest text-slate-400">
              ขออภัย ยังไม่มีข้อมูลบริการในหมวดหมู่ &nbsp;“{displayName}”
            </P>

            <Link
              href="/contact"
              className="rounded-[2rem] bg-[#0A192F] px-10 py-5 text-lg font-black italic uppercase tracking-tighter text-white shadow-xl shadow-blue-900/20 transition-all hover:scale-105"
            >
              Consult an Expert
            </Link>
          </div>
        )}
      </main>

      {/* ================= FOOTER NOTE ================= */}
      <section className="container mx-auto px-4 pb-24">
        <div className="flex flex-col items-center justify-between gap-6 rounded-[2.5rem] border border-slate-200 bg-white p-8 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-black italic uppercase tracking-tight text-[#0A192F]">
                Verified Solutions
              </p>
              <p className="text-sm font-medium text-slate-500">
                ทุกบริการผ่านการตรวจสอบความถูกต้องตามมาตรฐาน 2026
              </p>
            </div>
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
            JP-VISOUL PROTOCOL SYSTEM v4.0
          </p>
        </div>
      </section>
    </div>
  );
}
