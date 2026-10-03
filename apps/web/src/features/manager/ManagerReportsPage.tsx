import { CountUp } from '../../shared/ui/CountUp';
import { useInView } from '../../hooks/useInView';
import { toast } from '../../shared/ui/toast';

export function ManagerReportsPage() {
  const [revenueRef, revenueInView] = useInView<HTMLDivElement>(0.2);

  const auditLogs = [
    { id: 1045, action: 'UPDATE_SUBSCRIPTION', actor: 'thinh.reception@sol-wellness.vn', target: 'MB-2026-089', ip: '192.168.1.15', time: '10:45:12' },
    { id: 1044, action: 'CHECKIN_GRANTED', actor: 'system_turnstile_a1', target: 'MB-2026-089', ip: '10.0.1.20', time: '07:15:20' },
    { id: 1043, action: 'CREATE_CLASS_SESSION', actor: 'admin.manager@sol-wellness.vn', target: 'CLS-102', ip: '192.168.1.2', time: '07:00:15' },
    { id: 1042, action: 'PAYMENT_SUCCESS', actor: 'thinh.reception@sol-wellness.vn', target: 'INV-2026-00452', ip: '192.168.1.15', time: '25/09 16:30' },
  ];

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Báo Cáo Trung Tâm</h1>
          <p className="portal-subtitle">Thống kê doanh thu, lưu lượng check-in và nhật ký kiểm toán hệ thống</p>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => toast('Đang tạo và tải xuống bản báo cáo tài chính PDF...', 'success')}
        >
          Xuất Báo Cáo Doanh Thu
        </button>
      </div>

      {/* KPI Metrics with CountUp */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">TỔNG DOANH THU THÁNG 09</div>
          <div className="metric-value">
            <CountUp value={1845000000} format={(v) => Math.round(v).toLocaleString('vi-VN') + ' đ'} />
          </div>
          <div className="metric-trend">↑ +14.2% so với tháng trước</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">HỘI VIÊN MỚI TRONG THÁNG</div>
          <div className="metric-value">
            <CountUp value={128} />
          </div>
          <div className="metric-trend">↑ +22 hội viên đăng ký mới</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">TỶ LỆ LẤP ĐẦY PHÒNG TẬP</div>
          <div className="metric-value">
            <CountUp value={86.4} format={(v) => v.toFixed(1) + '%'} />
          </div>
          <div className="metric-trend">↑ Tối ưu hóa năng lực phục vụ</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">LƯỢT QUÉT CHECK-IN TRUNG TÂM</div>
          <div className="metric-value">
            <CountUp value={4920} format={(v) => Math.round(v).toLocaleString('vi-VN')} />
          </div>
          <div className="metric-trend">Trung bình 180 lượt / ngày</div>
        </div>
      </div>

      <div className="grid-2">
        {/* Revenue Breakdown */}
        <div className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">Cơ Cấu Doanh Thu Theo Gói Dịch Vụ</h2>
          </div>

          <div ref={revenueRef} style={{ display: 'grid', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span><strong>The Sanctuary VIP (3 Tháng)</strong></span>
                <span><strong>1.125.000.000 đ (61%)</strong></span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#F0ECE6', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  className={`progress-fill ${revenueInView ? 'is-visible' : ''}`}
                  style={{
                    ['--value' as string]: '61%',
                    width: '61%',
                    height: '100%',
                    background: '#1A1614',
                    borderRadius: '4px',
                  } as React.CSSProperties}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span><strong>The Sovereign Annual (1 Năm)</strong></span>
                <span><strong>468.000.000 đ (25%)</strong></span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#F0ECE6', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  className={`progress-fill ${revenueInView ? 'is-visible' : ''}`}
                  style={{
                    ['--value' as string]: '25%',
                    width: '25%',
                    height: '100%',
                    background: '#C2A684',
                    borderRadius: '4px',
                  } as React.CSSProperties}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span><strong>The Essential (1 Tháng)</strong></span>
                <span><strong>252.000.000 đ (14%)</strong></span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#F0ECE6', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  className={`progress-fill ${revenueInView ? 'is-visible' : ''}`}
                  style={{
                    ['--value' as string]: '14%',
                    width: '14%',
                    height: '100%',
                    background: '#8C847C',
                    borderRadius: '4px',
                  } as React.CSSProperties}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Audit Logs Trail */}
        <div className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">Nhật Ký Hệ Thống</h2>
          </div>

          <div className="portal-table-wrapper">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Hành Động</th>
                  <th>Người Thực Hiện</th>
                  <th>Mục Tiêu</th>
                  <th>IP / Giờ</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, index) => (
                  <tr
                    key={log.id}
                    className="row-in"
                    style={{ ['--i' as string]: index } as React.CSSProperties}
                  >
                    <td>
                      <span className="badge badge-neutral" style={{ fontFamily: 'monospace' }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.78rem' }}>{log.actor}</td>
                    <td style={{ fontWeight: 600 }}>{log.target}</td>
                    <td style={{ fontSize: '0.75rem', color: '#8C847C' }}>{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
