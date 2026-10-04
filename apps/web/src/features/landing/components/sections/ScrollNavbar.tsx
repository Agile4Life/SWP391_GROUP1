import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, clearAuthSession, homePath, type UserSession } from '../../../../shared/api/client';

interface ScrollNavbarProps {
  activeScreen?: number;
  onNavigate?: (index: number) => void;
}

export function ScrollNavbar({ activeScreen = 0, onNavigate }: ScrollNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => getCurrentUser());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    const syncUser = () => {
      setCurrentUser(getCurrentUser());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('storage', syncUser);
    window.addEventListener('focus', syncUser);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('focus', syncUser);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi phiên làm việc hiện tại?')) {
      clearAuthSession();
      setCurrentUser(null);
    }
  };

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

      {currentUser ? (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Link
            to={homePath(currentUser.role)}
            viewTransition
            className="aura-portal-btn aura-portal-btn--active"
            title={`Tài khoản: ${currentUser.name} (${currentUser.role}) · Bấm để vào hệ thống`}
          >
            <span
              style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#52b788',
                boxShadow: '0 0 6px #52b788',
              }}
            />
            <span>VÀO HỆ THỐNG · {currentUser.name.toUpperCase()}</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="aura-portal-btn aura-portal-btn--logout"
            title="Đăng xuất tài khoản"
          >
            THOÁT
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          viewTransition
          className="aura-portal-btn"
          title="Đăng nhập Cổng Quản Trị & Hội Viên SCMS"
        >
          LOGIN
        </Link>
      )}
    </header>
  );
}
