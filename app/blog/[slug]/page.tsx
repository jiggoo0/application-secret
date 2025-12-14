// app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';

import { getPostBySlug } from '@/lib/blog';
import { formatThaiDate } from '@/lib/dateUtils';
import ArticleContentRenderer from '@/components/Blog/ArticleContentRenderer';
import type { Post } from '@/types/blog';

// ----------------------------------------------------
// generateMetadata
// ----------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post: Post | null = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,
    },
  };
}

// ----------------------------------------------------
// Page
// ----------------------------------------------------
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post: Post | null = await getPostBySlug(slug);
  if (!post) notFound();

  const displayDate = post.publishedAt || post.createdAt;
  const formattedDate = formatThaiDate(displayDate);

  // ✅ FIX: ใช้ field ที่มีจริงใน Post
  const featuredImageUrl = post.featuredImage ?? '/images/blog/default-hero.webp';

  const heroImageAlt = `ภาพปกสำหรับบทความ: ${post.title}`;

  if (!Array.isArray(post.content)) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl text-red-500">❌ โครงสร้างเนื้อหาบทความผิดพลาด</h2>
        <p className="mt-2 text-gray-500">โปรดตรวจสอบข้อมูล (Post ID: {post.slug})</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <article className="prose prose-lg dark:prose-invert">
        {/* Header */}
        <header className="mb-8 border-b border-gray-200 pb-4 dark:border-gray-700">
          <h1 className="text-4xl font-extrabold sm:text-5xl">{post.title}</h1>

          <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>
              โดย: <strong>{post.author}</strong>
            </span>
            <time dateTime={displayDate}>เผยแพร่เมื่อ: {formattedDate}</time>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg sm:h-96">
          <Image
            src={featuredImageUrl}
            alt={heroImageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <ArticleContentRenderer content={post.content} />

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-200 pt-6 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Tags:</strong> {post.tags?.join(', ') || 'ไม่มีแท็ก'}
          </p>
        </footer>
      </article>
    </main>
  );
}
