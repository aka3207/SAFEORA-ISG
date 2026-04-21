"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-[480px]">
        {/* Branding */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-xl shadow-blue-500/20 mb-4 animate-float">
            <Shield className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">SAFEORA</h1>
        </div>

        <div className="glass-card p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400"></div>

          {!isSubmitted ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Şifrenizi mi Unuttunuz?</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  E-posta adresinizi girin, size şifre sıfırlama bağlantısını gönderelim.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="E-posta Adresi"
                  type="email"
                  placeholder="ornek@sirket.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14"
                />

                <Button type="submit" className="w-full h-14" isLoading={loading}>
                  Sıfırlama Bağlantısı Gönder
                </Button>
              </form>
            </div>
          ) : (
            <div className="text-center space-y-6 py-4 animate-in zoom-in-95 duration-500">
               <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-100 dark:border-teal-900/50">
                 <CheckCircle2 className="w-10 h-10 text-teal-500" />
               </div>
               <div className="space-y-2">
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Bağlantı Gönderildi!</h2>
                 <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                   <strong>{email}</strong> adresini kontrol edin. <br />
                   Size gerekli talimatları içeren bir e-posta gönderdik.
                 </p>
               </div>
               <div className="pt-4">
                 <p className="text-slate-400 text-xs font-medium">E-posta gelmedi mi? Gereksiz (Spam) klasörünü kontrol edin.</p>
               </div>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Giriş Sayfasına Dön
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Sorun mu yaşıyorsunuz? <Link href="/contact" className="text-blue-600 font-bold hover:underline">Bize Ulaşın</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
