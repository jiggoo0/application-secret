'use client';

import ctaData from './CTA.json';

export default function CTA() {
  return (
    <section className="w-full space-y-6 rounded-2xl bg-gray-100 px-6 py-16 text-center">
      <h2 className="text-3xl font-bold">{ctaData.title}</h2>
      <p className="text-lg text-gray-700">{ctaData.subtitle}</p>

      <ul className="inline-block space-y-2 text-left">
        {ctaData.services.map((svc) => (
          <li key={svc} className="text-gray-800">
            • {svc}
          </li>
        ))}
      </ul>

      <a
        href={ctaData.ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white"
      >
        {ctaData.ctaText}
      </a>
    </section>
  );
}
