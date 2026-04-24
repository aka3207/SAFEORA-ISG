"use client";

import { useEffect, useState } from "react";
import { getExpertCompanies, getExpertStats } from "@/app/actions/expert";
import { 
  Building2, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  MapPin,
  ArrowRight,
  TrendingUp,
  ClipboardCheck
} from "lucide-react";
import Link from "next/link";

export function ExpertDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [s, c] = await Promise.all([getExpertStats(), getExpertCompanies()]);
      setStats(s);
      setCompanies(c);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-slate-100 dark:bg-slate-900 rounded-3xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Expert Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatItem 
          title="Atanmış Firmalar" 
          value={stats.totalCompanies} 
          icon={Building2} 
          color="blue" 
          desc="Aktif Hizmet"
        />
        <StatItem 
          title="Bekleyen Ziyaretler" 
          value={stats.upcomingVisits} 
          icon={Calendar} 
          color="amber" 
          desc="Bu Ay"
        />
        <StatItem 
          title="Tamamlananlar" 
          value={stats.completedVisits} 
          icon={CheckCircle2} 
          color="emerald" 
          desc="Toplam"
        />
        <StatItem 
          title="Geciken Görevler" 
          value={stats.overdueVisits} 
          icon={AlertCircle} 
          color="rose" 
          desc="Kritik"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Companies List */}
        <div className="lg:col-span-2 space-y-4">
           <div className="flex justify-between items-center px-2">
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-200">Sorumlu Olduğum Firmalar</h3>
              <Link href="/dashboard/companies" className="text-sm font-bold text-blue-500 hover:underline">Tümünü Gör</Link>
           </div>
           <div className="grid grid-cols-1 gap-4">
              {companies.map(company => (
                <div key={company.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                   <div className="flex justify-between items-start">
                      <div className="flex gap-5">
                         <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-xl text-blue-500 border border-slate-100 dark:border-slate-700">
                            {company.name[0]}
                         </div>
                         <div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors uppercase">{company.name}</h4>
                            <div className="flex items-center gap-4 mt-2">
                               <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                                  <MapPin size={14} className="text-slate-300" /> {company.sector || "Sektör Belirtilmemiş"}
                               </span>
                               <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                                  <Clock size={14} className="text-slate-300" /> {company.visitFrequency}
                               </span>
                            </div>
                         </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        company.riskClass === 'VERY_HAZARDOUS' ? 'bg-red-500/10 text-red-500' :
                        company.riskClass === 'HAZARDOUS' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                        {company.riskClass}
                      </div>
                   </div>

                   <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex gap-8">
                         <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Açık Risk</span>
                            <span className="text-sm font-black text-slate-700 dark:text-slate-300">{company._count.risks}</span>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Son Ziyaret</span>
                            <span className="text-sm font-black text-slate-700 dark:text-slate-300">
                               {company.visits[0] ? new Date(company.visits[0].scheduledDate).toLocaleDateString() : "Tanımsız"}
                            </span>
                         </div>
                      </div>
                      <Link 
                        href={`/dashboard/companies/${company.id}`}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl text-xs font-bold hover:scale-[1.02] transition-all shadow-lg shadow-blue-500/10"
                      >
                        Paneli Aç <ArrowRight size={14} />
                      </Link>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Action Column */}
        <div className="space-y-8">
           <div className="bg-gradient-to-br from-slate-900 to-slate-950 dark:from-blue-600 dark:to-indigo-700 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-2 leading-tight">Saha Raporu Hazırla</h3>
                <p className="text-white/70 text-sm font-medium mb-6">Ziyaretini tamamladığın firmalar için hızlıca raporunu sisteme işle.</p>
                <Link 
                  href="/dashboard/visits/new"
                  className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all shadow-lg"
                >
                  <ClipboardCheck size={20} />
                  Yeni Rapor Oluştur
                </Link>
              </div>
              <div className="absolute -bottom-6 -right-6 text-white/5 transform rotate-12">
                 <ClipboardCheck size={160} />
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8">
              <h4 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                 Yaklaşan Ziyaretler
              </h4>
              <div className="space-y-6">
                 {companies.flatMap(c => c.visits).map((visit: any, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700">
                         <span className="text-[10px] font-black text-slate-400 uppercase">{new Date(visit.scheduledDate).toLocaleString('tr-TR', {month: 'short'})}</span>
                         <span className="text-base font-black text-slate-900 dark:text-white leading-none">{new Date(visit.scheduledDate).getDate()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{visit.title}</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase truncate">{visit.tenant?.name || "Müşteri Bilgisi"}</p>
                      </div>
                   </div>
                 ))}
                 {companies.flatMap(c => c.visits).length === 0 && (
                   <div className="text-center py-4">
                      <p className="text-xs text-slate-500 font-bold italic">Planlı ziyaretiniz bulunmuyor.</p>
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ title, value, icon: Icon, color, desc }: any) {
  const colors: any = {
    blue: "text-blue-500 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20",
    amber: "text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20",
    emerald: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20",
    rose: "text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20",
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[32px] hover:scale-[1.02] transition-all cursor-default group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl border ${colors[color]} group-hover:rotate-12 transition-transform`}>
          <Icon size={24} />
        </div>
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{desc}</span>
      </div>
      <div>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</h3>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{title}</p>
      </div>
    </div>
  );
}
