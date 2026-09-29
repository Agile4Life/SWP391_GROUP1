import { useState } from 'react';
import { LANDING_IMAGES } from '../../assets/images';
import { SlideControls } from '../SlideControls';
import { RevealImage } from '../RevealImage';
import { Reveal } from '../../../../shared/ui/Reveal';

const DISCIPLINES_LIST = [
  {
    id: 'pilates-yoga',
    number: '01/03',
    location: 'Studio 01, Level 2',
    name: 'ZENITH PILATES & MINDFUL YOGA',
    subtitle: 'Mindful elongation meets deep core architecture.',
    description:
      'A serene sanctuary for postural restoration, myofascial alignment, and diaphragmatic control. Equipped with custom maple-wood Reformers and aerial silk apparatus.',
    specs: [
      'Capacity: 12 members / session',
      'Led by Master Yoga & Pilates Instructors',
      'Smart Booking & Automated Waitlists (SCMS Flow 3)',
    ],
    palette: 'Accent palette: warm sandstone, muted sage, and soft linen white',
    primaryImg: LANDING_IMAGES.pilatesPrimary,
    secondaryImg: LANDING_IMAGES.pilatesSecondary,
  },
  {
    id: 'strength-boxing',
    number: '02/03',
    location: 'Arena 02, Level 1',
    name: 'OLYMPUS FUNCTIONAL & BOXING',
    subtitle: 'High-intensity power and tactile combat precision.',
    description:
      'Engineered for peak human output and kinetic conditioning. Featuring Olympic weightlifting platforms, handcrafted cowhide boxing bags, and real-time biometric tracking.',
    specs: [
      'Capacity: 16 athletes / arena',
      'Certified Strength & Conditioning Coaches (CSCS)',
      'AI Biometric Coaching & Training Progress Logs (SCMS Flow 4)',
    ],
    palette: 'Accent palette: smoked oak, matte bronze, and charcoal stone',
    primaryImg: LANDING_IMAGES.boxingPrimary,
    secondaryImg: LANDING_IMAGES.boxingSecondary,
  },
  {
    id: 'aquatics-recovery',
    number: '03/03',
    location: 'Sub-level Oasis',
    name: 'HYDROTHERAPY & AQUATICS',
    subtitle: 'Hydrodynamic flow meets deep cellular decompression.',
    description:
      'Saltwater lap pools calibrated to thermal neutrality, paired with infrared cedar saunas, cold plunge tubs, and contrast hydrotherapy circuits.',
    specs: [
      'Capacity: 20 members / circuit',
      'Dedicated Aquatic Therapists & Recovery Specialists',
      'Center Turnstile Check-in & Gate Access (SCMS Flow 5)',
    ],
    palette: 'Accent palette: deep travertine, mineral blue, and weathered stone',
    primaryImg: LANDING_IMAGES.swimmingPrimary,
    secondaryImg: LANDING_IMAGES.swimmingSecondary,
  },
];

interface DisciplinesSectionProps {
  isActive?: boolean;
}

export function DisciplinesSection({ isActive }: DisciplinesSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const item = DISCIPLINES_LIST[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : DISCIPLINES_LIST.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < DISCIPLINES_LIST.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="disciplines"
      className="sol-section sol-fullscreen-card"
      style={{ backgroundColor: '#F6F2EC' }}
    >
      <div className="sol-section-inner">
        {/* Header Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'clamp(18px, 3vh, 32px)',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <Reveal index={0}>
            <div className="editorial-category" style={{ marginBottom: '8px' }}>
              DISCIPLINES / 02
            </div>
            <h2 className="editorial-headline" style={{ margin: 0, fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)' }}>
              DISCIPLINES OF{' '}
              <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                Distinction
              </span>
            </h2>
          </Reveal>

          {/* Tab Selector Buttons */}
          <Reveal index={1} style={{ display: 'flex', gap: '8px' }}>
            {DISCIPLINES_LIST.map((d, idx) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                style={{
                  background: activeIdx === idx ? 'var(--color-text-main)' : 'transparent',
                  color: activeIdx === idx ? '#FAF8F5' : 'var(--color-text-muted)',
                  border: '1px solid',
                  borderColor: activeIdx === idx ? 'var(--color-text-main)' : 'var(--color-border-medium)',
                  padding: '6px 14px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  fontWeight: 500,
                }}
              >
                {d.name.split('&')[0].trim()}
              </button>
            ))}
          </Reveal>
        </div>

        {/* 3-Column Showcase matching Reference Slide */}
        <Reveal index={2}>
          <div key={item.id} className="disciplines-showcase-grid slide-entering">
            {/* Main Hero Photo with Reveal Animation */}
            <div className="disciplines-col">
              <RevealImage
                key={`primary-${item.id}`}
                src={item.primaryImg}
                alt={item.name}
                direction="right"
                delay={0.08}
                isActive={isActive}
                wrapperStyle={{
                  width: '100%',
                  height: 'clamp(160px, 25vh, 250px)',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.07)',
                  borderRadius: '2px',
                }}
              />
            </div>

            {/* Details & Specs */}
            <div className="disciplines-col">
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.12em',
                  marginBottom: '8px',
                }}
              >
                {item.location}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  margin: '0 0 8px 0',
                  color: 'var(--color-text-main)',
                }}
              >
                {item.name}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.78rem, 0.95vw, 0.85rem)',
                  lineHeight: 1.55,
                  color: 'var(--color-text-muted)',
                  margin: '0 0 12px 0',
                  fontWeight: 300,
                }}
              >
                {item.description}
              </p>

              <div
                style={{
                  borderTop: '1px solid var(--color-border-subtle)',
                  paddingTop: '10px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.74rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.5,
                }}
              >
                {item.specs.map((spec, i) => (
                  <div key={i}>✦ {spec}</div>
                ))}
              </div>
            </div>

            {/* Secondary Photo & Carousel Nav */}
            <div className="disciplines-col disciplines-col-secondary" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.88rem',
                  letterSpacing: '0.15em',
                  color: 'var(--color-text-muted)',
                  marginBottom: '8px',
                }}
              >
                {item.number}
              </div>

              <RevealImage
                key={`secondary-${item.id}`}
                src={item.secondaryImg}
                alt={`${item.name} detail`}
                direction="down"
                delay={0.2}
                isActive={isActive}
                wrapperStyle={{
                  width: '100%',
                  height: 'clamp(95px, 14vh, 140px)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
                  marginBottom: '10px',
                  borderRadius: '2px',
                }}
              />

              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.35,
                  marginBottom: '12px',
                  fontStyle: 'italic',
                }}
              >
                {item.palette}
              </div>

              <div style={{ alignSelf: 'flex-end' }}>
                <SlideControls onPrev={handlePrev} onNext={handleNext} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
