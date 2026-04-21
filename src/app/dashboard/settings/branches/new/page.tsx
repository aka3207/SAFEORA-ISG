"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Building2, MapPin } from "lucide-react";
import Link from "next/link";
import { createBranch } from "@/app/actions/branches";

export default function NewBranchPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createBranch(formData);
      router.push("/dashboard/settings/branches");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Şube eklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/settings/branches" className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Yeni Şube Ekle</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Sisteme yeni bir tesis veya lokasyon kaydedin.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-2">
          <Building2 size={20} className="text-blue-500" /> Şube Bilgileri
        </h3>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Şube / Tesis Adı</label>
          <input 
            type="text" 
            name="name" 
            className="input text-lg" 
            placeholder="Örn: Gebze Fabrika" 
            required 
            value={formData.name} 
            onChange={handleChange} 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Bulunduğu İl / Şehir</label>
          <div className="relative">
             <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
               type="text" 
               name="city" 
               className="input pl-10" 
               placeholder="Örn: Kocaeli" 
               required 
               value={formData.city} 
               onChange={handleChange} 
             />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Açık Adres (Opsiyonel)</label>
          <textarea 
            name="address" 
            className="input min-h-[100px]" 
            placeholder="Açık adresi buraya girebilirsiniz..." 
            value={formData.address} 
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full py-4 text-lg mt-4" disabled={loading}>
          {loading ? "Kaydediliyor..." : <><Save size={20} /> Şubeyi Oluştur</>}
        </button>
      </form>
    </div>
  );
}
