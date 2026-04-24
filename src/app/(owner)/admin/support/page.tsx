import { 
  MessageCircle, 
  Search, 
  Filter, 
  MoreVertical, 
  Clock,
  AlertCircle,
  CheckCircle2,
  User,
  Building2
} from "lucide-react";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export default async function AdminSupportPage() {
  // Fetch tickets (mocking for now since we just added the model)
  const tickets = await prisma.supportTicket.findMany({
    include: { tenant: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-xl font-bold">Support Resolution Center</h2>
            <p className="text-slate-400 text-sm">Monitor SLA compliance and resolve customer inquiries across the platform.</p>
         </div>
         <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
               {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[8px] font-bold">
                     AG
                  </div>
               ))}
               <div className="w-8 h-8 rounded-full border-2 border-[#020617] bg-blue-600 flex items-center justify-center text-[8px] font-bold">
                  +2
               </div>
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Agents</p>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
         {/* Sidebar filters */}
         <div className="xl:col-span-1 space-y-4">
            <div className="admin-card">
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Queues</h3>
               <div className="space-y-1">
                  <button className="w-full flex justify-between items-center px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 font-semibold text-sm">
                     <span className="flex items-center gap-2"><MessageCircle size={16} /> All Tickets</span>
                     <span className="text-[10px] bg-blue-500/20 px-1.5 rounded">{tickets.length}</span>
                  </button>
                  <button className="w-full flex justify-between items-center px-3 py-2 rounded-lg hover:bg-white/5 text-slate-400 font-semibold text-sm">
                     <span className="flex items-center gap-2"><AlertCircle size={16} /> Urgent</span>
                     <span className="text-[10px] bg-rose-500/20 text-rose-400 px-1.5 rounded">0</span>
                  </button>
                  <button className="w-full flex justify-between items-center px-3 py-2 rounded-lg hover:bg-white/5 text-slate-400 font-semibold text-sm">
                     <span className="flex items-center gap-2"><Clock size={16} /> Pending</span>
                     <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 rounded">0</span>
                  </button>
                  <button className="w-full flex justify-between items-center px-3 py-2 rounded-lg hover:bg-white/5 text-slate-400 font-semibold text-sm">
                     <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Resolved</span>
                     <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 rounded">0</span>
                  </button>
               </div>
            </div>

            <div className="admin-card">
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Filters</h3>
               <div className="space-y-4">
                  <div>
                     <label className="text-[10px] font-bold text-slate-600 block mb-2">Priority</label>
                     <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 rounded-md border border-white/5 bg-slate-800 text-[9px] font-bold text-slate-400 cursor-pointer">Low</span>
                        <span className="px-2 py-1 rounded-md border border-blue-500/20 bg-blue-500/10 text-[9px] font-bold text-blue-400 cursor-pointer">Medium</span>
                        <span className="px-2 py-1 rounded-md border border-white/5 bg-slate-800 text-[9px] font-bold text-slate-400 cursor-pointer">High</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Ticket List */}
         <div className="xl:col-span-3 space-y-4">
            <div className="flex gap-4">
               <div className="flex-1 relative">
                  <input 
                     type="text" 
                     placeholder="Search tickets by ID, subject or company..." 
                     className="search-bar-premium pl-10 h-11"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
               </div>
               <button className="p-2.5 h-11 bg-slate-800 border border-white/10 rounded-xl text-slate-300">
                  <Filter size={20} />
               </button>
            </div>

            <div className="admin-card min-h-[500px]">
               {tickets.length === 0 ? (
                  <div className="py-20 text-center">
                     <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                        <MessageCircle size={32} className="text-slate-700" />
                     </div>
                     <h3 className="text-lg font-bold text-slate-300">No active tickets</h3>
                     <p className="text-slate-500 text-sm max-w-xs mx-auto">Customers will see a support button in their dashboards. Tickets will appear here.</p>
                  </div>
               ) : (
                  <div className="space-y-2">
                     {tickets.map(ticket => (
                        <div key={ticket.id} className="p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all flex items-center gap-6 group">
                           <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                              <MessageCircle size={20} />
                           </div>
                           <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm truncate">{ticket.subject}</h4>
                              <div className="flex items-center gap-4 mt-1">
                                 <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                                    <Building2 size={12} />
                                    {ticket.tenant.name}
                                 </div>
                                 <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                                    <Clock size={12} />
                                    {new Date(ticket.createdAt).toLocaleTimeString()}
                                 </div>
                              </div>
                           </div>
                           <div className={`admin-badge text-[8px] h-6 flex items-center ${
                              ticket.priority === 'URGENT' ? 'admin-badge-danger' : 'admin-badge-warning'
                           }`}>
                              {ticket.priority}
                           </div>
                           <div className="text-right shrink-0">
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</p>
                              <p className="text-xs font-bold text-blue-400">{ticket.status}</p>
                           </div>
                           <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-500 transition-colors">
                              <MoreVertical size={18} />
                           </button>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
