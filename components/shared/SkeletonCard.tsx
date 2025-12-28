/** @format */
export const SkeletonCard = () => (
  <div className="flex h-full animate-pulse flex-col border border-slate-100 bg-white p-10">
    {/* Image Skeleton */}
    <div className="mb-8 aspect-[16/10] bg-slate-100" />

    {/* Content Skeleton */}
    <div className="flex-grow space-y-4">
      <div className="h-2 w-16 bg-slate-100" />
      <div className="h-8 w-3/4 bg-slate-100" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-50" />
        <div className="h-3 w-5/6 bg-slate-50" />
      </div>
    </div>

    {/* Footer Skeleton */}
    <div className="mt-12 flex items-center justify-between border-t border-slate-50 pt-6">
      <div className="h-10 w-24 bg-slate-100" />
      <div className="h-12 w-12 bg-slate-100" />
    </div>
  </div>
)
