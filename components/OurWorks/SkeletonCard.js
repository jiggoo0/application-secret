'use client';

export default function SkeletonCard({ variant = 'grid', isVideo = false }) {
  const base = 'rounded bg-gray-200 dark:bg-gray-700 animate-pulse';

  if (variant === 'list') {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 dark:border-gray-800">
        <div
          className={`relative h-16 w-16 ${base} ${isVideo ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
        >
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-xs font-semibold text-white">
              คลิกเพื่อเปิดเสียง 🔊
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className={`h-4 w-3/4 ${base}`} />
          <div className={`h-3 w-1/2 ${base}`} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-4">
      <div
        className={`relative h-48 w-full ${base} ${isVideo ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
      >
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/25 text-sm font-semibold text-white">
            คลิกเพื่อเปิดเสียง 🔊
          </div>
        )}
      </div>
      <div className={`h-4 w-3/4 ${base}`} />
      <div className={`h-3 w-full ${base}`} />
      <div className={`h-3 w-5/6 ${base}`} />
    </div>
  );
}
