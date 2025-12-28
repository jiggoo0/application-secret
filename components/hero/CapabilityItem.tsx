/** @format */
import React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CapabilityItemProps {
  icon: LucideIcon
  title: string
  label: string
  className?: string
}

export const CapabilityItem = ({
  icon: Icon,
  title,
  label,
  className,
}: CapabilityItemProps) => {
  return (
    <div
      className={cn(
        "group flex items-center gap-5 border border-slate-100 bg-white p-5 transition-all duration-300",
        "hover:-translate-y-1 hover:border-brand hover:shadow-[15px_15px_0px_-5px_rgba(252,222,9,0.1)]",
        className
      )}
    >
      {/* 📦 Icon Container with Sharp Accent */}
      <div className="relative shrink-0">
        <div className="relative z-10 bg-slate-950 p-3 text-brand transition-colors group-hover:bg-brand group-hover:text-slate-950">
          <Icon size={22} strokeWidth={1.5} />
        </div>
        {/* Decorative background element behind icon */}
        <div className="absolute -bottom-1 -right-1 -z-10 h-full w-full border border-slate-200 transition-colors group-hover:border-brand/30" />
      </div>

      {/* 📝 Text Content */}
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-slate-600">
          {label}
        </span>
        <span className="font-thai text-[13px] font-bold leading-tight tracking-wide text-slate-900 group-hover:text-slate-950">
          {title}
        </span>
      </div>
    </div>
  )
}
