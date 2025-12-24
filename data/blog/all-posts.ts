// data/blog/all-posts.ts

import { POSTS1 } from './posts1';
import { POSTS2 } from './posts2';
import { POSTS3 } from './posts3';
import { POSTS4 } from './posts4';
import { POSTS5 } from './posts5';
import { POSTS6 } from './posts6';
import type { Post } from '@/types/blog';

export const ALL_BLOG_POSTS: Post[] = [
  ...POSTS1,
  ...POSTS2,
  ...POSTS3,
  ...POSTS4,
  ...POSTS5,
  ...POSTS6,
];

// --- เพิ่มส่วนนี้เข้าไปครับ ---

/**
 * ✅ ฟังก์ชันสำหรับดึงบทความทั้งหมด
 * เพื่อให้ตรงกับที่เรียกใช้ใน app/page.tsx และ app/blog/page.tsx
 */
export async function getAllPosts(): Promise<Post[]> {
  // ส่งข้อมูลที่รวมแล้วออกไป
  return ALL_BLOG_POSTS;
}

/**
 * ✅ ฟังก์ชันสำหรับดึงบทความตาม Slug (สำหรับหน้า [slug]/page.tsx)
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return ALL_BLOG_POSTS.find((post) => post.slug === slug);
}
