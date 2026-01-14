import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/mdx";
// ✅ แก้ไขการ Import: ใช้ Named Import { JsonLd } ให้ตรงกับที่แก้ไขในไฟล์ JsonLd.tsx
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDateThai } from "@/lib/utils";
import { Calendar, User, Tag } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * ✅ Metadata แบบ Type-safe สำหรับ Next.js 15
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | JP-VISOUL.DOCS`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image || "/images/blog-placeholder.jpg"],
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "JP-VISOUL"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  /**
   * ✅ เตรียมข้อมูล JSON-LD
   */
  const jsonLdData = {
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    author: post.author || "JP-VISOUL",
    description: post.excerpt,
    slug: slug, // ส่ง slug ไปด้วยเพื่อให้ JsonLd สร้าง mainEntityOfPage URL ได้ถูกต้อง
  };

  return (
    <main className="container max-w-4xl py-12">
      {/* ✅ เรียกใช้ JsonLd Component หลังจากแก้ปัญหา Import เรียบร้อยแล้ว */}
      <JsonLd data={jsonLdData} type="BlogPosting" />

      <article>
        {/* Meta ข้อมูลด้านบนบทความ */}
        <header className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-medium text-primary">
              <Tag size={16} />
              {post.category || "สาระน่ารู้"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={16} />
              {formatDateThai(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User size={16} />
              {post.author || "JP-VISOUL Team"}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* รูปภาพหน้าปก */}
        {post.image && (
          <div className="relative aspect-video overflow-hidden rounded-xl border bg-muted mb-10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* ✅ เนื้อหาบทความ (MDX Content) */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {/* หมายเหตุ: หากเนื้อหาเป็น HTML string ให้ใช้ dangerouslySetInnerHTML 
            หากเป็น Component จาก next-mdx-remote ให้เปลี่ยนการ Render ตรงนี้
          */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </main>
  );
}
