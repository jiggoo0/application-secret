// components/skeletons/ArticleSkeleton.tsx
import React from 'react';

const ArticleSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Header Skeleton (จำลอง BlogArticleHeader) */}
      <header className="animate-pulse border-b border-gray-100 bg-white py-10 shadow-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Title Placeholder */}
          <div className="mb-3 h-9 w-11/12 rounded bg-gray-200"></div>
          <div className="mb-6 h-9 w-8/12 rounded bg-gray-200"></div>

          {/* Author/Date Placeholder */}
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            <div>
              <div className="mb-1 h-4 w-32 rounded bg-gray-200"></div>
              <div className="h-3 w-48 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Content and Sidebar Skeleton */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main Content Column Skeleton (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <div className="animate-pulse space-y-4 rounded-lg bg-white p-8 shadow-md">
              <div className="h-6 w-full rounded bg-gray-200"></div>
              <div className="h-6 w-10/12 rounded bg-gray-200"></div>
              <div className="h-6 w-full rounded bg-gray-200"></div>
              <div className="h-6 w-9/12 rounded bg-gray-200"></div>
              {/* ... (สามารถเพิ่มบรรทัด placeholder เพิ่มเติมได้) ... */}
            </div>
          </div>

          {/* Sidebar Column Skeleton (lg:col-span-1) - จำลอง DtiCalculatorCta */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 animate-pulse rounded-lg border-t-4 border-blue-600 bg-white p-6 shadow-xl">
              <div className="mb-6 h-6 w-2/3 rounded bg-gray-200"></div>
              <div className="space-y-4">
                <div className="h-10 w-full rounded bg-gray-200"></div>
                <div className="h-10 w-full rounded bg-gray-200"></div>
                <div className="h-10 w-full rounded bg-gray-200"></div>
              </div>
              <div className="mt-6 h-12 w-full rounded bg-blue-300"></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
