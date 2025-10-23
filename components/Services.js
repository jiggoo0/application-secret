'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Card } from './ui/card';
import { Button } from './ui/button';

const FALLBACK_IMAGE = '/images/placeholder.webp';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/data/services.json');
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลบริการได้');

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('รูปแบบข้อมูลไม่ถูกต้อง');

        setServices(data);
      } catch (error) {
        setErrorMsg(error.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const renderedServices = useMemo(() => {
    if (loading) {
      return (
        <div
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="รายการบริการ"
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <Card key={idx} className="h-72 animate-pulse bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
      );
    }

    if (errorMsg) {
      return <p className="text-red-500 dark:text-red-400">{errorMsg}</p>;
    }

    if (!services.length) {
      return <p className="text-gray-500 dark:text-gray-400">ไม่มีบริการในขณะนี้</p>;
    }

    return (
      <div
        className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="รายการบริการ"
      >
        {services.map((service, idx) => (
          <Card
            key={service.id ?? idx}
            title={service.title}
            className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-transform duration-300 hover:scale-105 dark:border-gray-700 dark:bg-gray-800"
            aria-labelledby={`service-title-${idx}`}
          >
            {/* Images */}
            {Array.isArray(service.images) && service.images.length > 0 && (
              <div className="mb-4 grid grid-cols-1 gap-2">
                {service.images.map((img, imgIdx) => (
                  <div key={imgIdx} className="relative h-48 w-full overflow-hidden rounded-md">
                    <Image
                      src={img.startsWith('/') ? img : `/data/${img}`}
                      alt={`${service.title} - รูปที่ ${imgIdx + 1}`}
                      fill
                      className="object-cover"
                      priority={imgIdx === 0}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target instanceof HTMLImageElement) target.src = FALLBACK_IMAGE;
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Features */}
            {Array.isArray(service.features) && service.features.length > 0 && (
              <ul className="mb-4 list-inside list-disc text-left text-sm text-gray-700 dark:text-gray-300">
                {service.features.map((feature, featIdx) => (
                  <li key={featIdx}>{feature}</li>
                ))}
              </ul>
            )}

            {/* Price */}
            {service.price && (
              <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                {service.price}
              </p>
            )}

            {/* CTA Button */}
            {service.ctaUrl && service.ctaText && (
              <Button
                asChild
                className="dark:bg-primary-dark w-full rounded bg-primary py-2 text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={service.ctaText}
              >
                <a href={service.ctaUrl}>{service.ctaText}</a>
              </Button>
            )}
          </Card>
        ))}
      </div>
    );
  }, [services, loading, errorMsg]);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-base-100 py-16 text-center dark:bg-gray-900"
    >
      <h2 id="services-heading" className="mb-12 text-4xl font-bold text-primary dark:text-white">
        บริการของเรา
      </h2>
      {renderedServices}
    </section>
  );
}
