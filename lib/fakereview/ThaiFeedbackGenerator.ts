// /lib/fakereview/ThaiFeedbackGenerator.ts

import * as Papa from 'papaparse';
import { supabaseServer } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';
import { getRealisticLikes, getRandomDate } from './utils';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const FALLBACK_PHOTO = `${SUPABASE_URL}/storage/v1/object/public/user-uploads/Fakereview/default-avatar.webp`;
const BUCKET_NAME = 'user-uploads';

// ---------------------------
// 1. INTERFACES & TYPES
// ---------------------------
interface FirstNameRow {
  name: string;
  gender: 'male' | 'female' | string;
}

interface LastNameRow {
  name: string;
}

interface CommentRow {
  comment: string;
}

export interface FakeReview {
  id: string;
  name: string;
  gender: 'male' | 'female' | string;
  photo: string;
  feedback: string;
  createdAt: string; // ISO Date String
  rating: number; // 1-5
  likes: number;
}

// ---------------------------
// 2. Utility: Fetch CSV from Supabase
// ---------------------------
async function fetchCSV<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`❌ Failed to fetch CSV from ${url}`);
    const text = await res.text();

    return new Promise<T[]>((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: ({ data }) => {
          const filtered = data.filter((row: any) => row && Object.keys(row).length > 0) as T[];
          resolve(filtered);
        },
        error: reject,
      });
    });
  } catch (err) {
    console.error('[fetchCSV] ❌', err instanceof Error ? err.message : err);
    return [];
  }
}

// ---------------------------
// 3. Utility: Pick random item (Generic)
// ---------------------------
const pickRandom = <T>(arr: T[]): T => {
  if (arr.length === 0) throw new Error('Cannot pick random from empty array');
  return arr[Math.floor(Math.random() * arr.length)];
};

// ---------------------------
// 4. Utility: Get random photo by gender
// ---------------------------
type PhotoCache = {
  [key: string]: { name: string }[];
};

async function getRandomPhoto(gender: string, cache: PhotoCache): Promise<string> {
  const cachedFiles = cache[gender];
  if (cachedFiles?.length) {
    const file = pickRandom(cachedFiles);
    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/Fakereview/${gender}/${file.name}`;
  }

  const folder = `Fakereview/${gender}`;
  const { data, error } = await supabaseServer.storage
    .from(BUCKET_NAME)
    .list(folder, { limit: 100 });

  if (error || !data?.length) {
    console.warn(`[getRandomPhoto] ⚠️ Error or no files found for ${folder}:`, error?.message);
    return FALLBACK_PHOTO;
  }

  const file = pickRandom(data);
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${folder}/${file.name}`;
}

// ---------------------------
// 5. Main: Generate Facebook-style reviews
// ---------------------------
export async function generateFacebookStyleReviews(
  count = 20,
  dateLimitDays = 60,
): Promise<FakeReview[]> {
  const urls = {
    firstNames: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/Fakereview/firstNames.csv`,
    lastNames: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/Fakereview/lastNames.csv`,
    comments: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/Fakereview/thaiComments.csv`,
  };

  const [firstNames, lastNames, comments] = await Promise.all([
    fetchCSV<FirstNameRow>(urls.firstNames),
    fetchCSV<LastNameRow>(urls.lastNames),
    fetchCSV<CommentRow>(urls.comments),
  ]);

  if (firstNames.length === 0 || lastNames.length === 0 || comments.length === 0) {
    console.error('[Generator] ❌ Failed to load required CSV data.');
    return [];
  }

  const photoCache: PhotoCache = {};
  for (const gender of ['male', 'female']) {
    const { data, error } = await supabaseServer.storage
      .from(BUCKET_NAME)
      .list(`Fakereview/${gender}`, { limit: 100 });

    photoCache[gender] = (error ? [] : data) || [];
  }

  const reviews: FakeReview[] = await Promise.all(
    Array.from({ length: count }).map(async () => {
      const first = pickRandom(firstNames);
      const last = pickRandom(lastNames);
      const comment = pickRandom(comments);

      const firstName = first?.name?.trim() || 'ไม่ระบุชื่อ';
      const lastName = last?.name?.trim() || '';
      const fullName = `${firstName} ${lastName}`.trim();

      const gender = ['male', 'female'].includes(first?.gender?.toLowerCase() as string)
        ? (first.gender.toLowerCase() as 'male' | 'female')
        : 'male';

      const photo = await getRandomPhoto(gender, photoCache);
      const createdAt = getRandomDate(dateLimitDays);
      const rating = Math.floor(Math.random() * 5) + 1;
      const likes = getRealisticLikes({ rating, createdAt });

      return {
        id: uuidv4(),
        name: fullName,
        gender,
        photo,
        feedback: comment?.comment?.trim() || '',
        createdAt,
        rating,
        likes,
      } as FakeReview;
    }),
  );

  return reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
