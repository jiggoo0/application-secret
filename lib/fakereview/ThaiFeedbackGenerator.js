// lib/reviews/generateFacebookReviews.js
import fetch from 'node-fetch';
import Papa from 'papaparse';
import { supabaseServer } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';
import { getRealisticLikes, getRandomDate } from './utils';

const FALLBACK_PHOTO = `${process.env.SUPABASE_URL}/storage/v1/object/public/user-uploads/Fakereview/default-avatar.webp`;

// ---------------------------
// Utility: Fetch CSV from Supabase
// ---------------------------
async function fetchCSV(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`❌ Failed to fetch CSV from ${url}`);
  const text = await res.text();

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const filtered = data.filter((row) => row && Object.keys(row).length > 0);
        resolve(filtered);
      },
      error: reject,
    });
  });
}

// ---------------------------
// Utility: Pick random item
// ---------------------------
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ---------------------------
// Utility: Get random photo by gender
// ---------------------------
async function getRandomPhoto(gender = 'male', cache = {}) {
  const cachedFiles = cache[gender];
  if (cachedFiles?.length) {
    const file = pickRandom(cachedFiles);
    return `${process.env.SUPABASE_URL}/storage/v1/object/public/user-uploads/Fakereview/${gender}/${file.name}`;
  }

  const folder = `Fakereview/${gender}`;
  const { data, error } = await supabaseServer.storage
    .from('user-uploads')
    .list(folder, { limit: 100 });

  if (error || !data?.length) return FALLBACK_PHOTO;

  const file = pickRandom(data);
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/user-uploads/${folder}/${file.name}`;
}

// ---------------------------
// Main: Generate Facebook-style reviews
// ---------------------------
export async function generateFacebookStyleReviews(count = 20, dateLimitDays = 60) {
  const urls = {
    firstNames: `${process.env.SUPABASE_URL}/storage/v1/object/public/user-uploads/Fakereview/firstNames.csv`,
    lastNames: `${process.env.SUPABASE_URL}/storage/v1/object/public/user-uploads/Fakereview/lastNames.csv`,
    comments: `${process.env.SUPABASE_URL}/storage/v1/object/public/user-uploads/Fakereview/thaiComments.csv`,
  };

  const [firstNames, lastNames, comments] = await Promise.all([
    fetchCSV(urls.firstNames),
    fetchCSV(urls.lastNames),
    fetchCSV(urls.comments),
  ]);

  const photoCache = {};
  for (const gender of ['male', 'female']) {
    const { data } = await supabaseServer.storage
      .from('user-uploads')
      .list(`Fakereview/${gender}`, { limit: 100 });
    photoCache[gender] = data || [];
  }

  const reviews = await Promise.all(
    Array.from({ length: count }).map(async () => {
      const first = pickRandom(firstNames);
      const last = pickRandom(lastNames);
      const comment = pickRandom(comments);

      const firstName = first?.name?.trim() || 'ไม่ระบุชื่อ';
      const lastName = last?.name?.trim() || '';
      const fullName = `${firstName} ${lastName}`.trim();

      const gender = ['male', 'female'].includes(first?.gender?.toLowerCase())
        ? first.gender.toLowerCase()
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
      };
    }),
  );

  return reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
