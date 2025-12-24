'use client';

/**
 * 🏗️ JP-VISOUL: Blog Section (The Intelligence Feed)
 * Role: Displaying latest operational logs on the Landing Page.
 * Design: High-Contrast Industrial (Slate-900, hard shadows).
 */
import React from 'react';
import Link from 'next/link';
import { Database, ArrowRight, Activity } from 'lucide-react';
import BlogCard from './BlogCard';
import type { Post } from '@/types/blog';

interface BlogProps {
  posts: Post[];
  limit?: number;
}

export default function Blog({ posts = [], limit = 3 }: BlogProps) {
  // กรองเฉพาะบทความล่าสุดตามจำนวนที่กำหนด
  const featuredPosts = posts.slice(0, limit);

  return (
    <section className="relative w-full">
      {/* 🛠️ Section Header */}
      <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b-4 border-slate-900 pb-8 md:flex-row md:items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Activity size={16} strokeWidth={3} className="animate-pulse" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em]">
              Intelligence_Feed
            </span>
          </div>
          <h2 className="font-heading text-5xl font-black uppercase italic tracking-tighter text-slate-900 md:text-6xl">
            LATEST <span className="text-primary">LOGS</span>
          </h2>
          <p className="max-w-md font-sans text-sm font-bold uppercase text-slate-400">
            วิเคราะห์กลยุทธ์และอัปเดตสถานะการดำเนินงานล่าสุดจากหน่วยปฏิบัติการ
          </p>
        </div>

        {/* View All Button (Vault Access) */}
        <Link
          href="/blog"
          className="group flex items-center gap-3 border-4 border-slate-900 bg-white px-8 py-4 font-heading text-sm font-black uppercase italic tracking-widest text-slate-900 shadow-neo-sm transition-all hover:-translate-x-1 hover:-translate-y-1 hover:bg-slate-900 hover:text-white hover:shadow-neo active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          Access_Full_Vault
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 🧩 Intelligence Grid */}
      {featuredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post, idx) => (
            <div
              key={post.slug}
              className={idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''} // ปรับให้ใบที่ 3 เต็มความกว้างบน Tablet
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        /* ⚠️ Empty State */
        <div className="flex h-64 flex-col items-center justify-center border-4 border-dashed border-slate-200 bg-slate-50">
          <Database size={40} className="mb-4 text-slate-200" />
          <p className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
            {'//'} NO_LOGS_SYNCED_IN_THIS_SECTOR {'//'}
          </p>
        </div>
      )}

      {/* 📊 System Footer Decor */}
      <div className="mt-12 flex items-center gap-4 opacity-20">
        <div className="h-[2px] flex-grow bg-slate-900" />
        <span className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-900">
          JP_VISOUL_DATA_ENCRYPTION_ACTIVE
        </span>
        <div className="h-[2px] w-24 bg-slate-900" />
      </div>
    </section>
  );
}
