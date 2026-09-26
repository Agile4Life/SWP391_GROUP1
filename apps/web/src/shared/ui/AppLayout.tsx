import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getCurrentUser, setCurrentUser, UserSession } from '../api/client';
import './portal.css';

export function AppLayout() {
  const navigate = useNavigate();
  const currentUser: UserSession = getCurrentUser() || {
    id: '1',
    name: 'Nguyễn Văn An',
    identifier: 'an.member@sol-wellness.vn',
    role: 'MEMBER',
  };

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

          {/* Quick Role Switcher (For easy demo / review) */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '6px',
              padding: '12px',
              marginBottom: '28px',
            }}
          >
            <div style={{ fontSize: '0.65rem', color: '#B8AFA6', letterSpacing: '0.1em', marginBottom: '8px' }}>
              VAI TRÒ HIỆN TẠI:
            </div>
            <select
              value={currentUser.role}
              onChange={(e) => switchRole(e.target.value as UserSession['role'])}
              style={{
                width: '100%',
                background: '#2B2420',
                color: '#FAF8F5',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '6px 10px',
                borderRadius: '4px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="MEMBER">👤 Hội Viên (Member)</option>
              <option value="STAFF">💁 Lễ Tân (Receptionist)</option>
              <option value="COACH">🏋️ Huấn Luyện Viên (Coach)</option>
              <option value="MANAGER">👔 Quản Lý Trung Tâm (Manager)</option>
            </select>
          </div>

          {/* Navigation by Role */}
          <nav style={{ display: 'grid', gap: '6px' }}>
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
          <Outlet />
        </div>
      </main>
    </div>
  );
}
