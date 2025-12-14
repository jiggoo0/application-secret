// components/Blog/BlogCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/types/blog';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  // 🛡 Defensive: ต้องมี slug และ publishedAt
  if (!post.slug || !post.publishedAt) {
    return null;
  }

  // ✅ การจัดรูปแบบวันที่แบบ Client-side (Locale-based)
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // ✅ ใช้ Optional Chaining สำหรับการตรวจสอบ featuredImage ที่ถูกต้อง
  const imageSrc = post.featuredImage?.trim()
    ? post.featuredImage
    : '/images/blog/placeholder.webp'; // Placeholder ที่กำหนด

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800"
    >
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={imageSrc}
          alt={post.title}
          fill
          // 💡 Responsive sizes for better performance
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {post.title}
        </h3>

        <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{post.excerpt}</p>

        <div className="flex items-center justify-between border-t pt-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
          <span>โดย: {post.author}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}
