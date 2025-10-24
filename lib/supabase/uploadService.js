import { supabaseServer } from './server';

/**
 * Upload a file to a bucket
 * @param {string} bucket
 * @param {string} filePath
 * @param {File | Blob | Buffer} file
 * @returns {Promise<object>}
 */
export async function uploadFile(bucket, filePath, file) {
  const { data, error } = await supabaseServer.storage.from(bucket).upload(filePath, file);
  if (error) throw new Error(`[uploadFile] ❌ ${error.message}`);
  return data;
}

/**
 * Get public URL for a file
 * @param {string} bucket
 * @param {string} filePath
 * @returns {string}
 */
export function getPublicUrl(bucket, filePath) {
  const { data, error } = supabaseServer.storage.from(bucket).getPublicUrl(filePath);
  if (error) throw new Error(`[getPublicUrl] ❌ ${error.message}`);
  return data.publicUrl;
}

/**
 * Delete a file from a bucket
 * @param {string} bucket
 * @param {string} filePath
 * @returns {Promise<object>}
 */
export async function deleteFile(bucket, filePath) {
  const { data, error } = await supabaseServer.storage.from(bucket).remove([filePath]);
  if (error) throw new Error(`[deleteFile] ❌ ${error.message}`);
  return data;
}

/**
 * List all files in a folder (existing function)
 */
export async function listWorkMedia(folder = 'Work') {
  const { data: files, error } = await supabaseServer.storage.from('user-uploads').list(folder, {
    limit: 100,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error) {
    console.error('[listWorkMedia] ❌ Failed to list files:', error.message);
    return [];
  }

  const results = await Promise.all(
    files.map(async (file) => {
      if (!file?.name) return null;

      const path = `${folder}/${file.name}`;
      const { data: urlData } = supabaseServer.storage.from('user-uploads').getPublicUrl(path);

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
    }),
  );

  return results.filter(Boolean);
}
