'use client';

export default function SkeletonCard({ variant = 'grid', isVideo = false }) {
  const base = 'rounded-md bg-muted animate-pulse';

  if (variant === 'list') {
    return (
      <div className="flex items-center gap-4 rounded-lg border border-border p-4">
        <div className={`relative h-16 w-16 ${base} ${isVideo ? 'bg-muted/70' : ''}`}>
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-xs font-medium text-white">
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
      <div className={`relative h-48 w-full ${base} ${isVideo ? 'bg-muted/70' : ''}`}>
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/25 text-sm font-medium text-white">
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
