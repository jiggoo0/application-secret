"use client";

import React from "react";
import { Icons } from "@/components/shared/Icons";

export default function ValuePropositionSection() {
  return (
    <section
      aria-labelledby="value-proposition-heading"
      className="bg-muted py-24"
    >
      <div className="container mx-auto px-4">
        <h2 id="value-proposition-heading" className="sr-only">
          Value Proposition
        </h2>

        <div className="grid gap-12 md:grid-cols-3">
          <Feature
            icon={<Icons.shield size={22} />}
            title="เอกสารแม่นยำ ปลอดภัย"
            desc="จัดการเอกสารตามเกณฑ์จริง ลดความเสี่ยงถูกตีกลับ"
          />
          <Feature
            icon={<Icons.clock size={22} />}
            title="งานด่วน จบไว"
            desc="เคสด่วนพิเศษ จบภายใน 24 ชั่วโมง"
          />
          <Feature
            icon={<Icons.users size={22} />}
            title="ดูแลแบบที่ปรึกษา"
            desc="ไม่ใช่แค่ทำเอกสาร แต่คิดเป็นระบบให้ทั้งแผน"
          />
        </div>
      </div>
    </section>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#0A192F]">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
