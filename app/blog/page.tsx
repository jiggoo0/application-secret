// app/blog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

// สมมติว่าไฟล์นี้มีอยู่จริง และใช้ Post type ที่มี featuredImage
import { getPosts } from '@/lib/blog';
import { formatThaiDate } from '@/lib/dateUtils'; // สมมติว่าไฟล์นี้มีอยู่จริง

// ----------------------------------------------------
// 1. METADATA
// ----------------------------------------------------
export const metadata: Metadata = {
  title: 'บทความและข่าวสารล่าสุด',
  description: 'รวบรวมบทความ, ข่าวสาร, และเคล็ดลับของเราทั้งหมด',
};

// ----------------------------------------------------
// 2. MAIN COMPONENT (Server Component)
// ----------------------------------------------------
export default async function BlogListPage() {
  // 💡 Optimization: เพิ่มการจัดการ Cache หรือ Revalidation ตาม Next.js
  const posts = await getPosts();

  if (!posts || posts.length === 0) {
    return (
      <main className="container mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold dark:text-gray-100">🚧 ยังไม่มีบทความ</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">โปรดกลับมาตรวจสอบอีกครั้งภายหลัง</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          บทความและข่าวสาร
        </h1>
        <p className="mt-3 text-xl text-gray-600 dark:text-gray-400">
          อัปเดตเรื่องราวและเคล็ดลับใหม่ ๆ ทุกสัปดาห์
        </p>
      </header>

      {/* Blog List */}
      <section aria-labelledby="blog-list" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            {/* Featured Image (ใช้ post.featuredImage อย่างถูกต้อง) */}
            {post.featuredImage && post.featuredImage.trim() ? (
              <div className="relative h-48 w-full">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  // 💡 Responsive sizes for better performance
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ) : (
              // 💡 Optional: Placeholder for server component rendering
              <div className="flex h-48 w-full items-center justify-center bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                ไม่มีภาพประกอบ
              </div>
            )}

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                {/* Tag */}
                {post.tags?.length > 0 && (
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {post.tags[0]}
                  </p>
                )}

                {/* Title + Excerpt */}
                <Link href={`/blog/${post.slug}`} className="mt-2 block">
                  <h2 className="text-xl font-semibold text-gray-900 transition-colors duration-200 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-base text-gray-500 dark:text-gray-400">
                    {post.excerpt}
                  </p>
                </Link>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center border-t border-gray-100 pt-4 dark:border-gray-700">
                <div className="text-sm">
                  <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {/* ✅ ใช้ post.publishedAt เป็น ISO String ใน dateTime */}
                    <time dateTime={post.publishedAt}>
                      {/* สมมติว่า formatThaiDate(publishedAt) ใช้งานได้ */}
                      {formatThaiDate(post.publishedAt)}
                    </time>
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
