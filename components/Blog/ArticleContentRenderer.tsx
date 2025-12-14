// components/Blog/ArticleContentRenderer.tsx

import React from 'react';
import type { ContentElement } from '@/types/blog';

interface ArticleContentRendererProps {
  content: ContentElement[];
}

/**
 * @description
 * Render Rich Article Content (Array-based schema) → Semantic HTML
 * รองรับ paragraph, headings, lists, quote, separator
 */
export default function ArticleContentRenderer({ content }: ArticleContentRendererProps) {
  // --- Preview text (ใช้เฉพาะ paragraph แรก) ---
  const firstParagraph = content.find(
    (item) => item.type === 'paragraph' && typeof item.text === 'string',
  );

  const previewText =
    firstParagraph?.text && firstParagraph.text.length > 0
      ? firstParagraph.text.slice(0, 100)
      : null;

  return (
    <div className="prose prose-lg max-w-none text-gray-800 dark:prose-invert dark:text-gray-200">
      {/* Preview */}
      {previewText && (
        <p className="mb-6 text-sm italic text-muted-foreground">
          ตัวอย่างเนื้อหา: {previewText}
          {firstParagraph!.text!.length > 100 && '…'}
        </p>
      )}

      {/* Main content */}
      {content.map((item, index) => {
        const key = `${item.type}-${index}`;

        switch (item.type) {
          case 'paragraph':
            return item.text ? (
              <p key={key} className="my-4">
                {item.text}
              </p>
            ) : null;

          case 'heading-2':
            return item.text ? (
              <h2 key={key} className="mb-3 mt-6 text-2xl font-bold">
                {item.text}
              </h2>
            ) : null;

          case 'heading-3':
            return item.text ? (
              <h3 key={key} className="mb-2 mt-5 text-xl font-semibold">
                {item.text}
              </h3>
            ) : null;

          case 'list':
          case 'numbered-list': {
            if (!item.items || item.items.length === 0) return null;

            const ListTag = item.type === 'numbered-list' ? 'ol' : 'ul';
            const listClass = item.type === 'numbered-list' ? 'list-decimal' : 'list-disc';

            return (
              <ListTag key={key} className={`${listClass} my-2 ml-6`}>
                {item.items.map((listItem, listIndex) => (
                  <li key={`${key}-item-${listIndex}`}>{listItem}</li>
                ))}
              </ListTag>
            );
          }

          case 'quote':
            return item.text ? (
              <blockquote key={key} className="my-4 border-l-4 border-gray-300 pl-4 italic">
                {item.text}
              </blockquote>
            ) : null;

          case 'separator':
            return <hr key={key} className="my-6 border-gray-200" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
