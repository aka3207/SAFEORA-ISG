"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Camera, MapPin, AlertCircle, X } from "lucide-react";
import Link from "next/link";
import { reportIncident } from "@/app/actions/incidents";

export default function NewIncidentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("NEAR_MISS");
  const [photos, setPhotos] = useState<string[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    severity: "MEDIUM",
    branchId: "",
  });

  useEffect(() => {
    async function fetchBranches() {
      const res = await fetch("/api/branches");
      if (res.ok) {
        const data = await res.json();
        setBranches(data);
        if (data.length > 0) setFormData(prev => ({ ...prev, branchId: data[0].id }));
      }
    }
    fetchBranches();
  }, []);

  const handlePhotoUpload = () => {
    const mockPhoto = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=200";
    setPhotos([...photos, mockPhoto]);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await reportIncident({
        ...formData,
        type,
        photos,
      });
      router.push("/dashboard/incidents");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Olay bildirilirken bir hata oluştu.");
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
        <Link href="/dashboard/incidents" className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Yeni Olay Bildirimi</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Lütfen gerçekleşen olayın detaylarını eksiksiz girin.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Type Selector */}
        <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-2">
           <button 
             type="button"
             onClick={() => setType("ACCIDENT")}
             className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 ${type === "ACCIDENT" ? "bg-red-500 text-white shadow-md shadow-red-500/20" : "bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
           >
             <AlertCircle size={18} />
             İş Kazası
           </button>
           <button 
             type="button"
             onClick={() => setType("NEAR_MISS")}
             className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 ${type === "NEAR_MISS" ? "bg-amber-500 text-white shadow-md shadow-amber-500/20" : "bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
           >
             <AlertCircle size={18} />
             Ramak Kala
           </button>
           <button 
             type="button"
             onClick={() => setType("UNSAFE_ACT")}
             className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 ${type === "UNSAFE_ACT" ? "bg-blue-500 text-white shadow-md shadow-blue-500/20" : "bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
           >
             <AlertCircle size={18} />
             Güvensiz Durum
           </button>
        </div>

        {/* Photo Upload Section */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
           <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
             <Camera className="text-blue-500" size={20} />
             Olay Yeri Fotoğrafları
           </h3>
           <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              <button 
                type="button"
                onClick={handlePhotoUpload}
                className="flex-shrink-0 w-28 h-28 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-blue-500 transition-colors bg-slate-50 dark:bg-slate-900/50"
              >
                <Camera size={28} />
                <span className="text-xs font-semibold">Fotoğraf Ekle</span>
              </button>
              
              {photos.map((p, i) => (
                <div key={i} className="relative flex-shrink-0 group">
                   <img src={p} alt="Upload" className="w-28 h-28 object-cover rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm" />
                   <button 
                     type="button"
                     onClick={() => removePhoto(i)}
                     className="absolute -top-2 -right-2 bg-red-500 text-white border-2 border-white dark:border-slate-900 rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                   >
                     <X size={14} />
                   </button>
                </div>
              ))}
           </div>
        </div>

        {/* Details Section */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-6">
           <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Olay Başlığı</label>
              <input 
                type="text" 
                name="title" 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white font-medium placeholder:font-normal placeholder:text-slate-400" 
                placeholder="Örn: B1 Depo Forklift Çarpışması" 
                required 
                value={formData.title} 
                onChange={handleChange} 
              />
           </div>
           
           <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Detaylı Açıklama</label>
              <textarea 
                name="description" 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 min-h-[140px] resize-y" 
                placeholder="Olay tam olarak nasıl gerçekleşti? Kimler etkilendi? Olay anındaki şartlar nelerdi?" 
                required 
                value={formData.description} 
                onChange={handleChange}
              ></textarea>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tarih & Saat</label>
                <input 
                  type="datetime-local" 
                  name="date" 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white" 
                  required 
                  value={formData.date} 
                  onChange={handleChange} 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">İlgili Şube / Tesis</label>
                <select 
                  name="branchId" 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white appearance-none" 
                  required 
                  onChange={handleChange} 
                  value={formData.branchId}
                >
                  <option value="" disabled>Şube Seçiniz</option>
                  {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
           </div>

           <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Spesifik Konum / Departman</label>
              <div className="relative">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <MapPin size={20} />
                 </div>
                 <input 
                   type="text" 
                   name="location" 
                   className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white placeholder:text-slate-400" 
                   placeholder="Örn: B1 Depo, Yükleme Alanı" 
                   value={formData.location} 
                   onChange={handleChange} 
                 />
              </div>
           </div>
        </div>

        <button 
          type="submit" 
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2" 
          disabled={loading}
        >
           {loading ? (
             <div className="flex items-center gap-2">
               <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
               Raporlanıyor...
             </div>
           ) : (
             <>
               <Save size={22} />
               Olayı Sisteme Kaydet
             </>
           )}
        </button>
      </form>
    </div>
  );
}
