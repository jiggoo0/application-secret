import CategoryArchiveTemplate from "@/components/templates/CategoryArchiveTemplate";
import { Metadata } from "next";

/**
 * Metadata สำหรับหน้า Archive วีซ่า
 * ช่วยให้หน้าเก่าที่ยังติด Index ใน Google ดูเป็นมืออาชีพ
 */
export const metadata: Metadata = {
  title: "คลังข้อมูลบริการวีซ่าและต่างประเทศ | JP-VISOUL",
  description:
    "รวบรวมบริการด้านวีซ่าท่องเที่ยว วีซ่าทำงาน และการขออยู่ต่อในราชอาณาจักร",
};

export default function VisaArchivePage() {
  return (
    <CategoryArchiveTemplate
      category="visa"
      title="วีซ่า & ต่างประเทศ (Archive)"
    />
  );
}
