import { Link } from 'react-router-dom';
import { LuxuryLoginForm } from './LuxuryLoginForm';

export function LoginPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FAF8F5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 24px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.3rem',
            letterSpacing: '0.2em',
            fontWeight: 600,
            color: '#1A1614',
          }}
        >
          SÖL WELLNESS SANCTUARY
        </Link>

        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82rem',
            color: '#7E7771',
            letterSpacing: '0.08em',
          }}
        >
          ← Quay lại Trang Chủ
        </Link>
      </header>

      {/* Main Form Center */}
      <main style={{ margin: '40px auto', width: '100%', maxWidth: '520px' }}>
        <LuxuryLoginForm />
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          color: '#8C847C',
        }}
      >
        Sports Center Management System (SCMS) • Architecture by SWP391 Team
      </footer>
    </div>
  );
}