"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Layers } from "lucide-react";
import Link from "next/link";
import { createDepartment } from "@/app/actions/branches";

export default function NewDepartmentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createDepartment({
        name,
        branchId: params.id,
      });
      router.push("/dashboard/settings/branches");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Departman eklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-md mx-auto pb-12 mt-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/settings/branches" className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Yeni Birim/Departman Ekle</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-6">
        <h3 className="text-md font-bold text-slate-900 dark:text-white mb-2 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-2">
          <Layers size={18} className="text-indigo-500" /> Birim Bilgileri
        </h3>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Birim/Departman Adı</label>
          <input 
            type="text" 
            className="input text-lg" 
            placeholder="Örn: İnsan Kaynakları, Depo" 
            required 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
        </div>

        <button type="submit" className="btn btn-primary w-full py-4 text-lg mt-4" disabled={loading}>
          {loading ? "Kaydediliyor..." : <><Save size={20} /> Birimi Oluştur</>}
        </button>
      </form>
    </div>
  );
}
