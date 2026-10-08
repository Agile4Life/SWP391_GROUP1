import { useCallback, useEffect, useState } from 'react';
import { PageHeader } from '../../shared/ui/PageHeader';
import { getMembershipPackages, type MembershipPackage } from './membershipApi';

type PackagesState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; packages: MembershipPackage[] };

const formatPrice = (price: number) => `${price.toLocaleString('vi-VN')} ₫`;

export function MemberPackagesPage() {
  const [state, setState] = useState<PackagesState>({ status: 'loading' });

  const loadPackages = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const packages = await getMembershipPackages();
      setState({ status: 'success', packages });
    } catch {
      setState({ status: 'error' });
    }
  }, []);

  useEffect(() => {
    void loadPackages();
  }, [loadPackages]);

  const activePackages = state.status === 'success'
    ? state.packages.filter((pkg) => pkg.status === 'active')
    : [];

  return (
    <div className="portal-container">
      <PageHeader eyebrow="Hội viên" title="Gói tập" subtitle="Chọn nhịp tập phù hợp với bạn." />

      {state.status === 'loading' && (
        <div className="portal-card" role="status">Đang tải danh sách gói tập…</div>
      )}

      {state.status === 'error' && (
        <div className="portal-card portal-empty" role="alert">
          <h2 className="portal-card-title">Không thể tải gói tập</h2>
          <p>Vui lòng thử lại sau ít phút.</p>
          <button type="button" className="btn-secondary" style={{ marginTop: 20 }} onClick={() => void loadPackages()}>
            Thử lại
          </button>
        </div>
      )}

      {state.status === 'success' && activePackages.length === 0 && (
        <div className="portal-card portal-empty">
          <h2 className="portal-card-title">Chưa có gói tập khả dụng</h2>
          <p>Vui lòng quay lại sau.</p>
        </div>
      )}

      {state.status === 'success' && activePackages.length > 0 && (
        <div className="grid-3">
          {activePackages.map((pkg) => (
            <article className="portal-card" key={pkg.id}>
              <div className="meta-label">{pkg.durationDays} ngày</div>
              <h2 className="portal-card-title" style={{ margin: '18px 0 12px' }}>{pkg.name}</h2>
              {pkg.description && <p className="row-card__meta">{pkg.description}</p>}
              <div className="metric-value" style={{ fontSize: '1.9rem', marginTop: 28 }}>
                {formatPrice(pkg.price)}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
