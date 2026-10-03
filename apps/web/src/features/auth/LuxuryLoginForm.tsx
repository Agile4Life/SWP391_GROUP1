import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { homePath, loginApi } from '../../shared/api/client';
import { StatusMark } from '../../shared/ui/StatusMark';

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
  const [shaking, setShaking] = useState(false);
  const [success, setSuccess] = useState(false);

  const [isExpired, setIsExpired] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('expired') === '1';
  });

  const fail = (msg: string) => {
    setFormError(msg);
    setShaking(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsExpired(false);
    if (!identifier.trim()) {
      fail('Vui lòng nhập tên đăng nhập hoặc email.');
      return;
    }
    if (!password) {
      fail('Vui lòng nhập mật khẩu.');
      return;
    }

    setIsLoading(true);
    setFormError('');

    try {
      const res = await loginApi(identifier, password);
      if (onSuccess) onSuccess();

      setSuccess(true);
      window.setTimeout(() => navigate(homePath(res.user.role), { viewTransition: true }), 700);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đăng nhập không thành công.';
      fail(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={shaking ? 'anim-shake' : undefined}
      onAnimationEnd={(e) => e.target === e.currentTarget && setShaking(false)}
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
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2rem',
            fontWeight: 600,
            margin: 0,
            color: '#1A1614',
            letterSpacing: '0.02em',
          }}
        >
          Đăng nhập
        </h3>
      </div>

      {isExpired && (
        <div
          role="status"
          className="portal-alert portal-alert--info"
          style={{ marginBottom: '18px' }}
        >
          <span>Phiên đăng nhập đã hết hạn để đảm bảo an toàn. Vui lòng đăng nhập lại.</span>
        </div>
      )}

      {formError && (
        <div
          role="alert"
          className="portal-alert anim-fade-up"
          style={{ marginBottom: '18px' }}
        >
          ⚠️ {formError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="portal-form-group">
          <label className="portal-label" htmlFor="login-identifier">Tên đăng nhập hoặc Email</label>
          <input
            id="login-identifier"
            type="text"
            className="portal-input"
            placeholder="Tên đăng nhập hoặc email"
            autoComplete="username"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (isExpired) setIsExpired(false);
            }}
            aria-invalid={!!formError && !identifier.trim() ? true : undefined}
          />
        </div>

        <div className="portal-form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label className="portal-label" htmlFor="login-password" style={{ margin: 0 }}>
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
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            className="portal-input"
            placeholder="Nhập mật khẩu"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (isExpired) setIsExpired(false);
            }}
            aria-invalid={!!formError && (!password || !!identifier.trim()) ? true : undefined}
          />
        </div>

        <button
          type="submit"
          className="luxury-login-submit-btn"
          disabled={isLoading || success}
        >
          {success ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <StatusMark size={22} />
              ĐÃ XÁC THỰC
            </span>
          ) : (
            <>
              <span>{isLoading ? 'ĐANG XÁC THỰC...' : 'ĐĂNG NHẬP'}</span>
              <span className="submit-arrow" aria-hidden="true">→</span>
            </>
          )}
        </button>
      </form>

      <p style={{ marginTop: '20px', fontSize: '0.85rem', textAlign: 'center' }}>
        Chưa có tài khoản? <Link to="/register" viewTransition>Đăng ký hội viên</Link>
      </p>
    </div>
  );
}
