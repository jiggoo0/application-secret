// components/skeletons/BlogListSkeleton.tsx
import React from 'react';

// Skeleton สำหรับ Blog Card แต่ละใบ
const BlogCardSkeleton: React.FC = () => (
  <div className="animate-pulse overflow-hidden rounded-lg bg-white shadow-lg">
    {/* Image Placeholder */}
    <div className="h-48 w-full bg-gray-200"></div>

    <div className="p-6">
      {/* Title Placeholder */}
      <div className="mb-3 h-6 w-3/4 rounded bg-gray-200"></div>

      {/* Description Placeholder */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-11/12 rounded bg-gray-200"></div>
        <div className="h-4 w-3/5 rounded bg-gray-200"></div>
      </div>

      {/* Metadata Placeholder */}
      <div className="mt-4 h-3 w-1/4 rounded bg-gray-200"></div>
    </div>
  </div>
);

const BlogListSkeleton: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-8 h-10 w-1/4 rounded bg-gray-300"></div> {/* Title Placeholder */}
      <div
        role="status"
        aria-label="กำลังโหลดรายการบทความ"
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/* แสดง 6 Card Skeletons */}
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
};

export default BlogListSkeleton;
