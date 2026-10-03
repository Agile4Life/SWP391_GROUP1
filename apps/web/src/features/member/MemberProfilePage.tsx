import React, { useCallback, useEffect, useState } from 'react';
import {
  addHealthMetric,
  getProfile,
  listHealthMetrics,
  updateProfile,
  type HealthMetric,
  type Profile,
} from './profileApi';
import { toast } from '../../shared/ui/toast';

// Mã chỉ số hợp lệ theo backend (HealthMetricService.ALLOWED_METRICS)
const METRIC_LABELS: Record<string, string> = {
  weight: 'Cân nặng (kg)',
  height: 'Chiều cao (cm)',
  bmi: 'BMI',
  body_fat: 'Tỷ lệ mỡ (%)',
  muscle_mass: 'Khối lượng cơ (kg)',
};

const DEFAULT_UNITS: Record<string, string> = {
  weight: 'kg',
  height: 'cm',
  bmi: '',
  body_fat: '%',
  muscle_mass: 'kg',
};

const EMPTY_METRIC = { metricName: '', metricValue: '', unit: '' };

export function MemberProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [metric, setMetric] = useState(EMPTY_METRIC);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addingMetric, setAddingMetric] = useState(false);
  const [error, setError] = useState('');

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
    if (!profile || saving) return;
    setError('');
    setSaving(true);
    try {
      const updated = await updateProfile(profile);
      setProfile(updated);
      toast('Đã cập nhật hồ sơ cá nhân thành công!', 'success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể lưu hồ sơ.');
      toast('Lưu hồ sơ thất bại. Vui lòng kiểm tra lại.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddMetric = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || addingMetric) return;
    if (!metric.metricName) {
      setError('Vui lòng chọn loại chỉ số.');
      return;
    }
    setError('');
    setAddingMetric(true);
    try {
      await addHealthMetric(profile.userId, {
        metricName: metric.metricName.trim(),
        metricValue: Number(metric.metricValue),
        unit: metric.unit.trim() || null,
      });
      setMetric(EMPTY_METRIC);
      setMetrics(await listHealthMetrics(profile.userId));
      toast('Đã ghi nhận chỉ số sức khỏe!', 'success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể ghi chỉ số.');
    } finally {
      setAddingMetric(false);
    }
  };

  if (loading) {
    return (
      <div className="portal-container">
        <div className="portal-state">
          <div className="spinner" />
          <p>Đang tải thông tin hồ sơ và chỉ số sức khỏe...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="portal-container">
        <div className="portal-state" role="alert">
          <h2 className="portal-state__title">Không tìm thấy thông tin hồ sơ</h2>
          <p>{error || 'Hệ thống chưa tìm thấy dữ liệu hồ sơ của bạn.'}</p>
          <button type="button" className="btn-primary" onClick={() => void load()}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Hồ Sơ Hội Viên</h1>
          <p className="portal-subtitle">Cập nhật thông tin thể chất, mục tiêu và theo dõi chỉ số sức khỏe cá nhân</p>
        </div>
      </div>

      {error && (
        <div role="alert" className="portal-alert">
          <span>⚠️ {error}</span>
          <button type="button" className="btn-secondary btn-sm" onClick={() => setError('')}>
            Đóng
          </button>
        </div>
      )}

      <div className="profile-grid">
        {/* Cột 1: Thông tin cá nhân & Mục tiêu */}
        <div className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">Thông Tin Cá Nhân &amp; Thể Chất</h2>
          </div>

          <form onSubmit={handleSave}>
            <div className="grid-2">
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="fullName">Họ và Tên</label>
                <input
                  id="fullName"
                  type="text"
                  className="portal-input"
                  required
                  value={profile.fullName}
                  onChange={(e) => patch({ fullName: e.target.value })}
                />
              </div>
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="membershipCode">Mã Hội Viên</label>
                <input
                  id="membershipCode"
                  type="text"
                  className="portal-input"
                  value={profile.membershipCode ?? 'Chưa cấp mã'}
                  disabled
                  readOnly
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="email">Địa Chỉ Email</label>
                <input
                  id="email"
                  type="email"
                  className="portal-input"
                  value={profile.email ?? ''}
                  disabled
                  readOnly
                />
              </div>
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="phone">Số Điện Thoại</label>
                <input
                  id="phone"
                  type="tel"
                  className="portal-input"
                  value={profile.phone ?? ''}
                  disabled
                  readOnly
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="dob">Ngày Sinh</label>
                <input
                  id="dob"
                  type="date"
                  className="portal-input"
                  value={profile.dob ?? ''}
                  onChange={(e) => patch({ dob: e.target.value || null })}
                />
              </div>
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="gender">Giới Tính</label>
                <select
                  id="gender"
                  className="portal-select"
                  value={profile.gender ?? ''}
                  onChange={(e) => patch({ gender: e.target.value || null })}
                >
                  <option value="">Chưa chọn</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            <div className="portal-form-group">
              <label className="portal-label" htmlFor="address">Địa Chỉ Thường Trú</label>
              <input
                id="address"
                type="text"
                className="portal-input"
                placeholder="Vd: 123 Lê Duẩn, Quận 1, TP. HCM"
                value={profile.address ?? ''}
                onChange={(e) => patch({ address: e.target.value })}
              />
            </div>

            <div className="grid-2">
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="fitnessLevel">Trình Độ Thể Lực</label>
                <select
                  id="fitnessLevel"
                  className="portal-select"
                  value={profile.fitnessLevel ?? 'beginner'}
                  onChange={(e) => patch({ fitnessLevel: e.target.value })}
                >
                  <option value="beginner">Beginner (Mới bắt đầu)</option>
                  <option value="intermediate">Intermediate (Trung cấp)</option>
                  <option value="advanced">Advanced (Nâng cao / Chuyên nghiệp)</option>
                </select>
              </div>
              <div className="portal-form-group">
                <label className="portal-label" htmlFor="emergencyName">Người Liên Hệ Khẩn Cấp</label>
                <input
                  id="emergencyName"
                  type="text"
                  className="portal-input"
                  placeholder="Họ tên người thân"
                  value={profile.emergencyContactName ?? ''}
                  onChange={(e) => patch({ emergencyContactName: e.target.value })}
                />
              </div>
            </div>

            <div className="portal-form-group">
              <label className="portal-label" htmlFor="emergencyPhone">SĐT Liên Hệ Khẩn Cấp</label>
              <input
                id="emergencyPhone"
                type="tel"
                className="portal-input"
                placeholder="0912 345 678"
                value={profile.emergencyContactPhone ?? ''}
                onChange={(e) => patch({ emergencyContactPhone: e.target.value })}
              />
            </div>

            <div className="portal-form-group">
              <label className="portal-label" htmlFor="fitnessGoal">Mục Tiêu Thể Lực (Fitness Goal)</label>
              <textarea
                id="fitnessGoal"
                rows={2}
                className="portal-textarea"
                placeholder="Vd: Cải thiện sức bền, giảm mỡ nội tạng, tăng độ dẻo dai..."
                value={profile.fitnessGoal ?? ''}
                onChange={(e) => patch({ fitnessGoal: e.target.value })}
              />
            </div>

            <div className="portal-form-group">
              <label className="portal-label" htmlFor="healthNotes">Ghi Chú Y Tế &amp; Tiền Sử Chấn Thương (Health Notes)</label>
              <textarea
                id="healthNotes"
                rows={2}
                className="portal-textarea"
                placeholder="Vd: Tiền sử thoát vị đĩa đệm nhẹ, cần tránh động tác gập lưng quá sâu..."
                value={profile.healthNotes ?? ''}
                onChange={(e) => patch({ healthNotes: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={saving} style={{ marginTop: '8px' }}>
              {saving ? (
                <>
                  <span className="spinner" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                'Lưu Cập Nhật Hồ Sơ'
              )}
            </button>
          </form>
        </div>

        {/* Cột 2: Lịch sử chỉ số sức khỏe */}
        <div className="portal-card">
          <div className="portal-card-header">
            <div>
              <h2 className="portal-card-title">Chỉ Số Sức Khỏe</h2>
              <p className="portal-card-subtitle">Theo dõi diễn biến các chỉ số sinh trắc học</p>
            </div>
            <span className="badge badge-info">{metrics.length} BẢN GHI</span>
          </div>

          <form onSubmit={handleAddMetric} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr auto', gap: 8, marginBottom: 16 }}>
            <select
              className="portal-select"
              required
              value={metric.metricName}
              aria-label="Chọn chỉ số"
              onChange={(e) => {
                const name = e.target.value;
                setMetric({
                  ...metric,
                  metricName: name,
                  unit: DEFAULT_UNITS[name] ?? metric.unit,
                });
              }}
            >
              <option value="">Chọn chỉ số</option>
              {Object.entries(METRIC_LABELS).map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
            <input
              className="portal-input"
              required
              type="number"
              step="0.01"
              min="0.01"
              placeholder="Giá trị"
              value={metric.metricValue}
              onChange={(e) => setMetric({ ...metric, metricValue: e.target.value })}
            />
            <input
              className="portal-input"
              placeholder="Đơn vị"
              value={metric.unit}
              onChange={(e) => setMetric({ ...metric, unit: e.target.value })}
            />
            <button type="submit" className="btn-primary" disabled={addingMetric} title="Thêm chỉ số">
              {addingMetric ? <span className="spinner" /> : 'Thêm'}
            </button>
          </form>

          {metrics.length === 0 ? (
            <div className="portal-state" style={{ minHeight: '140px', padding: '24px 16px' }}>
              <p style={{ color: '#7E7771', margin: 0 }}>Chưa có chỉ số nào được ghi nhận.</p>
              <p style={{ fontSize: '0.8rem', color: '#8C847C', margin: 0 }}>
                Chọn chỉ số ở biểu mẫu trên và nhấn "Thêm" để bắt đầu theo dõi.
              </p>
            </div>
          ) : (
            <div className="portal-table-wrapper">
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Ngày ghi</th>
                    <th>Chỉ số</th>
                    <th>Giá trị</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((m) => (
                    <tr key={m.id}>
                      <td style={{ fontWeight: 600 }}>{new Date(m.recordedAt).toLocaleDateString('vi-VN')}</td>
                      <td>{METRIC_LABELS[m.metricName] ?? m.metricName}</td>
                      <td>
                        <strong>{m.metricValue}</strong> <span className="muted">{m.unit ?? ''}</span>
                      </td>
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
