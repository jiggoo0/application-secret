/** * @format
 * @description SKELETON_CARD: Industrial Sharp Placeholder
 * ออกแบบมาเพื่อให้มิติเท่ากับ ServiceCard 100% เพื่อป้องกัน Layout Shift
 */

import React from 'react'

export const SkeletonCard = () => (
  <div className="relative flex h-full animate-pulse flex-col border-b border-r border-slate-100 bg-white transition-all duration-500">
    {/* 🖼️ IMAGE_SKELETON: จำลองสัดส่วน 16/11 ของจริง */}
    <div className="relative aspect-[16/11] bg-slate-100/80">
      {/* Status Badge Placeholder */}
      <div className="absolute right-5 top-5 h-6 w-20 bg-slate-200/50" />
      {/* Category Tag Placeholder */}
      <div className="absolute bottom-5 left-5 h-8 w-24 bg-slate-200" />
    </div>

    {/* 📝 CONTENT_SKELETON: จำลอง P-8 ถึง P-10 ของจริง */}
    <div className="flex flex-grow flex-col p-8 lg:p-10">
      {/* Registry UID & Icon Placeholder */}
      <div className="mb-8 flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-2 w-16 bg-slate-100" />
          <div className="h-3 w-24 bg-slate-100/60" />
        </div>
        <div className="h-12 w-12 bg-slate-100" />
      </div>

      {/* Title Placeholder */}
      <div className="mb-6 h-10 w-full bg-slate-100" />

      {/* Description Placeholder */}
      <div className="mb-10 space-y-3">
        <div className="h-4 w-full bg-slate-50" />
        <div className="h-4 w-full bg-slate-50" />
        <div className="h-4 w-2/3 bg-slate-50" />
      </div>

      {/* Protocol & Footer Skeleton */}
      <div className="mt-auto space-y-10">
        <div>
          <div className="mb-4 h-2 w-24 bg-slate-100" />
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-slate-50" />
            <div className="h-6 w-20 bg-slate-50" />
            <div className="h-6 w-14 bg-slate-50" />
          </div>
        </div>

        {/* Pricing & CTA Placeholder */}
        <div className="flex items-center justify-between border-t border-slate-50 pt-10">
          <div className="space-y-2">
            <div className="h-2 w-20 bg-slate-100" />
            <div className="h-8 w-28 bg-slate-100" />
          </div>
          <div className="h-16 w-16 bg-slate-200" />
        </div>
      </div>
    </div>
  </div>
)

export default SkeletonCard
