import { supabaseServer } from './server';

/**
 * List all files in a folder (with metadata and public URL)
 * @param {string} folder - ex: 'Work'
 * @returns {Promise<Array<{ name: string, url: string, metadata: object, type: string }>>}
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
      if (!file?.name) {
        console.warn('[listWorkMedia] ⚠️ Skipped file with missing name:', file);
        return null;
      }

      const path = `${folder}/${file.name}`;
      const { data: urlData, error: urlError } = supabaseServer.storage
        .from('user-uploads')
        .getPublicUrl(path);

      if (urlError || !urlData?.publicUrl) {
        console.warn(`[listWorkMedia] ⚠️ Failed to get URL for ${file.name}:`, urlError?.message);
        return null;
      }

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
