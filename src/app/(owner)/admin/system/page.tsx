import { 
  Settings, 
  Database, 
  Server, 
  Lock, 
  AtSign, 
  Smartphone, 
  CreditCard, 
  Key, 
  Terminal,
  Activity,
  Save,
  RefreshCcw,
  ShieldAlert
} from "lucide-react";

export default function AdminSystemPage() {
  const sections = [
    { title: "General", icon: Settings, desc: "Global branding, domains and default settings." },
    { title: "Infrastructure", icon: Server, desc: "Server nodes, health monitoring and maintenance mode." },
    { title: "Database", icon: Database, desc: "Backup schedules, point-in-time recovery and scaling." },
    { title: "Security", icon: Lock, desc: "IP allowlists, 2FA enforcement and audit log retention." },
    { title: "Email (SMTP)", icon: AtSign, desc: "Transactional email provider and templates." },
    { title: "SMS / Push", icon: Smartphone, desc: "OTP and notification bridge configuration." },
    { title: "Payments", icon: CreditCard, desc: "Stripe connection and tax rate management." },
    { title: "API Keys", icon: Key, desc: "Manage service accounts and external integrations." },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-xl font-bold">System Configuration</h2>
            <p className="text-slate-400 text-sm">Fine-tune the SAFEORA engine and infrastructure parameters.</p>
         </div>
         <div className="flex gap-3">
            <button className="btn bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20">
               <ShieldAlert size={18} />
               Emergency Lock
            </button>
            <button className="btn btn-primary">
               <Save size={18} />
               Apply Changes
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* System Status */}
         <div className="admin-card lg:col-span-1 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Live Health</h3>
            
            <div className="space-y-4">
               <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                        <Activity size={14} /> Systems Operational
                     </span>
                     <span className="text-[10px] text-emerald-600 font-mono">100%</span>
                  </div>
                  <div className="flex gap-1 h-8">
                     {[...Array(20)].map((_, i) => (
                        <div key={i} className="flex-1 bg-emerald-500/30 rounded-sm" />
                     ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                     <p className="text-[10px] text-slate-500 font-bold mb-1">CPU LOAD</p>
                     <p className="text-sm font-bold">12.4%</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                     <p className="text-[10px] text-slate-500 font-bold mb-1">MEMORY</p>
                     <p className="text-sm font-bold">4.2GB / 8GB</p>
                  </div>
               </div>

               <button className="w-full btn bg-slate-800 text-xs py-3">
                  <RefreshCcw size={14} />
                  Purge Cache Clusters
               </button>
            </div>

            <div className="pt-6 border-t border-white/5">
               <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Maintenance Mode</h3>
               <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center">
                        <Activity size={20} />
                     </div>
                     <div>
                        <p className="text-xs font-bold">Global Lock</p>
                        <p className="text-[9px] text-slate-500">Redirect all to static page</p>
                     </div>
                  </div>
                  <div className="w-12 h-6 bg-slate-800 rounded-full relative">
                     <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5" />
                  </div>
               </div>
            </div>
         </div>

         {/* Configuration Grid */}
         <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section) => (
               <div key={section.title} className="admin-card group hover:border-blue-500/30 transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                        <section.icon size={24} />
                     </div>
                     <div className="flex-1">
                        <h4 className="text-sm font-bold mb-1">{section.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{section.desc}</p>
                     </div>
                     <div className="text-slate-700 group-hover:text-blue-500">
                        <Terminal size={18} />
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
