interface SlideControlsProps {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
}

export function SlideControls({
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  className = '',
}: SlideControlsProps) {
  return (
    <div className={`carousel-controls ${className}`}>
      <button
        type="button"
        className="carousel-btn"
        onClick={onPrev}
        disabled={prevDisabled}
        aria-label="Previous item"
      >
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 6H1M1 6L6 1M1 6L6 11" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        className="carousel-btn"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label="Next item"
      >
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 6H17M17 6L12 1M17 6L12 11" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
