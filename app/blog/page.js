'use client';

import Blog from '@/components/Blog/Blog';

export default function BlogIndexPage() {
  return (
    <main className="px-6 py-20">
      <h1 className="mb-12 text-center text-3xl font-bold text-black dark:text-white">
        📚 บทความทั้งหมด
      </h1>
      <Blog />
    </main>
  );
}
