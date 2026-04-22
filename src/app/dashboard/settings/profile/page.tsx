import { auth } from "@/auth";

import { User, Mail, Phone, Camera, Save, Shield } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user as any;

  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px" }}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2>Profil Ayarları</h2>
          <p style={{ color: "var(--text-muted)" }}>Kişisel bilgilerinizi ve hesap detaylarınızı yönetin.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 flex flex-col gap-6">
           <div className="glass-card flex flex-col items-center py-8">
              <div style={{ position: "relative" }}>
                 <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", fontWeight: "bold" }}>
                    {user.name?.[0]}
                 </div>
                 <button style={{ position: "absolute", bottom: "0", right: "0", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "50%", padding: "0.5rem" }}>
                    <Camera size={18} />
                 </button>
              </div>
              <h3 style={{ marginTop: "1.5rem", marginBottom: "0.25rem" }}>{user.name}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{user.role}</p>
              
              <div className="mt-6 w-full flex flex-col gap-2">
                 <div className="badge flex items-center justify-center gap-2" style={{ padding: "0.5rem", background: "rgba(16, 185, 129, 0.1)", color: "var(--success)" }}>
                    <Shield size={14} />
                    Hesap Onaylı
                 </div>
              </div>
           </div>
        </div>

        <div className="col-span-2 flex flex-col gap-6">
           <div className="glass-card">
              <h3 style={{ marginBottom: "1.5rem" }}>Kişisel Bilgiler</h3>
              <form className="flex flex-col gap-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                       <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Ad Soyad</label>
                       <div className="relative">
                          <User size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                          <input type="text" className="input" defaultValue={user.name} style={{ paddingLeft: "3rem" }} />
                       </div>
                    </div>
                    <div className="flex flex-col gap-2">
                       <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Unvan</label>
                       <input type="text" className="input" defaultValue={user.role === "SAFETY_EXPERT" ? "İSG Uzmanı" : user.role} />
                    </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>E-posta Adresi</label>
                    <div className="relative">
                       <Mail size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                       <input type="email" className="input" defaultValue={user.email} style={{ paddingLeft: "3rem" }} disabled />
                       <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>E-posta adresi değiştirilemez. Lütfen destek ile iletişime geçin.</span>
                    </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Telefon Numarası</label>
                    <div className="relative">
                       <Phone size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                       <input type="tel" className="input" placeholder="+90 5xx xxx xx xx" style={{ paddingLeft: "3rem" }} />
                    </div>
                 </div>

                 <div className="mt-4">
                    <button type="submit" className="btn btn-primary flex items-center gap-2">
                       <Save size={20} />
                       Değişiklikleri Kaydet
                    </button>
                 </div>
              </form>
           </div>
           
           <div className="glass-card" style={{ borderLeft: "4px solid var(--warning)" }}>
              <h4 style={{ marginBottom: "0.5rem" }}>Erişim Güvenliği</h4>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1rem" }}>Şifrenizi güncellemek veya iki faktörlü doğrulamayı açmak için güvenlik sekmesini ziyaret edin.</p>
              <button className="btn btn-outline" style={{ fontSize: "0.875rem" }}>Güvenlik Ayarlarına Git</button>
           </div>
        </div>
      </div>
    </div>
  );
}
