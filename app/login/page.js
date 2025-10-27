'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  // 🔁 Redirect user by role after login
  const handleRedirectByRole = async () => {
    try {
      let session = await getSession();
      let retries = 0;

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

  // 🔐 Handle form submission
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800 md:grid md:grid-cols-2">
        {/* Left Panel: Branding */}
        <div className="relative hidden bg-gradient-to-br from-primary/90 to-blue-700 p-8 text-white md:flex md:flex-col md:justify-center">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/images/hero/hero.webp"
              alt="JP Visual & Docs"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 space-y-4">
            <h1 className="text-3xl font-bold">JP Visual & Docs</h1>
            <p className="max-w-sm text-sm text-gray-100/90">
              ยกระดับธุรกิจของคุณด้วยภาพลักษณ์และเอกสารระดับมืออาชีพ
            </p>
          </div>
        </div>

        {/* Right Panel: Login Form */}
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <form
            onSubmit={handleSubmit}
            aria-label="ฟอร์มเข้าสู่ระบบ"
            aria-busy={loading}
            className="w-full"
          >
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
              เข้าสู่ระบบ
            </h2>

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
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-700 dark:text-white"
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
                className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Remember / Forgot */}
            <div className="mb-4 flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                />
                จำฉันไว้
              </label>
              <Link href="/forgot-password" className="text-primary hover:underline">
                ลืมรหัสผ่าน?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <p className="mb-4 text-center text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-white transition-all hover:bg-primary/90 focus:ring-4 focus:ring-primary/30 disabled:opacity-70"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center justify-center">
              <span className="h-px w-16 bg-gray-300 dark:bg-gray-600" />
              <span className="mx-2 text-sm text-gray-500 dark:text-gray-400">หรือ</span>
              <span className="h-px w-16 bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Alternative login (future) */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                เข้าสู่ระบบด้วย Google
              </button>
            </div>

            {/* Signup */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              ยังไม่มีบัญชี?{' '}
              <Link href="/register" className="font-medium text-primary hover:underline">
                สมัครสมาชิก
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
