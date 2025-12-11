// components/OurWorks/OurWorks.js
'use client';

// 💡 แก้ไข: ลบ useCallback และ Fragment ออกจากรายการ Import
import { useEffect, useState, useMemo } from 'react';
import WorkCard from './WorkCard';
import SkeletonCard from './SkeletonCard';

const WORKS_LIMIT = 6;

export default function OurWorks() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
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
        <p className="text-center text-destructive" role="alert">
          {error}
        </p>
      );
    }

    if (works.length === 0) {
      return <p className="text-center text-muted-foreground">ยังไม่มีผลงานให้แสดงในขณะนี้</p>;
    }

    return works.map((work, index) => (
      <WorkCard key={work.id || `work-${index}`} {...work} unlocked={true} />
    ));
  };

  return (
    <section
      id="our-works"
      aria-labelledby="our-works-heading"
      aria-describedby="our-works-description"
      className="bg-background py-20 text-foreground"
    >
      <div className="mx-auto max-w-7xl px-4">
        <h2
          id="our-works-heading"
          className="mb-2 text-center text-h2 font-semibold text-foreground"
        >
          ตัวอย่างผลงานล่าสุด
        </h2>
        <p id="our-works-description" className="mb-8 text-center text-base text-muted-foreground">
          ผลงานที่ได้รับอนุญาตให้เผยแพร่ เพื่อแสดงคุณภาพงานที่เราส่งมอบ
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}
