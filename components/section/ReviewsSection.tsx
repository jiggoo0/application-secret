/** @format */
"use client"

import React, { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import {
  Quote,
  ShieldCheck,
  ThumbsUp,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  Database,
  Activity,
} from "lucide-react"
import { siteConfig } from "@/config/site"

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

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const fetchReviews = useCallback(async (targetPage: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: targetPage.toString(),
        limit: "6",
      })
      const res = await fetch(`/api/reviews?${params.toString()}`)

      if (!res.ok) throw new Error("Network response was not ok")

      const data = await res.json()

      if (data?.success && Array.isArray(data.reviews)) {
        setReviews(data.reviews)
        setPagination(data.pagination ?? null)
      } else {
        setReviews([])
      }
    } catch (error) {
      console.error("[SYSTEM_ERROR]: Review fetch failed:", error)
      setReviews([])
    } finally {
      // หน่วงเวลาเล็กน้อยเพื่อให้ Animation ของระบบดูสมูท
      setTimeout(() => setLoading(false), 400)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      fetchReviews(page)
    }
  }, [page, isMounted, fetchReviews])

  if (!isMounted) return null

  const totalPages = pagination?.totalPages || 1
  const skeletons = Array.from({ length: 6 })

  return (
    <section
      className="relative overflow-hidden bg-white py-24 lg:py-32"
      id="success-logs"
    >
      {/* 🧩 BACKGROUND_GRID: ลายเส้นพิมพ์เขียวจางๆ */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.2]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* ─── HEADER_LOGS ─── */}
        <div className="mb-20 flex flex-col items-end justify-between border-b-4 border-slate-900 pb-12 md:flex-row">
          <div className="mb-8 md:mb-0">
            <div className="mb-4 flex items-center gap-3 text-blue-600">
              <ShieldCheck size={18} className="animate-pulse" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em]">
                Verified_Client_Database
              </span>
            </div>
            <h2 className="text-7xl font-black uppercase leading-[0.8] tracking-tighter text-slate-900 md:text-9xl">
              SUCCESS <br />
              <span className="text-blue-600">
                LOGS<span className="text-slate-900">.</span>
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-end text-right">
            <div className="mb-4 flex items-center gap-2">
              <Database size={14} className="text-slate-400" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Registry_{siteConfig.system.version}
              </span>
            </div>
            <div className="inline-flex items-center gap-4 bg-slate-900 px-6 py-3 text-[10px] font-black text-white shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
              <Activity size={14} className="text-blue-500" />
              PROTOCOL_LIVE_SYNC
            </div>
          </div>
        </div>

        {/* ─── DATA_GRID ─── */}
        <div className="relative min-h-[600px]">
          <div className="grid grid-cols-1 gap-px border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="flex animate-pulse flex-col bg-white p-10"
                >
                  <div className="mb-8 h-12 w-12 bg-slate-100" />
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-slate-100" />
                    <div className="h-4 w-5/6 bg-slate-100" />
                  </div>
                  <div className="mt-auto flex items-center gap-4 pt-8">
                    <div className="h-14 w-14 rounded-none bg-slate-100" />
                    <div className="space-y-2">
                      <div className="h-3 w-24 bg-slate-100" />
                      <div className="h-2 w-16 bg-slate-50" />
                    </div>
                  </div>
                </div>
              ))
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="group relative flex flex-col bg-white p-10 transition-all hover:bg-slate-50/80"
                >
                  {/* Case_ID Badge */}
                  <span className="absolute -right-2 top-0 select-none font-mono text-6xl font-black text-slate-50 transition-colors group-hover:text-blue-50">
                    {review.id.slice(-3).toUpperCase()}
                  </span>

                  <div className="relative z-10 mb-8 flex items-center justify-between">
                    <div className="bg-slate-900 p-3 text-blue-500 shadow-lg transition-transform group-hover:scale-110">
                      <Quote size={20} fill="currentColor" />
                    </div>
                    <div className="flex items-center gap-2 border border-slate-200 bg-white px-3 py-1 text-slate-900">
                      <ThumbsUp size={12} className="text-blue-600" />
                      <span className="font-mono text-[11px] font-black">
                        {review.likes}
                      </span>
                    </div>
                  </div>

                  <p className="relative z-10 mb-12 text-[15px] font-bold leading-relaxed text-slate-600">
                    "{review.feedback}"
                  </p>

                  <div className="relative z-10 mt-auto flex items-center gap-4 border-t border-dashed border-slate-200 pt-8">
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden border border-slate-200 bg-slate-100">
                      {review.photo ? (
                        <Image
                          src={review.photo}
                          alt={review.name}
                          fill
                          className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-300">
                          <User size={24} />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <h4 className="text-[13px] font-black uppercase tracking-tight text-slate-900">
                        {review.name}
                      </h4>
                      <div className="mt-1 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        <Calendar size={10} className="text-blue-500" />
                        {new Date(review.createdAt).toLocaleDateString("th-TH")}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex min-h-[400px] flex-col items-center justify-center bg-white text-slate-400">
                <Database size={40} className="mb-4 opacity-20" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em]">
                  No_Records_Found_In_Registry
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ─── PAGINATION_SYSTEM ─── */}
        <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t-2 border-slate-100 pt-10 md:flex-row">
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Registry_Page:{" "}
              <span className="text-slate-900">
                {page.toString().padStart(2, "0")}
              </span>
              / {totalPages.toString().padStart(2, "0")}
            </span>
            <div className="hidden h-1.5 w-32 bg-slate-100 md:block">
              <div
                className="h-full bg-blue-600 transition-all duration-700"
                style={{ width: `${(page / totalPages) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex w-full gap-4 md:w-auto">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1 || loading}
              className="flex flex-1 items-center justify-center gap-4 border-2 border-slate-900 px-8 py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-slate-900 hover:text-white disabled:opacity-20 md:flex-none"
            >
              <ChevronLeft size={16} /> PREV_LOGS
            </button>

            <button
              onClick={() => page < totalPages && setPage((prev) => prev + 1)}
              disabled={loading || page >= totalPages}
              className="flex flex-1 items-center justify-center gap-4 bg-slate-900 px-8 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-xl transition-all hover:bg-blue-600 disabled:opacity-20 md:flex-none"
            >
              NEXT_LOGS <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
