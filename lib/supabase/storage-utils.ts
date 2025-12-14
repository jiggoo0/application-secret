// lib/supabase/storage-utils.ts
import { supabaseServer } from './server';
import type { FileObject, FileOptions } from '@supabase/storage-js';

const BUCKET_NAME = 'user-uploads';

export interface MediaItem {
  name: string;
  url: string;
  metadata: FileObject;
  type: 'image' | 'video' | 'other';
}

// ----------------------------------------------------
// 1. Upload File
// ----------------------------------------------------
export async function uploadFile(
  file: File | Blob | ArrayBuffer | Buffer,
  path: string,
  options: FileOptions = {},
): Promise<{ path: string }> {
  const { upsert = true, cacheControl = '3600' } = options;

  const { data, error } = await supabaseServer.storage.from(BUCKET_NAME).upload(path, file as any, {
    upsert,
    cacheControl,
    contentType: file instanceof Blob ? file.type : undefined,
  });

  if (error) {
    console.error('❌ Upload error:', error.message);
    throw new Error(`Upload failed: ${error.message}`);
  }

  return data as { path: string };
}

// ----------------------------------------------------
// 2. Delete File
// ----------------------------------------------------
export async function deleteFile(path: string): Promise<FileObject[]> {
  const { data, error } = await supabaseServer.storage.from(BUCKET_NAME).remove([path]);

  if (error) {
    console.error('❌ Delete error:', error.message);
    throw new Error(`Delete failed: ${error.message}`);
  }

  return data || [];
}

// ----------------------------------------------------
// 3. Get Public URL
// ----------------------------------------------------
export function getPublicUrl(path: string): string {
  return supabaseServer.storage.from(BUCKET_NAME).getPublicUrl(path).data.publicUrl ?? '';
}

// ----------------------------------------------------
// 4. List Work Media
// ----------------------------------------------------
export async function listWorkMedia(folder: string = 'Work'): Promise<MediaItem[]> {
  const { data: files, error } = await supabaseServer.storage
    .from(BUCKET_NAME)
    .list(folder, { limit: 100, sortBy: { column: 'name', order: 'asc' } });

  if (error || !files) {
    console.error('[listWorkMedia] ❌', error?.message || 'No files found');
    return [];
  }

  return files.map((file) => {
    const url = getPublicUrl(`${folder}/${file.name}`);
    const ext = file.name.split('.').pop()?.toLowerCase();
    let type: MediaItem['type'] = 'other';

    if (['mp4', 'webm', 'mov'].includes(ext || '')) type = 'video';
    else if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '')) type = 'image';

    return { name: file.name, url, metadata: file, type };
  });
}
