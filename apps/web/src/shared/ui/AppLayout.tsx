import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser, setCurrentUser, UserSession } from '../api/client';
import './portal.css';

const ROLE_LABELS: Record<UserSession['role'], string> = {
  MEMBER: '👤 Hội Viên (Member)',
  STAFF: '💁 Lễ Tân (Receptionist)',
  COACH: '🏋️ Huấn Luyện Viên (Coach)',
  MANAGER: '👔 Quản Lý Trung Tâm (Manager)',
};

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser: UserSession = getCurrentUser() || {
    id: '1',
    name: 'Nguyễn Văn An',
    identifier: 'an.member@sol-wellness.vn',
    role: 'MEMBER',
  };

  // 3.2 Sidebar Active Indicator
  const navRef = useRef<HTMLElement>(null);
  const [indicatorPos, setIndicatorPos] = useState({ y: 0, h: 0 });
  const [isReady, setIsReady] = useState(false);

  // 3.3 Role Dropdown State
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  // Measure and align the sidebar indicator
  useLayoutEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;
      const activeEl = navRef.current.querySelector('a.active') as HTMLElement | null;
      if (activeEl) {
        const navRect = navRef.current.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        setIndicatorPos({
          y: activeRect.top - navRect.top,
          h: activeRect.height,
        });
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
  }, [location.pathname, currentUser.role]);

  // Click outside and Esc key listener for role dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target as Node)) {
        setRoleMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setRoleMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const switchRole = (newRole: UserSession['role']) => {
    const updatedUser: UserSession = {
      ...currentUser,
      role: newRole,
      name:
        newRole === 'MANAGER'
          ? 'Trần Công Tuấn Anh (Manager)'
          : newRole === 'COACH'
          ? 'HLV Master Khoa (Coach)'
          : newRole === 'STAFF'
          ? 'Lễ Tân Thịnh (Receptionist)'
          : 'Nguyễn Văn An (Member)',
    };
    setCurrentUser(updatedUser);

    // Redirect to the role home
    if (newRole === 'MANAGER') navigate('/manager/reports');
    else if (newRole === 'STAFF') navigate('/staff/reception');
    else if (newRole === 'COACH') navigate('/staff/attendance');
    else navigate('/member/dashboard');
  };

  return (
    <div className="app-shell" style={{ backgroundColor: '#F8F6F2' }}>
      {/* Sidebar */}
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
            <NavLink to="/" style={{ color: 'inherit' }}>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  letterSpacing: '0.15em',
                  fontWeight: 600,
                }}
              >
                SÖL SANCTUARY
              </div>
              <div style={{ fontSize: '0.65rem', color: '#9E958C', letterSpacing: '0.12em' }}>
                SCMS MANAGEMENT PORTAL
              </div>
            </NavLink>
          </div>

          {/* Quick Role Switcher (Custom Luxury Dropdown with data-open) */}
          <div
            ref={roleDropdownRef}
            style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '6px',
              padding: '12px',
              marginBottom: '28px',
            }}
          >
            <div style={{ fontSize: '0.65rem', color: '#B8AFA6', letterSpacing: '0.1em', marginBottom: '8px' }}>
              VAI TRÒ HIỆN TẠI:
            </div>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={roleMenuOpen}
              onClick={() => setRoleMenuOpen((prev) => !prev)}
              style={{
                width: '100%',
                background: '#2B2420',
                color: '#FAF8F5',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '7px 10px',
                borderRadius: '4px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'left',
              }}
            >
              <span>{ROLE_LABELS[currentUser.role]}</span>
              <span
                style={{
                  fontSize: '0.65rem',
                  color: '#B8AFA6',
                  transform: roleMenuOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform var(--dur-fast) var(--ease-luxury)',
                }}
              >
                ▼
              </span>
            </button>

            {/* Always mounted dropdown container with data-open */}
            <div
              className="role-menu"
              data-open={roleMenuOpen ? 'true' : 'false'}
              role="listbox"
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                background: '#221C18',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '6px',
                padding: '4px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                zIndex: 50,
                display: 'grid',
                gap: '2px',
              }}
            >
              {(['MEMBER', 'STAFF', 'COACH', 'MANAGER'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  role="option"
                  aria-selected={currentUser.role === r}
                  onClick={() => {
                    switchRole(r);
                    setRoleMenuOpen(false);
                  }}
                  style={{
                    background: currentUser.role === r ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                    color: '#FAF8F5',
                    border: 'none',
                    padding: '8px 10px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.76rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{ROLE_LABELS[r]}</span>
                  {currentUser.role === r && (
                    <span style={{ color: 'var(--color-accent-gold, #C2A684)', fontSize: '0.75rem' }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation by Role with animated nav-indicator */}
          <nav ref={navRef} style={{ display: 'grid', gap: '6px', position: 'relative' }}>
            <div
              className={`nav-indicator ${isReady ? 'is-ready' : ''}`}
              style={{
                '--y': `${indicatorPos.y}px`,
                '--h': `${indicatorPos.h}px`,
              } as React.CSSProperties}
            />
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: '#8A827B', padding: '6px 10px' }}>
              PHÂN HỆ HỘI VIÊN
            </div>
            <NavLink to="/member/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard Hội Viên
            </NavLink>
            <NavLink to="/member/classes" className={({ isActive }) => (isActive ? 'active' : '')}>
              Lịch Lớp &amp; Đặt Chỗ
            </NavLink>
            <NavLink to="/member/card" className={({ isActive }) => (isActive ? 'active' : '')}>
              Gói Tập &amp; Mã QR
            </NavLink>
            <NavLink to="/member/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
              Hồ Sơ &amp; Thể Chất
            </NavLink>

            <div style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: '#8A827B', padding: '12px 10px 6px 10px' }}>
              VẬN HÀNH &amp; HUẤN LUYỆN
            </div>
            <NavLink to="/staff/reception" className={({ isActive }) => (isActive ? 'active' : '')}>
              Lễ Tân &amp; Thu Phí POS
            </NavLink>
            <NavLink to="/staff/check-in" className={({ isActive }) => (isActive ? 'active' : '')}>
              Cổng Check-in Sảnh
            </NavLink>
            <NavLink to="/staff/classes" className={({ isActive }) => (isActive ? 'active' : '')}>
              Quản Lý Lớp &amp; Buổi
            </NavLink>
            <NavLink to="/staff/attendance" className={({ isActive }) => (isActive ? 'active' : '')}>
              Điểm Danh &amp; AI Coach
            </NavLink>

            <div style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: '#8A827B', padding: '12px 10px 6px 10px' }}>
              QUẢN TRỊ TRUNG TÂM
            </div>
            <NavLink to="/manager/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
              Báo Cáo Doanh Thu
            </NavLink>
            <NavLink to="/manager/catalogs" className={({ isActive }) => (isActive ? 'active' : '')}>
              Danh Mục Vận Hành
            </NavLink>
            <NavLink to="/manager/users" className={({ isActive }) => (isActive ? 'active' : '')}>
              Tài Khoản &amp; Phân Quyền
            </NavLink>
          </nav>
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', fontSize: '0.75rem' }}>
          <NavLink to="/" style={{ color: '#B8AFA6', display: 'block', marginBottom: '8px' }}>
            ← Quay lại Trang Chủ
          </NavLink>
          <div style={{ color: '#6A635D' }}>SCMS Version 1.0.0 (Master)</div>
        </div>
      </aside>

      {/* Main Content Area */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600 }}>
              SÖL WELLNESS SANCTUARY PORTAL
            </span>
            <span className="badge badge-success">HỆ THỐNG ONLINE</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{currentUser.name}</div>
              <div style={{ fontSize: '0.72rem', color: '#8C847C' }}>{currentUser.identifier}</div>
            </div>

            <NavLink
              to="/login"
              style={{
                fontSize: '0.78rem',
                color: '#b91c1c',
                fontWeight: 600,
                border: '1px solid #fecaca',
                padding: '6px 12px',
                borderRadius: '4px',
                background: '#fff5f5',
              }}
            >
              Đăng xuất
            </NavLink>
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
