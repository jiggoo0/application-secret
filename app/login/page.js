'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const handleRedirectByRole = async () => {
    try {
      let session = await getSession();
      let retries = 0;

      // รอให้ session พร้อม (retry สูงสุด 3 ครั้ง)
      while (!session && retries < 3) {
        await new Promise((r) => setTimeout(r, 300));
        session = await getSession();
        retries++;
      }

      const role = session?.user?.role;
      const fallback = role === 'admin' ? '/admin' : '/user';
      const callbackUrl = searchParams?.get('callbackUrl') || fallback;

      window.location.href = callbackUrl;
    } catch {
      setError('เกิดข้อผิดพลาดระหว่างล็อกอิน');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      ...(remember && { remember: true }),
    });

    if (res?.error) {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      setLoading(false);
      return;
    }

    if (res?.ok) {
      await handleRedirectByRole();
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        aria-label="ฟอร์มเข้าสู่ระบบ"
        aria-busy={loading}
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          ลงชื่อเข้าใช้
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            อีเมล
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            placeholder="you@example.com"
            className="mt-1 w-full rounded border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            รหัสผ่าน
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="mt-1 w-full rounded border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Remember & Forgot */}
        <div className="mb-4 flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
            />
            จำฉันไว้
          </label>
          <a href="/forgot-password" className="text-primary hover:underline">
            ลืมรหัสผ่าน?
          </a>
        </div>

        {/* Error */}
        {error && (
          <p
            className="mb-4 text-center text-sm text-red-600 dark:text-red-400"
            role="alert"
            aria-live="polite"
          >
            ⚠️ {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          aria-disabled={loading}
          className="hover:bg-primaryHover flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-2 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </div>
  );
}
