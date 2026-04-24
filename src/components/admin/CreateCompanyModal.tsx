"use client";

import { useState, useEffect } from "react";
import { X, Search, Building2, User, Phone, Mail, MapPin, Briefcase, Plus, Save } from "lucide-react";
import { getExperts, createClientCompany } from "@/app/actions/admin";
import { useRouter } from "next/navigation";

export function CreateCompanyModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [experts, setExperts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    taxNumber: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    sector: "",
    employeeCount: 0,
    riskClass: "HAZARDOUS",
    assignedExpertId: "",
    visitFrequency: "MONTHLY",
    notes: "",
  });

  useEffect(() => {
    if (isOpen) {
      getExperts().then(setExperts);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.assignedExpertId) {
      alert("Lütfen bir uzman atayın.");
      return;
    }
    setLoading(true);
    try {
      await createClientCompany(formData);
      onClose();
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Firma oluşturulurken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-white/10 w-full max-w-4xl rounded-3xl shadow-2xl shadow-blue-500/10 flex flex-col max-h-[90vh] overflow-hidden lg:grid lg:grid-cols-5 animate-in zoom-in-95 duration-300">
        
        {/* Left Side: Info */}
        <div className="hidden lg:flex lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-10 flex-col justify-between text-white">
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <Building2 className="text-white" size={28} />
            </div>
            <h2 className="text-3xl font-black mb-4">Yeni Müşteri Kaydı</h2>
            <p className="text-white/80 font-medium">
              Sisteme yeni bir müşteri firması ekleyerek, hizmet operasyonunu başlatın. Atanan uzman anında bildirim alacaktır.
            </p>
          </div>
          
          <div className="space-y-4">
             <div className="flex items-center gap-3 text-sm font-bold bg-white/10 p-3 rounded-xl border border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Otomatik Ziyaret Planlama
             </div>
             <div className="flex items-center gap-3 text-sm font-bold bg-white/10 p-3 rounded-xl border border-white/10">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                Gerçek Zamanlı Uzman Takibi
             </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-3 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-900/50 sticky top-0 z-10 backdrop-blur-md">
            <h3 className="font-bold text-slate-200">Firma Detayları</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar scroll-smooth">
            {/* Core Info Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Firma Adı</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      required
                      placeholder="Örn: Arslan Lojistik A.Ş."
                      className="admin-input-premium pl-12"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Vergi No</label>
                  <input 
                    required
                    placeholder="10 Haneli Vergi No"
                    className="admin-input-premium"
                    value={formData.taxNumber}
                    onChange={(e) => setFormData({...formData, taxNumber: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">İlgili Kişi</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      required
                      placeholder="Ad Soyad"
                      className="admin-input-premium pl-12"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Sektör</label>
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      required
                      placeholder="İnşaat, Üretim, Gıda vb."
                      className="admin-input-premium pl-12"
                      value={formData.sector}
                      onChange={(e) => setFormData({...formData, sector: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">E-Posta</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      required
                      type="email"
                      placeholder="iletisim@firma.com"
                      className="admin-input-premium pl-12"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Telefon</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      required
                      placeholder="05xx ..."
                      className="admin-input-premium pl-12"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Adres</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <textarea 
                    required
                    placeholder="Tam Adres Bilgisi"
                    className="admin-input-premium pl-12 min-h-[80px]"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Assignment Section */}
            <div className="pt-6 border-t border-white/5 space-y-6">
              <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                Operasyon & Atama
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Atanacak Uzmman</label>
                  <select 
                    required
                    className="admin-input-premium cursor-pointer"
                    value={formData.assignedExpertId}
                    onChange={(e) => setFormData({...formData, assignedExpertId: e.target.value})}
                  >
                    <option value="">Uzman Seçiniz</option>
                    {experts.map(ex => (
                      <option key={ex.id} value={ex.id}>{ex.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Ziyaret Sıklığı</label>
                  <select 
                    className="admin-input-premium cursor-pointer"
                    value={formData.visitFrequency}
                    onChange={(e) => setFormData({...formData, visitFrequency: e.target.value})}
                  >
                    <option value="WEEKLY">Haftalık</option>
                    <option value="BI_WEEKLY">15 Günde Bir</option>
                    <option value="MONTHLY">Aylık</option>
                    <option value="QUARTERLY">3 Ayda Bir</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Risk Sınıfı</label>
                  <select 
                    className="admin-input-premium cursor-pointer"
                    value={formData.riskClass}
                    onChange={(e) => setFormData({...formData, riskClass: e.target.value})}
                  >
                    <option value="LESS_HAZARDOUS">Az Tehlikeli</option>
                    <option value="HAZARDOUS">Tehlikeli</option>
                    <option value="VERY_HAZARDOUS">Çok Tehlikeli</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Çalışan Sayısı</label>
                  <input 
                    type="number"
                    className="admin-input-premium"
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({...formData, employeeCount: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus size={20} className="group-hover:rotate-90 transition-transform" />}
              Hizmet Operasyonunu Başlat
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
