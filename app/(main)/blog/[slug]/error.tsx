'use client';
export default function BlogError({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center">
      <h2 className="font-heading text-4xl font-black uppercase italic text-slate-900">
        Data_Corruption_Detected
      </h2>
      <button
        onClick={reset}
        className="mt-6 border-4 border-slate-900 bg-slate-900 px-8 py-4 font-heading text-sm font-black uppercase italic text-white shadow-neo hover:bg-primary hover:text-slate-900"
      >
        Re-establish_Link
      </button>
    </div>
  );
}
