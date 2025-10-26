'use client';

import { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

const blogUrls = [
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog1.json',
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog2.json',
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog3.json',
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog4.json',
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog5.json',
  'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Blog/Blog6.json',
];

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const responses = await Promise.all(blogUrls.map((url) => fetch(url)));
        const jsonData = await Promise.all(
          responses.map(async (res) => {
            if (!res.ok) {
              console.warn(`⚠️ ไม่สามารถโหลด: ${res.url}`);
              return [];
            }
            try {
              const data = await res.json();
              return Array.isArray(data) ? data : [data];
            } catch {
              return [];
            }
          }),
        );
        const merged = jsonData.flat();
        const published = merged.filter((a) => a?.published !== false);
        setArticles(published);
      } catch (error) {
        setErrorMsg(error.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <p className="animate-pulse text-muted-foreground">⏳ กำลังโหลดบทความ...</p>;
    }

    if (errorMsg) {
      return <p className="text-destructive">❌ {errorMsg}</p>;
    }

    if (!articles.length) {
      return <p className="text-muted-foreground">🚫 ยังไม่มีบทความในขณะนี้</p>;
    }

    return (
      <div
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="รายการบทความ"
      >
        {articles.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return (
    <section
      aria-labelledby="blog-section-heading"
      className="mx-auto max-w-7xl px-4 py-20 text-foreground"
    >
      <h2 id="blog-section-heading" className="sr-only">
        รายการบทความ
      </h2>
      {renderContent()}
    </section>
  );
}
