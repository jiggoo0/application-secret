// types/blog.ts
/**
 * ====================================================
 * Blog Content Types
 * ====================================================
 */
export type ContentElementType =
  | 'paragraph'
  | 'heading-2'
  | 'heading-3'
  | 'list'
  | 'numbered-list'
  | 'quote'
  | 'separator';

export interface ContentElement {
  type: ContentElementType;
  text?: string;
  items?: string[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  createdAt: string;
  updatedAt?: string;
  featuredImage?: string; // ใช้แทน imageUrl
  tags?: string[];
  content: ContentElement[];
}

export interface ArticleMetadata {
  title: string;
  excerpt: string;
  publishedAt: string;
  authorName: string;
  authorUrl: string;
  imageUrl: string | null;
}
