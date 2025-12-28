/** @format */
import React from "react"
import { type CaseStudy } from "@/config/showcase"
import { cn } from "@/lib/utils"

// 🛡️ FIX: ใช้ Omit เพื่อป้องกันการชนกันของ Type status เดิมกับค่าใหม่
interface ExtendedCaseStudy extends Omit<CaseStudy, "status"> {
  status: "SUCCESS" | "COMPLETED" | "IN_PROGRESS" | string
}

interface CaseCardProps {
  item: ExtendedCaseStudy
  className?: string
}

export function CaseCard({ item, className }: CaseCardProps) {
  return (
    <div
      className={cn(
        "group relative border border-slate-200 bg-white p-6",
        className
      )}
    >
      <span className="font-mono text-[10px] text-slate-400">
        ID: {item.id}
      </span>
      <h3 className="mt-2 text-xl font-bold uppercase italic text-slate-950 group-hover:text-brand">
        {item.title}
      </h3>
      <div className="mt-4 flex items-center justify-between">
        <span className="bg-slate-950 px-2 py-1 text-[9px] font-black text-white">
          {item.status}
        </span>
      </div>
    </div>
  )
}
