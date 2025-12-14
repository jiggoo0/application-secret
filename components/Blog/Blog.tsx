// components/Blog/Blog.tsx
'use client';

import Link from 'next/link';
// ไม่จำเป็นต้อง import Image ที่นี่
import type { Post } from '@/types/blog';
import { ALL_BLOG_POSTS_WITH_CREATED } from '@/data/blog/all-posts';
// ✅ ใช้ BlogCard ที่เป็นไฟล์แยก เพื่อ Encapsulation ที่ดีกว่า
import BlogCard from './BlogCard';

// ----------------------------------------------------
// Blog Component (แสดงผลรายชื่อบทความย่อ)
// ----------------------------------------------------
interface BlogProps {
  posts?: Post[];
}

export default function Blog({ posts = ALL_BLOG_POSTS_WITH_CREATED }: BlogProps) {
  // 💡 Efficiency: ควร Sort ข้อมูลมาจาก Server Component/getPosts หากเป็นไปได้
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  if (!sortedPosts.length) {
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
          ดูทั้งหมด &rarr;
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          // ✅ ใช้ BlogCard ที่ import มาจากไฟล์แยก
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
