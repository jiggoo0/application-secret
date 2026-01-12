/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.854Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: SkeletonCard          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */
export const SkeletonCard = () => (
  <div className="flex h-full animate-pulse flex-col border border-slate-100 bg-white p-10">
    {/* Image Skeleton */}
    <div className="mb-8 aspect-[16/10] bg-slate-100" />

    {/* Content Skeleton */}
    <div className="flex-grow space-y-4">
      <div className="h-2 w-16 bg-slate-100" />
      <div className="h-8 w-3/4 bg-slate-100" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-50" />
        <div className="h-3 w-5/6 bg-slate-50" />
      </div>
    </div>

    {/* Footer Skeleton */}
    <div className="mt-12 flex items-center justify-between border-t border-slate-50 pt-6">
      <div className="h-10 w-24 bg-slate-100" />
      <div className="h-12 w-12 bg-slate-100" />
    </div>
  </div>
)
