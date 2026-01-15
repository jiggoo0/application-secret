"use client";

import ProtocolStepper from "@/components/shared/ProtocolStepper";

/**
 * ProcessSection
 * - แสดงขั้นตอนการให้บริการ (Static example)
 * - รองรับการเปลี่ยนเป็น dynamic data จาก SERVICES / CMS ภายหลัง
 */
const PROCESS_STEPS: string[] = [
  "วิเคราะห์เคสเบื้องต้น",
  "ตรวจสอบเอกสาร",
  "วางโครงสร้างเอกสาร",
  "ยื่นและติดตามผล",
];

export default function ProcessSection() {
  return (
    <section aria-labelledby="process-heading" className="bg-white py-24">
      <div className="container mx-auto px-4">
        <h2
          id="process-heading"
          className="mb-12 text-center text-3xl font-black tracking-tight text-[#0A192F]"
        >
          ขั้นตอนการให้บริการ
        </h2>

        <div className="mx-auto max-w-3xl">
          <ProtocolStepper steps={PROCESS_STEPS} currentStep={0} />
        </div>
      </div>
    </section>
  );
}
