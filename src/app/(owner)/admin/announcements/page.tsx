import { 
  Megaphone, 
  Plus, 
  Calendar, 
  Type, 
  Eye, 
  Trash2,
  AlertTriangle,
  Info,
  Zap,
  Globe,
  Building
} from "lucide-react";
import prisma from "@/lib/prisma";

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-xl font-bold">Broadcast Center</h2>
            <p className="text-slate-400 text-sm">Send platform-wide updates, maintenance notices or target specific companies.</p>
         </div>
         <button className="btn btn-primary">
            <Plus size={18} />
            Create Announcement
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Live Preview Area */}
         <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Live Preview</h3>
            <div className="admin-card border-blue-500/20 bg-blue-500/5 overflow-hidden">
               <div className="p-4 border-b border-blue-500/10 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-bold text-blue-400">
                     <Megaphone size={14} /> Global Update
                  </span>
                  <span className="text-[10px] text-slate-500">Just now</span>
               </div>
               <div className="p-5">
                  <h4 className="text-sm font-bold mb-2">New Feature: AI Risk Score</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                     We've just deployed a major update to the risk analysis module. 
                     You can now see AI-generated risk scores for all your incidents.
                  </p>
                  <button className="mt-4 w-full py-2 bg-blue-600 text-white text-[10px] font-bold rounded-lg">
                     Learn More
                  </button>
               </div>
            </div>
            
            <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl">
               <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center shrink-0">
                     <AlertTriangle size={20} />
                  </div>
                  <div>
                     <p className="text-xs font-bold mb-1">Popup Notice</p>
                     <p className="text-[10px] text-slate-500">This will appear as a modal inside the tenant dashboard upon their next login.</p>
                  </div>
               </div>
            </div>
         </div>

         {/* History / Management Table */}
         <div className="lg:col-span-2 admin-card">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Active Announcements</h3>
            
            <div className="space-y-4">
               {announcements.length === 0 ? (
                  <div className="py-20 text-center">
                     <Megaphone size={48} className="text-slate-800 mx-auto mb-4" />
                     <p className="text-slate-500 text-sm">No announcements have been broadcasted yet.</p>
                  </div>
               ) : (
                  announcements.map((ann) => (
                     <div key={ann.id} className="p-4 bg-white/5 rounded-2xl flex items-center justify-between border border-transparent hover:border-white/5 transition-all">
                        <div className="flex items-center gap-4">
                           <div className={`p-2 rounded-lg ${
                              ann.type === 'MAINTENANCE' ? 'bg-amber-500/10 text-amber-400' : 
                              ann.type === 'UPDATE' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-700/50 text-slate-400'
                           }`}>
                              {ann.type === 'MAINTENANCE' ? <Zap size={18} /> : 
                               ann.type === 'UPDATE' ? <Info size={18} /> : <Megaphone size={18} />}
                           </div>
                           <div>
                              <p className="text-sm font-bold">{ann.title}</p>
                              <div className="flex items-center gap-3 text-[10px] text-slate-500">
                                 <span className="flex items-center gap-1">
                                    {ann.targetTenant ? <Building size={10} /> : <Globe size={10} />}
                                    {ann.targetTenant || 'Global'}
                                 </span>
                                 <span className="flex items-center gap-1">
                                    <Calendar size={10} />
                                    {new Date(ann.createdAt).toLocaleDateString()}
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button className="p-2 hover:bg-white/5 text-slate-500 rounded-lg"><Eye size={16} /></button>
                           <button className="p-2 hover:bg-rose-500/10 text-rose-500 rounded-lg"><Trash2 size={16} /></button>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
