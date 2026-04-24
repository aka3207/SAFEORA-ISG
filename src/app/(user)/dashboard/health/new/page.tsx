"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, HeartPulse, FileText, User } from "lucide-react";
import Link from "next/link";
import { createHealthRecord } from "@/app/actions/health";

export default function NewHealthRecordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    type: "PERIODIC",
    date: "",
    results: "FIT",
    nextExamDate: "",
    findings: "",
    doctorNotes: "",
  });

  useEffect(() => {
    // Fetch employees for selection
    async function fetchEmployees() {
      try {
        const res = await fetch("/api/employees");
        if (res.ok) {
          const data = await res.json();
          setEmployees(data);
          if (data.length > 0) setFormData(prev => ({ ...prev, employeeId: data[0].id }));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createHealthRecord(formData);
      router.push("/dashboard/health");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Kayıt oluşturulurken bir hata oluştu. Doktor yetkisine sahip olduğunuzdan emin olun.");
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
        <Link href="/dashboard/health" className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Yeni Muayene Kaydı</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Personelin periyodik veya diğer sağlık kontrollerini sisteme işleyin.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="glass-card flex flex-col gap-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-2">
            <User size={20} className="text-blue-500" /> Temel Bilgiler
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Muayene Edilen Çalışan</label>
              <select name="employeeId" className="input appearance-none" required value={formData.employeeId} onChange={handleChange}>
                <option value="" disabled>Çalışan Seçiniz...</option>
                {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName} - {e.tcNo}</option>)}
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Muayene Tipi</label>
              <select name="type" className="input appearance-none" required value={formData.type} onChange={handleChange}>
                <option value="PERIODIC">Periyodik Muayene</option>
                <option value="INITIAL">İşe Giriş Muayenesi</option>
                <option value="RETURN_TO_WORK">İşe Dönüş Muayenesi</option>
                <option value="OTHER">Diğer Kontrol</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Muayene Tarihi</label>
              <input type="datetime-local" name="date" className="input" required value={formData.date} onChange={handleChange} />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Sonraki Kontrol Tarihi</label>
              <input type="datetime-local" name="nextExamDate" className="input" value={formData.nextExamDate} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="glass-card flex flex-col gap-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-2">
            <HeartPulse size={20} className="text-rose-500" /> Tıbbi Sonuçlar
          </h3>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">İş Görme Uygunluğu</label>
            <div className="flex gap-4">
               <button type="button" onClick={() => setFormData({...formData, results: "FIT"})} className={`flex-1 py-3 px-4 font-bold rounded-xl border transition-all ${formData.results === "FIT" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-white text-slate-500 border-slate-200"}`}>İşe Uygun (FIT)</button>
               <button type="button" onClick={() => setFormData({...formData, results: "FIT_WITH_CONDITIONS"})} className={`flex-1 py-3 px-4 font-bold rounded-xl border transition-all ${formData.results === "FIT_WITH_CONDITIONS" ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-white text-slate-500 border-slate-200"}`}>Koşullu Uygun</button>
               <button type="button" onClick={() => setFormData({...formData, results: "UNFIT"})} className={`flex-1 py-3 px-4 font-bold rounded-xl border transition-all ${formData.results === "UNFIT" ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-white text-slate-500 border-slate-200"}`}>Uygun Değil (UNFIT)</button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Klinik Bulgular</label>
            <textarea name="findings" className="input min-h-[100px]" placeholder="Fiziki muayene, laboratuvar veya radyoloji bulguları..." value={formData.findings} onChange={handleChange}></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">İşyeri Hekimi Notları / Tavsiyeler</label>
            <textarea name="doctorNotes" className="input min-h-[100px]" placeholder="Eğer koşullu uygunluk verdiyse çalışacağı kısıtlamalar..." value={formData.doctorNotes} onChange={handleChange}></textarea>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full py-4 text-lg mt-2" disabled={loading}>
          {loading ? "Kaydediliyor..." : <><Save size={20} /> Kaydı Onayla ve Sisteme İşle</>}
        </button>
      </form>
    </div>
  );
}
