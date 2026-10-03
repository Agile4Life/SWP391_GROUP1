import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ScrollNavbarProps {
  activeScreen?: number;
  onNavigate?: (index: number) => void;
}

export function ScrollNavbar({ activeScreen = 0, onNavigate }: ScrollNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkText = activeScreen > 0 || isScrolled;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, screenIndex: number) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(screenIndex);
    }
  };

  return (
    <header
      className={`sol-fixed-navbar ${isDarkText ? 'scrolled' : ''}`}
      style={{
        color: isDarkText ? '#211C18' : '#FAF8F5',
      }}
    >
      <a
        href="#hero"
        className="aura-brand-mark"
        style={{ color: 'inherit', cursor: 'pointer' }}
        onClick={(e) => handleClick(e, 0)}
      >
        SÖL WELLNESS SANCTUARY
      </a>

      <nav className="aura-nav-links" aria-label="Main Navigation">
        <a
          href="#about"
          className={`aura-nav-link ${activeScreen === 1 ? 'active' : ''}`}
          onClick={(e) => handleClick(e, 1)}
        >
          PHILOSOPHY
        </a>
        <a
          href="#disciplines"
          className={`aura-nav-link ${activeScreen === 2 ? 'active' : ''}`}
          onClick={(e) => handleClick(e, 2)}
        >
          DISCIPLINES
        </a>
        <a
          href="#intelligence"
          className={`aura-nav-link ${activeScreen === 3 ? 'active' : ''}`}
          onClick={(e) => handleClick(e, 3)}
        >
          INTELLIGENCE
        </a>
        <a
          href="#packages"
          className={`aura-nav-link ${activeScreen === 4 ? 'active' : ''}`}
          onClick={(e) => handleClick(e, 4)}
        >
          MEMBERSHIP
        </a>
        <a
          href="#contact"
          className={`aura-nav-link ${activeScreen === 5 ? 'active' : ''}`}
          onClick={(e) => handleClick(e, 5)}
        >
          CONTACT
        </a>
      </nav>

      <Link
        to="/login"
        viewTransition
        className="aura-portal-btn"
        title="Đăng nhập Cổng Quản Trị & Hội Viên SCMS"
      >
        LOGIN
      </Link>
    </header>
  );
}
