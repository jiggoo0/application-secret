// lib/blog.ts
import type { Post } from '@/types/blog';
import { ALL_BLOG_POSTS_WITH_CREATED } from '@/data/blog/all-posts';

const POSTS_DATA: Post[] = ALL_BLOG_POSTS_WITH_CREATED;
let sortedPostsCache: Post[] | null = null;

// ----------------------------------------------------
// ฟังก์ชันเรียกใช้งาน Blog Posts
// ----------------------------------------------------

export async function getPosts(): Promise<Post[]> {
  if (!sortedPostsCache) {
    // 💡 Business Logic: กรองเฉพาะโพสต์ที่ถูกตั้งค่า isPublished เป็น true หรือไม่ได้กำหนด (ถือว่าเผยแพร่)
    const publishedPosts = POSTS_DATA.filter((post) => post.isPublished !== false);

    // เรียงลำดับตาม publishedAt
    // ✅ จัดรูปแบบการ Chain และ Sort ใหม่
    sortedPostsCache = publishedPosts
      .slice()
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }
  return sortedPostsCache;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = POSTS_DATA.find((p) => p.slug === slug);

  // 💡 Security/UX: ไม่ควรแสดงโพสต์ที่ isPublished เป็น false เมื่อเข้าดูหน้าเดี่ยว
  if (post && post.isPublished === false) {
    return null; // 404 Not Found
  }
  // ✅ จัดรูปแบบให้ถูกหลัก Prettier
  return post ? { ...post } : null;
}

export async function getPostSlugs(): Promise<string[]> {
  // 💡 Optimization: สำหรับ Static Generation ควรสร้างเฉพาะ Slug ของโพสต์ที่เผยแพร่แล้วเท่านั้น
  // ✅ จัดรูปแบบให้ถูกหลัก Prettier
  return POSTS_DATA.filter((post) => post.isPublished !== false).map((p) => p.slug);
}
