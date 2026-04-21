'use client';

import { ArrowRight, Play, Shield, Activity, Bell } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

export default function Hero({ lang }: { lang: Language }) {
  const t = translations[lang].hero;

  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden', paddingTop: '160px' }}>
      <div className="tech-grid" />
      <div className="soft-lighting" />
      
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="badge animate-fade-in" style={{ opacity: 0, animation: 'fadeIn 0.5s ease forwards' }}>
          {t.badge}
        </div>
        
        <h1 
          className="animate-fade-in" 
          style={{ fontSize: '4.5rem', maxWidth: '1000px', margin: '0 auto 1.5rem', opacity: 0, animation: 'fadeIn 0.5s ease 0.1s forwards' }}
        >
          {t.headline.split(',')[0]}, <span className="text-gradient">{t.headline.split(',')[1]}</span>
        </h1>
        
        <p 
          className="animate-fade-in" 
          style={{ maxWidth: '700px', margin: '0 auto 2.5rem', fontSize: '1.25rem', opacity: 0, animation: 'fadeIn 0.5s ease 0.2s forwards' }}
        >
          {t.subheadline}
        </p>
        
        <div 
          className="flex justify-center gap-4 animate-fade-in" 
          style={{ opacity: 0, animation: 'fadeIn 0.5s ease 0.3s forwards' }}
        >
          <a href="/contact" className="btn btn-primary">
            {t.ctaPrimary}
            <ArrowRight size={20} />
          </a>
          <button className="btn btn-outline" style={{ gap: '0.75rem' }}>
            <Play size={18} fill="currentColor" />
            {t.ctaSecondary}
          </button>
        </div>

        {/* Dashboard Mockup Container */}
        <div 
          className="animate-fade-in" 
          style={{ marginTop: '5rem', position: 'relative', opacity: 0, animation: 'fadeIn 1s ease 0.5s forwards' }}
        >
          <div className="glass-card" style={{ padding: '0.5rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
            <img 
              src="/landing/dashboard-mockup.png" 
              alt="SAFEORA Dashboard" 
              style={{ width: '100%', borderRadius: 'var(--radius)', display: 'block', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }} 
            />
          </div>

          {/* Floating Cards */}
          <div 
            className="glass-card animate-float hide-mobile" 
            style={{ position: 'absolute', top: '15%', left: '-5%', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--danger)' }}
          >
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '10px', color: 'var(--danger)' }}>
              <Shield size={24} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Status Alert</div>
              <div style={{ fontWeight: '700' }}>{t.floatingCards.risks}</div>
            </div>
          </div>

          <div 
            className="glass-card animate-float hide-mobile" 
            style={{ position: 'absolute', bottom: '20%', right: '-5%', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--success)', animationDelay: '1s' }}
          >
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem', borderRadius: '10px', color: 'var(--success)' }}>
              <Activity size={24} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Compliance</div>
              <div style={{ fontWeight: '700' }}>{t.floatingCards.training}</div>
            </div>
          </div>

          <div 
            className="glass-card animate-float hide-mobile" 
            style={{ position: 'absolute', top: '40%', right: '-8%', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--primary)', animationDelay: '2s' }}
          >
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem', borderRadius: '10px', color: 'var(--primary)' }}>
              <Bell size={24} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Upcoming</div>
              <div style={{ fontWeight: '700' }}>{t.floatingCards.health}</div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1024px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}
