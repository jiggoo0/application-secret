// lib/blog.ts
// ----------------------------------------------------
// 🏗️ JP-VISOUL: Blog Data Processor
// Role: จัดการข้อมูลบทความ (Vault Operations)
// ----------------------------------------------------

import { getAllPosts } from '@/data/blog/all-posts';
import type { Post } from '@/types/blog'; // ✅ นำมาประกาศใช้ด้านล่างเพื่อเคลียร์ Warning

/**
 * 🔍 ดึงบทความทั้งหมดและจัดลำดับตามเวลาล่าสุด
 * ✅ ปรับปรุง: ระบุ Return Type เป็น Array ของ Post (ที่มีคีย์ date เพิ่ม)
 */
export async function getSortedPostsData(): Promise<(Post & { date: string })[]> {
  try {
    const allPosts = await getAllPosts();

    if (!Array.isArray(allPosts)) return [];

    // Map ข้อมูลเพื่อสร้างคีย์ 'date' ให้ Component ใช้งาน
    const postsWithDate = allPosts.map((post: Post) => ({
      ...post,
      date: post.publishedAt || post.createdAt || 'UNKNOWN_DATE',
    }));

    return postsWithDate.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error('[Vault_Error] Failed to fetch and sort logs:', error);
    return [];
  }
}

/**
 * ⚡ ดึงบทความล่าสุดตามจำนวนที่ระบุ
 */
export async function getLatestPosts(limit: number = 3) {
  const sortedPosts = await getSortedPostsData();
  return sortedPosts.slice(0, limit);
}

/**
 * 📄 ดึงข้อมูลบทความรายชิ้นตาม Slug
 */
export async function getPostData(slug: string): Promise<(Post & { date: string }) | undefined> {
  const allPosts = await getAllPosts();
  const post = allPosts.find((p: Post) => p.slug === slug);

  if (!post) return undefined;

  return {
    ...post,
    date: post.publishedAt || post.createdAt || 'UNKNOWN_DATE',
  };
}
