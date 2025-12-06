// components/ServiceListSkeleton.js
'use client';
// ต้องใช้ 'use client' เพราะมีการใช้ Tailwind CSS utility "animate-pulse"
// ซึ่งเป็น animation ที่ต้องทำงานบน Client-side

/**
 * ServiceCardSkeleton Component: แสดงโครงสร้าง Loading State ของ Card แต่ละใบ
 * ใช้ Tailwind Utility classes สำหรับการจัดวางและการ animate
 */
const ServiceCardSkeleton = () => (
  <div className="flex h-[450px] animate-pulse flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
    {/* Image Placeholder (h-48 คือความสูงเดียวกับ Image ใน ServiceCard) */}
    <div className="h-48 w-full bg-gray-200" />

    {/* Body Placeholder */}
    <div className="flex-grow space-y-3 p-6">
      <div className="mb-4 h-6 w-3/4 rounded bg-gray-300" /> {/* Title */}
      <div className="h-4 w-full rounded bg-gray-200" /> {/* Feature 1 */}
      <div className="h-4 w-11/12 rounded bg-gray-200" /> {/* Feature 2 */}
      <div className="h-4 w-5/6 rounded bg-gray-200" /> {/* Feature 3 */}
    </div>

    {/* Footer Placeholder */}
    <div className="mt-auto border-t border-gray-100 p-6 pt-0">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-4 w-1/4 rounded bg-gray-200" /> {/* Price Label */}
        <div className="h-8 w-1/3 rounded bg-gray-300" /> {/* Price Value */}
      </div>
      <div className="h-12 w-full rounded-lg bg-gray-400" /> {/* CTA Button */}
    </div>
  </div>
);

/**
 * ServiceListSkeleton Component: แสดงโครงสร้าง Loading State ของรายการบริการทั้งหมด
 */
const ServiceListSkeleton = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
      {/* Header Placeholder (Title and Subtitle) */}
      <div className="mx-auto mb-4 h-10 w-2/3 animate-pulse rounded bg-gray-200" />
      <div className="mx-auto mb-12 h-6 w-1/2 animate-pulse rounded bg-gray-100" />

      {/* Grid of Skeleton Cards (6 cards) */}
      <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>

      {/* Bottom CTA Placeholder */}
      <div className="mx-auto mt-16 h-12 w-1/3 animate-pulse rounded-lg bg-gray-300" />
    </div>
  );
};

export default ServiceListSkeleton;
