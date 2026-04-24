"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Camera, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle,
  ClipboardList,
  User,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { submitVisitReport, getExpertCompanies } from "@/app/actions/expert";

export default function NewVisitReportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    visitId: searchParams.get("visitId") || "",
    tenantId: "",
    observations: "",
    unsafeConditions: "",
    actionsRequired: "",
    recommendation: "",
    contactPerson: "",
  });

  useEffect(() => {
    getExpertCompanies().then(setCompanies);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.visitId && !formData.tenantId) {
      alert("Lütfen bir firma seçin.");
      return;
    }
    setLoading(true);
    
    try {
      // In a real app we'd need to find or create a visit if visitId is missing
      // For this MVP we assume visitId comes from a list or we handle it
      await submitVisitReport({
        visitId: formData.visitId,
        observations: formData.observations,
        unsafeConditions: formData.unsafeConditions,
        actionsRequired: formData.actionsRequired,
        recommendation: formData.recommendation
      });
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Rapor sunulurken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/dashboard" className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Yeni Saha Ziyaret Raporu</h2>
          <p className="text-slate-500 font-medium">Lütfen ziyaretteki gözlemlerinizi ve aksiyonları detaylıca girin.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Selection Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
           <h3 className="text-sm font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
             <Building2 size={18} /> Firma Bilgileri
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase ml-1">Firma Seçimi</label>
                 <select 
                   required
                   className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-900 dark:text-white appearance-none"
                   value={formData.tenantId}
                   onChange={(e) => {
                     const tenant = companies.find(c => c.id === e.target.value);
                     setFormData({
                       ...formData, 
                       tenantId: e.target.value,
                       visitId: tenant?.visits[0]?.id || ""
                     });
                   }}
                 >
                   <option value="">Firma Seçiniz</option>
                   {companies.map(c => (
                     <option key={c.id} value={c.id}>{c.name}</option>
                   ))}
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase ml-1">Görüşülen Kişi</label>
                 <div className="relative group">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                   <input 
                     placeholder="Ad Soyad"
                     className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-900 dark:text-white"
                     value={formData.contactPerson}
                     onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                   />
                 </div>
              </div>
           </div>
        </div>

        {/* Observation Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
           <h3 className="text-sm font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
             <ClipboardList size={18} /> Gözlemler & Tespitler
           </h3>
           
           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Genel Gözlemler</label>
              <textarea 
                required
                placeholder="Ziyaret sırasında yapılan çalışmalar ve genel durum..."
                className="w-full p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 dark:text-white min-h-[120px]"
                value={formData.observations}
                onChange={(e) => setFormData({...formData, observations: e.target.value})}
              />
           </div>

           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Güvensiz Durum / Davranışlar</label>
              <div className="relative group">
                <AlertTriangle className="absolute left-5 top-5 text-amber-500" size={20} />
                <textarea 
                  placeholder="Tespit edilen riskli durumlar..."
                  className="w-full p-5 pl-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-slate-900 dark:text-white min-h-[80px]"
                  value={formData.unsafeConditions}
                  onChange={(e) => setFormData({...formData, unsafeConditions: e.target.value})}
                />
              </div>
           </div>
        </div>

        {/* Actions Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
           <h3 className="text-sm font-black text-violet-500 uppercase tracking-widest flex items-center gap-2">
             <CheckCircle2 size={18} /> Düzeltici Aksiyonlar
           </h3>
           
           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Gerekli Önlemler</label>
              <textarea 
                placeholder="Acilen yapılması gereken düzeltmeler..."
                className="w-full p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-slate-900 dark:text-white min-h-[100px]"
                value={formData.actionsRequired}
                onChange={(e) => setFormData({...formData, actionsRequired: e.target.value})}
              />
           </div>

           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Gelecek Ziyaret Önerisi</label>
              <textarea 
                placeholder="Bir sonraki ziyarette kontrol edilecek spesifik noktalar..."
                className="w-full p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 dark:text-white min-h-[80px]"
                value={formData.recommendation}
                onChange={(e) => setFormData({...formData, recommendation: e.target.value})}
              />
           </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-slate-900 dark:bg-blue-600 text-white font-black text-lg rounded-[32px] shadow-2xl shadow-blue-500/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={24} />
              Raporu Onayla ve Ziyareti Tamamla
            </>
          )}
        </button>
      </form>
    </div>
  );
}
