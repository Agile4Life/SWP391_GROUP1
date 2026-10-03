import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { homePath, loginApi } from '../../shared/api/client';

interface LuxuryLoginFormProps {
  onSuccess?: () => void;
}

export function LuxuryLoginForm({ onSuccess }: LuxuryLoginFormProps) {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setFormError('Vui lòng nhập tên đăng nhập hoặc email.');
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

      navigate(homePath(res.user.role));
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
          <label className="portal-label">Tên đăng nhập hoặc Email</label>
          <input
            type="text"
            className="portal-input"
            placeholder="Tên đăng nhập hoặc email"
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
            placeholder="Nhập mật khẩu"
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

      <p style={{ marginTop: '20px', fontSize: '0.85rem', textAlign: 'center' }}>
        Chưa có tài khoản? <Link to="/register">Đăng ký hội viên</Link>
      </p>
    </div>
  );
}
