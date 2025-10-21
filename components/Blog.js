'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// ✅ ลิสต์ไฟล์ JSON บน Supabase
const blogUrls = [
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog1.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog2.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog3.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog4.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog5.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog6.json',
];

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllBlogs() {
      try {
        // ✅ โหลดทุก JSON พร้อมกัน
        const responses = await Promise.all(
          blogUrls.map((url) => fetch(url).then((res) => res.json())),
        );

        // ✅ รวมข้อมูลทั้งหมด (บางไฟล์อาจเป็น array หรือ object เดี่ยว)
        const merged = responses.flatMap((data) => (Array.isArray(data) ? data : [data]));

        // ✅ กรองเฉพาะบทความที่ published
        const publishedBlogs = merged.filter((blog) => blog.published);

        // ✅ เรียงตาม id
        publishedBlogs.sort((a, b) => Number(a.id) - Number(b.id));

        setBlogs(publishedBlogs);
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูลบทความ');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllBlogs();
  }, []);

  if (loading)
    return <div className="flex justify-center py-10 text-gray-500">กำลังโหลดบทความ...</div>;

  if (error) return <div className="flex justify-center py-10 text-red-500">❌ {error}</div>;

  if (blogs.length === 0)
    return (
      <div className="flex justify-center py-10 text-gray-400">💤 ยังไม่มีบทความที่เผยแพร่</div>
    );

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">📚 บทความจากเจ้าป่า</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="group block overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg"
          >
            <div className="relative h-56 w-full">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
            </div>
            <div className="p-4">
              <h2 className="line-clamp-2 text-lg font-semibold group-hover:text-emerald-600">
                {blog.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">{blog.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
