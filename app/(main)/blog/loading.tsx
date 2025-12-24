export default function BlogLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="h-16 w-16 animate-spin border-8 border-slate-100 border-t-primary"></div>
      <p className="mt-6 font-mono text-[10px] font-black uppercase tracking-[0.5em] text-slate-900">
        Accessing_Data_Vault...
      </p>
    </div>
  );
}
