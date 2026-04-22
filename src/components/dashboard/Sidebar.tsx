"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  ShieldAlert, 
  Calendar, 
  FileText, 
  Activity, 
  Settings, 
  LogOut,
  Building2,
  Box,
  ClipboardList,
  Shield,
  ChevronLeft,
  Menu
} from "lucide-react";
import { useState, useMemo } from "react";
import { signOut } from "next-auth/react";

interface SidebarProps {
  user: {
    name?: string | null;
    role: string;
    tenantName?: string;
  };
}

const MENU_ITEMS = [
  { name: "Genel Bakış", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Çalışanlar", icon: Users, href: "/dashboard/employees", roles: ["SUPER_ADMIN", "COMPANY_ADMIN", "MANAGER"] },
  { name: "Risk Analizi", icon: ShieldAlert, href: "/dashboard/risks", roles: ["SUPER_ADMIN", "COMPANY_ADMIN", "SAFETY_EXPERT"] },
  { name: "Kaza & Olay", icon: Activity, href: "/dashboard/incidents", roles: ["SUPER_ADMIN", "COMPANY_ADMIN", "SAFETY_EXPERT", "MANAGER"] },
  { name: "Aksiyonlar (DÖF)", icon: ClipboardList, href: "/dashboard/actions", roles: ["SUPER_ADMIN", "COMPANY_ADMIN", "SAFETY_EXPERT", "MANAGER"] },
  { name: "Eğitimler", icon: Calendar, href: "/dashboard/training", roles: ["SUPER_ADMIN", "COMPANY_ADMIN", "SAFETY_EXPERT"] },
  { name: "Sağlık Takibi", icon: Box, href: "/dashboard/health", roles: ["SUPER_ADMIN", "COMPANY_ADMIN", "DOCTOR"] },
  { name: "Dokümanlar", icon: FileText, href: "/dashboard/documents", roles: ["SUPER_ADMIN", "COMPANY_ADMIN", "SAFETY_EXPERT", "MANAGER", "DOCTOR"] },
  { name: "Kurumsal", icon: Building2, href: "/dashboard/settings/branches", roles: ["SUPER_ADMIN", "COMPANY_ADMIN"] },
];

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const filteredMenu = useMemo(() => 
    MENU_ITEMS.filter(item => !item.roles || (user?.role && item.roles.includes(user.role))),
    [user?.role]
  );

  return (
    <aside className={`bg-white border-r border-slate-200 transition-all duration-300 z-50 flex flex-col shadow-sm h-full ${collapsed ? "w-20" : "w-72"}`}>
      {/* Sidebar Header */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200 shrink-0">
            <Shield className="text-white w-6 h-6" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden animate-in fade-in slide-in-from-left-2">
               <h1 className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">SAFEORA</h1>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate block mt-1">
                 {user.tenantName || "Sistem"}
               </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive ? "bg-slate-900 text-white shadow-md shadow-slate-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
              `}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-blue-400" : "group-hover:text-slate-900"}`} />
              {!collapsed && <span className="font-semibold text-sm truncate">{item.name}</span>}
              {!collapsed && isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"></div>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        {!collapsed && (
          <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-2xl mb-3 shadow-sm animate-in fade-in slide-in-from-bottom-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 font-bold text-slate-700">
               {user.name?.[0]}
            </div>
            <div className="overflow-hidden">
               <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
               <p className="text-[10px] font-semibold text-slate-400 truncate uppercase">{user.role}</p>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button 
            onClick={() => signOut()}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm ${collapsed ? "w-full justify-center" : "flex-1"}`}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Oturumu Kapat</span>}
          </button>
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all shadow-sm shrink-0"
          >
            {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
