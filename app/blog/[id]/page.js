import Image from 'next/image';

// ✅ สร้าง static params สำหรับ blog id (SSG)
export async function generateStaticParams() {
  const blogIds = [1, 2, 3, 4, 5, 6];
  return blogIds.map((id) => ({ id: id.toString() }));
}

// ✅ หน้าแสดงรายละเอียดบทความ
export default async function BlogDetailPage({ params }) {
  const { id } = params; // ไม่ต้อง await

  let blog;
  try {
    const res = await fetch(
      `https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog${id}.json`,
      { next: { revalidate: 60 } }, // ISR: revalidate ทุก 60 วินาที
    );

    if (!res.ok) {
      return <div className="py-10 text-center text-destructive">❌ ไม่สามารถโหลดบทความได้</div>;
    }

    const data = await res.json();
    blog = Array.isArray(data) ? data[0] : data;
  } catch (err) {
    console.error(err);
    return (
      <div className="py-10 text-center text-destructive">❌ เกิดข้อผิดพลาดในการโหลดบทความ</div>
    );
  }

  // ถ้าบทความยังไม่เผยแพร่
  if (!blog?.published) {
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
