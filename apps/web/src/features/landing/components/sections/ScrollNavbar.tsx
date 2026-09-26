import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function ScrollNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sol-fixed-navbar ${isScrolled ? 'scrolled' : ''}`}
      style={{
        color: isScrolled ? '#211C18' : '#FAF8F5',
      }}
    >
      <a href="#hero" className="aura-brand-mark" style={{ color: 'inherit' }}>
        SÖL WELLNESS SANCTUARY
      </a>

      <nav className="aura-nav-links" aria-label="Main Navigation">
        <a href="#about" className="aura-nav-link">
          PHILOSOPHY
        </a>
        <a href="#disciplines" className="aura-nav-link">
          DISCIPLINES
        </a>
        <a href="#intelligence" className="aura-nav-link">
          INTELLIGENCE
        </a>
        <a href="#packages" className="aura-nav-link">
          MEMBERSHIP
        </a>
        <a href="#contact" className="aura-nav-link">
          CONTACT
        </a>
      </nav>

      <Link
        to="/login"
        className="aura-portal-btn"
        title="Đăng nhập Cổng Quản Trị &amp; Hội Viên SCMS"
        style={{ color: 'inherit' }}
      >
        PORTAL LOGIN
      </Link>
    </header>
  );
}
