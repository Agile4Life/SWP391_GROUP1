import { useState } from 'react';
import './landing.css';
import { ScrollNavbar } from './components/sections/ScrollNavbar';
import { HeroSection } from './components/sections/HeroSection';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { DisciplinesSection } from './components/sections/DisciplinesSection';
import { IntelligenceSection } from './components/sections/IntelligenceSection';
import { PackagesSection } from './components/sections/PackagesSection';
import { ContactSection } from './components/sections/ContactSection';

export function LandingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('THE SANCTUARY');

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sol-page-root">
      {/* Dynamic Glassmorphic Navigation Bar */}
      <ScrollNavbar />

      {/* Main Continuous Flow of Luxury Sections */}
      <main>
        <HeroSection />
        <PhilosophySection />
        <DisciplinesSection />
        <IntelligenceSection />
        <PackagesSection onSelectPlan={handleSelectPlan} />
        <ContactSection key={selectedPlan} initialPlan={selectedPlan} />
      </main>
    </div>
  );
}
