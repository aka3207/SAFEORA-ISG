import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import { FileText, Download, Clock, ShieldCheck, FileUp, ChevronRight, HardDrive, Filter } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import Link from "next/link";

export default async function DocumentsPage() {
  const session = await auth();
  const user = session?.user as any;

  const documents = await prisma.document.findMany({
    where: {
      tenantId: user.tenantId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = [
    { name: "Politikalar", icon: ShieldCheck, count: 4, color: "blue" },
    { name: "Prosedürler", icon: FileText, count: 12, color: "indigo" },
    { name: "Acil Planlar", icon: Clock, count: 3, color: "rose" },
    { name: "Formlar", icon: HardDrive, count: 25, color: "emerald" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Doküman Yönetimi" 
        description="Merkezi dokümantasyon, revizyon takibi ve yasal mevzuat kütüphanesi."
        actions={
          <Link href="/dashboard/documents/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
            <FileUp size={18} />
            Yeni Doküman Yükle
          </Link>
        }
      />

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.name} className="safe-card p-5 bg-white flex items-center gap-4 group hover:border-blue-200 transition-all duration-300 cursor-pointer">
             <div className={`
               p-3 rounded-xl border group-hover:scale-110 transition-transform
               ${cat.color === 'blue' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                 cat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                 cat.color === 'rose' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                 'bg-emerald-50 text-emerald-600 border-emerald-100'}
             `}>
                <cat.icon size={22} />
             </div>
             <div>
                <p className="text-sm font-black text-slate-900 leading-none mb-1">{cat.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cat.count} Dosya</p>
             </div>
          </div>
        ))}
      </div>

      {/* File List Container */}
      <div className="safe-card bg-white border border-slate-200 shadow-sm transition-all duration-300">
         <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Tüm Dokümanlar</h3>
            <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">
               <Filter size={14} />
               Filtrele
            </button>
         </div>
         
         <div className="divide-y divide-slate-100">
            {documents.length === 0 ? (
               <div className="p-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4">
                     <FileText className="text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-bold text-sm mb-2">Doküman Bulunmuyor</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">Sisteme henüz bir doküman yüklenmemiş.</p>
               </div>
            ) : (
               documents.map((doc) => (
                 <div key={doc.id} className="flex justify-between items-center p-4 hover:bg-slate-50/80 transition-colors group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <FileText size={20} />
                       </div>
                       <div>
                          <div className="text-sm font-bold text-slate-900 mb-0.5 group-hover:text-blue-600 transition-colors">{doc.name}</div>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                             <span className="text-blue-500">{doc.category}</span>
                             <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                             <span>Rev: {doc.version}</span>
                             <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                             <span>{new Date(doc.createdAt).toLocaleDateString("tr-TR")}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <Link href={doc.fileUrl || "#"} target="_blank" className="p-2.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-200 hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                          <Download size={18} />
                       </Link>
                       <button className="px-3 py-2 text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors">
                          Detay
                       </button>
                    </div>
                 </div>
               ))
            )}
         </div>
         
         <div className="p-4 bg-slate-50/50 flex justify-center">
            <button className="text-xs font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Daha Fazla Göster</button>
         </div>
      </div>
    </div>
  );
}
