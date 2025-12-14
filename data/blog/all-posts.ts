// data/blog/all-posts.ts

// สมมติว่าไฟล์ postsX.ts ถูกแก้ไขให้ใช้ featuredImage แทน imageUrl แล้ว
import { POSTS1 } from './posts1';
import { POSTS2 } from './posts2';
import { POSTS3 } from './posts3';
import { POSTS4 } from './posts4';
import { POSTS5 } from './posts5';
import { POSTS6 } from './posts6';
import type { Post } from '@/types/blog';

// ----------------------------------------------------
// รวมทุกโพสต์
// ----------------------------------------------------
export const ALL_BLOG_POSTS: Post[] = [
  ...POSTS1,
  ...POSTS2,
  ...POSTS3,
  ...POSTS4,
  ...POSTS5,
  ...POSTS6,
];

// ----------------------------------------------------
// Option: เพิ่ม field createdAt ถ้าไม่มี (ใช้งานได้ตามเดิม)
// ----------------------------------------------------
export const ALL_BLOG_POSTS_WITH_CREATED: Post[] = ALL_BLOG_POSTS.map((post) => ({
  ...post,
  // 💡 ใช้ nullish coalescing operator (??) เพื่อให้โค้ดกระชับ
  createdAt: post.createdAt ?? post.publishedAt,
}));
