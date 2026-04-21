'use client';

import Link from 'next/link';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Language, translations } from '@/lib/translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang].nav;

  return (
    <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '80px', display: 'flex', alignItems: 'center' }}>
      <div className="container flex justify-between items-center w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #3b82f6, #2dd4bf)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
            S
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--foreground)' }}>SAFEORA</span>
        </Link>

        {/* Desktop Nav */}
        <div className="flex items-center gap-8 hide-mobile">
          <Link href="#features" className="btn-ghost" style={{ color: 'var(--foreground)', fontWeight: '500', textDecoration: 'none' }}>{t.features}</Link>
          <Link href="#pricing" className="btn-ghost" style={{ color: 'var(--foreground)', fontWeight: '500', textDecoration: 'none' }}>{t.pricing}</Link>
          
          <div className="flex items-center gap-2" style={{ borderLeft: '1px solid var(--border)', paddingLeft: '2rem' }}>
            <button 
              onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
              className="btn-outline" 
              style={{ padding: '0.5rem 1rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
            >
              <Globe size={16} />
              {lang.toUpperCase()}
            </button>
            <Link href="/auth/login" className="btn-outline" style={{ padding: '0.5rem 1.25rem', borderRadius: '9999px', fontSize: '0.875rem', textDecoration: 'none' }}>{t.login}</Link>
            <Link href="/contact" className="btn-primary" style={{ padding: '0.5rem 1.25rem', borderRadius: '9999px', fontSize: '0.875rem', textDecoration: 'none' }}>{t.demo}</Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="show-mobile btn-ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: 'var(--foreground)' }}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="glass" style={{ position: 'absolute', top: '80px', left: 0, right: 0, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <Link href="#features" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--foreground)', textDecoration: 'none' }}>{t.features}</Link>
          <Link href="#pricing" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--foreground)', textDecoration: 'none' }}>{t.pricing}</Link>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
          <div className="flex flex-col gap-4">
             <button 
              onClick={() => { setLang(lang === 'en' ? 'tr' : 'en'); setIsMenuOpen(false); }}
              className="btn-outline" 
              style={{ justifyContent: 'start' }}
            >
              <Globe size={18} />
              Switch to {lang === 'en' ? 'Turkish' : 'English'}
            </button>
            <Link href="/auth/login" className="btn-outline" style={{ textDecoration: 'none' }}>{t.login}</Link>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>{t.demo}</Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .hide-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 900px) {
          .hide-mobile { display: none; }
          .show-mobile { display: block; }
        }
      `}</style>
    </nav>
  );
}
