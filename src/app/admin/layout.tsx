import "./admin.css";
import Link from "next/link";
import { 
  BarChart3, 
  Building2, 
  Users, 
  CreditCard, 
  MessageSquare, 
  Settings, 
  ShieldCheck, 
  LogOut,
  LayoutDashboard,
  Megaphone,
  Briefcase,
  Zap
} from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user as any;

  if (!user?.isFounder) {
    redirect("/dashboard");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Tenants", href: "/admin/tenants", icon: Building2 },
    { name: "Global Users", href: "/admin/users", icon: Users },
    { name: "Billing", href: "/admin/billing", icon: CreditCard },
    { name: "CRM (Leads)", href: "/admin/crm", icon: Briefcase },
    { name: "Support", href: "/admin/support", icon: MessageSquare },
    { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
    { name: "AI Automation", href: "/admin/ai", icon: Zap },
    { name: "System", href: "/admin/system", icon: Settings },
  ];

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="flex items-center gap-3 mb-10 px-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">SAFEORA</h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Owner Console</p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`admin-nav-item`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 mb-6">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold">
              {user.name?.[0] || "F"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 truncate">Founder Account</p>
            </div>
          </div>
          <Link href="/auth/logout" className="admin-nav-item text-red-400 hover:text-red-300">
            <LogOut size={20} />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      <main className="admin-main">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {user.name?.split(' ')[0]}</h2>
            <p className="text-slate-400 text-sm">Here is what's happening across the SAFEORA ecosystem today.</p>
          </div>
          <div className="flex gap-3">
             <div className="relative w-72">
                <input 
                  type="text" 
                  placeholder="Global Search (Ctrl + K)" 
                  className="search-bar-premium pl-10"
                />
                <BarChart3 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
             </div>
             <button className="btn btn-primary">
                <ShieldCheck size={18} />
                System Live
             </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
