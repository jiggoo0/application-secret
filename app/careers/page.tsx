import { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Heart,
  Rocket,
  Users,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";

import Header from "@/components/shared/Header";
import { H2, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ร่วมงานกับเรา | JP-VISOUL.DOCS",
  description:
    "มาร่วมเป็นส่วนหนึ่งของทีมงานมืออาชีพในการขับเคลื่อนบริการงานเอกสารและวีซ่าระดับประเทศ",
};

export default function CareersPage() {
  const benefits = [
    {
      icon: <Heart className="text-red-500" />,
      title: "สวัสดิการครบครัน",
      desc: "ประกันสุขภาพ, โบนัสประจำปี และวันหยุดพักผ่อนตามความเหมาะสม",
    },
    {
      icon: <Rocket className="text-blue-500" />,
      title: "โอกาสเติบโต",
      desc: "เราสนับสนุนการเรียนรู้ทักษะใหม่ๆ และมีเส้นทางอาชีพที่ชัดเจน",
    },
    {
      icon: <Users className="text-orange-500" />,
      title: "สังคมการทำงานที่ดี",
      desc: "ทำงานแบบพี่น้อง บรรยากาศเป็นกันเอง เน้นการช่วยเหลือกัน",
    },
  ];

  const jobs = [
    {
      title: "Visa Specialist (เจ้าหน้าที่ผู้เชี่ยวชาญด้านวีซ่า)",
      type: "Full-time",
      location: "กรุงเทพฯ (Hybrid)",
      salary: "25,000 - 45,000 บาท",
    },
    {
      title: "Business Development Executive",
      type: "Full-time",
      location: "กรุงเทพฯ",
      salary: "ตามตกลง + Commission",
    },
    {
      title: "Customer Support (Japanese Speaking)",
      type: "Contract / Full-time",
      location: "Remote / Office",
      salary: "30,000+ บาท",
    },
  ];

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* 1. Hero Header Section */}
      <Header
        title="Careers"
        description="มาร่วมสร้างประสบการณ์งานเอกสารที่โปร่งใสและเข้าถึงง่ายไปกับเรา"
        centered={true}
      />

      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* 2. Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 text-center transition-transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 3. Open Positions Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-widest mb-4">
                <Briefcase size={16} /> Open Positions
              </div>
              <H2 className="border-none p-0 text-3xl md:text-4xl font-black">
                ตำแหน่งที่เปิดรับ
              </H2>
            </div>
            <P className="text-slate-500 max-w-sm text-sm">
              เรากำลังมองหาคนที่มีไฟและพร้อมจะเติบโตไปพร้อมกับ JP-VISOUL.DOCS
            </P>
          </div>

          {/* 4. Job Listings */}
          <div className="space-y-4 mb-24">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 bg-slate-50 hover:bg-white border border-transparent hover:border-secondary hover:shadow-2xl transition-all duration-300 rounded-[2rem]"
              >
                <div className="mb-4 md:mb-0">
                  <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-secondary transition-colors">
                    {job.title}
                  </h4>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm">
                      <Clock size={14} className="text-secondary" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm">
                      <MapPin size={14} className="text-secondary" />{" "}
                      {job.location}
                    </span>
                    <span className="text-primary font-bold">{job.salary}</span>
                  </div>
                </div>
                <Button
                  asChild
                  className="rounded-full px-8 group-hover:bg-secondary transition-colors h-12"
                >
                  <Link
                    href={`/careers/apply?job=${encodeURIComponent(job.title)}`}
                  >
                    สมัครงาน{" "}
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* 5. Internship CTA Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-primary rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-widest mb-6">
                <GraduationCap size={20} /> Internships
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                เปิดรับนักศึกษาฝึกงาน
                <br />
                รุ่นใหม่ไฟแรง
              </h2>
              <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                น้องๆ ที่สนใจอยากสัมผัสประสบการณ์ทำงานจริงในสายงาน Visa & Legal
                Services
                เราเปิดพื้นที่ให้ลองผิดลองถูกและเรียนรู้จากผู้เชี่ยวชาญตัวจริง
              </p>
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-white/10 hover:bg-white hover:text-primary py-6 px-10 rounded-full text-lg font-bold text-white transition-all h-auto"
              >
                <Link href="/contact">ส่ง Resume ฝึกงาน</Link>
              </Button>
            </div>

            {/* Visual Placeholder for Team Image */}
            <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="text-white/20">
                <Users size={120} strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
