import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_PATH = path.join(process.cwd(), "content/blog");

// 1. กำหนด Interface สำหรับ Post เพื่อแก้ปัญหา Property 'title' does not exist
export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  author?: string;
  category?: string;
  content: string;
  slug: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_PATH)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_PATH);

  const posts = files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(BLOG_PATH, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");

      const { data, content } = matter(fileContent);

      // 2. Return ข้อมูลพร้อมการทำ Type Assertion
      return {
        slug: file.replace(/\.mdx?$/, ""),
        content: content,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        image: data.image || "/images/blog-placeholder.jpg",
        author: data.author || "JP-VISOUL",
        category: data.category || "สาระน่ารู้",
        ...data, // กระจาย data อื่นๆ ถ้ามี
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getAllPosts();
    return posts.find((p) => p.slug === slug) || null;
  } catch {
    return null;
  }
}
