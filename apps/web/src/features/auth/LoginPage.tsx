import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginApi } from '../../shared/api/client';

export function LoginPage() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Error states
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const validate = (): boolean => {
    let isValid = true;
    const cleanId = identifier.trim();

    // Reset lỗi
    setIdentifierError('');
    setPasswordError('');
    setFormError('');

    // Regex kiểm tra Email chuẩn và Số điện thoại Việt Nam
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

    if (!cleanId) {
      setIdentifierError('Vui lòng nhập Email hoặc Số điện thoại.');
      isValid = false;
    } else if (cleanId.toLowerCase().endsWith('@gmail.co')) {
      setIdentifierError('Có vẻ bạn gõ nhầm @gmail.co? Vui lòng sửa thành @gmail.com');
      isValid = false;
    } else if (!emailRegex.test(cleanId) && !phoneRegex.test(cleanId)) {
      setIdentifierError('Email hoặc số điện thoại không đúng định dạng.');
      isValid = false;
    }

    // Validate Password
    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu của bạn.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu phải từ 6 ký tự trở lên.');
      isValid = false;
    }

    return isValid;
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await loginApi(identifier, password);
      // Điều hướng theo vai trò (Role)
      switch (res.user.role) {
        case 'MANAGER':
          navigate('/manager/catalogs');
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
      const message = err instanceof Error ? err.message : 'Đăng nhập không thành công. Vui lòng thử lại.';
      setFormError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrapper}>
          <div style={styles.logoBox}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#E6F4EA" />
              <path d="M7 8h10M7 12h7M7 16h10" stroke="#046A38" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#046A38', marginLeft: '4px' }}>FitCenter</span>
          </div>
        </div>

        {/* Headings */}
        <p style={styles.eyebrow}>CỔNG HỘI VIÊN FITCENTER</p>
        <h1 style={styles.title}>Đăng nhập hội viên</h1>
        <p style={styles.subtitle}>Chào mừng bạn quay trở lại với FitCenter</p>

        {/* Global Error Banner */}
        {formError && (
          <div style={styles.errorAlert}>
            <span>⚠️ {formError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate style={styles.form}>
          {/* Identifier Input */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email hoặc Số điện thoại</label>
            <div style={{ ...styles.inputContainer, borderColor: identifierError ? '#DC2626' : '#E2E8F0' }}>
              <span style={styles.inputIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="vd: an.nguyen@email.com hoặc 0912345678"
                value={identifier}
                disabled={isLoading}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (identifierError) setIdentifierError('');
                  if (formError) setFormError('');
                }}
                style={styles.input}
              />
            </div>
            {identifierError && <p style={styles.errorMessage}>{identifierError}</p>}
          </div>

          {/* Password Input */}
          <div style={styles.fieldGroup}>
            <div style={styles.passwordLabelRow}>
              <label style={styles.label}>Mật khẩu</label>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Quên mật khẩu?
              </Link>
            </div>
            <div style={{ ...styles.inputContainer, borderColor: passwordError ? '#DC2626' : '#E2E8F0' }}>
              <span style={styles.inputIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                disabled={isLoading}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError('');
                  if (formError) setFormError('');
                }}
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                tabIndex={-1}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                  {showPassword && <line x1="1" y1="1" x2="23" y2="23" stroke="#DC2626" strokeWidth="2" />}
                </svg>
              </button>
            </div>
            {passwordError && <p style={styles.errorMessage}>{passwordError}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isLoading} style={styles.submitButton}>
            {isLoading ? (
              <span>Đang kiểm tra...</span>
            ) : (
              <>
                <span>Đăng nhập</span>
                <span style={{ fontSize: '16px' }}>→</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div style={styles.footerRow}>
          <span>Chưa có tài khoản? </span>
          <Link to="/register" style={styles.registerLink}>
            Đăng ký ngay
          </Link>
        </div>

        {/* Security Badge */}
        <div style={styles.badge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#046A38">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
          </svg>
          <span style={styles.badgeText}>Bảo mật xác thực thể thao FitPass 2.0</span>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '430px',
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    padding: '36px 32px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
    textAlign: 'center',
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F1F8F5',
    padding: '8px 14px',
    borderRadius: '12px',
  },
  eyebrow: {
    fontSize: '11px',
    letterSpacing: '1px',
    fontWeight: 700,
    color: '#046A38',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#0F172A',
    margin: '0 0 6px 0',
  },
  subtitle: {
    fontSize: '13px',
    color: '#64748B',
    margin: '0 0 24px 0',
  },
  errorAlert: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #F87171',
    color: '#991B1B',
    borderRadius: '10px',
    padding: '10px',
    fontSize: '12px',
    marginBottom: '16px',
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    textAlign: 'left',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1E293B',
  },
  passwordLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotLink: {
    fontSize: '12px',
    color: '#046A38',
    textDecoration: 'none',
    fontWeight: 500,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    padding: '0 12px',
    backgroundColor: '#FFFFFF',
    transition: 'border-color 0.2s',
  },
  inputIcon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 0',
    border: 'none',
    outline: 'none',
    fontSize: '13px',
    color: '#0F172A',
  },
  eyeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: '11px',
    color: '#DC2626',
    margin: '2px 0 0 0',
  },
  submitButton: {
    backgroundColor: '#046A38',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    padding: '13px 20px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '6px',
  },
  footerRow: {
    marginTop: '20px',
    fontSize: '13px',
    color: '#64748B',
  },
  registerLink: {
    color: '#046A38',
    fontWeight: 600,
    textDecoration: 'none',
  },
  badge: {
    marginTop: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#F1F5F9',
    padding: '6px 14px',
    borderRadius: '20px',
  },
  badgeText: {
    fontSize: '11px',
    color: '#475569',
    fontWeight: 500,
  },
};