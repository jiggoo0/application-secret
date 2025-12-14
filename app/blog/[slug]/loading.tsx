// app/blog/[slug]/loading.tsx
import React from 'react';
// 💡 สมมติว่ามี Component นี้อยู่
// import ArticleSkeleton from '@/components/skeletons/ArticleSkeleton';

export default function Loading() {
  return (
    // <ArticleSkeleton />
    <div className="mx-auto min-h-screen max-w-4xl animate-pulse bg-gray-50 p-8">
      <div className="mb-4 h-10 w-3/4 rounded bg-gray-200"></div>
      <div className="mb-10 h-4 w-1/4 rounded bg-gray-200"></div>
      <div className="mb-10 h-96 rounded bg-gray-200"></div>
      <div className="space-y-4">
        <div className="h-4 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-5/6 rounded bg-gray-200"></div>
        <div className="h-4 w-full rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
