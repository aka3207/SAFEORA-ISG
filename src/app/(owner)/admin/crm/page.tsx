import { getLeads } from "@/app/actions/admin";
import { 
  Building, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  BadgeCheck,
  TrendingUp,
  Target
} from "lucide-react";

export default async function AdminCRMPage() {
  const leads = await getLeads();

  const statuses = [
    { label: "New", count: leads.filter(l => l.status === "NEW").length, color: "blue" },
    { label: "Contacted", count: leads.filter(l => l.status === "CONTACTED").length, color: "amber" },
    { label: "Demo Booked", count: leads.filter(l => l.status === "DEMO_BOOKED").length, color: "violet" },
    { label: "Won", count: leads.filter(l => l.status === "WON").length, color: "emerald" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-xl font-bold">Sales & Leads Pipeline</h2>
            <p className="text-slate-400 text-sm">Track potential customers, demo requests and conversion metrics.</p>
         </div>
         <div className="flex gap-3">
            <button className="btn bg-slate-800 text-slate-300 border border-white/10">
               <Download size={18} />
               Export Leads
            </button>
            <button className="btn btn-primary">
               <Plus size={18} />
               Add Manual Lead
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {statuses.map((status) => (
            <div key={status.label} className="admin-card py-4 flex items-center justify-between">
               <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">{status.label}</p>
                  <h4 className="text-2xl font-bold">{status.count}</h4>
               </div>
               <div className={`p-2 bg-${status.color}-500/10 text-${status.color}-400 rounded-lg`}>
                  {status.label === 'Won' ? <BadgeCheck size={20} /> : <TrendingUp size={20} />}
               </div>
            </div>
         ))}
      </div>

      <div className="admin-card">
         <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
               <span className="text-sm font-bold bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">All Leads</span>
               <span className="text-sm font-bold text-slate-500 px-3 py-1 hover:bg-white/5 rounded-full cursor-pointer transition-colors">High Intent</span>
               <span className="text-sm font-bold text-slate-500 px-3 py-1 hover:bg-white/5 rounded-full cursor-pointer transition-colors">Demo Scheduled</span>
            </div>
            <button className="p-2 text-slate-500 hover:text-slate-300">
               <Filter size={20} />
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="admin-table">
               <thead>
                  <tr>
                     <th>Company / Source</th>
                     <th>Contact Info</th>
                     <th>Status</th>
                     <th>Assigned To</th>
                     <th>Date Added</th>
                     <th className="text-right">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {leads.map((lead) => (
                     <tr key={lead.id}>
                        <td>
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                                 <Building size={20} />
                              </div>
                              <div>
                                 <p className="font-bold text-sm">{lead.companyName}</p>
                                 <p className="text-[10px] text-blue-400 font-semibold">{lead.source || 'Organic'}</p>
                              </div>
                           </div>
                        </td>
                        <td>
                           <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 text-xs font-semibold">
                                 <User size={12} className="text-slate-500" />
                                 {lead.contactName}
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                 <Mail size={12} />
                                 {lead.email}
                              </div>
                           </div>
                        </td>
                        <td>
                           <select 
                              className={`bg-transparent text-[10px] font-bold py-1 px-2 rounded-lg border border-white/10 outline-none
                                 ${lead.status === 'NEW' ? 'text-blue-400' : 
                                   lead.status === 'WON' ? 'text-emerald-400' : 'text-amber-400'}
                              `}
                              defaultValue={lead.status}
                           >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="DEMO_BOOKED">DEMO BOOKED</option>
                              <option value="WON">WON</option>
                              <option value="LOST">LOST</option>
                           </select>
                        </td>
                        <td>
                           <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[8px] font-bold">
                                 OA
                              </div>
                              <span className="text-[10px] font-semibold text-slate-400">{lead.assignedTo || 'Unassigned'}</span>
                           </div>
                        </td>
                        <td>
                           <div className="flex items-center gap-2 text-[10px] text-slate-500">
                              <Calendar size={14} />
                              {new Date(lead.createdAt).toLocaleDateString()}
                           </div>
                        </td>
                        <td className="text-right">
                           <button className="p-2 hover:bg-white/5 text-slate-500 rounded-lg transition-colors">
                              <MoreHorizontal size={18} />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {leads.length === 0 && (
            <div className="py-20 text-center">
               <Target size={48} className="text-slate-800 mx-auto mb-4" />
               <p className="text-slate-500 text-sm">Your lead pipeline is empty. Start by capturing some demos!</p>
            </div>
         )}
      </div>
    </div>
  );
}
