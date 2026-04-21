"use client";

import { Search, Bell, Settings, HelpCircle, ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationBell from "./NotificationBell";

export default function Header() {
  const pathname = usePathname();
  
  // Format breadcrumbs based on pathname
  const segments = pathname.split("/").filter(s => s);
  
  const getBreadcrumbLabel = (segment: string) => {
    const map: Record<string, string> = {
      dashboard: "Genel Bakış",
      employees: "Çalışanlar",
      risks: "Risk Analizi",
      incidents: "Kaza & Olay",
      actions: "Aksiyonlar (DÖF)",
      training: "Eğitimler",
      health: "Sağlık Takibi",
      documents: "Dokümanlar",
      settings: "Ayarlar",
      branches: "Kurumsal Yapı"
    };
    return map[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-8 shadow-sm">
      {/* Left Column: Breadcrumbs */}
      <div className="flex flex-col">
        <nav className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
          <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
            <Home className="w-3.5 h-3.5" />
          </Link>
          {segments.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5" />
              <Link 
                href={`/${segments.slice(0, i + 1).join("/")}`}
                className={`hover:text-slate-900 transition-colors ${i === segments.length - 1 ? "text-slate-900" : ""}`}
              >
                {getBreadcrumbLabel(s)}
              </Link>
            </div>
          ))}
        </nav>
        <h2 className="text-xl font-bold text-slate-900">
          {getBreadcrumbLabel(segments[segments.length - 1] || "dashboard")}
        </h2>
      </div>

      {/* Center Column: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Sistem genelinde ara..." 
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
          <kbd className="px-1.5 py-0.5 rounded border border-slate-300 text-[10px] font-bold text-slate-400 bg-white">⌘</kbd>
          <kbd className="px-1.5 py-0.5 rounded border border-slate-300 text-[10px] font-bold text-slate-400 bg-white">K</kbd>
        </div>
      </div>

      {/* Right Column: Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-500 transition-all border border-transparent hover:border-slate-200">
          <HelpCircle className="w-5 h-5" />
        </button>
        
        <NotificationBell />

        <div className="h-8 w-px bg-slate-200 mx-1"></div>

        <Link 
          href="/dashboard/settings"
          className="flex items-center gap-3 p-1.5 pr-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Settings className="w-5 h-5" />
          </div>
          <span className="hidden lg:block text-sm font-bold text-slate-700">Yönetim</span>
        </Link>
      </div>
    </header>
  );
}
