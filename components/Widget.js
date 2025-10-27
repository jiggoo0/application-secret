'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  FaFacebookF,
  FaLine,
  FaEnvelope,
  FaFacebookMessenger,
  FaTimes,
  FaCommentDots,
  FaLink,
} from 'react-icons/fa';

const ICONS = {
  line: <FaLine className="text-green-500" aria-hidden />,
  email: <FaEnvelope className="text-red-500" aria-hidden />,
  facebook: <FaFacebookF className="text-blue-600" aria-hidden />,
  messenger: <FaFacebookMessenger className="text-indigo-500" aria-hidden />,
  default: <FaLink className="text-muted-foreground" aria-hidden />,
};

const STORAGE_KEY = 'site.widget.open';

export default function Widget() {
  const [channels, setChannels] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'true') setOpen(true);
    } catch (err) {
      console.error('Failed to read localStorage', err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(open));
    } catch (err) {
      console.error('Failed to write localStorage', err);
    }
  }, [open]);

  const fetchWidgetData = useCallback(async () => {
    try {
      const res = await fetch('/data/widget.json');
      if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลช่องทางติดต่อได้');

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('ข้อมูลไม่อยู่ในรูปแบบที่ถูกต้อง');

      setChannels(data);
    } catch (err) {
      setErrorMsg(err?.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
      setChannels([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWidgetData();
  }, [fetchWidgetData]);

  const contactList = useMemo(() => {
    if (loading) {
      return <p className="animate-pulse text-sm text-muted-foreground">กำลังโหลดข้อมูล...</p>;
    }

    if (errorMsg) {
      return <p className="text-sm text-destructive">{errorMsg}</p>;
    }

    if (channels.length === 0) {
      return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {ICONS.default}
          <span>ยังไม่มีข้อมูลช่องทางติดต่อ</span>
        </div>
      );
    }

    return (
      <ul className="mt-2 space-y-3 text-sm text-foreground">
        {channels.map(({ type, label, uri, id }, i) => {
          const icon = ICONS[type] ?? ICONS.default;
          const safeUri = typeof uri === 'string' && uri ? uri : '#';

          return (
            <li key={i} className="flex items-center gap-3">
              <span className="flex-shrink-0">{icon}</span>
              <a
                href={safeUri}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate hover:underline"
                aria-label={label || 'ช่องทางติดต่อ'}
              >
                <span className="inline-block align-middle">{label || safeUri}</span>
                {id && (
                  <span className="ml-2 inline-block align-middle text-xs text-muted-foreground">
                    {id}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }, [loading, errorMsg, channels]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="contact-widget"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
        title={open ? 'ปิดช่องทางติดต่อ' : 'เปิดช่องทางติดต่อ'}
      >
        {open ? <FaTimes aria-hidden /> : <FaCommentDots aria-hidden />}
      </button>

      <aside
        id="contact-widget"
        aria-hidden={!open}
        className={`fixed bottom-20 right-6 z-40 w-[92vw] max-w-sm transform transition-all duration-300 ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        } md:bottom-8 md:right-8`}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="rounded-xl border border-border bg-card p-4 shadow-xl">
          <header className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">ช่องทางติดต่อ</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-2 rounded p-1 text-muted-foreground hover:text-primary focus:outline-none"
              aria-label="ปิด"
            >
              <FaTimes aria-hidden />
            </button>
          </header>

          <div className="min-h-[48px]">{contactList}</div>

          <footer className="mt-4 flex items-center justify-between">
            <small className="text-xs text-muted-foreground">JP-VISOUL-DOCE</small>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                try {
                  localStorage.setItem(STORAGE_KEY, 'false');
                } catch (err) {
                  console.error('Failed to write localStorage', err);
                }
              }}
              className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              ปิด
            </button>
          </footer>
        </div>
      </aside>
    </>
  );
}
