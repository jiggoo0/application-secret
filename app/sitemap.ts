import { MetadataRoute } from "next";
import { SERVICES } from "@/constants/services-data";
// สมมติว่าคุณมีฟังก์ชันดึงบทความจาก MDX
// import { getAllPosts } from "@/lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://jpvisouldocs.online";

  // 1. หน้าหลัก (Static Routes)
  const staticRoutes = ["", "/services", "/blog", "/about", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  );

  // 2. หน้าบริการทั้งหมด (Dynamic Routes จาก constants)
  const serviceRoutes = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  /** * 3. หน้าบทความ (Dynamic Routes จาก MDX/Database)
   * ปลดคอมเมนต์เมื่อคุณพร้อมใช้งานส่วน Blog
   */
  /*
  const posts = await getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  */

  return [...staticRoutes, ...serviceRoutes];
}
