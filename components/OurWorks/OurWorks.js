'use client';

import { useEffect, useState, useCallback, useMemo, Fragment } from 'react';
import WorkCard from './WorkCard';
import LockedCard from './LockedCard';
import SkeletonCard from './SkeletonCard';

const WORKS_LIMIT = 6;
const ACCESS_CODE_REQUIRED_INDEX = 0;

export default function OurWorks() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorks = async () => {
      try {
        const res = await fetch('/data/works.json');
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลผลงานได้');

        const data = await res.json();
        setWorks(Array.isArray(data) ? data.slice(0, WORKS_LIMIT) : []);
      } catch (err) {
        setError(err.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
        setWorks([]);
      } finally {
        setLoading(false);
      }
    };

    loadWorks();
  }, []);

  const handleUnlock = useCallback(() => {
    setAuthorized(true);
  }, []);

  const skeletons = useMemo(
    () =>
      Array.from({ length: WORKS_LIMIT }).map((_, i) => (
        <SkeletonCard key={`skeleton-${i}`} isVideo={i === 1} />
      )),
    [],
  );

  const renderContent = () => {
    if (loading) return skeletons;

    if (error) {
      return (
        <p className="text-center text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      );
    }

    if (works.length === 0) {
      return (
        <p className="text-center text-gray-600 dark:text-gray-300">ยังไม่มีผลงานให้แสดงในขณะนี้</p>
      );
    }

    return works.map((work, index) => {
      const isLocked = index === ACCESS_CODE_REQUIRED_INDEX && !authorized;
      const unlocked = index !== ACCESS_CODE_REQUIRED_INDEX || authorized;

      return (
        <Fragment key={work.id || `work-${index}`}>
          {isLocked ? (
            <LockedCard onUnlock={handleUnlock} />
          ) : (
            <WorkCard {...work} unlocked={unlocked} />
          )}
        </Fragment>
      );
    });
  };

  return (
    <section
      id="our-works"
      aria-labelledby="our-works-heading"
      aria-describedby="our-works-description"
      className="py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2
          id="our-works-heading"
          className="mb-2 text-center text-3xl font-bold text-black dark:text-white"
        >
          ตัวอย่างผลงานล่าสุด
        </h2>
        <p
          id="our-works-description"
          className="mb-8 text-center text-base text-gray-700 dark:text-gray-300"
        >
          ผลงานที่ได้รับอนุญาตให้เผยแพร่ เพื่อแสดงคุณภาพงานที่เราส่งมอบ
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}
