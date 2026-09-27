import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../../shared/context/ThemeContext';
import { SettingsModal } from '../../../../shared/ui/SettingsModal';

export function ScrollNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sol-fixed-navbar ${isScrolled ? 'scrolled' : ''}`}
        style={{
          color: isScrolled ? (theme === 'runova' ? '#111A14' : '#211C18') : '#FAF8F5',
        }}
      >
        <a href="#hero" className="aura-brand-mark" style={{ color: 'inherit' }}>
          {theme === 'runova' ? 'RUNOVA ATHLETIC CLUB' : 'SÖL WELLNESS SANCTUARY'}
        </a>

        <nav className="aura-nav-links" aria-label="Main Navigation">
          <a href="#hero" className="aura-nav-link">
            {theme === 'runova' ? 'HOME' : 'OVERVIEW'}
          </a>
          <a href="#about" className="aura-nav-link">
            {theme === 'runova' ? 'ABOUT' : 'PHILOSOPHY'}
          </a>
          <a href="#disciplines" className="aura-nav-link">
            {theme === 'runova' ? 'FACILITIES' : 'DISCIPLINES'}
          </a>
          <a href="#intelligence" className="aura-nav-link">
            {theme === 'runova' ? 'SMART AI' : 'INTELLIGENCE'}
          </a>
          <a href="#packages" className="aura-nav-link">
            {theme === 'runova' ? 'MEMBERSHIP' : 'PACKAGES'}
          </a>
          <a href="#contact" className="aura-nav-link">
            CONTACT
          </a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Settings Theme Switcher Trigger */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            style={{
              background: isScrolled
                ? (theme === 'runova' ? '#16382C' : '#211C18')
                : 'rgba(255, 255, 255, 0.18)',
              color: isScrolled
                ? (theme === 'runova' ? '#D4E95C' : '#FAF8F5')
                : '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.05rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(8px)',
            }}
            title="Cài đặt giao diện (Theme Settings)"
          >
            ⚙️
          </button>

          <Link
            to="/login"
            className="aura-portal-btn"
            style={{
              backgroundColor: theme === 'runova' ? '#D4E95C' : undefined,
              color: theme === 'runova' ? '#111A14' : undefined,
              borderColor: theme === 'runova' ? '#D4E95C' : undefined,
              fontWeight: theme === 'runova' ? 700 : undefined,
            }}
            title="Đăng nhập Cổng Quản Trị & Hội Viên SCMS"
          >
            {theme === 'runova' ? 'JOIN / LOGIN ↗' : 'LOGIN'}
          </Link>
        </div>
      </header>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
