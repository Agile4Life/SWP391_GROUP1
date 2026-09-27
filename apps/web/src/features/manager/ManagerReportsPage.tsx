import { useTheme } from '../../shared/context/ThemeContext';

export function ManagerReportsPage() {
  const { theme } = useTheme();
  const isRunova = theme === 'runova';

  const solAuditLogs = [
    { id: 1045, action: 'UPDATE_SUBSCRIPTION', actor: 'thinh.reception@sol-wellness.vn', target: 'MB-2026-089', ip: '192.168.1.15', time: '10:45:12' },
    { id: 1044, action: 'CHECKIN_GRANTED', actor: 'system_turnstile_a1', target: 'MB-2026-089', ip: '10.0.1.20', time: '07:15:20' },
    { id: 1043, action: 'CREATE_CLASS_SESSION', actor: 'admin.manager@sol-wellness.vn', target: 'CLS-102', ip: '192.168.1.2', time: '07:00:15' },
    { id: 1042, action: 'PAYMENT_SUCCESS', actor: 'thinh.reception@sol-wellness.vn', target: 'INV-2026-00452', ip: '192.168.1.15', time: '25/09 16:30' },
  ];

  const runovaAuditLogs = [
    { id: 1045, action: 'UPGRADE_COURT_PASS', actor: 'thinh.reception@runova-sports.vn', target: 'VĐV-2026-089', ip: '192.168.1.15', time: '10:45:12' },
    { id: 1044, action: 'TURNSTILE_COURT_PASS', actor: 'turnstile_tennis_gate1', target: 'VĐV-2026-089', ip: '10.0.1.20', time: '07:15:20' },
    { id: 1043, action: 'ALLOCATE_COURT_SESSION', actor: 'admin.manager@runova-sports.vn', target: 'COURT-TENNIS-01', ip: '192.168.1.2', time: '07:00:15' },
    { id: 1042, action: 'PAYMENT_SUCCESS', actor: 'thinh.reception@runova-sports.vn', target: 'INV-2026-00452', ip: '192.168.1.15', time: '25/09 16:30' },
  ];

  const auditLogs = isRunova ? runovaAuditLogs : solAuditLogs;

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">
            {isRunova ? 'Báo Cáo Doanh Thu & Hiệu Suất Cụm Sân' : 'Báo Cáo Doanh Thu & Phân Tích Vận Hành'}
          </h1>
          <p className="portal-subtitle">
            {isRunova
              ? 'Số liệu tài chính cụm sân thi đấu và nhật ký kiểm toán hệ thống (SCMS Module F & Module J)'
              : 'Ảnh chụp dữ liệu tài chính đa chiều và nhật ký kiểm toán hệ thống (SCMS Module F & Module J)'}
          </p>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => alert(isRunova ? 'Xuất báo cáo tài chính cụm sân Runova' : 'Xuất báo cáo tài chính')}
        >
          Xuất Báo Cáo Doanh Thu
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">TỔNG DOANH THU THÁNG 09</div>
          <div className="metric-value">{isRunova ? '2.150.000.000 đ' : '1.845.000.000 đ'}</div>
          <div className="metric-trend">{isRunova ? '↑ +18.4% so với tháng trước' : '↑ +14.2% so với tháng trước'}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">{isRunova ? 'VẬN ĐỘNG VIÊN MỚI THÁNG' : 'HỘI VIÊN MỚI TRONG THÁNG'}</div>
          <div className="metric-value">{isRunova ? '142' : '128'}</div>
          <div className="metric-trend">{isRunova ? '↑ +28 VĐV đăng ký mới' : '↑ +22 hội viên đăng ký mới'}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">{isRunova ? 'TỶ LỆ LẤP ĐẦY SÂN ĐẤU' : 'TỶ LỆ LẤP ĐẦY PHÒNG TẬP'}</div>
          <div className="metric-value">{isRunova ? '89.2%' : '86.4%'}</div>
          <div className="metric-trend">
            {isRunova ? '↑ Tối ưu hóa năng lực phục vụ sân' : '↑ Tối ưu hóa năng lực phục vụ'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">{isRunova ? 'LƯỢT CHECK-IN CỔNG SÂN' : 'LƯỢT QUÉT CHECK-IN TRUNG TÂM'}</div>
          <div className="metric-value">{isRunova ? '5,420' : '4,920'}</div>
          <div className="metric-trend">{isRunova ? 'Trung bình 195 lượt / ngày' : 'Trung bình 180 lượt / ngày'}</div>
        </div>
      </div>

      <div className="grid-2">
        {/* Revenue Breakdown */}
        <div className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">
              {isRunova ? 'Cơ Cấu Doanh Thu Theo Hạng Thẻ Court Pass' : 'Cơ Cấu Doanh Thu Theo Gói Dịch Vụ'}
            </h2>
            <span className="badge badge-success">MONTHLY SNAPSHOT</span>
          </div>

          {isRunova ? (
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span><strong>Championship Pro (3 Tháng)</strong></span>
                  <span><strong>1.333.000.000 đ (62%)</strong></span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#F0ECE6', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '62%', height: '100%', background: '#16382C' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span><strong>Tournament Master (1 Năm VIP)</strong></span>
                  <span><strong>537.500.000 đ (25%)</strong></span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#F0ECE6', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '25%', height: '100%', background: '#D4E95C' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span><strong>Club Player (1 Tháng)</strong></span>
                  <span><strong>279.500.000 đ (13%)</strong></span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#F0ECE6', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '13%', height: '100%', background: '#8E9C92' }} />
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span><strong>The Sanctuary VIP (3 Tháng)</strong></span>
                  <span><strong>1.125.000.000 đ (61%)</strong></span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#F0ECE6', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '61%', height: '100%', background: '#1A1614' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span><strong>The Sovereign Annual (1 Năm)</strong></span>
                  <span><strong>468.000.000 đ (25%)</strong></span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#F0ECE6', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '25%', height: '100%', background: '#C2A684' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span><strong>The Essential (1 Tháng)</strong></span>
                  <span><strong>252.000.000 đ (14%)</strong></span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#F0ECE6', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '14%', height: '100%', background: '#8C847C' }} />
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: '28px',
              padding: '16px',
              background: isRunova ? '#F4F1EA' : '#FAF8F5',
              borderRadius: isRunova ? '16px' : '6px',
              fontSize: '0.82rem',
              color: isRunova ? '#2E4438' : '#6A635D',
              border: isRunova ? '1px solid rgba(22, 56, 44, 0.08)' : 'none',
            }}
          >
            {isRunova ? (
              <>
                💡 Hạng thẻ <strong>Championship Pro</strong> tiếp tục là gói chủ lực mang lại 62% tổng doanh thu nhờ
                tích hợp cảm biến AI đo lực vung vợt, quyền đặt sân giờ vàng và 4 buổi kèm 1-1 với HLV Rafael Lâm.
              </>
            ) : (
              <>
                💡 Gói <strong>The Sanctuary VIP</strong> tiếp tục là gói chủ lực mang lại 61% tổng doanh thu nhờ sự kết hợp
                giữa lớp Reformer Pilates và 4 buổi kèm 1-1 của HLV Master.
              </>
            )}
          </div>
        </div>

        {/* Audit Logs Trail */}
        <div className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">Nhật Ký Kiểm Toán (Audit Trail)</h2>
            <span className="badge badge-info">TABLE: audit_logs</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#7E7771', marginBottom: '16px' }}>
            Ghi vết 100% các biến động dữ liệu nhạy cảm theo quy định bảo mật của dự án.
          </p>

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
                {auditLogs.map((log) => (
                  <tr key={log.id}>
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
