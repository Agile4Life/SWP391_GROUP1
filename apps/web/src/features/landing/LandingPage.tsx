import { useState, useEffect } from 'react';
import './landing.css';
import { ScrollNavbar } from './components/sections/ScrollNavbar';
import { HeroSection } from './components/sections/HeroSection';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { DisciplinesSection } from './components/sections/DisciplinesSection';
import { IntelligenceSection } from './components/sections/IntelligenceSection';
import { PackagesSection } from './components/sections/PackagesSection';
import { ContactSection } from './components/sections/ContactSection';
import { FullpageScrollManager } from './components/FullpageScrollManager';
import { LiquidGlassChatbot } from '../../shared/liquid-glass';
import { IntroCurtain } from './components/IntroCurtain';
import { shouldPlayIntro } from './introSession';
import { CustomCursor } from './components/CustomCursor';

const HASH_TO_SCREEN: Record<string, number> = {
  '#hero': 0,
  '#about': 1,
  '#disciplines': 2,
  '#intelligence': 3,
  '#packages': 4,
  '#contact': 5,
};

export function LandingPage() {
  const [activeScreen, setActiveScreen] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return HASH_TO_SCREEN[window.location.hash] ?? 0;
    }
    return 0;
  });
  const [selectedPlan, setSelectedPlan] = useState<string>('THE SANCTUARY');
  const [intro, setIntro] = useState<'playing' | 'revealing' | 'done'>(() => (shouldPlayIntro() ? 'playing' : 'done'));

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleHashChange = () => {
      window.scrollTo(0, 0);
      const hash = window.location.hash;
      if (hash && hash in HASH_TO_SCREEN) {
        setActiveScreen(HASH_TO_SCREEN[hash]);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setActiveScreen(5); // Navigate to Contact Screen
  };

  return (
    <div
      className="sol-page-root"
      data-intro={intro}
      style={{ width: '100vw', height: '100dvh', overflow: 'hidden' }}
    >
      {intro !== 'done' && (
        <IntroCurtain onReveal={() => setIntro('revealing')} onFinish={() => setIntro('done')} />
      )}
      <CustomCursor />
      {/* Dynamic Glassmorphic Navigation Bar */}
      <ScrollNavbar activeScreen={activeScreen} onNavigate={setActiveScreen} />

      {/* Discrete 1-Screen Viewport Manager */}
      <main style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <FullpageScrollManager
          activeScreen={activeScreen}
          onScreenChange={setActiveScreen}
          heroSection={<HeroSection onNavigate={setActiveScreen} />}
          philosophySection={<PhilosophySection isActive={activeScreen === 1} onNavigate={setActiveScreen} />}
          disciplinesSection={<DisciplinesSection isActive={activeScreen === 2} />}
          intelligenceSection={<IntelligenceSection />}
          packagesSection={<PackagesSection onSelectPlan={handleSelectPlan} />}
          contactSection={<ContactSection key={selectedPlan} initialPlan={selectedPlan} />}
        />
      </main>

      {/* VisionOS Floating Apple Liquid Glass AI Chatbot Concierge */}
      <LiquidGlassChatbot />
    </div>
  );
}
