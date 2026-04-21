'use client';

import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

export default function Footer({ lang }: { lang: Language }) {
  const t = translations[lang].footer;

  return (
    <footer className="section-padding" style={{ background: 'var(--background)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="grid grid-cols-4" style={{ marginBottom: '5rem' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--foreground)' }}>SAFEORA</div>
            <p style={{ fontSize: '0.95rem', maxWidth: '250px' }}>{t.about}</p>
            <div className="flex gap-4" style={{ marginTop: '2rem' }}>
              <div className="btn-outline" style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0 }}>
                <Twitter size={18} />
              </div>
              <div className="btn-outline" style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0 }}>
                <Linkedin size={18} />
              </div>
              <div className="btn-outline" style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0 }}>
                <Instagram size={18} />
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{t.product}</h4>
            <div className="flex flex-col gap-3">
              <a href="#features" className="btn-ghost" style={{ justifyContent: 'start', padding: 0, textDecoration: 'none' }}>{translations[lang].nav.features}</a>
              <a href="#pricing" className="btn-ghost" style={{ justifyContent: 'start', padding: 0, textDecoration: 'none' }}>{translations[lang].nav.pricing}</a>
              <a href="#" className="btn-ghost" style={{ justifyContent: 'start', padding: 0, textDecoration: 'none' }}>Security</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{t.company}</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="btn-ghost" style={{ justifyContent: 'start', padding: 0, textDecoration: 'none' }}>About Us</a>
              <a href="#" className="btn-ghost" style={{ justifyContent: 'start', padding: 0, textDecoration: 'none' }}>Careers</a>
              <a href="#" className="btn-ghost" style={{ justifyContent: 'start', padding: 0, textDecoration: 'none' }}>Contact</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Legal</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="btn-ghost" style={{ justifyContent: 'start', padding: 0, textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" className="btn-ghost" style={{ justifyContent: 'start', padding: 0, textDecoration: 'none' }}>Terms of Service</a>
              <a href="#" className="btn-ghost" style={{ justifyContent: 'start', padding: 0, textDecoration: 'none' }}>Cookie Policy</a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {t.rights}
        </div>
      </div>
    </footer>
  );
}
