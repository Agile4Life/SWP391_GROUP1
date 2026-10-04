import { Link } from 'react-router-dom';
import { getCurrentUser, homePath } from '../../../shared/api/client';

interface NavbarProps {
  theme?: 'dark' | 'light';
  onNavigateSlide?: (index: number) => void;
}

export function Navbar({ theme = 'light', onNavigateSlide }: NavbarProps) {
  const isLight = theme === 'light';
  const currentUser = getCurrentUser();

  const handleNavClick = (index: number) => {
    if (onNavigateSlide) {
      onNavigateSlide(index);
    }
  };

  return (
    <header className={`aura-navbar ${isLight ? 'light-theme' : ''}`} style={{ color: isLight ? '#211C18' : '#FAF8F5' }}>
      <button
        type="button"
        onClick={() => handleNavClick(0)}
        className="aura-brand-mark"
        style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
      >
        SÖL WELLNESS SANCTUARY
      </button>

      <nav className="aura-nav-links" aria-label="Main Navigation">
        <button
          type="button"
          onClick={() => handleNavClick(1)}
          className="aura-nav-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ABOUT US
        </button>
        <button
          type="button"
          onClick={() => handleNavClick(2)}
          className="aura-nav-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          DISCIPLINES
        </button>
        <button
          type="button"
          onClick={() => handleNavClick(3)}
          className="aura-nav-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ARENAS
        </button>
        <button
          type="button"
          onClick={() => handleNavClick(4)}
          className="aura-nav-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          CONTACT
        </button>
      </nav>

      {currentUser ? (
        <Link
          to={homePath(currentUser.role)}
          className="aura-portal-btn aura-portal-btn--active"
          title={`Đang đăng nhập: ${currentUser.name}`}
        >
          PORTAL · {currentUser.name.toUpperCase()}
        </Link>
      ) : (
        <Link to="/login" className="aura-portal-btn" title="Đăng nhập cổng quản trị SCMS">
          LOGIN
        </Link>
      )}
    </header>
  );
}
