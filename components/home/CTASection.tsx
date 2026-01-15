"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT_CHANNELS } from "@/lib/utils/line-link";

/**
 * CTASection (Production-ready)
 * - Primary Call-to-Action for Home page
 * - Guard ป้องกัน runtime crash หาก config ไม่ครบ
 * - Accessible / SEO-safe / UX-focused
 */
export default function CTASection() {
  const lineUrl = CONTACT_CHANNELS?.line?.officialUrl;

  // 🛡️ Guard: ไม่มีช่องทางติดต่อ → ไม่ render section
  if (typeof lineUrl !== "string" || lineUrl.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-[#0A192F] py-28 text-white"
    >
      {/* ================= Background Decoration ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "url('/images/noise.png')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[160px]"
      />

      {/* ================= Content ================= */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-2xl space-y-10 text-center">
          <h2
            id="cta-heading"
            className="text-4xl font-black leading-tight tracking-tight md:text-5xl"
          >
            พร้อมเริ่มต้นจัดการเอกสาร <br />
            <span className="text-blue-400">อย่างถูกต้องและปลอดภัย</span>
          </h2>

          <p className="mx-auto max-w-xl text-base font-medium leading-relaxed text-slate-300">
            ปรึกษาฟรี ไม่มีค่าใช้จ่าย ทีม JP-VISOUL ดูแลให้คุณตั้งแต่ต้นจนจบ
          </p>

          <Button
            asChild
            size="lg"
            className="h-16 rounded-2xl px-12 text-base font-bold transition-all duration-300 hover:bg-white hover:text-[#0A192F]"
          >
            <Link
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ปรึกษาผ่าน LINE Official Account"
            >
              ปรึกษาผ่าน LINE
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
