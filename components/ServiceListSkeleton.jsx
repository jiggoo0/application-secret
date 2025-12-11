// 🚀 File: components/ServiceListSkeleton.js (Optimized Client Skeleton)

'use client';
// 💡 จำเป็นต้องมี 'use client' เนื่องจากมีการใช้ Tailwind CSS utility "animate-pulse"

/**
 * @component ServiceCardSkeleton
 * @description แสดงโครงสร้าง Loading State ของ Card แต่ละใบ
 */
const ServiceCardSkeleton = () => (
  // 💡 H-full เพื่อให้สูงเท่ากันทั้งหมดใน Grid และใช้ shadow ที่สม่ำเสมอ
  <div className="flex h-[450px] animate-pulse flex-col overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-lg">
    {/* Image Placeholder (h-48 คือความสูงเดียวกับ Image ใน ServiceCard) */}
    <div className="h-48 w-full bg-gray-200" />

    {/* Body Placeholder */}
    <div className="flex-grow space-y-4 p-6">
      {' '}
      {/* ปรับ space-y-3 เป็น space-y-4 */}
      <div className="mb-4 h-6 w-3/4 rounded-md bg-gray-300" /> {/* Title */}
      <div className="h-4 w-full rounded-md bg-gray-200" /> {/* Feature 1 */}
      <div className="h-4 w-11/12 rounded-md bg-gray-200" /> {/* Feature 2 */}
      <div className="h-4 w-5/6 rounded-md bg-gray-200" /> {/* Feature 3 */}
      {/* Feature Divider */}
      <div className="mt-2 h-3 w-1/3 rounded-md border-t border-gray-100 bg-gray-100 pt-1" />
    </div>

    {/* Footer Placeholder */}
    <div className="mt-auto border-t border-gray-100 p-6 pt-4">
      {' '}
      {/* ปรับ pt-0 เป็น pt-4 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="h-4 w-1/4 rounded-md bg-gray-200" /> {/* Price Label */}
        <div className="h-8 w-1/3 rounded-md bg-gray-300" /> {/* Price Value */}
      </div>
      <div className="h-12 w-full rounded-full bg-gray-400" />{' '}
      {/* CTA Button (rounded-full เหมือนปุ่มจริง) */}
    </div>
  </div>
);

/**
 * @component ServiceListSkeleton
 * @description แสดงโครงสร้าง Loading State ของรายการบริการทั้งหมด
 */
const ServiceListSkeleton = () => {
  return (
    // 💡 Tailwind Standard: ใช้ Padding ที่สม่ำเสมอ
    <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
      {/* Header Placeholder (Title and Subtitle) */}
      {/* 💡 Animation: ปรับความเร็ว/สีให้ดูนุ่มนวลขึ้น */}
      <div className="mx-auto mb-4 h-10 w-2/3 animate-pulse rounded-md bg-gray-300" />
      <div className="mx-auto mb-14 h-6 w-1/2 animate-pulse rounded-md bg-gray-200" />
      {/* Grid of Skeleton Cards (6 cards) */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {' '}
        {/* FIX: ใช้ gap-8 และ sm:grid-cols-2 เพื่อความสม่ำเสมอ */}
        {[...Array(6)].map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
      {/* Bottom CTA Placeholder */}
      <div className="mx-auto mt-20 h-14 w-1/3 animate-pulse rounded-full bg-gray-400" />{' '}
      {/* ปรับความสูงและความกลมมน */}
    </div>
  );
};

export default ServiceListSkeleton;
