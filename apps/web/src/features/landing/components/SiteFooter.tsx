import { Link, useLocation } from 'react-router-dom';
import { getCurrentUser, homePath } from '../../../shared/api/client';

const NAV_LINKS = [
  { hash: '#about', label: 'Triết lý' },
  { hash: '#disciplines', label: 'Bộ môn' },
  { hash: '#intelligence', label: 'Công nghệ' },
  { hash: '#packages', label: 'Gói tập' },
  { hash: '#contact', label: 'Liên hệ' },
];

/** Footer dùng chung cho landing (anchor trong trang) và login (điều hướng về landing). */
export function SiteFooter() {
  const onLanding = useLocation().pathname === '/';
  const currentUser = getCurrentUser();

  return (
    <footer className={`sol-footer ${onLanding ? 'sol-footer--landing' : ''}`}>
      <div className="sol-footer__main">
        <div className="sol-footer__brand">
          <span className="sol-footer__mark">SÖL</span>
          <span className="sol-footer__tag">Wellness Sanctuary</span>
        </div>

        <nav className="sol-footer__nav" aria-label="Điều hướng chân trang">
          {NAV_LINKS.map(({ hash, label }) =>
            onLanding ? (
              <a key={hash} href={hash}>
                {label}
              </a>
            ) : (
              <Link key={hash} to={`/${hash}`} viewTransition>
                {label}
              </Link>
            ),
          )}
        </nav>

        <address className="sol-footer__contact">
          <span>120 Hai Bà Trưng, Q.1, TP.HCM</span>
          <a href="tel:19006868">1900 6868</a>
          <a href="mailto:concierge@sol-wellness.vn">concierge@sol-wellness.vn</a>
        </address>
      </div>

      <div className="sol-footer__bottom">
        <span>© 2026 Söl Wellness Sanctuary</span>
        <span>06:00 – 22:00 hằng ngày</span>
        {onLanding && (
          <Link to={currentUser ? homePath(currentUser.role) : '/login'} viewTransition>
            {currentUser ? `Vào Hệ Thống (${currentUser.name}) →` : 'Đăng nhập →'}
          </Link>
        )}
      </div>
    </footer>
  );
}
