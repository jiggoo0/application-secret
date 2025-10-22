'use client';

import dynamic from 'next/dynamic';

// client-side only wrapper
const MagicServicesClient = dynamic(() => import('./MagicServicesClient'), { ssr: false });

export default function Services() {
  return (
    <section id="services" className="bg-base-100 py-16 text-center dark:bg-gray-900">
      <h2 className="mb-12 text-4xl font-bold text-primary dark:text-white">บริการของเรา</h2>
      <MagicServicesClient />
    </section>
  );
}
