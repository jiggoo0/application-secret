import { createClient } from '@supabase/supabase-js';
import { validateUploadInput } from '@/lib/validators/validateUploadInput';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const BUCKET_NAME = 'user-uploads';
const TABLE_NAME = 'uploads';

/**
 * 📤 อัปโหลดไฟล์ไปยัง Supabase Storage
 * @param {string} path
 * @param {Uint8Array} buffer
 * @param {string} contentType
 * @returns {boolean|null}
 */
export async function uploadFile(path, buffer, contentType) {
  if (!path || !buffer || !contentType) {
    console.warn('[Storage] ⚠️ Invalid uploadFile payload');
    return null;
  }

  const { error } = await supabase.storage.from(BUCKET_NAME).upload(path, buffer, {
    contentType,
    upsert: false,
  });

  if (error) {
    console.error('[Storage] ❌ uploadFile failed:', error);
    return null;
  }

  return true;
}

/**
 * 🗑️ ลบไฟล์จาก Supabase Storage
 * @param {string} path
 * @returns {boolean|null}
 */
export async function deleteFile(path) {
  if (!path || typeof path !== 'string') {
    console.warn('[Storage] ⚠️ Invalid deleteFile path');
    return null;
  }

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

  if (error) {
    console.error('[Storage] ❌ deleteFile failed:', error);
    return null;
  }

  return true;
}

/**
 * 🔗 สร้าง public URL สำหรับไฟล์
 * @param {string} path
 * @returns {string|null}
 */
export function getPublicUrl(path) {
  if (!path || typeof path !== 'string') return null;
  const { publicUrl } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return publicUrl || null;
}

/**
 * 🔐 สร้าง signed URL สำหรับไฟล์ private
 * @param {string} path
 * @param {number} expiresIn
 * @returns {Promise<string|null>}
 */
export async function createSignedUrl(path, expiresIn = 3600) {
  if (!path || typeof path !== 'string') return null;

  const { data, error } = await supabase.storage.from(BUCKET_NAME).createSignedUrl(path, expiresIn);

  if (error || !data?.signedUrl) {
    console.error('[Storage] ❌ createSignedUrl failed:', error);
    return null;
  }

  return data.signedUrl;
}

/**
 * 📦 ดึงรายการ metadata ของไฟล์อัปโหลดทั้งหมด
 * @returns {Array}
 */
export async function fetchAllUploads() {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Storage] ❌ fetchAllUploads failed:', error);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

/**
 * ➕ เพิ่ม metadata สำหรับไฟล์อัปโหลดใหม่
 * @param {Object} upload
 * @returns {boolean|null}
 */
export async function addUpload(upload) {
  const error = validateUploadInput(upload);
  if (error) {
    console.warn('[Storage] ⚠️ validation failed:', error);
    return null;
  }

  const { data, error: insertError } = await supabase.from(TABLE_NAME).insert([upload]).select();

  if (insertError || !data || data.length === 0) {
    console.error('[Storage] ❌ addUpload failed:', insertError);
    return null;
  }

  return true;
}

/**
 * ✏️ อัปเดตสถานะ metadata ของไฟล์
 * @param {string} path
 * @param {string} status
 * @returns {boolean|null}
 */
export async function updateUploadStatus(path, status) {
  if (typeof path !== 'string' || typeof status !== 'string' || !path.trim() || !status.trim()) {
    console.warn('[Storage] ⚠️ Invalid update payload:', { path, status });
    return null;
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ status })
    .eq('path', path)
    .select();

  if (error || !data || data.length === 0) {
    console.error('[Storage] ❌ updateUploadStatus failed:', error);
    return null;
  }

  return true;
}

/**
 * 🗑️ ลบ metadata ของไฟล์อัปโหลด
 * @param {string} path
 * @returns {boolean|null}
 */
export async function deleteUpload(path) {
  if (typeof path !== 'string' || !path.trim()) {
    console.warn('[Storage] ⚠️ Invalid deleteUpload path:', path);
    return null;
  }

  const { error } = await supabase.from(TABLE_NAME).delete().eq('path', path);

  if (error) {
    console.error('[Storage] ❌ deleteUpload failed:', error);
    return null;
  }

  return true;
}
