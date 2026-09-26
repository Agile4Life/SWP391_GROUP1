import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../shared/api/client';

interface LuxuryLoginFormProps {
  onSuccess?: () => void;
}

export function LuxuryLoginForm({ onSuccess }: LuxuryLoginFormProps) {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('an.member@sol-wellness.vn');
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
        borderRadius: '8px',
        padding: '44px 40px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(33, 28, 24, 0.06)',
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
            color: 'var(--color-text-muted)',
            marginBottom: '8px',
            fontWeight: 600,
          }}
        >
          CỔNG XÁC THỰC TẬP TRUNG
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2rem',
            fontWeight: 600,
            margin: '0 0 10px 0',
            color: '#1A1614',
            letterSpacing: '0.02em',
          }}
        >
          Đăng Nhập Portal
        </h3>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#7E7771', margin: 0, lineHeight: 1.6 }}>
          Hệ thống xác thực đa vai trò hỗ trợ Hội viên, Lễ tân, Huấn luyện viên và Ban quản lý.
        </p>
      </div>

      {/* Quick Demo Pre-fill Cards */}
      <div
        style={{
          background: '#FAF8F5',
          border: '1px solid rgba(33, 28, 24, 0.08)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
        }}
      >
        <div style={{ fontSize: '0.7rem', color: '#8C847C', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '10px' }}>
          ⚡ CHỌN TÀI KHOẢN TRẢI NGHIỆM NHANH (DEMO ACCOUNTS):
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            type="button"
            className={`demo-role-card ${identifier === 'an.member@sol-wellness.vn' ? 'selected' : ''}`}
            onClick={() => quickFill('an.member@sol-wellness.vn')}
          >
            <span className="demo-role-badge">MEMBER</span>
            <span className="demo-role-name">👤 Nguyễn Văn An</span>
            <span className="demo-role-email">Hội viên • Đặt lớp &amp; Thẻ QR</span>
          </button>
          <button
            type="button"
            className={`demo-role-card ${identifier === 'thinh.reception@sol-wellness.vn' ? 'selected' : ''}`}
            onClick={() => quickFill('thinh.reception@sol-wellness.vn')}
          >
            <span className="demo-role-badge">STAFF</span>
            <span className="demo-role-name">💁 Lễ Tân Thịnh</span>
            <span className="demo-role-email">Check-in sảnh &amp; Thu POS</span>
          </button>
          <button
            type="button"
            className={`demo-role-card ${identifier === 'elena.vu@sol-wellness.vn' ? 'selected' : ''}`}
            onClick={() => quickFill('elena.vu@sol-wellness.vn')}
          >
            <span className="demo-role-badge">COACH</span>
            <span className="demo-role-name">🏋️ Elena Vũ</span>
            <span className="demo-role-email">HLV • Điểm danh &amp; AI</span>
          </button>
          <button
            type="button"
            className={`demo-role-card ${identifier === 'admin.manager@sol-wellness.vn' ? 'selected' : ''}`}
            onClick={() => quickFill('admin.manager@sol-wellness.vn')}
          >
            <span className="demo-role-badge">MANAGER</span>
            <span className="demo-role-name">👔 Ban Quản Lý</span>
            <span className="demo-role-email">Báo cáo &amp; Doanh thu</span>
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
            placeholder="example@sol-wellness.vn hoặc 0908123456"
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
                color: '#8C847C',
                cursor: 'pointer',
                padding: 0,
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
        >
          <span>{isLoading ? 'ĐANG XÁC THỰC...' : 'TRUY CẬP HỆ THỐNG PORTAL'}</span>
          <span className="submit-arrow" aria-hidden="true">→</span>
        </button>
      </form>
    </div>
  );
}
