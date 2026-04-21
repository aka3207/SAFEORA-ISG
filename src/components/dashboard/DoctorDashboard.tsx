import { 
  Heart, 
  Stethoscope, 
  Calendar, 
  ClipboardList,
  AlertCircle
} from "lucide-react";

export default function DoctorDashboard() {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="glass-card">
           <div style={{ color: "var(--primary)", marginBottom: "1rem" }}><Stethoscope size={24} /></div>
           <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Bekleyen Muayene</p>
           <h4 style={{ fontSize: "1.5rem" }}>12</h4>
        </div>
        <div className="glass-card">
           <div style={{ color: "var(--warning)", marginBottom: "1rem" }}><Calendar size={24} /></div>
           <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Haftalık Randevu</p>
           <h4 style={{ fontSize: "1.5rem" }}>45</h4>
        </div>
        <div className="glass-card">
           <div style={{ color: "var(--danger)", marginBottom: "1rem" }}><AlertCircle size={24} /></div>
           <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Kritik Sağlık Uyarısı</p>
           <h4 style={{ fontSize: "1.5rem" }}>3</h4>
        </div>
        <div className="glass-card">
           <div style={{ color: "var(--success)", marginBottom: "1rem" }}><Heart size={24} /></div>
           <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>İşe Uygunluk Oranı</p>
           <h4 style={{ fontSize: "1.5rem" }}>96%</h4>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="glass-card col-span-2">
           <h4 style={{ marginBottom: "1.5rem" }}>Günlük Muayene Takvimi</h4>
           <div className="flex flex-col gap-4">
              {[
                { name: "Can Yılmaz", dept: "Üretim", time: "09:30", type: "Periyodik" },
                { name: "Elif Demir", dept: "Depo", time: "10:15", type: "İşe Giriş" },
                { name: "Burak Kaya", dept: "Lojistik", time: "11:00", type: "Periyodik" },
              ].map((patient, i) => (
                <div key={i} className="flex justify-between items-center p-4 glass" style={{ borderRadius: "12px" }}>
                   <div className="flex items-center gap-4">
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {patient.name[0]}
                      </div>
                      <div>
                         <div style={{ fontWeight: 500 }}>{patient.name}</div>
                         <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{patient.dept} - {patient.type}</div>
                      </div>
                   </div>
                   <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: "bold" }}>{patient.time}</div>
                      <button className="btn-ghost" style={{ padding: "0.25rem", color: "var(--primary)", fontSize: "0.75rem" }}>Detay Gör</button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="glass-card">
           <h4 style={{ marginBottom: "1.5rem" }}>Hızlı Notlar</h4>
           <textarea 
             className="input" 
             placeholder="Sağlık notu ekleyin..." 
             style={{ height: "150px", resize: "none", marginBottom: "1rem" }}
           ></textarea>
           <button className="btn btn-primary w-full">Notu Kaydet</button>
        </div>
      </div>
    </div>
  );
}
