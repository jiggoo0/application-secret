'use client';

/**
 * PDFPreview Component
 * แสดง preview ของไฟล์ PDF พร้อมปุ่มเปิดเต็มหน้าจอและดาวน์โหลด
 */
export default function PDFPreview({ blobUrl, filename = 'certificate.pdf' }) {
  if (typeof blobUrl !== 'string' || !blobUrl.trim()) {
    return null;
  }

  return (
    <section
      aria-labelledby="pdf-preview-title"
      aria-describedby="pdf-preview-desc"
      role="region"
      className="mt-8 space-y-6"
    >
      <h3 id="pdf-preview-title" className="sr-only">
        ตัวอย่างใบรับรอง PDF
      </h3>
      <p id="pdf-preview-desc" className="sr-only">
        แสดงตัวอย่างไฟล์ PDF ที่สามารถเปิดเต็มหน้าจอหรือดาวน์โหลดได้
      </p>

      <div className="w-full overflow-hidden rounded-lg border border-gray-300 shadow-md dark:border-gray-600 dark:shadow">
        <iframe
          src={blobUrl}
          title="ตัวอย่างใบรับรอง PDF"
          className="aspect-[4/3] min-h-[400px] w-full sm:min-h-[600px]"
          aria-label="PDF preview"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <a
          href={blobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-blue-600 px-5 py-3 text-base font-medium tracking-wide text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-300"
        >
          เปิดเต็มหน้าจอ
        </a>
        <a
          href={blobUrl}
          download={filename}
          className="rounded-lg bg-green-600 px-5 py-3 text-base font-medium tracking-wide text-white transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring focus-visible:ring-green-300"
        >
          ดาวน์โหลด PDF
        </a>
      </div>
    </section>
  );
}
