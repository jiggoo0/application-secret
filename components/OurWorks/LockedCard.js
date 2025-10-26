'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from '@/components/common/Toast';
import Loader from '@/components/common/Loader';

/**
 * @param {{ onUnlock?: () => void }} props
 */
export default function LockedCard({ onUnlock }) {
  const [input, setInput] = useState('');
  const [keyList, setKeyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function loadKeys() {
      try {
        const res = await fetch('/data/Keylock.json', { cache: 'no-store' });
        const result = await res.json();

        if (!Array.isArray(result)) {
          throw new Error('โครงสร้าง Keylock.json ไม่ถูกต้อง');
        }

        setKeyList(result);
      } catch (err) {
        console.error('[LockedCard] ❌ โหลด Keylock.json ล้มเหลว:', err);
        setErrorMsg('ไม่สามารถโหลดรหัสได้ กรุณาตรวจสอบไฟล์ Keylock.json');
      } finally {
        setLoading(false);
      }
    }

    loadKeys();
  }, []);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return toast.error('กรุณากรอกรหัสก่อนปลดล็อก');

    const encoded = btoa(trimmed);
    const alreadyUsed = localStorage.getItem(`used:${encoded}`) === 'true';
    const match = keyList.find((entry) => entry.hashed_code === encoded && entry.used === false);

    if (!match || alreadyUsed) {
      return toast.warning('รหัสไม่ถูกต้อง หรือถูกใช้ไปแล้ว ❌');
    }

    localStorage.setItem(`used:${encoded}`, 'true');
    toast.success('✅ ปลดล็อกสำเร็จ');
    onUnlock?.();
    router.push('/works');
  };

  if (loading) return <Loader />;
  if (errorMsg) return <p className="text-destructive">{errorMsg}</p>;

  return (
    <section
      aria-labelledby="locked-card-heading"
      className="flex flex-col items-center rounded-lg border border-border bg-muted p-6 text-foreground"
    >
      <div className="mb-3 text-4xl">🔒</div>
      <h3 id="locked-card-heading" className="mb-2 text-lg font-semibold">
        เข้ารหัสผลงาน
      </h3>

      <input
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="ใส่รหัส..."
        className="w-full rounded-md border border-input bg-background p-2 text-center text-sm text-foreground placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="รหัสปลดล็อก"
      />

      <button
        onClick={handleSubmit}
        className="mt-3 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
      >
        ปลดล็อก
      </button>
    </section>
  );
}
