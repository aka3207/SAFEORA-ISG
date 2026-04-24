"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Users, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { createTraining } from "@/app/actions/training";

export default function NewTrainingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "TEMEL_ISG",
    trainer: "",
    date: "",
    duration: 60,
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createTraining(formData);
      router.push("/dashboard/training");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Eğitim kaydedilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/training" className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Yeni Eğitim Tanımla</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Personelin alması gereken yeni bir eğitimi planlayın.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          Eğitim Detayları
        </h3>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Eğitim Konusu / Başlık</label>
          <input 
            type="text" 
            name="title" 
            className="input" 
            placeholder="Örn: Yüksekte Çalışma Temel Eğitimi" 
            required 
            value={formData.title} 
            onChange={handleChange} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Eğitim Türü</label>
            <select name="type" className="input" required value={formData.type} onChange={handleChange}>
              <option value="TEMEL_ISG">Temel İSG Eğitimi</option>
              <option value="TEKNIK">Teknik Eğitim</option>
              <option value="YENILEME">Yenileme Eğitimi</option>
              <option value="ACIL_DURUM">Acil Durum / Yangın Eğitimi</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Eğitmen / Kurum</label>
            <div className="relative">
              <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                name="trainer" 
                className="input pl-10" 
                placeholder="Eğitimi verecek kişi/kurum" 
                required 
                value={formData.trainer} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tarih & Saat</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="datetime-local" 
                name="date" 
                className="input pl-10" 
                required 
                value={formData.date} 
                onChange={handleChange} 
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Süre (Dakika)</label>
            <div className="relative">
              <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="number" 
                name="duration" 
                className="input pl-10" 
                min="15" 
                step="15" 
                required 
                value={formData.duration} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Açıklama / Hedef Kitle</label>
          <textarea 
            name="description" 
            className="input min-h-[100px]" 
            placeholder="Eğitimin içeriği veya kimlerin katılması gerektiği..." 
            value={formData.description} 
            onChange={handleChange}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-full py-3 flex items-center justify-center gap-2 text-lg" 
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Planlanıyor...
            </div>
          ) : (
             <>
               <Save size={22} />
               Eğitimi Planla & Kaydet
             </>
          )}
        </button>
      </form>
    </div>
  );
}
