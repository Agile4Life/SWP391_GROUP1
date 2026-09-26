import { SlideItem } from '../types';

interface ThumbnailStripProps {
  slides: SlideItem[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ThumbnailStrip({
  slides,
  currentIndex,
  onSelectSlide,
  onPrev,
  onNext,
}: ThumbnailStripProps) {
  return (
    <aside className="aura-thumb-strip" aria-label="Slide thumbnail strip">
      <button
        type="button"
        className="thumb-nav-btn"
        onClick={onPrev}
        disabled={currentIndex === 0}
        aria-label="Previous Slide"
        style={{ opacity: currentIndex === 0 ? 0.35 : 1 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <button
            key={slide.id}
            type="button"
            className={`thumb-item ${isActive ? 'active' : ''}`}
            onClick={() => onSelectSlide(idx)}
            title={`Slide ${idx + 1}: ${slide.title}`}
            aria-label={`Jump to slide ${idx + 1}`}
            aria-current={isActive ? 'true' : undefined}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                color: '#211C18',
                backgroundColor: isActive ? '#E5DED5' : '#D2C8BC',
                textTransform: 'uppercase',
              }}
            >
              {slide.thumbnailLabel}
            </div>
            <span className="thumb-index-badge">{`0${idx + 1}`}</span>
          </button>
        );
      })}

      <button
        type="button"
        className="thumb-nav-btn"
        onClick={onNext}
        disabled={currentIndex === slides.length - 1}
        aria-label="Next Slide"
        style={{ opacity: currentIndex === slides.length - 1 ? 0.35 : 1 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </aside>
  );
}
