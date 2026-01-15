// components/shared/ProtocolStepper.tsx
"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ProtocolStep
 * - โครงสร้างเดียวกับ services-data.ts
 * - ใช้เป็น shared contract ระหว่าง data / UI
 */
export interface ProtocolStep {
  title: string;
  description?: string;
}

interface ProtocolStepperProps {
  /**
   * รองรับทั้ง:
   * - string[] (simple steps)
   * - ProtocolStep[] (detailed steps)
   */
  steps: Array<string | ProtocolStep>;
  /**
   * step ปัจจุบัน (0-based)
   * ค่า default = 0
   */
  currentStep?: number;
  className?: string;
}

/**
 * ProtocolStepper (Production-ready)
 * - Guard ทุกกรณีเพื่อป้องกัน runtime error
 * - ใช้ได้กับ Service / Process / Timeline
 * - รองรับ simple & detailed protocol
 */
export default function ProtocolStepper({
  steps,
  currentStep = 0,
  className,
}: ProtocolStepperProps) {
  if (!Array.isArray(steps) || steps.length === 0) return null;

  return (
    <div className={cn("relative w-full", className)}>
      {/* Vertical line */}
      <div className="absolute left-[20px] top-4 bottom-4 w-[2px] bg-slate-200" />

      <div className="space-y-10">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          const title = typeof step === "string" ? step : step.title;

          const description =
            typeof step === "string" ? undefined : step.description;

          return (
            <div
              key={`protocol-step-${index}`}
              className="relative flex items-start gap-8"
            >
              {/* Indicator */}
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white font-black transition-all",
                  isCompleted
                    ? "border-[#0A192F] bg-[#0A192F] text-white"
                    : isActive
                      ? "border-blue-600 text-blue-600 ring-4 ring-blue-100"
                      : "border-slate-300 text-slate-400",
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="text-xs italic">{index + 1}</span>
                )}
              </div>

              {/* Content */}
              <div className="pt-1">
                <h4
                  className={cn(
                    "text-base font-black italic uppercase tracking-tight",
                    isActive || isCompleted
                      ? "text-[#0A192F]"
                      : "text-slate-400",
                  )}
                >
                  {title}
                </h4>

                {description && (
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                    {description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
