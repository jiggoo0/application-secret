"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "./Icons";
import { MAIN_NAV } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300", // เพิ่ม fixed top
        scrolled
          ? "bg-white/95 backdrop-blur-md py-3 border-b border-slate-200/60 shadow-md"
          : "bg-white py-5 border-b border-transparent",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* --- Logo Section --- */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-primary/25">
            <Icons.visa size={22} />
          </div>
          <span className="font-black text-xl md:text-2xl tracking-tighter text-primary">
            JP-VISOUL<span className="text-secondary italic">.DOCS</span>
          </span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex items-center gap-1">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-[15px] font-extrabold transition-all rounded-full relative group",
                pathname === item.href
                  ? "text-primary bg-primary/5" // หน้าปัจจุบันใช้สี Primary อ่อนๆ
                  : "text-slate-600 hover:text-primary",
              )}
            >
              {item.title}
              {/* เส้นใต้เวลา Hover */}
              <span
                className={cn(
                  "absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-1/2",
                  pathname === item.href && "w-1/2",
                )}
              />
            </Link>
          ))}

          <div className="ml-4 pl-4 border-l border-slate-200">
            <Button
              asChild
              className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95 bg-primary hover:bg-primary/90 text-white"
            >
              <Link href="/services/request">เริ่มใช้บริการ</Link>
            </Button>
          </div>
        </div>

        {/* --- Mobile Toggle --- */}
        <button
          className="md:hidden p-2.5 text-primary bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <Icons.close size={24} /> : <Icons.menu size={24} />}
        </button>
      </div>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl p-4"
          >
            <div className="flex flex-col gap-2">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl font-black transition-all",
                    pathname === item.href
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-primary hover:bg-slate-50",
                  )}
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                      pathname === item.href ? "bg-white/20" : "bg-primary/5",
                    )}
                  >
                    {item.icon ? (
                      <item.icon size={20} />
                    ) : (
                      <Icons.visa size={20} />
                    )}
                  </div>
                  {item.title}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Button
                  asChild
                  className="w-full py-7 rounded-2xl text-lg font-black shadow-xl shadow-secondary/30 bg-secondary hover:bg-secondary/90 text-white"
                >
                  <Link href="/services/request">เริ่มต้นขอรับบริการ</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
