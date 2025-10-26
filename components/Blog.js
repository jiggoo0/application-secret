'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
        const responses = await Promise.all(
          blogUrls.map((url) => fetch(url).then((res) => res.json())),
        );

        const merged = responses.flatMap((data) => (Array.isArray(data) ? data : [data]));
        const publishedBlogs = merged.filter((blog) => blog.published);
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
    return (
      <div className="flex justify-center py-10 text-muted-foreground" role="status">
        กำลังโหลดบทความ...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center py-10 text-destructive" role="alert">
        ❌ {error}
      </div>
    );

  if (blogs.length === 0)
    return (
      <div className="flex justify-center py-10 text-muted-foreground" role="status">
        💤 ยังไม่มีบทความที่เผยแพร่
      </div>
    );

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-center text-h2 font-semibold text-foreground">
        📚 บทความจากเจ้าป่า
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="group block overflow-hidden rounded-lg border border-border bg-card shadow-card transition-shadow hover:shadow-md"
          >
            <div className="relative h-56 w-full">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </div>
            <div className="p-4">
              <h2 className="line-clamp-2 text-lg font-medium text-foreground group-hover:text-primary">
                {blog.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{blog.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
