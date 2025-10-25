'use client';

import { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

const blogUrls = [
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog1.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog2.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog3.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog4.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog5.json',
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Blog%20/Blog6.json',
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
          responses.map((res) => {
            if (!res.ok) throw new Error(`โหลดข้อมูลล้มเหลว: ${res.url}`);
            return res.json();
          }),
        );
        const merged = jsonData.flat();
        const published = merged.filter((a) => a.published !== false);
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
      return (
        <p className="animate-pulse text-gray-500 dark:text-gray-400">⏳ กำลังโหลดบทความ...</p>
      );
    }

    if (errorMsg) {
      return <p className="text-red-600 dark:text-red-400">❌ {errorMsg}</p>;
    }

    if (!articles.length) {
      return <p className="text-gray-500 dark:text-gray-400">🚫 ยังไม่มีบทความในขณะนี้</p>;
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
      className="mx-auto max-w-7xl px-6 py-20 text-center"
    >
      <h2 id="blog-section-heading" className="sr-only">
        รายการบทความ
      </h2>
      {renderContent()}
    </section>
  );
}
