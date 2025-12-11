// app/works/page.jsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FileText, ImageIcon, ExternalLink } from 'lucide-react';

export default function WorksPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const res = await fetch('/api/works');
        if (!res.ok) throw new Error(`โหลดข้อมูลล้มเหลว (${res.status})`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('[WorksPage] ❌ Fetch documents failed:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDocuments();
  }, []);

  if (loading)
    return <p className="mt-10 text-center text-gray-600 dark:text-gray-400">กำลังโหลดข้อมูล...</p>;

  if (!items.length)
    return <p className="mt-10 text-center text-gray-600 dark:text-gray-400">ไม่มีข้อมูลให้แสดง</p>;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">📄 ตัวอย่างเอกสารทั้งหมด</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          แสดงไฟล์และเอกสารทั้งหมดจากระบบจัดเก็บของคุณ
        </p>
      </header>

      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, idx) => {
          const url = typeof item === 'string' ? item : item.url;
          // FIX: Escape backslash for dot (.) in regex pattern to prevent JSON serialization error
          const isImage = /\\.(jpg|jpeg|png|gif|webp)$/i.test(url);
          const fileName = decodeURIComponent(url.split('/').pop());
          return (
            <article
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="relative h-80 w-full bg-gray-100 dark:bg-gray-800">
                {isImage ? (
                  <Image
                    src={url}
                    alt={fileName}
                    fill
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <FileText className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
                    {fileName}
                  </h2>
                  {isImage ? (
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FileText className="h-5 w-5 text-gray-400" />
                  )}
                </div>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
                >
                  <ExternalLink className="h-4 w-4" />
                  เปิดดู
                </a>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
