import { useState } from 'react';
import './landing.css';
import { SlideItem } from './types';
import { Navbar } from './components/Navbar';
import { ThumbnailStrip } from './components/ThumbnailStrip';
import { ViewModeToggle } from './components/ViewModeToggle';
import { HeroSlide } from './components/slides/HeroSlide';
import { AboutSlide } from './components/slides/AboutSlide';
import { DisciplinesSlide } from './components/slides/DisciplinesSlide';
import { ContactSlide } from './components/slides/ContactSlide';
import { useSlideController } from './hooks/useSlideController';

const SLIDES_METADATA: SlideItem[] = [
  { id: 'hero', index: 0, title: 'Hero Cover', category: 'Aura', thumbnailLabel: 'Cover' },
  { id: 'about', index: 1, title: 'About Us', category: 'Philosophy', thumbnailLabel: 'About' },
  { id: 'disciplines-1', index: 2, title: 'Zenith Pilates', category: 'Studio 01', thumbnailLabel: 'Pilates' },
  { id: 'disciplines-2', index: 3, title: 'Olympus Strength', category: 'Arena 02', thumbnailLabel: 'Boxing' },
  { id: 'contact', index: 4, title: 'Contact & Sanctuary', category: 'Inquiry', thumbnailLabel: 'Contact' },
];

export function LandingPage() {
  const [viewMode, setViewMode] = useState<'deck' | 'scroll'>('deck');

  const {
    currentIndex,
    goToSlide,
    nextSlide,
    prevSlide,
    handleWheel,
    handleTouchStart,
    handleTouchEnd,
  } = useSlideController({
    totalSlides: SLIDES_METADATA.length,
    enableWheel: viewMode === 'deck',
  });

  // Slide content render mapping
  const renderSlideContent = (index: number) => {
    switch (index) {
      case 0:
        return <HeroSlide onExplore={() => goToSlide(1)} />;
      case 1:
        return <AboutSlide onLearnMore={() => goToSlide(2)} />;
      case 2:
        return <DisciplinesSlide initialIndex={0} />;
      case 3:
        return <DisciplinesSlide initialIndex={1} />;
      case 4:
      default:
        return <ContactSlide />;
    }
  };

  const isDarkHero = currentIndex === 0 && viewMode === 'deck';

  if (viewMode === 'scroll') {
    return (
      <div className="aura-scroll-wrapper">
        <Navbar theme="light" onNavigateSlide={goToSlide} />

        <div style={{ paddingTop: '72px' }}>
          <section id="hero" className="aura-stage-card">
            <HeroSlide onExplore={() => goToSlide(1)} />
          </section>

          <section id="about" className="aura-stage-card">
            <AboutSlide onLearnMore={() => goToSlide(2)} />
          </section>

          <section id="disciplines-1" className="aura-stage-card">
            <DisciplinesSlide initialIndex={0} />
          </section>

          <section id="disciplines-2" className="aura-stage-card">
            <DisciplinesSlide initialIndex={1} />
          </section>

          <section id="contact" className="aura-stage-card">
            <ContactSlide />
          </section>
        </div>

        <ViewModeToggle mode={viewMode} onChange={setViewMode} />
      </div>
    );
  }

  // Deck View: Centered Luxury Presentation Stage Matching User Reference
  return (
    <main
      className="aura-deck-wrapper"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="aura-stage-card">
        {/* Navbar */}
        <Navbar
          theme={isDarkHero ? 'dark' : 'light'}
          onNavigateSlide={goToSlide}
        />

        {/* Current Active Slide */}
        <div key={currentIndex} className="slide-entering" style={{ width: '100%', height: '100%' }}>
          {renderSlideContent(currentIndex)}
        </div>
      </div>

      {/* Right Thumbnail Strip Drawer */}
      <ThumbnailStrip
        slides={SLIDES_METADATA}
        currentIndex={currentIndex}
        onSelectSlide={goToSlide}
        onPrev={prevSlide}
        onNext={nextSlide}
      />

      {/* Floating View Mode Switcher */}
      <ViewModeToggle mode={viewMode} onChange={setViewMode} />
    </main>
  );
}
