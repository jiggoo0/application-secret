/** @format */
import { siteConfig } from "@/config/site"

export const SystemStatus = () => {
  return (
    <div className="flex items-center gap-3 border border-slate-900/10 bg-white/40 px-3 py-2 backdrop-blur-md transition-all hover:bg-white/60">
      {/* Indicator Unit */}
      <div className="relative flex h-2 w-2">
        {/* แสงรัศมีกะพริบ (Ping) */}
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${siteConfig.system.indicatorColor} opacity-40`}
        ></span>
        {/* จุดสถานะหลัก */}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${siteConfig.system.indicatorColor} shadow-[0_0_8px_rgba(34,197,94,0.6)]`}
        ></span>
      </div>

      {/* Data Output */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-900">
            {siteConfig.system.status}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="font-mono text-[9px] font-bold text-blue-600">
            {siteConfig.system.label}
          </span>
        </div>
        <span className="mt-1 font-mono text-[8px] font-medium tracking-tighter text-slate-400">
          SECURE_NODE_{siteConfig.system.version}
        </span>
      </div>
    </div>
  )
}
