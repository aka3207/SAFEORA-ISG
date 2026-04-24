"use client";

import { getTenants, updateTenantStatus } from "@/app/actions/admin";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  ShieldAlert, 
  Clock,
  Globe,
  Users,
  MapPin,
  AlertCircle
} from "lucide-react";
import { CreateCompanyModal } from "@/components/admin/CreateCompanyModal";
import { useState, useEffect } from "react";

export default function AdminTenantsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const data = await getTenants();
    setTenants(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-black tracking-tight">Müşteri Portföyü</h2>
            <p className="text-slate-400 text-sm font-medium">Sistemdeki tüm aktif hizmet verdiğiniz firmalar.</p>
         </div>
         <button onClick={() => setIsOpen(true)} className="btn-primary">
            <Plus size={18} />
            Yeni Müşteri Ekle
         </button>
      </div>

      <div className="admin-card">
         <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
               <input 
                  type="text" 
                  placeholder="Firma ismi veya vergi no ile ara..." 
                  className="search-bar-premium pl-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            </div>
            <div className="flex gap-2">
              <select className="bg-slate-800 border border-white/10 rounded-xl px-4 text-xs font-bold outline-none text-slate-300">
                 <option>Tüm Sektörler</option>
              </select>
              <select className="bg-slate-800 border border-white/10 rounded-xl px-4 text-xs font-bold outline-none text-slate-300">
                 <option>Aktif Firmalar</option>
                 <option>Pasif</option>
              </select>
            </div>
         </div>

         <div className="overflow-x-auto min-h-[400px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                 <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Yükleniyor...</p>
              </div>
            ) : filteredTenants.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                 <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 text-slate-600">
                    <Search size={32} />
                 </div>
                 <h4 className="font-bold text-slate-300">Firma Bulunamadı</h4>
                 <p className="text-slate-500 text-sm max-w-xs">Arama kriterlerine uygun firma bulunmuyor veya henüz kayıt yapmadınız.</p>
              </div>
            ) : (
              <table className="admin-table">
                 <thead>
                    <tr className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                       <th className="pb-4">Firma / Uzman</th>
                       <th className="pb-4">Durum</th>
                       <th className="pb-4 text-center">Ziyaret Sıklığı</th>
                       <th className="pb-4">Sağlık Skoru</th>
                       <th className="pb-4">Kayıt Tarihi</th>
                       <th className="pb-4 text-right">İşlemler</th>
                    </tr>
                 </thead>
                 <tbody className="space-y-4">
                    {filteredTenants.map((tenant: any) => (
                       <tr key={tenant.id} className="group cursor-pointer">
                          <td>
                             <div className="flex items-center gap-4">
                                <div className="w-11 h-11 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner group-hover:border-blue-500/30 transition-colors">
                                   <span className="font-black text-xs text-blue-400">{tenant.name[0]}</span>
                                </div>
                                <div className="flex flex-col">
                                   <p className="font-bold text-slate-200 group-hover:text-white transition-colors">{tenant.name}</p>
                                   <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                                      <Users size={12} className="text-slate-600" />
                                      {tenant.assignedExpert?.name || "Atanmamış"}
                                   </div>
                                </div>
                             </div>
                          </td>
                          <td>
                             <span className={`admin-badge ${
                                tenant.status === 'ACTIVE' ? 'admin-badge-success' : 'admin-badge-danger'
                             }`}>
                                {tenant.status}
                             </span>
                          </td>
                          <td>
                             <div className="flex flex-col items-center">
                                <span className="font-bold text-xs text-slate-300">{tenant.visitFrequency}</span>
                                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{tenant.riskClass}</span>
                             </div>
                          </td>
                          <td>
                             <div className="flex flex-col gap-1.5 w-24">
                                <div className="flex justify-between text-[10px] font-bold">
                                   <span className="text-slate-500 uppercase">UYUM</span>
                                   <span className={tenant.healthScore > 80 ? "text-emerald-400" : "text-amber-400"}>{tenant.healthScore}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
                                   <div 
                                      className={`h-full bg-gradient-to-r ${tenant.healthScore > 80 ? "from-emerald-600 to-emerald-400" : "from-amber-600 to-amber-400"}`} 
                                      style={{ width: `${tenant.healthScore}%` }}
                                   />
                                </div>
                             </div>
                          </td>
                          <td>
                             <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                <Clock size={14} className="text-slate-600" />
                                {new Date(tenant.createdAt).toLocaleDateString("tr-TR")}
                             </div>
                          </td>
                          <td className="text-right">
                             <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2.5 hover:bg-blue-500/10 text-blue-400 rounded-xl transition-all border border-transparent hover:border-blue-500/20">
                                   <ShieldAlert size={18} />
                                </button>
                                <button className="p-2.5 hover:bg-slate-800 text-slate-300 rounded-xl transition-all border border-transparent hover:border-white/10">
                                   <MoreHorizontal size={18} />
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
            )}
         </div>
      </div>

      <CreateCompanyModal isOpen={isOpen} onClose={() => {setIsOpen(false); fetchData();}} />
    </div>
  );
}
