import { useCallback, useEffect, useState } from 'react';
import { catalogApi, type Discipline, type MembershipPackage, type Room } from './catalogApi';

type Tab = 'disciplines' | 'rooms' | 'packages';
type Form = Record<string, string>;

const ROOM_STATUS_LABEL = { available: 'Đang Hoạt Động', maintenance: 'Bảo Trì', closed: 'Đã Đóng' } as const;
const vnd = (n: number) => `${n.toLocaleString('vi-VN')} đ`;

export function ManagerCatalogsPage() {
  const [tab, setTab] = useState<Tab>('disciplines');
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [packages, setPackages] = useState<MembershipPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<{ id: number | null; form: Form } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [d, r, p] = await Promise.all([catalogApi.disciplines(), catalogApi.rooms(), catalogApi.packages()]);
      setDisciplines(d);
      setRooms(r);
      setPackages(p);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải danh mục.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const run = async (action: () => Promise<unknown>) => {
    setError('');
    try {
      await action();
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Thao tác thất bại.');
    }
  };

  const emptyForm = (): Form =>
    tab === 'disciplines'
      ? { name: '', description: '' }
      : tab === 'rooms'
        ? { name: '', location: '', capacity: '10', status: 'available' }
        : { name: '', description: '', price: '', durationDays: '30', classCreditLimit: '', status: 'active' };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const { id, form: f } = editing;
    void run(() => {
      if (tab === 'disciplines') return catalogApi.saveDiscipline(id, { name: f.name, description: f.description });
      if (tab === 'rooms')
        return catalogApi.saveRoom(id, {
          name: f.name,
          location: f.location,
          capacity: Number(f.capacity),
          status: f.status as Room['status'],
        });
      return catalogApi.savePackage(id, {
        name: f.name,
        description: f.description,
        price: Number(f.price),
        durationDays: Number(f.durationDays),
        classCreditLimit: f.classCreditLimit === '' ? null : Number(f.classCreditLimit),
        status: f.status as MembershipPackage['status'],
      });
    });
  };

  const set = (key: string, value: string) => editing && setEditing({ ...editing, form: { ...editing.form, [key]: value } });
  const field = (key: string, label: string, type = 'text', required = false) => (
    <label key={key} style={{ display: 'grid', gap: 4 }}>
      {label}
      <input
        className="portal-input"
        type={type}
        required={required}
        value={editing?.form[key] ?? ''}
        onChange={(e) => set(key, e.target.value)}
      />
    </label>
  );

  const rowCount = tab === 'disciplines' ? disciplines.length : tab === 'rooms' ? rooms.length : packages.length;

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Quản Trị Danh Mục &amp; Cơ Sở Vật Chất</h1>
          <p className="portal-subtitle">Cấu hình bộ môn thể thao, phòng tập và bảng giá gói dịch vụ</p>
        </div>
        <button type="button" className="btn-primary" onClick={() => setEditing({ id: null, form: emptyForm() })}>
          + Thêm Mục Mới
        </button>
      </div>

      <div className="portal-tabs">
        {(
          [
            ['disciplines', `Danh Mục Bộ Môn (${disciplines.length})`],
            ['rooms', `Phòng Tập & Cơ Sở (${rooms.length})`],
            ['packages', `Gói Dịch Vụ Thành Viên (${packages.length})`],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`portal-tab ${tab === key ? 'active' : ''}`}
            onClick={() => {
              setTab(key);
              setEditing(null);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <div className="portal-card" role="alert" style={{ color: '#9B2C2C', padding: 12 }}>
          {error}{' '}
          <button type="button" className="btn-secondary btn-sm" onClick={() => void load()}>
            Thử lại
          </button>
        </div>
      )}

      {editing && (
        <form className="portal-card" onSubmit={submit} style={{ display: 'grid', gap: 12, padding: 16 }}>
          {field('name', 'Tên', 'text', true)}
          {tab === 'rooms' && field('location', 'Vị trí / Tầng')}
          {tab === 'rooms' && field('capacity', 'Sức chứa tối đa', 'number', true)}
          {tab !== 'rooms' && field('description', 'Mô tả')}
          {tab === 'packages' && field('price', 'Đơn giá (VND)', 'number', true)}
          {tab === 'packages' && field('durationDays', 'Thời hạn (ngày)', 'number', true)}
          {tab === 'packages' && field('classCreditLimit', 'Số buổi lớp kèm theo (để trống = không giới hạn)', 'number')}
          {tab !== 'disciplines' && (
            <label style={{ display: 'grid', gap: 4 }}>
              Trạng thái
              <select className="portal-input" value={editing.form.status} onChange={(e) => set('status', e.target.value)}>
                {tab === 'rooms' ? (
                  <>
                    <option value="available">Đang hoạt động</option>
                    <option value="maintenance">Bảo trì</option>
                    <option value="closed">Đã đóng</option>
                  </>
                ) : (
                  <>
                    <option value="active">Đang bán</option>
                    <option value="inactive">Ngừng bán</option>
                  </>
                )}
              </select>
            </label>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="btn-primary">Lưu</button>
            <button type="button" className="btn-secondary" onClick={() => setEditing(null)}>Hủy</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="portal-card" style={{ padding: 24 }}>Đang tải danh mục...</div>
      ) : rowCount === 0 && !error ? (
        <div className="portal-card" style={{ padding: 24 }}>Chưa có dữ liệu. Nhấn “Thêm Mục Mới” để tạo.</div>
      ) : (
        <div className="portal-card">
          <div className="portal-table-wrapper">
            <table className="portal-table">
              {tab === 'disciplines' && (
                <>
                  <thead><tr><th>Tên Bộ Môn</th><th>Mô Tả</th><th>Thao Tác</th></tr></thead>
                  <tbody>
                    {disciplines.map((d) => (
                      <tr key={d.id}>
                        <td><strong>{d.name}</strong></td>
                        <td style={{ color: '#6A635D', maxWidth: 400 }}>{d.description}</td>
                        <td>
                          <button type="button" className="btn-secondary btn-sm"
                            onClick={() => setEditing({ id: d.id, form: { name: d.name, description: d.description ?? '' } })}>
                            Sửa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
              {tab === 'rooms' && (
                <>
                  <thead><tr><th>Tên Phòng</th><th>Vị Trí</th><th>Sức Chứa</th><th>Tình Trạng</th><th>Thao Tác</th></tr></thead>
                  <tbody>
                    {rooms.map((r) => (
                      <tr key={r.id}>
                        <td><strong>{r.name}</strong></td>
                        <td>{r.location}</td>
                        <td><strong>{r.capacity} người</strong></td>
                        <td>
                          <span className={`badge ${r.status === 'available' ? 'badge-success' : 'badge-warning'}`}>
                            {ROOM_STATUS_LABEL[r.status]}
                          </span>
                        </td>
                        <td>
                          <button type="button" className="btn-secondary btn-sm"
                            onClick={() => setEditing({
                              id: r.id,
                              form: { name: r.name, location: r.location ?? '', capacity: String(r.capacity), status: r.status },
                            })}>
                            Sửa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
              {tab === 'packages' && (
                <>
                  <thead><tr><th>Tên Gói</th><th>Đơn Giá</th><th>Thời Hạn</th><th>Số Buổi Lớp</th><th>Tình Trạng</th><th>Thao Tác</th></tr></thead>
                  <tbody>
                    {packages.map((p) => (
                      <tr key={p.id}>
                        <td><strong>{p.name}</strong></td>
                        <td style={{ fontWeight: 600 }}>{vnd(p.price)}</td>
                        <td>{p.durationDays} ngày</td>
                        <td>{p.classCreditLimit ?? 'Không giới hạn'}</td>
                        <td>
                          <span className={`badge ${p.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                            {p.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                          </span>
                        </td>
                        <td style={{ display: 'flex', gap: 6 }}>
                          <button type="button" className="btn-secondary btn-sm"
                            onClick={() => setEditing({
                              id: p.id,
                              form: {
                                name: p.name,
                                description: p.description ?? '',
                                price: String(p.price),
                                durationDays: String(p.durationDays),
                                classCreditLimit: p.classCreditLimit == null ? '' : String(p.classCreditLimit),
                                status: p.status,
                              },
                            })}>
                            Sửa
                          </button>
                          <button type="button" className="btn-secondary btn-sm"
                            onClick={() => void run(() => catalogApi.setPackageStatus(p.id, p.status === 'active' ? 'inactive' : 'active'))}>
                            {p.status === 'active' ? 'Ngừng bán' : 'Mở bán'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
