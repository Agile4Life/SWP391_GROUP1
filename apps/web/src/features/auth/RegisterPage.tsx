import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register, sendOtp as requestOtp, verifyOtp } from './authApi';

type Step = 'register' | 'otp';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('register');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [debugOtp, setDebugOtp] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError('');
    try {
      await action();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Thao tác thất bại.');
    } finally {
      setBusy(false);
    }
  };

  const sendOtp = async () => {
    const res = await requestOtp(form.email.trim());
    setDebugOtp(res.debugOtp ?? '');
    setInfo(`Mã OTP đã được gửi tới ${form.email.trim()}. Mã có hiệu lực 5 phút.`);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.username.trim().length < 3) return setError('Tên đăng nhập tối thiểu 3 ký tự.');
    if (!EMAIL_RE.test(form.email.trim())) return setError('Email không đúng định dạng.');
    if (form.password.length < 6) return setError('Mật khẩu tối thiểu 6 ký tự.');
    void run(async () => {
      await register({ username: form.username.trim(), email: form.email.trim(), password: form.password });
      await sendOtp();
      setStep('otp');
    });
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) return setError('Mã OTP gồm đúng 6 chữ số.');
    void run(async () => {
      await verifyOtp(form.email.trim(), otp);
      navigate('/login', { replace: true });
    });
  };

  return (
    <main style={{ maxWidth: 440, margin: '80px auto', padding: '0 24px' }}>
      <h1 className="editorial-headline" style={{ fontSize: '2rem', marginBottom: 8 }}>
        {step === 'register' ? 'Đăng ký hội viên' : 'Xác thực OTP'}
      </h1>
      <p className="editorial-body" style={{ marginBottom: 24 }}>
        {step === 'register'
          ? 'Tạo tài khoản hội viên mới. Bạn sẽ nhận mã OTP qua email để kích hoạt.'
          : info}
      </p>

      {error && (
        <div role="alert" style={{ color: '#B91C1C', background: '#FEF2F2', padding: '10px 14px', marginBottom: 16 }}>
          {error}
        </div>
      )}

      {step === 'register' ? (
        <form onSubmit={handleRegister}>
          <div className="portal-form-group">
            <label className="portal-label" htmlFor="reg-username">Tên đăng nhập</label>
            <input id="reg-username" className="portal-input" autoComplete="username" value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })} />
          </div>
          <div className="portal-form-group">
            <label className="portal-label" htmlFor="reg-email">Email</label>
            <input id="reg-email" type="email" className="portal-input" autoComplete="email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="portal-form-group">
            <label className="portal-label" htmlFor="reg-password">Mật khẩu</label>
            <input id="reg-password" type="password" className="portal-input" autoComplete="new-password" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <button type="submit" className="luxury-login-submit-btn" disabled={busy}>
            <span>{busy ? 'ĐANG XỬ LÝ...' : 'ĐĂNG KÝ'}</span>
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerify}>
          {debugOtp && <p style={{ fontSize: '0.8rem' }}>Mã OTP (chế độ debug): <strong>{debugOtp}</strong></p>}
          <div className="portal-form-group">
            <label className="portal-label" htmlFor="otp-code">Mã OTP (6 chữ số)</label>
            <input id="otp-code" className="portal-input" inputMode="numeric" maxLength={6} autoComplete="one-time-code"
              value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} />
          </div>
          <button type="submit" className="luxury-login-submit-btn" disabled={busy}>
            <span>{busy ? 'ĐANG XÁC THỰC...' : 'XÁC THỰC & KÍCH HOẠT'}</span>
          </button>
          <button type="button" className="btn-secondary btn-sm" style={{ marginTop: 12 }} disabled={busy}
            onClick={() => void run(sendOtp)}>
            Gửi lại mã OTP
          </button>
        </form>
      )}

      <p style={{ marginTop: 24, fontSize: '0.85rem' }}>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </main>
  );
}
