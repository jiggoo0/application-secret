"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { MAIN_NAV } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/site-config";

/**
 * Navbar (Production Safe)
 * - ไม่มี unused imports
 * - Guard ทุก dynamic route จาก SITE_CONFIG
 * - รองรับ App Router + Client Component
 * - ปลอดภัยต่อ runtime
 */
export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* =====================
   * Safe Routes
   * ===================== */
  const servicesHref = SITE_CONFIG.routes?.services ?? "/services";

  /* =====================
   * Scroll Detection
   * ===================== */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* =====================
   * Close mobile menu on route change
   * ===================== */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-slate-200/50 bg-white/90 py-3 backdrop-blur-xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]"
          : "bg-white py-6",
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Logo />

        {/* =====================
         * Desktop Navigation
         * ===================== */}
        <div className="hidden items-center gap-2 lg:flex">
          {MAIN_NAV.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-bold transition-all",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:text-[#0A192F]",
                )}
              >
                {item.title}
              </Link>
            );
          })}

          <div className="ml-4 border-l border-slate-200 pl-4">
            <Button asChild className="h-12 rounded-2xl px-8 font-black">
              <Link href={servicesHref} className="flex items-center gap-2">
                เริ่มใช้บริการ
                <ArrowUpRight size={18} />
              </Link>
            </Button>
          </div>
        </div>

        {/* =====================
         * Mobile Toggle
         * ===================== */}
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((v) => !v)}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-3 lg:hidden"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* =====================
       * Mobile Menu
       * ===================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-100 bg-white shadow-xl lg:hidden"
          >
            <div className="space-y-3 p-4">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-5 font-bold text-slate-700"
                >
                  <span>{item.title}</span>
                  <ChevronRight size={18} />
                </Link>
              ))}

              <Button
                asChild
                className="h-16 w-full rounded-2xl text-lg font-black"
              >
                <Link href={servicesHref} className="flex items-center gap-2">
                  ขอรับบริการทันที
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
