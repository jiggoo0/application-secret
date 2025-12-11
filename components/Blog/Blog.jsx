'use client';

import { useEffect, useState } from 'react';
import BlogCard from '@/components/Blog/BlogCard';

// ✅ URLs ของไฟล์ JSON บทความ
const blogUrls = [
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog1.json',
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog2.json',
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog3.json',
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog4.json',
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog5.json',
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog6.json',
];

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllBlogs() {
      try {
        const responses = await Promise.all(
          blogUrls.map(async (url) => {
            try {
              const res = await fetch(url);
              if (!res.ok) {
                console.warn(`⚠️ ไม่สามารถโหลดไฟล์: ${url}`);
                return null;
              }
              return await res.json();
            } catch (err) {
              console.error(`❌ error fetching ${url}`, err);
              return null;
            }
          }),
        );

        // รวมข้อมูลจากหลายไฟล์เป็น array เดียว
        const merged = responses
          .filter(Boolean)
          .flatMap((data) => (Array.isArray(data) ? data : [data]));

        // กรองเฉพาะบทความที่เผยแพร่แล้ว
        const publishedBlogs = merged.filter((blog) => blog?.published);

        // เรียงตาม id (number)
        publishedBlogs.sort((a, b) => Number(a.id) - Number(b.id));

        setBlogs(publishedBlogs);
      } catch (err) {
        console.error(err);
        setError('❌ เกิดข้อผิดพลาดในการโหลดข้อมูลบทความ');
      } finally {
        setLoading(false);
      }
    }

    fetchAllBlogs();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center py-10 text-muted-foreground" role="status">
        ⏳ กำลังโหลดบทความ...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center py-10 text-destructive" role="alert">
        {error}
      </div>
    );
  }

  // Empty state
  if (blogs.length === 0) {
    return (
      <div className="flex justify-center py-10 text-muted-foreground" role="status">
        💤 ยังไม่มีบทความที่เผยแพร่
      </div>
    );
  }

  // Render blog list
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-center text-h2 font-semibold text-foreground">
        📚 บทความจากเจ้าป่า
      </h1>

      <div
        role="list"
        aria-label="รายการบทความ"
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
