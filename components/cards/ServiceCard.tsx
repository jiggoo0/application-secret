"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Briefcase,
  Languages,
  Building2,
  Stamp,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { ServiceItem } from "@/constants/services-data";
import { cn } from "@/lib/utils";

/**
 * 1. Type-safe mapping สำหรับ Icons
 * ช่วยให้เราสามารถส่งชื่อ icon เป็น string มาจาก Database หรือ Constants ได้
 */
const ICON_MAP: Record<string, React.ElementType> = {
  globe: Globe,
  briefcase: Briefcase,
  languages: Languages,
  building: Building2,
  stamp: Stamp,
  shield: ShieldCheck,
};

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // ✅ ป้องกัน Hydration Mismatch โดยการรอให้ Client-side Mounted ก่อน
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // เลือก Icon ตามที่ระบุใน service.iconName (ถ้าไม่มีให้ใช้ AlertCircle)
  const Icon = ICON_MAP[service.iconName.toLowerCase()] || AlertCircle;

  return (
    <div
      className={cn(
        "group relative bg-white rounded-[2rem] border border-slate-100 p-8",
        "transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5",
        "hover:-translate-y-2 flex flex-col h-full overflow-hidden",
      )}
    >
      {/* เอฟเฟกต์วงกลมพื้นหลังตอน Hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-[2] duration-700" />

      <div className="relative z-10 flex flex-col h-full">
        {/* ส่วนหัว: Icon และ Price Tag */}
        <div className="mb-8 relative">
          <div
            className={cn(
              "w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary",
              "transition-colors group-hover:bg-secondary group-hover:text-white duration-500",
            )}
          >
            <Icon size={32} strokeWidth={1.5} />
          </div>
          {service.priceTag && (
            <span className="absolute top-0 right-0 bg-accent/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full border border-accent/20">
              {service.priceTag}
            </span>
          )}
        </div>

        {/* ส่วนเนื้อหา: Title และ Description */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors">
            {service.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 thai-snug">
            {service.description}
          </p>

          {/* Highlights Section: จัดการปัญหา Implicit Any โดยระบุ Type ให้ชัดเจน */}
          {service.features && (
            <div className="space-y-2 mb-8">
              {service.features
                .slice(0, 2)
                .map((feature: string, idx: number) => (
                  <div
                    key={`${service.id}-feat-${idx}`}
                    className="flex items-center gap-2 text-xs font-medium text-slate-600"
                  >
                    <CheckCircle2 size={14} className="text-secondary" />
                    <span
                      className={cn(mounted ? "line-clamp-1" : "opacity-0")}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* ส่วนท้าย: ลิงก์รายละเอียด และปุ่มคำขอ */}
        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <Link
            href={`/services/${service.slug}`}
            className="text-sm font-bold text-primary flex items-center gap-2 group/link hover:text-secondary transition-colors"
          >
            ดูรายละเอียด
            <ArrowRight
              size={16}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>

          <Link
            href={`/services/request?type=${service.slug}`}
            className={cn(
              "w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary",
              "hover:bg-primary hover:text-white transition-all shadow-sm active:scale-90",
            )}
            title="ยื่นคำขอออนไลน์"
          >
            <CheckCircle2 size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
