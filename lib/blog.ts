import type { Post } from '@/types/blog';
import { ALL_BLOG_POSTS } from '@/data/blog/posts';

// ----------------------------------------------------
// Cache และข้อมูลต้นฉบับ
// ----------------------------------------------------
const POSTS_DATA: Post[] = ALL_BLOG_POSTS.map((post) => ({
  ...post,
  createdAt: (post as any).createdAt ?? post.publishedAt, // เติม createdAt ถ้าไม่มี
}));

let sortedPostsCache: Post[] | null = null;

// ----------------------------------------------------
// ฟังก์ชันเรียกใช้งาน Blog Posts
// ----------------------------------------------------

export async function getPosts(): Promise<Post[]> {
  if (!sortedPostsCache) {
    sortedPostsCache = [...POSTS_DATA].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }
  return sortedPostsCache;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = POSTS_DATA.find((p) => p.slug === slug);
  return post ? { ...post } : null;
}

export async function getPostSlugs(): Promise<string[]> {
  return POSTS_DATA.map((p) => p.slug);
}
