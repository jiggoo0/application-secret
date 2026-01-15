"use client";

import React, { useState } from "react";
import { SERVICES } from "@/constants/services-data";
import ServiceCard from "@/components/shared/ServiceCard";
import { H1, Lead } from "@/components/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  Globe,
  Scale,
  Languages,
  Search,
  ShieldCheck,
  Cpu,
  HelpCircle,
  Sparkles,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const LINE_OFFICIAL_URL = "https://line.me/ti/p/@462fqtfc";

  const categories = [
    { id: "all", label: "ทั้งหมด", icon: Briefcase },
    { id: "FINANCIAL", label: "การเงิน", icon: Scale },
    { id: "IMMIGRATION", label: "วีซ่า", icon: Globe },
    { id: "DOCUMENTATION", label: "งานเอกสาร", icon: Languages },
    { id: "SYSTEMS", label: "ระบบดิจิทัล", icon: ShieldCheck },
    { id: "INFRASTRUCTURE", label: "การผลิต/บัตร", icon: Cpu },
  ];

  /**
   * ✅ Filter service by category + search keyword
   * ใช้ field ที่มีอยู่จริงใน Service model
   */
  const getFilteredServices = (categoryId: string) => {
    return SERVICES.filter((service) => {
      const matchesCategory =
        categoryId === "all" || service.category === categoryId;

      const keyword = searchQuery.toLowerCase();

      const matchesSearch =
        service.title.toLowerCase().includes(keyword) ||
        service.id.toLowerCase().includes(keyword) ||
        service.description.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HERO ================= */}
      <section className="bg-[#0A192F] text-white pt-28 pb-24 md:pt-40 md:pb-48 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-blue-500/10 text-blue-400 mb-8 px-5 py-1.5 rounded-full border border-blue-500/20 font-black tracking-[0.3em] text-[10px] uppercase italic">
              Trusted Protocol System
            </Badge>

            <H1 className="text-white mb-8 text-5xl md:text-8xl font-black tracking-tighter italic uppercase leading-[0.9]">
              Elite <span className="text-blue-500">Solutions</span>
            </H1>

            <Lead className="text-slate-400 max-w-2xl mx-auto text-lg">
              ปลดล็อกทุกข้อจำกัดด้วยมาตรฐานงานเอกสารระดับสูง แม่นยำ รวดเร็ว
              และเป็นความลับ ภายใต้นโยบาย{" "}
              <span className="text-white font-black italic underline decoration-blue-500 decoration-2 underline-offset-4">
                รับเงิน = เริ่มงานทันที
              </span>
            </Lead>
          </motion.div>
        </div>
      </section>

      {/* ================= FILTER & LIST ================= */}
      <section className="py-12 md:py-24 bg-slate-50/80 -mt-16 rounded-t-[4rem] relative z-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all">
            <div className="flex flex-col xl:flex-row justify-between gap-8 mb-20">
              <TabsList className="bg-white border p-2 rounded-[2rem] shadow-xl">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className={cn(
                      "rounded-xl px-6 py-3 flex items-center gap-2 font-black text-[11px] uppercase italic",
                      "data-[state=active]:bg-[#0A192F] data-[state=active]:text-white",
                    )}
                  >
                    <cat.icon size={14} />
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="relative w-full xl:w-[420px]">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="ค้นหารหัสบริการ หรือชื่อโซลูชัน..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 h-14 rounded-full font-bold"
                />
              </div>
            </div>

            {categories.map((cat) => {
              const services = getFilteredServices(cat.id);

              return (
                <TabsContent key={cat.id} value={cat.id}>
                  {services.length ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                      {services.map((service, index) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <ServiceCard service={service} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-32">
                      <Search
                        size={48}
                        className="mx-auto text-slate-300 mb-6"
                      />
                      <p className="font-black text-xl italic">
                        ไม่พบข้อมูลที่ตรงกับการค้นหา
                      </p>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="container mx-auto px-4 pb-28">
        <div className="bg-[#0A192F] rounded-[4rem] p-16 text-center text-white">
          <Badge className="bg-blue-600 mb-8 font-black italic uppercase">
            <Sparkles size={14} className="mr-2" />
            Customized Protocol
          </Badge>

          <h2 className="text-4xl md:text-6xl font-black italic mb-8">
            Cannot Find <span className="text-blue-500">Your Case?</span>
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-[#06C755] px-12 py-6 rounded-full font-black flex items-center gap-3"
            >
              <MessageCircle size={24} fill="currentColor" />
              คุยงานด่วนใน LINE
            </a>

            <button
              onClick={() => window.open(LINE_OFFICIAL_URL, "_blank")}
              className="border border-white/20 px-12 py-6 rounded-full flex items-center gap-3"
            >
              <HelpCircle size={20} />
              สอบถามข้อมูล
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
