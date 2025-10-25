import { supabaseServer } from './server';

/**
 * Upload file to Supabase Storage
 * @param {File|Blob|ArrayBuffer} file - File or Blob
 * @param {string} path - ex: 'Work/myfile.png'
 * @param {object} [options] - { upsert?: boolean, cacheControl?: string }
 */
export async function uploadFile(file, path, options = {}) {
  const { upsert = true, cacheControl = '3600' } = options;

  const { data, error } = await supabaseServer.storage
    .from('user-uploads')
    .upload(path, file, { upsert, cacheControl });

  if (error) {
    console.error('❌ Upload error:', error.message);
    throw new Error(`Upload failed: ${error.message}`);
  }

  return data;
}

/**
 * Delete file from Supabase Storage
 * @param {string} path - ex: 'Work/myfile.png'
 */
export async function deleteFile(path) {
  const { data, error } = await supabaseServer.storage.from('user-uploads').remove([path]);

  if (error) {
    console.error('❌ Delete error:', error.message);
    throw new Error(`Delete failed: ${error.message}`);
  }

  return data;
}

/**
 * Get public URL for file
 * @param {string} path - ex: 'Work/myfile.png'
 * @returns {string}
 */
export function getPublicUrl(path) {
  const { data } = supabaseServer.storage.from('user-uploads').getPublicUrl(path);
  return data?.publicUrl || '';
}

/**
 * List all files in a folder (with metadata)
 * @param {string} folder - ex: 'Work'
 * @returns {Promise<Array<{ name: string, url: string, metadata: object, type: string }>>}
 */
export async function listWorkMedia(folder = 'Work') {
  const { data: files, error } = await supabaseServer.storage.from('user-uploads').list(folder, {
    limit: 100,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error) {
    console.error('[listWorkMedia] ❌', error.message);
    return [];
  }

  return files.map((file) => {
    const { data: urlData } = supabaseServer.storage
      .from('user-uploads')
      .getPublicUrl(`${folder}/${file.name}`);

    const extension = file.name.split('.').pop()?.toLowerCase();
    const type = ['mp4', 'webm', 'mov'].includes(extension)
      ? 'video'
      : ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension)
        ? 'image'
        : 'other';

    return {
      name: file.name,
      url: urlData.publicUrl,
      metadata: file,
      type,
    };
  });
}
