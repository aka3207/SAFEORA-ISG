import { 
  Zap, 
  BrainCircuit, 
  TrendingDown, 
  AlertTriangle, 
  Lightbulb, 
  Activity,
  ChevronRight,
  Sparkles
} from "lucide-react";

export default function AdminAIPage() {
  const insights = [
    { 
      type: "Churn Risk", 
      title: "MetalCraft Inc is at High Risk", 
      desc: "Activity dropped by 80% in the last 14 days. No new incidents reported.",
      impact: "High", 
      icon: TrendingDown,
      color: "rose"
    },
    { 
      type: "Upsell", 
      title: "BioLab Solutions reached limits", 
      desc: "Storage at 94% and 48/50 active users. Candidate for Enterprise upgrade.",
      impact: "Medium", 
      icon: Lightbulb,
      color: "blue"
    },
    { 
      type: "Anomaly", 
      title: "Suspicious Login Pattern in Berlin", 
      desc: "Multi-factor failed 5 times for user 'admin@globaltech.com'.",
      impact: "Critical", 
      icon: AlertTriangle,
      color: "amber"
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
               <Zap className="text-amber-400" size={24} />
               AI Automation & Insights
            </h2>
            <p className="text-slate-400 text-sm">Predictive analytics and automated business intelligence for SAFEORA.</p>
         </div>
         <button className="btn bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600/20 px-6">
            <BrainCircuit size={18} />
            Train Models
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Live AI Feed */}
         <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
               <Sparkles size={14} /> Intelligence Feed
            </h3>
            
            {insights.map((insight, i) => (
               <div key={i} className="admin-card border-none bg-slate-900/50 hover:bg-slate-900 transition-all flex gap-6 p-6 group cursor-pointer">
                  <div className={`w-14 h-14 bg-${insight.color}-500/10 text-${insight.color}-400 rounded-2xl flex items-center justify-center shrink-0`}>
                     <insight.icon size={28} />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-black uppercase text-${insight.color}-500 tracking-tighter`}>{insight.type}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                           insight.impact === 'Critical' ? 'bg-rose-500/20 text-rose-400' : 
                           insight.impact === 'High' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                           {insight.impact} IMPACT
                        </span>
                     </div>
                     <h4 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors">{insight.title}</h4>
                     <p className="text-sm text-slate-500 leading-relaxed">{insight.desc}</p>
                     
                     <div className="mt-4 pt-4 border-t border-white/5 flex gap-4">
                        <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors">Dismiss</button>
                        <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                           Take Recommended Action <ChevronRight size={14} />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Predictors Side */}
         <div className="space-y-6">
            <div className="admin-card text-center py-10 bg-gradient-to-br from-blue-600/10 to-violet-600/10 border-blue-500/20">
               <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/30">
                  <Activity size={32} />
               </div>
               <h3 className="text-xl font-bold mb-2">Agent Active</h3>
               <p className="text-xs text-slate-400 px-10">SAFEORA AI is currently scanning logs for churn signals and anomalies.</p>
            </div>

            <div className="admin-card">
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Automation Status</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-xs font-semibold">Churn Detection</span>
                     <span className="text-[10px] font-bold text-emerald-400 uppercase">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs font-semibold">Automatic Invoicing</span>
                     <span className="text-[10px] font-bold text-emerald-400 uppercase">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs font-semibold">Suspicious Activity</span>
                     <span className="text-[10px] font-bold text-amber-400 uppercase">Tuning...</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs font-semibold">Support Auto-Reply</span>
                     <span className="text-[10px] font-bold text-slate-600 uppercase">Disabled</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
