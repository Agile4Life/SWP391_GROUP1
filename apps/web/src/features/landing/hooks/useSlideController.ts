import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSlideControllerOptions {
  totalSlides: number;
  enableKeyboard?: boolean;
  enableWheel?: boolean;
}

export function useSlideController({
  totalSlides,
  enableKeyboard = true,
  enableWheel = true,
}: UseSlideControllerOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isThrottled = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setCurrentIndex(index);
      }
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing in inputs or textareas
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboard, nextSlide, prevSlide]);

  // Mouse wheel throttling (only when in presentation deck mode)
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!enableWheel || isThrottled.current) return;

      const threshold = 35;
      if (Math.abs(e.deltaY) > threshold) {
        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        isThrottled.current = true;
        setTimeout(() => {
          isThrottled.current = false;
        }, 650);
      }
    },
    [enableWheel, nextSlide, prevSlide]
  );

  // Touch swipe support for tablets / mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartY.current = null;
  };

  return {
    currentIndex,
    setCurrentIndex,
    goToSlide,
    nextSlide,
    prevSlide,
    handleWheel,
    handleTouchStart,
    handleTouchEnd,
  };
}
