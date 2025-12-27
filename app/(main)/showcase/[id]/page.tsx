/** @format */
import React from "react"
import { Metadata } from "next"
import { Terminal, Cpu, ArrowLeft, ShieldCheck } from "lucide-react"
import Link from "next/link"

/**
 * 🛰️ SHOWCASE_PAGE_PROPS
 * ใน Next.js 15 'params' และ 'searchParams' จะถูกส่งมาเป็น Promise
 */
interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

/**
 * 🌐 GENERATE_METADATA
 * ปรับแต่ง SEO สำหรับหน้า Showcase ตาม Resource ID
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Project Analysis: ${id.toUpperCase()} | JP Visual Docs`,
    description: `Technical documentation and showcase for resource unit ${id}`,
  }
}

/**
 * 🏗️ SHOWCASE_PAGE_COMPONENT
 * หน้าแสดงรายละเอียดโปรเจกต์ สไตล์ Industrial Technical
 */
export default async function ShowcasePage({ params }: PageProps) {
  // ✅ FIX: ต้อง await params ก่อนเข้าถึงค่าภายในตามมาตรฐาน Next.js 15
  const { id } = await params

  return (
    <main className="relative min-h-screen bg-industrial-black pb-12 pt-24 text-industrial-soft">
      {/* 🧩 BACKGROUND_GRID_ASSET */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* 🧭 BREADCRUMB_NAVIGATION */}
        <div className="mb-8">
          <Link
            href="/services"
            className="group flex w-fit items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest text-brand transition-colors hover:text-white"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            Return_to_Services
          </Link>
        </div>

        {/* 🛠️ RESOURCE_TERMINAL_CONTAINER */}
        <div className="border border-industrial-border bg-industrial-dark/50 shadow-blueprint backdrop-blur-sm">
          {/* HEADER_STATUS_BAR */}
          <div className="flex items-center justify-between border-b border-industrial-border bg-industrial-surface/50 px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center bg-brand/20 text-brand">
                <Terminal size={14} />
              </div>
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-white">
                Resource_Analysis_Unit
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-status-success" />
                <span className="font-mono text-[9px] font-bold text-industrial-gray">
                  SYNC_ACTIVE
                </span>
              </div>
              <ShieldCheck size={14} className="text-industrial-gray" />
            </div>
          </div>

          {/* MAIN_CONTENT_AREA */}
          <div className="p-8 md:p-12">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand">
                  Internal_Registry_ID
                </span>
                <h1 className="mt-2 text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
                  {id}
                  <span className="text-brand">.</span>LOGS
                </h1>
              </div>
              <div className="flex h-fit items-center gap-3 border border-industrial-border bg-industrial-black px-4 py-2">
                <Cpu size={16} className="text-brand" />
                <span className="font-mono text-xs font-bold text-industrial-gray">
                  PROCESSED_BY_CORE_V1
                </span>
              </div>
            </div>

            {/* CONTENT_PLACEHOLDER: ส่วนนี้สามารถดึงข้อมูลจาก Database มาแสดงได้ */}
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <div className="bg-gradient-to-right h-px w-full from-brand/50 to-transparent" />
                <p className="font-mono text-sm leading-relaxed text-industrial-gray">
                  &gt; เริ่มต้นกระบวนการดึงข้อมูลสำหรับ Unit:{" "}
                  <span className="text-white">[{id}]</span>...
                  <br />
                  &gt; สถานะการเชื่อมต่อ:{" "}
                  <span className="text-status-success">เสถียร (STABLE)</span>
                  <br />
                  &gt; พบข้อมูล Technical Documentation จำนวน 1 รายการ...
                </p>
                <div className="aspect-video w-full border border-industrial-border bg-industrial-surface/30 p-2 shadow-inner">
                  <div className="flex h-full w-full items-center justify-center border border-dashed border-industrial-border">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-industrial-gray">
                      Project_Image_Placeholder
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border border-industrial-border bg-industrial-black/40 p-6">
                  <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-white">
                    System_Specs
                  </h3>
                  <div className="space-y-3 font-mono text-[11px]">
                    <div className="flex justify-between border-b border-industrial-border pb-1">
                      <span className="text-industrial-gray">
                        RESOURCE_TYPE
                      </span>
                      <span className="text-brand">SERVICE_DEPLOY</span>
                    </div>
                    <div className="flex justify-between border-b border-industrial-border pb-1">
                      <span className="text-industrial-gray">PROTOCOL</span>
                      <span className="text-brand">HTTP/2_SSL</span>
                    </div>
                    <div className="flex justify-between border-b border-industrial-border pb-1">
                      <span className="text-industrial-gray">ENCRYPTION</span>
                      <span className="text-brand">AES_256</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER_META */}
          <div className="border-t border-industrial-border bg-industrial-surface/30 px-6 py-4">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-industrial-gray">
              © JP_VISUAL_DOCS // LOG_STAMP:{" "}
              {new Date().toISOString().split("T")[0]}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
