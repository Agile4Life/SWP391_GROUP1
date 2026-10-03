import { useEffect, useRef, useCallback, ReactNode } from 'react';

export interface FullpageScrollManagerProps {
  activeScreen: number;
  onScreenChange: (index: number) => void;
  heroSection: ReactNode;
  philosophySection: ReactNode;
  disciplinesSection: ReactNode;
  intelligenceSection: ReactNode;
  packagesSection: ReactNode;
  contactSection: ReactNode;
}

const SECTION_NAMES = [
  'COVER',
  'PHILOSOPHY',
  'DISCIPLINES',
  'INTELLIGENCE',
  'MEMBERSHIP',
  'CONTACT',
];

export function FullpageScrollManager({
  activeScreen,
  onScreenChange,
  heroSection,
  philosophySection,
  disciplinesSection,
  intelligenceSection,
  packagesSection,
  contactSection,
}: FullpageScrollManagerProps) {
  const isAnimatingRef = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeScreen]);

  const goToScreen = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex > 5 || isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      onScreenChange(newIndex);

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 750);
    },
    [onScreenChange]
  );

  // Wheel listener with transition debounce
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) return;
      if (Math.abs(e.deltaY) < 18) return;

      e.preventDefault();

      if (isAnimatingRef.current) return;

      if (e.deltaY > 0) {
        if (activeScreen < 5) {
          goToScreen(activeScreen + 1);
        }
      } else {
        if (activeScreen > 0) {
          goToScreen(activeScreen - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeScreen, goToScreen]);

  // Touch listener for mobile & tablet swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - touchEndY;
      const deltaX = touchStartX.current - touchEndX;

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 35) {
        if (deltaY > 0) {
          if (activeScreen < 5) goToScreen(activeScreen + 1);
        } else {
          if (activeScreen > 0) goToScreen(activeScreen - 1);
        }
      } else if (Math.abs(deltaX) > 35 && activeScreen < 3) {
        if (deltaX > 0) {
          if (activeScreen < 2) goToScreen(activeScreen + 1);
        } else {
          if (activeScreen > 0) goToScreen(activeScreen - 1);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeScreen, goToScreen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        if (activeScreen < 5) goToScreen(activeScreen + 1);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        if (activeScreen > 0) goToScreen(activeScreen - 1);
      } else if (e.key === 'ArrowRight' && activeScreen < 2) {
        e.preventDefault();
        goToScreen(activeScreen + 1);
      } else if (e.key === 'ArrowLeft' && activeScreen > 0 && activeScreen <= 2) {
        e.preventDefault();
        goToScreen(activeScreen - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeScreen, goToScreen]);

  // Positioning
  const verticalRow = activeScreen >= 3 ? activeScreen - 2 : 0;
  const horizontalCol = activeScreen <= 2 ? activeScreen : 2;

  return (
    <div className="sol-fullpage-viewport">
      {/* Master Vertical Stage */}
      <div
        className="sol-vertical-stage"
        style={{
          transform: `translate3d(0, -${verticalRow * 100}vh, 0)`,
        }}
      >
        {/* Row 0: Horizontal Track (Hero, Philosophy, Disciplines) */}
        <div className="sol-fullpage-row row-horizontal">
          <div
            className="sol-horizontal-track-fullpage"
            style={{
              transform: `translate3d(-${horizontalCol * 100}vw, 0, 0)`,
            }}
          >
            {/* Trang 1: Cover Page */}
            <div className={`sol-slide-panel ${activeScreen === 0 ? 'active' : ''}`}>
              {heroSection}
            </div>

            {/* Trang 2: Philosophy (Horizontal Scroll) */}
            <div className={`sol-slide-panel ${activeScreen === 1 ? 'active' : ''}`}>
              {philosophySection}
            </div>

            {/* Trang 3: Disciplines (Horizontal Scroll) */}
            <div className={`sol-slide-panel ${activeScreen === 2 ? 'active' : ''}`}>
              {disciplinesSection}
            </div>
          </div>
        </div>

        {/* Row 1: Trang 4 (Intelligence - Vertical Scroll) */}
        <div className={`sol-fullpage-row ${activeScreen === 3 ? 'active' : ''}`}>
          <div className="sol-slide-panel">{intelligenceSection}</div>
        </div>

        {/* Row 2: Trang 5 (Membership Packages - Vertical Scroll) */}
        <div className={`sol-fullpage-row ${activeScreen === 4 ? 'active' : ''}`}>
          <div className="sol-slide-panel">{packagesSection}</div>
        </div>

        {/* Row 3: Trang 6 (Contact & Residencies - Vertical Scroll) */}
        <div className={`sol-fullpage-row ${activeScreen === 5 ? 'active' : ''}`}>
          <div className="sol-slide-panel">{contactSection}</div>
        </div>
      </div>

      {/* Floating Side Dot Navigation */}
      <nav className="sol-floating-dot-nav" aria-label="Quick Section Navigation">
        {SECTION_NAMES.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => goToScreen(i)}
            className={`sol-dot-item ${activeScreen === i ? 'is-active' : ''}`}
            title={`Chuyển đến: ${name}`}
            aria-label={`Chuyển đến: ${name}`}
          >
            <span className="dot-tooltip">{name}</span>
            <span className="dot-pill" />
          </button>
        ))}
      </nav>
    </div>
  );
}
