/**
 * ====================================================
 * 🏗️ JP-VISOUL: Blog Content Types (Standard Edition)
 * Updated: 2025-12-24
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
  text?: string; // สำหรับ paragraph, heading, quote
  items?: string[]; // สำหรับ list และ numbered-list
}

export interface Post {
  // 🆔 Core Identification
  slug: string;
  title: string;
  excerpt: string;
  author: string;

  // 📅 Temporal Data
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
  /**
   * ✅ date: Alias สำหรับใช้ใน UI components (BlogCard, slugs)
   * เพื่อลดปัญหา Property 'date' does not exist error
   */
  date?: string;

  // 🖼️ Media Assets
  featuredImage?: string; // URL รูปภาพหลัก (Legacy)
  coverImage?: string; // URL รูปภาพหน้าปก (BlogCard Support)

  // 🏷️ Taxonomy & Status
  category?: string; // เช่น INTEL, GUIDE, STRATEGY
  tags?: string[];
  isPublished?: boolean;

  // 📝 Core Content
  content: ContentElement[];
}

export interface ArticleMetadata {
  title: string;
  excerpt: string;
  publishedAt: string;
  authorName: string;
  authorUrl: string;
  featuredImage: string | null;
  category?: string;
}
