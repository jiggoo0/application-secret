import * as React from "react";
import ServiceRequestForm from "@/components/forms/ServiceRequestForm";
import { H1, Lead } from "@/components/ui/typography";
import { ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ส่งคำขอใช้บริการ | JP-VISOUL",
  description: "กรอกข้อมูลเพื่อประเมินงานและขอรับคำปรึกษาด้านเอกสารและวีซ่า",
};

interface RequestPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function RequestPage({ searchParams }: RequestPageProps) {
  // ✅ Next.js 15: searchParams ต้องถูก await ก่อนใช้งาน
  const { type } = await searchParams;

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm mb-6">
            <ShieldCheck size={18} className="text-secondary" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-primary/80">
              Secure Request System
            </span>
          </div>
          <H1 className="mb-4 border-none p-0 text-primary">
            ส่งคำขอใช้บริการ
          </H1>
          <Lead className="text-slate-500">
            กรอกข้อมูลด้านล่างเพื่อให้ทีมงานประเมินและติดต่อกลับโดยเร็วที่สุด
          </Lead>
        </div>

        {/* Form Container */}
        <div className="relative">
          {/* ตกแต่งพื้นหลังเล็กน้อยเพิ่มความพรีเมียม */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-[3rem] blur-2xl -z-10" />

          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            {/* ✅ ส่งค่า type จาก URL (searchParams) เข้าไปที่ Component */}
            {/* หมายเหตุ: ตัวแปรชื่อ defaultService ต้องตรงกับ props ที่กำหนดใน ServiceRequestForm */}
            <ServiceRequestForm defaultService={type} />
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-10 space-y-2">
          <p className="text-slate-400 text-sm">
            * ข้อมูลของคุณจะถูกเก็บเป็นความลับสูงสุดตามมาตรฐาน PDPA
          </p>
          <div className="flex justify-center gap-4 grayscale opacity-50 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            <span>Verified Service</span>
            <span>•</span>
            <span>Privacy Protected</span>
            <span>•</span>
            <span>Expert Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
