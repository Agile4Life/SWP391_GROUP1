import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../shared/context/ThemeContext';
import { loginApi } from '../../shared/api/client';

interface LuxuryLoginFormProps {
  onSuccess?: () => void;
}

export function LuxuryLoginForm({ onSuccess }: LuxuryLoginFormProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isRunova = theme === 'runova';

  const defaultEmail = isRunova ? 'an.member@runova-sports.vn' : 'an.member@sol-wellness.vn';

  const [identifier, setIdentifier] = useState(defaultEmail);
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const quickFill = (id: string, pass: string = '123456') => {
    setIdentifier(id);
    setPassword(pass);
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setFormError('Vui lòng nhập Email hoặc Số điện thoại.');
      return;
    }
    if (!password) {
      setFormError('Vui lòng nhập mật khẩu.');
      return;
    }

    setIsLoading(true);
    setFormError('');

    try {
      const res = await loginApi(identifier, password);
      if (onSuccess) onSuccess();

      switch (res.user.role) {
        case 'MANAGER':
          navigate('/manager/reports');
          break;
        case 'STAFF':
          navigate('/staff/reception');
          break;
        case 'COACH':
          navigate('/staff/attendance');
          break;
        case 'MEMBER':
        default:
          navigate('/member/dashboard');
          break;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đăng nhập không thành công.';
      setFormError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: isRunova ? '24px' : '8px',
        padding: '44px 40px',
        boxShadow: isRunova
          ? '0 20px 50px rgba(22, 56, 44, 0.12), 0 0 0 1px rgba(22, 56, 44, 0.1)'
          : '0 20px 50px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(33, 28, 24, 0.06)',
        maxWidth: '520px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: isRunova ? '#16382C' : 'var(--color-text-muted)',
            marginBottom: '8px',
            fontWeight: 700,
          }}
        >
          {isRunova ? 'SPORTVERSE AUTHENTICATION GATEWAY' : 'CỔNG XÁC THỰC TẬP TRUNG'}
        </div>

        <h3
          style={{
            fontFamily: isRunova ? 'var(--font-heading)' : 'var(--font-serif)',
            fontSize: isRunova ? '2.2rem' : '2rem',
            fontWeight: isRunova ? 800 : 600,
            margin: '0 0 10px 0',
            color: isRunova ? '#16382C' : '#1A1614',
            letterSpacing: isRunova ? '0.04em' : '0.02em',
          }}
        >
          {isRunova ? 'Đăng Nhập Sportverse' : 'Đăng Nhập Portal'}
        </h3>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: isRunova ? '#526357' : '#7E7771', margin: 0, lineHeight: 1.6 }}>
          Hệ thống xác thực đa vai trò hỗ trợ Hội viên, Lễ tân, Huấn luyện viên và Ban quản lý.
        </p>
      </div>

      {/* Quick Demo Pre-fill Cards */}
      <div
        style={{
          background: isRunova ? '#F4F7F4' : '#FAF8F5',
          border: isRunova ? '1px solid rgba(22, 56, 44, 0.15)' : '1px solid rgba(33, 28, 24, 0.08)',
          borderRadius: isRunova ? '16px' : '8px',
          padding: '16px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            fontSize: '0.7rem',
            color: isRunova ? '#16382C' : '#8C847C',
            letterSpacing: '0.12em',
            fontWeight: 700,
            marginBottom: '10px',
          }}
        >
          ⚡ CHỌN TÀI KHOẢN TRẢI NGHIỆM NHANH (DEMO ACCOUNTS):
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            type="button"
            className={`demo-role-card ${identifier.includes('member') ? 'selected' : ''}`}
            onClick={() => quickFill(isRunova ? 'an.member@runova-sports.vn' : 'an.member@sol-wellness.vn')}
          >
            <span className="demo-role-badge">MEMBER</span>
            <span className="demo-role-name">👤 Nguyễn Văn An</span>
            <span className="demo-role-email">
              {isRunova ? 'Hội viên • Đặt sân & Court Pass' : 'Hội viên • Đặt lớp & Thẻ QR'}
            </span>
          </button>
          <button
            type="button"
            className={`demo-role-card ${identifier.includes('reception') ? 'selected' : ''}`}
            onClick={() => quickFill(isRunova ? 'thinh.reception@runova-sports.vn' : 'thinh.reception@sol-wellness.vn')}
          >
            <span className="demo-role-badge">STAFF</span>
            <span className="demo-role-name">💁 Lễ Tân Thịnh</span>
            <span className="demo-role-email">
              {isRunova ? 'Check-in sân & Thu POS' : 'Check-in sảnh & Thu POS'}
            </span>
          </button>
          <button
            type="button"
            className={`demo-role-card ${identifier.includes('elena') ? 'selected' : ''}`}
            onClick={() => quickFill(isRunova ? 'elena.vu@runova-sports.vn' : 'elena.vu@sol-wellness.vn')}
          >
            <span className="demo-role-badge">COACH</span>
            <span className="demo-role-name">🎾 Elena Vũ</span>
            <span className="demo-role-email">
              {isRunova ? 'HLV • Sân đấu & Phân tích AI' : 'HLV • Điểm danh & AI'}
            </span>
          </button>
          <button
            type="button"
            className={`demo-role-card ${identifier.includes('manager') ? 'selected' : ''}`}
            onClick={() => quickFill(isRunova ? 'admin.manager@runova-sports.vn' : 'admin.manager@sol-wellness.vn')}
          >
            <span className="demo-role-badge">MANAGER</span>
            <span className="demo-role-name">👔 Ban Quản Lý</span>
            <span className="demo-role-email">
              {isRunova ? 'Điều phối cụm sân & Doanh thu' : 'Báo cáo & Doanh thu'}
            </span>
          </button>
        </div>
      </div>

      {formError && (
        <div
          style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            color: '#B91C1C',
            fontSize: '0.82rem',
            padding: '10px 14px',
            borderRadius: '4px',
            marginBottom: '18px',
          }}
        >
          ⚠️ {formError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="portal-form-group">
          <label className="portal-label">Email Hoặc Số Điện Thoại</label>
          <input
            type="text"
            className="portal-input"
            placeholder={
              isRunova
                ? 'example@runova-sports.vn hoặc 0908123456'
                : 'example@sol-wellness.vn hoặc 0908123456'
            }
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className="portal-form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label className="portal-label" style={{ margin: 0 }}>
              Mật Khẩu
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.72rem',
                color: isRunova ? '#16382C' : '#8C847C',
                cursor: 'pointer',
                padding: 0,
                fontWeight: 600,
              }}
            >
              {showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            </button>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            className="portal-input"
            placeholder="Nhập mật khẩu (Mặc định: 123456)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="luxury-login-submit-btn"
          disabled={isLoading}
          style={{
            backgroundColor: isRunova ? '#16382C' : undefined,
            color: isRunova ? '#D4E95C' : undefined,
            borderRadius: isRunova ? '9999px' : undefined,
            fontFamily: isRunova ? 'var(--font-heading)' : undefined,
            letterSpacing: isRunova ? '0.08em' : undefined,
            fontWeight: 700,
          }}
        >
          <span>
            {isLoading
              ? 'ĐANG XÁC THỰC...'
              : isRunova
              ? 'TRUY CẬP CỔNG RUNOVA SPORTVERSE'
              : 'TRUY CẬP HỆ THỐNG PORTAL'}
          </span>
          <span className="submit-arrow" aria-hidden="true">
            →
          </span>
        </button>
      </form>
    </div>
  );
}

