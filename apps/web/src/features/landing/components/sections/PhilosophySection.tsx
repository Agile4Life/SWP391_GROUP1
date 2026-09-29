import { LANDING_IMAGES } from '../../assets/images';
import { ArrowButton } from '../ArrowButton';
import { RevealImage } from '../RevealImage';
import { Reveal } from '../../../../shared/ui/Reveal';

interface PhilosophySectionProps {
  isActive?: boolean;
  onNavigate?: (index: number) => void;
}

export function PhilosophySection({ isActive, onNavigate }: PhilosophySectionProps) {
  const handleExplore = () => {
    if (onNavigate) {
      onNavigate(2);
    }
  };

  return (
    <section
      id="about"
      className="sol-section sol-fullscreen-card"
      style={{ backgroundColor: '#FAF8F5' }}
    >
      <div className="sol-section-inner">
        <div className="philosophy-content-grid">
          {/* Narrative Column */}
          <div className="philosophy-text-col">
            <Reveal index={0} className="editorial-category" style={{ marginBottom: '8px' }}>
              PHILOSOPHY / 01
            </Reveal>

            <Reveal index={1}>
              <h2
                className="editorial-headline"
                style={{
                  fontSize: 'clamp(1.7rem, 2.8vw, 2.6rem)',
                  lineHeight: 1.1,
                  marginBottom: '12px',
                }}
              >
                <span className="editorial-flourish" style={{ fontStyle: 'italic', marginRight: '6px' }}>
                  Train
                </span>{' '}
                WITH
                <br />
                INTENTION
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p
                className="editorial-body"
                style={{
                  maxWidth: '460px',
                  marginBottom: '16px',
                  fontSize: 'clamp(0.78rem, 0.95vw, 0.88rem)',
                  lineHeight: 1.55,
                }}
              >
                At Söl Wellness Sanctuary, we believe that physical conditioning is not just about raw exertion — it&apos;s
                about how every movement calibrates your body and mind. We approach athletic longevity as a layered
                composition of breath, biomechanics, and intelligent recovery.
              </p>
            </Reveal>

            <Reveal index={3}>
              <ArrowButton
                label="EXPLORE OUR DISCIPLINES"
                href="#disciplines"
                onClick={handleExplore}
              />
            </Reveal>
          </div>

          {/* Asymmetric Gallery with Reveal Animation */}
          <div className="philosophy-visual-col">
            <RevealImage
              src={LANDING_IMAGES.aboutPrimary}
              alt="Organic wood movement sanctuary studio"
              direction="right"
              delay={0.1}
              isActive={isActive}
              wrapperStyle={{
                width: '100%',
                height: 'clamp(150px, 23vh, 230px)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                borderRadius: '2px',
              }}
            />

            <RevealImage
              src={LANDING_IMAGES.aboutSecondary}
              alt="Thermal recovery lounge and fireplace"
              direction="up"
              delay={0.25}
              isActive={isActive}
              className="philosophy-secondary-img"
              wrapperStyle={{
                width: '100%',
                height: 'clamp(115px, 17vh, 170px)',
                marginTop: 'clamp(10px, 1.8vh, 22px)',
                boxShadow: '0 10px 24px rgba(0, 0, 0, 0.06)',
                borderRadius: '2px',
              }}
            />
          </div>
        </div>

        {/* 3 Pillar Stats */}
        <div
          className="pillar-stats-grid"
          style={{
            marginTop: 'clamp(16px, 2.5vh, 26px)',
            paddingTop: 'clamp(12px, 2vh, 18px)',
            gap: 'clamp(16px, 2.5vw, 32px)',
          }}
        >
          <Reveal index={0}>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 2.2vw, 2rem)',
                color: 'var(--color-text-main)',
                marginBottom: '4px',
              }}
            >
              01
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>
              Kinetic Alignment
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.76rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
              Corrective posture restoration, mobility expansion, and spine decompression guided by master coaches.
            </p>
          </Reveal>

          <Reveal index={1}>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 2.2vw, 2rem)',
                color: 'var(--color-text-main)',
                marginBottom: '4px',
              }}
            >
              02
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>
              Biometric Precision
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.76rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
              AI Engine parses InBody biomarkers, HRV recovery metrics, and workout histories to calibrate adaptive training.
            </p>
          </Reveal>

          <Reveal index={2}>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 2.2vw, 2rem)',
                color: 'var(--color-text-main)',
                marginBottom: '4px',
              }}
            >
              03
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>
              Thermal Recovery
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.76rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
              Contrast therapy pools, Himalayan salt stone saunas, and pneumatic compression lounges for expedited renewal.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
