"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/constants/site-config";
import { FOOTER_LINKS } from "@/constants/navigation";
import { Icons } from "@/components/shared/Icons";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

/**
 * Footer (Production Safe)
 * - ใช้ SITE_CONFIG เป็น Single Source of Truth
 * - ไม่เรียก Icons key ที่ไม่มีอยู่จริง (ป้องกัน runtime error)
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  /* =====================
   * Safe Routes (Fallback)
   * ===================== */
  const routes = SITE_CONFIG.routes ?? {
    services: "/services",
    blog: "/blog",
    faq: "/faq",
    contact: "/contact",
  };

  /* =====================
   * LINE Contact
   * ===================== */
  const lineId = SITE_CONFIG.contact?.line;
  const lineUrl = lineId
    ? `https://line.me/R/ti/p/${lineId.replace("@", "")}`
    : null;

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#0A192F] pb-12 pt-24 text-slate-400">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-24 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* =====================
           * ABOUT
           * ===================== */}
          <div className="space-y-8">
            <Logo variant="dark" className="origin-left scale-110" />

            {SITE_CONFIG.description && (
              <p className="max-w-xs text-[13px] font-medium leading-relaxed">
                {SITE_CONFIG.description}
              </p>
            )}

            <div className="flex gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue-400">
                <Icons.shield size={18} />
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue-400">
                <Icons.fileText size={18} />
              </div>
            </div>
          </div>

          {/* =====================
           * SERVICES
           * ===================== */}
          <div>
            <h3 className="mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-white italic">
              บริการหลักของเรา
            </h3>

            <ul className="space-y-4 text-[13px] font-medium">
              {(FOOTER_LINKS.services ?? []).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 transition hover:text-blue-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-blue-600 transition-all group-hover:w-3" />
                    {link.title}
                  </Link>
                </li>
              ))}

              <li className="border-t border-white/5 pt-2">
                <Link
                  href={routes.services}
                  className="text-[11px] font-bold uppercase tracking-widest text-blue-500 italic"
                >
                  ดูบริการทั้งหมด →
                </Link>
              </li>
            </ul>
          </div>

          {/* =====================
           * RESOURCES
           * ===================== */}
          <div>
            <h3 className="mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-white italic">
              ข้อมูลน่ารู้
            </h3>

            <ul className="space-y-4 text-[13px] font-medium">
              <li>
                <Link href={routes.blog} className="flex items-center gap-3">
                  <Icons.chevronRight size={12} className="text-blue-500" />
                  บทความ
                </Link>
              </li>
              <li>
                <Link href={routes.faq} className="flex items-center gap-3">
                  <Icons.chevronRight size={12} className="text-blue-500" />
                  คำถามที่พบบ่อย
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center gap-3">
                  <Icons.chevronRight size={12} className="text-blue-500" />
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href={routes.contact} className="flex items-center gap-3">
                  <Icons.chevronRight size={12} className="text-blue-500" />
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* =====================
           * CONTACT
           * ===================== */}
          <div>
            <h3 className="mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-white italic">
              ปรึกษาเจ้าหน้าที่
            </h3>

            {lineUrl && (
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#06C755]/10">
                  {/* FIX: ใช้ icon ที่มีอยู่จริงใน Icons registry */}
                  <Icons.contact size={20} className="text-[#06C755]" />
                </div>

                <div>
                  <span className="text-[10px] uppercase text-slate-500">
                    สอบถามทางไลน์
                  </span>
                  <a
                    href={lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[16px] font-black text-[#06C755]"
                  >
                    Line Official Account
                  </a>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Button asChild className="w-full bg-blue-600 text-xs font-black">
                <Link href={routes.contact}>เริ่มปรึกษาเคสของคุณ</Link>
              </Button>
              <p className="mt-3 text-center text-[10px] italic">
                * ข้อมูลของคุณจะถูกเก็บเป็นความลับ
              </p>
            </div>
          </div>
        </div>

        {/* =====================
         * BOTTOM BAR
         * ===================== */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-[9px] uppercase tracking-widest">
            © {currentYear} {SITE_CONFIG.shortName ?? "JP-VISOUL"}
          </p>

          <div className="flex gap-6 text-[10px] font-bold uppercase">
            <Link href="/privacy">Privacy</Link>
            <Link href="/support">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
