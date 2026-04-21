'use client';

import { ArrowRight } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

export default function CTASection({ lang }: { lang: Language }) {
  const t = translations[lang].cta;

  return (
    <section className="section-padding">
      <div className="container">
        <div className="glass-card glow-effect" style={{ 
          background: 'linear-gradient(135deg, var(--accent) 0%, #10b981 100%)', 
          padding: '5rem 2rem', 
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          border: 'none',
          boxShadow: '0 20px 50px rgba(59, 130, 246, 0.3)'
        }}>
          {/* Decorative glow */}
          <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '100%', height: '200%', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)', filter: 'blur(50px)' }} />
          
          <h2 style={{ fontSize: '3.5rem', marginBottom: '2.5rem', position: 'relative', color: 'white', letterSpacing: '-0.03em' }}>{t.headline}</h2>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <a href="/auth/login" className="btn" style={{ 
              background: 'white', 
              color: 'var(--accent)', 
              fontSize: '1.25rem', 
              padding: '1.25rem 3.5rem',
              borderRadius: '9999px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              fontWeight: '800'
            }}>
              {t.button}
              <ArrowRight size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
