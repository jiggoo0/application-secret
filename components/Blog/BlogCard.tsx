'use client';

/**
 * 🏗️ JP-VISOUL: BlogCard Component
 * Design: Industrial Neobrutalism (0px radius, Slate-900 borders)
 * Update: Added safety checks for 'date' and 'excerpt' to prevent build errors.
 */

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Calendar } from 'lucide-react';
import type { Post } from '@/types/blog';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  // 🛡️ Safety Check: ป้องกัน Error กรณีข้อมูล date หรือ slug หาย
  const formattedDate = post?.date ? post.date.replace(/-/g, '_') : 'UNKNOWN_TIMESTAMP';

  const postSlug = post?.slug || '#';

  return (
    <Link
      href={`/blog/${postSlug}`}
      className="group relative flex h-full flex-col border-4 border-slate-900 bg-white p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
    >
      {/* 🛠️ Card Header: Status & Icon */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse bg-primary" />
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
            LOG_{formattedDate}
          </span>
        </div>
        <div className="flex h-10 w-10 items-center justify-center border-2 border-slate-900 bg-slate-50 text-slate-900 transition-colors group-hover:bg-primary group-hover:text-slate-900">
          <ArrowUpRight size={20} strokeWidth={3} />
        </div>
      </div>

      {/* 📄 Content Area */}
      <div className="flex-grow space-y-4">
        <h3 className="font-heading text-2xl font-black uppercase italic tracking-tighter text-slate-900 transition-colors group-hover:text-blue-600 md:text-3xl">
          {post?.title || 'UNTITLED_OPERATIONAL_LOG'}
        </h3>

        <p className="line-clamp-3 font-sans text-sm font-bold uppercase leading-relaxed text-slate-500">
          {post?.excerpt || 'No description provided for this operational entry.'}
        </p>
      </div>

      {/* 🏷️ Card Footer: Metadata */}
      <div className="mt-8 flex items-center justify-between border-t-2 border-slate-100 pt-6">
        <div className="flex items-center gap-2 border-2 border-slate-900 bg-slate-900 px-3 py-1 text-white">
          <span className="font-mono text-[9px] font-black uppercase tracking-widest">
            CAT: {post?.category || 'GENERAL'}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[9px] font-black uppercase text-slate-400">
          <Calendar size={12} />
          {post?.date || 'N/A'}
        </div>
      </div>

      {/* 🏭 Industrial Decor */}
      <div className="absolute bottom-0 right-0 h-1 w-1/3 bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}
