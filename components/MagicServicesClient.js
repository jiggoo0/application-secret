'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { fetchServices } from '../lib/services';

const FALLBACK_IMAGE = '/images/placeholder.webp';

/**
 * Browser-safe render Magic UI component
 * แทน Magic UI ของ Node-only ด้วย div / button / card mock
 */
function renderMagicComponent(name, props = {}) {
  switch (name) {
    case 'MagicCard':
      return (
        <div {...props} className={`rounded-lg border p-4 shadow-md ${props.className}`}>
          {props.children}
        </div>
      );
    case 'RippleButton':
      return (
        <a
          {...props}
          className={`inline-block rounded bg-primary px-4 py-2 text-white transition-transform hover:scale-105 ${props.className}`}
        >
          {props.children}
        </a>
      );
    case 'SkeletonCard':
      return (
        <div
          {...props}
          className={`h-72 animate-pulse rounded-lg bg-gray-200 ${props.className}`}
        ></div>
      );
    case 'Alert':
      return (
        <div {...props} className={`rounded bg-red-100 p-4 text-red-800 ${props.className}`}>
          {props.children}
        </div>
      );
    default:
      return <div {...props}>{props.children}</div>;
  }
}

export default function MagicServicesClient() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const loadServices = async () => {
      const { data, error } = await fetchServices();
      setServices(data);
      setErrorMsg(error);
      setLoading(false);
    };
    loadServices();
  }, []);

  const renderedServices = useMemo(() => {
    if (loading) {
      return (
        <div
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {Array.from({ length: 6 }).map((_, idx) =>
            renderMagicComponent('SkeletonCard', { key: idx }),
          )}
        </div>
      );
    }

    if (errorMsg) {
      return renderMagicComponent('Alert', { type: 'error', children: errorMsg });
    }

    if (!services.length) {
      return renderMagicComponent('Alert', { type: 'info', children: 'ไม่มีบริการในขณะนี้' });
    }

    return (
      <div
        className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
      >
        {services.map((service, idx) =>
          renderMagicComponent('MagicCard', {
            key: service.id ?? idx,
            title: service.title,
            className:
              'flex flex-col justify-between p-4 shadow-md hover:scale-105 transition-transform',
            children: (
              <>
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

                {Array.isArray(service.features) && service.features.length > 0 && (
                  <ul className="mb-4 list-inside list-disc text-left text-sm text-gray-700 dark:text-gray-300">
                    {service.features.map((feature, featIdx) => (
                      <li key={featIdx}>{feature}</li>
                    ))}
                  </ul>
                )}

                {service.price && (
                  <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {service.price}
                  </p>
                )}

                {service.ctaUrl &&
                  service.ctaText &&
                  renderMagicComponent('RippleButton', {
                    href: service.ctaUrl,
                    children: service.ctaText,
                    className: 'w-full mt-auto',
                  })}
              </>
            ),
          }),
        )}
      </div>
    );
  }, [services, loading, errorMsg]);

  return <>{renderedServices}</>;
}
