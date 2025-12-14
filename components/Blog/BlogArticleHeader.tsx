'use client';

import React from 'react';
import Image from 'next/image';

interface BlogArticleHeaderProps {
  title: string;
  coverImage?: string;
  publishedAt: string;
  metadata: {
    authorName: string;
    authorUrl?: string; // external URL
  };
}

export default function BlogArticleHeader({
  title,
  coverImage,
  publishedAt,
  metadata,
}: BlogArticleHeaderProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="mb-10">
      {coverImage && (
        <div className="relative mb-6 h-64 w-full overflow-hidden rounded-xl">
          <Image src={coverImage} alt={title} fill priority className="object-cover" />
        </div>
      )}

      <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>

      <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
        <div className="mr-4">
          โดย:{' '}
          {metadata.authorUrl ? (
            <a
              href={metadata.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              aria-label={`ไปที่หน้าผู้เขียน ${metadata.authorName}`}
            >
              {metadata.authorName}
            </a>
          ) : (
            <span className="font-semibold">{metadata.authorName}</span>
          )}
        </div>

        <time dateTime={publishedAt}>{formattedDate}</time>
      </div>
    </header>
  );
}
