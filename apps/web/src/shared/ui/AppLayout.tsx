import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getCurrentUser, setCurrentUser, UserSession } from '../api/client';
import { useTheme } from '../context/ThemeContext';
import { SettingsModal } from './SettingsModal';
import './portal.css';

export function AppLayout() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const currentUser: UserSession = getCurrentUser() || {
    id: '1',
    name: 'Nguyễn Văn An',
    identifier: 'an.member@sol-wellness.vn',
    role: 'MEMBER',
  };

  const switchRole = (newRole: UserSession['role']) => {
    const isRunova = theme === 'runova';
    const updatedUser: UserSession = {
      ...currentUser,
      role: newRole,
      name:
        newRole === 'MANAGER'
          ? (isRunova ? 'Trần Công Tuấn Anh (Director)' : 'Trần Công Tuấn Anh (Manager)')
          : newRole === 'COACH'
          ? (isRunova ? 'Coach Rafael Lâm (Coach)' : 'HLV Master Khoa (Coach)')
          : newRole === 'STAFF'
          ? (isRunova ? 'Lễ Tân Thịnh (Court Host)' : 'Lễ Tân Thịnh (Receptionist)')
          : (isRunova ? 'Nguyễn Văn An (Athlete)' : 'Nguyễn Văn An (Member)'),
    };
    setCurrentUser(updatedUser);

    // Redirect to the role home
    if (newRole === 'MANAGER') navigate('/manager/reports');
    else if (newRole === 'STAFF') navigate('/staff/reception');
    else if (newRole === 'COACH') navigate('/staff/attendance');
    else navigate('/member/dashboard');
  };

  const displayIdentifier =
    theme === 'runova'
      ? currentUser.identifier.replace('@sol-wellness.vn', '@runova-sports.vn')
      : currentUser.identifier;

  return (
    <div className="app-shell" style={{ backgroundColor: theme === 'runova' ? '#EFECE6' : '#F8F6F2' }}>
      {/* Sidebar */}
      <aside
        style={{
          background: theme === 'runova' ? '#16382C' : '#1A1614',
          color: '#FAF8F5',
          padding: '24px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'background 0.3s ease',
        }}
      >
        <div>
          <div style={{ marginBottom: '22px' }}>
            <NavLink to="/" style={{ color: 'inherit' }}>
              <div
                style={{
                  fontFamily: theme === 'runova' ? 'var(--font-heading)' : 'var(--font-serif)',
                  fontSize: theme === 'runova' ? '1.35rem' : '1.2rem',
                  letterSpacing: theme === 'runova' ? '0.04em' : '0.15em',
                  fontWeight: 800,
                  color: theme === 'runova' ? '#D4E95C' : '#FAF8F5',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {theme === 'runova' && <span>🎾</span>}
                <span>{theme === 'runova' ? 'RUNOVA ATHLETIC' : 'SÖL SANCTUARY'}</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: theme === 'runova' ? '#A3C2B4' : '#9E958C', letterSpacing: '0.12em' }}>
                {theme === 'runova' ? 'SPORTVERSE COURT MANAGEMENT' : 'SCMS MANAGEMENT PORTAL'}
              </div>
            </NavLink>
          </div>

          {/* Quick Role Switcher (For easy demo / review) */}
          <div
            style={{
              background: theme === 'runova' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.06)',
              borderRadius: theme === 'runova' ? '12px' : '6px',
              padding: '12px',
              marginBottom: '22px',
              border: theme === 'runova' ? '1px solid rgba(212, 233, 92, 0.2)' : 'none',
            }}
          >
            <div style={{ fontSize: '0.65rem', color: theme === 'runova' ? '#D4E95C' : '#B8AFA6', letterSpacing: '0.1em', marginBottom: '8px', fontWeight: 700 }}>
              VAI TRÒ HIỆN TẠI:
            </div>
            <select
              value={currentUser.role}
              onChange={(e) => switchRole(e.target.value as UserSession['role'])}
              style={{
                width: '100%',
                background: theme === 'runova' ? '#0F261E' : '#2B2420',
                color: '#FAF8F5',
                border: theme === 'runova' ? '1px solid rgba(212, 233, 92, 0.3)' : '1px solid rgba(255, 255, 255, 0.15)',
                padding: '6px 10px',
                borderRadius: '6px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {theme === 'runova' ? (
                <>
                  <option value="MEMBER">👤 Vận Động Viên (Member)</option>
                  <option value="STAFF">💁 Lễ Tân Cụm Sân (Receptionist)</option>
                  <option value="COACH">🎾 HLV Tennis / Padel (Coach)</option>
                  <option value="MANAGER">👔 Quản Lý Cụm Sân (Manager)</option>
                </>
              ) : (
                <>
                  <option value="MEMBER">👤 Hội Viên (Member)</option>
                  <option value="STAFF">💁 Lễ Tân (Receptionist)</option>
                  <option value="COACH">🏋️ Huấn Luyện Viên (Coach)</option>
                  <option value="MANAGER">👔 Quản Lý Trung Tâm (Manager)</option>
                </>
              )}
            </select>
          </div>

          {/* Navigation by Role */}
          <nav style={{ display: 'grid', gap: '5px' }}>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: theme === 'runova' ? '#8FAD9F' : '#8A827B', padding: '6px 10px', fontWeight: 700 }}>
              {theme === 'runova' ? 'PHÂN HỆ VẬN ĐỘNG VIÊN' : 'PHÂN HỆ HỘI VIÊN'}
            </div>
            <NavLink to="/member/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              {theme === 'runova' ? '📊 Dashboard Thi Đấu' : 'Dashboard Hội Viên'}
            </NavLink>
            <NavLink to="/member/classes" className={({ isActive }) => (isActive ? 'active' : '')}>
              {theme === 'runova' ? '🎾 Lịch Sân & Thi Đấu' : 'Lịch Lớp & Đặt Chỗ'}
            </NavLink>
            <NavLink to="/member/card" className={({ isActive }) => (isActive ? 'active' : '')}>
              {theme === 'runova' ? '🎟️ Thẻ Court Pass & QR' : 'Gói Tập & Mã QR'}
            </NavLink>
            <NavLink to="/member/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
              {theme === 'runova' ? '👤 Hồ Sơ & Chỉ Số ELO' : 'Hồ Sơ & Thể Chất'}
            </NavLink>

            <div style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: theme === 'runova' ? '#8FAD9F' : '#8A827B', padding: '10px 10px 4px 10px', fontWeight: 700 }}>
              {theme === 'runova' ? 'VẬN HÀNH SÂN & COACH' : 'VẬN HÀNH & HUẤN LUYỆN'}
            </div>
            <NavLink to="/staff/reception" className={({ isActive }) => (isActive ? 'active' : '')}>
              {theme === 'runova' ? '💁 Lễ Tân & Gói Court Pass' : 'Lễ Tân & Thu Phí POS'}
            </NavLink>
            <NavLink to="/staff/check-in" className={({ isActive }) => (isActive ? 'active' : '')}>
              {theme === 'runova' ? '🚧 Cổng Check-in Sân Bãi' : 'Cổng Check-in Sảnh'}
            </NavLink>
            <NavLink to="/staff/classes" className={({ isActive }) => (isActive ? 'active' : '')}>
              {theme === 'runova' ? '📋 Quản Lý Sân & Lịch Tập' : 'Quản Lý Lớp & Buổi'}
            </NavLink>
            <NavLink to="/staff/attendance" className={({ isActive }) => (isActive ? 'active' : '')}>
              {theme === 'runova' ? '🎯 Điểm Danh & AI Coach' : 'Điểm Danh & AI Coach'}
            </NavLink>

            <div style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: theme === 'runova' ? '#8FAD9F' : '#8A827B', padding: '10px 10px 4px 10px', fontWeight: 700 }}>
              {theme === 'runova' ? 'QUẢN TRỊ CỤM SÂN' : 'QUẢN TRỊ TRUNG TÂM'}
            </div>
            <NavLink to="/manager/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
              {theme === 'runova' ? '📈 Báo Cáo Doanh Thu & Sân' : 'Báo Cáo Doanh Thu'}
            </NavLink>
            <NavLink to="/manager/catalogs" className={({ isActive }) => (isActive ? 'active' : '')}>
              {theme === 'runova' ? '⚙️ Danh Mục Sân & Môn Đấu' : 'Danh Mục Vận Hành'}
            </NavLink>
            <NavLink to="/manager/users" className={({ isActive }) => (isActive ? 'active' : '')}>
              {theme === 'runova' ? '👥 Tài Khoản VĐV & Quyền' : 'Tài Khoản & Phân Quyền'}
            </NavLink>
          </nav>
        </div>

        {/* Bottom Sidebar: Upgrade Promo Widget in Runova (Matching Reference Image 1) */}
        <div>
          {theme === 'runova' && (
            <div
              style={{
                background: 'radial-gradient(circle at top left, #235443, #0F261E)',
                border: '1px solid rgba(212, 233, 92, 0.35)',
                borderRadius: '16px',
                padding: '14px',
                marginBottom: '16px',
                textAlign: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>🎾</div>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#D4E95C', letterSpacing: '0.06em' }}>
                UPGRADE TO PRO
              </div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.85)', marginTop: '3px', lineHeight: 1.35 }}>
                Cảm biến AI đo lực &amp; Giờ vàng
              </div>
            </div>
          )}

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '14px', fontSize: '0.75rem' }}>
            <NavLink to="/" style={{ color: theme === 'runova' ? '#D4E95C' : '#B8AFA6', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              ← Quay lại Trang Chủ
            </NavLink>
            <div style={{ color: theme === 'runova' ? '#8FAD9F' : '#6A635D' }}>SCMS Version 1.0.0 (Master)</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 36px',
            background: '#FFFFFF',
            borderBottom: '1px solid rgba(33, 28, 24, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span
              style={{
                fontFamily: theme === 'runova' ? 'var(--font-heading)' : 'var(--font-serif)',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: theme === 'runova' ? '#16382C' : '#1A1614',
                letterSpacing: theme === 'runova' ? '0.04em' : 'normal',
              }}
            >
              {theme === 'runova' ? 'RUNOVA ATHLETIC SPORTVERSE PORTAL' : 'SÖL WELLNESS SANCTUARY PORTAL'}
            </span>
            <span
              className="badge badge-success"
              style={{
                background: theme === 'runova' ? 'rgba(212, 233, 92, 0.2)' : undefined,
                color: theme === 'runova' ? '#16382C' : undefined,
                borderColor: theme === 'runova' ? 'rgba(22, 56, 44, 0.2)' : undefined,
                fontWeight: 700,
              }}
            >
              HỆ THỐNG ONLINE
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {/* Quick Theme Switcher Button */}
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              style={{
                background: theme === 'runova' ? '#16382C' : '#F4EFEA',
                color: theme === 'runova' ? '#D4E95C' : '#211C18',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                padding: '6px 14px',
                borderRadius: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                transition: 'all 0.2s ease',
              }}
              title="Cài đặt giao diện (Theme Settings)"
            >
              <span>⚙️</span>
              <span>{theme === 'runova' ? 'Runova Theme' : 'Söl Theme'}</span>
            </button>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{currentUser.name}</div>
              <div style={{ fontSize: '0.72rem', color: '#8C847C' }}>{displayIdentifier}</div>
            </div>

            <NavLink
              to="/login"
              style={{
                fontSize: '0.78rem',
                color: '#b91c1c',
                fontWeight: 600,
                border: '1px solid #fecaca',
                padding: '6px 12px',
                borderRadius: theme === 'runova' ? '9999px' : '4px',
                background: '#fff5f5',
              }}
            >
              Đăng xuất
            </NavLink>
          </div>
        </header>

        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </main>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
