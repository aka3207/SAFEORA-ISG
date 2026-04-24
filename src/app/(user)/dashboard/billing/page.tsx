import { CreditCard, CheckCircle2, History, ArrowUpRight } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2>Abonelik ve Ödeme</h2>
        <p style={{ color: "var(--text-muted)" }}>Hizmet paketinizi yönetin ve faturalarınızı inceleyin.</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 flex flex-col gap-8">
           {/* Current Plan */}
           <div className="glass-card" style={{ borderColor: "var(--primary)", background: "linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, transparent 100%)" }}>
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <div className="badge badge-success" style={{ marginBottom: "0.5rem" }}>Aktif Paket</div>
                    <h3 style={{ fontSize: "2rem" }}>Gelişmiş Paket (Growth)</h3>
                    <p style={{ color: "var(--text-muted)" }}>Sonraki ödeme tarihi: 20 Mayıs 2024</p>
                 </div>
                 <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>₺4.999<span style={{ fontSize: "0.875rem" }}>/ay</span></div>
                 </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                 <div className="p-4 glass" style={{ borderRadius: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Çalışan Limiti</div>
                    <div style={{ fontWeight: "bold" }}>342 / 500</div>
                 </div>
                 <div className="p-4 glass" style={{ borderRadius: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Depolama</div>
                    <div style={{ fontWeight: "bold" }}>12.4 GB / 50 GB</div>
                 </div>
                 <div className="p-4 glass" style={{ borderRadius: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Modüller</div>
                    <div style={{ fontWeight: "bold" }}>Hepsi Açık</div>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button className="btn btn-primary flex items-center gap-2">
                    <ArrowUpRight size={20} />
                    Paket Yükselt
                 </button>
                 <button className="btn btn-outline">Aboneliği Duraklat</button>
              </div>
           </div>

           {/* Invoice History */}
           <div className="glass-card">
              <h4 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                 <History size={20} /> Fatura Geçmişi
              </h4>
              <div className="flex flex-col gap-2">
                 {[
                   { id: "INV-2024-004", date: "20.04.2024", amount: "₺4.999" },
                   { id: "INV-2024-003", date: "20.03.2024", amount: "₺4.999" },
                   { id: "INV-2024-002", date: "20.02.2024", amount: "₺4.999" },
                 ].map((inv) => (
                   <div key={inv.id} className="flex justify-between items-center p-4 glass" style={{ borderRadius: "12px" }}>
                      <div>
                         <div style={{ fontWeight: 500 }}>{inv.id}</div>
                         <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Tarih: {inv.date}</div>
                      </div>
                      <div className="flex items-center gap-4">
                         <span style={{ fontWeight: "bold" }}>{inv.amount}</span>
                         <button className="btn-ghost" style={{ color: "var(--primary)" }}>İndir (PDF)</button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-6">
           <div className="glass-card">
              <h4 style={{ marginBottom: "1.5rem" }}>Ödeme Yöntemi</h4>
              <div className="p-4 glass flex items-center gap-4 mb-4" style={{ borderRadius: "12px" }}>
                 <div style={{ color: "var(--primary)" }}><CreditCard size={24} /></div>
                 <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>•••• •••• •••• 4242</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Son Kullanma: 12/26</div>
                 </div>
              </div>
              <button className="btn btn-outline w-full">Kartı Güncelle</button>
           </div>

           <div className="glass-card" style={{ background: "rgba(16, 185, 129, 0.05)", borderColor: "rgba(16, 185, 129, 0.2)" }}>
              <div className="flex gap-3 items-start mb-4">
                 <CheckCircle2 size={24} style={{ color: "var(--success)" }} />
                 <h4 style={{ color: "var(--success)" }}>Hesabınız Güvende</h4>
              </div>
              <p style={{ fontSize: "0.875rem" }}>Ödeme işlemleriniz Stripe altyapısı ile 256-bit SSL sertifikası kullanılarak şifrelenmektedir.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
