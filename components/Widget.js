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
};

const STORAGE_KEY = 'site.widget.open';

export default function Widget() {
  const [channels, setChannels] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // 🔹 Load widget open state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'true') {
        setOpen(true);
      }
    } catch (err) {
      console.error('Failed to read localStorage', err); // 🔹 ไม่ให้ empty
    }
  }, []);

  // 🔹 Save open state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(open));
    } catch (err) {
      console.error('Failed to write localStorage', err); // 🔹 ไม่ให้ empty
    }
  }, [open]);

  // 🔹 Fetch widget data
  const fetchWidgetData = useCallback(async () => {
    try {
      const res = await fetch('/data/widget.json');
      if (!res.ok) {
        throw new Error('ไม่สามารถโหลดข้อมูลช่องทางติดต่อได้');
      }

      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error('ข้อมูลไม่อยู่ในรูปแบบที่ถูกต้อง');
      }

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

  // 🔹 Render contact list
  const contactList = useMemo(() => {
    if (loading) {
      return (
        <p className="animate-pulse text-sm text-gray-500 dark:text-gray-400">กำลังโหลดข้อมูล...</p>
      );
    }

    if (errorMsg) {
      return <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>;
    }

    if (channels.length === 0) {
      return (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <FaLink className="text-gray-400" />
          <span>ยังไม่มีข้อมูลช่องทางติดต่อ</span>
        </div>
      );
    }

    return (
      <ul className="mt-2 space-y-3 text-sm text-gray-700 dark:text-gray-300">
        {channels.map(({ type, label, uri, id }, i) => {
          const icon = ICONS[type] ?? <FaLink className="text-gray-400" aria-hidden />;
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
                  <span className="ml-2 inline-block align-middle text-xs text-gray-500 dark:text-gray-400">
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
      {/* 🔹 Floating toggle button */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="contact-widget"
        onClick={() => setOpen((prev) => !prev)}
        className="hover:bg-primary/90 focus:ring-primary/40 fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors focus:outline-none focus:ring-2"
        title={open ? 'ปิดช่องทางติดต่อ' : 'เปิดช่องทางติดต่อ'}
      >
        {open ? <FaTimes aria-hidden /> : <FaCommentDots aria-hidden />}
      </button>

      {/* 🔹 Panel */}
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
        <div className="rounded-xl bg-white p-4 shadow-xl ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/5">
          {/* Header */}
          <header className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-black dark:text-white">ช่องทางติดต่อ</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-2 rounded p-1 text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-300 dark:hover:text-white"
              aria-label="ปิด"
            >
              <FaTimes aria-hidden />
            </button>
          </header>

          {/* Content */}
          <div className="min-h-[48px]">{contactList}</div>

          {/* Footer */}
          <footer className="mt-4 flex items-center justify-between">
            <small className="text-xs text-gray-500 dark:text-gray-400">JP-VISOUL-DOCE</small>
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
              className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              ปิด
            </button>
          </footer>
        </div>
      </aside>
    </>
  );
}
