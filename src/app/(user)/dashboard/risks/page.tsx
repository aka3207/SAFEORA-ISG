import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import { ShieldAlert, Plus, AlertCircle, ChevronRight, Zap, Target } from "lucide-react";
import Link from "next/link";
import ExportButton from "@/components/dashboard/ExportButton";
import DeleteButton from "@/components/dashboard/DeleteButton";
import PageHeader from "@/components/dashboard/PageHeader";
import { deleteRisk } from "@/app/actions/risks";

export default async function RisksPage() {
  const session = await auth();
  const user = session?.user as any;

  const risks = await prisma.riskAnalysis.findMany({
    where: {
      tenantId: user.tenantId,
    },
    orderBy: {
      riskScore: "desc",
    },
  });

  const getLevelColor = (score: number) => {
    if (score >= 12) return "bg-rose-50 text-rose-700 border-rose-100";
    if (score >= 5) return "bg-amber-50 text-amber-700 border-amber-100";
    return "bg-emerald-50 text-emerald-700 border-emerald-100";
  };

  const getIntensityBadge = (score: number) => {
    if (score >= 12) return "High";
    if (score >= 5) return "Medium";
    return "Low";
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Risk Değerlendirmeleri" 
        description={`Şirket genelinde tanımlanmış ${risks.length} aktif risk kaydı bulunuyor.`}
        actions={
          <>
            <ExportButton data={risks} filename="risk_analizi_listesi" />
            <Link href="/dashboard/risks/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
              <Plus size={18} />
              Yeni Risk Analizi
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4">
        {risks.length === 0 ? (
          <div className="safe-card p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
               <ShieldAlert size={40} className="text-slate-300" />
            </div>
            <h4 className="text-slate-900 font-bold mb-1">Risk Kaydı Bulunmuyor</h4>
            <p className="text-slate-500 text-sm mb-6 max-w-xs">Henüz bir risk analizi yapılmamış. Güvenli bir çalışma ortamı için ilk kaydınızı oluşturun.</p>
            <Link href="/dashboard/risks/new" className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
               İlk Kaydı Oluştur
            </Link>
          </div>
        ) : (
          risks.map((risk) => (
            <div key={risk.id} className="safe-card p-5 bg-white flex flex-col md:flex-row justify-between items-center group hover:border-blue-200 animate-in fade-in slide-in-from-left-4 duration-500">
               <div className="flex items-center gap-6 w-full md:w-auto">
                  {/* Score Indicator */}
                  <div className={`
                    w-16 h-16 rounded-2xl flex flex-col items-center justify-center border-2 shrink-0 transition-transform group-hover:scale-105
                    ${getLevelColor(risk.riskScore)}
                  `}>
                    <span className="text-2xl font-black leading-none">{risk.riskScore}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest mt-0.5 opacity-70">SKOR</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-1.5">
                       <h4 className="text-lg font-black text-slate-900 leading-none">{risk.title}</h4>
                       <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getLevelColor(risk.riskScore)}`}>
                          {risk.riskScore >= 12 ? "CRITICAL" : risk.riskScore >= 5 ? "WARNING" : "SAFE"}
                       </span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                          <Target className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[200px] md:max-w-[400px]">{risk.hazardSource}</span>
                       </div>
                    </div>
                  </div>
               </div>
               
               <div className="flex items-center gap-3 mt-4 md:mt-0 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                  <Link 
                    href={`/dashboard/risks/${risk.id}`} 
                    className="px-4 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-200 transition-all"
                  >
                    Detayları Gör
                  </Link>
                  <DeleteButton id={risk.id} onDelete={deleteRisk} entityName="risk kaydını" />
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors hidden md:block" />
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
