'use client';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import axios from 'axios';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleLogout = async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    try {
      // 📤 บันทึกการออกจากระบบ
      await axios.post('/api/user-sessions', {
        user_id: session.user.email,
        action: 'logout',
      });

      // 🚪 ออกจากระบบ
      await signOut({ callbackUrl: '/login' });
    } catch (err) {
      console.error('[LogoutButton] ❌', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="mt-3 inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
    >
      <LogOut className="h-4 w-4" />
      {loading ? 'กำลังออกจากระบบ...' : 'ออกจากระบบ'}
    </button>
  );
}
