import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Plus, GraduationCap, Calendar, Clock, Download, ChevronRight, Users as UsersIcon } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";

export default async function TrainingPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  const trainings = await prisma.training.findMany({
    where: {
      tenantId: user.tenantId,
    },
    orderBy: {
      date: "desc",
    },
  });

  const now = new Date();
  const pastTrainings = trainings.filter(t => new Date(t.date) < now);
  const upcomingTrainings = trainings.filter(t => new Date(t.date) >= now);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Eğitim Yönetimi" 
        description="Zorunlu İSG eğitimleri, sertifika takibi ve personel gelişim matrisi."
        actions={
          <Link href="/dashboard/training/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
            <Plus size={18} />
            Yeni Eğitim Tanımla
          </Link>
        }
      />

      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Geçmiş Eğitimler</h3>
        {pastTrainings.length === 0 ? (
          <div className="safe-card p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
               <GraduationCap size={40} className="text-slate-300" />
            </div>
            <h4 className="text-slate-900 font-bold mb-1">Eğitim Bulunmuyor</h4>
            <p className="text-slate-500 text-sm max-w-xs">Henüz sistemde kayıtlı bir geçmiş eğitim bulunmamaktadır.</p>
          </div>
        ) : (
          pastTrainings.map((t) => (
            <div key={t.id} className="safe-card p-5 bg-white flex flex-col md:flex-row justify-between items-center group hover:border-emerald-200 transition-all duration-300">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 leading-none mb-2">{t.title}</h4>
                  <div className="flex flex-wrap gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-500" /> {new Date(t.date).toLocaleDateString("tr-TR")}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> {t.duration} Dakika</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                 <div className="flex flex-col items-end mr-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Katılım</span>
                    <div className="flex items-center gap-2">
                       <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82%' }}></div>
                       </div>
                       <span className="text-sm font-black text-slate-900 leading-none">%82</span>
                    </div>
                 </div>

                 <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-200 transition-all flex items-center gap-2">
                       <UsersIcon size={16} />
                       Katılımcılar
                    </button>
                    <button className="p-2.5 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-200 transition-all">
                       <Download size={18} />
                    </button>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upcoming Section */}
      <div className="pt-4">
         <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Yaklaşan Eğitimler</h3>
            <Link href="#" className="text-xs font-bold text-blue-600 hover:underline">Tümünü Takvime Ekle</Link>
         </div>
         
         {upcomingTrainings.length === 0 ? (
            <div className="safe-card p-12 flex flex-col items-center justify-center text-center border-dashed">
              <Calendar size={32} className="text-slate-300 mb-3" />
              <p className="text-slate-500 text-sm font-medium">Yakın tarihte planlanmış bir eğitim bulunmuyor.</p>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
               {upcomingTrainings.map(t => (
                 <div key={t.id} className="safe-card p-6 border-l-4 border-l-blue-600 bg-white hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                       <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-wider border border-amber-100">Planlandı</span>
                       <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Tarih</p>
                          <p className="text-xs font-black text-slate-900">{new Date(t.date).toLocaleDateString("tr-TR")}</p>
                       </div>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 mb-2 leading-tight">{t.title}</h4>
                    <div className="flex items-center gap-2 mb-6">
                       <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                          <UsersIcon size={12} className="text-slate-400" />
                       </div>
                       <p className="text-xs font-bold text-slate-500">Eğitmen: {t.trainer}</p>
                    </div>
                    <button className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
                       Detaylar & Hazırlık
                       <ChevronRight size={16} />
                    </button>
                 </div>
               ))}
            </div>
         )}
      </div>
    </div>
  );
}
