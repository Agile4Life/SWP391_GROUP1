import React, { useCallback, useEffect, useState } from 'react';
import {
  addHealthMetric,
  getProfile,
  listHealthMetrics,
  updateProfile,
  type HealthMetric,
  type Profile,
} from './profileApi';

// Mã chỉ số hợp lệ theo backend (HealthMetricService.ALLOWED_METRICS)
const METRIC_LABELS: Record<string, string> = {
  weight: 'Cân nặng (kg)',
  height: 'Chiều cao (cm)',
  bmi: 'BMI',
  body_fat: 'Tỷ lệ mỡ (%)',
  muscle_mass: 'Khối lượng cơ (kg)',
};

const EMPTY_METRIC = { metricName: '', metricValue: '', unit: '' };

export function MemberProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [metric, setMetric] = useState(EMPTY_METRIC);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const p = await getProfile();
      setProfile(p);
      setMetrics(await listHealthMetrics(p.userId).catch(() => []));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải hồ sơ.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const patch = (changes: Partial<Profile>) => profile && setProfile({ ...profile, ...changes });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setError('');
    try {
      setProfile(await updateProfile(profile));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể lưu hồ sơ.');
    }
  };

  const handleAddMetric = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setError('');
    try {
      await addHealthMetric(profile.userId, {
        metricName: metric.metricName.trim(),
        metricValue: Number(metric.metricValue),
        unit: metric.unit.trim() || null,
      });
      setMetric(EMPTY_METRIC);
      setMetrics(await listHealthMetrics(profile.userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể ghi chỉ số.');
    }
  };

  if (loading) return <div className="portal-container">Đang tải hồ sơ...</div>;
  if (!profile) {
    return (
      <div className="portal-container" role="alert">
        {error || 'Không có dữ liệu hồ sơ.'}{' '}
        <button type="button" className="btn-secondary btn-sm" onClick={() => void load()}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Hồ Sơ Hội Viên</h1>
        </div>
        {saved && <span className="badge badge-success">Đã lưu thay đổi thành công!</span>}
      </div>

      {error && (
        <div role="alert" className="portal-card" style={{ color: '#9B2C2C', padding: 12, marginBottom: 12 }}>
          {error}
        </div>
      )}

      <div className="grid-2">
        <div className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">Thông Tin Cá Nhân &amp; Mục Tiêu</h2>
          </div>

          <form onSubmit={handleSave}>
            <div className="grid-2">
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="fullName">Họ và Tên</label>
                <input id="fullName" type="text" className="portal-input" required value={profile.fullName}
                  onChange={(e) => patch({ fullName: e.target.value })} />
              </div>
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="membershipCode">Mã Hội Viên</label>
                <input id="membershipCode" type="text" className="portal-input" value={profile.membershipCode ?? ''} disabled readOnly />
              </div>
            </div>

            <div className="grid-2">
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="email">Địa Chỉ Email</label>
                <input id="email" type="email" className="portal-input" value={profile.email ?? ''} disabled readOnly />
              </div>
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="phone">Số Điện Thoại</label>
                <input id="phone" type="tel" className="portal-input" value={profile.phone ?? ''} disabled readOnly />
              </div>
            </div>

            <div className="grid-2">
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="dob">Ngày Sinh</label>
                <input id="dob" type="date" className="portal-input" value={profile.dob ?? ''}
                  onChange={(e) => patch({ dob: e.target.value || null })} />
              </div>
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="gender">Giới Tính</label>
                <select id="gender" className="portal-select" value={profile.gender ?? ''}
                  onChange={(e) => patch({ gender: e.target.value || null })}>
                  <option value="">Chưa chọn</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            <div className="portal-form-group">
              <label className="portal-label" htmlFor="address">Địa Chỉ</label>
              <input id="address" type="text" className="portal-input" value={profile.address ?? ''}
                onChange={(e) => patch({ address: e.target.value })} />
            </div>

            <div className="grid-2">
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="fitnessLevel">Trình Độ Thể Lực</label>
                <select id="fitnessLevel" className="portal-select" value={profile.fitnessLevel ?? 'beginner'}
                  onChange={(e) => patch({ fitnessLevel: e.target.value })}>
                  <option value="beginner">Beginner (Mới bắt đầu)</option>
                  <option value="intermediate">Intermediate (Trung cấp)</option>
                  <option value="advanced">Advanced (Nâng cao / Chuyên nghiệp)</option>
                </select>
              </div>
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="emergencyName">Người Liên Hệ Khẩn Cấp</label>
                <input id="emergencyName" type="text" className="portal-input" value={profile.emergencyContactName ?? ''}
                  onChange={(e) => patch({ emergencyContactName: e.target.value })} />
              </div>
            </div>

            <div className="portal-form-group">
              <label className="portal-label" htmlFor="emergencyPhone">SĐT Liên Hệ Khẩn Cấp</label>
              <input id="emergencyPhone" type="tel" className="portal-input" value={profile.emergencyContactPhone ?? ''}
                onChange={(e) => patch({ emergencyContactPhone: e.target.value })} />
            </div>

            <div className="portal-form-group">
              <label className="portal-label" htmlFor="fitnessGoal">Mục Tiêu Thể Lực (Fitness Goal)</label>
              <textarea id="fitnessGoal" rows={2} className="portal-textarea" value={profile.fitnessGoal ?? ''}
                onChange={(e) => patch({ fitnessGoal: e.target.value })} />
            </div>

            <div className="portal-form-group">
              <label className="portal-label" htmlFor="healthNotes">Ghi Chú Y Tế &amp; Tiền Sử Chấn Thương (Health Notes)</label>
              <textarea id="healthNotes" rows={2} className="portal-textarea" value={profile.healthNotes ?? ''}
                onChange={(e) => patch({ healthNotes: e.target.value })} />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
              Lưu Cập Nhật Hồ Sơ
            </button>
          </form>
        </div>

        <div className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">Lịch Sử Chỉ Số Sức Khỏe</h2>
            <span className="badge badge-info">{metrics.length} BẢN GHI</span>
          </div>

          <form onSubmit={handleAddMetric} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 8, marginBottom: 16 }}>
            <select className="portal-select" required value={metric.metricName} aria-label="Chỉ số"
              onChange={(e) => setMetric({ ...metric, metricName: e.target.value })}>
              <option value="">Chọn chỉ số</option>
              {Object.entries(METRIC_LABELS).map(([code, label]) => <option key={code} value={code}>{label}</option>)}
            </select>
            <input className="portal-input" required type="number" step="0.01" min="0.01" placeholder="Giá trị" value={metric.metricValue}
              onChange={(e) => setMetric({ ...metric, metricValue: e.target.value })} />
            <input className="portal-input" placeholder="Đơn vị" value={metric.unit}
              onChange={(e) => setMetric({ ...metric, unit: e.target.value })} />
            <button type="submit" className="btn-primary">Thêm</button>
          </form>

          {metrics.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: '#7E7771' }}>Chưa có chỉ số nào. Hãy thêm chỉ số đầu tiên của bạn.</p>
          ) : (
            <div className="portal-table-wrapper">
              <table className="portal-table">
                <thead>
                  <tr><th>Ngày ghi</th><th>Chỉ số</th><th>Giá trị</th></tr>
                </thead>
                <tbody>
                  {metrics.map((m) => (
                    <tr key={m.id}>
                      <td style={{ fontWeight: 600 }}>{new Date(m.recordedAt).toLocaleDateString('vi-VN')}</td>
                      <td>{METRIC_LABELS[m.metricName] ?? m.metricName}</td>
                      <td>{m.metricValue} {m.unit ?? ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
