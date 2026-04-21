import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Stethoscope, Heart, AlertCircle, FilePlus, Search, ShieldCheck, Activity, Calendar } from "lucide-react";
import { redirect } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import Link from "next/link";

export default async function HealthPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  // Role check: Only Doctor, Company Admin and Super Admin can see this
  if (!["DOCTOR", "COMPANY_ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    redirect("/dashboard");
  }

  const employees = await prisma.employee.findMany({
    where: {
      tenantId: user.tenantId,
    },
    include: {
      healthRecords: {
        orderBy: {
          date: "desc",
        },
        take: 1,
      },
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Sağlık ve Muayene Takibi" 
        description="Çalışan sağlık raporları, periyodik muayene planlaması ve işe giriş kontrolleri."
        actions={
          <Link href="/dashboard/health/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
            <FilePlus size={18} />
            Yeni Muayene Kaydı
          </Link>
        }
      />

      {/* Mini Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <HealthStatCard title="Geciken Muayene" value="8" icon={AlertCircle} color="rose" />
        <HealthStatCard title="Haftalık Plan" value="14" icon={Stethoscope} color="amber" />
        <HealthStatCard title="Sağlık Uygunluğu" value="%98.4" icon={ShieldCheck} color="emerald" />
        <HealthStatCard title="Toplam Kayıt" value={employees.length.toString()} icon={Activity} color="blue" />
      </div>

      {/* Premium Table Container */}
      <div className="safe-card overflow-hidden bg-white border border-slate-200 shadow-sm transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Çalışan</th>
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Son Muayene</th>
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Muayene Tipi</th>
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Sonuç</th>
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Gelecek Muayene</th>
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((emp) => {
                const lastRecord = emp.healthRecords[0];
                return (
                  <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                           {emp.firstName[0]}{emp.lastName[0]}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-sm font-bold text-slate-900 leading-none mb-1">{emp.firstName} {emp.lastName}</span>
                           <span className="text-[10px] font-semibold text-slate-400">{emp.position}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                         <Calendar className="w-3.5 h-3.5 text-blue-500" />
                         {lastRecord ? new Date(lastRecord.date).toLocaleDateString("tr-TR") : "Kayıt Yok"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-xs font-bold text-slate-500">{lastRecord?.type || "-"}</span>
                    </td>
                    <td className="px-6 py-4">
                      {lastRecord ? (
                        <span className={`
                          inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border
                          ${lastRecord.results === "FIT" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                            : "bg-amber-50 text-amber-700 border-amber-100"}
                        `}>
                          {lastRecord.results === "FIT" ? "Uygun" : "Kontrollü"}
                        </span>
                      ) : "-"}
                    </td>
                    <td className="px-6 py-4">
                      {lastRecord?.nextExamDate ? (
                        <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                           {new Date(lastRecord.nextExamDate).toLocaleDateString("tr-TR")}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/dashboard/employees/${emp.id}`} className="inline-block px-3 py-1.5 bg-slate-50 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200 hover:bg-slate-200 transition-all">
                        Detaylar
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HealthStatCard({ title, value, icon: Icon, color }: any) {
   const variants: any = {
      rose: "text-rose-600 bg-rose-50 border-rose-100",
      amber: "text-amber-600 bg-amber-50 border-amber-100",
      emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
      blue: "text-blue-600 bg-blue-50 border-blue-100"
   };
   return (
      <div className="safe-card p-5 bg-white flex flex-col gap-3 group hover:border-slate-300">
         <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm group-hover:scale-110 transition-transform ${variants[color]}`}>
            <Icon size={20} />
         </div>
         <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
            <h4 className="text-2xl font-black text-slate-900">{value}</h4>
         </div>
      </div>
   );
}
