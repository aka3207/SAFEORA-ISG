import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";
import { Download, FileText, Printer } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2>Raporlama ve Analiz</h2>
          <p style={{ color: "var(--text-muted)" }}>Şirketinizin İSG performansını detaylı grafiklerle izleyin.</p>
        </div>
        <div className="flex gap-3">
           <button className="btn btn-outline flex items-center gap-2">
              <Printer size={20} />
              Yazdır
           </button>
           <button className="btn btn-primary flex items-center gap-2">
              <Download size={20} />
              PDF Rapor İndir
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
         <AnalyticsCharts />
         
         <div className="grid grid-cols-3 gap-6">
            <div className="glass-card">
               <h4 style={{ marginBottom: "1rem" }}>Aylık İSG Özeti</h4>
               <div className="flex flex-col gap-4">
                  <div className="flex justify-between border-bottom pb-2" style={{ borderBottom: "1px solid var(--border)" }}>
                     <span style={{ fontSize: "0.875rem" }}>Kayıp Günlü Kaza</span>
                     <span style={{ fontWeight: "bold", color: "var(--danger)" }}>1</span>
                  </div>
                  <div className="flex justify-between border-bottom pb-2" style={{ borderBottom: "1px solid var(--border)" }}>
                     <span style={{ fontSize: "0.875rem" }}>Ramak Kala Sayısı</span>
                     <span style={{ fontWeight: "bold" }}>20</span>
                  </div>
                  <div className="flex justify-between border-bottom pb-2" style={{ borderBottom: "1px solid var(--border)" }}>
                     <span style={{ fontSize: "0.875rem" }}>Hızlandırılmış Aksiyonlar</span>
                     <span style={{ fontWeight: "bold", color: "var(--success)" }}>34</span>
                  </div>
               </div>
            </div>

            <div className="glass-card col-span-2">
               <h4 style={{ marginBottom: "1rem" }}>Hazır Rapor Şablonları</h4>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 glass flex items-center gap-4" style={{ borderRadius: "12px", cursor: "pointer" }}>
                     <div style={{ color: "var(--primary)" }}><FileText size={24} /></div>
                     <div>
                        <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>Yıllık İSG Faaliyet Raporu</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Tüm modülleri kapsayan detaylı döküm</div>
                     </div>
                  </div>
                  <div className="p-4 glass flex items-center gap-4" style={{ borderRadius: "12px", cursor: "pointer" }}>
                     <div style={{ color: "var(--primary)" }}><FileText size={24} /></div>
                     <div>
                        <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>İş Kazası İstatistik Raporu</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Sektörel karşılaştırma ve trendler</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
