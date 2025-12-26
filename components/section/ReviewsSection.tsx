/** @format */
"use client"

import React, { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import {
  Quote,
  ShieldCheck,
  Loader2,
  ThumbsUp,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  Database,
} from "lucide-react"

interface Review {
  id: string
  name: string
  photo?: string
  feedback: string
  createdAt: string
  likes: number
}

interface PaginationData {
  total: number
  page: number
  limit: number
  totalPages: number
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationData | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  const fetchReviews = useCallback(async (targetPage: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: targetPage.toString(),
        limit: "6",
      })
      const res = await fetch(`/api/reviews?${params.toString()}`)
      const data = await res.json()

      if (data?.success && Array.isArray(data.reviews)) {
        setReviews(data.reviews)
        setPagination(data.pagination ?? null)
      } else {
        setReviews([])
        setPagination(null)
      }
    } catch (error) {
      console.error("Review fetch failed:", error)
      setReviews([])
      setPagination(null)
    } finally {
      setTimeout(() => setLoading(false), 300)
    }
  }, [])

  useEffect(() => {
    if (isMounted) fetchReviews(page)
  }, [page, isMounted, fetchReviews])

  if (!isMounted) return <div className="min-h-[800px] bg-white opacity-0" />

  const totalPages = pagination?.totalPages || 1

  // Skeleton placeholder array
  const skeletons = Array.from({ length: 6 })

  return (
    <section
      className="relative overflow-hidden bg-white py-24 lg:py-32"
      id="success-logs"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 flex flex-col items-end justify-between border-b-2 border-slate-900 pb-12 md:flex-row">
          <div className="mb-8 md:mb-0">
            <div className="mb-4 flex items-center gap-3 text-blue-600">
              <ShieldCheck size={20} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                Verified_Client_Database
              </span>
            </div>
            <h2 className="text-6xl font-black uppercase leading-[0.85] tracking-tighter text-slate-900 md:text-8xl">
              SUCCESS <br />
              <span className="text-blue-600">LOGS.</span>
            </h2>
          </div>

          <div className="flex flex-col items-end text-right">
            <div className="mb-3 flex items-center gap-2">
              <Database size={14} className="text-slate-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Log_Registry_v8.0
              </span>
            </div>
            <div className="inline-flex items-center gap-3 bg-slate-900 px-4 py-2 text-[10px] font-black text-white shadow-2xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              PROTOCOL_LIVE_SYNC
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="relative min-h-[600px]">
          <div className="grid grid-cols-1 gap-px border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="flex animate-pulse flex-col gap-4 bg-white p-10"
                >
                  <div className="h-6 w-1/3 bg-slate-200" />
                  <div className="h-4 w-full bg-slate-100" />
                  <div className="h-4 w-full bg-slate-100" />
                  <div className="h-4 w-5/6 bg-slate-100" />
                  <div className="mt-auto flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-slate-200" />
                    <div className="flex flex-col gap-2">
                      <div className="h-3 w-20 bg-slate-200" />
                      <div className="h-2 w-16 bg-slate-100" />
                    </div>
                  </div>
                </div>
              ))
            ) : reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <div
                  key={review.id}
                  className="group relative flex flex-col overflow-hidden bg-white p-10 transition-all hover:bg-slate-50"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <span className="absolute -right-6 -top-4 select-none text-7xl font-black text-slate-50 transition-colors group-hover:text-blue-50/50">
                    #{review.id.slice(-4).toUpperCase()}
                  </span>

                  <div className="relative z-10 mb-8 flex items-center justify-between">
                    <div className="bg-slate-900 p-3 text-white transition-transform group-hover:rotate-12">
                      <Quote size={24} />
                    </div>
                    <div className="flex items-center gap-2 border border-blue-100 bg-blue-50 px-3 py-1 text-blue-600 shadow-sm">
                      <ThumbsUp size={12} fill="currentColor" />
                      <span className="text-[11px] font-black">
                        {review.likes.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="relative z-10 mb-12 text-[15px] font-bold italic leading-relaxed text-slate-600">
                    "{review.feedback}"
                  </p>

                  <div className="relative z-10 mt-auto flex items-center gap-4 border-t border-slate-100 pt-8">
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden border-2 border-slate-100 bg-slate-200 shadow-inner">
                      {review.photo ? (
                        <Image
                          src={review.photo}
                          alt={review.name}
                          fill
                          className="object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                          <User size={28} />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <h4 className="text-[13px] font-black uppercase tracking-tight text-slate-900">
                        {review.name}
                      </h4>
                      <div className="mt-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <Calendar size={12} className="text-blue-500" />
                        {new Date(review.createdAt).toLocaleDateString(
                          "th-TH",
                          { year: "numeric", month: "short", day: "numeric" }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex min-h-[400px] items-center justify-center text-lg font-bold uppercase text-slate-400">
                ไม่มีบันทึกความสำเร็จ
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t border-slate-100 pt-10 md:flex-row">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Registry_Page:{" "}
              <span className="text-slate-900">
                {page.toString().padStart(2, "0")}
              </span>
              / {totalPages.toString().padStart(2, "0")}
            </span>
            <div className="hidden h-1 w-24 bg-slate-100 md:block">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${(page / totalPages) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex w-full gap-4 md:w-auto">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1 || loading}
              className="flex flex-1 items-center justify-center gap-4 border-2 border-slate-900 px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-slate-900 hover:text-white disabled:opacity-10 disabled:grayscale md:flex-none"
            >
              <ChevronLeft size={18} /> PREV_LOGS
            </button>

            <button
              onClick={() => page < totalPages && setPage((prev) => prev + 1)}
              disabled={loading || page >= totalPages}
              className="flex flex-1 items-center justify-center gap-4 bg-slate-900 px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-2xl transition-all hover:bg-blue-600 active:scale-95 disabled:opacity-20 md:flex-none"
            >
              NEXT_LOGS <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
