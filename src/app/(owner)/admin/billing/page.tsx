import { RevenueChart } from "@/components/admin/RevenueChart";
import { 
  CreditCard, 
  Download, 
  Filter, 
  ArrowUpRight, 
  TrendingUp, 
  Users, 
  Repeat
} from "lucide-react";

export default function AdminBillingPage() {
  const metrics = [
    { name: "Total Revenue (ARR)", value: "₺1.8M", change: "+15%", icon: TrendingUp },
    { name: "Active Subscriptions", value: "142", change: "+8", icon: Repeat },
    { name: "Average Revenue Per Unit", value: "₺2,450", change: "-2%", icon: Users },
    { name: "Pending Invoices", value: "₺42,000", change: "12 overdue", icon: CreditCard },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-xl font-bold">Revenue & Billing Control</h2>
            <p className="text-slate-400 text-sm">Monitor global revenue, manage subscriptions and override billing records.</p>
         </div>
         <div className="flex gap-3">
            <button className="btn bg-slate-800 text-slate-300 border border-white/10">
               <Download size={18} />
               Revenue Report
            </button>
            <button className="btn btn-primary">
               <CreditCard size={18} />
               New Custom Invoice
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {metrics.map((metric) => (
            <div key={metric.name} className="admin-card border-none bg-slate-900/40 p-5">
               <div className="flex justify-between items-center mb-4">
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                     <metric.icon size={20} />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                     metric.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                     {metric.change}
                  </span>
               </div>
               <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider h-8">{metric.name}</p>
               <h4 className="text-2xl font-bold">{metric.value}</h4>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 admin-card">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold">Revenue Analytics</h3>
               <div className="flex gap-2">
                  <span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded border border-white/5">Weekly</span>
                  <span className="text-[10px] font-bold bg-blue-600/20 text-blue-400 px-2 py-1 rounded border border-blue-500/20">Monthly</span>
               </div>
            </div>
            <RevenueChart />
         </div>

         <div className="admin-card">
            <h3 className="text-lg font-bold mb-6">Failed Payments</h3>
            <div className="space-y-4">
               {[1,2,3].map(i => (
                  <div key={i} className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex flex-col gap-2">
                     <div className="flex justify-between items-start">
                        <p className="text-xs font-bold">GlobalTech Solutions</p>
                        <span className="text-[9px] font-black uppercase text-rose-500">DECLINED</span>
                     </div>
                     <div className="flex justify-between items-end">
                        <div>
                           <p className="text-[10px] text-slate-500">Plan: Enterprise</p>
                           <p className="text-sm font-bold">₺12,500.00</p>
                        </div>
                        <button className="text-[10px] font-bold text-blue-400 hover:underline">Retry Charge</button>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-6 py-3 bg-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-700 transition-colors">
               View All Failed Transactions
            </button>
         </div>
      </div>

      <div className="admin-card">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Subscription Activity</h3>
            <button className="p-2 text-slate-500">
               <Filter size={18} />
            </button>
         </div>
         <table className="admin-table">
            <thead>
               <tr>
                  <th>Client</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th className="text-right">Invoice</th>
               </tr>
            </thead>
            <tbody>
               {[1,2,3,4,5].map(i => (
                  <tr key={i}>
                     <td>
                        <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs">C</div>
                           <span className="text-xs font-bold">Customer {i} Ltd.</span>
                        </div>
                     </td>
                     <td><span className="text-xs font-bold text-slate-200">₺{4500 * i},00</span></td>
                     <td><span className="text-xs text-slate-500">April {20 + i}, 2024</span></td>
                     <td><span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Visa •••• 4242</span></td>
                     <td><span className="admin-badge admin-badge-success text-[8px]">Paid</span></td>
                     <td className="text-right">
                        <button className="p-2 hover:bg-white/5 rounded-lg text-blue-400">
                           <Download size={16} />
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}
