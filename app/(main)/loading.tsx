// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
      <div className="relative">
        {/* Box Spinner: Industrial Style */}
        <div className="h-16 w-16 animate-spin border-4 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]"></div>
        <div className="absolute -right-2 -top-2 h-4 w-4 border-2 border-slate-900 bg-blue-600"></div>
      </div>

      <div className="mt-8 flex flex-col items-center space-y-3">
        <h2 className="text-2xl font-bold uppercase italic tracking-tighter text-slate-900">
          Factory Loading
        </h2>

        {/* Progress Bar using Tailwind only */}
        <div className="relative h-3 w-48 overflow-hidden border-2 border-slate-900 bg-white">
          <div className="h-full animate-[pulse_1.5s_infinite] bg-blue-600"></div>
        </div>

        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
          Preparing High-Fidelity Documents
        </p>
      </div>
    </div>
  );
}
