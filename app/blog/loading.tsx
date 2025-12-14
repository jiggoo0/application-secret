// app/blog/loading.tsx
import BlogListSkeleton from '@/components/skeletons/BlogListSkeleton';
import React from 'react';

// Next.js loading file สำหรับหน้า /blog
export default function Loading() {
  return <BlogListSkeleton />;
}
