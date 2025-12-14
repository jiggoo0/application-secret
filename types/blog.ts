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
  text?: string; // สำหรับ paragraph, heading, quote
  items?: string[]; // สำหรับ list และ numbered-list
}

export interface Post {
  slug: string; // unique identifier ของ post
  title: string; // ชื่อบทความ
  excerpt: string; // สรุปเนื้อหา
  author: string; // ชื่อผู้เขียน
  publishedAt: string; // วันที่เผยแพร่
  createdAt?: string; // วันสร้าง (optional ถ้าไม่มีก็ใช้ publishedAt แทน)
  updatedAt?: string; // วันแก้ไขล่าสุด
  featuredImage?: string; // ใช้แทน imageUrl
  tags?: string[]; // ตัว tag ของบทความ
  content: ContentElement[]; // เนื้อหาของบทความ
  // ✅ เพิ่ม field นี้เพื่อรองรับ Logic การเผยแพร่
  isPublished?: boolean; // สถานะการเผยแพร่ (true ถ้าเผยแพร่แล้ว)
}

export interface ArticleMetadata {
  title: string; // ชื่อบทความ
  excerpt: string; // สรุปบทความ
  publishedAt: string; // วันที่เผยแพร่
  authorName: string; // ชื่อผู้เขียน
  authorUrl: string; // URL ของผู้เขียน
  // ✅ ปรับปรุง: ใช้ featuredImage เพื่อให้สอดคล้องกับ Post Interface
  featuredImage: string | null;
}
