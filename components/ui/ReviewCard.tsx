'use client';

/**
 * 🏗️ JP-VISOUL: Review Card Component
 * Design: Industrial Neobrutalism (0px radius, Hard shadows)
 * Standard: Client Verification Logs
 */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getLikes, incrementLikes } from '@/lib/fakereview/likes';
import { ThumbsUp, MessageSquare, Share2, ShieldCheck, Clock } from 'lucide-react';

// ✅ Fixed: ลบ 'key' ออกจาก Interface เพื่อให้ผ่าน p type-check
export interface ReviewCardProps {
  id: string; // ใช้สำหรับ Logic การ Like
  name?: string;
  photo?: string;
  feedback?: string;
  createdAt?: string;
  likes?: number;
  likerName?: string;
}

const fallbackSrc = '/images/default-avatar.webp';

export default function ReviewCard({
  id,
  name = 'Anonymous_User',
  photo,
  feedback = 'No_Feedback_Provided',
  createdAt,
  likes = 1,
}: ReviewCardProps) {
  const imgSrc = typeof photo === 'string' && photo.trim() ? photo : fallbackSrc;
  const displayName = name?.trim() || 'Anonymous_User';

  // 📅 Format Date: 24 DEC 2025
  const displayDate = createdAt
    ? new Date(createdAt)
        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        .toUpperCase()
    : 'UNKNOWN_DATE';

  const [likeCount, setLikeCount] = useState(likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLikes = getLikes(id);
    if (storedLikes > likes) {
      setLikeCount(storedLikes);
      setHasLiked(true);
    }
  }, [id, likes]);

  const handleLike = () => {
    if (hasLiked) return;
    const updatedLikes = incrementLikes(id);
    setLikeCount(updatedLikes);
    setHasLiked(true);
  };

  const likeStatus = mounted ? `${likeCount.toLocaleString()} VERIFICATIONS` : 'SYNCING...';

  return (
    <article
      aria-label={`Report from ${displayName}`}
      className="group relative flex flex-col border-2 border-slate-900 bg-white p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]"
    >
      {/* 🛠️ Header: User Spec */}
      <header className="mb-4 flex items-center justify-between border-b-2 border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden border-2 border-slate-900 bg-slate-100 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            <Image
              src={imgSrc}
              alt={displayName}
              fill
              sizes="48px"
              className="object-cover grayscale transition-all group-hover:grayscale-0"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-sm font-black uppercase italic leading-tight tracking-tighter text-slate-900">
              {displayName}
            </span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock size={10} strokeWidth={3} />
              <time className="font-mono text-[9px] font-bold tracking-widest" dateTime={createdAt}>
                {displayDate}
              </time>
            </div>
          </div>
        </div>
        <ShieldCheck
          size={18}
          className="text-primary opacity-30 transition-opacity group-hover:opacity-100"
        />
      </header>

      {/* 💬 Feedback Body */}
      <div className="relative mb-6">
        <span className="absolute -left-2 -top-2 select-none font-serif text-4xl font-black leading-none text-slate-100">
          “
        </span>
        <p className="relative z-10 font-sans text-sm font-bold italic leading-relaxed text-slate-700">
          {feedback}
        </p>
      </div>

      {/* 📊 Metrics Bar */}
      <div className="mb-4 flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse bg-primary" />
        <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
          {likeStatus}
        </span>
      </div>

      {/* 🧩 Console Actions */}
      <div className="mt-auto grid grid-cols-3 gap-2 border-t-2 border-slate-900 pt-4">
        <button
          type="button"
          onClick={handleLike}
          disabled={hasLiked}
          className={`flex items-center justify-center gap-2 border-2 border-slate-900 py-2 text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
            hasLiked ? 'bg-primary text-slate-900' : 'bg-white text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ThumbsUp size={14} strokeWidth={3} className={hasLiked ? 'fill-slate-900' : ''} />
          {hasLiked ? 'DONE' : 'VERIFY'}
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 border-2 border-slate-900 bg-white py-2 text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          <MessageSquare size={14} strokeWidth={3} />
          LOGS
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 border-2 border-slate-900 bg-white py-2 text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          <Share2 size={14} strokeWidth={3} />
          PUSH
        </button>
      </div>
    </article>
  );
}
