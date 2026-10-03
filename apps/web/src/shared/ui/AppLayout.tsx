import { useState, useRef, useLayoutEffect } from 'react';
import { Navigate, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { clearAuthSession, getCurrentUser, UserSession } from '../api/client';
import './portal.css';

const ROLE_LABELS: Record<UserSession['role'], string> = {
  MEMBER: 'Hội viên',
  STAFF: 'Lễ tân',
  COACH: 'Huấn luyện viên',
  MANAGER: 'Quản lý trung tâm',
};

// Chỉ liệt kê các màn hình đã nối API thật (Sprint 1)
const NAV_ITEMS: { to: string; label: string; roles: UserSession['role'][] }[] = [
  { to: '/member/profile', label: 'Hồ sơ & Chỉ số sức khỏe', roles: ['MEMBER', 'STAFF', 'COACH', 'MANAGER'] },
  { to: '/manager/catalogs', label: 'Danh mục vận hành', roles: ['MANAGER'] },
  { to: '/manager/users', label: 'Tài khoản & Phân quyền', roles: ['MANAGER'] },
];

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = getCurrentUser();

  const navRef = useRef<HTMLElement>(null);
  const [indicatorPos, setIndicatorPos] = useState({ y: 0, h: 0 });
  const [isReady, setIsReady] = useState(false);

  // Measure and align the sidebar indicator
  useLayoutEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;
      const activeEl = navRef.current.querySelector('a.active') as HTMLElement | null;
      if (activeEl) {
        const navRect = navRef.current.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        setIndicatorPos({ y: activeRect.top - navRect.top, h: activeRect.height });
      }
    };

    updateIndicator();
    const rafId = requestAnimationFrame(() => setIsReady(true));

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && navRef.current) {
      ro = new ResizeObserver(() => updateIndicator());
      ro.observe(navRef.current);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
    };
  }, [location.pathname, currentUser?.role]);

  if (!currentUser) return <Navigate to="/login" replace />;

  const logout = () => {
    clearAuthSession();
    navigate('/login', { replace: true, viewTransition: true });
  };

  return (
    <div className="app-shell" style={{ backgroundColor: '#F8F6F2' }}>
      <aside
        style={{
          background: '#1A1614',
          color: '#FAF8F5',
          padding: '28px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ marginBottom: '24px' }}>
            <NavLink to="/" viewTransition style={{ color: 'inherit' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', letterSpacing: '0.15em', fontWeight: 600 }}>
                SÖL SANCTUARY
              </div>
              <div style={{ fontSize: '0.65rem', color: '#9E958C', letterSpacing: '0.12em' }}>
                SCMS MANAGEMENT PORTAL
              </div>
            </NavLink>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '6px',
              padding: '12px',
              marginBottom: '28px',
            }}
          >
            <div style={{ fontSize: '0.65rem', color: '#B8AFA6', letterSpacing: '0.1em', marginBottom: '6px' }}>
              VAI TRÒ HIỆN TẠI
            </div>
            <div style={{ fontSize: '0.85rem' }}>{ROLE_LABELS[currentUser.role]}</div>
          </div>

          <nav ref={navRef} style={{ display: 'grid', gap: '6px', position: 'relative' }}>
            <div
              className={`nav-indicator ${isReady ? 'is-ready' : ''}`}
              style={{ '--y': `${indicatorPos.y}px`, '--h': `${indicatorPos.h}px` } as React.CSSProperties}
            />
            {NAV_ITEMS.filter((item) => item.roles.includes(currentUser.role)).map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', fontSize: '0.75rem' }}>
          <NavLink to="/" viewTransition style={{ color: '#B8AFA6', display: 'block', marginBottom: '8px' }}>
            ← Quay lại Trang Chủ
          </NavLink>
        </div>
      </aside>

      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 40px',
            background: '#FFFFFF',
            borderBottom: '1px solid rgba(33, 28, 24, 0.08)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600 }}>
            SÖL WELLNESS SANCTUARY PORTAL
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{currentUser.name}</div>
              <div style={{ fontSize: '0.72rem', color: '#8C847C' }}>{ROLE_LABELS[currentUser.role]}</div>
            </div>

            <button
              type="button"
              onClick={logout}
              style={{
                fontSize: '0.78rem',
                color: '#b91c1c',
                fontWeight: 600,
                border: '1px solid #fecaca',
                padding: '6px 12px',
                borderRadius: '4px',
                background: '#fff5f5',
                cursor: 'pointer',
              }}
            >
              Đăng xuất
            </button>
          </div>
        </header>

        <div style={{ flex: 1 }}>
          <div key={location.pathname} className="route-fade">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
