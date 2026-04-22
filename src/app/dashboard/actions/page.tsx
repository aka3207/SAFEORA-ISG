import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import { ClipboardList, Clock, CheckCircle2, User, AlertOctagon, ChevronRight } from "lucide-react";
import CompleteActionButton from "@/components/dashboard/CompleteActionButton";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { deleteAction } from "@/app/actions/actions";
import PageHeader from "@/components/dashboard/PageHeader";

export default async function ActionsPage() {
  const session = await auth();
  const user = session?.user as any;

  const actions = await prisma.action.findMany({
    where: {
      creator: { tenantId: user.tenantId },
    },
    include: {
      assignee: true,
      risk: true,
      incident: true,
    },
    orderBy: {
      deadline: "asc",
    },
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL": return "text-red-700 bg-red-50 border-red-100";
      case "HIGH": return "text-rose-700 bg-rose-50 border-rose-100";
      case "MEDIUM": return "text-amber-700 bg-amber-50 border-amber-100";
      default: return "text-emerald-700 bg-emerald-50 border-emerald-100";
    }
  };

  const openCount = actions.filter(a => a.status === "OPEN").length;
  const completedCount = actions.filter(a => a.status === "COMPLETED").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <PageHeader 
        title="Aksiyon Takibi (DÖF)" 
        description="Düzeltici ve Önleyici Faaliyetlerin (DÖF) merkezi takibi ve görev dağılımı."
        actions={
          <div className="flex gap-4">
             <div className="safe-card px-4 py-2 bg-white flex flex-col items-center min-w-[100px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Açık</span>
                <span className="text-lg font-black text-slate-900 leading-none">{openCount}</span>
             </div>
             <div className="safe-card px-4 py-2 bg-white flex flex-col items-center min-w-[100px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Biten</span>
                <span className="text-lg font-black text-emerald-600 leading-none">{completedCount}</span>
             </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4">
        {actions.length === 0 ? (
          <div className="safe-card p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4 text-slate-300">
               <ClipboardList size={40} />
            </div>
            <h4 className="text-slate-900 font-bold mb-1">Aksiyon Bulunmuyor</h4>
            <p className="text-slate-500 text-sm">Sistemde henüz atanmış bir aksiyon kaydı bulunmuyor.</p>
          </div>
        ) : (
          actions.map((action) => (
            <div key={action.id} className="safe-card p-5 bg-white group hover:border-blue-200 transition-all duration-300 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className={`
                       w-14 h-14 rounded-2xl flex items-center justify-center border-2 shrink-0 transition-transform group-hover:scale-105
                       ${action.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"}
                    `}>
                      {action.status === "COMPLETED" ? <CheckCircle2 size={28} /> : <AlertOctagon size={28} />}
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-1.5">
                         <h4 className="text-lg font-black text-slate-900 leading-none">{action.title}</h4>
                         <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider border ${getPriorityColor(action.priority)}`}>
                            {action.priority}
                         </span>
                      </div>
                      <p className="text-sm text-slate-500 max-w-[500px] mb-2 line-clamp-1">{action.description}</p>
                      <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                         <span className="flex items-center gap-1.5"><User size={13} className="text-blue-500" /> {action.assignee?.name || "Atanmamış"}</span>
                         <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                         <span className="flex items-center gap-1.5"><Clock size={13} className="text-rose-500" /> Termin: {new Date(action.deadline).toLocaleDateString("tr-TR")}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                     {action.status !== "COMPLETED" && (
                        <div className="shrink-0 scale-90 md:scale-100">
                           <CompleteActionButton id={action.id} />
                        </div>
                     )}
                     <div className="shrink-0 scale-90 md:scale-100">
                        <DeleteButton id={action.id} onDelete={deleteAction} entityName="aksiyonu" />
                     </div>
                     <ChevronRight className="w-5 h-5 text-slate-300 hidden md:block group-hover:text-slate-900 transition-colors" />
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
