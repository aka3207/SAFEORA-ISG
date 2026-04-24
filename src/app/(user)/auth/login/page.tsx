"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error || "E-posta veya şifre hatalı");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-height-screen flex flex-col md:flex-row bg-white dark:bg-slate-950">
      {/* Left Column: Brand & Visuals */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-slate-900 relative overflow-hidden flex-col justify-between p-12">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-teal-500 rounded-full blur-[100px]"></div>
          <div className="tech-grid absolute inset-0 opacity-10"></div>
        </div>

        {/* Top: Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="text-white w-7 h-7" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">SAFEORA</span>
        </div>

        {/* Middle: Value Prop */}
        <div className="relative z-10 max-w-lg">
          <div className="badge mb-6 inline-flex items-center px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            Yeni Nesil İSG Platformu
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            İş Sağlığı ve Güvenliği <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
              Artık Daha Akıllı.
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-md">
            SAFEORA ile tüm İSG süreçlerinizi dijitalleştirin, riskleri minimize edin ve ekibinizi güvende tutun.
          </p>

          <div className="mt-12 space-y-4">
            {[
              "Multi-tenant Şirket Yapısı",
              "Detaylı Risk Analizleri & Raporlama",
              "Mobil Uyumlu Denetimler",
              "Yapay Zeka Destekli Tahminleme"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 className="text-teal-400 w-5 h-5" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Footer Info */}
        <div className="relative z-10 pt-12 border-t border-white/10 flex items-center justify-between text-slate-500 text-sm">
          <span>© 2024 SAFEORA Inc.</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Destek</Link>
            <Link href="#" className="hover:text-white transition-colors">Gizlilik</Link>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 lg:p-20 relative bg-slate-50 dark:bg-slate-950">
        {/* Mobile Logo Only */}
        <div className="md:hidden absolute top-8 left-8 flex items-center gap-2">
           <Shield className="text-blue-600 w-8 h-8" />
           <span className="text-xl font-bold dark:text-white">SAFEORA</span>
        </div>

        <div className="w-full max-w-[420px] space-y-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Tekrar Hoş Geldiniz</h2>
            <p className="text-slate-500 mt-3 font-medium">Paneline erişmek için bilgilerinizi girin.</p>
          </div>

          {error && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                label="E-posta Adresi"
                type="email"
                placeholder="ornek@sirket.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14"
              />
              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Şifre</label>
                  <Link href="/auth/forgot-password" title="Şifremi Unuttum" className="text-xs font-bold text-blue-600 hover:text-blue-700">Şifremi Unuttum?</Link>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg" 
              isLoading={loading}
            >
              Sisteme Giriş Yap
            </Button>
          </form>

          <div className="pt-6 space-y-6 text-center">
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-50 dark:bg-slate-950 px-4 text-slate-400 font-bold tracking-widest">Ya da</span>
                </div>
             </div>

             <p className="text-slate-500 font-medium">
               Henüz bir hesabınız yok mu? <br />
               <Link href="/contact" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1 mt-2 group">
                 Şirketiniz için Demo Talebi Oluşturun
                 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
               </Link>
             </p>
          </div>
        </div>

        {/* Global Footer in Mobile */}
        <div className="md:hidden mt-12 text-slate-400 text-xs text-center">
          © 2024 SAFEORA. All Rights Reserved.
        </div>
      </div>
      
      <style jsx>{`
        .min-height-screen {
          min-height: 100vh;
        }
        .tech-grid {
          background-image: radial-gradient(circle, #ffffff 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-500">Yükleniyor...</div>}>
      <LoginContent />
    </Suspense>
  );
}
