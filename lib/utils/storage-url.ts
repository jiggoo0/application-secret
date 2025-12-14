// /lib/utils/storage-url.ts

/**
 * สร้าง Public URL ที่สมบูรณ์สำหรับไฟล์ใน Supabase Storage
 * โดยใช้ SUPABASE_URL จาก Environment Variable
 * * @param bucketName ชื่อ Bucket (ตามที่คุณระบุ: 'user-uploads')
 * @param filePath ตำแหน่งของไฟล์ที่เก็บใน Database (เช่น 'avatars/user_123.jpg')
 * @returns Public HTTP URL ที่พร้อมใช้งาน
 */
export function constructPublicStorageUrl(bucketName: string, filePath: string): string {
  // 💡 ดึง URL จาก Server Environment Variable
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    // หาก Env Var หายไป ให้ throw error ชัดเจน
    throw new Error('SUPABASE_URL environment variable is not set.');
  }

  // กำจัด slash ที่ท้าย URL ถ้ามี
  const cleanUrl = supabaseUrl.replace(/\/$/, '');

  // รูปแบบ URL ของ Supabase Public Storage
  // [SUPABASE_URL]/storage/v1/object/public/[bucket_name]/[file_path]
  return `${cleanUrl}/storage/v1/object/public/${bucketName}/${filePath}`;
}
