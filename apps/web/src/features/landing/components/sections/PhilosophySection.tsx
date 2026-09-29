import { LANDING_IMAGES } from '../../assets/images';
import { ArrowButton } from '../ArrowButton';
import { Reveal } from '../../../../shared/ui/Reveal';

export function PhilosophySection() {
  return (
    <section id="about" className="sol-section" style={{ backgroundColor: '#FAF8F5' }}>
      <div className="sol-section-inner">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1.25fr',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Narrative Column */}
          <div>
            <Reveal index={0} className="editorial-category">PHILOSOPHY / 01</Reveal>

            <Reveal index={1}>
              <h2
                className="editorial-headline"
                style={{
                  fontSize: 'clamp(2.6rem, 4.8vw, 4rem)',
                  lineHeight: 1.08,
                  marginBottom: '26px',
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
              <p className="editorial-body" style={{ maxWidth: '480px', marginBottom: '32px' }}>
                At Söl Wellness Sanctuary, we believe that physical conditioning is not just about raw exertion — it&apos;s
                about how every movement calibrates your body and mind. We approach athletic longevity as a layered
                composition of breath, biomechanics, and intelligent recovery, where discipline meets quiet clarity.
              </p>
            </Reveal>

            <Reveal index={3}>
              <ArrowButton label="EXPLORE OUR DISCIPLINES" href="#disciplines" />
            </Reveal>
          </div>

          {/* Asymmetric Gallery */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.3fr 1fr',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            <Reveal
              index={2}
              className="image-card-wrapper"
              style={{
                height: '480px',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
              }}
            >
              <img
                src={LANDING_IMAGES.aboutPrimary}
                alt="Organic wood movement sanctuary studio"
                loading="lazy"
              />
            </Reveal>

            <Reveal
              index={3}
              className="image-card-wrapper"
              style={{
                height: '340px',
                marginTop: '48px',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.06)',
              }}
            >
              <img
                src={LANDING_IMAGES.aboutSecondary}
                alt="Thermal recovery lounge and fireplace"
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>

        {/* 3 Pillar Stats */}
        <div className="pillar-stats-grid">
          <Reveal index={0}>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                color: 'var(--color-text-main)',
                marginBottom: '8px',
              }}
            >
              01
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
              Kinetic Alignment
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
              Corrective posture restoration, mobility expansion, and spine decompression guided by master coaches.
            </p>
          </Reveal>

          <Reveal index={1}>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                color: 'var(--color-text-main)',
                marginBottom: '8px',
              }}
            >
              02
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
              Biometric Precision
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
              AI Engine parses InBody biomarkers, HRV recovery metrics, and workout histories to calibrate adaptive training regimens.
            </p>
          </Reveal>

          <Reveal index={2}>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                color: 'var(--color-text-main)',
                marginBottom: '8px',
              }}
            >
              03
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
              Thermal Recovery
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
              Contrast therapy pools, Himalayan salt stone saunas, and pneumatic compression lounges for expedited cellular renewal.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
