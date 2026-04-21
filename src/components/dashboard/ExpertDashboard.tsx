import { 
  Camera, 
  ShieldAlert, 
  FileText, 
  CheckCircle2,
  Clock,
  Plus
} from "lucide-react";
import Link from "next/link";

export default function ExpertDashboard() {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3>Hoş Geldiniz, İSG Uzmanı</h3>
          <p>Bugün yapılacak 4 saha denetiminiz var.</p>
        </div>
        <div className="flex gap-4">
           <Link href="/risks/new" className="btn btn-outline flex items-center gap-2">
              <ShieldAlert size={20} />
              Risk Kaydı
           </Link>
           <Link href="/incidents/new" className="btn btn-primary flex items-center gap-2">
              <Camera size={20} />
              Hızlı Foto Rapor
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="glass-card col-span-2">
          <h4 style={{ marginBottom: "1rem" }}>Aktif Görevlerim</h4>
          <div className="flex flex-col gap-3">
             {[
               { title: "Zemin Katta Fiziksel Risk Taraması", time: "09:00", status: "Tamamlandı" },
               { title: "Yemekhane Hijyen Denetimi", time: "11:30", status: "Sıradaki" },
               { title: "KKD Kullanım Kontrolü (B1 Blok)", time: "14:00", status: "Bekliyor" },
               { title: "Yangın Tüpü Kontrol Listesi", time: "16:00", status: "Bekliyor" },
             ].map((task, i) => (
               <div key={i} className="flex items-center justify-between p-4 glass" style={{ borderRadius: "12px" }}>
                  <div className="flex items-center gap-4">
                     <div style={{ color: task.status === "Tamamlandı" ? "var(--success)" : "var(--text-muted)" }}>
                        {task.status === "Tamamlandı" ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                     </div>
                     <div>
                        <div style={{ fontWeight: 500 }}>{task.title}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Saat: {task.time}</div>
                     </div>
                  </div>
                  <span className={`badge ${task.status === "Tamamlandı" ? "badge-success" : "badge-warning"}`}>
                     {task.status}
                  </span>
               </div>
             ))}
          </div>
        </div>

        <div className="glass-card">
           <h4 style={{ marginBottom: "1rem" }}>Hızlı İstatistikler</h4>
           <div className="flex flex-col gap-6">
              <div style={{ textAlign: "center", padding: "1.5rem", background: "rgba(14, 165, 233, 0.05)", borderRadius: "12px" }}>
                 <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary)" }}>12</div>
                 <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Bu Ay Tespit Edilen Risk</div>
              </div>
              <div style={{ textAlign: "center", padding: "1.5rem", background: "rgba(16, 185, 129, 0.05)", borderRadius: "12px" }}>
                 <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--success)" }}>8</div>
                 <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Kapatılan Aksiyonlar</div>
              </div>
              <div style={{ textAlign: "center", padding: "1.5rem", background: "rgba(239, 68, 68, 0.05)", borderRadius: "12px" }}>
                 <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--danger)" }}>3</div>
                 <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Geciken Faaliyetler</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
