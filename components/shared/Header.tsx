"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { H1, Lead } from "@/components/ui/typography";

interface HeaderProps {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function Header({
  title,
  description,
  centered = true,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-slate-200/60 bg-slate-50/50 pt-20 pb-10 md:pt-24 md:pb-14",
        className,
      )}
    >
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-secondary/10 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div
        className={cn(
          "container relative z-10 mx-auto px-6",
          centered ? "text-center" : "text-left",
        )}
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <H1 className="mb-4 border-none p-0 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {title}
          </H1>
        </motion.div>

        {/* Description */}
        {description && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Lead
              className={cn(
                "max-w-2xl thai-snug text-base font-medium text-slate-600 md:text-lg",
                centered ? "mx-auto" : "ml-0",
              )}
            >
              {description}
            </Lead>
          </motion.div>
        )}

        {/* Decorative Line */}
        {centered && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 60, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-8 h-1.5 rounded-full bg-gradient-to-r from-secondary to-secondary/50 shadow-sm shadow-secondary/20"
          />
        )}
      </div>
    </header>
  );
}
