import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_PATH = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  content: string;
  slug: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_PATH)) return [];

  const files = fs.readdirSync(BLOG_PATH);

  return files
    .filter((file) => /\.(md|mdx)$/.test(file))
    .map((file) => {
      const filePath = path.join(BLOG_PATH, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug: file.replace(/\.mdx?$/, ""),
        content: content,
        title: data.title ?? "Untitled",
        date: data.date ?? new Date().toISOString(),
        excerpt: data.excerpt ?? "",
        image:
          data.image ??
          "https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Jpblog.png",
        author: data.author ?? "JP-VISOUL",
        category: data.category ?? "General",
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getAllPosts();
    return posts.find((p) => p.slug === slug) || null;
  } catch {
    return null;
  }
}
