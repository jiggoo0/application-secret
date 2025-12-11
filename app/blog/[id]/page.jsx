// /app/blog/[id]/page.jsx

import Image from 'next/image';
import { notFound } from 'next/navigation';

// ฟังก์ชันดึงข้อมูลร่วมกัน (เพื่อลดความซ้ำซ้อน)
async function fetchBlogData(id) {
  try {
    const res = await fetch(
      `https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog${id}.json`,
      { next: { revalidate: 60 } }, // ISR: revalidate ทุก 60 วินาที
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const blog = Array.isArray(data) ? data[0] : data;
    // ตรวจสอบว่า blog เป็น object ที่มีข้อมูล
    return typeof blog === 'object' && blog !== null ? blog : null;
  } catch (err) {
    console.error('Error fetching blog data:', err);
    return null;
  }
}

// ✅ 1. สร้าง Dynamic Metadata
export async function generateMetadata({ params }) {
  const { id } = params;
  const blog = await fetchBlogData(id);

  if (!blog?.published) {
    return { title: 'บทความกำลังปรับปรุง | Dev Jp' };
  }

  // 💡 การแก้ไข SyntaxError: Bad escaped character in JSON
  // ใช้ Global RegExp constructor เพื่อให้การ Escape ชัดเจนยิ่งขึ้น
  // โดยการเปลี่ยน Backslash เดี่ยวที่มากับ Path (ถ้ามี) ให้เป็น Double Backslash สำหรับ JSON
  const safeImageUrl = blog.image
    ? String(blog.image).replace(new RegExp('\\\\', 'g'), '\\\\')
    : '/default-blog-image.jpg';

  return {
    title: blog.title || 'บทความใหม่ล่าสุด | Dev Jp',
    description: blog.summary || 'อัพเดทข้อมูลใหม่ ๆ จาก Dev Jp',
    openGraph: {
      images: [safeImageUrl],
    },
  };
}

// ✅ 2. สร้าง static params สำหรับ blog id (SSG)
export async function generateStaticParams() {
  const blogIds = [1, 2, 3, 4, 5, 6];
  return blogIds.map((id) => ({ id: id.toString() }));
}

// ✅ 3. หน้าแสดงรายละเอียดบทความ (ใช้ฟังก์ชัน fetchBlogData ซ้ำ)
export default async function BlogDetailPage({ params }) {
  const { id } = params;
  const blog = await fetchBlogData(id);

  if (!blog) {
    return notFound(); // ใช้ notFound() แทนการ return div
  }

  // ถ้าบทความยังไม่เผยแพร่
  if (!blog.published) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        ⏳ บทความนี้กำลังอยู่ระหว่างการปรับปรุง
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-foreground">{blog.title}</h1>

      {blog.image && (
        <div className="relative mb-6 h-72 w-full">
          {/* Note: src prop ใน Image component ของ Next.js ควรใช้ URL ที่ถูก Escape แล้ว */}
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="rounded-lg object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      <p className="text-muted-foreground">{blog.summary}</p>

      <div className="prose prose-lg mt-6 max-w-none dark:prose-invert">
        {Array.isArray(blog.content) &&
          blog.content.map((block, i) => {
            if (block.type === 'paragraph') {
              return <p key={i}>{block.text}</p>;
            }
            if (block.type === 'list' && Array.isArray(block.items)) {
              return (
                <ul key={i} className="list-disc pl-6">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
      </div>
    </article>
  );
}
