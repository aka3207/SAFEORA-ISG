import { Lock, Key, ShieldCheck, Smartphone } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px" }}>
      <div className="mb-8">
        <h2>Güvenlik Ayarları</h2>
        <p style={{ color: "var(--text-muted)" }}>Hesap güvenliğinizi ve erişim kontrollerini yönetin.</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Passphrase Change */}
        <div className="glass-card">
           <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Key size={22} /> Şifre Güncelleme
           </h3>
           <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                 <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Mevcut Şifre</label>
                 <input type="password" name="currentPassword" className="input" placeholder="••••••••" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col gap-2">
                    <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Yeni Şifre</label>
                    <input type="password" name="newPassword" className="input" placeholder="••••••••" required />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Yeni Şifre (Tekrar)</label>
                    <input type="password" name="confirmPassword" className="input" placeholder="••••••••" required />
                 </div>
              </div>
              <div className="mt-4">
                 <button type="submit" className="btn btn-primary">Şifreyi Güncelle</button>
              </div>
           </form>
        </div>

        {/* 2FA */}
        <div className="glass-card flex justify-between items-center" style={{ background: "rgba(14, 165, 233, 0.02)" }}>
           <div className="flex gap-4">
              <div style={{ padding: "0.75rem", background: "rgba(14, 165, 233, 0.1)", borderRadius: "10px", color: "var(--primary)" }}>
                 <Smartphone size={24} />
              </div>
              <div>
                 <h4 style={{ marginBottom: "0.25rem" }}>İki Faktörlü Doğrulama (2FA)</h4>
                 <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Hesabınızı daha güvenli hale getirmek için telefon doğrulaması ekleyin.</p>
              </div>
           </div>
           <button className="btn btn-outline">Etkinleştir</button>
        </div>

        {/* Sessions */}
        <div className="glass-card">
           <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ShieldCheck size={22} /> Aktif Oturumlar
           </h3>
           <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center p-4 glass" style={{ borderRadius: "12px" }}>
                 <div className="flex gap-4 items-center">
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--success)" }}></div>
                    <div>
                       <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>MacBook Pro • Chrome (Şu an aktif)</div>
                       <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>İstanbul, Türkiye • 192.168.1.1</div>
                    </div>
                 </div>
                 <button className="btn-ghost" style={{ fontSize: "0.75rem", color: "var(--danger)" }}>Durdur</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
