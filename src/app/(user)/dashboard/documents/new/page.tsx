"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, FolderOpen, Tag, Calendar, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { createDocument } from "@/app/actions/documents";

export default function NewDocumentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "POLICY",
    fileUrl: "",
    version: "1.0",
    expiryDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createDocument(formData);
      router.push("/dashboard/documents");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Doküman kaydedilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/documents" className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Yeni Doküman Ekle</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Stratejik belgeleri, planları ve prosedürleri kütüphaneye dahil edin.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="glass-card flex flex-col gap-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-2">
            <FolderOpen size={20} className="text-blue-500" /> Doküman Meta Verileri
          </h3>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Doküman Başlığı / Adı</label>
            <input 
              type="text" 
              name="name" 
              className="input text-lg" 
              placeholder="Örn: 2026 Acil Durum Tahliye Planı" 
              required 
              value={formData.name} 
              onChange={handleChange} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Kategori</label>
              <div className="relative">
                <Tag size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select name="category" className="input pl-10 appearance-none" required value={formData.category} onChange={handleChange}>
                  <option value="POLICY">Politika / Yönerge</option>
                  <option value="PROCEDURE">Prosedür / Talimat</option>
                  <option value="EMERGENCY_PLAN">Acil Durum Planı</option>
                  <option value="FORM">Form / Tutanak</option>
                  <option value="OTHER">Diğer Türler</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Versiyon Nu.</label>
              <input 
                type="text" 
                name="version" 
                className="input" 
                placeholder="Örn: 1.0 veya 2026.1" 
                required 
                value={formData.version} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Belge Bağlantısı (URL)</label>
               <div className="relative">
                 <LinkIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                   type="url" 
                   name="fileUrl" 
                   className="input pl-10" 
                   placeholder="https://drive.google.com/..." 
                   required 
                   value={formData.fileUrl} 
                   onChange={handleChange} 
                 />
               </div>
               <span className="text-[10px] text-slate-500">Demoda doğrudan bulut URL'si yapıştırabilirsiniz.</span>
             </div>

             <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Geçerlilik Bitiş Tarihi (Opsiyonel)</label>
               <div className="relative">
                 <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                   type="date" 
                   name="expiryDate" 
                   className="input pl-10" 
                   value={formData.expiryDate} 
                   onChange={handleChange} 
                 />
               </div>
             </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full py-4 text-lg" disabled={loading}>
          {loading ? "Yükleniyor..." : <><Save size={20} /> Kütüphaneye Ekle</>}
        </button>
      </form>
    </div>
  );
}
