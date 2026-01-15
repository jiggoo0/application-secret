import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";
import { getAllPosts } from "@/lib/mdx";

/**
 * BlogSection – JP-VISOUL (Production Ready)
 * บทความ = Trust Signal + SEO Asset
 */
export default async function BlogSection() {
  const posts = await getAllPosts();
  const featuredPosts = posts?.slice(0, 3) ?? [];

  if (featuredPosts.length === 0) return null;

  return (
    <section className="relative bg-slate-50 py-24">
      <div className="container mx-auto px-4">
        {/* ================= Header ================= */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              <Icons.book className="h-4 w-4" />
              Knowledge Base
            </span>

            <h2 className="text-3xl font-black tracking-tight text-[#0A192F] md:text-4xl">
              บทความและองค์ความรู้
            </h2>

            <p className="text-base font-medium leading-relaxed text-slate-600">
              รวมบทความเชิงลึกด้านเอกสาร วีซ่า และการวางโครงสร้างทางการเงิน
              เพื่อช่วยให้คุณตัดสินใจได้อย่างมั่นใจ
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-11 px-6 text-sm font-bold"
          >
            <Link href="/blog" className="flex items-center gap-2">
              ดูบทความทั้งหมด
              <Icons.arrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* ================= Articles ================= */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-lg"
            >
              {/* Image */}
              <Link
                href={`/blog/${post.slug}`}
                className="relative h-[220px] w-full overflow-hidden"
              >
                <Image
                  src={post.image || "/images/blog/Jpblog.webp"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Link>

              {/* Content */}
              <div className="flex flex-grow flex-col p-6">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Icons.calendar className="h-4 w-4" />
                  <span>{post.date ?? "—"}</span>
                </div>

                <h3 className="mb-3 text-lg font-bold leading-snug text-[#0A192F] transition-colors group-hover:text-blue-600">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="mb-6 line-clamp-3 text-sm font-medium leading-relaxed text-slate-600">
                  {post.excerpt ?? "อ่านรายละเอียดเพิ่มเติมในบทความ"}
                </p>

                <div className="mt-auto pt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline"
                  >
                    อ่านเพิ่มเติม
                    <Icons.arrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <div className="mt-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-14 text-center shadow-lg md:px-12">
          <p className="mb-3 text-lg font-bold tracking-tight text-white">
            ต้องการคำแนะนำที่เหมาะกับกรณีของคุณโดยเฉพาะ?
          </p>

          <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-blue-100">
            ทีมที่ปรึกษาของเราพร้อมช่วยวิเคราะห์และวางแนวทาง
            ให้เอกสารและขั้นตอนของคุณถูกต้องตั้งแต่ต้น
          </p>

          <Button
            asChild
            size="lg"
            className="rounded-full bg-white px-10 font-bold text-blue-700 shadow-md transition-all hover:bg-blue-50 hover:shadow-lg"
          >
            <Link href="/contact" className="flex items-center gap-2">
              ขอรับคำปรึกษาจากผู้เชี่ยวชาญ
              <Icons.arrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
