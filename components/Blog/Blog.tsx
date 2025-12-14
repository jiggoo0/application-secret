// components/Blog/Blog.tsx

import Link from 'next/link';
import BlogCard from '@/components/Blog/BlogCard';
import type { Post } from '@/types/blog';

// ----------------------------------------------------
// Types
// ----------------------------------------------------

interface BlogProps {
  posts?: Post[];
}

// ----------------------------------------------------
// Component
// ----------------------------------------------------

export default function Blog({ posts = [] }: BlogProps) {
  if (posts.length === 0) {
    return (
      <section className="py-12 text-center">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">ยังไม่มีบทความ</h2>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">บทความล่าสุด</h2>

        <Link
          href="/blog"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          ดูทั้งหมด
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
