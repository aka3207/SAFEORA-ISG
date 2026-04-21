import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Plus, User, Search, Filter, Download, MoreVertical } from "lucide-react";
import Link from "next/link";
import ExportButton from "@/components/dashboard/ExportButton";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { deleteEmployee } from "@/app/actions/employees";
import PageHeader from "@/components/dashboard/PageHeader";

export default async function EmployeesPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  const employees = await prisma.employee.findMany({
    where: {
      tenantId: user.tenantId,
    },
    include: {
      branch: true,
      department: true,
    },
    orderBy: {
      lastName: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Çalışan Yönetimi" 
        description={`Sistemde kayıtlı toplam ${employees.length} personel bulunuyor.`}
        actions={
          <>
            <ExportButton data={employees} filename="calisan_listesi" />
            <Link href="/dashboard/employees/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
              <Plus size={18} />
              Yeni Çalışan Ekle
            </Link>
          </>
        }
      />

      {/* Modern Table Container */}
      <div className="safe-card overflow-hidden bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md animate-in fade-in duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">İsim Soyisim</th>
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Birim / Şube</th>
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Görev</th>
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Durum</th>
                <th className="px-6 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                         <User className="text-slate-300 w-8 h-8" />
                      </div>
                      <p className="text-slate-500 font-bold text-sm">Henüz bir çalışan kaydı bulunmuyor.</p>
                      <Link href="/dashboard/employees/new" className="text-blue-600 font-bold text-xs uppercase tracking-wider hover:underline">İlk Kaydı Oluşturun</Link>
                    </div>
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white text-xs font-black shadow-sm group-hover:scale-105 transition-transform">
                          {emp.firstName[0]}{emp.lastName[0]}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-sm font-bold text-slate-900 leading-none mb-1">{emp.firstName} {emp.lastName}</span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Kimlik No Deaktif</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                         <span className="text-sm font-bold text-slate-700 leading-none mb-1">{emp.branch?.name}</span>
                         <span className="text-[11px] font-semibold text-slate-400">{emp.department?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                         <span className="text-sm font-bold text-slate-600">{emp.position}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`
                        inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider
                        ${emp.status === "ACTIVE" 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : "bg-red-50 text-red-700 border border-red-100"}
                      `}>
                        {emp.status === "ACTIVE" ? "Aktif" : "Pasif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/dashboard/employees/${emp.id}`} 
                          className="px-3 py-1.5 bg-slate-50 text-slate-700 text-[11px] font-bold rounded-lg hover:bg-slate-200 transition-all border border-slate-200"
                        >
                          Detay
                        </Link>
                        <DeleteButton id={emp.id} onDelete={deleteEmployee} entityName="çalışanı" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer / Pagination Placeholder */}
        {employees.length > 0 && (
          <div className="bg-slate-50/50 border-t border-slate-100 px-6 py-4 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Sayfa 1 / 1
            </span>
            <div className="flex gap-2">
               <button className="p-1 px-2 text-[10px] font-black uppercase text-slate-300 cursor-not-allowed">Geri</button>
               <button className="p-1 px-2 text-[10px] font-black uppercase text-slate-300 cursor-not-allowed">İleri</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
