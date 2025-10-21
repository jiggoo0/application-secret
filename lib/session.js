import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

/**
 * ดึง session ปัจจุบันจาก server context
 * @returns {Promise<import('next-auth').Session|null>}
 */
export async function getUserSession() {
  try {
    const session = await getServerSession(authOptions);
    return session || null;
  } catch (err) {
    console.error('[getUserSession] ❌ Failed to retrieve session:', err);
    return null;
  }
}
