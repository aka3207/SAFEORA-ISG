'use client';

import { useState } from 'react';
import { Language } from '@/lib/translations';
import ThemeManager from '@/components/landing/ThemeManager';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import WhySAFEORA from '@/components/landing/WhySAFEORA';
import Pricing from '@/components/landing/Pricing';
import Testimonials from '@/components/landing/Testimonials';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  const [lang, setLang] = useState<Language>('tr');

  return (
    <div className="landing-wrapper">
      <ThemeManager />
      
      <Navbar lang={lang} setLang={setLang} />
      
      <main>
        <Hero lang={lang} />
        
        <Features lang={lang} />
        
        <WhySAFEORA lang={lang} />
        
        <Pricing lang={lang} />

        <Testimonials lang={lang} />
        
        <CTASection lang={lang} />
      </main>

      <Footer lang={lang} />

      <style jsx>{`
        .wrap { flex-wrap: wrap; }
        @media (max-width: 768px) {
          .wrap { justify-content: center; }
        }
      `}</style>
    </div>
  );
}
