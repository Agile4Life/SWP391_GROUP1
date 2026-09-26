import { useState } from 'react';
import { DisciplineItem } from '../../types';
import { LANDING_IMAGES } from '../../assets/images';
import { SlideControls } from '../SlideControls';

const DISCIPLINES_DATA: DisciplineItem[] = [
  {
    id: 'pilates-yoga',
    disciplineNumber: '01/06',
    location: 'Studio 01, Level 2',
    title: 'ZENITH PILATES & YOGA',
    subtitle: 'Mindful elongation meets deep core architecture.',
    description:
      'A serene sanctuary for postural restoration, myofascial alignment, and diaphragmatic control. Equipped with custom maple-wood Reformers and aerial silk apparatus.',
    specs: {
      capacity: 'Capacity: 12 members / class',
      coach: 'Led by Master Yoga & Pilates Instructors',
      systemFeature: 'Smart Class Booking & Automated Waitlists (SCMS Flow 3)',
    },
    accentPalette: 'Accent palette: warm sandstone, sage green, and soft linen white',
    primaryImage: LANDING_IMAGES.pilatesPrimary,
    secondaryImage: LANDING_IMAGES.pilatesSecondary,
  },
  {
    id: 'strength-boxing',
    disciplineNumber: '02/06',
    location: 'Arena 02, Level 1',
    title: 'OLYMPUS STRENGTH & BOXING',
    subtitle: 'High-intensity power and tactile combat precision.',
    description:
      'Engineered for peak human output and kinetic conditioning. Featuring Olympic weightlifting platforms, handcrafted cowhide boxing bags, and real-time InBody tracking.',
    specs: {
      capacity: 'Capacity: 16 athletes / arena',
      coach: 'Certified Strength & Conditioning Coaches (CSCS)',
      systemFeature: 'AI Biometric Coaching & Training Logs (SCMS Flow 4)',
    },
    accentPalette: 'Accent palette: smoked oak, matte bronze, and charcoal stone',
    primaryImage: LANDING_IMAGES.boxingPrimary,
    secondaryImage: LANDING_IMAGES.boxingSecondary,
  },
  {
    id: 'aquatics-recovery',
    disciplineNumber: '03/06',
    location: 'Sub-level Oasis',
    title: 'HYDROTHERAPY & AQUATICS',
    subtitle: 'Hydrodynamic flow meets deep cellular decompression.',
    description:
      'Saltwater lap pools calibrated to thermal neutrality, paired with infrared cedar saunas, cold plunge tubs, and contrast hydrotherapy circuits.',
    specs: {
      capacity: 'Capacity: 20 members / circuit',
      coach: 'Dedicated Aquatic Therapists & Recovery Specialists',
      systemFeature: 'Center Turnstile Check-in & Gate Access (SCMS Flow 5)',
    },
    accentPalette: 'Accent palette: deep travertine, mineral blue, and weathered stone',
    primaryImage: LANDING_IMAGES.swimmingPrimary,
    secondaryImage: LANDING_IMAGES.swimmingSecondary,
  },
];

interface DisciplinesSlideProps {
  initialIndex?: number;
}

export function DisciplinesSlide({ initialIndex = 0 }: DisciplinesSlideProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const current = DISCIPLINES_DATA[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : DISCIPLINES_DATA.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < DISCIPLINES_DATA.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className="aura-slide-canvas disciplines-slide-wrapper"
      style={{
        padding: '84px 64px 48px 64px',
        backgroundColor: '#FAF8F5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Centered Category & Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div className="editorial-category stagger-1" style={{ marginBottom: '8px' }}>
          PORTFOLIO / DISCIPLINES
        </div>
        <h2
          className="editorial-headline stagger-2"
          style={{
            fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
            margin: '0 auto',
            letterSpacing: '0.02em',
          }}
        >
          DISCIPLINES THAT{' '}
          <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
            Endure
          </span>
        </h2>
      </div>

      {/* Main 3-Column Asymmetric Content Grid Matching Reference Images 3 & 4 */}
      <div
        key={current.id}
        className="slide-entering"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 1fr 0.85fr',
          gap: '36px',
          alignItems: 'center',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Left Column: Large Hero Image */}
        <div
          className="image-card-wrapper"
          style={{
            height: '420px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)',
          }}
        >
          <img src={current.primaryImage} alt={current.title} loading="lazy" />
        </div>

        {/* Middle Column: Metadata, Title, Description, Specs */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              color: 'var(--color-text-muted)',
              marginBottom: '16px',
              letterSpacing: '0.12em',
            }}
          >
            {current.location}
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.9rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              margin: '0 0 14px 0',
              color: 'var(--color-text-main)',
            }}
          >
            {current.title}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              color: 'var(--color-text-muted)',
              margin: '0 0 20px 0',
              fontWeight: 300,
            }}
          >
            {current.description}
          </p>

          <div
            style={{
              borderTop: '1px solid var(--color-border-subtle)',
              paddingTop: '14px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
            }}
          >
            <div>✦ {current.specs.capacity}</div>
            <div>✦ {current.specs.coach}</div>
            <div style={{ color: '#8C7765', marginTop: '2px' }}>✦ {current.specs.systemFeature}</div>
          </div>
        </div>

        {/* Right Column: Secondary Photo, Accent Palette & Carousel Nav */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              fontFamily: 'var(--font-serif)',
              fontSize: '0.9rem',
              letterSpacing: '0.12em',
              color: 'var(--color-text-muted)',
              marginBottom: '12px',
            }}
          >
            {current.disciplineNumber}
          </div>

          <div
            className="image-card-wrapper"
            style={{
              width: '100%',
              height: '240px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
              marginBottom: '14px',
            }}
          >
            <img src={current.secondaryImage} alt={`${current.title} detail`} loading="lazy" />
          </div>

          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.5,
              marginBottom: '20px',
              fontStyle: 'italic',
            }}
          >
            {current.accentPalette}
          </div>

          {/* Carousel Arrows Bottom Right */}
          <div style={{ alignSelf: 'flex-end' }}>
            <SlideControls onPrev={handlePrev} onNext={handleNext} />
          </div>
        </div>
      </div>
    </div>
  );
}
