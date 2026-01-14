import { SERVICES } from "@/constants/services-data";
import ServiceCard from "@/components/cards/ServiceCard";
import { H1, Lead, P } from "@/components/ui/typography";
import Link from "next/link";
import { ArrowLeft, Inbox } from "lucide-react";

interface CategoryArchiveProps {
  category: "visa" | "legal" | "translation" | string;
  title?: string;
}

export default function CategoryArchiveTemplate({
  category,
  title,
}: CategoryArchiveProps) {
  // กรองข้อมูลบริการตาม Category ที่ได้รับ
  const filteredServices = SERVICES.filter(
    (s) => s.category.toLowerCase() === category.toLowerCase(),
  );

  // กำหนดชื่อหมวดหมู่ภาษาไทยสำหรับแสดงผล
  const categoryNames: Record<string, string> = {
    visa: "วีซ่าและต่างประเทศ",
    legal: "กฎหมายและธุรกิจ",
    translation: "แปลเอกสารและรับรอง",
  };

  const displayName = title || categoryNames[category] || category;

  return (
    <div className="min-h-screen bg-white">
      {/* --- Header Section --- */}
      <header className="bg-slate-50 border-b border-slate-100 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft
              size={16}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            กลับไปหน้าบริการทั้งหมด
          </Link>

          <H1 className="capitalize mb-4 border-none p-0 text-4xl md:text-6xl">
            {displayName}
          </H1>
          <Lead className="max-w-2xl text-slate-500">
            รวบรวมคลังข้อมูลและบริการด้าน {displayName} ทั้งหมดของ JP-VISOUL
            ที่ได้รับการปรับปรุงเนื้อหาให้เป็นปัจจุบันสำหรับปี 2026
          </Lead>
        </div>
      </header>

      {/* --- Content Section --- */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
              <Inbox className="text-slate-300" size={40} />
            </div>
            <H1 className="text-2xl mb-2 border-none pb-0">
              ไม่พบข้อมูลบริการ
            </H1>
            <P className="text-muted-foreground">
              ขออภัย ยังไม่มีข้อมูลบริการในหมวดหมู่ "{displayName}" ในขณะนี้
            </P>
            <Link
              href="/contact"
              className="mt-8 text-secondary font-bold hover:underline"
            >
              สอบถามเจ้าหน้าที่เพิ่มเติม
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
