import { LANDING_IMAGES } from '../../assets/images';
import { ArrowButton } from '../ArrowButton';

interface HeroSlideProps {
  onExplore?: () => void;
}

export function HeroSlide({ onExplore }: HeroSlideProps) {
  return (
    <div
      className="aura-slide-canvas hero-slide-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundImage: `linear-gradient(rgba(26, 22, 20, 0.45), rgba(26, 22, 20, 0.65)), url(${LANDING_IMAGES.heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        color: '#FAF8F5',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Watermark Text */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(4rem, 14vw, 11rem)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.08)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 1,
        }}
      >
        AURA ATHLETICS
      </div>

      {/* Main Editorial Hero Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '820px', margin: '0 auto' }}>
        <h1
          className="editorial-headline stagger-2"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3rem, 7.5vw, 6.2rem)',
            lineHeight: 1.02,
            letterSpacing: '0.04em',
            color: '#FFFFFF',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.35)',
            marginBottom: '28px',
          }}
        >
          DISCIPLINE.
          <br />
          <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300, letterSpacing: '0.06em' }}>
            Movement.
          </span>
          <br />
          MASTERY.
        </h1>

        <p
          className="editorial-body stagger-3"
          style={{
            color: 'rgba(250, 248, 245, 0.88)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            maxWidth: '540px',
            margin: '0 auto 36px auto',
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
          }}
        >
          Aura Athletics is an elite multi-disciplinary sports sanctuary integrating precision AI biometric coaching with
          mindful physical mastery. Creating light-filled spaces designed for profound athletic elevation.
        </p>

        <div className="stagger-4" style={{ display: 'flex', justifyContent: 'center' }}>
          <ArrowButton
            label="EXPLORE SANCTUARY"
            onClick={onExplore}
            style={{ color: '#FAF8F5' }}
          />
        </div>
      </div>
    </div>
  );
}
