import { getAllPosts } from '@/data/blog/all-posts';
import BlogCard from '@/components/Blog/BlogCard';
import { Database } from 'lucide-react';

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* 🛠️ Header Station */}
      <section className="border-b-4 border-slate-900 bg-white py-16">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="flex items-center gap-2 text-primary">
            <Database size={20} strokeWidth={3} />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em]">
              Central_Data_Vault
            </span>
          </div>
          <h1 className="mt-4 font-heading text-6xl font-black uppercase italic tracking-tighter text-slate-900 md:text-8xl">
            THE <span className="text-primary">BLOG</span>
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-xl font-bold uppercase text-slate-500">
            บันทึกปฏิบัติการ ข้อมูลทางเทคนิค และกลยุทธ์การจัดการเอกสารระดับสูง
          </p>
        </div>
      </section>

      {/* 🧩 Grid Station */}
      <section className="mx-auto max-w-[1440px] px-4 pt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
    /* ✅ แก้จาก </div> เป็น </main> เพื่อให้คู่กับ Tag เปิดด้านบน */
  );
}
