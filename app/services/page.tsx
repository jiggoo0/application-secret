import { SERVICES } from "@/constants/services-data";
import ServiceCard from "@/components/cards/ServiceCard";
import { H1, Lead } from "@/components/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Globe, Languages, Scale, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "บริการทั้งหมด | JP-VISOUL.DOCS",
  description:
    "เลือกรับบริการด้านวีซ่า กฎหมายธุรกิจ และการแปลเอกสารรับรองมาตรฐานสากล",
};

export default function ServicesPage() {
  // จัดกลุ่มหมวดหมู่เพื่อใช้ใน Tabs
  const categories = [
    { id: "all", label: "ทั้งหมด", icon: Briefcase },
    { id: "visa", label: "วีซ่า", icon: Globe },
    { id: "legal", label: "กฎหมาย", icon: Scale },
    { id: "translation", label: "แปลเอกสาร", icon: Languages },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* --- Header Section --- */}
      <section className="bg-primary text-white pt-24 pb-20 md:pt-32 md:pb-32">
        <div className="container mx-auto px-4 text-center">
          <H1 className="text-white border-none p-0 mb-6 text-4xl md:text-6xl">
            บริการระดับ <span className="text-secondary">มืออาชีพ</span>
          </H1>
          <Lead className="text-slate-300 max-w-2xl mx-auto">
            เราดูแลทุกขั้นตอนอย่างละเอียด
            ตั้งแต่การเตรียมเอกสารจนถึงการยื่นคำร้อง
            เพื่อให้คุณมั่นใจในทุกการตัดสินใจ
          </Lead>
        </div>
      </section>

      {/* --- Filter & Listing Section --- */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
              {/* Tab Navigation */}
              <TabsList className="bg-slate-100 p-1 rounded-2xl h-auto flex-wrap justify-center">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="rounded-xl px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all flex items-center gap-2"
                  >
                    <cat.icon size={16} />
                    <span className="font-medium">{cat.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Search Bar (UI Mockup) */}
              <div className="relative w-full md:w-72">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <Input
                  placeholder="ค้นหาบริการ..."
                  className="pl-10 rounded-xl border-slate-200 focus:ring-secondary/20"
                />
              </div>
            </div>

            {/* Render Content */}
            {categories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SERVICES.filter(
                    (s) => cat.id === "all" || s.category === cat.id,
                  ).map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* --- Call to Action --- */}
      <section className="container mx-auto px-4 pb-24">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-center text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ไม่พบประเภทบริการที่ต้องการ?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              หากคุณมีความต้องการเฉพาะด้าน หรือเอกสารประเภทอื่น
              สามารถปรึกษาทีมงานเพื่อขอรับคำแนะนำเบื้องต้นได้ฟรี
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-secondary text-primary font-bold px-8 py-4 rounded-xl hover:bg-secondary/90 transition-all">
                ติดต่อเจ้าหน้าที่
              </button>
              <button className="bg-white/10 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all border border-white/20">
                ดูคำถามที่พบบ่อย
              </button>
            </div>
          </div>
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}
