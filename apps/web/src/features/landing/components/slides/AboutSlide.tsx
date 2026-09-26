import { LANDING_IMAGES } from '../../assets/images';
import { ArrowButton } from '../ArrowButton';

interface AboutSlideProps {
  onLearnMore?: () => void;
}

export function AboutSlide({ onLearnMore }: AboutSlideProps) {
  return (
    <div
      className="aura-slide-canvas about-slide-wrapper"
      style={{
        padding: '100px 64px 60px 64px',
        backgroundColor: '#FAF8F5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1.25fr',
          gap: '56px',
          alignItems: 'center',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Left Column: Editorial Philosophy */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="editorial-category stagger-1">ABOUT US / PHILOSOPHY</div>

          <h2
            className="editorial-headline stagger-2"
            style={{
              fontSize: 'clamp(2.4rem, 4.4vw, 3.8rem)',
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

          <p className="editorial-body stagger-3">
            At Söl Wellness Sanctuary, we believe that athletic conditioning is not just about raw exertion — it&apos;s about how
            every movement calibrates your body and mind. We approach athletic longevity as a layered composition of
            breath, biomechanics, and intelligent recovery, where discipline meets quiet clarity.
          </p>

          <div className="stagger-4" style={{ marginTop: '12px' }}>
            <ArrowButton label="EXPLORE DISCIPLINES" onClick={onLearnMore} />
          </div>
        </div>

        {/* Right Column: Asymmetric Gallery Matching Reference Image 2 */}
        <div
          className="stagger-3"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.35fr 1fr',
            gap: '20px',
            alignItems: 'start',
            height: '100%',
          }}
        >
          {/* Main Tall Image */}
          <div
            className="image-card-wrapper"
            style={{
              height: '460px',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)',
            }}
          >
            <img
              src={LANDING_IMAGES.aboutPrimary}
              alt="Organic wood movement sanctuary studio"
              loading="lazy"
            />
          </div>

          {/* Secondary Offset Image */}
          <div
            className="image-card-wrapper"
            style={{
              height: '320px',
              marginTop: '40px',
              boxShadow: '0 10px 28px rgba(0, 0, 0, 0.06)',
            }}
          >
            <img
              src={LANDING_IMAGES.aboutSecondary}
              alt="Thermal recovery lounge and fireplace"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
