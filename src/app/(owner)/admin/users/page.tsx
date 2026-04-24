import { getGlobalUsers } from "@/app/actions/admin";
import { 
  Search, 
  UserPlus, 
  Mail, 
  Shield, 
  MapPin,
  MoreVertical,
  Key,
  EyeOff,
  UserCheck
} from "lucide-react";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const users = await getGlobalUsers(searchParams.q);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-xl font-bold">Global User Control</h2>
            <p className="text-slate-400 text-sm">Manage every registered individual across all tenants from one master view.</p>
         </div>
         <button className="btn btn-primary">
            <UserPlus size={18} />
            Create Global User
         </button>
      </div>

      <div className="admin-card">
         <div className="flex gap-4 mb-6">
            <form className="flex-1 relative" action="/admin/users">
               <input 
                  type="text" 
                  name="q"
                  defaultValue={searchParams.q}
                  placeholder="Search by name, email or company..." 
                  className="search-bar-premium pl-10"
               />
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            </form>
            <select className="bg-slate-800 border border-white/10 rounded-xl px-4 text-sm font-semibold outline-none">
               <option>All Roles</option>
               <option>System Admin</option>
               <option>Company Admin</option>
               <option>Standard User</option>
            </select>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {users.map((user: any) => (
               <div key={user.id} className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl flex flex-col gap-4 hover:border-blue-500/30 transition-all hover:bg-slate-900/60 group">
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-2 border-white/5 overflow-hidden bg-slate-800 flex items-center justify-center text-lg font-bold">
                           {user.image ? <img src={user.image} alt="" className="w-full h-full object-cover" /> : user.name?.[0] || 'U'}
                        </div>
                        <div>
                           <h4 className="text-sm font-bold truncate max-w-[150px]">{user.name}</h4>
                           <p className="text-[10px] text-slate-500 flex items-center gap-1">
                              <Mail size={10} />
                              {user.email}
                           </p>
                        </div>
                     </div>
                     <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500">
                        <MoreVertical size={16} />
                     </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                     <div className="bg-white/5 p-2 rounded-xl flex items-center gap-2">
                        <Shield size={14} className="text-blue-400" />
                        <div>
                           <p className="text-[8px] uppercase text-slate-500 font-bold">Role</p>
                           <p className="text-[10px] font-semibold">{user.role}</p>
                        </div>
                     </div>
                     <div className="bg-white/5 p-2 rounded-xl flex items-center gap-2">
                        <MapPin size={14} className="text-emerald-400" />
                        <div>
                           <p className="text-[8px] uppercase text-slate-500 font-bold">Tenant</p>
                           <p className="text-[10px] font-semibold truncate max-w-[100px]">{user.tenant?.name || 'System'}</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex gap-2 mt-2 pt-4 border-t border-white/5">
                     <button className="flex-1 btn py-2 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/5">
                        <Key size={12} />
                        Pass Reset
                     </button>
                     <button className={`flex-1 btn py-2 text-[10px] ${user.isSuspended ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                        {user.isSuspended ? <UserCheck size={12} /> : <EyeOff size={12} />}
                        {user.isSuspended ? 'Enable' : 'Disable'}
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {users.length === 0 && (
            <div className="py-20 text-center">
               <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                  <Search size={24} className="text-slate-600" />
               </div>
               <h3 className="text-lg font-bold">No users found</h3>
               <p className="text-slate-500 text-sm">Try adjusting your filters or search query.</p>
            </div>
         )}
      </div>
    </div>
  );
}
