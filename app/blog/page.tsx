import { getAllPosts, type BlogPost } from "@/lib/mdx"; // ✅ Import Type BlogPost มาใช้งาน
import Link from "next/link";
import Image from "next/image";
import { H1, Lead, P } from "@/components/ui/typography";
import { formatDateThai } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "บล็อกและสาระน่ารู้ | JP-VISOUL.DOCS",
  description:
    "รวมบทความเกี่ยวกับการขอวีซ่า การแปลเอกสาร และการจดทะเบียนธุรกิจที่คุณควรรู้ เพื่อการเตรียมตัวที่ถูกต้อง",
};

export default async function BlogListPage() {
  const posts = await getAllPosts();

  // ✅ จัดโครงสร้างข้อมูลสำหรับ SEO (Type-safe)
  const jsonLdData = {
    name: "JP-VISOUL Blog",
    description: metadata.description as string,
    posts: posts.map((post: BlogPost) => ({
      headline: post.title,
      datePublished: post.date,
      image: post.image || "/images/blog-placeholder.jpg",
      author: post.author || "JP-VISOUL Team",
      slug: post.slug,
    })),
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* ✅ ใส่ type="BlogPosting" เพื่อแก้ TS2741 */}
      <JsonLd data={jsonLdData} type="BlogPosting" />

      {/* Header Section */}
      <section className="bg-slate-50 pt-24 pb-16 md:pt-32 md:pb-24 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-secondary/10 text-secondary border-none hover:bg-secondary/10 px-4 py-1">
            Insight & Guide
          </Badge>
          <H1 className="mb-4 border-none p-0 text-4xl md:text-6xl font-black text-primary">
            สาระน่ารู้ & <span className="text-secondary">อัปเดต</span>
          </H1>
          <Lead className="max-w-2xl mx-auto text-slate-500">
            รวบรวมเทคนิคและข้อมูลสำคัญเกี่ยวกับการทำธุรกรรมต่างแดน
            เพื่อให้ทุกขั้นตอนของคุณเป็นเรื่องง่าย
          </Lead>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="container mx-auto px-4 py-16">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {/* ✅ เปลี่ยนจาก (post: any) เป็น (post: BlogPost) เพื่อแก้ Lint Error */}
            {posts.map((post: BlogPost) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-slate-100 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500 border border-slate-100">
                  <Image
                    src={post.image || "/images/blog-placeholder.jpg"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="space-y-3 flex-1 flex flex-col px-2">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="rounded-full border-slate-200 font-medium px-3 py-0.5 text-slate-600"
                    >
                      {post.category || "General"}
                    </Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Calendar size={14} className="text-secondary" />
                      {formatDateThai(post.date)}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold leading-tight text-primary group-hover:text-secondary transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <P className="text-slate-500 line-clamp-3 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </P>

                  <div className="mt-auto pt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:text-secondary transition-colors">
                    อ่านเนื้อหาฉบับเต็ม{" "}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <P className="text-slate-400">
              ขณะนี้ยังไม่มีบทความใหม่ ติดตามอัปเดตได้เร็วๆ นี้
            </P>
          </div>
        )}
      </section>
    </div>
  );
}
