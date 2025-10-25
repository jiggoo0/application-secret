'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const FALLBACK_IMAGE = '/images/placeholder.webp';

/**
 * @typedef {Object} BlogArticle
 * @property {string} id
 * @property {string} title
 * @property {string} image
 * @property {string} summary
 */

/**
 * @param {{ blog: BlogArticle }} props
 */
export default function BlogCard({ blog }) {
  if (!blog || typeof blog !== 'object') return null;

  const { id, title, image, summary } = blog;

  const imageSrc = image?.startsWith('/') ? image : image || FALLBACK_IMAGE;

  return (
    <article
      role="listitem"
      aria-labelledby={`blog-title-${id}`}
      className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg dark:bg-gray-900"
    >
      {/* 🖼️ Blog Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-md">
        <Image
          src={imageSrc}
          alt={`ภาพประกอบบทความ: ${title}`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>

      {/* 📝 Blog Title */}
      <h3
        id={`blog-title-${id}`}
        className="line-clamp-2 text-lg font-semibold text-black dark:text-white"
      >
        {title}
      </h3>

      {/* 📄 Blog Summary */}
      <p className="line-clamp-3 text-gray-700 dark:text-gray-300">{summary}</p>

      {/* 🔗 Read More Button */}
      <Link href={`/blog/${id}`} className="mt-auto w-full">
        <Button className="w-full" aria-label={`อ่านบทความ: ${title}`}>
          อ่านต่อ
        </Button>
      </Link>
    </article>
  );
}
