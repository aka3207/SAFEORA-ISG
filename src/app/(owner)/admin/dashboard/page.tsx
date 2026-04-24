import { getAdminStats } from "@/app/actions/admin";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { 
  Building2, 
  Users, 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  ShieldAlert,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  const statCards = [
    { 
      name: "Aktif Firma Sayısı", 
      value: stats.activeTenants.toString(), 
      total: stats.totalTenants.toString(),
      change: "+2 bu hafta", 
      trend: "up",
      icon: Building2,
      color: "blue"
    },
    { 
      name: "Saha Uzmanları", 
      value: stats.totalExperts.toString(), 
      change: "Aktif", 
      trend: "up",
      icon: Users,
      color: "emerald"
    },
    { 
      name: "Ayın Tamamlanan Ziyaretleri", 
      value: stats.completedVisitsMonth.toString(), 
      change: `${stats.totalVisits} toplam`, 
      trend: "up",
      icon: Activity,
      color: "amber"
    },
    { 
      name: "Geciken Ziyaret / Aksiyon", 
      value: stats.overdueVisits.toString(), 
      change: "Kritik", 
      trend: "down",
      icon: ShieldAlert,
      color: "rose"
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="admin-card stat-glow flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div className={`p-3 bg-${stat.color}-500/10 rounded-xl text-${stat.color}-400`}>
                <stat.icon size={22} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">{stat.name}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              {stat.total && <p className="text-[10px] text-slate-500 mt-1">out of {stat.total} total tenants</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Analytics Placeholder */}
        <div className="admin-card lg:col-span-2 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold">Revenue Growth</h3>
             <select className="bg-slate-800 border-none rounded-lg text-xs font-bold py-2 px-4 outline-none">
                <option>Last 6 Months</option>
                <option>Year to Date</option>
             </select>
          </div>
          <div className="flex-1 border-t border-white/5 pt-6">
             <RevenueChart />
          </div>
        </div>

        {/* Recent Companies & Assignments */}
        <div className="admin-card flex flex-col">
          <h3 className="text-lg font-bold mb-6">Yeni Firma Atamaları</h3>
          <div className="space-y-4 flex-1">
            {stats.recentTenants.map((tenant: any) => (
              <div key={tenant.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group border border-transparent hover:border-white/5">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center font-bold text-sm border border-white/5 shadow-inner">
                  {tenant.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate text-sm">{tenant.name}</p>
                  <p className="text-[10px] text-slate-500 flex items-center gap-1.5 uppercase font-bold tracking-tight">
                    <Users size={10} className="text-blue-400" />
                    {tenant.assignedExpert?.name || "Uzman Atanmadı"}
                  </p>
                </div>
                <div className={`admin-badge text-[8px] ${tenant.status === 'ACTIVE' ? 'admin-badge-success' : 'admin-badge-warning'}`}>
                  {tenant.status}
                </div>
              </div>
            ))}
          </div>
          <Link href="/admin/tenants" className="mt-6 text-center text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/5 py-3 rounded-xl border border-blue-500/10 transition-all">
            Tüm Firmaları Yönet →
          </Link>
        </div>
      </div>

      {/* Operational Health Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="admin-card flex items-center gap-4 border-l-2 border-emerald-500">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
               <ShieldCheck size={24} />
            </div>
            <div>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Saha Uyumluluk</p>
               <p className="font-bold text-lg">94.2%</p>
            </div>
         </div>
         <div className="admin-card flex items-center gap-4 border-l-2 border-amber-500">
            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400">
               <Clock size={24} />
            </div>
            <div>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Ziyaret Sadakati</p>
               <p className="font-bold text-lg">88% (Zamanında)</p>
            </div>
         </div>
         <div className="admin-card flex items-center gap-4 border-l-2 border-blue-500">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
               <Users size={24} />
            </div>
            <div>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Uzman Verimliliği</p>
               <p className="font-bold text-lg">92% Kapasite</p>
            </div>
         </div>
      </div>
    </div>
  );
}

function ShieldCheck({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
