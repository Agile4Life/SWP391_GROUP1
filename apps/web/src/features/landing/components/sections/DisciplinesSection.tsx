import { useState } from 'react';
import { useTheme } from '../../../../shared/context/ThemeContext';
import { LANDING_IMAGES } from '../../assets/images';
import { SlideControls } from '../SlideControls';
import { LiquidGlassContainer } from '../../../../shared/liquid-glass/LiquidGlassContainer';

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

const RUNOVA_FACILITIES = [
  {
    id: 'stretch',
    title: 'Outdoor Mobility Arena',
    tag: 'Strengthen and stretch outdoors',
    image: LANDING_IMAGES.runovaFacilityStretch,
  },
  {
    id: 'track',
    title: 'Morning Lake Track',
    tag: 'Hit the pavement and power through your daily run',
    image: LANDING_IMAGES.runovaFacilityTrack,
    featured: true,
  },
  {
    id: 'conditioning',
    title: 'Athletic Conditioning Ground',
    tag: 'Strengthen and stretch outdoors',
    image: LANDING_IMAGES.runovaFacilityOutdoor,
  },
  {
    id: 'court',
    title: 'Championship Racket Court',
    tag: 'Professional hard court & padel arena',
    image: LANDING_IMAGES.runovaFacilityCourt,
  },
];

export function DisciplinesSection() {
  const { theme } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);

  if (theme === 'runova') {
    return (
      <section id="disciplines" className="sol-section" style={{ backgroundColor: '#FAF8F5', padding: '100px 48px' }}>
        <div className="sol-section-inner" style={{ maxWidth: '1240px' }}>
          {/* Header Row (Matching Reference Image 4) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '48px',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'Barlow Condensed',
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: '#111A14',
                  lineHeight: 0.95,
                  letterSpacing: '0.01em',
                  margin: 0,
                }}
              >
                EXPLORE <span style={{ color: '#16382C' }}>FACILITIES</span>
              </h2>
            </div>

            <div style={{ maxWidth: '420px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: '#4F5E54',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Whether you&apos;re training for your first race or your next championship, Runova keeps you motivated,
                equipped, and connected.
              </p>
            </div>
          </div>

          {/* 4-Card Vertical Facility Grid (Matching Reference Image 4) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {RUNOVA_FACILITIES.map((facility) => (
              <div
                key={facility.id}
                className="runova-squircle-card"
                style={{
                  position: 'relative',
                  height: '420px',
                  borderRadius: '24px',
                }}
              >
                <img
                  src={facility.image}
                  alt={facility.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />

                {/* Bottom glassmorphic overlay badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px',
                  }}
                >
                  {facility.featured ? (
                    <LiquidGlassContainer
                      shape="pill"
                      borderRadius={24}
                      tintOpacity={0.35}
                      style={{
                        padding: '10px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                      }}
                    >
                      <div style={{ color: '#FFFFFF', fontSize: '0.72rem', lineHeight: 1.35, paddingRight: '8px' }}>
                        <div style={{ fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px', color: '#D4E95C' }}>
                          {facility.title}
                        </div>
                        <div>{facility.tag}</div>
                      </div>
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          color: '#111A14',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        ↗
                      </div>
                    </LiquidGlassContainer>
                  ) : (
                    <div
                      style={{
                        backgroundColor: 'rgba(17, 26, 20, 0.72)',
                        backdropFilter: 'blur(8px)',
                        padding: '8px 14px',
                        borderRadius: '9999px',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        textAlign: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      {facility.tag}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  const item = DISCIPLINES_LIST[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : DISCIPLINES_LIST.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < DISCIPLINES_LIST.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="disciplines" className="sol-section" style={{ backgroundColor: '#F6F2EC' }}>
      <div className="sol-section-inner">
        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="editorial-category">DISCIPLINES / 02</div>
            <h2 className="editorial-headline" style={{ margin: 0 }}>
              DISCIPLINES OF{' '}
              <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                Distinction
              </span>
            </h2>
          </div>

          {/* Tab Selector Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
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
                  padding: '8px 18px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
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
          </div>
        </div>

        {/* 3-Column Showcase matching Reference Slide 3 & 4 */}
        <div
          key={item.id}
          className="slide-entering"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 1fr 0.85fr',
            gap: '40px',
            alignItems: 'center',
            backgroundColor: '#FAF8F5',
            padding: '48px 40px',
            borderRadius: '4px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Main Hero Photo */}
          <div
            className="image-card-wrapper"
            style={{
              height: '440px',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.07)',
            }}
          >
            <img src={item.primaryImg} alt={item.name} loading="lazy" />
          </div>

          {/* Details & Specs */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.12em',
                marginBottom: '16px',
              }}
            >
              {item.location}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                margin: '0 0 16px 0',
                color: 'var(--color-text-main)',
              }}
            >
              {item.name}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.92rem',
                lineHeight: 1.75,
                color: 'var(--color-text-muted)',
                margin: '0 0 24px 0',
                fontWeight: 300,
              }}
            >
              {item.description}
            </p>

            <div
              style={{
                borderTop: '1px solid var(--color-border-subtle)',
                paddingTop: '18px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.8,
              }}
            >
              {item.specs.map((spec, i) => (
                <div key={i}>✦ {spec}</div>
              ))}
            </div>
          </div>

          {/* Secondary Photo & Carousel Nav */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem',
                letterSpacing: '0.15em',
                color: 'var(--color-text-muted)',
                marginBottom: '14px',
              }}
            >
              {item.number}
            </div>

            <div
              className="image-card-wrapper"
              style={{
                width: '100%',
                height: '240px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                marginBottom: '16px',
              }}
            >
              <img src={item.secondaryImg} alt={`${item.name} detail`} loading="lazy" />
            </div>

            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.74rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.5,
                marginBottom: '24px',
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
      </div>
    </section>
  );
}
