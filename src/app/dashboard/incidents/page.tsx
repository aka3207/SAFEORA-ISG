import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import { Activity, Plus, Clock, ExternalLink, AlertTriangle, Image as ImageIcon, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import ExportButton from "@/components/dashboard/ExportButton";
import DeleteButton from "@/components/dashboard/DeleteButton";
import PageHeader from "@/components/dashboard/PageHeader";
import { deleteIncident } from "@/app/actions/incidents";

export default async function IncidentsPage() {
  const session = await auth();
  const user = session?.user as any;

  const incidents = await prisma.incident.findMany({
    where: {
      tenantId: user.tenantId,
    },
    include: {
      branch: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Kaza ve Ramak Kala Raporları" 
        description={`Toplam ${incidents.length} olay kaydı sistemde arşivlendi.`}
        actions={
          <>
            <ExportButton data={incidents} filename="olay_raporlari" />
            <Link href="/dashboard/incidents/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
              <Plus size={18} />
              Yeni Olay Bildir
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4">
        {incidents.length === 0 ? (
          <div className="safe-card p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
               <Activity size={40} className="text-slate-300" />
            </div>
            <h4 className="text-slate-900 font-bold mb-1">Olay Bildirimi Bulunmuyor</h4>
            <p className="text-slate-500 text-sm mb-6 max-w-xs">Henüz sistemde kayıtlı bir kaza veya ramak kala bulunmuyor.</p>
          </div>
        ) : (
          incidents.map((incident) => (
            <div key={incident.id} className="safe-card overflow-hidden bg-white group hover:border-slate-300 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex flex-col md:flex-row">
                 {/* Incident Preview / Image */}
                 <div className="w-full md:w-32 lg:w-40 h-40 bg-slate-100 shrink-0 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                   {incident.photos?.[0] ? (
                      <img src={incident.photos[0]} alt="Olay" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon size={32} />
                     </div>
                   )}
                   <div className={`
                     absolute top-3 left-3 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter shadow-sm
                     ${incident.type === "ACCIDENT" ? "bg-red-600 text-white" : "bg-amber-500 text-white"}
                   `}>
                     {incident.type === "ACCIDENT" ? "KAZA" : "RAMAK KALA"}
                   </div>
                 </div>
                 
                 {/* Content */}
                 <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                       <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                             <Clock size={12} className="text-blue-500" /> {new Date(incident.date).toLocaleDateString("tr-TR")}
                          </span>
                          <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                             <MapPin size={12} className="text-blue-500" /> {incident.branch?.name}
                          </span>
                       </div>
                       <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">{incident.title}</h4>
                       <p className="text-sm text-slate-500 line-clamp-2">{incident.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4 border-t border-slate-50 pt-4">
                       <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-400">Konum:</span>
                          <span className="text-[11px] font-extrabold text-slate-600">{incident.location || "Belirtilmemiş"}</span>
                       </div>
                       
                       <div className="flex items-center gap-2">
                          <Link 
                            href={`/dashboard/incidents/${incident.id}`} 
                            className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-200 transition-all flex items-center gap-1.5"
                          >
                             Detay
                             <ChevronRight size={14} />
                          </Link>
                          <DeleteButton id={incident.id} onDelete={deleteIncident} entityName="olay kaydını" />
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
