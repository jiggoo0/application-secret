// app/blog/[slug]/page.tsx
// ----------------------------------------------------
// 🏗️ JP-VISOUL: Operational Log Detail (Static)
// บทความระดับ High-Fidelity ที่ถูก Pre-render ล่วงหน้า
// ----------------------------------------------------

import { getAllPosts, getPostBySlug } from '@/data/blog/all-posts';
import { notFound } from 'next/navigation';
import { ChevronLeft, User, ShieldAlert, Clock } from 'lucide-react'; // ลบ Calendar ออก
import Link from 'next/link';

/**
 * ⚡ 1. Generate Static Params
 */
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * 🚀 2. Main Detail Component
 */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen bg-white pb-24 selection:bg-yellow-400 selection:text-black">
      {/* 🧭 Sticky Nav */}
      <nav className="sticky top-0 z-50 border-b-2 border-slate-900 bg-white/90 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest text-slate-900 transition-colors hover:text-blue-600"
          >
            <ChevronLeft
              size={14}
              strokeWidth={3}
              className="transition-transform group-hover:-translate-x-1"
            />
            Return_to_Vault
          </Link>
        </div>
      </nav>

      {/* 📑 Header Station */}
      <header className="border-b-4 border-slate-900 bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center md:text-left">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex-grow space-y-6">
              <span className="inline-block border-2 border-slate-900 bg-yellow-400 px-3 py-1 font-mono text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                {post.category || 'LOG_FILE'}
              </span>
              <h1 className="font-heading text-4xl font-black uppercase italic leading-[0.95] tracking-tighter text-slate-900 md:text-7xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap justify-center gap-6 border-t-2 border-slate-200 pt-8 font-mono text-[10px] font-black uppercase text-slate-400 md:justify-start">
                {/* ✅ แก้จาก post.date เป็น post.publishedAt หรือ post.date (ถ้าทำ Alias แล้ว) */}
                <div className="flex items-center gap-2 text-slate-900">
                  <Clock size={14} /> {post.publishedAt}
                </div>
                <div className="flex items-center gap-2">
                  <User size={14} /> AUTHOR: {post.author || 'JP_STAFF'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 🔌 Intelligence Content Area */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="space-y-8">
          {Array.isArray(post.content) ? (
            post.content.map((block: any, index: number) => {
              switch (block.type) {
                case 'heading-2':
                  return (
                    <h2
                      key={index}
                      className="mt-14 font-heading text-3xl font-black uppercase italic tracking-tighter text-slate-900 md:text-4xl"
                    >
                      <span className="mr-3 text-blue-600">#</span> {block.text}
                    </h2>
                  );
                case 'paragraph':
                  return (
                    <p
                      key={index}
                      className="font-sans text-lg font-bold leading-relaxed text-slate-700 md:text-xl md:leading-loose"
                    >
                      {block.text}
                    </p>
                  );
                default:
                  return null;
              }
            })
          ) : (
            <p className="font-sans text-lg font-bold leading-relaxed text-slate-700 md:text-xl">
              {String(post.content)}
            </p>
          )}
        </div>

        {/* 🛡️ Secure Footer */}
        <div className="mt-24 border-4 border-slate-900 bg-slate-900 p-8 text-white shadow-[12px_12px_0px_0px_rgba(251,191,36,1)]">
          <div className="mb-4 flex items-center gap-3">
            <ShieldAlert size={28} className="text-primary" />
            <span className="font-mono text-xs font-black uppercase tracking-[0.4em] text-primary">
              END_OF_TRANSMISSION
            </span>
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-slate-400">
            ระบบความปลอดภัยขั้นสูง: ข้อมูลนี้ถูกดึงมาจาก Central Data Vault ของ JP-VISOUL
            ห้ามส่งต่อหรือดัดแปลงโดยมิได้รับอนุญาตเป็นลายลักษณ์อักษร
          </p>
        </div>
      </section>
    </article>
  );
}
