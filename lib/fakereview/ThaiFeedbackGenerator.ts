/** @format */
import * as Papa from "papaparse"
import { supabaseServer } from "@/lib/supabase/server"
import { v4 as uuidv4 } from "uuid"
import { getRealisticLikes } from "./likes"
import { getRandomDate } from "./utils"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const FALLBACK_PHOTO = `${SUPABASE_URL}/storage/v1/object/public/user-uploads/Fakereview/default-avatar.webp`
const BUCKET_NAME = "user-uploads"

// ---------------------------
// 1. INTERFACES
// ---------------------------
interface FirstNameRow {
  name: string
  gender: string
}
interface LastNameRow {
  name: string
}
interface CommentRow {
  comment: string
}

export interface FakeReview {
  id: string
  name: string
  gender: "male" | "female" | string
  photo: string
  feedback: string
  createdAt: string
  rating: number
  likes: number
}

// ---------------------------
// 2. UTILITY: UNICODE-SAFE CSV LOADER
// ---------------------------
async function fetchCSV<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(`Fetch failed with status: ${res.status}`)

    const text = await res.text()

    return new Promise<T[]>((resolve) => {
      Papa.parse<T>(text, {
        header: true,
        skipEmptyLines: true,
        complete: ({ data }) => {
          // ✅ กรองแถวที่ว่างหรือผิดปกติออก
          const filtered = data.filter(
            (row) =>
              row && typeof row === "object" && Object.keys(row).length > 0
          )
          resolve(filtered)
        },
      })
    })
  } catch {
    // ✅ แก้ Warning: ลบ _err ที่ไม่ได้ใช้ออก เพื่อให้ผ่าน Lint
    console.error("[System_Data_Error]: CSV Retrieval failure")
    return []
  }
}

// ---------------------------
// 3. UTILITY: PHOTO_ASSET_RESOLVER
// ---------------------------
type PhotoCache = { [key: string]: { name: string }[] }

async function getRandomPhoto(
  gender: string,
  cache: PhotoCache
): Promise<string> {
  const files = cache[gender]
  if (!files || files.length === 0) return FALLBACK_PHOTO

  const file = files[Math.floor(Math.random() * files.length)]
  // ✅ ใช้ Template Literal ในการจัดการ Path ให้สะอาดขึ้น
  const safePath = `Fakereview/${gender}/${encodeURIComponent(file.name)}`
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${safePath}`
}

// ---------------------------
// 4. MAIN_GENERATOR: ARCHITECTURAL FLOW
// ---------------------------

export async function generateFacebookStyleReviews(
  count = 20,
  dateLimitDays = 60
): Promise<FakeReview[]> {
  // 🛡️ Guard Clause: ตรวจสอบ Supabase Instance
  if (!supabaseServer) {
    console.error("[Auth_Error]: Supabase server client not initialized")
    return []
  }

  const baseStoragePath = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/Fakereview`

  const urls = {
    firstNames: `${baseStoragePath}/firstNames.csv`,
    lastNames: `${baseStoragePath}/lastNames.csv`,
    comments: `${baseStoragePath}/thaiComments.csv`,
  }

  // 🔄 PARALLEL_DATA_FETCHING
  const [firstNames, lastNames, comments] = await Promise.all([
    fetchCSV<FirstNameRow>(urls.firstNames),
    fetchCSV<LastNameRow>(urls.lastNames),
    fetchCSV<CommentRow>(urls.comments),
  ])

  // ตรวจสอบว่ามีข้อมูลพื้นฐานครบถ้วนหรือไม่
  if (!firstNames.length || !lastNames.length || !comments.length) {
    console.warn(
      "[System_Warning]: Mock data sources are empty or unreachable."
    )
    return []
  }

  // 🖼️ PHOTO_REGISTRY_SYNC
  const photoCache: PhotoCache = {}
  const genders = ["male", "female"] as const

  await Promise.all(
    genders.map(async (gender) => {
      // Re-verify instance inside loop for TS safety
      if (!supabaseServer) return

      const { data, error } = await supabaseServer.storage
        .from(BUCKET_NAME)
        .list(`Fakereview/${gender}`, { limit: 100 })

      photoCache[gender] = error ? [] : data || []
    })
  )

  // 🏗️ REVIEW_CONSTRUCTION_LOOP
  const reviewsPromises = Array.from({ length: count }).map(async () => {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)]
    const last = lastNames[Math.floor(Math.random() * lastNames.length)]
    const comm = comments[Math.floor(Math.random() * comments.length)]

    const genderInput = (first?.gender || "male").toLowerCase()
    const gender = genders.includes(genderInput as any) ? genderInput : "male"

    const photo = await getRandomPhoto(gender, photoCache)
    const createdAt = getRandomDate(dateLimitDays)
    const rating = Math.floor(Math.random() * 2) + 4 // 4-5 Stars
    const likes = getRealisticLikes({ rating, createdAt })

    return {
      id: uuidv4(),
      name: `${first?.name?.trim() || "ลูกค้า"} ${last?.name?.trim() || "นิรนาม"}`,
      gender,
      photo,
      feedback: comm?.comment?.trim() || "บริการรวดเร็วและเป็นมืออาชีพมากครับ",
      createdAt,
      rating,
      likes,
    }
  })

  const results = await Promise.all(reviewsPromises)

  // ⏱️ SORT_BY_CHRONOLOGY (เรียงจากใหม่ไปเก่า)
  return results.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}
