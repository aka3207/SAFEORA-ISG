import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import { History, User, Clock, Terminal } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ActivityLogsPage() {
  const session = await auth();
  const user = session?.user as any;

  // Only Admins
  if (!["SUPER_ADMIN", "COMPANY_ADMIN"].includes(user.role)) {
    redirect("/dashboard");
  }

  const logs = await prisma.activityLog.findMany({
    where: {
      tenantId: user.tenantId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case "CREATE": return "badge-success";
      case "UPDATE": return "badge-warning";
      case "DELETE": return "badge-danger";
      default: return "badge-outline";
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2>Sistem Hareket Kayıtları (Audit Trail)</h2>
          <p style={{ color: "var(--text-muted)" }}>Platformdaki tüm kritik işlemlerin şeffaf dökümü.</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0 }}>
         <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Terminal size={20} />
            <h4 style={{ margin: 0 }}>Son 50 Hareket</h4>
         </div>
         
         <div style={{ padding: "1rem" }}>
            {logs.length === 0 ? (
               <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-muted)" }}>
                  Henüz bir hareket kaydı bulunmamaktadır.
               </div>
            ) : (
               <div className="flex flex-col gap-1">
                  {logs.map((log) => (
                    <div key={log.id} className="p-3 glass flex justify-between items-center" style={{ borderRadius: "10px", fontSize: "0.875rem" }}>
                       <div className="flex items-center gap-4">
                          <div style={{ 
                            width: "32px", 
                            height: "32px", 
                            background: "rgba(255,255,255,0.05)", 
                            borderRadius: "50%", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center" 
                          }}>
                             <User size={14} />
                          </div>
                          <div>
                             <div className="flex items-center gap-2">
                                <span style={{ fontWeight: 600 }}>{log.user.name}</span>
                                <span className={`badge ${getActionBadge(log.action)}`} style={{ fontSize: "0.65rem", padding: "1px 5px" }}>{log.action}</span>
                                <span style={{ fontWeight: 500 }}>{log.entity}</span>
                             </div>
                             <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{log.details}</div>
                          </div>
                       </div>
                       <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Clock size={12} />
                          {new Date(log.createdAt).toLocaleString("tr-TR")}
                       </div>
                    </div>
                  ))}
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
