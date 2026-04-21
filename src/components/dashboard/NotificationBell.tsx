"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, X, Info, AlertTriangle, CheckCircle, AlertOctagon, ChevronRight } from "lucide-react";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock notifications for UI test
    setNotifications([
      { id: "1", title: "Yeni Risk Atandı", message: "Forklift devrilme riski için aksiyon bekliyor.", type: "WARNING", date: "2 dk önce", read: false },
      { id: "2", title: "Muayene Hatırlatıcı", message: "Ahmet Yılmaz'ın periyodik muayenesi bugün.", type: "INFO", date: "1 sa önce", read: false },
      { id: "3", title: "Eğitim Tamamlandı", message: "Temel İSG eğitimi raporu hazır.", type: "SUCCESS", date: "3 sa önce", read: true },
    ]);

    // Close on click outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "WARNING": return <AlertTriangle size={18} className="text-amber-500" />;
      case "SUCCESS": return <CheckCircle size={18} className="text-emerald-500" />;
      case "ERROR": return <AlertOctagon size={18} className="text-rose-500" />;
      default: return <Info size={18} className="text-blue-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-500 transition-all border border-transparent hover:border-slate-200 relative"
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-[380px] bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex justify-between items-center p-4 border-b border-slate-50">
             <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Bildirim Paneli</h4>
             <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400">
                <X size={16} />
             </button>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto p-2 custom-scrollbar">
             {notifications.length === 0 ? (
               <div className="py-12 text-center">
                  <Bell className="w-10 h-10 text-slate-100 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-400 uppercase">Yeni bildirim yok</p>
               </div>
             ) : (
               notifications.map(n => (
                 <div key={n.id} className={`p-4 rounded-xl border border-transparent hover:bg-slate-50 hover:border-slate-100 transition-all cursor-pointer mb-1 group ${!n.read ? "bg-blue-50/30" : ""}`}>
                    <div className="flex gap-4">
                       <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                          {getIcon(n.type)}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-0.5">
                             <h5 className="text-sm font-bold text-slate-900 truncate pr-2">{n.title}</h5>
                             <span className="text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">{n.date}</span>
                          </div>
                          <p className="text-xs text-slate-500 leading-normal mb-2 line-clamp-2">{n.message}</p>
                          <div className="flex items-center text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                             Görüntüle <ChevronRight size={12} className="ml-0.5" />
                          </div>
                       </div>
                    </div>
                 </div>
               ))
             )}
          </div>
          
          <div className="p-3 bg-slate-50/50 border-t border-slate-50">
             <button className="w-full py-2 text-xs font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">
                Tümünü Okundu İşaretle
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
