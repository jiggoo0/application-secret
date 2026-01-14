import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

import { SERVICES, Service } from "@/constants/services-data";
import { DynamicIcon, Icons } from "@/components/shared/Icons";
import { H1, Lead, H2, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

/**
 * ✅ กำหนด Type ของ Props ให้ชัดเจนสำหรับ Next.js 15
 * Params และ SearchParams ในหน้า Page จะต้องเป็น Promise
 */
interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * ✅ Dynamic Metadata สำหรับ SEO (Type-safe)
 */
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service: Service | undefined = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return { title: "ไม่พบหน้าบริการ | JP-VISOUL" };
  }

  return {
    title: `${service.title} | JP-VISOUL บริการงานเอกสารและวีซ่า`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      type: "article",
      images: [`/images/services/${service.slug}.jpg`],
    },
  };
}

/**
 * ✅ SSG: สร้าง Static Paths ล่วงหน้าตอน Build
 */
export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  // ✅ Next.js 15: ต้อง await params ก่อนดึงค่า slug
  const { slug } = await params;
  const service: Service | undefined = SERVICES.find((s) => s.slug === slug);

  // หากไม่พบ Service ตาม Slug ให้แสดงหน้า 404
  if (!service) {
    notFound();
  }

  /**
   * ✅ การตรวจสอบ IconKey เพื่อความปลอดภัย (Icon Safety)
   * ป้องกัน Error หาก database หรือ constants ระบุชื่อ icon ที่ไม่มีอยู่ใน Icons component
   */
  const iconKey =
    service.iconName in Icons
      ? (service.iconName as keyof typeof Icons)
      : "globe"; // Fallback icon

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* 1. Hero / Header Section */}
      <section className="bg-slate-50 pt-16 pb-24 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-8 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="mr-2 transition-transform group-hover:-translate-x-1"
            />
            กลับไปหน้าบริการทั้งหมด
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="p-5 bg-white rounded-[2rem] shadow-sm border border-slate-200">
              <DynamicIcon
                name={iconKey}
                className="w-12 h-12 text-secondary"
              />
            </div>
            <div className="flex-1">
              <H1 className="mb-4 border-none p-0 text-primary text-3xl md:text-5xl font-black leading-tight">
                {service.title}
              </H1>
              <Lead className="max-w-3xl text-slate-600">
                {service.description}
              </Lead>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Content & Information Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <H2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-3">
                <span className="w-8 h-1 bg-secondary rounded-full" />
                รายละเอียดบริการ
              </H2>
              <P className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                {service.longDescription}
              </P>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature: string, idx: number) => (
                <div
                  key={`${service.id}-detail-feat-${idx}`}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-secondary/30 transition-all hover:shadow-md group"
                >
                  <div className="p-1 rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="font-medium text-slate-700 leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Sticky Sidebar (Call to Action) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32 p-8 rounded-[2.5rem] bg-primary text-white shadow-2xl shadow-primary/20 overflow-hidden relative group">
              {/* Decorative Blur Background */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">สนใจบริการนี้?</h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  ให้ผู้เชี่ยวชาญของเราดูแลคุณในทุกขั้นตอน
                  เพื่อให้เอกสารของคุณถูกต้อง ครบถ้วน และรวดเร็วที่สุด
                </p>

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-8 text-lg rounded-2xl shadow-lg transition-all active:scale-95 border-none"
                >
                  <Link href={`/services/request?type=${service.slug}`}>
                    เริ่มต้นขอรับบริการ
                  </Link>
                </Button>

                {/* Trust Points */}
                <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-secondary" />
                    ประเมินเบื้องต้น ฟรี! ไม่มีค่าใช้จ่าย
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-secondary" />
                    ทีมงานดูแลใกล้ชิด 100% ทุกขั้นตอน
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
