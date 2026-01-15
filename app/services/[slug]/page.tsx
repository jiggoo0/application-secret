"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Zap,
  MessageCircle,
  Clock,
  Lock,
  CheckCircle,
  FileText,
} from "lucide-react";

import { SERVICES } from "@/constants/services-data";
import { H1, Lead, H2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import ProtocolStepper from "@/components/shared/ProtocolStepper";

/**
 * =========================================
 * Service Detail Page
 * Route: /services/[slug]
 * =========================================
 */

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  /**
   * ✅ Next.js App Router (v15)
   * ใช้ React.use() เพื่อ unwrap params
   */
  const { slug } = use(params);

  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  /**
   * ✅ LINE Official Account (Single Action Channel)
   */
  const LINE_OFFICIAL_URL = "https://line.me/ti/p/@462fqtfc";
  const actionHref = `${LINE_OFFICIAL_URL}?text=${encodeURIComponent(
    `สนใจบริการ: ${service.name}`,
  )}`;

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20 selection:bg-blue-600 selection:text-white">
      {/* =========================================
       * 1. Hero Section
       * ========================================= */}
      <section className="relative overflow-hidden bg-[#0A192F] pb-44 pt-32 text-white">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-transparent to-transparent" />

        <div className="container relative z-10 mx-auto px-4">
          <Link
            href="/services"
            className="group mb-12 inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 transition-all hover:text-white"
          >
            <ArrowLeft
              size={14}
              className="mr-2 transition-transform group-hover:-translate-x-2"
            />
            Back to All Services
          </Link>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-blue-500/30 bg-blue-600/20 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 backdrop-blur-md">
                {service.id}
              </span>
              <div className="h-px w-12 bg-blue-500/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest italic text-slate-400">
                Verified Specialist
              </span>
            </div>

            <div className="max-w-4xl">
              <p className="mb-6 text-sm font-black italic uppercase tracking-[0.15em] text-blue-500 md:text-base">
                — {service.tagline}
              </p>

              <H1 className="mb-8 border-none p-0 text-5xl font-black italic uppercase leading-[0.95] tracking-tighter text-white md:text-7xl">
                {service.name.split("(")[0]}
                {service.name.includes("(") && (
                  <>
                    <br />
                    <span className="text-3xl text-blue-500 opacity-80 md:text-5xl">
                      ({service.name.split("(")[1]}
                    </span>
                  </>
                )}
              </H1>

              <Lead className="max-w-2xl text-lg font-medium leading-relaxed text-slate-400 md:text-xl">
                {service.description}
              </Lead>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
       * 2. Content Section
       * ========================================= */}
      <section className="container relative z-20 mx-auto -mt-20 px-4">
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-12">
          {/* Main Content */}
          <div className="space-y-8 xl:col-span-8">
            <div className="rounded-[3rem] border border-slate-200/60 bg-white p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] md:p-16">
              <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <H2 className="flex items-center gap-4 text-3xl font-black italic uppercase tracking-tighter text-[#0A192F]">
                  <span className="h-10 w-3 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                  Professional Protocol
                </H2>

                <div className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    System Live
                  </span>
                </div>
              </div>

              {/* Protocol Steps */}
              <div className="mb-16">
                <ProtocolStepper steps={service.protocol} />
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-12 md:grid-cols-2">
                <FeatureCard
                  icon={<Zap size={28} />}
                  title="Express Execution"
                  description="ทันทีที่ยืนยัน Protocol ระบบจะดำเนินการภายใน 24 ชม."
                  color="blue"
                />
                <FeatureCard
                  icon={<Lock size={28} />}
                  title="Data Cleansing"
                  description="ทำลายชุดข้อมูลทันทีหลังจบภารกิจ เพื่อความปลอดภัยสูงสุด"
                  color="emerald"
                />
              </div>
            </div>

            {/* Note */}
            <div className="flex flex-col items-center gap-6 rounded-[2.5rem] border border-[#0A192F]/10 bg-[#0A192F]/5 p-8 italic md:flex-row md:p-10">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <FileText size={20} />
              </span>
              <p className="text-sm font-bold leading-relaxed text-[#0A192F]/70">
                “กรณีมีเงื่อนไขเฉพาะนอกเหนือจากมาตรฐาน กรุณาแจ้งฝ่ายเทคนิคผ่าน
                LINE ทันที”
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="xl:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#0A192F] p-10 text-white shadow-2xl">
                <div className="relative z-10">
                  <div className="mb-10 flex items-center gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
                      <Clock size={24} />
                    </span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                        Timeline
                      </p>
                      <p className="text-lg font-black italic tracking-tight">
                        {service.timeline}
                      </p>
                    </div>
                  </div>

                  <div className="mb-12">
                    <p className="mb-3 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
                      Service Value
                    </p>
                    <div className="text-5xl font-black italic tracking-tighter">
                      {service.feeEstimate}
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="mb-8 h-24 w-full rounded-[2rem] bg-[#06C755] text-2xl font-black italic uppercase tracking-tighter shadow-emerald-900/30 transition-all hover:bg-[#05b34c] active:scale-95"
                  >
                    <a
                      href={actionHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-4"
                    >
                      <MessageCircle size={32} fill="currentColor" />
                      Consult Now
                    </a>
                  </Button>

                  <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/5 py-4">
                    <CheckCircle size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Priority Fast-Track Enabled
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-500 opacity-30 blur-[120px]" />
              </div>

              {/* Tags */}
              {service.tags && service.tags.length > 0 && (
                <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8">
                  <p className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Identifiers
                    <ShieldCheck size={14} className="text-blue-600" />
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-2 text-[10px] font-black italic uppercase text-slate-500 transition-colors hover:bg-blue-50"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/**
 * =========================================
 * Sub Components
 * =========================================
 */

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "blue" | "emerald";
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const colorMap = {
    blue: "bg-blue-600/10 text-blue-600 hover:shadow-blue-900/5",
    emerald: "bg-emerald-600/10 text-emerald-600 hover:shadow-emerald-900/5",
  };

  return (
    <div className="group rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 transition-all hover:bg-white hover:shadow-xl">
      <div
        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${colorMap[color]}`}
      >
        {icon}
      </div>
      <h4 className="text-lg font-black italic uppercase tracking-tight text-[#0A192F]">
        {title}
      </h4>
      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
        {description}
      </p>
    </div>
  );
}
