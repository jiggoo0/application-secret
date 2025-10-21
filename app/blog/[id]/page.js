import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const FALLBACK_IMAGE = '/images/placeholder.webp';
const blogUrls = [
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog1.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog2.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog3.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog4.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog5.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog6.json',
];

// โหลดบทความทั้งหมด
async function getAllArticles() {
  const responses = await Promise.all(blogUrls.map((url) => fetch(url)));
  const jsonData = await Promise.all(
    responses.map((res) => {
      if (!res.ok) throw new Error(`โหลดข้อมูลล้มเหลว: ${res.url}`);
      return res.json();
    }),
  );
  return jsonData.flat().filter((article) => article?.published !== false);
}

// สร้าง static params
export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ id: article.id }));
}

// แสดงบทความตาม id
export default async function BlogPage({ params }) {
  const id = params.id; // ✅ ใช้ params.id แบบตรง ๆ
  const articles = await getAllArticles();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <section className="px-6 py-20 text-center text-red-600 dark:text-red-400">
        <h1 className="text-2xl font-bold">❌ ไม่พบบทความ</h1>
        <p>บทความที่คุณค้นหาอาจถูกลบหรือยังไม่เผยแพร่</p>
      </section>
    );
  }

  const { title, image, summary, content } = article;

  return (
    <section className="mx-auto max-w-4xl space-y-8 px-6 py-20">
      <h1 className="text-center text-3xl font-bold text-black dark:text-white">{title}</h1>

      <div className="relative h-64 w-full overflow-hidden rounded-lg">
        <Image
          src={image?.startsWith('/') ? image : image || FALLBACK_IMAGE}
          alt={`ภาพประกอบบทความ: ${title}`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {summary && <p className="text-center text-lg text-gray-700 dark:text-gray-300">{summary}</p>}

      <article className="space-y-6 text-left leading-relaxed text-gray-800 dark:text-gray-300">
        {Array.isArray(content) &&
          content.map((block, index) => {
            if (!block || typeof block !== 'object') return null;

            switch (block.type) {
              case 'heading':
                return (
                  <h2
                    key={index}
                    className="mb-3 mt-10 text-xl font-semibold text-black dark:text-white"
                  >
                    {block.text}
                  </h2>
                );
              case 'paragraph':
                return <p key={index}>{block.text}</p>;
              case 'separator':
                return <hr key={index} className="my-8 border-gray-300 dark:border-gray-700" />;
              case 'list':
                return (
                  <ul key={index} className="list-disc space-y-1 pl-6">
                    {block.items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              case 'numbered-list':
                return (
                  <ol key={index} className="list-decimal space-y-1 pl-6">
                    {block.items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                );
              default:
                return null;
            }
          })}
      </article>

      <div className="pt-8 text-center">
        <Link href="/blog" className="inline-block">
          <Button className="w-full sm:w-auto">← กลับไปหน้าบทความทั้งหมด</Button>
        </Link>
      </div>
    </section>
  );
}
